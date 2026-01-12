import React, { useState } from 'react';
import { Button } from '../components/ui';
import Dashboard from '../components/Dashboard';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskNavigation from '../components/TaskNavigation';
import TaskFilters from '../components/TaskFilters';
import useTasks from '../hooks/useTasks';
import useCategories from '../hooks/useCategories';

const TaskManager = () => {
  const {
    tasks,
    loading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTaskStats,
  } = useTasks();

  const { categories, loading: categoriesLoading } = useCategories();

  const [currentView, setCurrentView] = useState('dashboard');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || task.categoryId === selectedCategory;
    const matchesPriority = !selectedPriority || task.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  const handleCreateTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      }
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      await toggleTaskCompletion(taskId);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    }
  };

  const renderContent = () => {
    if (showTaskForm) {
      return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <Button variant="outline" onClick={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}>
              ← Back
            </Button>
          </div>
          <TaskForm
            task={editingTask}
            onSubmit={handleCreateTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            tasks={tasks}
            categories={categories}
            stats={getTaskStats()}
          />
        );

      case 'all':
        return (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1>All Tasks</h1>
              <TaskFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
                categories={categories}
                onClearFilters={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedPriority('');
                }}
              />
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              loading={tasksLoading}
            />
          </div>
        );

      case 'completed':
        const completedTasks = tasks.filter(task => task.completed);
        return (
          <div>
            <h1>Completed Tasks</h1>
            <TaskList
              tasks={completedTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              loading={tasksLoading}
            />
          </div>
        );

      default:
        return <Dashboard tasks={tasks} categories={categories} stats={getTaskStats()} />;
    }
  };

  if (tasksLoading || categoriesLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading Task Manager...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <TaskNavigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        onNewTask={() => setShowTaskForm(true)}
      />

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
      }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default TaskManager;