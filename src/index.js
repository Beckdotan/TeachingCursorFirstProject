// This is the main entry point of our React application
// Think of this as the "starting line" where everything begins

// Import React library - this gives us access to React's features
import React from 'react';
// Import ReactDOM - this is what lets React work with web pages
import ReactDOM from 'react-dom/client';
// Import our main App component (we'll create this next)
import App from './App';

// Find the HTML element with id="root" in our index.html file
// This is where React will display our app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render (display) our App component inside the root element
// The <App /> syntax is called JSX - it's like HTML but for React components
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// React.StrictMode is a helper that checks for potential problems in your app
// It's like having a helpful assistant that warns you about issues
