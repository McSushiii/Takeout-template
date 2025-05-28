import { menuItems } from './menu-items.js';

class MenuEnhancer {
    constructor() {
        this.activeFilters = {
            category: 'all',
            dietary: 'all',
            spiceLevel: 'all',
            priceRange: 'all'
        };
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupImageLazyLoading();
        this.setupInteractions();
        this.bindEvents();
    }

    setupFilters() {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'menu-filters';
        filterContainer.innerHTML = `
            <div class="container">
                <div class="row g-3">
                    <div class="col-md-3">
                        <select class="form-select" id="categoryFilter">
                            <option value="all">All Categories</option>
                            <option value="burgers">Burgers</option>
                            <option value="chicken">Fried Chicken</option>
                            <option value="wings">Wings</option>
                            <option value="pizza">Pizza</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="dietaryFilter">
                            <option value="all">All Dietary</option>
                            <option value="halal">Halal</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="gluten-free">Gluten Free</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="spiceLevelFilter">
                            <option value="all">All Spice Levels</option>
                            <option value="mild">Mild</option>
                            <option value="medium">Medium</option>
                            <option value="hot">Hot</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select" id="priceRangeFilter">
                            <option value="all">All Prices</option>
                            <option value="under5">Under £5</option>
                            <option value="5to10">£5 - £10</option>
                            <option value="over10">Over £10</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="active-filters" id="activeFilters"></div>
                    </div>
                </div>
            </div>
        `;

        const menuSection = document.querySelector('.menu-section');
        if (menuSection) {
            menuSection.insertBefore(filterContainer, menuSection.firstChild);
        }
    }

    setupImageLazyLoading() {
        const menuImages = document.querySelectorAll('.menu-item-image');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const originalSrc = img.dataset.src;
                    if (originalSrc) {
                        img.src = originalSrc;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        menuImages.forEach(img => {
            if (img.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // Transparent placeholder
                imageObserver.observe(img);
            }
        });
    }

    setupInteractions() {
        document.querySelectorAll('.menu-card').forEach(card => {
            const itemId = card.dataset.itemId;
            if (!itemId) return;

            // Add hover effects for nutritional info and customization
            const nutritionBtn = card.querySelector('.nutritional-info');
            const customizeBtn = card.querySelector('.customize-btn');

            if (nutritionBtn) {
                nutritionBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showNutritionalInfo(itemId);
                });
            }

            if (customizeBtn) {
                customizeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showCustomization(itemId);
                });
            }

            // Add click animation
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }

    bindEvents() {
        const filters = ['category', 'dietary', 'spiceLevel', 'priceRange'];
        filters.forEach(filter => {
            const element = document.getElementById(`${filter}Filter`);
            if (element) {
                element.addEventListener('change', () => {
                    this.activeFilters[filter] = element.value;
                    this.updateFilters();
                });
            }
        });
    }

    updateFilters() {
        const activeFiltersDisplay = document.getElementById('activeFilters');
        if (!activeFiltersDisplay) return;

        // Update active filters display
        const activeFilterTags = Object.entries(this.activeFilters)
            .filter(([_, value]) => value !== 'all')
            .map(([key, value]) => `
                <span class="badge bg-primary me-2">
                    ${key}: ${value}
                    <button class="btn-close btn-close-white ms-2" 
                            data-filter="${key}"
                            style="font-size: 0.5rem;"
                            aria-label="Remove filter"></button>
                </span>
            `).join('');

        activeFiltersDisplay.innerHTML = activeFilterTags;

        // Add event listeners for removing filters
        activeFiltersDisplay.querySelectorAll('.btn-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                if (filter) {
                    this.activeFilters[filter] = 'all';
                    document.getElementById(`${filter}Filter`).value = 'all';
                    this.updateFilters();
                }
            });
        });

        // Apply filters to menu items
        this.filterMenuItems();
    }

    filterMenuItems() {
        const menuCards = document.querySelectorAll('.menu-card');
        menuCards.forEach(card => {
            const itemId = card.dataset.itemId;
            const item = this.getMenuItem(itemId);
            if (!item) return;

            const isVisible = this.checkFilters(item);
            card.style.display = isVisible ? '' : 'none';
            if (isVisible) {
                card.classList.add('fade-in');
            } else {
                card.classList.remove('fade-in');
            }
        });
    }

    checkFilters(item) {
        const { category, dietary, spiceLevel, priceRange } = this.activeFilters;
        
        const filters = {
            category: () => category === 'all' || item.category.toLowerCase() === category,
            dietary: () => dietary === 'all' || item.dietary?.includes(dietary),
            spiceLevel: () => spiceLevel === 'all' || item.spiciness === spiceLevel,
            priceRange: () => {
                if (priceRange === 'all') return true;
                const price = item.price;
                switch (priceRange) {
                    case 'under5': return price < 5;
                    case '5to10': return price >= 5 && price <= 10;
                    case 'over10': return price > 10;
                    default: return true;
                }
            }
        };

        return Object.values(filters).every(filter => filter());
    }

    getMenuItem(itemId) {
        for (const category in menuItems) {
            if (menuItems[category][itemId]) {
                return menuItems[category][itemId];
            }
        }
        return null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenuEnhancer();
});
