// Theme handling
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.toggle('dark-theme');
} else if (currentTheme === 'light') {
    document.body.classList.toggle('light-theme');
}

// PWA installation prompt
let deferredPrompt;
const installButton = document.createElement('button');
installButton.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, discard it
        deferredPrompt = null;
        // Hide the install button
        installButton.style.display = 'none';
    }
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Handle offline/online status
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
    // Optionally show a notification that we're back online
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Back Online', {
            body: 'Your connection has been restored.',
            icon: '/images/icon-192x192.png'
        });
    }
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
    // Optionally show a notification that we're offline
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Offline Mode', {
            body: 'You are currently offline. Some features may be limited.',
            icon: '/images/icon-192x192.png'
        });
    }
});
