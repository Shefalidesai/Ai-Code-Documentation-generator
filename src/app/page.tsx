'use client';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-textarea/styles.css";
import { useEffect, useState } from "react";
import CodeDoc from "./code-documentation-ai/page";
import CodeSnippets from "./code-snippets/page";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState<'documentation' | 'snippet' | null>(null);

  const handleSubmitMessage = async (message: string) => {
    // You can log the message or handle it in your app
    console.log("Submitted message:", message);
    // Call the API or process the message accordingly
    // You may need to send the message to your backend or API to get a response
};

const handleInProgress = (inProgress: boolean) => {
    console.log("Loading state:", inProgress);
};


  const handleToggle = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      const theme = newMode ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', newMode);
      localStorage.setItem('theme', theme);
      return newMode;
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-all duration-500 ease-in-out`}>
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gray-200 dark:bg-gray-700 rounded p-2 text-lg font-mono text-gray-900 dark:text-white animate-pulse">
              {'</>'}
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">CodeDocs</span>
          </div>
          <button
            onClick={handleToggle}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <section className="py-12 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
            Welcome to <span className="text-yellow-300">CodeDocs</span> – Where Code Meets Clarity ✨
          </h1>
          <p className="mt-6 text-xl leading-relaxed font-light max-w-3xl mx-auto drop-shadow-md">
            Ever dreamt of an AI-powered companion that turns your code into a well-documented masterpiece? Look no further! CodeDocs is here to transform the way you code, offering an intelligent, seamless experience to keep your projects organized, readable, and effortlessly productive.
          </p>
        </div>
      </section>

      <section className="py-8 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">AI-Powered Documentation 📄</h2>
              <p className="text-gray-600 dark:text-gray-300">
                CodeDocs takes the hassle out of documentation by automatically generating detailed explanations of your code. Whether you're working solo or in a team, documentation has never been easier.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Create Code Snippets 🔗</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Store frequently used pieces of code with ease. Say goodbye to repetitive tasks and enjoy faster, smarter development workflows.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Clean Code 🧹✨</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Need to whip up some reusable code? Our code snippet generator lets you create and store frequently used pieces of code in seconds. Say goodbye to repetitive tasks and hello to a faster, smarter workflow.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Documentation and Snippets ‧₊˚🖇️</h2>
              <p className="text-gray-600 dark:text-gray-300">
              With CodeDocs, coding isn't just a task – it's a journey. Explore and 
      interact with in-app AI chatbots for instant coding advice, and enjoy AI-powered suggestions that make 
      you feel like you're coding with a team of experts at your side.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Button Section */}
      <section className="py-12 px-6 flex justify-center gap-4">
        <button
          onClick={() => setActiveComponent('documentation')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Code Documentation 🚀
        </button>
        <button
          onClick={() => setActiveComponent('snippet')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
        >
          Create Code Snippet 🔗
        </button>
      </section>

      {/* Render Selected Component */}
      <section className="py-12 px-6">
        {activeComponent === 'documentation' && <CodeDoc />}
        {activeComponent === 'snippet' && <CodeSnippets />}
      </section>

      {/* Copilot Popup */}
      <section className="py-12 px-6">
        <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
          <CopilotPopup
            defaultOpen={false}
            instructions="You are assisting the user as best as you can. Answer in the best way possible given the data you have."
            labels={{
              title: "Popup Assistant",
              initial: "Need any help in your code?",
            }}
          />
        </CopilotKit>
      </section>
    </div>
  );
}
