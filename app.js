// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  // Initialize components
  initMobileNav();
  initParticles();
  initThemeToggle();
  initScrollAnimations();
  initTypewriterEffect();
  
  // Add skip to content link
  addSkipToContentLink();
}

// Mobile navigation toggle
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('open');
    
    // Update aria-expanded attribute for accessibility
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Particle animation background
function initParticles() {
  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  // Set canvas size
  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  setCanvasSize();
  window.addEventListener('resize', () => {
    setCanvasSize();
    initParticlesArray();
  });
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = getRandomColor();
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function getRandomColor() {
    const colors = [
      'rgba(0, 229, 255, 0.5)',
      'rgba(124, 255, 107, 0.5)',
      'rgba(168, 85, 247, 0.5)',
      'rgba(255, 180, 32, 0.5)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  function initParticlesArray() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 9000;
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
  }
  
  function connectParticles() {
    const maxDistance = 100;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.strokeStyle = `rgba(0, 229, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  initParticlesArray();
  animateParticles();
}

// Theme toggle functionality
function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Toggle theme');
  themeToggle.innerHTML = '🎨';
  document.body.appendChild(themeToggle);
  
  // Get current theme from localStorage or default to 'dim'
  const currentTheme = localStorage.getItem('theme') || 'dim';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update toggle button text based on current theme
  updateToggleButton(themeToggle, currentTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dim' ? 'contrast' : 'dim';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateToggleButton(themeToggle, newTheme);
  });
}

function updateToggleButton(button, theme) {
  button.innerHTML = theme === 'dim' ? '🌙' : '☀️';
}

// Scroll animations for elements
function initScrollAnimations() {
  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const animatedElements = document.querySelectorAll('.glass-card, .section-title');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  // Set initial state and observe elements
  animatedElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// Typewriter effect for hero section
function initTypewriterEffect() {
  const typedTextElement = document.querySelector('.typed-text');
  if (!typedTextElement) return;
  
  const texts = [
    'whoami',
    'researcher',
    'developer',
    'problem_solver'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Delete text
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      // Type text
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Determine next action
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of text
      isDeleting = true;
      typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start the typewriter effect
  setTimeout(type, 1000);
}

// Add skip to content link for accessibility
function addSkipToContentLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to main content';
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add id to main content area
  const mainContent = document.querySelector('main') || document.querySelector('.container');
  if (mainContent) {
    mainContent.id = 'main-content';
    mainContent.tabIndex = -1;
  }
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
// Add binary rain animation
function initBinaryRain() {
  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  const binaryRain = document.createElement('div');
  binaryRain.className = 'binary-rain';
  document.body.appendChild(binaryRain);
  
  function createBinaryDigit() {
    const digit = document.createElement('div');
    digit.className = 'binary-digit';
    digit.textContent = Math.random() > 0.5 ? '1' : '0';
    
    // Random position
    const left = Math.random() * 100;
    digit.style.left = `${left}%`;
    
    // Random animation delay and duration
    const delay = Math.random() * 5;
    const duration = 3 + Math.random() * 4;
    digit.style.animationDelay = `${delay}s`;
    digit.style.animationDuration = `${duration}s`;
    
    // Random font size
    const fontSize = 10 + Math.random() * 10;
    digit.style.fontSize = `${fontSize}px`;
    
    // Random opacity
    const opacity = 0.1 + Math.random() * 0.4;
    digit.style.opacity = opacity;
    
    binaryRain.appendChild(digit);
    
    // Remove digit after animation completes
    setTimeout(() => {
      if (digit.parentNode === binaryRain) {
        binaryRain.removeChild(digit);
      }
    }, (delay + duration) * 1000);
  }
  
  // Create initial digits
  for (let i = 0; i < 50; i++) {
    createBinaryDigit();
  }
  
  // Continue creating digits
  setInterval(createBinaryDigit, 100);
}

// Call this function in your initApp function
function initApp() {
  // Initialize components
  initMobileNav();
  initParticles();
  initThemeToggle();
  initScrollAnimations();
  initTypewriterEffect();
  initBinaryRain(); // Add this line
  
  // Add skip to content link
  addSkipToContentLink();
}
