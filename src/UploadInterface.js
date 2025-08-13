// Upload Interface component based on your Figma design
// This recreates the file upload interface you selected in Figma
import React, { useState } from 'react';

// Icon component for the cloud upload symbol
// This represents the cloud icon from your Figma design
function CloudUploadIcon() {
  return (
    <div className="cloud-icon">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M24 16C24 12.69 21.31 10 18 10C16.76 10 15.64 10.48 14.8 11.26C13.5 9.28 11.38 8 9 8C5.69 8 3 10.69 3 14C3 14.34 3.04 14.67 3.09 15H3C1.34 15 0 16.34 0 18C0 19.66 1.34 21 3 21H23C25.21 21 27 19.21 27 17C27 15.79 26.21 14.79 25.09 14.38C24.72 13.15 23.5 12.26 22 12.26C21.45 12.26 20.94 12.42 20.5 12.7C20.81 13.76 21 14.86 21 16H24Z" 
          fill="currentColor"
        />
        <path 
          d="M16 12L12 16H15V22H17V16H20L16 12Z" 
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

// Horizontal divider component
// This creates the decorative lines on either side of "or"
function HorizontalDivider() {
  return (
    <div className="horizontal-divider">
      <div className="divider-line"></div>
    </div>
  );
}

export default function UploadInterface() {
  // State to track if user is dragging files over the drop zone
  // This helps us show visual feedback during drag and drop
  const [isDragOver, setIsDragOver] = useState(false);
  
  // State to track uploaded files (for educational purposes)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file drag over event
  // This runs when user drags files over the drop zone
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default browser behavior
    setIsDragOver(true);
  };

  // Handle file drag leave event
  // This runs when user drags files away from the drop zone
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Handle file drop event
  // This runs when user drops files onto the drop zone
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Get the dropped files
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    setUploadedFiles(files);
  };

  // Handle file input change (when user clicks "Browse computer")
  // This runs when user selects files through the file picker
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    console.log('Files selected:', files);
    setUploadedFiles(files);
  };

  return (
    <div className="upload-interface-container">
      {/* Main upload card - matches your Figma design */}
      <div className={`upload-card ${isDragOver ? 'drag-over' : ''}`}
           onDragOver={handleDragOver}
           onDragLeave={handleDragLeave}
           onDrop={handleDrop}>
        
        {/* Top section with icon and title */}
        <div className="upload-header">
          <div className="upload-icon-container">
            <CloudUploadIcon />
          </div>
          
          {/* Main title - matches Figma text */}
          <div className="upload-title">8 days</div>
          
          {/* Subtitle - matches Figma text */}
          <div className="upload-subtitle">Empower Your Potential</div>
        </div>

        {/* Information box - the gray box with tips */}
        <div className="upload-info-box">
          <p className="upload-info-text">
            For best results, center key subjects, use a clean background, 
            and ensure stable footage. See best practices
          </p>
        </div>

        {/* Action buttons section */}
        <div className="upload-actions">
          {/* Browse computer button */}
          <label className="browse-button">
            <input 
              type="file" 
              multiple 
              accept="video/*"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            Browse computer
          </label>

          {/* Divider with "or" text */}
          <div className="upload-divider">
            <HorizontalDivider />
            <span className="divider-text">or</span>
            <HorizontalDivider />
          </div>

          {/* Drag and drop text */}
          <div className="drag-drop-text">
            Drag and drop video here
          </div>
        </div>

        {/* Show uploaded files if any (educational feature) */}
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h4>📁 Uploaded Files:</h4>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Educational info section */}
      <div className="upload-education">
        <h3>🎓 What you're learning:</h3>
        <ul>
          <li>✅ File drag and drop handling</li>
          <li>✅ File input controls</li>
          <li>✅ React state management</li>
          <li>✅ Event handling (drag events)</li>
          <li>✅ Converting Figma designs to code</li>
          <li>✅ CSS styling and layout</li>
        </ul>
      </div>
    </div>
  );
}
