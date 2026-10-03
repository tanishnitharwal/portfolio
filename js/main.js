/**
 * ==============================================================================
 * NOVA PORTFOLIO - MAIN APP CONTROLLER
 * Typing effect, navigation scroll spy, tabs, skills filter, and UI animations
 * ==============================================================================
 */

class PortfolioApp {
  constructor() {
    this.typingElem = document.getElementById('typingText');
    this.titles = [
      'High-Performance C++ Developer',
      'WebAssembly & Systems Engineer',
      'Computer Graphics & SIMD Specialist',
      'Modern Full-Stack Architect'
    ];
    this.titleIdx = 0;
    this.charIdx = 0;
    this.isDeleting = false;
    this.typeSpeed = 80;

    this.navbar = document.getElementById('mainNavbar');
    this.mobileToggle = document.getElementById('mobileToggle');
    this.navMenu = document.getElementById('navMenu');
    this.backToTopBtn = document.getElementById('backToTopBtn');
    this.heroAvatarCard = document.getElementById('heroAvatarCard');

    this.init();
  }

  init() {
    this.initTypingEffect();
    this.initNavbar();
    this.initScrollSpy();
    this.initTabs();
    this.initSkills();
    this.initHeroParallax();
    this.initMetricCounters();
    this.initBackToTop();
  }

  /**
   * Dynamic Typing Effect
   */
  initTypingEffect() {
    if (!this.typingElem) return;

    const type = () => {
      const currentTitle = this.titles[this.titleIdx];

      if (this.isDeleting) {
        this.typingElem.textContent = currentTitle.substring(0, this.charIdx - 1);
        this.charIdx--;
        this.typeSpeed = 40;
      } else {
        this.typingElem.textContent = currentTitle.substring(0, this.charIdx + 1);
        this.charIdx++;
        this.typeSpeed = 80;
      }

      if (!this.isDeleting && this.charIdx === currentTitle.length) {
        this.isDeleting = true;
        this.typeSpeed = 1800; // Pause at end of word
      } else if (this.isDeleting && this.charIdx === 0) {
        this.isDeleting = false;
        this.titleIdx = (this.titleIdx + 1) % this.titles.length;
        this.typeSpeed = 500; // Pause before new word
      }

      setTimeout(type, this.typeSpeed);
    };

    setTimeout(type, 500);
  }

  /**
   * Navbar Scrolled State & Mobile Drawer
   */
  initNavbar() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });

    if (this.mobileToggle && this.navMenu) {
      this.mobileToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('open');
      });

      // Close mobile drawer when clicking any link
      const links = this.navMenu.querySelectorAll('.nav-link');
      links.forEach(link => {
        link.addEventListener('click', () => {
          this.navMenu.classList.remove('open');
        });
      });
    }
  }

  /**
   * Active Section Scroll Spy
   */
  initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  /**
   * About Section Tabs Switcher
   */
  initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });
  }

  /**
   * Skills Filter & Search
   */
  initSkills() {
    const filterBtns = document.querySelectorAll('.skills-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-filter');
        skillCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat.includes(cat)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * 3D Parallax Tilt Effect on Avatar Card
   */
  initHeroParallax() {
    if (!this.heroAvatarCard) return;

    this.heroAvatarCard.addEventListener('mousemove', (e) => {
      const rect = this.heroAvatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -14;
      const tiltY = (x / (rect.width / 2)) * 14;

      this.heroAvatarCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    this.heroAvatarCard.addEventListener('mouseleave', () => {
      this.heroAvatarCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /**
   * Animated Metric Counters
   */
  initMetricCounters() {
    const counterElements = document.querySelectorAll('.counter-val');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          counterElements.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const isDecimal = counter.getAttribute('data-decimal') === 'true';
            const duration = 1500;
            const startTime = performance.now();

            const update = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1.0);
              // Ease out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = target * easeProgress;

              if (isDecimal) {
                counter.textContent = currentVal.toFixed(1);
              } else {
                counter.textContent = Math.floor(currentVal);
              }

              if (progress < 1.0) {
                requestAnimationFrame(update);
              } else {
                counter.textContent = isDecimal ? target.toFixed(1) : target;
              }
            };

            requestAnimationFrame(update);
          });
        }
      });
    }, { threshold: 0.5 });

    const statsStrip = document.querySelector('.hero-stats-strip');
    if (statsStrip) observer.observe(statsStrip);
  }

  /**
   * Back-to-Top Floating Button
   */
  initBackToTop() {
    if (!this.backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.backToTopBtn.classList.add('visible');
      } else {
        this.backToTopBtn.classList.remove('visible');
      }
    });

    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});
