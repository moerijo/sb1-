import React, { useState } from 'react';
import { convertUrlToMarkdown } from './lib/converter';
import { ConversionTabs } from './components/ConversionTabs';
import { MarkdownOutput } from './components/MarkdownOutput';

function App() {
  const [activeTab, setActiveTab] = useState<'url' | 'html'>('url');
  const [input, setInput] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!input) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await convertUrlToMarkdown(input);
      setMarkdown(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">URL to Markdown</h1>

        <ConversionTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTab === 'url'
                  ? 'Enter URL (e.g., https://example.com)'
                  : 'Paste HTML content here'
              }
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleConvert}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
            >
              {isLoading ? 'Converting...' : 'Fetch'}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <MarkdownOutput markdown={markdown} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;