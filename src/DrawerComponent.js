// This is your Figma Drawer component - a navigation menu
// It was automatically generated from your Figma design using the Figma MCP!
// This component uses the EXACT design from Figma with real icons and styling
import React from 'react';
// Import the component's CSS styles
import './DrawerComponent.css';

// Image assets from Figma - these are the actual SVG icons
// These URLs point to the Figma MCP local server which serves the design assets
const imgObjectColor = "http://localhost:3845/assets/b09b5fb12155b9b3eb3e302329dbe3736e64111d.svg";  // Rename icon
const imgObjectColor1 = "http://localhost:3845/assets/c866a8705e92b5c8df6af778eb4052da990d3010.svg"; // Messages icon
const imgObjectColor2 = "http://localhost:3845/assets/cb6627c60c0550ccf8846cb343cadb2228db933b.svg"; // Expand icon
const imgObjectColor3 = "http://localhost:3845/assets/f268ffec7a04d1eb4198371464498bcdc565e97e.svg"; // Projects icon
const imgObjectColor4 = "http://localhost:3845/assets/f73024ae397bc09686920fb6cd687accd1a33a80.svg"; // Home icon
const img = "http://localhost:3845/assets/a76dd8d6c5890ec13256b9135d348914de01036a.svg";          // Arrow forward
const img1 = "http://localhost:3845/assets/0e8f36a3e8ff4ab845427bf8409f29b142af7dbe.svg";         // Arrow down

// Icon Components - These match the exact Figma design
// Each icon uses absolute positioning to place the SVG correctly within its container

function IconsFeaturesRename({ className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '10.71%' }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgObjectColor} />
      </div>
    </div>
  );
}

function IconsNavigationMessages({ className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '7.14%' }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgObjectColor1} />
      </div>
    </div>
  );
}

function IconsActionsExpand({ className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '7.14%' }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgObjectColor2} />
      </div>
    </div>
  );
}

function IconsNavigationProjects({ className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '14.29%' }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgObjectColor3} />
      </div>
    </div>
  );
}

function IconsNavigationHomeStroke({ className }) {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '7.13%', right: '10.71%', bottom: '10.71%', left: '10.71%' }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={imgObjectColor4} />
      </div>
    </div>
  );
}

// Main Drawer Component
// This creates the entire navigation drawer with all menu items
// Every detail matches the Figma design exactly
export default function DrawerComponent() {
  return (
    <div className="drawer-container-wrapper">
      <div className="drawer-main">
        <div className="drawer-paper">
          <div className="drawer-menu">
            
            {/* Header Section - "CONTENT LAB" with NEW badge */}
            <div className="drawer-section-header">
              <div className="header-content">
                <p className="section-title">
                  CONTENT LAB
                </p>
                <div className="new-badge-container">
                  <div className="new-badge-inner">
                    <p className="new-badge-label">
                      NEW
                    </p>
                  </div>
                </div>
              </div>
              <div className="header-arrow-container">
                <div className="arrow-rotate-90">
                  <div className="arrow-icon-small">
                    <div className="arrow-inner">
                      <div className="arrow-scale">
                        <div className="arrow-svg-wrapper">
                          <div className="arrow-svg-inner">
                            <img alt="" className="arrow-img" src={img} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu Items List */}
            <div className="menu-items-list">
              
              {/* Menu Item: Home */}
              <div className="list-item">
                <div className="list-item-container">
                  <div className="list-item-icon">
                    <IconsNavigationHomeStroke className="icon-24" />
                  </div>
                  <div className="list-item-text-wrapper">
                    <p className="list-item-label">
                      Home
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu Item: Projects */}
              <div className="list-item">
                <div className="list-item-container">
                  <div className="list-item-icon">
                    <IconsNavigationProjects className="icon-24" />
                  </div>
                  <div className="list-item-text-wrapper">
                    <p className="list-item-label">
                      Projects
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu Item: Reframe */}
              <div className="list-item">
                <div className="list-item-container">
                  <div className="list-item-icon">
                    <IconsActionsExpand className="icon-24" />
                  </div>
                  <div className="list-item-text-wrapper">
                    <p className="list-item-label">
                      Reframe
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu Item: Dub (Active/Selected State) */}
              {/* This one has a background color to show it's selected */}
              <div className="list-item active-item">
                <div className="list-item-container">
                  <div className="list-item-icon">
                    <IconsNavigationMessages className="icon-24" />
                  </div>
                  <div className="list-item-text-wrapper">
                    <p className="list-item-label active-label">
                      Dub
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu Item: Rephrase */}
              <div className="list-item">
                <div className="list-item-container">
                  <div className="list-item-icon">
                    <IconsFeaturesRename className="icon-24" />
                  </div>
                  <div className="list-item-text-wrapper">
                    <p className="list-item-label">
                      Rephrase
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Section - "CREATOR ECOSYSTEM" */}
            <div className="drawer-footer-section">
              <div className="footer-wrapper">
                <div className="footer-section-header">
                  <div className="footer-title-wrapper">
                    <p className="section-title">
                      CREATOR ECOSYSTEM
                    </p>
                  </div>
                  <div className="footer-arrow-container">
                    <div className="arrow-rotate-270">
                      <div className="arrow-icon-small">
                        <div className="arrow-down-inner">
                          <div className="arrow-down-svg">
                            <img alt="" className="arrow-img" src={img1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

