// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/Home';
import ContestPage from './pages/Contest';
import CodeEditorPage from './pages/CodeEditor';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contest/:contestId" element={<ContestPage />} />
          <Route path="/code/:contestId/:questionId" element={<CodeEditorPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;