import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Редактор параметров/i);
  expect(titleElement).toBeInTheDocument();
});