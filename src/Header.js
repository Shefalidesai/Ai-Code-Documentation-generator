import React, { useState, useEffect } from 'react';
import OpenAIComponent from './OpenAIComponent';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); // Track the current route

  // Toggle dark mode and store the preference in localStorage
  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Set theme based on localStorage or system preference on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      // Check system theme preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo for Code Documentation Website with Continuous Animation */}
          <div className="flex items-center">
            {/* Continuously animated logo */}
            <div
              className="bg-gray-200 dark:bg-gray-700 rounded p-2 text-lg font-mono text-gray-900 dark:text-white transform animate-pulse-animation"
              style={{ transitionTimingFunction: 'ease-in-out' }}
            >
              {'</>'} {/* Code icon logo */}
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              CodeDocs
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Documentation
            </a>
            <Link to="/code-analyzer" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Code Analyzer
            </Link>
            <Link to="/code-to-diagram" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Code to Diagram
            </Link>
          </nav>

          {/* Dark Mode Toggle */}
          <div className="md:block">
            <button
              onClick={handleToggle}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* New Content Section Below Header */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white font-sans">
            Welcome to the CodeDocs Documentation
          </h1>
          <p className="mt-4 p-4 text-lg text-gray-600 dark:text-gray-300 font-sans">
            Explore the documentation to understand the tools, APIs, and guidelines to get started with our system.
          </p>

          {location.pathname !== '/code-analyzer' && location.pathname !== '/code-to-diagram' && <OpenAIComponent />}
          </div>
      </section>
    </>
  );
};

export default Header;
