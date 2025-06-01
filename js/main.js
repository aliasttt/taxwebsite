// Loading Screen
const loadingScreen = document.querySelector('.loading-screen');
const body = document.body;

// Create Galaxy Animation - Reduced complexity
function createGalaxy() {
    const background = document.querySelector('.background-animation');
    if (!background) return;
    
    // Create stars - reduced number for better performance
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.setProperty('--opacity', Math.random() * 0.8 + 0.2);
        background.appendChild(star);
    }

    // Create planets - reduced number and size
    const planetColors = ['#FF6B6B', '#4ECDC4'];
    for (let i = 0; i < 2; i++) {
        const planet = document.createElement('div');
        planet.className = 'planet';
        const size = Math.random() * 15 + 15;
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.setProperty('--planet-color', planetColors[i]);
        planet.style.setProperty('--duration', `${Math.random() * 20 + 30}s`);
        planet.style.setProperty('--orbit-radius', `${Math.random() * 100 + 50}px`);
        planet.style.left = '50%';
        planet.style.top = '50%';
        background.appendChild(planet);
    }
}

// Create Loading Screen Space Elements
function createLoadingSpaceElements() {
    const loadingScreen = document.querySelector('.loading-screen');
    const starCount = 150; // More stars for a denser field
    const meteorCount = 15; // More meteors

    // Create stars
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'loading-star';
        star.style.width = `${Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.8 + 0.2; // Varying opacity
        
        // Simple twinkle animation via JS opacity change
        const twinkleDuration = Math.random() * 2 + 1; // 1 to 3 seconds
        star.style.transition = `opacity ${twinkleDuration}s ease-in-out infinite alternate`;
        star.style.opacity = Math.random(); // Initial random opacity for animation start

        loadingScreen.appendChild(star);
    }

    // Create meteors
    for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'loading-meteor';
        const size = Math.random() * 4 + 1; // Varying size
        meteor.style.width = `${size}px`;
        meteor.style.height = `${size}px`;

        // Random start position near top or left edge
        const startEdge = Math.random() > 0.5 ? 'top' : 'left';
        let startX, startY;

        if (startEdge === 'top') {
            startX = Math.random() * window.innerWidth;
            startY = -size; // Start just outside the top edge
        } else {
            startX = -size; // Start just outside the left edge
            startY = Math.random() * window.innerHeight;
        }

        meteor.style.left = `${startX}px`;
        meteor.style.top = `${startY}px`;

        // Random end position (moving diagonally)
        const endX = startX + Math.random() * window.innerWidth * 0.5 + window.innerWidth * 0.2; // Move right
        const endY = startY + Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.2; // Move down

        const travelDuration = Math.random() * 4 + 3; // 3 to 7 seconds
        const travelDelay = Math.random() * 5; // 0 to 5 seconds delay

        // Apply animation via CSS transition for simplicity
        // Ensure the transition property includes 'transform'
        meteor.style.transition = `transform ${travelDuration}s linear ${travelDelay}s, opacity 0.5s`;
        meteor.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${Math.random() * 360}deg)`; // Add random rotation
        meteor.style.opacity = 1; // Start with full opacity

        // Fade out towards the end of the animation
        setTimeout(() => {
            meteor.style.opacity = 0;
        }, (travelDuration + travelDelay) * 1000 - 500); // Start fading out 0.5s before end

        // Remove meteor after animation ends
         setTimeout(() => {
            meteor.remove();
        }, (travelDuration + travelDelay) * 1000 + 500); // Remove after animation and fade-out

        loadingScreen.appendChild(meteor);
    }
}

// Initialize loading
window.addEventListener('load', () => {
    body.classList.add('loading-active');
    createGalaxy();
    
    // Add loaded class to body immediately after load
    body.classList.add('loaded');
    
    // Fade out loading screen after a short delay
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            body.classList.remove('loading-active');
            
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.remove();
            }, { once: true });
        }
    }, 800);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized Parallax Effect
