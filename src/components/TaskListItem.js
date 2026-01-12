import React from 'react';
import PropTypes from 'prop-types';

const TaskListItem = ({ task, showCheckbox = false, showPriority = false, showDate = false }) => (
  <li style={{
    padding: '8px 0',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }}>
    {showCheckbox && (
      <input
        type="checkbox"
        checked={task.completed}
        readOnly
        style={{ margin: 0 }}
      />
    )}
    {showPriority && (
      <span style={{
        color: task.priority === 'high' ? '#dc3545' :
               task.priority === 'medium' ? '#ffc107' : '#28a745',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {task.priority.toUpperCase()}
      </span>
    )}
    <span style={{
      textDecoration: task.completed ? 'line-through' : 'none',
      color: task.completed ? '#6c757d' : '#212529'
    }}>
      {task.title}
    </span>
    {showDate && (
      <span style={{ color: '#6c757d', fontSize: '12px', marginLeft: 'auto' }}>
        {new Date(task.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        })}
      </span>
    )}
  </li>
);

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired,
  showCheckbox: PropTypes.bool,
  showPriority: PropTypes.bool,
  showDate: PropTypes.bool,
};

export default TaskListItem;