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

// Create Geometric Shapes
function createShapes() {
    const background = document.querySelector('.background-animation');
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.15)'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'geometric-shape';
        shape.style.position = 'absolute';
        shape.style.width = Math.random() * 100 + 50 + 'px';
        shape.style.height = shape.style.width;
        shape.style.background = colors[Math.floor(Math.random() * colors.length)];
        shape.style.top = Math.random() * 100 + '%';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '0';
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
        shape.style.opacity = '0';
        shape.style.transition = 'all 0.5s ease';
        
        if (shapes[Math.floor(Math.random() * shapes.length)] === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = '50px solid transparent';
            shape.style.borderRight = '50px solid transparent';
            shape.style.borderBottom = '86.6px solid ' + colors[Math.floor(Math.random() * colors.length)];
            shape.style.background = 'transparent';
        }
        
        background.appendChild(shape);
        
        // Animate shape
        setTimeout(() => {
            shape.style.opacity = '1';
            shape.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)`;
        }, i * 100);
    }
}

// Parallax Effect for Background Animation
document.addEventListener('mousemove', (e) => {
    const background = document.querySelector('.background-animation');
    const shapes = document.querySelectorAll('.geometric-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    background.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    
    shapes.forEach((shape, index) => {
        const speed = 1 + index * 0.1;
        shape.style.transform = `translate(${x * 50 * speed}px, ${y * 50 * speed}px) rotate(${x * 360}deg)`;
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
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
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
        background: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
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
    
    .geometric-shape {
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
    createShapes();
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
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) translateZ(0)';
    });
});

// Add hover effect to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) translateZ(30px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) translateZ(0)';
    });
}); 