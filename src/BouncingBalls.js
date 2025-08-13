// Import React hooks for managing component state and lifecycle
import React, { useRef, useEffect, useState } from 'react';

// BouncingBalls Component
// This creates an animated canvas with 3 balls bouncing around
function BouncingBalls() {
  // useRef creates a reference to the canvas HTML element
  // Think of it as a way to "grab" the canvas so we can draw on it
  const canvasRef = useRef(null);
  
  // useState to control whether animation is running
  const [isAnimating, setIsAnimating] = useState(true);
  
  // useRef to store our animation frame ID (for stopping animation)
  const animationId = useRef(null);

  // useEffect runs when the component first loads (like componentDidMount)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // Get the drawing context
    
    // Set canvas size - our "square" container
    const canvasSize = 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    // Ball configuration
    // Each ball has: x position, y position, x velocity, y velocity, radius, color
    const balls = [
      {
        x: 50,          // Starting x position
        y: 50,          // Starting y position  
        vx: 3,          // Velocity in x direction (3 pixels per frame)
        vy: 2,          // Velocity in y direction (2 pixels per frame)
        radius: 15,     // Ball size
        color: '#FF6B6B' // Red ball
      },
      {
        x: 200,
        y: 100,
        vx: -2,         // Negative velocity = moving left
        vy: 4,
        radius: 12,
        color: '#4ECDC4' // Teal ball
      },
      {
        x: 300,
        y: 250,
        vx: 4,
        vy: -3,         // Negative velocity = moving up
        radius: 18,
        color: '#45B7D1' // Blue ball
      }
    ];

    // Animation function - this runs many times per second
    function animate() {
      // Clear the entire canvas (like erasing a whiteboard)
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      
      // Draw the container border (our "square")
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, canvasSize, canvasSize);
      
      // Update and draw each ball
      balls.forEach(ball => {
        // PHYSICS: Update ball position based on velocity
        ball.x += ball.vx;  // Move horizontally
        ball.y += ball.vy;  // Move vertically
        
        // COLLISION DETECTION: Check if ball hits walls and bounce
        // Left wall or right wall collision
        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= canvasSize) {
          ball.vx = -ball.vx; // Reverse horizontal direction
          // Keep ball inside bounds
          ball.x = Math.max(ball.radius, Math.min(canvasSize - ball.radius, ball.x));
        }
        
        // Top wall or bottom wall collision  
        if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= canvasSize) {
          ball.vy = -ball.vy; // Reverse vertical direction
          // Keep ball inside bounds
          ball.y = Math.max(ball.radius, Math.min(canvasSize - ball.radius, ball.y));
        }
        
        // DRAWING: Draw the ball on canvas
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); // Draw circle
        ctx.fillStyle = ball.color;
        ctx.fill();
        
        // Add a subtle shadow/border for better visibility
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      
      // Schedule the next frame (creates smooth animation)
      // This makes animate() run again on the next screen refresh
      if (isAnimating) {
        animationId.current = requestAnimationFrame(animate);
      }
    }
    
    // Start the animation
    if (isAnimating) {
      animate();
    }
    
    // Cleanup function - runs when component unmounts or dependencies change
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isAnimating]); // Re-run effect when isAnimating changes

  // Function to toggle animation on/off
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  // Render the component
  return (
    <div className="bouncing-balls-container">
      <h2>Bouncing Balls Animation</h2>
      <p>Watch 3 balls bounce around in a square container!</p>
      
      {/* The canvas element where we draw the animation */}
      <canvas 
        ref={canvasRef}
        className="bouncing-balls-canvas"
        style={{
          border: '2px solid #333',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      />
      
      {/* Control button to start/stop animation */}
      <div className="controls">
        <button 
          onClick={toggleAnimation}
          className="btn btn-primary"
          style={{ marginTop: '15px' }}
        >
          {isAnimating ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>
      
      {/* Educational info */}
      <div className="info-box" style={{ 
        marginTop: '15px', 
        padding: '15px', 
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>🎓 What's happening here:</h4>
        <ul style={{ textAlign: 'left' }}>
          <li><strong>Canvas API:</strong> Drawing graphics in real-time</li>
          <li><strong>Physics Simulation:</strong> Each ball has position and velocity</li>
          <li><strong>Collision Detection:</strong> Balls bounce when hitting walls</li>
          <li><strong>Animation Loop:</strong> 60 frames per second for smooth motion</li>
        </ul>
      </div>
    </div>
  );
}

export default BouncingBalls;



