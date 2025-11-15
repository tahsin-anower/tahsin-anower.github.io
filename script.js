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
        const formData = new FormData(this);
        
        // Send to Formspree
        const response = await fetch(this.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
          this.reset();
          
          // Reset all labels
          inputs.forEach(input => {
            input.parentElement.classList.remove('filled', 'focused');
          });
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
      } finally {
        resetButton(submitBtn, btnText, originalText);
      }
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

// Enhanced Contact Form Functionality
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
      
      // Get form data
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries());
      
      // Simple validation
      if (!validateForm(formObject)) {
        resetButton(submitBtn, btnText, originalText);
        return;
      }
      
      try {
        // In a real implementation, you would send this to your backend or Formspree
        // For now, we'll simulate a successful submission
        await simulateFormSubmission(formObject);
        
        // Show success message
        showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
        this.reset();
        
        // Reset all labels
        inputs.forEach(input => {
          input.parentElement.classList.remove('filled', 'focused');
        });
        
      } catch (error) {
        // Show error message
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly via email.', 'error');
      } finally {
        resetButton(submitBtn, btnText, originalText);
      }
    });
  }
}

function validateForm(formData) {
  const { name, email, subject, message } = formData;
  
  if (!name || !email || !subject || !message) {
    showFormMessage('Please fill in all required fields.', 'error');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormMessage('Please enter a valid email address.', 'error');
    return false;
  }
  
  return true;
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;
  
  // Insert after form header
  const formHeader = document.querySelector('.form-header');
  formHeader.parentNode.insertBefore(messageDiv, formHeader.nextSibling);
  
  // Auto remove after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

function simulateFormSubmission(formData) {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll randomly fail 10% of the time
      if (Math.random() < 0.1) {
        reject(new Error('Network error'));
      } else {
        resolve(formData);
        
        // In a real implementation, you would:
        // 1. Send data to Formspree or your backend
        // 2. Handle the actual email delivery
      }
    }, 1500);
  });
}

function resetButton(button, btnText, originalText) {
  button.disabled = false;
  btnText.textContent = originalText;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Initialize stat counters after DOM is loaded
document.addEventListener('DOMContentLoaded', initStatCounters);