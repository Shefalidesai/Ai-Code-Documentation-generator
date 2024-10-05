import React, { useState } from 'react';
import { analyzeCodeSnippet } from './aiService';

function CodeAnalyzer() {
  const [codeInput, setCodeInput] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleAnalyzeCode = async () => {
    const result = await analyzeCodeSnippet(codeInput);
    setSuggestions(result); // Update state with suggestions from the API
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Code Snippet Analyzer
      </h1>

      {/* Code Input TextArea */}
      <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Enter your code snippet here..."
        rows={10}
        className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      
      <button
        onClick={handleAnalyzeCode}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Analyze Code
      </button>

      {/* Display Suggestions */}
      <div className="whitespace-pre-wrap bg-gray-900 text-green-400 mt-6 p-4 rounded-md font-mono">
        {suggestions
          ? suggestions.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            ))
          : 'No suggestions available.'}
      </div>
    </div>
  );
}

export default CodeAnalyzer;
