// Import functions from React Testing Library for rendering components and querying the DOM
import { render, screen } from '@testing-library/react';

// Import the main App component to test
import App from './App';

// Define a test case
test('renders learn react link', () => {
  // Render the App component in a virtual DOM
  render(<App />);

  // Query the DOM for an element that contains the text "learn react" (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);

  // Assert that the element exists in the document
  expect(linkElement).toBeInTheDocument();
});
