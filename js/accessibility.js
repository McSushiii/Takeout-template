// Accessibility Enhancements

// Add skip to main content functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link if not present
    if (!document.querySelector('.skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-to-main';
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Add main landmark if not present
    if (!document.querySelector('main')) {
        const main = document.createElement('main');
        main.id = 'main';
        const content = document.querySelector('.hero').parentNode;
        content.parentNode.insertBefore(main, content);
        main.appendChild(content);
    }

    // Add proper ARIA labels to interactive elements
    document.querySelectorAll('button').forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', button.title || 'Button');
        }
    });

    // Enhance image accessibility
    document.querySelectorAll('img').forEach(img => {
        if (!img.alt) {
            img.alt = img.src.split('/').pop().split('.')[0]
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
        }
    });

    // Add keyboard navigation for menu items
    const menuItems = document.querySelectorAll('.menu-card');
    menuItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                item.querySelector('button')?.click();
            }
        });
    });
});

// Announce dynamic content changes
function announceToScreenReader(message) {
    const announce = document.getElementById('sr-announce') || (() => {
        const el = document.createElement('div');
        el.id = 'sr-announce';
        el.className = 'sr-only';
        el.setAttribute('aria-live', 'polite');
        document.body.appendChild(el);
        return el;
    })();
    announce.textContent = message;
}

// Add focus trap for modals
function trapFocus(element) {
    const focusableEls = element.querySelectorAll(
        'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// High contrast mode toggle
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

// Initialize high contrast if previously set
if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Add high contrast toggle button
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.navbar-nav');
    if (nav) {
        const li = document.createElement('li');
        li.className = 'nav-item';
        const button = document.createElement('button');
        button.className = 'nav-link btn-nav mx-2';
        button.onclick = toggleHighContrast;
        button.innerHTML = '<i class="fas fa-adjust"></i><span class="ms-2">Contrast</span>';
        li.appendChild(button);
        nav.appendChild(li);
    }
});
