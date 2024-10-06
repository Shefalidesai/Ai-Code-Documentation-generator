'use client';
import { useState } from "react";
import { CopilotChat } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

// Snippet Component to display added code snippets with Edit and Delete buttons
const CodeSnippet = ({
  snippet,
  onDelete,
  onEdit,
  isEditing,
  onSaveEdit,
  currentEdit,
  setCurrentEdit
}: {
  snippet: string;
  onDelete: () => void;
  onEdit: () => void;
  isEditing: boolean;
  onSaveEdit: () => void;
  currentEdit: string;
  setCurrentEdit: (value: string) => void;
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mb-4">
      {isEditing ? (
        <textarea
          value={currentEdit}
          onChange={(e) => setCurrentEdit(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700"
          rows={4}
        />
      ) : (
        <pre className="whitespace-pre-wrap">{snippet}</pre>
      )}
      <div className="mt-2 flex space-x-4">
        {isEditing ? (
          <button
            onClick={onSaveEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={onEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main Component
export default function CodeSnippets() {
  const [snippets, setSnippets] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentEdit, setCurrentEdit] = useState<string>("");

  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  // Function to make API call with headers
  const makeApiCallWithHeaders = async () => {
    try {
      const response = await fetch("https://api.copilotkit.ai/copilotkit/v1", {
        method: "POST",
        headers: {
          "X-CopilotCloud-Public-API-Key": COPILOT_CLOUD_PUBLIC_API_KEY || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "Some query",
          variables: {
            param1: "value1",
          },
        }),
      });
      
      const data = await response.json();
      console.log(data);  // Use this data as needed
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  // Handle adding a new snippet
  const handleAddSnippet = () => {
    if (currentResponse.trim()) {
      setSnippets((prevSnippets) => [...prevSnippets, currentResponse]);
      setCurrentResponse(""); // Clear the current response after saving
      makeApiCallWithHeaders(); // Call API with headers
    }
  };

  // Handle deleting a snippet
  const handleDeleteSnippet = (index: number) => {
    setSnippets((prevSnippets) => prevSnippets.filter((_, i) => i !== index));
  };

  // Handle editing a snippet
  const handleEditSnippet = (index: number) => {
    setEditingIndex(index);
    setCurrentEdit(snippets[index]); // Set the current snippet to be edited
  };

  // Handle saving the edited snippet
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedSnippets = [...snippets];
      updatedSnippets[editingIndex] = currentEdit;
      setSnippets(updatedSnippets);
      setEditingIndex(null); // Reset editing state
      setCurrentEdit(""); // Clear edit field
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
              <CodeSnippet
                key={index}
                snippet={snippet}
                onDelete={() => handleDeleteSnippet(index)}
                onEdit={() => handleEditSnippet(index)}
                isEditing={editingIndex === index}
                onSaveEdit={handleSaveEdit}
                currentEdit={currentEdit}
                setCurrentEdit={setCurrentEdit}
              />
            ))
          )}
        </div>
      </div>
    </CopilotKit>
  );
}
