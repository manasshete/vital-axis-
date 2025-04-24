// Dashboard JavaScript for Vital Access

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    // Load patient data
    loadPatientData();
    
    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
    
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
    
    // Update welcome message
    const patientNameElement = document.getElementById('patientName');
    if (patientNameElement) {
        patientNameElement.textContent = patientData.name.split(' ')[0];
    }
    
    // Update health summary
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

// Update date and time
function updateDateTime() {
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');
    
    if (currentDateElement || currentTimeElement) {
        const now = new Date();
        
        // Format date: Monday, June 12, 2023
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        
        // Format time: 10:30 AM
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
        
        if (currentDateElement) currentDateElement.textContent = formattedDate;
        if (currentTimeElement) currentTimeElement.textContent = formattedTime;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('patientData');
    window.location.href = 'index.html';
}