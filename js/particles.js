/**
 * ==============================================================================
 * HERO BACKGROUND PARTICLES NETWORK - High Performance Interactive Canvas
 * Features: Floating kinetic nodes, mouse connection lines, gravitational drift
 * ==============================================================================
 */

class HeroParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.particleCount = 55;
    this.maxConnectDistance = 140;
    
    this.mouse = {
      x: null,
      y: null,
      radius: 160
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.dpr = window.devicePixelRatio || 1;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    // Adjust particle count based on screen width
    if (this.width < 768) {
      this.particleCount = 30;
      this.maxConnectDistance = 100;
    } else {
      this.particleCount = 55;
      this.maxConnectDistance = 140;
    }
  }

  createParticles() {
    this.particles = [];
    const colors = ['#10b981', '#06b6d4', '#8b5cf6', '#38bdf8'];

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & Draw Particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < 0) p.x = this.width;
      else if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      else if (p.y > this.height) p.y = 0;

      // Mouse interaction
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 1.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseAlpha;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Connect neighbor particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.maxConnectDistance) {
          const alpha = (1 - dist / this.maxConnectDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = '#06b6d4';
          this.ctx.globalAlpha = alpha;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }

    this.ctx.globalAlpha = 1.0;
    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroParticleNetwork('particlesCanvas');
});
