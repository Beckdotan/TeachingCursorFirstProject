// This is your Figma component converted to React!
// It's a tooltip that gives video editing tips
import React from 'react';

// These are placeholder image URLs - in a real app, you'd host these images
// For now, I'm using placeholder colors to represent the images
function IconsActionsCloseSmall() {
  return (
    <div
      className="relative size-full"
      style={{ width: '28px', height: '28px' }}
    >
      <div
        className="absolute" 
        style={{
          top: '30%',
          left: '30%',
          right: '30%',
          bottom: '30%',
          backgroundColor: '#666',
          borderRadius: '2px'
        }}
      >
        {/* This represents the close icon - you can replace with an actual X */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>×</div>
      </div>
    </div>
  );
}

export default function FigmaTooltip() {
  return (
    <div className="figma-tooltip-container">
      <div className="figma-tooltip">
        {/* Header section with title and close button */}
        <div className="tooltip-header">
          <div className="title-section">
            <h3 className="tooltip-title">
              Choose Videos for Best Results
            </h3>
          </div>
          <div className="close-button">
            <IconsActionsCloseSmall />
          </div>
        </div>
        
        {/* Subtitle */}
        <p className="tooltip-subtitle">
          Tips for clean, AI-powered reframing
        </p>

        {/* Video preview section */}
        <div className="video-preview">
          {/* Placeholder for the video preview - using a gradient background */}
          <div className="video-placeholder">
            <div className="video-frame">
              {/* Placeholder for the dog image */}
              <div className="dog-placeholder">🐕</div>
              <div className="frame-corners">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips section */}
        <div className="tips-section">
          <div className="tip-item">
            <div className="tip-icon">✓</div>
            <div className="tip-content">
              <h4 className="tip-title">Pick a Well-Framed Shot</h4>
              <p className="tip-description">
                Choose videos where the subject is already centered and not
                too close to the edges.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">✓</div>
            <div className="tip-content">
              <h4 className="tip-title">Avoid Busy Graphics</h4>
              <p className="tip-description">
                Use tool before adding graphic overlays to avoid cropped
                content during reframing.
              </p>
            </div>
          </div>

          <div className="tip-item">
            <div className="tip-icon">✓</div>
            <div className="tip-content">
              <h4 className="tip-title">Use Stable, Bright Clips</h4>
              <p className="tip-description">
                Use steady, well-lit clips so the AI can find your subject.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom arrow tip */}
        <div className="tooltip-arrow"></div>
      </div>
    </div>
  );
}
