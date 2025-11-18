import React, { useEffect, useRef, useCallback, useState } from 'react';
import './BallSimulation.css';

const BallSimulation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ballsRef = useRef([]);
  const wallImpactsRef = useRef([]);
  const nextBallIdRef = useRef(0);
  
  // State for managing ball count
  const [ballCount, setBallCount] = useState(5);
  const [inputValue, setInputValue] = useState('5');
  
  // Ref for mouse interaction (better for animation loop)
  const mousePositionRef = useRef({ x: null, y: null, isHovering: false });

  // Box dimensions (smaller to allow more bending space)
  const BOX_WIDTH = 700;
  const BOX_HEIGHT = 500;
  
  // Canvas dimensions (larger to accommodate wall bending)
  const CANVAS_PADDING = 50; // Extra space around the box for more dramatic bending
  const CANVAS_WIDTH = BOX_WIDTH + (CANVAS_PADDING * 2);
  const CANVAS_HEIGHT = BOX_HEIGHT + (CANVAS_PADDING * 2);

  // Create a single random ball
  const createRandomBall = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF8A65', '#9575CD', '#4DB6AC', '#AED581', '#FFB74D'];
    
    // Random mass between 0.5 and 4 (arbitrary units)
    const mass = 0.5 + Math.random() * 3.5;
    
    // Radius proportional to mass (radius = mass * 6 + 4, giving range of ~7 to 28)
    const radius = mass * 6 + 4;
    
    // Speed inversely related to mass but with variation (heavier = slower)
    const speedFactor = (2 / mass) + Math.random() * 1.5; // More variation in speeds
    const maxSpeed = speedFactor * 3;
    
    return {
      id: nextBallIdRef.current++,
      mass: mass,
      radius: radius,
      x: Math.random() * (BOX_WIDTH - 2 * radius) + radius,
      y: Math.random() * (BOX_HEIGHT - 2 * radius) + radius,
      vx: (Math.random() - 0.5) * maxSpeed * 2, // Random velocity with bigger variation
      vy: (Math.random() - 0.5) * maxSpeed * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  };

  // Initialize balls with random positions, velocities, colors, and masses
  const initializeBalls = (count = 5) => {
    const balls = [];
    
    for (let i = 0; i < count; i++) {
      balls.push(createRandomBall());
    }
    
    ballsRef.current = balls;
    nextBallIdRef.current = count;
  };

  // Add balls to reach target count
  const addBalls = (targetCount) => {
    const currentCount = ballsRef.current.length;
    const ballsToAdd = targetCount - currentCount;
    
    for (let i = 0; i < ballsToAdd; i++) {
      ballsRef.current.push(createRandomBall());
    }
  };

  // Remove balls to reach target count (randomly selected)
  const removeBalls = (targetCount) => {
    const currentCount = ballsRef.current.length;
    const ballsToRemove = currentCount - targetCount;
    
    for (let i = 0; i < ballsToRemove; i++) {
      const randomIndex = Math.floor(Math.random() * ballsRef.current.length);
      ballsRef.current.splice(randomIndex, 1);
    }
  };

  // Update ball count
  const updateBallCount = (newCount) => {
    const currentCount = ballsRef.current.length;
    
    if (newCount > currentCount) {
      addBalls(newCount);
    } else if (newCount < currentCount) {
      removeBalls(newCount);
    }
    
    setBallCount(newCount);
  };

  // Check collision between two balls
  const checkBallCollision = (ball1, ball2) => {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = ball1.radius + ball2.radius;
    
    return distance < minDistance;
  };

  // Handle collision between two balls using elastic collision physics
  const handleBallCollision = (ball1, ball2) => {
    const dx = ball2.x - ball1.x;
    const dy = ball2.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Prevent division by zero
    if (distance === 0) return;
    
    // Normalize collision vector
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Separate overlapping balls
    const overlap = ball1.radius + ball2.radius - distance;
    if (overlap > 0) {
      const separationX = (overlap / 2) * nx;
      const separationY = (overlap / 2) * ny;
      
      ball1.x -= separationX;
      ball1.y -= separationY;
      ball2.x += separationX;
      ball2.y += separationY;
    }
    
    // Calculate relative velocity
    const dvx = ball2.vx - ball1.vx;
    const dvy = ball2.vy - ball1.vy;
    
    // Calculate relative velocity along collision normal
    const dvn = dvx * nx + dvy * ny;
    
    // Do not resolve if velocities are separating
    if (dvn > 0) return;
    
    // Calculate collision impulse
    const impulse = 2 * dvn / (ball1.mass + ball2.mass);
    
    // Update velocities based on conservation of momentum
    ball1.vx += impulse * ball2.mass * nx;
    ball1.vy += impulse * ball2.mass * ny;
    ball2.vx -= impulse * ball1.mass * nx;
    ball2.vy -= impulse * ball1.mass * ny;
  };

  // Handle collision between a ball and the mouse ball (acts like a wall)
  const handleMouseBallCollision = (ball, mouseBall) => {
    const dx = mouseBall.x - ball.x;
    const dy = mouseBall.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Prevent division by zero
    if (distance === 0) return;
    
    // Normalize collision vector (normal pointing from ball to mouse)
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Calculate velocity component along collision normal
    const dotProduct = ball.vx * nx + ball.vy * ny;
    
    // Only reflect if ball is moving toward the mouse (dot product > 0)
    if (dotProduct <= 0) return;
    
    // Separate ball from mouse ball FIRST (push ball away)
    const overlap = ball.radius + mouseBall.radius - distance;
    if (overlap > 0) {
      // Push ball away from mouse with extra spacing to prevent sticking
      const separationDistance = overlap + 2; // Extra 2 pixels for clean separation
      ball.x -= separationDistance * nx;
      ball.y -= separationDistance * ny;
    }
    
    // Reflect the velocity (like bouncing off a wall)
    // Keep the same speed, just change direction
    ball.vx = ball.vx - 2 * dotProduct * nx;
    ball.vy = ball.vy - 2 * dotProduct * ny;
  };

  // Add wall impact for animation
  const addWallImpact = (wall, position, force) => {
    const impact = {
      wall: wall, // 'top', 'bottom', 'left', 'right'
      position: position, // position along the wall
      force: Math.min(force, 40), // increased cap for more dramatic effect
      time: Date.now(),
      duration: 800 // longer duration for more visible effect
    };
    
    wallImpactsRef.current.push(impact);
    
    // Remove old impacts to prevent memory buildup
    wallImpactsRef.current = wallImpactsRef.current.filter(
      impact => Date.now() - impact.time < impact.duration
    );
  };

  // Mouse event handlers
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Calculate the scale factor from CSS transforms
    const canvasActualWidth = rect.width;
    const canvasInternalWidth = CANVAS_WIDTH;
    const scaleX = canvasInternalWidth / canvasActualWidth;
    
    const canvasActualHeight = rect.height;
    const canvasInternalHeight = CANVAS_HEIGHT;
    const scaleY = canvasInternalHeight / canvasActualHeight;
    
    // Adjust mouse coordinates for scale and canvas padding
    const x = (e.clientX - rect.left) * scaleX - CANVAS_PADDING;
    const y = (e.clientY - rect.top) * scaleY - CANVAS_PADDING;
    
    // Only track mouse if it's within the simulation box
    if (x >= 0 && x <= BOX_WIDTH && y >= 0 && y <= BOX_HEIGHT) {
      mousePositionRef.current = { x, y, isHovering: true };
    } else {
      mousePositionRef.current = { x: null, y: null, isHovering: false };
    }
  };

  const handleMouseLeave = () => {
    mousePositionRef.current = { x: null, y: null, isHovering: false };
  };

  // Create virtual mouse ball for collision detection
  const createMouseBall = () => {
    const mousePos = mousePositionRef.current;
    if (!mousePos.isHovering || mousePos.x === null || mousePos.y === null) {
      return null;
    }
    
    const mouseBall = {
      id: 'mouse',
      mass: 2.0, // Medium mass
      radius: 15, // Fixed radius for mouse interaction
      x: mousePos.x,
      y: mousePos.y,
      vx: 0, // Mouse doesn't move on its own
      vy: 0,
      color: 'transparent', // Invisible
      isMouse: true // Flag to identify as mouse ball
    };
    
    return mouseBall;
  };

  // Calculate wall bend amount based on impacts
  const getWallBend = (wall, position) => {
    const currentTime = Date.now();
    let totalBend = 0;
    
    wallImpactsRef.current.forEach(impact => {
      if (impact.wall === wall) {
        const elapsed = currentTime - impact.time;
        const progress = elapsed / impact.duration;
        
        if (progress < 1) {
          // Distance from impact point
          const distance = Math.abs(position - impact.position);
          const influenceRadius = 160; // influence area
          
          if (distance < influenceRadius) {
            // Create smooth circular/bell curve effect
            const timeDecay = Math.pow(1 - progress, 1.5);
            
            // Use gaussian-like curve for smooth circular effect
            const normalizedDistance = distance / influenceRadius;
            const circularDecay = Math.exp(-Math.pow(normalizedDistance * 2.5, 2)); // Gaussian-like curve
            
            // Apply minimum bend for smoother effect at edges
            const smoothedDecay = Math.max(circularDecay, circularDecay * 0.1);
            
            const bendAmount = impact.force * timeDecay * smoothedDecay * 1.8;
            
            totalBend += bendAmount;
          }
        }
      }
    });
    
    return totalBend;
  };

  // Update ball positions and handle all collisions
  const updateBalls = () => {
    const balls = ballsRef.current;
    
    // Update positions
    balls.forEach(ball => {
      ball.x += ball.vx;
      ball.y += ball.vy;
    });
    
    // Create mouse ball if mouse is hovering
    const mouseBall = createMouseBall();
    
    // Handle ball-to-ball collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        if (checkBallCollision(balls[i], balls[j])) {
          handleBallCollision(balls[i], balls[j]);
        }
      }
    }
    
    // Handle collisions with mouse ball
    if (mouseBall) {
      balls.forEach(ball => {
        if (checkBallCollision(ball, mouseBall)) {
          // Handle collision with mouse - only the real ball bounces
          handleMouseBallCollision(ball, mouseBall);
        }
      });
    }
    
    // Handle wall collisions
    balls.forEach(ball => {
      // Collision with left or right wall
      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= BOX_WIDTH) {
        const impactForce = Math.abs(ball.vx) * ball.mass;
        
        if (ball.x - ball.radius <= 0) {
          // Left wall
          addWallImpact('left', ball.y, impactForce);
        } else {
          // Right wall
          addWallImpact('right', ball.y, impactForce);
        }
        
        ball.vx = -ball.vx;
        // Keep ball within bounds
        ball.x = Math.max(ball.radius, Math.min(BOX_WIDTH - ball.radius, ball.x));
      }

      // Collision with top or bottom wall
      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= BOX_HEIGHT) {
        const impactForce = Math.abs(ball.vy) * ball.mass;
        
        if (ball.y - ball.radius <= 0) {
          // Top wall
          addWallImpact('top', ball.x, impactForce);
        } else {
          // Bottom wall
          addWallImpact('bottom', ball.x, impactForce);
        }
        
        ball.vy = -ball.vy;
        // Keep ball within bounds
        ball.y = Math.max(ball.radius, Math.min(BOX_HEIGHT - ball.radius, ball.y));
      }
    });
  };

  // Draw the entire bent border as one continuous path
  const drawBentBorder = (ctx) => {
    const segments = 30; // Number of segments per side for smooth curves
    
    ctx.beginPath();
    
    // Start at top-left corner
    const topLeftBend = (getWallBend('top', 0) + getWallBend('left', 0)) * 0.5;
    ctx.moveTo(-topLeftBend, -topLeftBend);
    
    // Top wall (left to right)
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = t * BOX_WIDTH;
      const bend = getWallBend('top', x);
      ctx.lineTo(x, -bend);
    }
    
    // Top-right corner transition
    const topRightBend = (getWallBend('top', BOX_WIDTH) + getWallBend('right', 0)) * 0.5;
    ctx.lineTo(BOX_WIDTH + topRightBend, -topRightBend);
    
    // Right wall (top to bottom)
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const y = t * BOX_HEIGHT;
      const bend = getWallBend('right', y);
      ctx.lineTo(BOX_WIDTH + bend, y);
    }
    
    // Bottom-right corner transition
    const bottomRightBend = (getWallBend('right', BOX_HEIGHT) + getWallBend('bottom', BOX_WIDTH)) * 0.5;
    ctx.lineTo(BOX_WIDTH + bottomRightBend, BOX_HEIGHT + bottomRightBend);
    
    // Bottom wall (right to left)
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = BOX_WIDTH - t * BOX_WIDTH;
      const bend = getWallBend('bottom', x);
      ctx.lineTo(x, BOX_HEIGHT + bend);
    }
    
    // Bottom-left corner transition
    const bottomLeftBend = (getWallBend('bottom', 0) + getWallBend('left', BOX_HEIGHT)) * 0.5;
    ctx.lineTo(-bottomLeftBend, BOX_HEIGHT + bottomLeftBend);
    
    // Left wall (bottom to top)
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const y = BOX_HEIGHT - t * BOX_HEIGHT;
      const bend = getWallBend('left', y);
      ctx.lineTo(-bend, y);
    }
    
    // Close the path back to start
    ctx.closePath();
    ctx.stroke();
  };

  // Render balls on canvas
  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear and fill the entire canvas with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Save the current state and translate to center the box
    ctx.save();
    ctx.translate(CANVAS_PADDING, CANVAS_PADDING);

    // Draw bent box border with fill and stroke
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    // First draw the filled area
    ctx.fillStyle = '#f8f9fa'; // Light background for the play area
    drawBentBorder(ctx);
    ctx.fill();
    
    // Then draw the border outline
    drawBentBorder(ctx);
    ctx.stroke();

    // Draw balls
    ballsRef.current.forEach(ball => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw mouse indicator when hovering
    const mousePos = mousePositionRef.current;
    if (mousePos.isHovering && mousePos.x !== null && mousePos.y !== null) {
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; // Semi-transparent white
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'; // Semi-transparent black border
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Restore the canvas state
    ctx.restore();
  };

  // Animation loop
  const animate = useCallback(() => {
    updateBalls();
    render();
    animationRef.current = requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle input submission (Enter key or blur)
  const handleInputSubmit = () => {
    const newCount = parseInt(inputValue);
    if (!isNaN(newCount) && newCount >= 0 && newCount <= 50) {
      updateBallCount(newCount);
    } else {
      // Reset input to current ball count if invalid
      setInputValue(ballCount.toString());
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  // Initialize simulation when component mounts
  useEffect(() => {
    initializeBalls(ballCount);
    animate();

    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  // Reset simulation
  const resetSimulation = () => {
    initializeBalls(ballCount);
    wallImpactsRef.current = []; // Clear wall impacts
  };

  return (
    <div className="ball-simulation">
      {/* Left Panel - Controls and Physics Info */}
      <div className="left-panel">
        <div className="control-panel">
          <h3 className="control-title">
            <div className="control-icon">⚙️</div>
            Ball Controls
          </h3>
          <div className="ball-controls">
            <div className="input-group">
              <label className="input-label" htmlFor="ball-count">Number of balls</label>
              <div className="input-row">
                <input
                  id="ball-count"
                  type="number"
                  min="0"
                  max="50"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputSubmit}
                  onKeyPress={handleKeyPress}
                  className="ball-count-input"
                  placeholder="0-50"
                />
                <span className="current-count">{ballsRef.current.length}</span>
              </div>
            </div>
            <button onClick={resetSimulation} className="reset-button">
              🔄 Reset Simulation
            </button>
          </div>
        </div>

        <div className="control-panel info">
          <h3 className="info-title">
            <div className="control-icon">ℹ️</div>
            Physics Info
          </h3>
          <p><strong>Interactive Physics:</strong> {ballsRef.current.length} balls with realistic mass-based collisions.</p>
          <p><strong>Visual Feedback:</strong> Ball size indicates mass, walls bend on impact.</p>
          <p><strong>Mouse Control:</strong> Hover to create an invisible barrier that balls bounce off.</p>
          <p><strong>Real-time:</strong> Add/remove balls instantly with dynamic SIMULATION.</p>
        </div>
      </div>

      {/* Right Panel - Simulation */}
      <div className="simulation-container">
        <div className="simulation-header">
          <h1 className="simulation-title">SIMULATION</h1>
          <div className="simulation-status">
            <div className="status-dot"></div>
            <span>Active</span>
          </div>
        </div>
        <div className="canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="simulation-canvas"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default BallSimulation;