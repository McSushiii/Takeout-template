// Cart Management
let cart = [];

// Initialize services
const loyalty = new LoyaltyProgram();
const student = new StudentDiscount();

function initCart() {
    cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
    updateCart();
}

function updateCart() {
    const cart = getCart();
    let subtotal = 0;
    let cartHtml = '';

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        // ... existing cart HTML generation ...
    });

    // Apply student discount if verified
    const studentDiscount = student.verified ? subtotal * student.getDiscount() : 0;
    
    // Calculate loyalty points to be earned
    const pointsToEarn = Math.floor(subtotal * 10);

    // Update totals
    const total = subtotal - studentDiscount;
    
    document.getElementById('cartSubtotal').textContent = `£${subtotal.toFixed(2)}`;
    if (studentDiscount > 0) {
        document.getElementById('studentDiscountRow').style.display = 'flex';
        document.getElementById('studentDiscount').textContent = `-£${studentDiscount.toFixed(2)}`;
    }
    document.getElementById('cartTotal').textContent = `£${total.toFixed(2)}`;
    document.getElementById('pointsToEarn').textContent = `+${pointsToEarn} points`;

    // Update loyalty display
    updateLoyaltyDisplay();
}

function updateLoyaltyDisplay() {
    const tierProgress = (loyalty.points / (loyalty.tier === 'Bronze' ? 500 : 1000)) * 100;
    document.getElementById('loyaltyTier').textContent = loyalty.tier;
    document.getElementById('pointsBalance').textContent = loyalty.points;
    document.getElementById('tierProgress').style.width = `${Math.min(tierProgress, 100)}%`;
    
    const pointsToNext = loyalty.getPointsToNextTier();
    if (pointsToNext > 0) {
        document.getElementById('nextTierInfo').textContent = 
            `${pointsToNext} points to ${loyalty.tier === 'Bronze' ? 'Silver' : 'Gold'} tier`;
    } else if (loyalty.tier === 'Gold') {
        document.getElementById('nextTierInfo').textContent = 'Maximum tier reached!';
    }

    // Update available rewards
    const rewardsList = document.getElementById('rewardsList');
    rewardsList.innerHTML = '';
    loyalty.getAvailableRewards().forEach(reward => {
        rewardsList.innerHTML += `
            <li>
                <div class="reward-item">
                    <span>${reward.reward}</span>
                    <span class="reward-points">${reward.points}pts</span>
                </div>
            </li>
        `;
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
    const cart = getCart();
    let subtotal = 0;
    let cartHtml = '';

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        // ... existing cart HTML generation ...
    });

    // Apply student discount if verified
    const studentDiscount = student.verified ? subtotal * student.getDiscount() : 0;
    
    // Calculate loyalty points to be earned
    const pointsToEarn = Math.floor(subtotal * 10);

    // Update totals
    const total = subtotal - studentDiscount;
    
    document.getElementById('cartSubtotal').textContent = `£${subtotal.toFixed(2)}`;
    if (studentDiscount > 0) {
        document.getElementById('studentDiscountRow').style.display = 'flex';
        document.getElementById('studentDiscount').textContent = `-£${studentDiscount.toFixed(2)}`;
    }
    document.getElementById('cartTotal').textContent = `£${total.toFixed(2)}`;
    document.getElementById('pointsToEarn').textContent = `+${pointsToEarn} points`;

    // Update loyalty display
    updateLoyaltyDisplay();
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

// Handle student verification
document.getElementById('studentForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('studentEmail').value;
    const verified = await student.verifyStudent(email);
    
    if (verified) {
        document.getElementById('studentVerification').style.display = 'none';
        document.getElementById('verifiedStudent').style.display = 'block';
        updateCart();
    } else {
        alert('Please use a valid student email (.ac.uk or .edu)');
    }
});
