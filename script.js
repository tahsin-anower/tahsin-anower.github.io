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
  initStatCounters();
  initTimelineInteractions();
  
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

// Contact Form - UPDATED FOR FORMSPREE
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Add floating labels functionality
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Check if input has value on page load
      if (input.value) {
        input.parentElement.classList.add('filled');
      }
      
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
        this.parentElement.classList.toggle('filled', this.value !== '');
      });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      
      // Show loading state
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      
      try {
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        if (!name || !email || !subject || !message) {
          throw new Error('Please fill in all required fields.');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error('Please enter a valid email address.');
        }
        
        // Send to Formspree
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showFormMessage('🎉 Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
          this.reset();
          
          // Reset all labels
          inputs.forEach(input => {
            input.parentElement.classList.remove('filled', 'focused');
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Form submission failed. Please try again.');
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(`❌ ${error.message}`, 'error');
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.textContent = originalText;
      }
    });
  }
}

// Show form message
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles for the message
  messageDiv.style.cssText = `
    background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
    border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
    color: ${type === 'success' ? '#10b981' : '#ef4444'};
    padding: 1rem 1.5rem;
    border-radius: 10px;
    margin: 1rem 0;
    font-weight: 500;
  `;
  
  // Insert after form header
  const formHeader = document.querySelector('.form-header');
  if (formHeader) {
    formHeader.parentNode.insertBefore(messageDiv, formHeader.nextSibling);
  }
  
  // Auto remove after 8 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 8000);
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