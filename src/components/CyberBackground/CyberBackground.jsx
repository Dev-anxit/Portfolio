import { useEffect, useRef } from 'react';
import styles from './CyberBackground.module.css';

export default function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    let animationFrameId;

    // Interactive mouse positioning
    let mouse = { x: null, y: null, radius: 150 };

    const colors = ['rgba(56, 189, 248, 0.5)', 'rgba(168, 85, 247, 0.5)']

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      
      const maxParticles = Math.min(Math.floor(width / 20), 80); 
      
      for (let i = 0; i < maxParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0.5;
        const size = Math.random() * 1.5 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particles.push({ x, y, dx, dy, size, color });
      }
    };
    init();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx = -p.dx;
        if (p.y < 0 || p.y > height) p.dy = -p.dy;

        if (mouse.x !== null) {
          let dx = mouse.x - p.x;
          let dy = mouse.y - p.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= (dx / distance) * force * 2;
            p.y -= (dy / distance) * force * 2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 120) {
            ctx.beginPath();
            let opacity = (1 - dist / 120) * 0.15;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.cyberCanvas} />;
}
