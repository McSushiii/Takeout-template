// Handle high contrast mode
const HIGH_CONTRAST_KEY = 'high-contrast-mode';

function initializeContrastToggle() {
    const contrastToggle = document.getElementById('contrastToggle');
    if (!contrastToggle) return;

    // Check saved preference
    const isHighContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === 'true';
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }

    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const currentState = document.body.classList.contains('high-contrast');
        localStorage.setItem(HIGH_CONTRAST_KEY, currentState);
    });
}

// Add high contrast styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .high-contrast {
        filter: contrast(1.2);
    }
    .high-contrast .navbar {
        background: #000 !important;
    }
    .high-contrast .text-white {
        color: #fff !important;
    }
    .high-contrast .menu-card {
        background: #fff !important;
        border: 1px solid #000;
    }
    .high-contrast .glass {
        background: #fff !important;
        border: 1px solid #000;
    }
    #contrastToggle {
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    #contrastToggle:hover {
        opacity: 1;
    }
`;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContrastToggle);
