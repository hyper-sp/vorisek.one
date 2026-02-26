document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.nav');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
            mobileNavToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (nav.classList.contains('nav-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('nav-open') &&
            !nav.contains(e.target) &&
            !mobileNavToggle.contains(e.target)) {
            nav.classList.remove('nav-open');
            mobileNavToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    const header = document.querySelector('.header');

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on load in case a user refreshed while scrolled down
        handleScroll();
    }

    // Subtle fade-in animation for post cards
    const postCards = document.querySelectorAll('.post-card');

    if (postCards.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation slightly for cards appearing together
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        postCards.forEach(card => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            // Start observing
            observer.observe(card);
        });
    }
});
