import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Manager application', () => {
  render(<App />);
  const taskManagerTitle = screen.getByText('Task Manager');
  expect(taskManagerTitle).toBeInTheDocument();
});

test('renders navigation buttons', () => {
  render(<App />);
  const allTasksButton = screen.getByText('All Tasks');
  const completedButton = screen.getByText('Completed');
  const newTaskButton = screen.getByText('+ New Task');

  expect(allTasksButton).toBeInTheDocument();
  expect(completedButton).toBeInTheDocument();
  expect(newTaskButton).toBeInTheDocument();
});

test('renders dashboard content', () => {
  render(<App />);
  const dashboardHeading = screen.getByRole('heading', { level: 1, name: 'Dashboard' });
  expect(dashboardHeading).toBeInTheDocument();
});
