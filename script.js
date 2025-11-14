// script.js - Updated with Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Dark/Light Mode Toggle Functionality
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use OS preference
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
        }
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save theme preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Initialize theme toggle
    initThemeToggle();

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

    // Add click ripple effect to profile image
    const profileImage = document.getElementById('profileImage');
    if (profileImage) {
        profileImage.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
	
		
	// Enhanced Experience Section Animation
	function animateTimelineItems() {
	  const timelineItems = document.querySelectorAll('.timeline-item');
	  
	  const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		  }
		});
	  }, { threshold: 0.1 });
	  
	  timelineItems.forEach(item => {
		observer.observe(item);
	  });
	}

	// Call the function when the DOM is loaded
	document.addEventListener('DOMContentLoaded', animateTimelineItems);
});