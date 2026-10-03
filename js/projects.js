/**
 * ==============================================================================
 * PROJECTS & PORTFOLIO SHOWCASE MODULE
 * Dynamic filterable project cards, tags, and interactive detail modals
 * ==============================================================================
 */

const PROJECTS_DATA = [
  {
    id: 'nova-engine',
    title: 'Nova Engine: C++ & WASM Physics Simulator',
    category: 'cpp',
    tag: 'Systems & WebAssembly',
    tagClass: 'badge-cpp',
    shortDesc: 'A high-throughput 2D physics and Mandelbrot mathematical compute engine built with C++20 and compiled to WebAssembly with zero-copy shared memory buffers.',
    fullDesc: 'Nova Engine is a high-performance simulation system created to demonstrate the capability of bridging native C++ codebases with modern browser environments. Leveraging SIMD math acceleration, contiguous cache alignment, and WebAssembly linear memory pointers, it renders thousands of gravitational entities and fractal iterations at a sustained 60 FPS.',
    techStack: ['C++20', 'WebAssembly', 'HTML5 Canvas', 'SIMD', 'Emscripten'],
    metrics: [
      { label: 'Speedup vs JS', val: '4.8x - 8.2x' },
      { label: 'Throughput', val: '12M ops/s' },
      { label: 'Memory Footprint', val: '< 16 MB' }
    ],
    challenges: 'Achieving zero-overhead frame updates required bypassing standard JS-WASM serialization by passing a raw memory pointer directly into an HTML5 ImageData clamped array.',
    github: 'https://github.com/alexvance/nova-engine',
    liveDemo: '#cpp-showcase',
    thumbGradient: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #022c22 100%)',
    icon: '⚡'
  },
  {
    id: 'hyperion-kv',
    title: 'Hyperion: Lock-Free In-Memory KV Store',
    category: 'cpp',
    tag: 'High-Concurrency C++',
    tagClass: 'badge-cpp',
    shortDesc: 'Distributed, ultra-low-latency in-memory cache and key-value store using C++ atomics, hazard pointers, and custom ring buffers for sub-microsecond retrieval.',
    fullDesc: 'Hyperion is designed for ultra-low latency trading and high-frequency real-time messaging workloads. It features a lock-free hash map utilizing hazard pointers for memory reclamation, write-ahead logging (WAL) with memory-mapped files (mmap), and a custom TCP binary protocol.',
    techStack: ['C++20', 'Multi-threading', 'Lock-Free Atomics', 'POSIX Sockets', 'gTest'],
    metrics: [
      { label: 'P99 Latency', val: '0.85 µs' },
      { label: 'Max Throughput', val: '3.4M QPS' },
      { label: 'Thread Scalability', val: '64 Cores' }
    ],
    challenges: 'Preventing cache line bouncing across multi-socket NUMA nodes by aligning data structures with 64-byte cache line padding (`alignas(64)`).',
    github: 'https://github.com/alexvance/hyperion-kv',
    liveDemo: '#',
    thumbGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    icon: '🗄️'
  },
  {
    id: 'raycraft-pathtracer',
    title: 'RayCraft: GPU & CPU Path Tracer',
    category: 'graphics',
    tag: 'Computer Graphics',
    tagClass: 'badge-perf',
    shortDesc: 'A physically-based Monte Carlo path tracer in Modern C++ with Bounding Volume Hierarchy (BVH) spatial partitioning and microfacet BRDF materials.',
    fullDesc: 'RayCraft simulates physical transport of light photons through dielectric, metallic, and refractive media. Features BVH tree acceleration with Surface Area Heuristic (SAH) splits, importance sampling for HDR environment maps, and multithreaded tile dispatching.',
    techStack: ['C++17', 'Vulkan / OpenGL', 'BVH Acceleration', 'OpenMP', 'GLM'],
    metrics: [
      { label: 'Ray Intersections', val: '85M / sec' },
      { label: 'BVH Traversal Speed', val: '4.2x Faster' },
      { label: 'Color Depth', val: '32-bit Float HDR' }
    ],
    challenges: 'Optimizing ray-box intersection algorithms for AVX2 vector registers to test 8 bounding boxes simultaneously.',
    github: 'https://github.com/alexvance/raycraft-pathtracer',
    liveDemo: '#',
    thumbGradient: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #292524 100%)',
    icon: '✨'
  },
  {
    id: 'omnigraph-algo',
    title: 'OmniGraph: Spatial Routing & Flow Visualizer',
    category: 'web',
    tag: 'Algorithms & Full-Stack',
    tagClass: 'badge-wasm',
    shortDesc: 'An interactive visualization system for real-time graph algorithms (Dijkstra, A*, Tarjan SCC, Max Flow) with time-travel step debugging.',
    fullDesc: 'OmniGraph enables software engineers and students to inspect complex graph traversals with millisecond resolution. Backed by a WebAssembly algorithm core for graphs with 100,000+ vertices, it provides instant pathfinding calculations with an elegant glassmorphic frontend.',
    techStack: ['TypeScript', 'WebAssembly', 'D3.js', 'Web Audio API', 'Tailwind CSS'],
    metrics: [
      { label: 'Max Node Capacity', val: '250,000' },
      { label: 'Compute Time', val: '< 2 ms' },
      { label: 'Frame Rate', val: 'Smooth 60 FPS' }
    ],
    challenges: 'Managing smooth WebGL rendering of dynamic graph nodes and edges while streaming step-by-step algorithm mutation states.',
    github: 'https://github.com/alexvance/omnigraph',
    liveDemo: '#',
    thumbGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #075985 100%)',
    icon: '🕸️'
  },
  {
    id: 'aether-ui',
    title: 'Aether: High-Performance Glass Component Library',
    category: 'web',
    tag: 'Frontend Architecture',
    tagClass: 'badge-wasm',
    shortDesc: 'Zero-dependency, accessible, ultra-lightweight glassmorphic design system and UI library optimized for modern GPU accelerated compositing.',
    fullDesc: 'Aether is a crafted UI toolkit designed for modern web applications requiring sleek dark aesthetics, subtle specular glass lighting, fluid spring physics, and zero runtime overhead (under 6KB min+gzip).',
    techStack: ['Vanilla CSS3', 'JavaScript ES6+', 'Web Components', 'Accessibility WCAG 2.1'],
    metrics: [
      { label: 'Bundle Size', val: '4.8 KB' },
      { label: 'Lighthouse Score', val: '100 / 100' },
      { label: 'CSS Variables', val: '50+ Dynamic Tokens' }
    ],
    challenges: 'Ensuring seamless backdrop-filter blur performance across older mobile GPU devices while maintaining 60 FPS scroll velocity.',
    github: 'https://github.com/alexvance/aether-ui',
    liveDemo: '#',
    thumbGradient: 'linear-gradient(135deg, #311042 0%, #581c87 50%, #3b0764 100%)',
    icon: '💎'
  },
  {
    id: 'chronoflow',
    title: 'ChronoFlow: High-Frequency Telemetry Streamer',
    category: 'cpp',
    tag: 'Systems & Microservices',
    tagClass: 'badge-cpp',
    shortDesc: 'A lightweight C++ microservice engine with zero-allocation JSON streaming and WebSockets for real-time telemetry diagnostics.',
    fullDesc: 'ChronoFlow provides an ultra-lean backend for streaming high-frequency IoT sensor telemetry and system hardware stats. Features zero-copy ring buffers, SIMD JSON serialization, and cross-platform asynchronous socket multiplexing.',
    techStack: ['C++20', 'Winsock2 / epoll', 'SIMD JSON', 'WebSocket Server'],
    metrics: [
      { label: 'Connection Cap', val: '50,000 concurrent' },
      { label: 'Payload Overhead', val: '< 0.1%' },
      { label: 'CPU Usage', val: '< 2.5%' }
    ],
    challenges: 'Designing custom zero-allocation memory pools for incoming TCP packets to eliminate heap fragmentation during extended uptime.',
    github: 'https://github.com/alexvance/chronoflow',
    liveDemo: '#',
    thumbGradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #042f2e 100%)',
    icon: '⏱️'
  }
];

