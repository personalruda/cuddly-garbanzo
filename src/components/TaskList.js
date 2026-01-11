import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui';
import { PRIORITY_LEVELS, isTaskOverdue, isTaskDueToday, isTaskDueSoon } from '../models';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, loading = false }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return { bg: '#fee', border: '#fcc', text: '#c33' };
      case PRIORITY_LEVELS.MEDIUM:
        return { bg: '#ffe', border: '#ffc', text: '#a80' };
      case PRIORITY_LEVELS.LOW:
        return { bg: '#efe', border: '#cfc', text: '#363' };
      default:
        return { bg: '#f8f9fa', border: '#dee2e6', text: '#495057' };
    }
  };

  const getDueDateStatus = (task) => {
    if (isTaskOverdue(task)) {
      return { text: 'Overdue', color: '#dc3545', bg: '#f8d7da' };
    }
    if (isTaskDueToday(task)) {
      return { text: 'Due Today', color: '#fd7e14', bg: '#fff3cd' };
    }
    if (isTaskDueSoon(task)) {
      return { text: 'Due Soon', color: '#ffc107', bg: '#fff3cd' };
    }
    return null;
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          <h3>No tasks found</h3>
          <p>Create your first task to get started!</p>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {tasks.map(task => {
        const priorityStyle = getPriorityColor(task.priority);
        const dueDateStatus = getDueDateStatus(task);

        return (
          <Card
            key={task.id}
            style={{
              borderLeft: `4px solid ${priorityStyle.border}`,
              opacity: task.completed ? 0.7 : 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                style={{
                  marginTop: '4px',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                }}
              />

              {/* Task Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <h3 style={{
                    margin: 0,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6c757d' : '#212529',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}>
                    {task.title}
                  </h3>

                  {/* Priority Badge */}
                  <span style={{
                    padding: '2px 8px',
                    backgroundColor: priorityStyle.bg,
                    color: priorityStyle.text,
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                  }}>
                    {task.priority}
                  </span>

                  {/* Due Date Status */}
                  {dueDateStatus && !task.completed && (
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: dueDateStatus.bg,
                      color: dueDateStatus.color,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}>
                      {dueDateStatus.text}
                    </span>
                  )}
                </div>

                {task.description && (
                  <p style={{
                    margin: '0 0 12px 0',
                    color: task.completed ? '#6c757d' : '#495057',
                    lineHeight: '1.5',
                  }}>
                    {task.description}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '14px',
                  color: '#6c757d'
                }}>
                  {task.dueDate && (
                    <span>📅 Due: {formatDueDate(task.dueDate)}</span>
                  )}
                  {task.categoryId && (
                    <span>🏷️ Category: {task.categoryId}</span>
                  )}
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onEdit(task)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default TaskList;