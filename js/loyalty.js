// Loyalty Program Management
class LoyaltyProgram {
    constructor() {
        this.points = parseInt(localStorage.getItem('ck_loyalty_points')) || 0;
        this.tier = localStorage.getItem('ck_loyalty_tier') || 'Bronze';
        this.history = JSON.parse(localStorage.getItem('ck_loyalty_history')) || [];
    }

    addPoints(amount, orderTotal) {
        const points = Math.floor(orderTotal * 10); // £1 = 10 points
        this.points += points;
        this.history.push({
            date: new Date().toISOString(),
            points: points,
            orderTotal: orderTotal
        });
        this.updateTier();
        this.saveToStorage();
        return points;
    }

    usePoints(points) {
        if (points <= this.points) {
            this.points -= points;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    updateTier() {
        if (this.points >= 1000) {
            this.tier = 'Gold';
        } else if (this.points >= 500) {
            this.tier = 'Silver';
        } else {
            this.tier = 'Bronze';
        }
    }

    getAvailableRewards() {
        const rewards = [
            { points: 100, reward: 'Free Regular Fries', value: '£2.50' },
            { points: 200, reward: 'Free Drink', value: '£3.00' },
            { points: 300, reward: '2pc Chicken', value: '£4.00' },
            { points: 500, reward: '£10 Off Your Order', value: '£10.00' },
            { points: 1000, reward: 'Free Family Feast', value: '£25.00' }
        ];
        return rewards.filter(r => this.points >= r.points);
    }

    getTierBenefits() {
        const benefits = {
            Bronze: ['Earn 10 points per £1 spent', 'Birthday special offer'],
            Silver: ['15 points per £1 spent', 'Free delivery on orders over £15', 'Priority customer service'],
            Gold: ['20 points per £1 spent', 'Free delivery on all orders', 'Exclusive monthly offers', 'Double points weekends']
        };
        return benefits[this.tier];
    }

    saveToStorage() {
        localStorage.setItem('ck_loyalty_points', this.points);
        localStorage.setItem('ck_loyalty_tier', this.tier);
        localStorage.setItem('ck_loyalty_history', JSON.stringify(this.history));
    }

    getPointsToNextTier() {
        if (this.tier === 'Bronze') {
            return 500 - this.points;
        } else if (this.tier === 'Silver') {
            return 1000 - this.points;
        }
        return 0;
    }
}

// Student Discount Management
class StudentDiscount {
    constructor() {
        this.verified = localStorage.getItem('ck_student_verified') === 'true';
        this.email = localStorage.getItem('ck_student_email') || '';
    }

    async verifyStudent(email) {
        // In a real implementation, this would verify against a student email API
        if (email.endsWith('.ac.uk') || email.endsWith('.edu')) {
            this.verified = true;
            this.email = email;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    getDiscount() {
        return this.verified ? 0.15 : 0; // 15% student discount
    }

    saveToStorage() {
        localStorage.setItem('ck_student_verified', this.verified);
        localStorage.setItem('ck_student_email', this.email);
    }
}

// Initialize services
const loyaltyProgram = new LoyaltyProgram();
const studentDiscount = new StudentDiscount();
