// Common components for all pages
export function createNavbar(activePage) {
    return `
    <nav class="navbar navbar-expand-lg navbar-orange navbar-shadow sticky-top py-3">
        <div class="container">
            <a class="navbar-brand logo text-white" href="index.html">CRISPY KING</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'home' ? 'active' : ''}" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'menu' ? 'active' : ''}" href="menu.html">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'order' ? 'active' : ''}" href="order-menu.html">Order</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'about' ? 'active' : ''}" href="about.html">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'contact' ? 'active' : ''}" href="contact.html">Contact</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn-nav mx-2 ${activePage === 'tracker' ? 'active' : ''}" href="delivery-tracker.html">Delivery Tracker</a>
                    </li>
                    <li class="nav-item ms-2">
                        <button id="contrastToggle" class="btn btn-link nav-link p-0" aria-label="Toggle high contrast">
                            <i class="fas fa-adjust"></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`;
}