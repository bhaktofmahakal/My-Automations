import { OGNodeData, OGEdgeData, ASTSignature } from '../types';

export interface GraphDisclosureState {
  nodes: OGNodeData[];
  edges: OGEdgeData[];
  totalRawTokens: number;
  totalCompressedTokens: number;
  tokensSaved: number;
  savingsPercentage: number;
}

export function calculateGraphTokenMetrics(nodes: OGNodeData[]): {
  totalRawTokens: number;
  totalCompressedTokens: number;
  tokensSaved: number;
  savingsPercentage: number;
} {
  let totalRawTokens = 0;
  let totalCompressedTokens = 0;

  for (const node of nodes) {
    totalRawTokens += node.tokenCount;
    // If the node is loaded/disclosed in context, use its compressed AST representation
    totalCompressedTokens += node.isLoaded ? node.compressedTokens : Math.min(25, Math.round(node.compressedTokens * 0.2));
  }

  const tokensSaved = Math.max(0, totalRawTokens - totalCompressedTokens);
  const savingsPercentage = totalRawTokens > 0 ? Number(((tokensSaved / totalRawTokens) * 100).toFixed(1)) : 0;

  return {
    totalRawTokens,
    totalCompressedTokens,
    tokensSaved,
    savingsPercentage,
  };
}

export function expandNodeProgressive(
  nodeId: string,
  currentNodes: OGNodeData[],
  currentEdges: OGEdgeData[]
): {
  updatedNodes: OGNodeData[];
  updatedEdges: OGEdgeData[];
  newNodeCount: number;
} {
  const targetNode = currentNodes.find(n => n.id === nodeId);
  if (!targetNode) {
    return { updatedNodes: currentNodes, updatedEdges: currentEdges, newNodeCount: 0 };
  }

  // Toggle expansion state
  const isNowExpanded = !targetNode.isExpanded;
  
  const updatedNodes = currentNodes.map(node => {
    if (node.id === nodeId) {
      return {
        ...node,
        isExpanded: isNowExpanded,
        isLoaded: true,
        status: (isNowExpanded ? 'traversed' : 'idle') as any,
      };
    }
    // If this node is a child of the clicked node, reveal or hide
    if (node.parentId === nodeId) {
      return {
        ...node,
        isLoaded: isNowExpanded,
        status: (isNowExpanded ? 'traversed' : 'idle') as any,
      };
    }
    return node;
  });

  return {
    updatedNodes,
    updatedEdges: currentEdges,
    newNodeCount: isNowExpanded ? (targetNode.childrenIds?.length || 0) : 0,
  };
}

export function searchNodes(query: string, nodes: OGNodeData[]): OGNodeData[] {
  if (!query.trim()) return nodes;
  const q = query.toLowerCase();
  return nodes.filter(
    n =>
      n.label.toLowerCase().includes(q) ||
      n.path.toLowerCase().includes(q) ||
      n.exportSymbols?.some(s => s.toLowerCase().includes(q)) ||
      n.signatures.some(sig => sig.name.toLowerCase().includes(q))
  );
}
