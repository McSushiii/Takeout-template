// Newsletter Signup Functionality
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setupNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-signup form, .newsletter-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // In a real implementation, this would send the email to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
            
            // Store in localStorage for demo purposes
            const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            subscribers.push({
                email: email,
                date: new Date().toISOString()
            });
            localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', setupNewsletterForm);
