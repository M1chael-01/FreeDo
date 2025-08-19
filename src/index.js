// Import the createRoot function from React 18's ReactDOM API
import { createRoot } from 'react-dom/client';

// Import global CSS styles
import './index.css';

// Import the main App component
import App from './App';

// Get the DOM element where the React app will be mounted
const container = document.getElementById('app');

// Create a React root for concurrent features (React 18+)
const root = createRoot(container);

// Render the App component inside the root
// Passing a prop "tab" with value "home" to the App component
root.render(<App tab="home" />);
