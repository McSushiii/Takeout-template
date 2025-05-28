// Common components for Crispy King website

// Create and insert the common header
function insertHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="announcement-bar bg-warning text-dark py-1">
            <div class="container text-center">
                <small>
                    <i class="fas fa-clock"></i> Open today: ${CONFIG.hours.monFri} 
                    | <i class="fas fa-phone"></i> ${CONFIG.phone}
                </small>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-orange navbar-shadow sticky-top py-3">
            <div class="container">
                <a class="navbar-brand logo text-white" href="index.html">
                    ${CONFIG.businessName}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="menu.html">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="order-menu.html">
                                Order <span class="badge bg-warning text-dark" id="cartCount">0</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link btn-nav mx-2" href="delivery-tracker.html">Delivery Tracker</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.body.insertBefore(header, document.body.firstChild);
}

// Create and insert the common footer
function insertFooter() {
    const footer = document.createElement('footer');
    footer.className = 'footer footer-gradient py-4 mt-5';
    footer.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="text-white">${CONFIG.businessName}</h5>
                    <p class="text-white-50 mb-2">
                        ${CONFIG.address}<br>
                        <i class="fas fa-phone me-2"></i>${CONFIG.phone}<br>
                        <i class="fas fa-envelope me-2"></i>${CONFIG.email}
                    </p>
                    <div class="social-links">
                        <a href="${CONFIG.social.facebook}" class="text-white me-3" target="_blank">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="${CONFIG.social.instagram}" class="text-white me-3" target="_blank">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="${CONFIG.social.twitter}" class="text-white" target="_blank">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 mb-4 mb-lg-0">
                    <h5 class="text-white">Opening Hours</h5>
                    <p class="text-white-50 mb-0">
                        Monday - Friday: ${CONFIG.hours.monFri}<br>
                        Saturday - Sunday: ${CONFIG.hours.satSun}
                    </p>
                </div>
                <div class="col-lg-4">
                    <h5 class="text-white">Newsletter</h5>
                    <form id="newsletterForm" class="mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email">
                            <button class="btn btn-warning" type="submit">Subscribe</button>
                        </div>
                    </form>
                    <p class="text-white-50 small">
                        Subscribe to receive special offers and updates!
                    </p>
                </div>
            </div>
            <hr class="border-white-50">
            <div class="row align-items-center">
                <div class="col-md-6 text-center text-md-start">
                    <p class="text-white-50 mb-0">
                        © ${new Date().getFullYear()} ${CONFIG.businessName}. All rights reserved.
                    </p>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <img src="images/payment-methods.png" alt="Payment methods accepted" 
                         class="payment-methods" style="height: 24px;">
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}

// Initialize components
document.addEventListener('DOMContentLoaded', function() {
    insertHeader();
    insertFooter();
    
    // Mark current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`a[href="${currentPage}"]`)?.classList.add('active');
});
