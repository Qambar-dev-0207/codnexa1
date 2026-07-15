document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     🖱️ CUSTOM TRAILING CURSOR
     ========================================================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  
  // Track mouse coordinates
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Lerp function (Linear Interpolation) for smooth trailing
  function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  // Animation frame loop for the cursor position
  function animateCursor() {
    // Dot moves faster, Ring trails behind
    dotX = lerp(dotX, mouseX, 0.25);
    dotY = lerp(dotY, mouseY, 0.25);
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    
    if (cursorDot) {
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;
    }
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();

  // Hover states for links and buttons
  const hoverElements = document.querySelectorAll('[data-cursor="hover"]');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Apply hover attributes dynamically to other standard interactive elements
  const interactiveSelectors = 'a, button, input, select, textarea, .service-summary, .work-card';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  /* ==========================================================================
     Navbar Scroll State
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  
  function checkScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check on init

  /* ==========================================================================
     Mobile Drawer Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu-link');

  function toggleMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking on nav links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
     Intersection Observer (Scroll Animations)
     ========================================================================== */
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger animation only once
      }
    });
  }, observerOptions);

  animateElements.forEach(el => {
    observer.observe(el);
  });

  /* ==========================================================================
     Services Accordion Toggle
     ========================================================================== */
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach(item => {
    const summary = item.querySelector('.service-summary');
    summary.addEventListener('click', () => {
      const isExpanded = item.classList.contains('expanded');
      
      // Collapse all items first
      serviceItems.forEach(i => i.classList.remove('expanded'));
      
      // If the clicked item was not expanded, expand it
      if (!isExpanded) {
        item.classList.add('expanded');
      }
    });
  });

  // Open first service by default on desktop loads
  if (window.innerWidth > 768 && serviceItems.length > 0) {
    serviceItems[0].classList.add('expanded');
  }

  /* ==========================================================================
     Hero Canvas Particle Mesh Animation
     ========================================================================== */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 40 : 100;
    const maxDistance = 110;
    
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Speeds: very slow, gentle drifting
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.radius = Math.random() * 2 + 1;
        // Accent colors (mostly deep grays, a few glowing oranges)
        this.color = Math.random() > 0.85 ? 'rgba(230, 58, 15, 0.6)' : 'rgba(142, 142, 147, 0.2)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxDistance) {
            // Faint connecting line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const alpha = (1 - dist / maxDistance) * 0.15;
            // If either node is orange, color the line orange
            if (p1.color.includes('230') || p2.color.includes('230')) {
              ctx.strokeStyle = `rgba(230, 58, 15, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(142, 142, 147, ${alpha})`;
            }
            
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawLines();
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  /* ==========================================================================
     Contact Form Submission Behavior
     ========================================================================== */
  const projectForm = document.getElementById('project-form');
  const formSuccess = document.getElementById('form-success');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  if (projectForm && formSuccess) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate API submit delay (0.5s)
      setTimeout(() => {
        formSuccess.classList.add('active');
        projectForm.reset();
      }, 500);
    });
  }

  if (btnCloseSuccess && formSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      formSuccess.classList.remove('active');
    });
  }

});
