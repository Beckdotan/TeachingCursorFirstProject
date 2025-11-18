import React, { useState } from 'react';
import './App.css';
import BallSimulation from './BallSimulation';
import FluidSimulation from './FluidSimulation';
import ColorMatchingGame from './ColorMatchingGame';
import MCPPage from './MCPPage';

function App() {
  const [activeTab, setActiveTab] = useState('balls');

  const tabs = [
    { id: 'balls', label: 'Bouncing Balls', icon: '⚪', component: BallSimulation },
    { id: 'fluid', label: 'Network Visualization', icon: '🕸️', component: FluidSimulation },
    { id: 'colors', label: 'Color Matching', icon: '🎨', component: ColorMatchingGame },
    { id: 'mcp', label: 'MCP Page', icon: '🎯', component: MCPPage }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || BallSimulation;

  return (
    <div className="App">
      <div className="tab-navigation">
        <div className="tab-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="simulation-content">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App;
