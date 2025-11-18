import React from 'react';
import './MCPPage.css';

// Image assets from Figma - exact paths
const img1 = "/assets/019d59da802502a20cddfb908ae06d92108691aa.png";
const imgImage = "/assets/3d449e80c5e4aba75480f68cffae609ad972dc66.png";
const imgSeek = "/assets/76e2a462e5c275981032fa77daf7d2f99241d52a.png";
const img5 = "/assets/49baec31f06ed57b5390b5aad79c1daab6a5b962.png";
const img6 = "/assets/5af00cfa6376b07a9818b68cf91081caba95ad64.png";
const img7 = "/assets/afcc4ddae64117fef46aeb2939e939f9e1c4615f.png";
const img8 = "/assets/352ee1df29851ccd116d28895dfd7fb7d164896b.png";
const img9 = "/assets/afa34ba6d30cb82580f6d56c100b0b3f1d4db6ca.png";
const img10 = "/assets/1508dbfeb4565aed8fd5bb67564d1e201c265237.png";
const img11 = "/assets/b4cfcc4e5dac1c8b1fb963cc5b81b22c7ce2bca7.png";
const img12 = "/assets/51a50d5f8fea7cad19741d5cf0b7a0a19b28cb83.png";
const img13 = "/assets/cd5bb5b049e2b82855c4a3b27c847fa8b264e268.png";
const img14 = "/assets/b3139c16423276a17a20aa7d596b9a7b10f2658b.png";
const imgOrientationHorizontalAppearancePrimary = "/assets/40f472a7106d5e41218a43a0bc7402db3c5c5512.svg";
const imgLogo = "/assets/960712df173ea9a35f3cac44344af33d7cf8cb68.svg";
const imgInfo = "/assets/d781dad904f929594716699dbf01fd624df7909e.svg";
const imgResize = "/assets/87c5aa750e6b24abaf82fa255ddf272d7d869a76.svg";
const imgArrow = "/assets/14a5e2bfb545b8e3739699205830511a9a7b75b0.svg";

// Icon SVGs from Figma - all actual icons
const iconHome = "/assets/f73024ae397bc09686920fb6cd687accd1a33a80.svg";
const iconCreations = "/assets/bc606e28f8f4f020b51cafd4f8d9527c49e3466e.svg";
const iconText = "/assets/99143b6ddcdd72368d965c7cfc75ed0416f696f9.svg";
const iconPhotos = "/assets/a3373b7450fdcfd3b4fd77012d6dd7f285b46527.svg";
const iconSubscribe = "/assets/78a5e601e5183a63fbb4bab7ebcdeac145f3c454.svg";
const iconDownload = "/assets/11476a953e83811eb53235ab071a9732aafc65ea.svg";
const iconGrid = "/assets/8ad819e12b44b789ee6944a6c988954364f30817.svg";
const iconTimeline = "/assets/8dce2f8796ea1d3d2a45f194babb4ec50dfc43f1.svg";
const iconVideo = "/assets/7d492c92b9d668d390ef3b57f945fbb35fae78f5.svg";
const iconKey = "/assets/46815085a5e7b48fc2ce72839bdf23f416a381fa.svg";
const iconPlay = "/assets/bd9cb2b113712bac27b0382329badb875c94e8a4.svg";
const iconAudio = "/assets/dba8494cc16775b4a8b188dcf23c81a244454a91.svg";
const iconFullscreen = "/assets/48a710e1855e1abe8ccc558b45bba6bae1eb5c4b.svg";

