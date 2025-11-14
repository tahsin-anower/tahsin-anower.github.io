// script.js - Portfolio Website Functionality

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initThemeToggle();
  initScrollEffects();
  initSkillAnimations();
  initContactForm();
  initBackToTop();
  animateTimelineItems();
  initProfileImageEffects();
  
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Navigation
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Active link highlighting
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Dark/Light Mode Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme or prefered scheme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Scroll Effects
function initScrollEffects() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.section, .detail-item, .stat-card, .skills-category, .project-card');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

// Skill Animations
function initSkillAnimations() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    const skillLevel = card.getAttribute('data-skill');
    const progressBar = card.querySelector('.skill-progress');
    const percentText = card.querySelector('.skill-percent');
    
    // Animate progress bars when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            progressBar.style.width = `${skillLevel}%`;
            percentText.textContent = `${skillLevel}%`;
          }, 300);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(card);
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // In a real application, you would send the form data to a server here
      // For now, we'll just show a success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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

// Enhanced Experience Section Animation
function animateTimelineItems() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add staggered animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
      }
    });
  }, { threshold: 0.1 });
  
  timelineItems.forEach((item, index) => {
    // Add staggered delay for multiple items
    item.dataset.delay = index * 200;
    observer.observe(item);
  });
}

// Add hover effects for timeline dots
function initTimelineInteractions() {
  const timelineDots = document.querySelectorAll('.timeline-dot');
  
  timelineDots.forEach(dot => {
    dot.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.3)';
      this.style.boxShadow = '0 0 0 4px var(--bg), 0 0 0 8px var(--primary), 0 0 30px var(--primary)';
    });
    
    dot.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 0 4px var(--bg), 0 0 0 6px var(--primary)';
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  animateTimelineItems();
  initTimelineInteractions();
});

// Profile Image Effects
function initProfileImageEffects() {
  const profileImage = document.getElementById('profileImage');
  
  if (profileImage) {
    // Ripple effect on click
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
      
      this.parentElement.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
}

// Stat Counter Animation
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        stat.textContent = target;
      }
    };
    
    // Start counter when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(stat);
  });
}

// Enhanced Contact Form Interactions
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  // Add focus effects
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
  
  // Form submission with enhanced feedback
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual Formspree submission)
    setTimeout(() => {
      // Show success message
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      // Reset form
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Remove focus from all inputs
      formInputs.forEach(input => {
        input.parentElement.classList.remove('focused');
      });
    }, 2000);
  });
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message ${type}`;
  messageEl.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
    ${message}
  `;
  
  // Add styles for message
  messageEl.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideInRight 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 300px;
  `;
  
  document.body.appendChild(messageEl);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Initialize stat counters after DOM is loaded
document.addEventListener('DOMContentLoaded', initStatCounters);