/**
 * Wildberries Academy - Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFAQ();
    initHeroCarousel();
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
 * Program Slider
 */
function initProgramSlider() {
    const slider = document.getElementById('program-slider');
    const prevBtn = document.getElementById('prog-prev');
    const nextBtn = document.getElementById('prog-next');
    const dotsContainer = document.getElementById('program-dots');
    
    if (!slider || !prevBtn || !nextBtn) return;
    
    const cards = slider.querySelectorAll('.module-card');
    const cardWidth = 280; // card width + gap
    const totalCards = cards.length;
    
    // Create dots
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth) || 3;
    const totalDots = Math.ceil(totalCards / visibleCards);
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('program__dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            slider.scrollTo({ left: i * visibleCards * cardWidth, behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.program__dot');
    
    // Arrow navigation
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    });
    
    // Update active dot on scroll
    slider.addEventListener('scroll', () => {
        const scrollPos = slider.scrollLeft;
        const activeIndex = Math.round(scrollPos / (visibleCards * cardWidth));
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });
}

/**
 * Hero Carousel
 */
function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.hero__slide');
    const dots = carousel.querySelectorAll('.hero__carousel-dot');
    let current = 0;
    
    function goTo(index) {
        slides[current].classList.remove('hero__slide--active');
        dots[current].classList.remove('hero__carousel-dot--active');
        current = index;
        slides[current].classList.add('hero__slide--active');
        dots[current].classList.add('hero__carousel-dot--active');
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.slide));
        });
    });
    
    // Auto-rotate every 4 seconds
    setInterval(() => {
        goTo((current + 1) % slides.length);
    }, 4000);
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
    
    // Elements to animate (excluding .case-card — results visible immediately)
    const animateElements = document.querySelectorAll(
        '.for-whom__card, .pricing-card, .module-row, .expert__stat'
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

