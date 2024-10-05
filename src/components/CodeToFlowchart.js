// src/CodeToFlowchart.js
import React, { useEffect, useState } from 'react';
import mermaid from 'mermaid';

function CodeToFlowchart() {
  const [codeInput, setCodeInput] = useState('');
  const [flowchartCode, setFlowchartCode] = useState('');

  useEffect(() => {
    if (flowchartCode) {
      mermaid.contentLoaded(); // Renders the Mermaid diagram after the state update
    }
  }, [flowchartCode]);

  const handleGenerateFlowchart = () => {
    // Example flowchart based on input code logic
    const mermaidCode = `
      graph TD;
      A[Start] --> B[Input number];
      B --> C{number > 0};
      C -->|Yes| D[Print "Positive"];
      C -->|No| E{number < 0};
      E -->|Yes| F[Print "Negative"];
      E -->|No| G[Print "Zero"];
      D --> H[End];
      F --> H[End];
      G --> H[End];
    `;
    setFlowchartCode(mermaidCode); // Set the generated Mermaid code
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Code to Flowchart Generator
      </h1>

      {/* Code Input Area */}
      <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Enter your code here..."
        rows={10}
        className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      
      <button
        onClick={handleGenerateFlowchart}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Generate Flowchart
      </button>

      {/* Display User Input Code */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800">Code Input:</h2>
        <pre className="bg-gray-200 p-4 rounded-md whitespace-pre-wrap">
          {codeInput}
        </pre>
      </div>

      {/* Display Generated Mermaid Flowchart */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800">Generated Flowchart:</h2>
        {flowchartCode && (
          <div className="mermaid">
            {flowchartCode}
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeToFlowchart;
