// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

// Parallax Effect for Background Animation
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background-animation');
    const particles = document.querySelectorAll('.particle');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    background.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    
    particles.forEach((particle, index) => {
        const speed = 1 + index * 0.1;
        particle.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px)`;
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards and sections
document.querySelectorAll('.service-card, .footer-section, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add hover effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(10deg)';
        card.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.6), 0 0 40px rgba(108, 99, 255, 0.4), 0 0 60px rgba(108, 99, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
        card.style.boxShadow = 'none';
    });
});

// Add floating animation to hero content
const heroContent = document.querySelector('.hero-content');
let floatY = 0;
let floatDirection = 1;

function animateHeroContent() {
    floatY += 0.1 * floatDirection;
    
    if (floatY > 20) {
        floatDirection = -1;
    } else if (floatY < 0) {
        floatDirection = 1;
    }
    
    heroContent.style.transform = `translateY(${floatY}px) translateZ(30px)`;
    requestAnimationFrame(animateHeroContent);
}

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Add CSS for scroll progress bar and animations
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(to right, var(--primary-color), var(--accent-color));
        z-index: 1001;
        transition: width 0.1s ease;
    }
    
    .fade-in {
        animation: fadeIn 1s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .particle {
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-100px) translateX(50px);
        }
        50% {
            transform: translateY(-200px) translateX(0);
        }
        75% {
            transform: translateY(-100px) translateX(-50px);
        }
        100% {
            transform: translateY(0) translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Add active state to current navigation link
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');

menuItems.forEach(item => {
    if (item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    createParticles();
    animateHeroContent();
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('لطفاً تمام فیلدها را پر کنید');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('لطفاً یک ایمیل معتبر وارد کنید');
            return;
        }
        
        // If validation passes, submit the form
        contactForm.submit();
    });
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