import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText('Home');
  const aboutLink = screen.getByText('About');
  const contactLink = screen.getByText('Contact');
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});

test('renders home page content', () => {
  render(<App />);
  const heading = screen.getByText(/Welcome to/);
  const description = screen.getByText(
    'This is a production-ready React application starter.'
  );
  expect(heading).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('renders main element', () => {
  render(<App />);
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
});
