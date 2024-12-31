import React from 'react';

interface MarkdownOutputProps {
  markdown: string;
  isLoading: boolean;
}

export function MarkdownOutput({ markdown, isLoading }: MarkdownOutputProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <pre className="w-full h-[400px] p-4 bg-gray-50 rounded-lg border overflow-auto font-mono text-sm">
      {markdown || 'Markdown output will appear here...'}
    </pre>
  );
}