// Portfolio JavaScript for Rieun
// Minimal initialization script

(function() {
    'use strict';
    
    // DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Portfolio loaded');
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add active state to current nav (if navigation exists)
        var currentPath = window.location.pathname;
        document.querySelectorAll('nav a').forEach(function(link) {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
        
        // Lazy load images (if any)
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
        
        // Add fade-in animation to content
        var content = document.getElementById('content');
        if (content) {
            content.style.opacity = '0';
            content.style.transition = 'opacity 0.4s ease';
            setTimeout(function() {
                content.style.opacity = '1';
            }, 50);
        }
    });
    
    // Handle visibility change (pause animations when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('hidden');
        } else {
            document.body.classList.remove('hidden');
        }
    });
    
})();