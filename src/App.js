import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import TaskManager from './pages/TaskManager';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <TaskManager />
    </ErrorBoundary>
  );
}

export default App;
