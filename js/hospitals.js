// Hospitals JavaScript for Vital Access

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and update UI accordingly
    checkAuthStatus();
    
    // Load hospital data
    loadHospitals();
    
    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const hospitalSearch = document.getElementById('hospitalSearch');
    
    if (searchBtn && hospitalSearch) {
        searchBtn.addEventListener('click', function() {
            filterHospitals();
        });
        
        hospitalSearch.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterHospitals();
            }
        });
    }
    
    // Filter functionality
    const specialtyFilter = document.getElementById('specialtyFilter');
    const locationFilter = document.getElementById('locationFilter');
    const emergencyFilter = document.getElementById('emergencyFilter');
    
    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', filterHospitals);
    }
    
    if (locationFilter) {
        locationFilter.addEventListener('change', filterHospitals);
    }
    
    if (emergencyFilter) {
        emergencyFilter.addEventListener('change', filterHospitals);
    }
    
    // Reset filters
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            if (hospitalSearch) hospitalSearch.value = '';
            if (specialtyFilter) specialtyFilter.value = '';
            if (locationFilter) locationFilter.value = '';
            if (emergencyFilter) emergencyFilter.value = '';
            
            filterHospitals();
        });
    }
    
    // Modal functionality
    const hospitalModal = document.getElementById('hospitalModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (closeModal && hospitalModal) {
        closeModal.addEventListener('click', function() {
            hospitalModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === hospitalModal) {
                hospitalModal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
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
});

// Check authentication status
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userMenu = document.getElementById('userMenu');
    const authButtons = document.getElementById('authButtons');
    
    if (isLoggedIn && userMenu && authButtons) {
        userMenu.style.display = 'block';
        authButtons.style.display = 'none';
        
        // Update user name
        const patientData = JSON.parse(localStorage.getItem('patientData'));
        if (patientData) {
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = patientData.name;
            }
        }
    }
}

// Sample hospital data
const hospitals = [
    {
        id: 1,
        name: 'City General Hospital',
        image: 'images/hospital1.jpg',
        status: 'open',
        address: '123 Main St, Downtown, CA 90001',
        phone: '(555) 123-4567',
        website: 'www.citygeneralhospital.com',
        emergency: true,
        location: 'downtown',
        distance: '2.3 miles',
        specialties: ['cardiology', 'neurology', 'orthopedics', 'emergency'],
        departments: [
            'Emergency Department',
            'Cardiology',
            'Neurology',
            'Orthopedics',
            'Pediatrics',
            'Oncology',
            'Radiology',
            'Surgery'
        ],
        description: 'City General Hospital is a leading healthcare provider offering comprehensive medical services with state-of-the-art facilities and experienced medical professionals.'
    },
    {
        id: 2,
        name: 'Westside Medical Center',
        image: 'images/hospital2.jpg',
        status: 'open',
        address: '456 Oak St, West District, CA 90002',
        phone: '(555) 987-6543',
        website: 'www.westsidemedical.com',
        emergency: true,
        location: 'west',
        distance: '4.1 miles',
        specialties: ['pediatrics', 'oncology', 'emergency'],
        departments: [
            'Emergency Department',
            'Pediatrics',
            'Oncology',
            'Radiology',
            'Surgery',
            'Internal Medicine'
        ],
        description: 'Westside Medical Center specializes in pediatric care and oncology treatments, providing compassionate healthcare services to patients of all ages.'
    },
    {
        id: 3,
        name: 'Northside Health Institute',
        image: 'images/hospital3.jpg',
        status: 'open',
        address: '789 Pine St, North District, CA 90003',
        phone: '(555) 456-7890',
        website: 'www.northsidehealth.com',
        emergency: false,
        location: 'north',
        distance: '5.7 miles',
        specialties: ['orthopedics', 'neurology'],
        departments: [
            'Orthopedics',
            'Neurology',
            'Physical Therapy',
            'Radiology',
            'Surgery'
        ],
        description: 'Northside Health Institute is renowned for its excellence in orthopedics and neurology, offering specialized treatments and rehabilitation services.'
    },
    {
        id: 4,
        name: 'Eastside Community Hospital',
        image: 'images/hospital4.jpg',
        status: 'open',
        address: '321 Elm St, East District, CA 90004',
        phone: '(555) 789-0123',
        website: 'www.eastsidehospital.com',
        emergency: true,
        location: 'east',
        distance: '3.5 miles',
        specialties: ['cardiology', 'emergency', 'pediatrics'],
        departments: [
            'Emergency Department',
            'Cardiology',
            'Pediatrics',
            'Internal Medicine',
            'Surgery',
            'Obstetrics & Gynecology'
        ],
        description: 'Eastside Community Hospital is dedicated to providing accessible healthcare services to the local community with a focus on cardiac care and pediatrics.'
    },
    {
        id: 5,
        name: 'Southside Specialty Clinic',
        image: 'images/hospital5.jpg',
        status: 'open',
        address: '654 Maple St, South District, CA 90005',
        phone: '(555) 234-5678',
        website: 'www.southsideclinic.com',
        emergency: false,
        location: 'south',
        distance: '6.2 miles',
        specialties: ['oncology', 'cardiology'],
        departments: [
            'Oncology',
            'Cardiology',
            'Radiology',
            'Chemotherapy',
            'Radiation Therapy'
        ],
        description: 'Southside Specialty Clinic offers specialized oncology and cardiology services with cutting-edge treatment options and personalized care plans.'
    },
    {
        id: 6,
        name: 'Central Medical Plaza',
        image: 'images/hospital6.jpg',
        status: 'open',
        address: '987 Cedar St, Downtown, CA 90001',
        phone: '(555) 345-6789',
        website: 'www.centralmedicalplaza.com',
        emergency: true,
        location: 'downtown',
        distance: '1.8 miles',
        specialties: ['emergency', 'neurology', 'orthopedics'],
        departments: [
            'Emergency Department',
            'Neurology',
            'Orthopedics',
            'Radiology',
            'Surgery',
            'Internal Medicine'
        ],
        description: 'Central Medical Plaza provides comprehensive emergency care and specialized neurological and orthopedic services in a convenient downtown location.'
    }
];

