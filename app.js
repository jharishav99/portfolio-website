// Terminal Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Typing animations
    initTypingAnimations();
    
    // Scroll animations
    initScrollAnimations();
    
    // Mobile navigation
    initMobileNav();
    
    // Hero particles
    initParticles();
    
    // Project cards interactions
    initProjectCards();
    
    // Terminal effects
    initTerminalEffects();
    
    // Advanced scroll effects
    setTimeout(() => {
        createMatrixEffect();
        initAdvancedScrollEffects();
    }, 1000);
});

// Navigation Functions - Fixed smooth scrolling
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset position accounting for fixed navbar
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetTop = targetSection.offsetTop - navHeight - 20;
                
                // Use native smooth scrolling
                window.scrollTo({
                    top: Math.max(0, targetTop),
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Active navigation highlighting with throttling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveNavigation();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section, #home');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 150;
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typing Animation
function initTypingAnimations() {
    // Typewriter effect for hero tagline
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = 'none';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor after typing is complete
                typingElement.style.borderRight = '2px solid var(--terminal-green)';
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1500);
    }
    
    // Terminal command typing effect
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const commands = ['whoami', 'ls -la', 'cat profile.txt', 'whoami'];
        let commandIndex = 0;
        
        const typeCommand = () => {
            const command = commands[commandIndex];
            typedTextElement.textContent = '';
            
            let i = 0;
            const typeChar = () => {
                if (i < command.length) {
                    typedTextElement.textContent += command.charAt(i);
                    i++;
                    setTimeout(typeChar, 150);
                } else {
                    setTimeout(() => {
                        commandIndex = (commandIndex + 1) % commands.length;
                        setTimeout(typeCommand, 2000);
                    }, 2000);
                }
            };
            typeChar();
        };
        
        // Start the command cycling
        setTimeout(typeCommand, 500);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('projects-grid') || 
                    entry.target.classList.contains('publications-grid') ||
                    entry.target.classList.contains('skills-grid')) {
                    
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in', 'visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(
        '.section-header, .glass-card, .timeline-item, .project-card, ' +
        '.publication-item, .hobby-item, .honor-item, .contact-content, ' +
        '.projects-grid, .publications-grid, .skills-grid'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Special animations for hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.classList.add('slide-in-left');
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200 + 500);
    });
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('slide-in-right');
        setTimeout(() => {
            heroImage.classList.add('visible');
        }, 1000);
    }
}

// Mobile Navigation
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Enhanced Particle System
function initParticles() {
    const particleContainer = document.querySelector('.hero-particles');
    if (!particleContainer) return;
    
    // Create multiple particle layers
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? 'var(--terminal-green)' : 'var(--terminal-cyan)'};
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        
        // Random initial position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particleContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: Math.random() * 100
        });
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life += 1;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            // Update position
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Pulse effect
            const scale = Math.sin(particle.life * 0.05) * 0.5 + 1;
            particle.element.style.transform = `scale(${scale})`;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Project Cards Interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Mouse move effect for card tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Click animation
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Terminal Effects
function initTerminalEffects() {
    // Add terminal cursor blink to various elements
    const cursors = document.querySelectorAll('.blinking-cursor');
    cursors.forEach(cursor => {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 1000);
    });
    
    // Terminal window typing effect
    const terminalOutput = document.querySelector('.terminal-output');
    if (terminalOutput) {
        const lines = terminalOutput.querySelectorAll('p');
        
        // Hide all lines initially
        lines.forEach(line => {
            line.style.opacity = '0';
        });
        
        // Show lines with typing effect
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                if (line.classList.contains('output-text')) {
                    typeText(line, line.textContent, 50);
                }
            }, index * 1000 + 2000);
        });
    }
}

// Utility function for typing text
function typeText(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    const typeChar = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    };
    
    typeChar();
}

// Matrix-style background effect
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.1;
        pointer-events: none;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(15, 15, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF9C';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Enhanced scroll effects
function initAdvancedScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Update navigation background opacity
        const nav = document.querySelector('.nav-container');
        if (nav) {
            const opacity = Math.min(scrolled / 100, 0.95);
            nav.style.background = `rgba(15, 15, 15, ${opacity})`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Konami code easter egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        
        // Easter egg: Terminal hacker mode
        document.body.classList.add('hacker-mode');
        
        // Show special message
        const message = document.createElement('div');
        message.textContent = 'HACKER MODE ACTIVATED! 🚀';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--terminal-green);
            color: var(--terminal-bg);
            padding: 20px 40px;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 0 30px var(--terminal-green);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.classList.remove('hacker-mode');
        }, 3000);
        
        konamiCode = [];
    }
});

// Performance optimization: Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate particle positions
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        });
    }, 250);
});

// Add CSS for additional styles
const additionalCSS = `
.hacker-mode {
    filter: hue-rotate(180deg) saturate(2);
    animation: glitch 0.3s infinite;
}

@keyframes glitch {
    0% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-2px); }
    80% { transform: translateX(2px); }
    100% { transform: translateX(0); }
}

.nav-menu.active {
    display: flex;
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(15, 15, 15, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: var(--space-lg);
    border-bottom: 1px solid var(--terminal-green);
    z-index: 999;
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.nav-link.active {
    color: var(--terminal-green);
}

.nav-link.active::before {
    width: 100%;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-toggle {
        display: flex;
    }
}
`;

// Inject the additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);