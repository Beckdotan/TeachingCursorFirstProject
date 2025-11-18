import React, { useEffect, useRef, useCallback, useState } from 'react';
import './FluidSimulation.css';

const FluidSimulation = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const connectionDistanceRef = useRef(120);
  
  // User controllable parameters
  const [particleCount, setParticleCount] = useState(80);
  const [connectionDistance, setConnectionDistance] = useState(120);
  
  // Fixed parameters
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const MOUSE_INFLUENCE_RADIUS = 120;
  const VISCOSITY = 0.98;
  const MOUSE_FORCE = 1.5;
  
  // Initialize fluid particles (only called once on mount)
  const initializeParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 80; i++) { // Use fixed initial count
      particles.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        vx: 0,
        vy: 0,
        originalX: Math.random() * CANVAS_WIDTH,
        originalY: Math.random() * CANVAS_HEIGHT,
        hue: Math.random() * 60 + 180, // Blue to cyan range
        opacity: Math.random() * 0.6 + 0.6
      });
    }
    particlesRef.current = particles;
  }, []); // No dependencies - only initialize once

  // Mouse event handlers
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    
    mousePositionRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // Update particle positions based on mouse influence
  const updateParticles = () => {
    const mouse = mousePositionRef.current;
    const particles = particlesRef.current;
    
    particles.forEach(particle => {
      // Calculate distance to mouse
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply mouse influence if within radius
      if (distance < MOUSE_INFLUENCE_RADIUS && distance > 0) {
        const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
        const normalizedDx = dx / distance;
        const normalizedDy = dy / distance;
        
        // Push particles away from mouse
        particle.vx -= normalizedDx * force * MOUSE_FORCE;
        particle.vy -= normalizedDy * force * MOUSE_FORCE;
      }
      
      // Strong return-to-origin force to keep network stable
      const returnDx = particle.originalX - particle.x;
      const returnDy = particle.originalY - particle.y;
      particle.vx += returnDx * 0.02;
      particle.vy += returnDy * 0.02;
      
      // Strong damping to prevent oscillation
      particle.vx *= 0.85;
      particle.vy *= 0.85;
      
      // Stop very small movements to create static network
      if (Math.abs(particle.vx) < 0.1) particle.vx = 0;
      if (Math.abs(particle.vy) < 0.1) particle.vy = 0;
      
      // Update position only if there's significant velocity
      if (Math.abs(particle.vx) > 0.1 || Math.abs(particle.vy) > 0.1) {
        particle.x += particle.vx;
        particle.y += particle.vy;
      }
      
      // Keep particles within bounds
      particle.x = Math.max(20, Math.min(CANVAS_WIDTH - 20, particle.x));
      particle.y = Math.max(20, Math.min(CANVAS_HEIGHT - 20, particle.y));
    });
  };

  // Render the fluid simulation
  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with solid background
    ctx.fillStyle = '#0a0f23';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    const particles = particlesRef.current;
    const mouse = mousePositionRef.current;
    
    // First pass: Draw connecting lines and track connected particles
    ctx.globalCompositeOperation = 'lighter';
    const connectedParticles = new Set();
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistanceRef.current) {
          // Mark both particles as connected
          connectedParticles.add(i);
          connectedParticles.add(j);
          
          const opacity = (connectionDistanceRef.current - distance) / connectionDistanceRef.current * 0.7;
          ctx.strokeStyle = `hsla(${particles[i].hue}, 80%, 70%, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw only connected particles
    particles.forEach((particle, index) => {
      // Only render particles that are part of the connected network
      if (!connectedParticles.has(index)) return;
      // Calculate distance to mouse for glow effect
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
      
      let glowRadius = 3;
      let glowOpacity = particle.opacity;
      
      // Enhance particles near mouse
      if (distanceToMouse < MOUSE_INFLUENCE_RADIUS) {
        const proximity = 1 - (distanceToMouse / MOUSE_INFLUENCE_RADIUS);
        glowRadius = 3 + proximity * 8;
        glowOpacity = particle.opacity + proximity * 0.5;
      }
      
      // Create gradient for particle glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, glowRadius
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 80%, ${glowOpacity})`);
      gradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 60%, ${glowOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 40%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw visible mouse influence area
    if (mouse.x && mouse.y) {
      // Draw influence area with gradient
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, MOUSE_INFLUENCE_RADIUS
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      gradient.addColorStop(0.3, 'rgba(100, 200, 255, 0.18)');
      gradient.addColorStop(0.7, 'rgba(100, 200, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, MOUSE_INFLUENCE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw mouse center point
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw mouse center border
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    ctx.globalCompositeOperation = 'source-over';
  };



  // Initialize simulation when component mounts (only once)
  useEffect(() => {
    initializeParticles();
    // Update particle count state to match actual particles
    setParticleCount(80);
    
    // Start animation loop
    const startAnimation = () => {
      updateParticles();
      render();
      animationRef.current = requestAnimationFrame(startAnimation);
    };
    startAnimation();

    // Cleanup animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // No dependencies - only run once on mount

  // Update connection distance ref when state changes
  useEffect(() => {
    connectionDistanceRef.current = connectionDistance;
  }, [connectionDistance]);

  // Reset simulation
  const resetSimulation = () => {
    initializeParticles();
    setParticleCount(80);
    setConnectionDistance(120);
  };

  // Add particles to reach target count
  const addParticles = (targetCount) => {
    const currentParticles = particlesRef.current;
    const currentCount = currentParticles.length;
    const particlesToAdd = targetCount - currentCount;
    
    for (let i = 0; i < particlesToAdd; i++) {
      currentParticles.push({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        vx: 0,
        vy: 0,
        originalX: Math.random() * CANVAS_WIDTH,
        originalY: Math.random() * CANVAS_HEIGHT,
        hue: Math.random() * 60 + 180,
        opacity: Math.random() * 0.6 + 0.6
      });
    }
  };

  // Remove particles to reach target count
  const removeParticles = (targetCount) => {
    const currentParticles = particlesRef.current;
    const currentCount = currentParticles.length;
    const particlesToRemove = currentCount - targetCount;
    
    // Remove particles from the end to preserve existing ones
    for (let i = 0; i < particlesToRemove; i++) {
      currentParticles.pop();
    }
  };

  // Handle parameter changes
  const handleParticleCountChange = (e) => {
    const newCount = parseInt(e.target.value);
    const currentCount = particlesRef.current.length;
    
    if (newCount > currentCount) {
      addParticles(newCount);
    } else if (newCount < currentCount) {
      removeParticles(newCount);
    }
    
    setParticleCount(newCount);
  };

  const handleConnectionDistanceChange = (e) => {
    const newDistance = parseInt(e.target.value);
    setConnectionDistance(newDistance);
  };

  return (
    <div className="fluid-simulation">
      {/* Left Panel - Simulation */}
      <div className="simulation-container">
        <div className="simulation-header">
          <h1 className="simulation-title">Network Visualization</h1>
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
            className="simulation-canvas fluid-canvas"
            onMouseMove={handleMouseMove}
          />
        </div>
      </div>

      {/* Right Panel - Controls */}
      <div className="controls">
        <div className="control-panel">
          <h3 className="control-title">
            <div className="control-icon">🕸️</div>
            Network Controls
          </h3>
          <div className="fluid-controls">
            <div className="slider-group">
              <label className="slider-label">
                Number of Points: <span className="slider-value">{particleCount}</span>
              </label>
              <input
                type="range"
                min="20"
                max="200"
                value={particleCount}
                onChange={handleParticleCountChange}
                className="slider"
              />
            </div>
            
            <div className="slider-group">
              <label className="slider-label">
                Connection Distance: <span className="slider-value">{connectionDistance}px</span>
              </label>
              <input
                type="range"
                min="50"
                max="200"
                value={connectionDistance}
                onChange={handleConnectionDistanceChange}
                className="slider"
              />
            </div>
            
            <button onClick={resetSimulation} className="reset-button">
              🔄 Reset Network
            </button>
          </div>
        </div>

        <div className="control-panel info">
          <h3 className="info-title">
            <div className="control-icon">ℹ️</div>
            Network Info
          </h3>
          <p><strong>Static Network:</strong> {particleCount} points forming connected web structures based on proximity.</p>
          <p><strong>Mouse Interaction:</strong> Move your mouse to disturb the network - points move away and return to position.</p>
          <p><strong>Connections:</strong> Lines appear between nearby points, creating dynamic network patterns.</p>
          <p><strong>Stable Web:</strong> Network remains static until mouse interaction, then quickly stabilizes.</p>
        </div>
      </div>
    </div>
  );
};

export default FluidSimulation;