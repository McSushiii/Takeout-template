// Push Notifications Service
class NotificationService {
    constructor() {
        this.supported = 'Notification' in window;
    }

    async init() {
        if (this.supported) {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return false;
    }

    async sendNotification(title, options = {}) {
        if (this.supported) {
            const defaultOptions = {
                icon: '/images/chicken1.jpg',
                badge: '/images/chicken1.jpg',
                vibrate: [200, 100, 200],
                ...options
            };
            return new Notification(title, defaultOptions);
        }
    }

    async updateOrderStatus(orderId, status) {
        const messages = {
            'preparing': 'Your order is being prepared! 👨‍🍳',
            'cooking': 'Your delicious meal is cooking! 🔥',
            'ready': 'Your order is ready for delivery! 📦',
            'delivering': 'Your order is on the way! 🚗',
            'delivered': 'Enjoy your meal! 😋'
        };

        if (messages[status]) {
            await this.sendNotification(`Order #${orderId}`, {
                body: messages[status],
                tag: `order-${orderId}`
            });
        }
    }
}

// Initialize notification service
const notificationService = new NotificationService();
export default notificationService;