let parallaxTicking = false;
document.addEventListener('mousemove', (e) => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const background = document.querySelector('.background-animation');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            background.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Simplified Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe elements with animation classes
document.querySelectorAll('.service-card, .footer-section, .contact-item, .about-text, .stat-item, .experience-card').forEach(el => {
    observer.observe(el);
});

// Simplified Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Simplified Floating Animation
const heroContent = document.querySelector('.hero-content');
let floatY = 0;
let floatDirection = 1;

function animateFloat() {
    floatY += 0.01 * floatDirection;
    if (floatY > 1) floatDirection = -1;
    if (floatY < 0) floatDirection = 1;
    
    heroContent.style.transform = `translateY(${floatY * 5}px)`;
    requestAnimationFrame(animateFloat);
}

animateFloat();

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// Add CSS for scroll progress bar
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, var(--primary-color), var(--accent-color));
        z-index: 9999;
        transition: width 0.1s ease-out;
    }
    
    .fade-in {
        animation: fadeInUp 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Simplified Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// Create Space Particles
function createParticles() {
    const background = document.querySelector('.background-animation');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.8)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.5;
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        background.appendChild(particle);
    }
}

// Add hover effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.1) translateZ(30px)';
        item.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.6), 0 0 40px rgba(108, 99, 255, 0.4), 0 0 60px rgba(108, 99, 255, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) translateZ(0)';
        item.style.boxShadow = 'none';
    });
});

// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) translateZ(30px)';
        link.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.6), 0 0 40px rgba(108, 99, 255, 0.4), 0 0 60px rgba(108, 99, 255, 0.2)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) translateZ(0)';
        link.style.boxShadow = 'none';
    });
});

// Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name')?.value;
        const email = document.querySelector('#email')?.value;
        const message = document.querySelector('#message')?.value;
        
        if (!name || !email || !message) {
            alert('لطفاً تمام فیلدها را پر کنید');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('لطفاً یک ایمیل معتبر وارد کنید');
            return;
        }
        
        contactForm.submit();
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createGalaxy();
});

// Optimized Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Initialize animations after loading
    initAnimations();
});

// Optimized Animations
function initAnimations() {
    // Optimized Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(window.pageYOffset * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Optimized Service Cards Animation
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Optimized Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optimized Scroll Progress
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        let lastScrollTop = 0;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrollPercent = (scrollTop / docHeight) * 100;
                    
                    progressBar.style.width = scrollPercent + '%';
                    
                    if (scrollTop > lastScrollTop) {
                        progressBar.style.backgroundColor = 'var(--accent-color)';
                    } else {
                        progressBar.style.backgroundColor = 'var(--primary-color)';
                    }
                    
                    lastScrollTop = scrollTop;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// Optimized Background Animation
function createBackgroundAnimation() {
    const container = document.querySelector('.background-animation');
    if (!container) return;

    // Create stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        container.appendChild(star);
    }

    // Create planets
    const planets = [
        { color: '#FF6B6B', size: 20, orbit: 150 },
        { color: '#4ECDC4', size: 15, orbit: 200 },
        { color: '#FFD93D', size: 25, orbit: 250 }
    ];

    planets.forEach(planet => {
        const planetElement = document.createElement('div');
        planetElement.className = 'planet';
        planetElement.style.width = `${planet.size}px`;
        planetElement.style.height = `${planet.size}px`;
        planetElement.style.backgroundColor = planet.color;
        planetElement.style.animationDuration = `${Math.random() * 20 + 30}s`;
        container.appendChild(planetElement);
    });
}

// Initialize background animation
createBackgroundAnimation();

// Optimize loading screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    if (loadingScreen) {
        // Create stars for loading screen
        for (let i = 0; i < 50; i++) {
            createStar(loadingScreen);
        }
        
        // Show loading screen
        body.classList.add('loading-active');
        
        // Hide loading screen after content is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                body.classList.remove('loading-active');
                body.classList.add('loaded');
                
                // Initialize animations after loading
                initAnimations();
            }, 1000);
        });
    } else {
        // If no loading screen, just initialize animations
        body.classList.add('loaded');
        initAnimations();
    }
}

// Optimize animations
function initAnimations() {
    // Initialize Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe elements with animation classes
    document.querySelectorAll('.about-text, .stat-item, .experience-card, .contact-content, .contact-info, .contact-form, .map-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Optimize parallax effect
let ticking = false;
function handleParallax() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
}

// Optimize scroll handling
let scrollTimeout;
function handleScroll() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        handleParallax();
        updateScrollProgress();
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initMobileMenu();
    initSmoothScroll();
    
    // Add scroll event listener with throttling
    window.addEventListener('scroll', handleScroll, { passive: true });
}); 