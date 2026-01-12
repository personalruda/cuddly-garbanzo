import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui';

const StatsGrid = ({ stats }) => (
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
);

StatsGrid.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default StatsGrid;