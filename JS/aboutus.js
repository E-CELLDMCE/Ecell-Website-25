function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

   // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // --- Shared Observer Options ---
        const observerOptions = {
            threshold: 0.1, // When 10% of the item is visible
            rootMargin: '0px 0px -50px 0px'
        };

        // --- Timeline Animation (Fade In & Out) ---
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the class to fade it IN
                    entry.target.classList.add('is-visible');
                } else {
                    // Remove the class to fade it OUT
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            timelineObserver.observe(item);
        });

        // --- "Our Reach" Card Staggered Animation ---
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    cardObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        // Observe all reach cards
        document.querySelectorAll('.reach-card').forEach(card => {
            cardObserver.observe(card);
        });
        
        // --- Counter animation for reach section ---
        function animateValue(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                
                // Format the number
                if (value >= 1000) {
                    element.textContent = (value / 1000).toFixed(1) + 'K+';
                } else {
                    element.textContent = value + '+';
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // Ensure final value is exact
                    if (end >= 1000) {
                        element.textContent = (end / 1000).toFixed(1) + 'K+';
                    } else {
                        element.textContent = end + '+';
                    }
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger counter animation when reach section is visible
        const reachObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.reach-value');
                    counters.forEach((counter, index) => {
                        const targetValues = [1400, 1100, 1000,1000];
                        // Reset text content to 0+ to ensure animation starts from 0
                        counter.textContent = '0+'; 
                        animateValue(counter, 0, targetValues[index], 2000);
                    });
                    reachObserver.unobserve(entry.target); // Stop observing
                }
            });
        }, observerOptions);

        const reachSection = document.querySelector('.reach-section');
        if (reachSection) {
            reachObserver.observe(reachSection);
        }
        
        console.log('E-Cell DMCE Page Loaded Successfully');

        // ADDED: Simple Toggle Menu Script just in case it's missing in your JS file
        function toggleMenu() {
            const nav = document.getElementById('mobileNav');
            nav.classList.toggle('active');
        }