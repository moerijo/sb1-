import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

export async function convertUrlToMarkdown(url: string): Promise<string> {
  try {
    // Use a CORS proxy to fetch the content
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    
    const html = await response.text();
    
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Use Readability to extract the main content
    const reader = new Readability(doc);
    const article = reader.parse();
    
    if (!article) {
      throw new Error('Could not parse article content');
    }
    
    // Convert HTML to Markdown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced'
    });
    
    return turndownService.turndown(article.content);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to convert URL: ${error.message}`);
    }
    throw new Error('Failed to convert URL');
  }
}