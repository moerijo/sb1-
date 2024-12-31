import React from 'react';
import { Link2, FileText } from 'lucide-react';

interface ConversionTabsProps {
  activeTab: 'url' | 'html';
  onTabChange: (tab: 'url' | 'html') => void;
}

export function ConversionTabs({ activeTab, onTabChange }: ConversionTabsProps) {
  return (
    <div className="flex space-x-2 mb-6">
      <button
        onClick={() => onTabChange('url')}
        className={`flex items-center px-6 py-2 rounded-lg ${
          activeTab === 'url'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Link2 className="w-4 h-4 mr-2" />
        URL Input
      </button>
      <button
        onClick={() => onTabChange('html')}
        className={`flex items-center px-6 py-2 rounded-lg ${
          activeTab === 'html'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <FileText className="w-4 h-4 mr-2" />
        HTML Input
      </button>
    </div>
  );
}