// Icon Component - matches Figma structure exactly
// Icons are size-[28px] containers with different inset values per icon
function Icon({ src, className = "", size = 28, inset = "7.14%" }) {
  return (
    <div className={`mcp-icon mcp-icon-${size} ${className}`} style={{ width: `${size}px`, height: `${size}px`, position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', inset: inset }}>
        <img alt="" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} src={src} />
      </div>
    </div>
  );
}

// Progress component - exact Figma structure
function Progress({ className, plain = "plain" }) {
  if (plain === "overlay") {
    return (
      <div className={`mcp-progress mcp-progress-overlay ${className}`}>
        <div className="mcp-progress-bar-overlay"></div>
        <div className="mcp-progress-track-overlay"></div>
      </div>
    );
  }
  return (
    <div className={`mcp-progress ${className}`}>
      <div className="mcp-progress-bar"></div>
      <div className="mcp-progress-track"></div>
    </div>
  );
}

// Switch component - exact Figma structure
function Switch({ active = false, className = "" }) {
  const handle = <div className="mcp-switch-handle"></div>;
  if (active) {
    return (
      <button className={`mcp-switch mcp-switch-active ${className}`}>
        <div className="mcp-switch-handle-wrapper mcp-switch-handle-right">
          {handle}
        </div>
      </button>
    );
  }
  return (
    <div className={`mcp-switch ${className}`}>
      <div className="mcp-switch-handle-wrapper mcp-switch-handle-left">
        {handle}
      </div>
    </div>
  );
}

// Separator component
function Separator({ orientation = "horizontal", className = "" }) {
  return (
    <div className={`mcp-separator mcp-separator-${orientation} ${className}`}>
      <div className="mcp-separator-inner">
        <img alt="" className="mcp-separator-img" src={imgOrientationHorizontalAppearancePrimary} />
      </div>
    </div>
  );
}

// Logo component - exact Figma structure
function Logo({ className = "" }) {
  return (
    <div className={`mcp-logo ${className}`}>
      <div className="mcp-logo-inner">
        <div className="mcp-logo-img-wrapper">
          <img alt="" className="mcp-logo-img" src={imgLogo} />
        </div>
      </div>
    </div>
  );
}

// Button component - simplified but matching Figma structure
function Button({ 
  label, 
  iconFirst, 
  iconLast, 
  appearance = "neutral", 
  hierarchy = "plain", 
  size = "md", 
  state = "enabled",
  className = "",
  onClick 
}) {
  const isActive = state === "active";
  return (
    <button 
      className={`mcp-button mcp-button-${appearance} mcp-button-${hierarchy} mcp-button-${size} ${isActive ? 'mcp-button-active' : ''} ${className}`}
      onClick={onClick}
      disabled={state === "disabled"}
    >
      {iconFirst && <span className="mcp-button-icon-first">{iconFirst}</span>}
      {label && <span className="mcp-button-label">{label}</span>}
      {iconLast && <span className="mcp-button-icon-last">{iconLast}</span>}
    </button>
  );
}

// PickerBox component
function PickerBox({ item, className = "" }) {
  return (
    <div className={`mcp-picker-box ${className}`}>
      <span className="mcp-picker-item">{item}</span>
      <span className="mcp-picker-arrow">▼</span>
    </div>
  );
}

// Badge component
function Badge({ string, appearance = "brand", size = "xs" }) {
  return (
    <span className={`mcp-badge mcp-badge-${appearance} mcp-badge-${size}`}>
      {string}
    </span>
  );
}

// Label component
function Label({ label, className = "" }) {
  return (
    <div className={`mcp-label-component ${className}`}>
      {label}
    </div>
  );
}

function MCPPage() {
  return (
    <div className="mcp-screen">
      {/* Navbar - exact Figma structure */}
      <div className="mcp-navbar">
        <div className="mcp-navbar-master">
          <div className="mcp-navbar-container mcp-navbar-left">
            <Logo className="mcp-logo-nav" />
          </div>
          <div className="mcp-navbar-container mcp-navbar-right">
            <Button label="50% Credits" appearance="neutral" hierarchy="plain" size="md" />
            <div className="mcp-avatar-button">
              <div className="mcp-avatar-bg"></div>
              <div className="mcp-avatar-text">TS</div>
              <img src={img1} alt="Avatar" className="mcp-avatar-img" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container - exact Figma structure */}
      <div className="mcp-main-container">
        {/* Sidebar - exact dimensions: w-[240px] */}
        <div className="mcp-sidebar">
          <div className="mcp-side-menu">
            <div className="mcp-side-menu-content">
              {/* Top Navigation - gap-[8px] */}
              <div className="mcp-nav-section">
                <Button 
                  label="Home" 
                  iconFirst={<Icon src={iconHome} size={16} />}
                  appearance="neutral" 
                  hierarchy="plain" 
                  size="md" 
                />
                <Button 
                  label="My Assets" 
                  iconFirst={<Icon src={iconCreations} size={16} />}
                  appearance="neutral" 
                  hierarchy="plain" 
                  size="md" 
                />
              </div>

              {/* API Playground Section - gap-[8px] */}
              <div className="mcp-nav-section">
                <div className="mcp-separator-wrapper">
                  <Separator orientation="horizontal" />
                </div>
                <Label label="API Playground" />
                <div className="mcp-nav-section">
                  <Button 
                    label="Text to video" 
                    iconFirst={<Icon src={iconText} size={16} />}
                    appearance="neutral" 
                    hierarchy="plain" 
                    size="md" 
                    state="active"
                  />
                  <Button 
                    label="Image to video" 
                    iconFirst={<Icon src={iconPhotos} size={16} />}
                    appearance="neutral" 
                    hierarchy="plain" 
                    size="md" 
                  />
                </div>
              </div>

              {/* Studio Section - gap-[8px] */}
              <div className="mcp-nav-section">
                <div className="mcp-separator-wrapper">
                  <Separator orientation="horizontal" />
                </div>
                <Label label="Studio" />
                <div className="mcp-nav-section">
                  <Button label="New Storyboard" iconFirst={<Icon src={iconGrid} size={16} />} appearance="neutral" hierarchy="plain" size="md" />
                  <Button label="New Timeline" iconFirst={<Icon src={iconTimeline} size={16} />} appearance="neutral" hierarchy="plain" size="md" />
                  <Button label="Generate Videos" iconFirst={<Icon src={iconVideo} size={16} />} appearance="neutral" hierarchy="plain" size="md" />
                  <Button label="Generate Images" iconFirst={<Icon src={iconPhotos} size={16} />} appearance="neutral" hierarchy="plain" size="md" />
                  <Button label="Pro Actor Library (Archive)" appearance="neutral" hierarchy="plain" size="md" />
                </div>
              </div>
            </div>

            {/* Bottom Navigation - bg-[#fafafa] */}
            <div className="mcp-side-menu-bottom">
              <Button label="API Docs" appearance="neutral" hierarchy="plain" size="md" />
              <Button label="Contact sales" appearance="neutral" hierarchy="plain" size="md" />
            </div>
          </div>
        </div>

        {/* Content Area - exact dimensions: max-w-[1210px], w-[1200px] */}
        <div className="mcp-content-area">
          <div className="mcp-content-wrapper">
            {/* Title Section - gap-[24px] */}
            <div className="mcp-title-section">
              <h1 className="mcp-title">API Playground</h1>
              <Button 
                label=" Get API access" 
                iconFirst={<Icon src={iconKey} size={28} inset="10.71% 15.07% 9.65% 14.29%" />}
                appearance="neutral" 
                hierarchy="primary" 
                size="md" 
              />
            </div>

            {/* Playground Section - gap-[24px] */}
            <div className="mcp-playground-section">
              {/* Controls Panel - w-[400px], gap-[24px] */}
              <div className="mcp-controls-panel">
                {/* Prompt Section - gap-[16px], w-[352px] */}
                <div className="mcp-prompt-section">
                  <div className="mcp-control-label-row">
                    <div className="mcp-control-label">
                      <span>PROMPT</span>
                      <div className="mcp-info-icon-wrapper">
                        <img src={imgInfo} alt="Info" className="mcp-info-icon" />
                      </div>
                    </div>
                  </div>
                  <div className="mcp-text-input-wrapper">
                    <div className="mcp-text-input">
                      <textarea 
                        className="mcp-textarea"
                        placeholder="Write a prompt..."
                        defaultValue="a woman leaning gracefully on a glossy yellow tiled surface, set against a rich teal-blue tiled wall. She exudes a sleek, confident aura with her head resting on her crossed arms, gazing directly at the camera. Her look is bold and modern — she wears translucent orange sunglasses that cast a warm tint over her face, paired with statement pearl earrings and a black halter-style top."
                      />
                      <div className="mcp-resize-handle">
                        <img src={imgResize} alt="Resize" />
                      </div>
                    </div>
                  </div>
                  <div className="mcp-hint-text">
                    <p>Min. Characters: 300</p>
                    <p>Longer, detailed prompts lead to better, more accurate results.</p>
                  </div>
                </div>

                {/* Model Selection - gap-[16px] */}
                <div className="mcp-control-group">
                  <div className="mcp-control-label-row">
                    <div className="mcp-control-label">
                      <span>MODEL</span>
                    </div>
                  </div>
                  <PickerBox item="Fast" />
                </div>

                {/* Settings Row - gap-[16px] */}
                <div className="mcp-settings-row">
                  <div className="mcp-control-group">
                    <div className="mcp-control-label-row">
                      <div className="mcp-control-label">
                        <span>DURATION</span>
                      </div>
                    </div>
                    <PickerBox item="8 sec" />
                  </div>
                  <div className="mcp-control-group">
                    <div className="mcp-control-label-row">
                      <div className="mcp-control-label">
                        <span>RESOLUTION</span>
                      </div>
                    </div>
                    <PickerBox item="Full HD" />
                  </div>
                  <div className="mcp-control-group">
                    <div className="mcp-control-label-row">
                      <div className="mcp-control-label">
                        <span>FPS</span>
                      </div>
                    </div>
                    <PickerBox item="25" />
                  </div>
                </div>

                {/* Audio Switch - gap-[4px] */}
                <div className="mcp-switch-group">
                  <div className="mcp-switch-label-row">
                    <div className="mcp-switch-label">
                      <span>AUDIO</span>
                      <Badge string="Preview" appearance="brand" size="xs" />
                    </div>
                    <Switch active={true} />
                  </div>
                </div>

                {/* Action Buttons - gap-[8px] */}
                <div className="mcp-action-buttons">
                  <Button label="Reset" appearance="neutral" hierarchy="plain" size="lg" />
                  <Button 
                    label="Generate video" 
                    iconFirst={<Icon src={iconSubscribe} size={16} />}
                    appearance="brand" 
                    hierarchy="primary" 
                    size="lg" 
                  />
                </div>
              </div>

              {/* Result Panel - flex: 1, gap-[16px] */}
              <div className="mcp-result-panel">
                <div className="mcp-result-header">
                  <div className="mcp-result-title">RESULT</div>
                  <Button 
                    label="Download" 
                    iconFirst={<Icon src={iconDownload} size={28} />}
                    appearance="neutral" 
                    hierarchy="secondary" 
                    size="md" 
                  />
                </div>
                <div className="mcp-video-player">
                  <div className="mcp-video-image-wrapper">
                    <img src={imgImage} alt="Video preview" className="mcp-video-image" />
                  </div>
                  <div className="mcp-video-controls">
                    <img src={imgSeek} alt="Controls background" className="mcp-video-controls-bg" />
                    <div className="mcp-video-controls-buttons-left">
                      <Button label="" iconFirst={<Icon src={iconPlay} size={28} inset="14.29% 14.29% 14.29% 21.43%" />} appearance="white" hierarchy="plain" size="md" />
                      <Button label="" iconFirst={<Icon src={iconAudio} size={28} inset="10.7% 10.71%" />} appearance="white" hierarchy="plain" size="md" />
                    </div>
                    <div className="mcp-video-timeline">
                      <span className="mcp-time">0:02</span>
                      <Progress plain="overlay" className="mcp-video-progress" />
                      <span className="mcp-time">0:04</span>
                    </div>
                    <Button label="" iconFirst={<Icon src={iconFullscreen} size={28} inset="10.71%" />} appearance="white" hierarchy="plain" size="md" />
                  </div>
                  <div className="mcp-video-top-right"></div>
                </div>
              </div>
            </div>

            {/* Generation History - gap-[24px] */}
            <div className="mcp-history-section">
              <div className="mcp-history-header">
                <div className="mcp-history-title">GENERATION HISTORY</div>
                <div className="mcp-history-arrow">
                  <img src={imgArrow} alt="Arrow" />
                </div>
              </div>
              <div className="mcp-history-grid">
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={imgImage} alt="History 1" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img5} alt="History 2" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img6} alt="History 3" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img7} alt="History 4" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img8} alt="History 5" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img9} alt="History 6" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img10} alt="History 7" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img11} alt="History 8" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img12} alt="History 9" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img13} alt="History 10" />
                  </div>
                </div>
                <div className="mcp-history-item">
                  <div className="mcp-history-thumbnail">
                    <img src={img14} alt="History 11" />
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

export default MCPPage;
