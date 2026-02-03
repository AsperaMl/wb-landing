/**
 * Wildberries Academy - Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFAQ();
    initModules();
    initSmoothScroll();
    initFormSubmit();
    initScrollAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (!burger || !nav) return;
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Program Modules Accordion
 */
function initModules() {
    const modules = document.querySelectorAll('.module');
    
    modules.forEach(module => {
        const header = module.querySelector('.module__header');
        
        header.addEventListener('click', () => {
            const isActive = module.classList.contains('active');
            
            // Close all other modules
            modules.forEach(otherModule => {
                otherModule.classList.remove('active');
            });
            
            // Toggle current module
            if (!isActive) {
                module.classList.add('active');
            }
        });
    });
    
    // Open first module by default
    if (modules.length > 0) {
        modules[0].classList.add('active');
    }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Submission Handler
 */
function initFormSubmit() {
    const freeForm = document.getElementById('free-form');
    
    if (!freeForm) return;
    
    freeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = freeForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        // For demo purposes, we'll just show a success message
        
        const button = freeForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Отправлено! ✓';
        button.disabled = true;
        button.style.background = 'var(--color-success)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            freeForm.reset();
        }, 3000);
        
        // You can integrate with email services here:
        // - Mailchimp
        // - SendPulse
        // - GetResponse
        // - Custom backend
        
        console.log('Email submitted:', email);
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.for-whom__card, .case-card, .pricing-card, .module, .process__step, .expert__stat'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/**
 * Header scroll effect
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(13, 11, 30, 0.98)';
    } else {
        header.style.background = 'rgba(13, 11, 30, 0.95)';
    }
});

