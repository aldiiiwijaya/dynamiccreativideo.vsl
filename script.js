/* ============================================
   DYNAMIC CREATIVE - JAVASCRIPT
   Professional Videography & Digital Marketing
   ============================================ */

// Global variables
let videoSwiper, photoSwiper;
let scrollTicking = false;
let lastScrollTop = 0;
let isMenuOpen = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollProgress();
    initRevealAnimations();
    initCarousels();
    initSmoothScrolling();
    initScrollEffects();
    
    console.log('Dynamic Creative - All systems loaded! 🚀');
});

/* ============================================
   LOADING SCREEN
   ============================================ */

function initLoader() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    // Prevent scrolling during loading
    body.style.overflow = 'hidden';
    
    // Hide loader after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hide');
            body.style.overflow = 'auto';
            
            // Remove loader from DOM after animation
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1500); // Show loader for at least 1.5 seconds
    });
}

/* ============================================
   NAVIGATION SYSTEM
   ============================================ */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Handle navigation clicks
    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    closeMobileMenu();
                }
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(link.getAttribute('href'));
            }
        });
    });
    
    // Scroll behavior for navbar
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Add scrolled class
                if (currentScrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.classList.add('hidden');
                } else {
                    navbar.classList.remove('hidden');
                }
                
                lastScrollY = currentScrollY;
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', throttle(updateActiveNavOnScroll, 100));
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    isMenuOpen = !isMenuOpen;
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('show');
    mobileOverlay.classList.toggle('show');
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    isMenuOpen = false;
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('show');
    mobileOverlay.classList.remove('show');
    body.style.overflow = 'auto';
}

function updateActiveNavLink(targetHref) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current links
    document.querySelectorAll(`[href="${targetHref}"]`).forEach(link => {
        link.classList.add('active');
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(`#${sectionId}`);
        }
    });
}

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */

function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                
                scrollProgress.style.width = scrollPercent + '%';
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });
}

/* ============================================
   REVEAL ANIMATIONS
   ============================================ */

function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const sectionNumbers = document.querySelectorAll('.section-number');
    
    // Create intersection observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay * 100);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Create observer for section numbers
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    });
    
    // Observe all reveal elements
    revealElements.forEach((element, index) => {
        element.dataset.delay = element.classList.contains('reveal-delay-1') ? 1 :
                               element.classList.contains('reveal-delay-2') ? 2 :
                               element.classList.contains('reveal-delay-3') ? 3 :
                               element.classList.contains('reveal-delay-4') ? 4 :
                               element.classList.contains('reveal-delay-5') ? 5 : 0;
        
        revealObserver.observe(element);
    });
    
    // Observe section numbers
    sectionNumbers.forEach(number => {
        numberObserver.observe(number);
    });
}

/* ============================================
   ENHANCED CAROUSEL SYSTEM
   ============================================ */

function initCarousels() {
    // Initialize Video Carousel
    videoSwiper = new Swiper('.videoSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false
        },
        navigation: {
            nextEl: '.videoSwiper .swiper-button-next',
            prevEl: '.videoSwiper .swiper-button-prev'
        },
        pagination: {
            el: '.videoSwiper .swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            320: {
                coverflowEffect: {
                    stretch: 40,
                    depth: 100
                }
            },
            768: {
                coverflowEffect: {
                    stretch: 60,
                    depth: 150
                }
            },
            1024: {
                coverflowEffect: {
                    stretch: 80,
                    depth: 200
                }
            }
        },
        on: {
            init: function() {
                // Add custom classes for better control
                this.slides.forEach((slide, index) => {
                    slide.classList.add('swiper-slide-custom');
                });
            },
            slideChange: function() {
                // Pause all videos when slide changes
                pauseAllVideos();
                
                // Add smooth transition effect
                this.slides.forEach(slide => {
                    slide.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
            },
            touchStart: function() {
                // Pause autoplay on touch
                this.autoplay.stop();
            },
            touchEnd: function() {
                // Resume autoplay after touch
                setTimeout(() => {
                    this.autoplay.start();
                }, 2000);
            }
        }
    });
    
    // Initialize Photo Carousel
    photoSwiper = new Swiper('.photoSwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        coverflowEffect: {
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false
        },
        navigation: {
            nextEl: '.photoSwiper .swiper-button-next',
            prevEl: '.photoSwiper .swiper-button-prev'
        },
        pagination: {
            el: '.photoSwiper .swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        breakpoints: {
            320: {
                coverflowEffect: {
                    stretch: 40,
                    depth: 100
                }
            },
            768: {
                coverflowEffect: {
                    stretch: 60,
                    depth: 150
                }
            },
            1024: {
                coverflowEffect: {
                    stretch: 80,
                    depth: 200
                }
            }
        },
        on: {
            init: function() {
                this.slides.forEach((slide, index) => {
                    slide.classList.add('swiper-slide-custom');
                });
            },
            slideChange: function() {
                this.slides.forEach(slide => {
                    slide.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });
            },
            touchStart: function() {
                this.autoplay.stop();
            },
            touchEnd: function() {
                setTimeout(() => {
                    this.autoplay.start();
                }, 2000);
            }
        }
    });
    
    // Pause carousel autoplay when not in view
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const swiper = entry.target.swiper;
            if (swiper) {
                if (entry.isIntersecting) {
                    swiper.autoplay.start();
                } else {
                    swiper.autoplay.stop();
                }
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Observe both carousels
    if (videoSwiper) carouselObserver.observe(videoSwiper.el);
    if (photoSwiper) carouselObserver.observe(photoSwiper.el);
}

