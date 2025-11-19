// Particle System
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 80;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        particle.update();
        particle.draw(ctx);

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

initCanvas();
animateParticles();

window.addEventListener('resize', initCanvas);

// Smooth scrolling for navigation links
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

// Active navigation state on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let current = '';

    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1, // Trigger earlier for faster appearance
    rootMargin: '0px 0px -50px 0px' // Reduced margin for earlier triggering
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
                observer.unobserve(entry.target);
            }

            if (entry.target.classList.contains('gallery-item')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observe elements
const heroStats = document.querySelector('.hero-stats');
const galleryItems = document.querySelectorAll('.gallery-item');

if (heroStats) observer.observe(heroStats);

galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    // Faster stagger: 0.05s instead of 0.1s, max 3 items delay
    const delay = Math.min(index * 0.05, 0.15);
    item.style.transition = `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`;
    observer.observe(item);
});

// Mouse trail effect for hero section
const hero = document.querySelector('.hero');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

hero.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');

    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.01;
        const x = (currentX - window.innerWidth / 2) * speed;
        const y = (currentY - window.innerHeight / 2) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });

    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.querySelector('.lightbox-close');

// Open lightbox when clicking gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    // Set background image if data-image exists
    const imageUrl = item.getAttribute('data-image');
    if (imageUrl) {
        const placeholder = item.querySelector('.gallery-placeholder');
        placeholder.style.backgroundImage = `url('${imageUrl}')`;
    }

    item.addEventListener('click', () => {
        const image = item.getAttribute('data-image');
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');

        if (image) {
            lightboxImage.src = image;
            lightboxTitle.textContent = title || 'Untitled';
            lightboxDescription.textContent = description || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Parallax scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.animated-bg');

    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
});

// Add smooth reveal animations for about section
const aboutElements = document.querySelectorAll('.about-left, .about-right');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

aboutElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    aboutObserver.observe(el);
});

// Social card hover effects
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic year in footer
const footer = document.querySelector('.footer p');
if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Phoenix. All rights reserved.`;
}

// Prevent animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add cursor trail effect
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// Enhanced gallery hover with optimized tilt effect
galleryItems.forEach(item => {
    let tiltFrame = null;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let isHovering = false;

    function updateTilt() {
        // Smooth interpolation for fluid movement
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;

        if (isHovering) {
            item.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateY(-10px) scale(1.02)`;
            tiltFrame = requestAnimationFrame(updateTilt);
        }
    }

    item.addEventListener('mouseenter', () => {
        isHovering = true;
        item.style.willChange = 'transform';
        updateTilt();
    });

    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Reduced divisor for more subtle effect (30 instead of 20)
        targetRotateX = (y - centerY) / 30;
        targetRotateY = (centerX - x) / 30;
    });

    item.addEventListener('mouseleave', () => {
        isHovering = false;
        if (tiltFrame) {
            cancelAnimationFrame(tiltFrame);
        }
        item.style.willChange = 'auto';
        item.style.transform = '';
        currentRotateX = 0;
        currentRotateY = 0;
        targetRotateX = 0;
        targetRotateY = 0;
    });
});

console.log('🔥 Phoenix Portfolio Loaded - Enjoy the experience!');
