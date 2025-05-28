import { menuItems } from './menu-items.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();
});

function initializeMenu() {
    // Handle tab switching
    const menuTabs = document.querySelectorAll('[data-bs-toggle="pill"]');
    menuTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
            const targetId = e.target.getAttribute('data-bs-target').replace('#', '');
            renderMenuSection(targetId);
        });
    });

    // Initially render the active section
    const activeTab = document.querySelector('.nav-link.active');
    if (activeTab) {
        const targetId = activeTab.getAttribute('data-bs-target').replace('#', '');
        renderMenuSection(targetId);
    }
}

function renderMenuSection(sectionId) {
    const container = document.getElementById(sectionId);
    if (!container) return;

    let items;
    switch(sectionId) {
        case 'burgers':
            items = menuItems.burgers;
            break;
        case 'chicken':
            items = menuItems.chicken;
            break;
        case 'chips':
            items = menuItems.chips;
            break;
        case 'bbq':
            items = menuItems.bbq;
            break;
        case 'pizza':
            items = menuItems.pizza;
            break;
        case 'drinks':
            items = {...menuItems.drinks.bottled, ...menuItems.drinks.cans};
            break;
        default:
            return;
    }

    const rowDiv = container.querySelector('.row') || container;
    rowDiv.innerHTML = '';

    for (const [id, item] of Object.entries(items)) {
        const card = createMenuCard(id, item);
        rowDiv.appendChild(card);
    }
}

function createMenuCard(id, item) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';

    const dietaryBadges = item.dietary ? 
        item.dietary.map(diet => `<span class="badge bg-${getDietaryBadgeClass(diet)}">${diet}</span>`).join('') : '';

    let priceDisplay;
    if (item.sizes) {
        priceDisplay = item.sizes.map(size => 
            `<div>${size.size} <span class="price">£${size.price.toFixed(2)}</span></div>`
        ).join('');
    } else {
        priceDisplay = `<span class="price">£${item.price.toFixed(2)}</span>`;
    }

    col.innerHTML = `
        <div class="menu-card glass" data-aos="fade-up" data-item-id="${id}">
            <img src="images/${item.image}" 
                 alt="${item.name}" 
                 class="img-fluid rounded-top menu-item-image"
                 loading="lazy">
            <div class="p-3">
                <h5>${item.name}</h5>
                ${item.description ? `<p class="menu-description">${item.description}</p>` : ''}
                ${dietaryBadges ? `<div class="dietary-info mb-2">${dietaryBadges}</div>` : ''}
                <div class="price-section">
                    ${priceDisplay}
                </div>
            </div>
        </div>
    `;

    return col;
}

function getDietaryBadgeClass(dietary) {
    switch(dietary.toLowerCase()) {
        case 'vegetarian':
        case 'vegan':
        case 'vegan option':
            return 'success';
        case 'halal':
            return 'info';
        default:
            return 'secondary';
    }
}

// Initialize image lazy loading
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}
