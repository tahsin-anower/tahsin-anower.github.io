// script.js - Fixed version without loading issues
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = ['Web Developer', 'Engineering Student', 'Problem Solver', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }
        typeWriter();
    }

    // Animate skill bars
    const animateSkills = () => {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const skillLevel = card.getAttribute('data-skill');
            const progressBar = card.querySelector('.skill-progress');
            if (progressBar) {
                progressBar.style.width = skillLevel + '%';
            }
        });
    };

    // Animate stats counting
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 40);
        });
    };

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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

    // Initialize animations when elements come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-container')) {
                    animateSkills();
                }
                if (entry.target.classList.contains('about-stats')) {
                    animateStats();
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe sections
    const skillsSection = document.querySelector('.skills-container');
    const statsSection = document.querySelector('.about-stats');
    
    if (skillsSection) observer.observe(skillsSection);
    if (statsSection) observer.observe(statsSection);

    // Mobile menu toggle (if you have one)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Simple form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});
// Click to change profile image (cycle through multiple images)
let currentImageIndex = 0;
const profileImages = [
    'images/profile.jpg',
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=300&fit=crop'
];

document.getElementById('profileImage').addEventListener('click', function() {
    currentImageIndex = (currentImageIndex + 1) % profileImages.length;
    this.src = profileImages[currentImageIndex];
});