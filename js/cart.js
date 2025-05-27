// Cart Management
let cart = [];

function initCart() {
    cart = JSON.parse(localStorage.getItem('ck_cart') || '[]');
    updateCart();
}

function updateCart() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
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
});
