/**
 * STACKLY Global Animations & Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Page Transition Overlay
    const transitionOverlay = document.createElement("div");
    transitionOverlay.className = "page-transition-overlay";
    document.body.appendChild(transitionOverlay);

    // Fade out on load
    setTimeout(() => {
        transitionOverlay.classList.add("hidden");
    }, 100);

    // Intercept clicks for internal links to trigger transition
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            const target = link.getAttribute("href");
            if (target && !target.startsWith("http") && !target.startsWith("#") && target !== "404.html") {
                e.preventDefault();
                transitionOverlay.classList.remove("hidden");
                setTimeout(() => {
                    window.location.href = target;
                }, 400); // Wait for overlay animation
            }
        });
    });

    // 2. Animated Counters (Intersection Observer)
    const counters = document.querySelectorAll('.animate-counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.getAttribute('data-target'));
                const duration = 2000; // ms
                const start = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Easing out cubic
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    
                    let current = easeOut * finalValue;
                    
                    // Format based on whether it has decimals
                    if(target.getAttribute('data-target').includes('.')) {
                        target.innerText = current.toFixed(1);
                    } else {
                        target.innerText = Math.floor(current);
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.innerText = finalValue;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 3. Progress Bars Reveal
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const width = target.getAttribute('data-width');
                target.style.width = width;
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
});

