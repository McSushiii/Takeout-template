// Initialize common page elements
function initializePage() {
    // Get current page name
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Insert navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        import('./components.js')
            .then(module => {
                navbarContainer.innerHTML = module.createNavbar(currentPage || 'home');
                // Initialize contrast toggle after navbar is inserted
                import('./contrast.js');
            });
    }
}

document.addEventListener('DOMContentLoaded', initializePage);
