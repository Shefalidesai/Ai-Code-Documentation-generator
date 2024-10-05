'use client';
import { useState } from "react";
import { CopilotChat } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

// Snippet Component to display added code snippets
const CodeSnippet = ({ snippet }: { snippet: string }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
      <pre className="whitespace-pre-wrap">{snippet}</pre>
    </div>
  );
};

// Main Component
export default function CodeSnippets() {
  const [snippets, setSnippets] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>("");

  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  // Handle adding a new snippet manually when user clicks "Save Snippet"
  const handleAddSnippet = () => {
    if (currentResponse.trim()) {
      setSnippets((prevSnippets) => [...prevSnippets, currentResponse]);
      setCurrentResponse(""); // Clear the current response after saving
    }
  };

  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Code Snippet Creator</h1>

        {/* Code Snippet Generator */}
        <div className="mb-6">
          <CopilotChat
            instructions={`You are a helpful AI that generates code snippets based on prompts. Return only the code without any extra commentary.`}
            labels={{
              title: "Generate a Code Snippet",
              initial: "Ask for a code snippet (e.g., 'Write a function to reverse a string in JavaScript').",
            }}
          />
        </div>

        {/* Capture Response Section */}
        <div className="mb-4">
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Copy the response from Copilot here, then save it as a snippet"
            className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700"
            rows={4}
          />
        </div>

        {/* Save Snippet Button */}
        <button
          onClick={handleAddSnippet}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          disabled={!currentResponse.trim()}
        >
          Save Snippet
        </button>

        {/* Snippet Display Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Generated Code Snippets</h2>
          {snippets.length === 0 ? (
            <p>No snippets generated yet. Ask for one using the chat above!</p>
          ) : (
            snippets.map((snippet, index) => (
              <CodeSnippet key={index} snippet={snippet} />
            ))
          )}
        </div>
      </div>
    </CopilotKit>
  );
}
