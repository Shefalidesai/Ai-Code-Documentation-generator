import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component
import CodeAnalyzer from '../src/components/CodeAnalyzer';
import CodeToFlowchart from '../src/components/CodeToFlowchart'
import './App.css'; // Your global styles including dark mode
import './input.css'

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Router>
        <Header />
        <Routes>
          <Route path="code-analyzer" element={<CodeAnalyzer />} />
          <Route path="code-to-diagram" element={<CodeToFlowchart />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
