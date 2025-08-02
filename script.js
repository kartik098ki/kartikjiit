// Global variables
let currentHackathon = '';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    setupModals();
    setupForms();
    setupAnimations();
    setupScrollEffects();
    setupMobileMenu();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            setActiveNavLink(link);
        });
    });

    // Handle scroll spy
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Scroll to section with smooth animation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Set active navigation link
function setActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Mobile menu functionality
function setupMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Modal functionality
function setupModals() {
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Show login modal
function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Show signup modal
function showSignup() {
    document.getElementById('signup-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Show hackathon registration modal
function showHackathonRegister(hackathonId) {
    currentHackathon = hackathonId;
    const modal = document.getElementById('hackathon-modal');
    const title = document.getElementById('hackathon-title');
    
    // Set modal title based on hackathon
    const hackathonTitles = {
        'techfest2024': 'Register for TechFest 2024',
        'startup2024': 'Register for StartupWeekend',
        'greentech2024': 'Register for GreenTech Challenge'
    };
    
    title.textContent = hackathonTitles[hackathonId] || 'Register for Hackathon';
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close all modals
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Switch between login and signup modals
function switchToSignup() {
    closeModal('login-modal');
    showSignup();
}

function switchToLogin() {
    closeModal('signup-modal');
    showLogin();
}

// Form handling
function setupForms() {
    setupLoginForm();
    setupSignupForm();
    setupContactForm();
    setupHackathonForm();
}

// Login form handling
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate form
        if (validateEmail(email) && validatePassword(password)) {
            // Show loading state
            showLoadingState(loginForm);
            
            // Simulate API call
            setTimeout(() => {
                hideLoadingState(loginForm);
                showSuccessMessage('Login successful! Welcome back.');
                closeModal('login-modal');
                
                // Store user session (in real app, this would be handled by backend)
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                }
            }, 1500);
        }
    });
}

// Signup form handling
function setupSignupForm() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('signup-firstname').value,
            lastName: document.getElementById('signup-lastname').value,
            email: document.getElementById('signup-email').value,
            phone: document.getElementById('signup-phone').value,
            course: document.getElementById('signup-course').value,
            year: document.getElementById('signup-year').value,
            password: document.getElementById('signup-password').value,
            confirmPassword: document.getElementById('signup-confirm-password').value,
            acceptTerms: document.getElementById('accept-terms').checked
        };
        
        // Validate form
        if (validateSignupForm(formData)) {
            // Show loading state
            showLoadingState(signupForm);
            
            // Simulate API call
            setTimeout(() => {
                hideLoadingState(signupForm);
                showSuccessMessage('Account created successfully! Welcome to Innovation Hub.');
                closeModal('signup-modal');
                
                // Store user data
                localStorage.setItem('userData', JSON.stringify(formData));
            }, 2000);
        }
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        if (name && validateEmail(email) && message) {
            // Show loading state
            showLoadingState(contactForm);
            
            // Simulate API call
            setTimeout(() => {
                hideLoadingState(contactForm);
                showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
            }, 1500);
        } else {
            showErrorMessage('Please fill in all required fields correctly.');
        }
    });
}

