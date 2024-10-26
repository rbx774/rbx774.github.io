// Cookie consent handling
document.addEventListener('DOMContentLoaded', function() {
    var cookieNotice = document.getElementById('cookie-notice');
    var acceptButton = document.getElementById('accept-cookies');
    var cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent && cookieNotice && acceptButton) {
        cookieNotice.classList.add('visible');
        
        acceptButton.onclick = function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieNotice.classList.remove('visible');
            cookieNotice.style.display = 'none';
        };
    }
});
