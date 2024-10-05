'use client';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-textarea/styles.css";
import { useEffect, useState } from "react";
import CodeDoc from "./code-documentation-ai/page";
import CodeSnippets from "./code-snippets/page";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'documentation' | 'snippet' | null>(null); // Updated type



  const handleToggle = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
  }, []);

  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-200 dark:bg-gray-700 rounded p-2 text-lg font-mono text-gray-900 dark:text-white animate-pulse">
              {'</>'}
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              CodeDocs
            </span>
          </div>

          <button
            onClick={handleToggle}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <section className="py-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the CodeDocs Documentation
          </h1>
          <p className="mt-4 p-4 text-lg">
            Explore the documentation to understand the tools, APIs, and guidelines to get started with our system.
          </p>
        </div>
      </section>

      {/* Button Section */}
      <section className="py-12 px-6 flex flex-col items-center gap-4">
        <button
          onClick={() => setActiveComponent('documentation')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Code Documentation
        </button>
        <button
          onClick={() => setActiveComponent('snippet')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Code Snippet
        </button>
      </section>

      {/* Render Selected Component */}
      <section className="py-12 px-6">
        {activeComponent === 'documentation' && <CodeDoc />}
        {activeComponent === 'snippet' && <CodeSnippets />}
      </section>

      <section className="py-12 px-6">
        <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
          <CopilotPopup
            instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
            labels={{
              title: "Popup Assistant",
              initial: "Need any help?",
            }}
          />
        </CopilotKit>
      </section>
    </div>
  );
}