// Hackathon registration form handling
function setupHackathonForm() {
    const hackathonForm = document.getElementById('hackathon-form');
    hackathonForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            hackathon: currentHackathon,
            teamName: document.getElementById('team-name').value,
            teamSize: document.getElementById('team-size').value,
            leaderName: document.getElementById('leader-name').value,
            leaderEmail: document.getElementById('leader-email').value,
            leaderPhone: document.getElementById('leader-phone').value,
            leaderCourse: document.getElementById('leader-course').value,
            projectTitle: document.getElementById('project-title').value,
            projectDescription: document.getElementById('project-description').value,
            techStack: document.getElementById('tech-stack').value,
            acceptTerms: document.getElementById('hackathon-terms').checked
        };
        
        // Validate form
        if (validateHackathonForm(formData)) {
            // Show loading state
            showLoadingState(hackathonForm);
            
            // Simulate API call
            setTimeout(() => {
                hideLoadingState(hackathonForm);
                showSuccessMessage(`Team registered successfully for ${getHackathonName(currentHackathon)}! Check your email for confirmation.`);
                closeModal('hackathon-modal');
                hackathonForm.reset();
            }, 2000);
        }
    });
}

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateSignupForm(data) {
    const errors = [];
    
    if (!data.firstName.trim()) errors.push('First name is required');
    if (!data.lastName.trim()) errors.push('Last name is required');
    if (!validateEmail(data.email)) errors.push('Valid email is required');
    if (!data.phone.trim()) errors.push('Phone number is required');
    if (!data.course) errors.push('Course selection is required');
    if (!data.year) errors.push('Year selection is required');
    if (!validatePassword(data.password)) errors.push('Password must be at least 6 characters');
    if (data.password !== data.confirmPassword) errors.push('Passwords do not match');
    if (!data.acceptTerms) errors.push('You must accept the terms and conditions');
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

function validateHackathonForm(data) {
    const errors = [];
    
    if (!data.teamName.trim()) errors.push('Team name is required');
    if (!data.teamSize) errors.push('Team size is required');
    if (!data.leaderName.trim()) errors.push('Team leader name is required');
    if (!validateEmail(data.leaderEmail)) errors.push('Valid email is required');
    if (!data.leaderPhone.trim()) errors.push('Phone number is required');
    if (!data.leaderCourse.trim()) errors.push('Course/Branch is required');
    if (!data.projectTitle.trim()) errors.push('Project title is required');
    if (!data.projectDescription.trim()) errors.push('Project description is required');
    if (!data.techStack.trim()) errors.push('Technology stack is required');
    if (!data.acceptTerms) errors.push('You must accept the hackathon terms');
    
    if (errors.length > 0) {
        showErrorMessage(errors.join('\n'));
        return false;
    }
    
    return true;
}

// Get hackathon name by ID
function getHackathonName(id) {
    const names = {
        'techfest2024': 'TechFest 2024',
        'startup2024': 'StartupWeekend',
        'greentech2024': 'GreenTech Challenge'
    };
    return names[id] || 'Hackathon';
}

// Loading states
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Loading...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    
    // Store original text for restoration
    submitBtn.dataset.originalText = originalText;
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
    submitBtn.disabled = false;
    form.classList.remove('loading');
}

// Notification system
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification(this.parentElement.parentElement)">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out forwards;
        backdrop-filter: blur(10px);
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// Animation setup
function setupAnimations() {
    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Scroll effects
function setupScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .hackathon-card, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generateTeamId() {
    return 'TEAM_' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value;
    
    if (validateEmail(email)) {
        showSuccessMessage('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    } else {
        showErrorMessage('Please enter a valid email address.');
    }
}

// Add newsletter form listener
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            subscribeNewsletter();
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Navigate modals with Tab
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal[style*="block"]');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
});

// Google OAuth simulation (placeholder)
function initiateGoogleSignIn() {
    showSuccessMessage('Google Sign-In integration would be implemented here with actual OAuth.');
}

// Add Google button listeners
document.addEventListener('DOMContentLoaded', () => {
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(btn => {
        btn.addEventListener('click', initiateGoogleSignIn);
    });
});

// Performance optimization - Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Theme toggle (bonus feature)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showSuccessMessage(`Switched to ${newTheme} theme!`);
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Search functionality (placeholder for future implementation)
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Implement search logic here
            console.log('Searching for:', query);
        });
    }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);
    // Implement actual analytics tracking here
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send error to logging service
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Accessibility improvements
function improveAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-gradient);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.setAttribute('role', 'main');
        heroSection.id = 'main';
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Export functions for global access
window.showLogin = showLogin;
window.showSignup = showSignup;
window.showHackathonRegister = showHackathonRegister;
window.closeModal = closeModal;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
window.scrollToSection = scrollToSection;
window.closeNotification = closeNotification;