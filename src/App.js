// Import React - we need this to create React components
import React, { useState } from 'react';
// Import our CSS file for styling
import './App.css';
// Import our new BouncingBalls component
import BouncingBalls from './BouncingBalls';
// Import our new Figma tooltip component
import FigmaTooltip from './FigmaTooltip';

// This is a React component - think of it as a reusable piece of your website
// Components are like custom HTML elements that you can create
function App() {
  // useState is a React "hook" - it lets us store and change data
  // Here we're creating a counter that starts at 0
  const [count, setCount] = useState(0);
  
  // NEW: State to track which tab is currently selected
  // We start with 'home' as the default tab
  const [activeTab, setActiveTab] = useState('home');
  
  // This is an array of motivational messages that will rotate
  const messages = [
    "Welcome to your first React app! 🎉",
    "You're doing great! 🌟",
    "Keep learning and building! 🚀",
    "React makes building UIs fun! ⚛️",
    "Every expert was once a beginner! 💪"
  ];

  // Function to increase the counter
  // When you click the button, this function runs
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // Function to reset the counter back to 0
  const handleReset = () => {
    setCount(0);
  };

  // NEW: Function to handle tab switching
  // When a user clicks a tab, this function updates the activeTab state
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // NEW: Function to render content based on the active tab
  // This uses "conditional rendering" - showing different content based on state
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <div className="counter-section">
              <h2>Interactive Counter</h2>
              <div className="counter-display">
                <span className="counter-number">{count}</span>
                <span className="counter-label">clicks</span>
              </div>
              
              <div className="button-group">
                <button 
                  className="btn btn-primary" 
                  onClick={handleIncrement}
                >
                  Click Me! ✨
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleReset}
                >
                  Reset 🔄
                </button>
              </div>
            </div>

            <div className="info-section">
              <h3>🎓 What you're learning:</h3>
              <ul>
                <li>✅ React components and JSX</li>
                <li>✅ State management with useState</li>
                <li>✅ Event handling (button clicks)</li>
                <li>✅ Conditional rendering</li>
                <li>✅ Modern CSS styling</li>
                <li>✅ Tab navigation system</li>
                <li>✅ Figma design integration</li>
              </ul>
            </div>
          </>
        );
      
      case 'animation':
        return (
          <div className="animation-section">
            <BouncingBalls />
          </div>
        );
      
      case 'figma':
        return (
          <div className="figma-section">
            <h2 style={{ color: 'white', marginBottom: '1rem', textAlign: 'center' }}>
              🎨 Your Figma Design
            </h2>
            <p style={{ color: 'white', opacity: 0.9, textAlign: 'center', marginBottom: '2rem' }}>
              This is the tooltip component imported from your Figma design!
            </p>
            <FigmaTooltip />
          </div>
        );
      
      default:
        return <div>Tab not found</div>;
    }
  };

  // This return statement defines what gets displayed on the screen
  // JSX lets us write HTML-like code inside JavaScript
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 My First React App</h1>
        <p className="welcome-message">
          {messages[count % messages.length]}
        </p>
      </header>
      
      <main className="app-main">
        {/* NEW: Tab Navigation System */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabChange('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`tab-button ${activeTab === 'animation' ? 'active' : ''}`}
            onClick={() => handleTabChange('animation')}
          >
            ⚡ Animation
          </button>
          <button 
            className={`tab-button ${activeTab === 'figma' ? 'active' : ''}`}
            onClick={() => handleTabChange('figma')}
          >
            🎨 Figma Design
          </button>
        </div>

        {/* NEW: Tab Content Area */}
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ using React</p>
      </footer>
    </div>
  );
}

// Export the component so other files can import and use it
export default App;