class ProjectsManager {
  constructor() {
    this.projectsGrid = document.getElementById('projectsGrid');
    this.filterButtons = document.querySelectorAll('.project-filter-btn');
    this.modalBackdrop = document.getElementById('projectModal');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.activeFilter = 'all';

    this.init();
  }

  init() {
    if (!this.projectsGrid) return;
    this.renderProjects(this.activeFilter);
    this.bindEvents();
  }

  renderProjects(filter) {
    this.projectsGrid.innerHTML = '';
    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-thumb" style="background: ${project.thumbGradient};">
          <div class="project-thumb-overlay">
            <span class="glass-pill ${project.tagClass}">
              <span>${project.icon}</span> ${project.tag}
            </span>
          </div>
          <div style="font-size: 3.5rem; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5)); opacity: 0.85;">
            ${project.icon}
          </div>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDesc}</p>
          <div class="project-tech-stack">
            ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <button class="btn btn-sm btn-glass open-modal-btn" data-id="${project.id}">
              <span>Deep Dive</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-sm btn-glass btn-icon" title="View Source on GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      `;
      this.projectsGrid.appendChild(card);
    });
  }

  bindEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.renderProjects(this.activeFilter);
      });
    });

    document.addEventListener('click', (e) => {
      const modalBtn = e.target.closest('.open-modal-btn');
      if (modalBtn) {
        const id = modalBtn.getAttribute('data-id');
        this.openModal(id);
      }
    });

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('open')) {
        this.closeModal();
      }
    });
  }

  openModal(id) {
    const project = PROJECTS_DATA.find(p => p.id === id);
    if (!project || !this.modalBackdrop) return;

    const modalBody = document.getElementById('modalContent');
    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <span class="glass-pill ${project.tagClass}">
          <span>${project.icon}</span> ${project.tag}
        </span>
        <span class="mono" style="font-size: 0.85rem; color: var(--accent-cyan);">${project.category.toUpperCase()}</span>
      </div>
      <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px; color: var(--text-main);">${project.title}</h2>
      <p style="color: var(--text-muted); line-height: 1.8; margin-bottom: 24px; font-size: 1.05rem;">
        ${project.fullDesc}
      </p>

      <!-- Key Performance Metrics Strip -->
      <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); margin-bottom: 12px;">Architecture & Performance Metrics</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 28px;">
        ${project.metrics.map(m => `
          <div style="padding: 14px; background: rgba(30, 41, 59, 0.6); border: 1px solid var(--glass-border); border-radius: var(--radius-md);">
            <div style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">${m.label}</div>
            <div style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan);">${m.val}</div>
          </div>
        `).join('')}
      </div>

      <!-- Technical Challenge & Solution -->
      <div style="padding: 20px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--accent-emerald); border-radius: 0 var(--radius-md) var(--radius-md) 0; margin-bottom: 28px;">
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-emerald); margin-bottom: 6px;">💡 Technical Highlights & Engineering Challenge</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${project.challenges}</p>
      </div>

      <!-- Tech Stack -->
      <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); margin-bottom: 12px;">Technologies Employed</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;">
        ${project.techStack.map(t => `<span class="tech-chip" style="font-size: 0.85rem; padding: 6px 14px;">${t}</span>`).join('')}
      </div>

      <!-- Actions -->
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="${project.liveDemo}" class="btn btn-primary" onclick="document.getElementById('projectModal').classList.remove('open');">
          <span>Live C++ Demo</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
        <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-glass">
          <span>GitHub Repository</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
      </div>
    `;

    this.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProjectsManager();
});