// Load hospitals data
function loadHospitals() {
    const hospitalsContainer = document.getElementById('hospitalsContainer');
    
    if (!hospitalsContainer) return;
    
    // Clear container
    hospitalsContainer.innerHTML = '';
    
    // Check if there are hospitals to display
    if (hospitals.length === 0) {
        hospitalsContainer.innerHTML = '<div class="no-results">No hospitals found matching your criteria.</div>';
        return;
    }
    
    // Create hospital cards
    hospitals.forEach(hospital => {
        const hospitalCard = createHospitalCard(hospital);
        hospitalsContainer.appendChild(hospitalCard);
    });
}

// Create hospital card
function createHospitalCard(hospital) {
    const card = document.createElement('div');
    card.className = 'hospital-card';
    card.setAttribute('data-id', hospital.id);
    
    // Create hospital image
    const imageUrl = hospital.image || 'images/hospital-placeholder.jpg';
    
    card.innerHTML = `
        <div class="hospital-image">
            <img src="${imageUrl}" alt="${hospital.name}">
        </div>
        <div class="hospital-content">
            <div class="hospital-title">
                <h3>${hospital.name}</h3>
                <span class="hospital-status ${hospital.status}">${hospital.status === 'open' ? 'Open 24/7' : 'Closed'}</span>
            </div>
            <div class="hospital-details">
                <p><i class="fas fa-map-marker-alt"></i> ${hospital.address}</p>
                <p><i class="fas fa-phone"></i> ${hospital.phone}</p>
                <p><i class="fas fa-globe"></i> ${hospital.website}</p>
            </div>
            <div class="hospital-specialties">
                ${hospital.specialties.map(specialty => `
                    <span class="specialty-tag">${capitalizeFirstLetter(specialty)}</span>
                `).join('')}
            </div>
            <div class="hospital-actions">
                <button class="btn btn-sm btn-outline view-details-btn" data-id="${hospital.id}">View Details</button>
                <button class="btn btn-sm btn-primary">Get Directions</button>
            </div>
        </div>
    `;
    
    // Add event listener to view details button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', function() {
            const hospitalId = this.getAttribute('data-id');
            openHospitalModal(hospitalId);
        });
    }
    
    return card;
}

