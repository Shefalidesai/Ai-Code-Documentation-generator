import React, { useState } from 'react';
import getGroqChatCompletion from './openaiService';

function OpenAIComponent() {
  const [codeInput, setCodeInput] = useState('');
  const [documentation, setDocumentation] = useState('');

  const handleGenerateDocumentation = async () => {
    const prompt = `Generate documentation for the following code:\n\n${codeInput}`;
    const result = await getGroqChatCompletion(prompt);
    setDocumentation(result);  // Update the state with the generated documentation
  };

  return (
    <div className="OpenAIComponent max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        AI Code Documentation Generator
      </h1>
      <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Enter your code here..."
        rows={10}
        className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <br />
      <button
        onClick={handleGenerateDocumentation}
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Generate Documentation
      </button>

      <div className="whitespace-pre-wrap bg-gray-900 text-green-400 mt-6 p-4 rounded-md font-mono">
  {documentation
    ? documentation.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              <br />
            </span>
          ))}
        </p>
      ))
    : 'Your documentation will appear here...'}
</div>

    </div>
  );
}

export default OpenAIComponent;
