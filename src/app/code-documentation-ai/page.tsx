"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { useEffect, useState } from "react";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core"; 

function CodeDoc() {
  const COPILOT_CLOUD_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY;
  const [darkMode, setDarkMode] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState(""); // Added for user's name

  useCopilotReadable({
    description: "Your documentation",
    value: prompt,
  });

  useCopilotAction({
    name: "greetUser",
    description: "Greet the user by their name.",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "Name of the user to greet",
      },
    ],
    handler: async ({ name }) => {
      return `Hello, ${name}! How can I assist you today?`;
    },
    render: ({ args, status, result }) => {
      if (status === "inProgress") return `Preparing to greet ${args.name}...`;
      if (status === "executing") return `Greeting ${args.name}...`;
      if (status === "complete") return result;
      return null;
    },
  });

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

  return (
    <CopilotKit publicApiKey={COPILOT_CLOUD_PUBLIC_API_KEY}>
      <div className={`max-w-7xl h-screen mx-auto p-5 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
       
        <CopilotChat
          instructions={`Your name is CodeDoc. You are an AI assistant specialized in helping developers with 
            code documentation, optimization, and best practices. 
            Provide clear explanations, suggestions for improving code quality, 
            and examples to enhance understanding. Avoid discussing topics unrelated 
            to coding or programming best practices.`}
          labels={{
            title: "Code Documentation Assistant",
            initial: `How can I assist you with code documentation and optimization?`,
          }}
        />
      </div>
    </CopilotKit>
  );
}

export default CodeDoc;
