// Main JavaScript for Vital Access

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Clone nav links and auth buttons
                const navLinksClone = navLinks.cloneNode(true);
                const authButtonsClone = authButtons ? authButtons.cloneNode(true) : null;
                
                mobileMenu.appendChild(navLinksClone);
                if (authButtonsClone) mobileMenu.appendChild(authButtonsClone);
                
                document.body.appendChild(mobileMenu);
            }
            
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }

    // Show alert message
    function showAlert(message, type = 'info') {
        // Create alert element if it doesn't exist
        let alertElement = document.querySelector('.alert-message');
        
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.className = 'alert-message';
            document.body.appendChild(alertElement);
        }
        
        // Set alert content and type
        alertElement.textContent = message;
        alertElement.className = `alert-message ${type}`;
        
        // Show alert
        alertElement.classList.add('show');
        
        // Hide alert after 3 seconds
        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 3000);
    }

    // Add CSS for alerts
    const alertStyles = document.createElement('style');
    alertStyles.textContent = `
        .alert-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        }
        
        .alert-message.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .alert-message.success {
            background-color: #10b981;
        }
        
        .alert-message.error {
            background-color: #ef4444;
        }
        
        .alert-message.info {
            background-color: #3b82f6;
        }
        
        .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background-color: white;
            padding: 2rem;
            z-index: 99;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-menu.active {
            transform: translateX(0);
        }
        
        .mobile-menu .nav-links {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .mobile-menu .auth-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        body.no-scroll {
            overflow: hidden;
        }
    `;
    
    document.head.appendChild(alertStyles);

    // Check if user is logged in
    checkAuthStatus();
});

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userMenu = document.getElementById('userMenu');
    const authButtons = document.getElementById('authButtons');
    
    if (isLoggedIn && userMenu && authButtons) {
        userMenu.style.display = 'block';
        authButtons.style.display = 'none';
    }
}

// Logout functionality
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'logoutBtn') {
        e.preventDefault();
        logout();
    }
});

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('patientData');
    window.location.href = 'index.html';
}