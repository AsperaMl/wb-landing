/**
 * Wildberries Academy - Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initVideoCarousel();
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
    
    const groups = [
        '.for-whom__card',
        '.module-row',
        '.expert__stat'
    ];
    
    groups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, i) => {
            const delay = Math.min(i * 0.08, 0.4);
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            el.style.transition = `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`;
            observer.observe(el);
        });
    });
}

/**
 * Video Reviews — single-slide Swiper with native controls
 */
function initVideoCarousel() {
    const el = document.querySelector('.vr-swiper');
    const counter = document.querySelector('.vr-showcase__counter');
    if (!el) return;

    const totalSlides = el.querySelectorAll('.swiper-slide').length;

    const swiper = new Swiper('.vr-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        grabCursor: true,
        navigation: {
            prevEl: '.vr-showcase__arrow--prev',
            nextEl: '.vr-showcase__arrow--next',
        },
        on: {
            init: function () {
                updateCounter(this.activeIndex + 1, totalSlides);
            },
            slideChange: function () {
                updateCounter(this.activeIndex + 1, totalSlides);
                pauseAllVideos();
            },
        },
    });

    function updateCounter(current, total) {
        if (counter) counter.textContent = current + ' / ' + total;
    }

    function pauseAllVideos() {
        el.querySelectorAll('video').forEach(v => {
            if (!v.paused) v.pause();
        });
    }
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

