// Profile JavaScript for Vital Access

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Load patient data
    loadPatientData();
    
    // Tab functionality
    initTabs();
    
    // Edit profile functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // In a real application, this would open an edit form
            alert('Edit profile functionality would be implemented here.');
        });
    }
    
    // Profile avatar upload
    const profileAvatar = document.getElementById('profileAvatar');
    const avatarOverlay = document.querySelector('.avatar-overlay');
    
    if (profileAvatar && avatarOverlay) {
        avatarOverlay.addEventListener('click', function() {
            // In a real application, this would open a file upload dialog
            alert('Avatar upload functionality would be implemented here.');
        });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Mobile sidebar toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Load patient data from localStorage
function loadPatientData() {
    const patientData = JSON.parse(localStorage.getItem('patientData'));
    
    if (!patientData) return;
    
    // Update user name in header
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        el.textContent = patientData.name;
    });
    
    // Update profile information
    updateElement('profileName', patientData.name);
    updateElement('patientId', patientData.id);
    updateElement('dateOfBirth', patientData.dateOfBirth);
    updateElement('gender', patientData.gender);
    updateElement('email', patientData.email);
    updateElement('phone', patientData.phone);
    updateElement('address', patientData.address);
    updateElement('bloodType', patientData.bloodType);
    updateElement('height', patientData.height);
    updateElement('weight', patientData.weight);
    updateElement('bmi', patientData.bmi);
}

// Update element text content if element exists
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element && value) {
        element.textContent = value;
    }
}

// Initialize tabs functionality
function initTabs() {
    const tabLinks = document.querySelectorAll('.tabs-nav li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabLinks.length && tabPanes.length) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all tabs
                tabLinks.forEach(tab => tab.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current tab
                this.classList.add('active');
                
                // Show corresponding tab pane
                const tabId = this.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                
                if (tabPane) {
                    tabPane.classList.add('active');
                }
            });
        });
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('patientData');
    window.location.href = 'index.html';
}