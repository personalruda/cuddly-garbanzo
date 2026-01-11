// Environment configuration management
// Centralized configuration with defaults and validation

const config = {
  // API Configuration
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 5000,
  },

  // Feature Flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    logging: process.env.REACT_APP_ENABLE_LOGGING !== 'false', // default true
  },

  // Third-party Services
  services: {
    googleAnalyticsId: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || null,
    stripePublishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || null,
  },

  // App Metadata
  app: {
    name: process.env.REACT_APP_NAME || 'React Boilerplate',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
};

// Validation helper
const validateConfig = () => {
  const errors = [];

  if (!config.api.baseUrl) {
    errors.push('REACT_APP_API_BASE_URL is required');
  }

  if (config.features.analytics && !config.services.googleAnalyticsId) {
    errors.push('REACT_APP_GOOGLE_ANALYTICS_ID is required when analytics is enabled');
  }

  if (errors.length > 0) {
    console.error('Configuration validation errors:', errors);
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid configuration: ' + errors.join(', '));
    }
  }
};

// Validate configuration on import
validateConfig();

export default config;