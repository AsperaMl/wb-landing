/**
 * Wildberries Academy - Landing Page Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initVideoCarousel();
    initUrgencyTimer();
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
 * Video Reviews — Swiper with peek effect, dots, and custom play overlay
 */
function initVideoCarousel() {
    const el = document.querySelector('.vr-swiper');
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    const swiper = new Swiper('.vr-swiper', {
        slidesPerView: isMobile ? 1 : 1.15,
        centeredSlides: true,
        spaceBetween: isMobile ? 16 : 32,
        loop: true,
        grabCursor: true,
        navigation: {
            prevEl: '.vr-showcase__arrow--prev',
            nextEl: '.vr-showcase__arrow--next',
        },
        pagination: {
            el: '.vr-dots',
            clickable: true,
        },
        on: {
            slideChange: function () {
                pauseAllVideos();
                resetPlayButtons();
            },
        },
    });

    function pauseAllVideos() {
        el.querySelectorAll('video').forEach(v => {
            if (!v.paused) {
                v.pause();
                v.removeAttribute('controls');
            }
        });
    }

    function resetPlayButtons() {
        el.querySelectorAll('.vr-card__play').forEach(btn => {
            btn.classList.remove('hidden');
        });
    }

    document.querySelectorAll('.vr-card__play').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.vr-card');
            const video = card.querySelector('video');
            if (!video) return;

            pauseAllVideos();
            resetPlayButtons();

            this.classList.add('hidden');
            video.setAttribute('controls', '');
            video.play();
        });
    });

    el.querySelectorAll('video').forEach(video => {
        video.addEventListener('pause', function () {
            const card = this.closest('.vr-card');
            const btn = card.querySelector('.vr-card__play');
            if (this.ended && btn) {
                btn.classList.remove('hidden');
                this.removeAttribute('controls');
            }
        });

        video.addEventListener('ended', function () {
            const card = this.closest('.vr-card');
            const btn = card.querySelector('.vr-card__play');
            if (btn) {
                btn.classList.remove('hidden');
                this.removeAttribute('controls');
            }
        });
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

/**
 * Urgency countdown timer — persists deadline in localStorage
 */
function initUrgencyTimer() {
    const badge = document.getElementById('urgency');
    const closeBtn = document.getElementById('urgency-close');
    if (!badge) return;

    

    const STORAGE_KEY = 'urgency_deadline_v2';
    let deadline = localStorage.getItem(STORAGE_KEY);
    if (!deadline || new Date(deadline) <= new Date()) {
        const d = new Date();
        d.setDate(d.getDate() + 2);
        d.setHours(d.getHours() + 3);
        deadline = d.toISOString();
        localStorage.setItem(STORAGE_KEY, deadline);
    }

    const end = new Date(deadline);

    function tick() {
        const now = new Date();
        let diff = Math.max(0, Math.floor((end - now) / 1000));

        const days = Math.floor(diff / 86400); diff %= 86400;
        const hours = Math.floor(diff / 3600); diff %= 3600;
        const mins = Math.floor(diff / 60);
        const secs = diff % 60;

        document.getElementById('u-days').textContent = String(days).padStart(2, '0');
        document.getElementById('u-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('u-mins').textContent = String(mins).padStart(2, '0');
        document.getElementById('u-secs').textContent = String(secs).padStart(2, '0');

        if (days === 0 && hours === 0 && mins === 0 && secs === 0) {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    tick();
    setInterval(tick, 1000);

    closeBtn.addEventListener('click', () => {
        badge.classList.add('hidden');
    });

    setTimeout(() => { badge.style.opacity = '1'; }, 2000);
}