function pauseAllVideos() {
    const iframes = document.querySelectorAll('.video-wrapper iframe');
    iframes.forEach(iframe => {
        // Send pause command to YouTube videos
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    });
}

/* ============================================
   VIDEO DETAIL MODAL (Optional Enhancement)
   ============================================ */

function openVideoDetail(videoId) {
    console.log(`Opening video detail for: ${videoId}`);
    
    // Video details data
    const videoDetails = {
        '8amities': {
            title: '8\'Amities Brand Video',
            description: 'Brand promotional video dengan konsep yang menarik dan storytelling yang kuat. Video ini menampilkan identitas brand dengan visual yang clean dan modern.',
            client: '8\'Amities',
            duration: '2:30',
            category: 'Brand Video'
        },
        'bymanda': {
            title: 'Bymanda Fashion Video',
            description: 'Fashion brand content dengan visual yang elegan dan cinematography profesional. Menampilkan koleksi fashion dengan gaya editorial yang sophisticated.',
            client: 'Bymanda',
            duration: '1:45',
            category: 'Fashion'
        },
        'cemilan-keto': {
            title: 'Cemilan Keto Food Video',
            description: 'Food & beverage promotional content dengan angle yang appetizing. Video ini fokus pada texture dan kualitas produk makanan sehat.',
            client: 'Cemilan Keto',
            duration: '1:20',
            category: 'Food & Beverage'
        },
        'ribsgold': {
            title: 'Ribsgold Product Video',
            description: 'Product showcase dengan storytelling yang kuat dan visual yang memukau. Menampilkan keunggulan produk dengan pendekatan premium.',
            client: 'Ribsgold',
            duration: '2:15',
            category: 'Product'
        },
        'seven-salon': {
            title: 'Seven The Salon Beauty Video',
            description: 'Visual premium yang menonjolkan before-after, layanan, dan branding mewah. Video ini menampilkan transformasi dan pengalaman salon premium.',
            client: 'Seven The Salon',
            duration: '2:45',
            category: 'Beauty'
        },
        'tahu-talaga': {
            title: 'Tahu Talaga Yun\'Sen Food Video',
            description: 'Konten menggugah yang tampilkan tahu sehat berkualitas dengan konsep resto kekinian. Video ini memadukan tradisional dan modern.',
            client: 'Tahu Talaga Yun\'Sen',
            duration: '1:50',
            category: 'Food & Beverage'
        },
        'nikuya': {
            title: 'Nikuya Brand Video',
            description: 'Konten brand premium dengan visual estetik dan storytelling edukatif untuk bangun awareness produk berkualitas.',
            client: 'Nikuya',
            duration: '2:20',
            category: 'Brand Video'
        },
        'pulse-fitness': {
            title: 'Pulse Fitness Gym Video',
            description: 'Konten promosi gym dengan visual dinamis dan penyampaian energik, cocok untuk gaya hidup sehat yang aktif.',
            client: 'Pulse Fitness',
            duration: '1:35',
            category: 'Fitness'
        },
        'lumity-studio': {
            title: 'Lumity Studio Fitness Video',
            description: 'Visual dinamis untuk yoga, zumba, trampoline hingga aerobik dengan fokus estetika gerakan dan semangat sehat.',
            client: 'Lumity Studio',
            duration: '2:10',
            category: 'Fitness'
        },
        'skin-ethica': {
            title: 'Skin Ethica Beauty Video',
            description: 'Konten klinik kecantikan dengan ambience elegan dan visual profesional untuk bangun trust dan brand modern.',
            client: 'Skin Ethica',
            duration: '2:30',
            category: 'Beauty'
        },
        'anita-salon': {
            title: 'Anita Salon Beauty Video',
            description: 'Video dokumentasi layanan salon dengan storytelling ringan dan visual elegan yang membangun citra brand terpercaya.',
            client: 'Anita Salon',
            duration: '1:55',
            category: 'Beauty'
        },
        'sambarajo': {
            title: 'Sambarajo Restaurant Video',
            description: 'Konten restoran khas Padang dengan visual autentik yang menggugah selera dan kuatkan identitas kuliner.',
            client: 'Sambarajo',
            duration: '2:00',
            category: 'Food & Beverage'
        },
        'peek-a-boo': {
            title: 'Peek A Boo Salon Video',
            description: 'Visual hairstyling yang fun dan stylish, menampilkan karakter klien dan atmosfer dinamis salon modern.',
            client: 'Peek A Boo',
            duration: '1:40',
            category: 'Beauty'
        }
    };
    
    const detail = videoDetails[videoId];
    if (detail) {
        // Simple alert for now - can be enhanced with a modal
        alert(`${detail.title}\n\nClient: ${detail.client}\nDuration: ${detail.duration}\nCategory: ${detail.category}\n\n${detail.description}`);
    }
}

