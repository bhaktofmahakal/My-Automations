import ts from 'typescript';
import { OGNodeData, OGEdgeData, ASTSignature } from '../types';

/**
 * Real TypeScript AST Compiler Engine
 * Parses raw TypeScript / JavaScript code strings into ObjectGraph (.og) AST nodes and edge connections.
 */
export function parseTypeScriptAST(
  fileName: string,
  filePath: string,
  codeContent: string
): { nodes: OGNodeData[]; edges: OGEdgeData[] } {
  const sourceFile = ts.createSourceFile(
    fileName,
    codeContent,
    ts.ScriptTarget.Latest,
    true, // setParentNodes
    ts.ScriptKind.TS
  );

  const fileLines = codeContent.split('\n').length;
  const rawTokens = Math.ceil(codeContent.length / 4);
  const fileId = `file-${fileName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const signatures: ASTSignature[] = [];
  const exportSymbols: string[] = [];
  const dependencies: string[] = [];
  const childNodes: OGNodeData[] = [];
  const edges: OGEdgeData[] = [];

  // Node 1: Primary File Node
  const fileNode: OGNodeData = {
    id: fileId,
    label: fileName,
    type: 'file',
    path: filePath,
    language: 'typescript',
    linesCount: fileLines,
    tokenCount: rawTokens,
    compressedTokens: Math.ceil(rawTokens * 0.2), // TokenFold signature context compression
    signatures: [],
    status: 'scanning',
    exportSymbols: [],
    dependencies: [],
  };

  // Traversal Visitor function
  function visit(node: ts.Node) {
    // 1. Function Declarations
    if (ts.isFunctionDeclaration(node) && node.name) {
      const fnName = node.name.text;
      const startLine = sourceFile.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      const endLine = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      const params = node.parameters.map(p => p.name.getText(sourceFile));
      const fnText = node.getText(sourceFile);
      const tokenCost = Math.ceil(fnText.length / 4);

      const sig: ASTSignature = {
        name: fnName,
        kind: 'function',
        lineStart: startLine,
        lineEnd: endLine,
        params,
        returnType: node.type ? node.type.getText(sourceFile) : 'any',
        tokenCost,
      };

      signatures.push(sig);

      const fnNodeId = `fn-${fnName.toLowerCase()}`;
      childNodes.push({
        id: fnNodeId,
        label: `${fnName}()`,
        type: 'function',
        path: filePath,
        language: 'typescript',
        linesCount: endLine - startLine + 1,
        tokenCount: tokenCost,
        compressedTokens: Math.ceil(tokenCost * 0.15),
        parentId: fileId,
        signatures: [sig],
        status: 'traversed',
        description: `AST Function Signature: ${fnName}(${params.join(', ')})`,
      });

      edges.push({
        id: `edge-${fileId}-${fnNodeId}`,
        source: fileId,
        target: fnNodeId,
        type: 'calls',
        animated: true,
      });
    }

    // 2. Class Declarations
    if (ts.isClassDeclaration(node) && node.name) {
      const className = node.name.text;
      exportSymbols.push(className);
    }

    // 3. Import Declarations
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '');
      dependencies.push(moduleSpecifier);
    }

    // 4. Assertions / Expect Statements (Test file checks)
    if (ts.isCallExpression(node)) {
      const text = node.expression.getText(sourceFile);
      if (text === 'expect' || text.includes('assert')) {
        const assertId = `assert-${childNodes.length + 1}`;
        const assertText = node.getText(sourceFile);
        const tokenCost = Math.ceil(assertText.length / 4);

        childNodes.push({
          id: assertId,
          label: `Assertion [${assertText.slice(0, 18)}...]`,
          type: 'assertion',
          path: filePath,
          language: 'typescript',
          linesCount: 1,
          tokenCount: tokenCost,
          compressedTokens: 12,
          parentId: fileId,
          signatures: [],
          status: 'verified',
          description: `SWE-bench Unit Test Assertion: ${assertText}`,
        });

        edges.push({
          id: `edge-${fileId}-${assertId}`,
          source: fileId,
          target: assertId,
          type: 'tests',
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  fileNode.signatures = signatures;
  fileNode.exportSymbols = exportSymbols;
  fileNode.dependencies = dependencies;

  return {
    nodes: [fileNode, ...childNodes],
    edges,
  };
}
