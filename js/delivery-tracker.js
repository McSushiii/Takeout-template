import notificationService from './notifications.js';

class DeliveryTracker {
    constructor() {
        this.statusElements = {
            orderReceived: document.getElementById('orderReceived'),
            preparing: document.getElementById('preparing'),
            onRoute: document.getElementById('onRoute'),
            delivered: document.getElementById('delivered')
        };
        
        this.timeElements = {
            receivedTime: document.getElementById('receivedTime'),
            prepTime: document.getElementById('prepTime'),
            routeTime: document.getElementById('routeTime'),
            deliveryTime: document.getElementById('deliveryTime')
        };

        this.orderNumber = document.getElementById('orderNumber')?.textContent.replace('#', '') || '';
        this.init();
    }

    async init() {
        await notificationService.init();
        this.setupEventSource();
    }

    setupEventSource() {
        // In a real implementation, this would connect to your backend
        // For demo purposes, we'll simulate status updates
        this.simulateOrderProgress();
    }

    async updateStatus(status, time) {
        const statusMap = {
            'received': 'orderReceived',
            'preparing': 'preparing',
            'delivering': 'onRoute',
            'delivered': 'delivered'
        };

        const elementId = statusMap[status];
        if (elementId && this.statusElements[elementId]) {
            this.statusElements[elementId].classList.add('active');
            const timeElementId = elementId.replace(/([A-Z])/g, 'Time');
            if (this.timeElements[timeElementId]) {
                this.timeElements[timeElementId].textContent = time;
            }
        }

        // Send notification
        await notificationService.updateOrderStatus(this.orderNumber, status);
    }

    simulateOrderProgress() {
        const now = new Date();
        const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        // Order received (immediate)
        this.updateStatus('received', formatTime(now));

        // Preparing (after 3 minutes)
        setTimeout(() => {
            const prepTime = new Date(now.getTime() + 3 * 60000);
            this.updateStatus('preparing', formatTime(prepTime));
        }, 3000); // Simulated as 3 seconds for demo

        // On route (after 10 minutes)
        setTimeout(() => {
            const routeTime = new Date(now.getTime() + 10 * 60000);
            this.updateStatus('delivering', formatTime(routeTime));
        }, 6000); // Simulated as 6 seconds for demo

        // Delivered (after 25 minutes)
        setTimeout(() => {
            const deliveryTime = new Date(now.getTime() + 25 * 60000);
            this.updateStatus('delivered', formatTime(deliveryTime));
        }, 9000); // Simulated as 9 seconds for demo
    }
}

// Initialize tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DeliveryTracker();
});