// Open hospital modal
function openHospitalModal(hospitalId) {
    const hospital = hospitals.find(h => h.id === parseInt(hospitalId));
    
    if (!hospital) return;
    
    const modalBody = document.getElementById('modalBody');
    const hospitalModal = document.getElementById('hospitalModal');
    
    if (!modalBody || !hospitalModal) return;
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="hospital-header">
            <div>
                <h2>${hospital.name}</h2>
                <p>${hospital.description}</p>
            </div>
            <span class="hospital-status ${hospital.status}">${hospital.status === 'open' ? 'Open 24/7' : 'Closed'}</span>
        </div>
        
        <div class="hospital-info-grid">
            <div class="hospital-info-section">
                <h3>Contact Information</h3>
                <div class="hospital-info-list">
                    <div class="hospital-info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div class="hospital-info-content">
                            <h4>Address</h4>
                            <p>${hospital.address}</p>
                        </div>
                    </div>
                    <div class="hospital-info-item">
                        <i class="fas fa-phone"></i>
                        <div class="hospital-info-content">
                            <h4>Phone</h4>
                            <p>${hospital.phone}</p>
                        </div>
                    </div>
                    <div class="hospital-info-item">
                        <i class="fas fa-globe"></i>
                        <div class="hospital-info-content">
                            <h4>Website</h4>
                            <p>${hospital.website}</p>
                        </div>
                    </div>
                    <div class="hospital-info-item">
                        <i class="fas fa-ambulance"></i>
                        <div class="hospital-info-content">
                            <h4>Emergency Services</h4>
                            <p>${hospital.emergency ? 'Available 24/7' : 'Not Available'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="hospital-info-section">
                <h3>Departments</h3>
                <div class="hospital-info-list">
                    ${hospital.departments.map(department => `
                        <div class="hospital-info-item">
                            <i class="fas fa-stethoscope"></i>
                            <div class="hospital-info-content">
                                <p>${department}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="hospital-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.24368384857908!3d34.05513748060504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c64e00d2a005%3A0x8f1101b252e750e5!2sLos%20Angeles%20City%20Hall!5e0!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus" allowfullscreen="" loading="lazy"></iframe>
        </div>
        
        <div class="hospital-actions">
            <button class="btn btn-primary">Schedule Appointment</button>
            <button class="btn btn-outline">Get Directions</button>
        </div>
    `;
    
    // Show modal
    hospitalModal.style.display = 'block';
    document.body.classList.add('no-scroll');
}

// Filter hospitals
function filterHospitals() {
    const searchTerm = document.getElementById('hospitalSearch')?.value.toLowerCase() || '';
    const specialty = document.getElementById('specialtyFilter')?.value || '';
    const location = document.getElementById('locationFilter')?.value || '';
    const emergency = document.getElementById('emergencyFilter')?.value || '';
    
    const hospitalsContainer = document.getElementById('hospitalsContainer');
    
    if (!hospitalsContainer) return;
    
    // Clear container
    hospitalsContainer.innerHTML = '';
    
    // Filter hospitals
    const filteredHospitals = hospitals.filter(hospital => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            hospital.name.toLowerCase().includes(searchTerm) || 
            hospital.address.toLowerCase().includes(searchTerm) ||
            hospital.specialties.some(s => s.toLowerCase().includes(searchTerm));
        
        // Specialty filter
        const matchesSpecialty = specialty === '' || hospital.specialties.includes(specialty);
        
        // Location filter
        const matchesLocation = location === '' || hospital.location === location;
        
        // Emergency filter
        const matchesEmergency = emergency === '' || 
            (emergency === 'yes' && hospital.emergency) || 
            (emergency === 'no' && !hospital.emergency);
        
        return matchesSearch && matchesSpecialty && matchesLocation && matchesEmergency;
    });
    
    // Check if there are hospitals to display
    if (filteredHospitals.length === 0) {
        hospitalsContainer.innerHTML = '<div class="no-results">No hospitals found matching your criteria.</div>';
        return;
    }
    
    // Create hospital cards
    filteredHospitals.forEach(hospital => {
        const hospitalCard = createHospitalCard(hospital);
        hospitalsContainer.appendChild(hospitalCard);
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('patientData');
    window.location.href = 'index.html';
}