import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading message="Loading about page..." />;
  }

  return (
    <div>
      <h1>About This Boilerplate</h1>
      <p>
        This React boilerplate includes modern development tools and best
        practices for building scalable web applications.
      </p>
      <ul>
        <li>React 18 with hooks</li>
        <li>Testing with Jest and React Testing Library</li>
        <li>Code quality with ESLint and Prettier</li>
        <li>Routing with React Router</li>
        <li>Error boundaries for error handling</li>
        <li>Loading components for better UX</li>
      </ul>
    </div>
  );
};

export default About;