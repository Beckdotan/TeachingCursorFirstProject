import React, { useState, useRef, useEffect, useCallback } from 'react';
import './ColorMatchingGame.css';

const ColorMatchingGame = () => {
  // State for the game
  const [targetColor, setTargetColor] = useState({ h: 0, s: 0, l: 50 }); // HSL format
  const [selectedColor, setSelectedColor] = useState({ h: 0, s: 0, l: 50 });
  const [hoverColor, setHoverColor] = useState(null); // For hover preview
  const [score, setScore] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [colorSelected, setColorSelected] = useState(false);
  
  // Championship state
  const [gameMode, setGameMode] = useState('menu'); // 'menu', 'name-input', 'championship', 'leaderboard'
  const [playerName, setPlayerName] = useState('');
  const [currentRound, setCurrentRound] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [championshipComplete, setChampionshipComplete] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  
  // Refs for the color wheel canvas
  const wheelCanvasRef = useRef(null);

  // Load leaderboard from localStorage on component mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('colorMatchingLeaderboard');
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Save leaderboard to localStorage
  const saveLeaderboard = (newLeaderboard) => {
    localStorage.setItem('colorMatchingLeaderboard', JSON.stringify(newLeaderboard));
    setLeaderboard(newLeaderboard);
  };

  // Start championship mode
  const startChampionship = () => {
    if (playerName.trim() === '') return;
    
    setGameMode('championship');
    setCurrentRound(1);
    setRoundScores([]);
    setChampionshipComplete(false);
    setGameStarted(true);
    generateNewTarget();
  };

  // Handle championship round completion
  const completeChampionshipRound = (roundScore) => {
    const newRoundScores = [...roundScores, roundScore];
    setRoundScores(newRoundScores);
    
    if (currentRound < 3) {
      // Move to next round
      setCurrentRound(currentRound + 1);
      setShowResult(false);
      setColorSelected(false);
      generateNewTarget();
    } else {
      // Championship complete
      const totalScore = newRoundScores.reduce((sum, score) => sum + score, 0);
      const averageScore = totalScore / 3;
      
      // Add to leaderboard
      const newEntry = {
        name: playerName,
        averageScore: Math.round(averageScore * 1000) / 1000,
        roundScores: newRoundScores,
        date: new Date().toLocaleDateString()
      };
      
      const updatedLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => a.averageScore - b.averageScore) // Lower is better
        .slice(0, 10); // Keep top 10
      
      saveLeaderboard(updatedLeaderboard);
      setChampionshipComplete(true);
    }
  };

  // Reset to menu
  const resetToMenu = () => {
    setGameMode('menu');
    setPlayerName('');
    setCurrentRound(0);
    setRoundScores([]);
    setChampionshipComplete(false);
    setGameStarted(false);
    setShowResult(false);
    setColorSelected(false);
  };

  // Generate a random target color when starting a new game
  const generateNewTarget = useCallback(() => {
    const randomHue = Math.floor(Math.random() * 360); // 0-359 degrees
    const randomSaturation = Math.floor(Math.random() * 80) + 20; // 20-100% (avoid too pale colors)
    const fixedLightness = 50; // Fixed at 50% to match the color wheel
    
    const newTarget = { h: randomHue, s: randomSaturation, l: fixedLightness };
    setTargetColor(newTarget);
    setSelectedColor({ h: 0, s: 0, l: 50 }); // Reset selection to neutral
    setHoverColor(null);
    setScore(null);
    setShowResult(false);
    setColorSelected(false);
    setGameStarted(true);
  }, []);

  // Convert HSL to RGB for display
  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
  };

  // Convert HSL to CSS color string
  const hslToCss = (hsl) => {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  };

  // Draw the color wheel on canvas
  const drawColorWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10; // Leave some padding

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the color wheel with smooth gradients
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= radius) {
          // Calculate hue and saturation
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          if (angle < 0) angle += 360;
          
          const hue = angle;
          const saturation = (distance / radius) * 100;
          const lightness = 50;
          
          // Convert HSL to RGB
          const rgb = hslToRgb(hue, saturation, lightness);
          
          // Set pixel data
          const index = (y * canvas.width + x) * 4;
          data[index] = rgb.r;     // Red
          data[index + 1] = rgb.g; // Green
          data[index + 2] = rgb.b; // Blue
          data[index + 3] = 255;   // Alpha
        }
      }
    }
    
    // Draw the image data to canvas
    ctx.putImageData(imageData, 0, 0);

    // Draw hover indicator (larger, semi-transparent)
    if (hoverColor && !showResult) {
      const hoverRadius = (hoverColor.s / 100) * radius;
      const hoverAngle = (hoverColor.h * Math.PI) / 180;
      const hoverX = centerX + hoverRadius * Math.cos(hoverAngle);
      const hoverY = centerY + hoverRadius * Math.sin(hoverAngle);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(hoverX, hoverY, 12, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(hoverX, hoverY, 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw selection indicator (only if color is selected and result is shown)
    if (colorSelected && showResult) {
      const selectedRadius = (selectedColor.s / 100) * radius;
      const selectedAngle = (selectedColor.h * Math.PI) / 180;
      const selectedX = centerX + selectedRadius * Math.cos(selectedAngle);
      const selectedY = centerY + selectedRadius * Math.sin(selectedAngle);

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(selectedX, selectedY, 10, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(selectedX, selectedY, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  }, [selectedColor, hoverColor, colorSelected, showResult]);

  // Get color at mouse position
  const getColorAtPosition = (e) => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Get mouse position relative to canvas
    const mouseX = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const mouseY = ((e.clientY - rect.top) * canvas.height) / rect.height;

    // Calculate distance from center and angle
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Only respond if mouse is within the wheel
    if (distance <= radius) {
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360; // Convert to 0-360 range
      
      const saturation = Math.min((distance / radius) * 100, 100);
      
      return {
        h: Math.round(angle),
        s: Math.round(saturation),
        l: 50 // Fixed lightness
      };
    }
    return null;
  };

  // Handle mouse hover for preview
  const handleMouseMove = (e) => {
    if (!gameStarted || showResult) return;
    
    const color = getColorAtPosition(e);
    setHoverColor(color);
  };

  // Handle click to select color and immediately show results
  const handleWheelClick = (e) => {
    if (!gameStarted || showResult) return;
    
    const color = getColorAtPosition(e);
    if (color) {
      setSelectedColor(color);
      setColorSelected(true);
      setHoverColor(null); // Clear hover when selected
      
      // Immediately calculate and show results
      calculateScoreForColor(color);
    }
  };

  // Calculate score for a specific color (used for immediate results)
  const calculateScoreForColor = (selectedCol) => {
    // Calculate difference in each component
    const hueDiff = Math.min(
      Math.abs(targetColor.h - selectedCol.h),
      360 - Math.abs(targetColor.h - selectedCol.h)
    ); // Handle hue wrap-around
    const satDiff = Math.abs(targetColor.s - selectedCol.s);
    // No lightness difference since both target and selection are always 50%

    // Calculate Euclidean distance with equal weights for hue and saturation
    const hueWeight = 1.0;  // Equal weight
    const satWeight = 1.0;  // Equal weight
    
    const rawDistance = Math.sqrt(
      Math.pow(hueDiff * hueWeight, 2) + 
      Math.pow(satDiff * satWeight, 2)
    );
    
    // Normalize to 0-1 scale
    // Maximum possible distance would be: sqrt((180*1)^2 + (100*1)^2)
    const maxDistance = Math.sqrt(
      Math.pow(180 * hueWeight, 2) + 
      Math.pow(100 * satWeight, 2)
    );
    
    const normalizedDistance = rawDistance / maxDistance;
    
    // Round to 3 decimal places for precision
    const calculatedDistance = Math.round(normalizedDistance * 1000) / 1000;
    
    setScore(calculatedDistance);
    setShowResult(true);
    
    // If in championship mode, handle round completion
    if (gameMode === 'championship' && !championshipComplete) {
      setTimeout(() => {
        completeChampionshipRound(calculatedDistance);
      }, 2000); // Show result for 2 seconds before next round
    }
  };

  // Handle mouse leave to clear hover
  const handleMouseLeave = () => {
    setHoverColor(null);
  };


  // Calculate normalized color distance (0-1 scale) - Legacy function
  const calculateScore = () => {
    if (!gameStarted || !colorSelected) return;
    calculateScoreForColor(selectedColor);
  };

  // Get score message based on distance value (0-1 scale, lower is better)
  const getScoreMessage = (distance) => {
    if (distance <= 0.05) return "🎯 Perfect! Amazing color vision!";
    if (distance <= 0.15) return "🌟 Excellent! Very close match!";
    if (distance <= 0.30) return "👍 Great job! Good eye for color!";
    if (distance <= 0.50) return "👌 Not bad! Keep practicing!";
    if (distance <= 0.80) return "🤔 Getting warmer... try again!";
    return "💪 Keep trying! You'll get better!";
  };

  // Initialize the color wheel when component mounts
  useEffect(() => {
    drawColorWheel();
  }, [drawColorWheel]);


  // Render different screens based on game mode
  if (gameMode === 'menu') {
    return (
      <div className="color-matching-game">
        <div className="menu-screen">
          <h1 className="championship-title">🏆 Color Matching Championship</h1>
          <p className="championship-description">
            Test your color vision skills! Complete 3 rounds and compete with your friends on the leaderboard.
          </p>
          <div className="menu-buttons">
            <button 
              className="championship-btn"
              onClick={() => setGameMode('name-input')}
            >
              🎯 Start Championship
            </button>
            <button 
              className="leaderboard-btn"
              onClick={() => setGameMode('leaderboard')}
            >
              🏆 View Leaderboard
            </button>
            <button 
              className="practice-btn"
              onClick={() => { setGameMode('practice'); setGameStarted(true); generateNewTarget(); }}
            >
              🎨 Practice Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameMode === 'name-input') {
    return (
      <div className="color-matching-game">
        <div className="name-input-screen">
          <h1 className="championship-title">🎯 Enter Your Name</h1>
          <p className="name-description">Enter your name to compete in the championship!</p>
          <div className="name-input-container">
            <input
              type="text"
              placeholder="Your name..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && startChampionship()}
              className="name-input"
              maxLength={20}
            />
            <button 
              className="start-championship-btn"
              onClick={startChampionship}
              disabled={playerName.trim() === ''}
            >
              🏆 Start Championship
            </button>
          </div>
          <button className="back-btn" onClick={resetToMenu}>← Back to Menu</button>
        </div>
      </div>
    );
  }

  if (gameMode === 'leaderboard') {
    return (
      <div className="color-matching-game">
        <div className="leaderboard-screen">
          <h1 className="championship-title">🏆 Championship Leaderboard</h1>
          <div className="leaderboard-container">
            {leaderboard.length === 0 ? (
              <p className="no-scores">No championship scores yet. Be the first to compete!</p>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.map((entry, index) => (
                  <div key={index} className={`leaderboard-entry ${index < 3 ? 'podium' : ''}`}>
                    <div className="rank">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </div>
                    <div className="player-info">
                      <div className="player-name">{entry.name}</div>
                      <div className="player-details">
                        Avg: {entry.averageScore} | Rounds: {entry.roundScores.map(s => s.toFixed(3)).join(', ')}
                      </div>
                      <div className="player-date">{entry.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="back-btn" onClick={resetToMenu}>← Back to Menu</button>
        </div>
      </div>
    );
  }

  // Championship or Practice mode
  return (
    <div className="color-matching-game">
      {/* Game Header */}
      <div className="game-header">
        {gameMode === 'championship' ? (
          <>
            <h1 className="game-title">🏆 Championship - {playerName}</h1>
            <div className="championship-progress">
              <p className="round-info">Round {currentRound} of 3</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentRound / 3) * 100}%` }}
                ></div>
              </div>
              {roundScores.length > 0 && (
                <p className="previous-scores">
                  Previous scores: {roundScores.map(s => s.toFixed(3)).join(', ')}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="game-title">🎨 Practice Mode</h1>
            <p className="game-description">
              Practice your color matching skills!
            </p>
          </>
        )}
      </div>

      {championshipComplete ? (
        <div className="championship-complete">
          <h2 className="complete-title">🎉 Championship Complete!</h2>
          <div className="final-results">
            <div className="final-score">
              Final Average Score: {(roundScores.reduce((sum, score) => sum + score, 0) / 3).toFixed(3)}
            </div>
            <div className="round-breakdown">
              <h3>Round Breakdown:</h3>
              {roundScores.map((score, index) => (
                <div key={index} className="round-result">
                  Round {index + 1}: {score.toFixed(3)} - {getScoreMessage(score)}
                </div>
              ))}
            </div>
          </div>
          <div className="complete-buttons">
            <button className="leaderboard-btn" onClick={() => setGameMode('leaderboard')}>
              🏆 View Leaderboard
            </button>
            <button className="new-championship-btn" onClick={resetToMenu}>
              🎯 New Championship
            </button>
          </div>
        </div>
      ) : (
        <div className="game-content">
          {/* Left Panel - Target Color and Results */}
          <div className="left-panel">
            <div className="color-display-section">
              <h3>🎯 Target Color</h3>
              <div 
                className="target-color-box"
                style={{ backgroundColor: hslToCss(targetColor) }}
              />
              
              {gameStarted && showResult && (
                <>
                  <h3>🎨 Your Selection</h3>
                  <div 
                    className="selected-color-box reveal-animation"
                    style={{ backgroundColor: hslToCss(selectedColor) }}
                  />
                </>
              )}
            </div>

            {/* Score Display */}
            {showResult && score !== null && (
              <div className="score-display">
                <div className="score-number">Distance: {score}</div>
                <div className="score-message">{getScoreMessage(score)}</div>
                <div className="color-values">
                  <div className="color-info">
                    <strong>Target:</strong> H:{targetColor.h}° S:{targetColor.s}% L:{targetColor.l}%
                  </div>
                  <div className="color-info">
                    <strong>Your pick:</strong> H:{selectedColor.h}° S:{selectedColor.s}% L:{selectedColor.l}%
                  </div>
                </div>
              </div>
            )}

            {/* Game Controls */}
            <div className="game-controls">
              {gameMode === 'practice' && (
                <button 
                  className="new-game-btn"
                  onClick={generateNewTarget}
                >
                  🎲 New Color
                </button>
              )}
              <button className="back-btn" onClick={resetToMenu}>← Back to Menu</button>
            </div>
          </div>

          {/* Right Panel - Color Wheel */}
          <div className="right-panel">
            <div className="color-wheel-section">
              <h3>🎨 Color Wheel</h3>
              <p className="wheel-instructions">
                Hover to preview colors, click to select your match!
              </p>
              <div className="wheel-container">
                <canvas
                  ref={wheelCanvasRef}
                  width={500}
                  height={500}
                  className="color-wheel"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleWheelClick}
                  style={{ cursor: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMatchingGame;
