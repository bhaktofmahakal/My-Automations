'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Terminal, Shield, Zap, Database, Cpu } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={`prose prose-invert max-w-none text-xs leading-relaxed text-[#e6edf3] font-sans ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-sm font-bold text-[#e6edf3] border-b border-[#30363d] pb-1.5 mb-2 mt-3 font-mono flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#58a6ff] rounded-sm inline-block"></span>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xs font-bold text-[#58a6ff] mt-2.5 mb-1.5 font-mono flex items-center gap-1.5">
              <span>#</span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs font-semibold text-[#bc8cff] mt-2 mb-1 font-mono">
              {children}
            </h3>
          ),

          // Paragraphs & Text
          p: ({ children }) => {
            const str = String(children);

            // Highlight Tool Calls
            if (str.startsWith('[ToolCall:') || str.startsWith('[ToolResult:')) {
              const isCall = str.startsWith('[ToolCall:');
              return (
                <div className={`my-1.5 p-2 rounded-lg border font-mono text-[11px] ${
                  isCall 
                    ? 'bg-[#161b22] border-[#58a6ff]/40 text-[#58a6ff]' 
                    : 'bg-[#16291e] border-[#238636]/40 text-[#3fb950]'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-0.5">
                    {isCall ? <Cpu className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                    <span>{isCall ? '🛠️ EXECUTING AST TOOL' : '✓ TOOL RESULT'}</span>
                  </div>
                  <div className="text-[#e6edf3] break-all">{children}</div>
                </div>
              );
            }

            // Highlight Upstash Memory / Vector Operations
            if (str.includes('[Upstash Redis') || str.includes('[Upstash Vector')) {
              return (
                <div className="my-1.5 p-2 rounded-lg bg-[#0d1f14] border border-[#238636] font-mono text-[11px] text-[#3fb950] flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#3fb950] shrink-0" />
                  <span>{children}</span>
                </div>
              );
            }

            // Highlight Safe Barrier
            if (str.includes('[SAFE_BARRIER:')) {
              return (
                <div className="my-2 p-2.5 rounded-lg bg-[#1a1528] border border-[#a371f7] font-mono text-[11px] text-[#d2a8ff] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#a371f7] shrink-0" />
                  <span className="font-bold">{children}</span>
                </div>
              );
            }

            return <p className="mb-1.5 leading-normal">{children}</p>;
          },

          // Code blocks & Inline code
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            const isDiff = match && match[1] === 'diff';
            const codeIndex = Math.random();

            if (!inline && (match || codeString.includes('\n') || isDiff)) {
              return (
                <div className="my-2 rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#161b22] border-b border-[#30363d] text-[10px] font-mono text-[#8b949e]">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                      <span>{match ? match[1].toUpperCase() : 'CODE'}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(codeString, codeIndex as any)}
                      className="flex items-center gap-1 text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                      title="Copy code"
                    >
                      {copiedIndex === (codeIndex as any) ? (
                        <>
                          <Check className="w-3 h-3 text-[#3fb950]" />
                          <span className="text-[#3fb950]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code Body */}
                  <pre className="p-2.5 overflow-x-auto text-[11px] font-mono leading-relaxed bg-[#0d1117]">
                    {isDiff ? (
                      codeString.split('\n').map((line, i) => {
                        const isAdd = line.startsWith('+') && !line.startsWith('+++');
                        const isDel = line.startsWith('-') && !line.startsWith('---');
                        const isHunk = line.startsWith('@@');

                        return (
                          <div
                            key={i}
                            className={`px-1 rounded ${
                              isAdd
                                ? 'bg-[#238636]/20 text-[#3fb950]'
                                : isDel
                                ? 'bg-[#da3633]/20 text-[#f85149]'
                                : isHunk
                                ? 'text-[#a371f7] font-bold bg-[#a371f7]/10'
                                : 'text-[#8b949e]'
                            }`}
                          >
                            {line}
                          </div>
                        );
                      })
                    ) : (
                      <code className="text-[#e6edf3]">{codeString}</code>
                    )}
                  </pre>
                </div>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded bg-[#21262d] text-[#79c0ff] font-mono text-[11px] border border-[#30363d]"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Lists
          ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2 text-[#8b949e]">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2 text-[#8b949e]">{children}</ol>,
          li: ({ children }) => <li className="text-[#e6edf3]">{children}</li>,

          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-2 border border-[#30363d] rounded-lg">
              <table className="w-full text-left border-collapse text-xs font-mono">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-[#161b22] text-[#8b949e] border-b border-[#30363d]">{children}</thead>,
          th: ({ children }) => <th className="p-2 font-bold text-[#e6edf3]">{children}</th>,
          td: ({ children }) => <td className="p-2 border-b border-[#21262d] text-[#8b949e]">{children}</td>,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#58a6ff] pl-3 py-1 my-2 bg-[#161b22]/50 text-[#8b949e] italic rounded-r">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
