import React from 'react';
import config from '../config';

const Home = () => {
  return (
    <div>
      <h1>Welcome to {config.app.name}</h1>
      <p>This is a production-ready React application starter.</p>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Environment Configuration Demo</h3>
        <p><strong>Environment:</strong> {config.app.environment}</p>
        <p><strong>API Base URL:</strong> {config.api.baseUrl}</p>
        <p><strong>Analytics Enabled:</strong> {config.features.analytics ? 'Yes' : 'No'}</p>
        <p><strong>Logging Enabled:</strong> {config.features.logging ? 'Yes' : 'No'}</p>
        <small style={{ color: '#6c757d' }}>
          Configure these values in your .env.local file
        </small>
      </div>
    </div>
  );
};

export default Home;