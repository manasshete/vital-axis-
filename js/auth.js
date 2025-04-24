// Authentication JavaScript for Vital Access

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const patientId = document.getElementById('patientId').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.style.display = 'none');
            
            // Validate inputs
            let hasError = false;
            
            if (!patientId) {
                showError('patientId', 'Patient ID is required');
                hasError = true;
            }
            
            if (!password) {
                showError('password', 'Password is required');
                hasError = true;
            }
            
            if (hasError) return;
            
            // For demo purposes, check against hardcoded credentials
            // In a real application, this would be a server request
            if (patientId === 'aditya' && password === 'aditya123') {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                
                // Store patient data (for demo purposes)
                const patientData = {
                    id: 'aditya',
                    name: 'aditya',
                    dateOfBirth: 'jan 9, 2006',
                    gender: 'Male',
                    bloodType: 'A+',
                    height: '175 cm',
                    weight: '80 kg',
                    bmi: '22.9',
                    email: 'aditya@gmail.com',
                    phone: '8010179306',
                    address: 'kj college'
                };
                
                localStorage.setItem('patientData', JSON.stringify(patientData));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showError('password', 'Invalid Patient ID or Password');
            }
        });
    }
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    }
    
    // Show error message
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = input.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            // Add error class to input
            input.classList.add('input-error');
            
            // Remove error class after 3 seconds
            setTimeout(() => {
                input.classList.remove('input-error');
            }, 3000);
        }
    }
    
    // Add CSS for input errors
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .input-error {
            border-color: var(--error-color) !important;
        }
        
        .error-message {
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
    `;
    
    document.head.appendChild(errorStyles);
});