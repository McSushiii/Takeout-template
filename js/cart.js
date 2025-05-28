// Cart Management
let cart = [];

function initCart() {
    cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
    updateCart();
}

function updateCart() {
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const cartTotalEl = document.getElementById('cartTotal');
    if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
    
    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = itemCount || '';
        cartCountEl.style.display = itemCount ? 'inline' : 'none';
    }

    updateQuantityDisplays();
}

function saveCart() {
    localStorage.setItem('ck_cart', JSON.stringify(cart));
    updateCart();
}

window.addToCart = function(id, name, price, size = null) {
    cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
    const itemKey = size ? `${id}_${size}` : id;
    const itemName = size ? `${name} (${size})` : name;
    price = parseFloat(price); // Ensure price is a number
    
    const existingItem = cart.find(item => item.key === itemKey);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            key: itemKey,
            id: id,
            name: itemName,
            price: price,
            size: size,
            qty: 1
        });
    }
    
    saveCart();
    if (window.updateMenu) {
        window.updateMenu(); // Use updateMenu instead of full renderTabs
    }
};

window.removeFromCart = function(id, size = null) {
    cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
    const itemKey = size ? `${id}_${size}` : id;
    const itemIndex = cart.findIndex(item => item.key === itemKey);
    
    if (itemIndex > -1) {
        if (cart[itemIndex].qty > 1) {
            cart[itemIndex].qty--;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        saveCart();
        if (window.renderTabs) {
            renderTabs();
        }
    }
};

function getItemQuantity(id, size = null) {
    const itemKey = size ? `${id}_${size}` : id;
    const item = cart.find(item => item.key === itemKey);
    return item ? item.qty : 0;
}

function renderQuantityControls() {
    document.querySelectorAll('.menu-card').forEach(card => {
        const name = card.querySelector('h5').textContent;
        const priceEl = card.querySelector('.price');
        const price = parseFloat(priceEl.textContent.replace('£', ''));
        
        // Create quantity controls if they don't exist
        if (!card.querySelector('.quantity-controls')) {
            const controls = document.createElement('div');
            controls.className = 'quantity-controls';
            controls.innerHTML = `
                <button class="quantity-btn minus" aria-label="Decrease quantity">-</button>
                <span class="quantity-display">0</span>
                <button class="quantity-btn plus" aria-label="Increase quantity">+</button>
            `;
            card.appendChild(controls);

            const quantityDisplay = controls.querySelector('.quantity-display');
            const plusBtn = controls.querySelector('.plus');
            const minusBtn = controls.querySelector('.minus');

            // Update initial quantity
            const itemKey = name;
            const currentQty = cart.find(item => item.key === itemKey)?.qty || 0;
            quantityDisplay.textContent = currentQty;

            // Handle plus button click
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                window.addToCart(name, name, price);
                const newQty = cart.find(item => item.key === itemKey)?.qty || 0;
                quantityDisplay.textContent = newQty;
            });

            // Handle minus button click
            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                window.removeFromCart(name);
                const newQty = cart.find(item => item.key === itemKey)?.qty || 0;
                quantityDisplay.textContent = newQty;
            });
        }
    });
}

// Update quantity displays when cart changes
function updateQuantityDisplays() {
    document.querySelectorAll('.menu-card').forEach(card => {
        const name = card.querySelector('h5').textContent;
        const display = card.querySelector('.quantity-display');
        if (display) {
            const itemKey = name;
            const currentQty = cart.find(item => item.key === itemKey)?.qty || 0;
            display.textContent = currentQty;
        }
    });
}

// Extend existing updateCart function
function updateCart() {
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const cartTotalEl = document.getElementById('cartTotal');
    if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
    
    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = itemCount || '';
        cartCountEl.style.display = itemCount ? 'inline' : 'none';
    }

    updateQuantityDisplays();
}

// Export functions for use in other files
window.cart = {
    init: initCart,
    update: updateCart,
    save: saveCart,
    add: addToCart,
    remove: removeFromCart,
    getQuantity: getItemQuantity
};

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    
    // Add click handlers to all menu cards
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', function() {
            const name = card.querySelector('h5').textContent;
            const priceEl = card.querySelector('.price');
            let price;
            
            // Handle items with multiple size options (like pizzas)
            if (card.querySelector('ul')) {
                const sizes = card.querySelectorAll('li');
                const sizeOptions = Array.from(sizes).map(size => ({
                    size: size.textContent.split(' ')[0],
                    price: parseFloat(size.querySelector('.price').textContent.replace('£', ''))
                }));
                
                // Show size selection modal
                const sizeModal = document.createElement('div');
                sizeModal.className = 'modal fade show';
                sizeModal.style.display = 'block';
                sizeModal.style.backgroundColor = 'rgba(0,0,0,0.5)';
                sizeModal.innerHTML = `
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Select Size</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                ${sizeOptions.map(opt => 
                                    `<button class="btn btn-outline-primary w-100 mb-2" 
                                     data-size="${opt.size}" 
                                     data-price="${opt.price}">
                                        ${opt.size} - £${opt.price.toFixed(2)}
                                    </button>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(sizeModal);
                
                // Handle size selection
                sizeModal.querySelectorAll('.btn-outline-primary').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const size = this.dataset.size;
                        const price = parseFloat(this.dataset.price);
                        window.addToCart(name, name, price, size);
                        sizeModal.style.display = 'none';
                        sizeModal.remove();
                    });
                });
                
                // Handle modal close
                sizeModal.querySelector('.btn-close').addEventListener('click', () => {
                    sizeModal.style.display = 'none';
                    sizeModal.remove();
                });
                
                return;
            }
            
            // Regular items (no size options)
            price = parseFloat(priceEl.textContent.replace('£', ''));
            
            // Show loading spinner on the card
            const spinnerOverlay = document.createElement('div');
            spinnerOverlay.className = 'loading-overlay';
            spinnerOverlay.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
            card.appendChild(spinnerOverlay);
            
            // Add to cart with slight delay to show loading state
            setTimeout(() => {
                window.addToCart(name, name, price);
                spinnerOverlay.remove();
                
                // Show feedback animation
                const feedback = document.createElement('div');
                feedback.className = 'add-to-cart-feedback';
            feedback.textContent = '✓ Added to cart';
            feedback.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                animation: fadeInOut 2s forwards;
            `;
            document.body.appendChild(feedback);
            setTimeout(() => feedback.remove(), 2000);
        });
    });
    
    // Handle checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Please add items to your cart first.');
                return;
            }
            localStorage.setItem('ck_order_in_progress', 'true');
            window.location.href = 'checkout.html';
        });
    }

    renderQuantityControls();
});

// Keyframe animation for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

// Function declarations for cart management

// Initialize cart count on any page
document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
        const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = itemCount || '';
        cartCount.style.display = itemCount ? 'inline' : 'none';
    }
});
