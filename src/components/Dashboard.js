import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui';

const Dashboard = ({ tasks, categories, stats }) => {
  const getTodayTasks = () => tasks.filter(task =>
    new Date(task.dueDate).toDateString() === new Date().toDateString()
  );

  const getUpcomingTasks = () => tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return dueDate > today && dueDate <= nextWeek;
  });

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '32px', color: '#212529' }}>Dashboard</h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#28a745', fontSize: '32px' }}>
              {stats.completed}
            </h2>
            <p style={{ margin: 0, color: '#6c757d' }}>Completed Tasks</p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#007bff', fontSize: '32px' }}>
              {stats.pending}
            </h2>
            <p style={{ margin: 0, color: '#6c757d' }}>Pending Tasks</p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#dc3545', fontSize: '32px' }}>
              {stats.overdue}
            </h2>
            <p style={{ margin: 0, color: '#6c757d' }}>Overdue Tasks</p>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px 0', color: '#ffc107', fontSize: '32px' }}>
              {stats.completionRate}%
            </h2>
            <p style={{ margin: 0, color: '#6c757d' }}>Completion Rate</p>
          </div>
        </Card>
      </div>

      {/* Quick Overview */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {/* Today's Tasks */}
        <Card title="Today's Tasks">
          {getTodayTasks().length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {getTodayTasks().slice(0, 5).map(task => (
                <li key={task.id} style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    style={{ margin: 0 }}
                  />
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6c757d' : '#212529'
                  }}>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#6c757d', margin: 0 }}>No tasks due today</p>
          )}
        </Card>

        {/* Upcoming Tasks */}
        <Card title="Upcoming This Week">
          {getUpcomingTasks().length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {getUpcomingTasks().slice(0, 5).map(task => (
                <li key={task.id} style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    color: task.priority === 'high' ? '#dc3545' :
                           task.priority === 'medium' ? '#ffc107' : '#28a745',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {task.priority.toUpperCase()}
                  </span>
                  <span style={{ color: '#212529' }}>{task.title}</span>
                  <span style={{ color: '#6c757d', fontSize: '12px', marginLeft: 'auto' }}>
                    {new Date(task.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#6c757d', margin: 0 }}>No upcoming tasks this week</p>
          )}
        </Card>

        {/* Recent Tasks */}
        <Card title="Recent Tasks">
          {recentTasks.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {recentTasks.map(task => (
                <li key={task.id} style={{
                  padding: '8px 0',
                  borderBottom: '1px solid #dee2e6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    color: task.completed ? '#28a745' : '#6c757d',
                    fontSize: '12px'
                  }}>
                    {task.completed ? '✓' : '○'}
                  </span>
                  <span style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6c757d' : '#212529'
                  }}>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#6c757d', margin: 0 }}>No tasks yet</p>
          )}
        </Card>

        {/* Categories Overview */}
        <Card title="Categories">
          {categories.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map(category => {
                const taskCount = tasks.filter(task => task.categoryId === category.id).length;
                return (
                  <div
                    key={category.id}
                    style={{
                      backgroundColor: category.color + '20',
                      border: `1px solid ${category.color}`,
                      color: category.color,
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {category.name} ({taskCount})
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: '#6c757d', margin: 0 }}>No categories created yet</p>
          )}
        </Card>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  tasks: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  stats: PropTypes.object.isRequired,
};

export default Dashboard;