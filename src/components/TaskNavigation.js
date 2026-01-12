import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui';

const TaskNavigation = ({ currentView, setCurrentView, onNewTask }) => (
  <nav style={{
    backgroundColor: '#fff',
    borderBottom: '1px solid #dee2e6',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h1 style={{ margin: 0, color: '#212529' }}>Task Manager</h1>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          variant={currentView === 'dashboard' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('dashboard')}
        >
          Dashboard
        </Button>
        <Button
          variant={currentView === 'all' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('all')}
        >
          All Tasks
        </Button>
        <Button
          variant={currentView === 'completed' ? 'primary' : 'outline'}
          onClick={() => setCurrentView('completed')}
        >
          Completed
        </Button>
        <Button onClick={onNewTask}>
          + New Task
        </Button>
      </div>
    </div>
  </nav>
);

TaskNavigation.propTypes = {
  currentView: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  onNewTask: PropTypes.func.isRequired,
};

export default TaskNavigation;