/* ============================================
   SMOOTH SCROLLING ENHANCEMENTS
   ============================================ */

function initSmoothScrolling() {
    // Polyfill for browsers that don't support smooth scrolling
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Load smooth scroll polyfill if needed
        loadSmoothScrollPolyfill();
    }
    
    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Custom smooth scroll implementation
                smoothScrollTo(offsetPosition, 800);
            }
        });
    });
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

function loadSmoothScrollPolyfill() {
    // Simple smooth scroll polyfill
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js';
    document.head.appendChild(script);
}

/* ============================================
   SCROLL EFFECTS & PARALLAX
   ============================================ */

function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Add subtle parallax to section numbers
        document.querySelectorAll('.section-number').forEach((number, index) => {
            const speed = 0.1 + (index * 0.05);
            number.style.transform = `translateX(-50%) translateY(${scrolled * speed}px)`;
        });
        
    }, 16)); // ~60fps
}

/* ============================================
   PERFORMANCE UTILITIES
   ============================================ */

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/* ============================================
   ENHANCED USER INTERACTIONS
   ============================================ */

// Add touch feedback for mobile devices
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Add touch class to body for CSS targeting
    document.body.classList.add('touch-device');
}

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft' && videoSwiper) {
        videoSwiper.slidePrev();
    } else if (e.key === 'ArrowRight' && videoSwiper) {
        videoSwiper.slideNext();
    }
});

// Enhanced resize handler
window.addEventListener('resize', debounce(() => {
    // Update carousel dimensions
    if (videoSwiper) videoSwiper.update();
    if (photoSwiper) photoSwiper.update();
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
}, 250));

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable autoplay for carousels
    if (videoSwiper) videoSwiper.autoplay.stop();
    if (photoSwiper) photoSwiper.autoplay.stop();
    
    // Reduce animation durations
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Focus management
let focusedElementBeforeModal;

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

/* ============================================
   ERROR HANDLING & GRACEFUL DEGRADATION
   ============================================ */

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Graceful degradation for carousel
    if (e.error && e.error.message.includes('Swiper')) {
        console.warn('Swiper failed to load, falling back to basic gallery');
        fallbackGallery();
    }
});

function fallbackGallery() {
    // Basic fallback for when Swiper fails
    const swipers = document.querySelectorAll('.swiper');
    swipers.forEach(swiper => {
        swiper.classList.add('swiper-fallback');
        const wrapper = swiper.querySelector('.swiper-wrapper');
        if (wrapper) {
            wrapper.style.display = 'flex';
            wrapper.style.overflowX = 'auto';
            wrapper.style.scrollSnapType = 'x mandatory';
        }
    });
}

/* ============================================
   INITIALIZATION COMPLETE
   ============================================ */

console.log('🎬 Dynamic Creative - JavaScript loaded successfully!');
console.log('📱 Features initialized: Navigation, Carousels, Animations, Smooth Scrolling');
console.log('🚀 Ready for an amazing user experience!');
