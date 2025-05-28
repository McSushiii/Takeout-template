// Specials Management
import { menuItems } from './menu-items.js';

function initializeSpecials() {
    const specialsGrid = document.getElementById('specialsGrid');
    if (!specialsGrid) return;

    // Create a pool of items suitable for specials
    const specialsPool = [];
    
    // Add items from various categories
    for (const [category, items] of Object.entries(menuItems)) {
        // Skip drinks and sides
        if (!['drinks', 'chips'].includes(category)) {
            for (const [id, item] of Object.entries(items)) {
                // Only include items with descriptions and without size variations
                if (item.description && !item.sizes) {
                    specialsPool.push({
                        id,
                        ...item,
                        category: category.charAt(0).toUpperCase() + category.slice(1)
                    });
                }
            }
        }
    }

    // Pick 2 random items for specials
    const specials = getRandomSpecials(specialsPool, 2);

    // Clear existing content
    specialsGrid.innerHTML = '';

    // Render specials
    specials.forEach(item => {
        const card = document.createElement('div');
        card.className = 'special-card';
        card.setAttribute('data-aos', 'fade-up');
        
        const categoryLink = item.category.toLowerCase();
        card.innerHTML = `
            <div class="food-img" style="background-image: url('images/${item.image}')"></div>
            <div class="food-info p-4 text-center">
                <h3 class="mb-2">${item.name}</h3>
                <p class="menu-description mb-3">${item.description}</p>
                <div class="price-tag mb-3">
                    <span class="new-price">£${item.price.toFixed(2)}</span>
                </div>
                <a href="order-menu.html#${categoryLink}" class="btn">Order Now</a>
            </div>
        `;
        specialsGrid.appendChild(card);
    });
}

function getRandomSpecials(arr, n) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

// Initialize when DOM is ready and AOS is available
document.addEventListener('DOMContentLoaded', () => {
    // Wait for AOS to be defined
    const initCheck = setInterval(() => {
        if (typeof AOS !== 'undefined') {
            clearInterval(initCheck);
            initializeSpecials();
        }
    }, 100);
});
