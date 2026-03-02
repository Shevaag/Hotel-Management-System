// ========================================
// GLOBAL UTILITIES (Shared across all pages)
// ========================================

// Password visibility toggle
function togglePasswordVisibility(inputId, toggleBtnId) {
    const passwordInput = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);

    if (passwordInput && toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;

            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        });
    }
}

// Global notification function (SINGLE VERSION)
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    // Create container if it doesn't exist
    if (!notificationContainer) {
        const container = document.createElement('div');
        container.id = 'notification';
        document.body.appendChild(container);
    }

    const container = document.getElementById('notification');

    // Limit to 3 notifications at a time
    const notifications = container.querySelectorAll('.notification');
    if (notifications.length >= 3) {
        notifications[0].remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-times-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Format date helper
function formatDate(dateString) {
    if (!dateString) return '-';
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Format date for input fields
function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Calculate nights between dates
function calculateNights(checkinDate, checkoutDate) {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffTime = checkout - checkin;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Get room price by type
function getRoomPrice(roomType) {
    const prices = {
        'standard': 3000,
        'deluxe': 5000,
        'suite': 8000,
        'family': 10000,
        'presidential': 15000
    };
    return prices[roomType] || 0;
}

// Go back function (handles different dashboards)
function goBack() {
    // Check which page we're on
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    if (filename.includes('manager')) {
        window.location.href = 'manager-dashboard.html';
    } else if (filename.includes('receptionist')) {
        window.location.href = 'receptionist-dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Add slideOut animation if not exists
if (!document.querySelector('#notification-animation')) {
    const style = document.createElement('style');
    style.id = 'notification-animation';
    style.textContent = `
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// PAGE INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    // Import Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // Initialize based on page
    if (filename === 'index.html' || filename === '') {
        initRoleSelection();
    } else if (filename === 'receptionist-login.html') {
        initReceptionistLogin();
    } else if (filename === 'manager-login.html') {
        initManagerLogin();
    } else if (filename === 'receptionist-dashboard.html') {
        initReceptionistDashboard();
    } else if (filename === 'manager-dashboard.html') {
        initManagerDashboard();
    } else if (filename === 'add-new-reservation.html') {
        initAddReservation();
    } else if (filename === 'view-booking-details.html') {
        initViewBookings();
    } else if (filename === 'calculate-printbill.html') {
        initCalculateBill();
    } else if (filename === 'manage-rooms.html') {
        initManageRooms();
    } else if (filename === 'view-report.html') {
        initViewReports();
    } else if (filename === 'modify-reservation.html') {
        initModifyReservations();
    }

    // Add animation classes
    const mainContent = document.querySelector('.container');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
});

// ========================================
// PAGE: INDEX.HTML (Role Selection)
// ========================================

function initRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');

    roleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the correct target
            const href = this.getAttribute('href');

            // Show notification
            showNotification('Redirecting...', 'info');

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// ========================================
// PAGE: RECEPTIONIST-LOGIN.HTML
// ========================================

function initReceptionistLogin() {
    // Password visibility
    togglePasswordVisibility('password', 'togglePassword');

    // Form submission
    const form = document.getElementById('receptionistLoginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Validation
            if (!username) {
                showNotification('Please enter username', 'error');
                return;
            }

            if (!password) {
                showNotification('Please enter password', 'error');
                return;
            }

            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Demo validation
            setTimeout(() => {
                // Demo credentials
                const demoUsername = 'receptionist';
                const demoPassword = 'receptionist';

                if (username === demoUsername && password === demoPassword) {
                    showNotification('Login successful! Redirecting...', 'success');

                    // Store login info
                    localStorage.setItem('userRole', 'receptionist');
                    localStorage.setItem('userName', username);

                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'receptionist-dashboard.html';
                    }, 1500);
                } else {
                    showNotification('Invalid username or password', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    }
}

// ========================================
// PAGE: MANAGER-LOGIN.HTML
// ========================================

function initManagerLogin() {
    // Password toggle
    togglePasswordVisibility('password', 'togglePassword');

    // Form submission
    const form = document.getElementById('managerLoginForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            // Validation
            if (!username) {
                showNotification('Please enter username', 'error');
                return;
            }

            if (!password) {
                showNotification('Please enter password', 'error');
                return;
            }

            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;

            // Demo validation
            setTimeout(() => {
                // Demo credentials
                const demoUsername = 'manager';
                const demoPassword = 'manager';

                if (username === demoUsername && password === demoPassword) {
                    showNotification('Manager login successful! Redirecting...', 'success');

                    // Store login info
                    localStorage.setItem('userRole', 'manager');
                    localStorage.setItem('userName', username);

                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = 'manager-dashboard.html';
                    }, 1500);
                } else {
                    showNotification('Invalid username or password', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    }
}

// ========================================
// PAGE: RECEPTIONIST-DASHBOARD.HTML
// ========================================

function initReceptionistDashboard() {
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Receptionist Dashboard!', 'success');
    }, 500);

    // Set user info
    try {
        const userName = localStorage.getItem('userName');
        if (userName) {
            const userElement = document.querySelector('.user-details h3');
            if (userElement) {
                userElement.textContent = `Welcome, ${userName}`;
            }
        }
    } catch (e) {
        console.log('Local storage not available');
    }
}

// Dashboard button functions
function addReservation() {
    window.location.href = 'add-new-reservation.html';
}

function viewBookings() {
    window.location.href = 'view-booking-details.html';
}

function calculateBill() {
    window.location.href = 'calculate-printbill.html';
}

function showHelp() {
    const helpBox = document.getElementById('helpBox');
    if (helpBox) {
        if (helpBox.style.display === 'none' || !helpBox.style.display) {
            helpBox.style.display = 'block';
            showNotification('Help information displayed', 'success');
        } else {
            helpBox.style.display = 'none';
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');

        // Clear stored data
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'receptionist-login.html';
        }, 1500);
    }
}

// ========================================
// PAGE: MANAGER-DASHBOARD.HTML
// ========================================

function initManagerDashboard() {
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Manager Dashboard!', 'success');
    }, 500);

    // Set user info
    try {
        const userName = localStorage.getItem('userName');
        if (userName) {
            const userElement = document.querySelector('.user-details h3');
            if (userElement) {
                userElement.textContent = `Welcome, ${userName}`;
            }
        }
    } catch (e) {
        console.log('Local storage not available');
    }
}

// Manager specific functions
function manageRooms() {
    window.location.href = 'manage-rooms.html';
}

function viewReports() {
    window.location.href = 'view-report.html';
}

function modifyReservations() {
    window.location.href = 'modify-reservation.html';
}

// ========================================
// PAGE: ADD-RESERVATION.HTML
// ========================================

// Room data
const roomData = {
    'standard': [
        { number: '101', type: 'Standard', price: 3000, status: 'available' },
        { number: '102', type: 'Standard', price: 3000, status: 'available' },
        { number: '103', type: 'Standard', price: 3000, status: 'available' },
        { number: '104', type: 'Standard', price: 3000, status: 'available' },
        { number: '105', type: 'Standard', price: 3000, status: 'available' }
    ],
    'deluxe': [
        { number: '201', type: 'Deluxe', price: 5000, status: 'available' },
        { number: '202', type: 'Deluxe', price: 5000, status: 'available' },
        { number: '203', type: 'Deluxe', price: 5000, status: 'available' },
        { number: '204', type: 'Deluxe', price: 5000, status: 'available' },
        { number: '205', type: 'Deluxe', price: 5000, status: 'available' }
    ],
    'suite': [
        { number: '301', type: 'Executive Suite', price: 8000, status: 'available' },
        { number: '302', type: 'Executive Suite', price: 8000, status: 'available' },
        { number: '303', type: 'Executive Suite', price: 8000, status: 'available' }
    ],
    'family': [
        { number: '401', type: 'Family Suite', price: 10000, status: 'available' },
        { number: '402', type: 'Family Suite', price: 10000, status: 'available' },
        { number: '403', type: 'Family Suite', price: 10000, status: 'available' }
    ],
    'presidential': [
        { number: '501', type: 'Presidential Suite', price: 15000, status: 'available' },
        { number: '502', type: 'Presidential Suite', price: 15000, status: 'available' }
    ]
};

function initAddReservation() {
    // Set auto-generated reservation number
    const resNoField = document.getElementById('reservationNo');
    if (resNoField) {
        resNoField.value = generateReservationNo();
    }

    // Set minimum dates for calendar
    setMinDates();

    // Add event listeners for price calculation
    const roomType = document.getElementById('roomType');
    const roomNumber = document.getElementById('roomNumber');
    const checkinDate = document.getElementById('checkinDate');
    const checkoutDate = document.getElementById('checkoutDate');

    if (roomType) roomType.addEventListener('change', function() {
        updateRoomNumbers();
        calculatePrice();
    });

    if (roomNumber) roomNumber.addEventListener('change', calculatePrice);
    if (checkinDate) checkinDate.addEventListener('change', calculatePrice);
    if (checkoutDate) checkoutDate.addEventListener('change', calculatePrice);

    // Form submission
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', saveReservation);
    }

    // Welcome notification
    setTimeout(() => {
        showNotification('Fill in the reservation details', 'info');
    }, 500);
}

function generateReservationNo() {
    const prefix = 'RES';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkinDate');
    const checkoutInput = document.getElementById('checkoutDate');

    if (checkinInput) checkinInput.min = today;

    if (checkinInput) {
        checkinInput.addEventListener('change', function() {
            if (checkoutInput) {
                checkoutInput.min = this.value;
                if (checkoutInput.value && checkoutInput.value < this.value) {
                    checkoutInput.value = '';
                }
            }
            calculatePrice();
        });
    }

    if (checkoutInput) {
        checkoutInput.addEventListener('change', calculatePrice);
    }
}

function updateRoomNumbers() {
    const roomType = document.getElementById('roomType').value;
    const roomNumberSelect = document.getElementById('roomNumber');
    const roomHint = document.getElementById('roomAvailabilityHint');

    if (!roomNumberSelect) return;

    // Clear current options
    roomNumberSelect.innerHTML = '';

    if (!roomType) {
        // No room type selected
        const option = document.createElement('option');
        option.value = '';
        option.disabled = true;
        option.selected = true;
        option.textContent = '-- First select Room Type --';
        roomNumberSelect.appendChild(option);
        roomNumberSelect.disabled = true;
        if (roomHint) roomHint.textContent = 'Select a room type first';
        return;
    }

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = '-- Select Room Number --';
    roomNumberSelect.appendChild(defaultOption);

    // Get rooms for selected type
    const rooms = roomData[roomType] || [];

    // Add room options
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.number;
        option.textContent = `${room.number} - ${room.type} (Available)`;
        option.setAttribute('data-status', room.status);
        roomNumberSelect.appendChild(option);
    });

    // Enable select
    roomNumberSelect.disabled = false;

    // Update hint
    if (roomHint) {
        roomHint.textContent = `${rooms.length} room(s) available`;
        roomHint.style.color = '#38a169';
    }
}

function calculatePrice() {
    const roomType = document.getElementById('roomType')?.value;
    const checkinDate = document.getElementById('checkinDate')?.value;
    const checkoutDate = document.getElementById('checkoutDate')?.value;
    const roomNumber = document.getElementById('roomNumber')?.value;

    if (!roomType || !checkinDate || !checkoutDate) {
        const priceSummary = document.getElementById('priceSummary');
        if (priceSummary) priceSummary.style.display = 'none';
        return;
    }

    const nights = calculateNights(checkinDate, checkoutDate);
    if (nights <= 0) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }

    const roomPrice = getRoomPrice(roomType);
    const roomCharges = roomPrice * nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    // Get room type text
    const roomTypeSelect = document.getElementById('roomType');
    const roomTypeText = roomTypeSelect?.options[roomTypeSelect.selectedIndex]?.text || roomType;

    // Update summary - include room number if selected
    let roomInfo = roomTypeText;
    if (roomNumber) {
        roomInfo += ` - Room ${roomNumber}`;
    }

    const summaryRoomType = document.getElementById('summaryRoomType');
    const summaryNights = document.getElementById('summaryNights');
    const summaryRoomCharges = document.getElementById('summaryRoomCharges');
    const summaryTax = document.getElementById('summaryTax');
    const summaryTotal = document.getElementById('summaryTotal');
    const priceSummary = document.getElementById('priceSummary');

    if (summaryRoomType) summaryRoomType.textContent = roomInfo;
    if (summaryNights) summaryNights.textContent = nights + (nights > 1 ? ' nights' : ' night');
    if (summaryRoomCharges) summaryRoomCharges.textContent = '₹' + roomCharges.toLocaleString();
    if (summaryTax) summaryTax.textContent = '₹' + tax.toLocaleString();
    if (summaryTotal) summaryTotal.textContent = '₹' + total.toLocaleString();
    if (priceSummary) priceSummary.style.display = 'block';
}

function saveReservation(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        reservationNo: document.getElementById('reservationNo')?.value,
        guestName: document.getElementById('guestName')?.value,
        address: document.getElementById('address')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        roomType: document.getElementById('roomType')?.value,
        roomNumber: document.getElementById('roomNumber')?.value,
        checkinDate: document.getElementById('checkinDate')?.value,
        checkoutDate: document.getElementById('checkoutDate')?.value,
        adults: document.getElementById('adults')?.value,
        children: document.getElementById('children')?.value,
        specialRequests: document.getElementById('specialRequests')?.value,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
    };

    // Validate required fields
    if (!formData.guestName || !formData.phone || !formData.roomType || !formData.roomNumber || !formData.checkinDate || !formData.checkoutDate) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    // Validate dates
    const nights = calculateNights(formData.checkinDate, formData.checkoutDate);
    if (nights <= 0) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }

    // Show loading state
    const submitBtn = event.target.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        reservations.push(formData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        showNotification('Reservation created successfully!', 'success');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Redirect back to dashboard after 2 seconds
        setTimeout(() => {
            goBack();
        }, 2000);
    }, 1500);
}

function clearForm() {
    if (confirm('Are you sure you want to clear all form fields?')) {
        const form = document.getElementById('reservationForm');
        if (form) form.reset();

        const resNoField = document.getElementById('reservationNo');
        if (resNoField) resNoField.value = generateReservationNo();

        const priceSummary = document.getElementById('priceSummary');
        if (priceSummary) priceSummary.style.display = 'none';

        showNotification('Form cleared', 'info');
    }
}

// ========================================
// PAGE: VIEW-BOOKINGS.HTML
// ========================================

// Sample room data
const roomsData = [
    { number: '101', type: 'standard', typeName: 'Standard Room' },
    { number: '102', type: 'standard', typeName: 'Standard Room' },
    { number: '103', type: 'standard', typeName: 'Standard Room' },
    { number: '104', type: 'standard', typeName: 'Standard Room' },
    { number: '105', type: 'standard', typeName: 'Standard Room' },
    { number: '201', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '202', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '203', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '204', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '205', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '301', type: 'suite', typeName: 'Executive Suite' },
    { number: '302', type: 'suite', typeName: 'Executive Suite' },
    { number: '303', type: 'suite', typeName: 'Executive Suite' },
    { number: '401', type: 'family', typeName: 'Family Suite' },
    { number: '402', type: 'family', typeName: 'Family Suite' },
    { number: '403', type: 'family', typeName: 'Family Suite' },
    { number: '501', type: 'presidential', typeName: 'Presidential Suite' },
    { number: '502', type: 'presidential', typeName: 'Presidential Suite' }
];

const bookingsData = [
    {
        roomNumber: '201',
        guestName: 'John Smith',
        guestPhone: '9876543210',
        checkinDate: '2026-02-15',
        checkoutDate: '2026-02-18',
        adults: 2,
        children: 0,
        bookingId: 'RES001',
        status: 'booked'
    },
    {
        roomNumber: '202',
        guestName: 'Emma Johnson',
        guestPhone: '9876543211',
        checkinDate: '2026-02-16',
        checkoutDate: '2026-02-20',
        adults: 1,
        children: 0,
        bookingId: 'RES002',
        status: 'booked'
    },
    {
        roomNumber: '301',
        guestName: 'Michael Brown',
        guestPhone: '9876543212',
        checkinDate: '2026-02-14',
        checkoutDate: '2026-02-17',
        adults: 2,
        children: 1,
        bookingId: 'RES003',
        status: 'booked'
    },
    {
        roomNumber: '401',
        guestName: 'Sarah Wilson',
        guestPhone: '9876543213',
        checkinDate: '2026-02-18',
        checkoutDate: '2026-02-22',
        adults: 2,
        children: 2,
        bookingId: 'RES004',
        status: 'booked'
    },
    {
        roomNumber: '501',
        guestName: 'David Lee',
        guestPhone: '9876543214',
        checkinDate: '2026-02-20',
        checkoutDate: '2026-02-25',
        adults: 2,
        children: 0,
        bookingId: 'RES005',
        status: 'booked'
    }
];

function initViewBookings() {
    displayRooms();
}

function displayRooms() {
    const roomList = document.getElementById('roomList');
    if (!roomList) return;

    // Get filter values
    const roomTypeFilter = document.getElementById('roomTypeFilter')?.value || 'all';
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';

    // Filter rooms
    let filteredRooms = [...roomsData];

    if (roomTypeFilter !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.type === roomTypeFilter);
    }

    if (searchTerm) {
        filteredRooms = filteredRooms.filter(room => room.number.includes(searchTerm));
    }

    if (statusFilter !== 'all') {
        filteredRooms = filteredRooms.filter(room => {
            const isBooked = bookingsData.some(booking => booking.roomNumber === room.number);
            return statusFilter === 'available' ? !isBooked : isBooked;
        });
    }

    // Sort rooms by room number
    filteredRooms.sort((a, b) => parseInt(a.number) - parseInt(b.number));

    if (filteredRooms.length === 0) {
        roomList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-door-closed"></i>
                <h3>No rooms found</h3>
                <p>Try adjusting your filters</p>
            </div>
        `;
        return;
    }

    let html = '';
    filteredRooms.forEach(room => {
        const booking = bookingsData.find(b => b.roomNumber === room.number);
        const isBooked = !!booking;

        html += `
            <div class="room-item ${isBooked ? 'booked' : 'available'}">
                <div class="room-header">
                    <div>
                        <span class="room-number">
                            <i class="fas fa-door-open"></i> Room ${room.number}
                        </span>
                        <span class="room-type">${room.typeName}</span>
                    </div>
                    <span class="status-badge ${isBooked ? 'status-booked' : 'status-available'}">
                        ${isBooked ? 'Booked' : 'Available'}
                    </span>
                </div>

                ${isBooked ? getBookingDetailsHTML(booking) : getAvailableHTML(room)}

                <div class="room-actions">
                    ${isBooked ?
                        `<button class="btn-small btn-view" onclick="viewBooking('${booking.bookingId}')">
                            <i class="fas fa-eye"></i> View Details
                        </button>` :
                        `<button class="btn-small btn-book" onclick="bookRoom('${room.number}')">
                            <i class="fas fa-calendar-plus"></i> Book Now
                        </button>`
                    }
                </div>
            </div>
        `;
    });

    roomList.innerHTML = html;
}

function getBookingDetailsHTML(booking) {
    return `
        <div class="booking-details">
            <div class="booking-header">
                <h4><i class="fas fa-user"></i> Guest Information</h4>
                <span style="font-size: 12px; color: #718096;">Booking ID: ${booking.bookingId}</span>
            </div>
            <div class="booking-info">
                <div class="info-row">
                    <span class="info-label">Guest Name</span>
                    <span class="info-value">${booking.guestName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Phone Number</span>
                    <span class="info-value">${booking.guestPhone}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Check-in Date</span>
                    <span class="info-value">${formatDate(booking.checkinDate)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Check-out Date</span>
                    <span class="info-value">${formatDate(booking.checkoutDate)}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Guests</span>
                    <span class="info-value">${booking.adults} Adults, ${booking.children} Children</span>
                </div>
            </div>
        </div>
    `;
}

function getAvailableHTML(room) {
    return `
        <div class="available-message">
            <i class="fas fa-check-circle"></i>
            <span>Room ${room.number} is available for booking</span>
        </div>
    `;
}

function filterRooms() {
    displayRooms();
}

function viewBooking(bookingId) {
    const booking = bookingsData.find(b => b.bookingId === bookingId);
    if (booking) {
        showNotification(`Viewing booking: ${booking.bookingId} - ${booking.guestName}`, 'info');
    }
}

function bookRoom(roomNumber) {
    showNotification(`Booking Room ${roomNumber} - Redirecting...`, 'info');
    setTimeout(() => {
        window.location.href = `add-reservation.html?room=${roomNumber}`;
    }, 1500);
}

// ========================================
// PAGE: CALCULATE-BILL.HTML
// ========================================

const sampleReservations = [
    {
        id: 'RES123456',
        guestName: 'John Smith',
        guestPhone: '9876543210',
        roomNumber: '201',
        roomType: 'Deluxe Room',
        pricePerDay: 5000,
        checkinDate: '2026-02-15',
        checkoutDate: '2026-02-18',
        nights: 3
    },
    {
        id: 'RES123457',
        guestName: 'Emma Johnson',
        guestPhone: '9876543211',
        roomNumber: '102',
        roomType: 'Standard Room',
        pricePerDay: 3000,
        checkinDate: '2026-02-10',
        checkoutDate: '2026-02-14',
        nights: 4
    },
    {
        id: 'RES123458',
        guestName: 'Michael Brown',
        guestPhone: '9876543212',
        roomNumber: '301',
        roomType: 'Executive Suite',
        pricePerDay: 8000,
        checkinDate: '2026-02-12',
        checkoutDate: '2026-02-16',
        nights: 4
    },
    {
        id: 'RES123459',
        guestName: 'Sarah Wilson',
        guestPhone: '9876543213',
        roomNumber: '401',
        roomType: 'Family Suite',
        pricePerDay: 10000,
        checkinDate: '2026-02-18',
        checkoutDate: '2026-02-22',
        nights: 4
    },
    {
        id: 'RES123460',
        guestName: 'David Lee',
        guestPhone: '9876543214',
        roomNumber: '501',
        roomType: 'Presidential Suite',
        pricePerDay: 15000,
        checkinDate: '2026-02-20',
        checkoutDate: '2026-02-25',
        nights: 5
    }
];

let currentBillData = null;

function initCalculateBill() {
    const emptyState = document.getElementById('emptyState');
    const billDetails = document.getElementById('billDetailsSection');

    if (emptyState) emptyState.style.display = 'block';
    if (billDetails) billDetails.style.display = 'none';
}

function fetchReservation() {
    const reservationNo = document.getElementById('reservationNo')?.value.trim();

    if (!reservationNo) {
        showNotification('Please enter a reservation number', 'error');
        return;
    }

    const reservation = sampleReservations.find(r => r.id === reservationNo);

    if (!reservation) {
        showNotification('Reservation not found', 'error');
        return;
    }

    calculateBillForReservation(reservation);
}

function calculateBillForReservation(reservation) {
    currentBillData = reservation;

    const roomCharges = reservation.pricePerDay * reservation.nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    const checkinDate = formatDate(reservation.checkinDate);
    const checkoutDate = formatDate(reservation.checkoutDate);

    // Update reservation details
    setElementText('displayReservationNo', reservation.id);
    setElementText('guestName', reservation.guestName);
    setElementText('guestPhone', reservation.guestPhone);
    setElementText('roomNumber', reservation.roomNumber);
    setElementText('roomType', reservation.roomType);
    setElementText('pricePerDay', '₹' + reservation.pricePerDay.toLocaleString());
    setElementText('checkinDate', checkinDate);
    setElementText('checkoutDate', checkoutDate);
    setElementText('nights', reservation.nights);
    setElementText('roomCharges', '₹' + roomCharges.toLocaleString());
    setElementText('taxAmount', '₹' + tax.toLocaleString());
    setElementText('totalAmount', '₹' + total.toLocaleString());

    // Hide empty state, show bill details
    const emptyState = document.getElementById('emptyState');
    const billDetails = document.getElementById('billDetailsSection');

    if (emptyState) emptyState.style.display = 'none';
    if (billDetails) billDetails.style.display = 'block';

    showNotification('Bill generated successfully', 'success');
}

function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

function printBill() {
    if (!currentBillData) {
        showNotification('No bill to print', 'error');
        return;
    }

    const roomCharges = currentBillData.pricePerDay * currentBillData.nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    const printHTML = `
        <div class="print-bill">
            <div class="print-header">
                <h2>Ocean View Resort</h2>
                <p>Beach Road, Goa - 403001 | Tel: 0832-123456</p>
                <p>GST: 27ABCDE1234F1Z5</p>
                <h3 style="margin-top: 20px; color: #2d3748;">TAX INVOICE</h3>
            </div>

            <div class="print-section">
                <h4>Invoice Details</h4>
                <div class="print-row">
                    <span class="print-label">Invoice No:</span>
                    <span class="print-value">INV-${currentBillData.id}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Date:</span>
                    <span class="print-value">${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Reservation No:</span>
                    <span class="print-value">${currentBillData.id}</span>
                </div>
            </div>

            <div class="print-section">
                <h4>Guest Details</h4>
                <div class="print-row">
                    <span class="print-label">Guest Name:</span>
                    <span class="print-value">${currentBillData.guestName}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Phone:</span>
                    <span class="print-value">${currentBillData.guestPhone}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Room No:</span>
                    <span class="print-value">${currentBillData.roomNumber}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Room Type:</span>
                    <span class="print-value">${currentBillData.roomType}</span>
                </div>
            </div>

            <div class="print-section">
                <h4>Stay Details</h4>
                <div class="print-row">
                    <span class="print-label">Check-in:</span>
                    <span class="print-value">${formatDate(currentBillData.checkinDate)}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Check-out:</span>
                    <span class="print-value">${formatDate(currentBillData.checkoutDate)}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Nights:</span>
                    <span class="print-value">${currentBillData.nights}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">Price per Night:</span>
                    <span class="print-value">₹${currentBillData.pricePerDay.toLocaleString()}</span>
                </div>
            </div>

            <div class="print-section">
                <h4>Charge Details</h4>
                <div class="print-row">
                    <span class="print-label">Room Charges:</span>
                    <span class="print-value">₹${roomCharges.toLocaleString()}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">CGST (9%):</span>
                    <span class="print-value">₹${(tax/2).toLocaleString()}</span>
                </div>
                <div class="print-row">
                    <span class="print-label">SGST (9%):</span>
                    <span class="print-value">₹${(tax/2).toLocaleString()}</span>
                </div>
                <div class="print-total">
                    <span>Total Amount:</span>
                    <span>₹${total.toLocaleString()}</span>
                </div>
            </div>

            <div class="print-footer">
                <p>** This is a computer generated invoice **</p>
                <p>Thank you for choosing Ocean View Resort!</p>
                <p style="margin-top: 10px;">www.oceanviewresort.com | support@oceanviewresort.com</p>
            </div>
        </div>
    `;

    const printPreview = document.getElementById('printPreview');
    const printModal = document.getElementById('printModal');

    if (printPreview) printPreview.innerHTML = printHTML;
    if (printModal) printModal.style.display = 'flex';
}

function confirmPrint() {
    const printContent = document.getElementById('printPreview')?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Bill Invoice - ${currentBillData?.id}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .print-bill { max-width: 800px; margin: 0 auto; }
                .print-header { text-align: center; margin-bottom: 30px; }
                .print-section { margin-bottom: 25px; }
                .print-section h4 { border-bottom: 1px solid #ddd; padding-bottom: 8px; }
                .print-row { display: flex; justify-content: space-between; padding: 5px 0; }
                .print-total { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 2px solid #000; font-size: 18px; font-weight: bold; }
                .print-footer { margin-top: 40px; text-align: center; color: #666; }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    closePrintModal();
    showNotification('Bill sent to printer', 'success');
}

function closePrintModal() {
    const modal = document.getElementById('printModal');
    if (modal) modal.style.display = 'none';
}

function saveBill() {
    if (!currentBillData) {
        showNotification('No bill to save', 'error');
        return;
    }

    const roomCharges = currentBillData.pricePerDay * currentBillData.nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    const billData = {
        invoiceNo: 'INV-' + currentBillData.id,
        date: new Date().toISOString(),
        reservation: currentBillData,
        roomCharges: roomCharges,
        tax: tax,
        total: total
    };

    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    savedBills.push(billData);
    localStorage.setItem('bills', JSON.stringify(savedBills));

    showNotification('Bill saved successfully', 'success');
}

function resetBill() {
    const resNo = document.getElementById('reservationNo');
    const emptyState = document.getElementById('emptyState');
    const billDetails = document.getElementById('billDetailsSection');

    if (resNo) resNo.value = '';
    if (emptyState) emptyState.style.display = 'block';
    if (billDetails) billDetails.style.display = 'none';

    currentBillData = null;
    showNotification('Form cleared', 'info');
}

// ========================================
// PAGE: MANAGE-ROOMS.HTML
// ========================================

let roomsData_Manage = [
    { number: '101', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '102', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '103', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'maintenance', features: ['WiFi', 'TV', 'AC'] },
    { number: '104', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '105', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '201', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '202', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '203', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '204', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '205', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '301', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },
    { number: '302', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'maintenance', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },
    { number: '303', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },
    { number: '401', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },
    { number: '402', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },
    { number: '403', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },
    { number: '501', floor: 5, type: 'presidential', typeName: 'Presidential Suite', price: 15000, maxGuests: 6, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Dining Area', 'Jacuzzi'] },
    { number: '502', floor: 5, type: 'presidential', typeName: 'Presidential Suite', price: 15000, maxGuests: 6, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Dining Area', 'Jacuzzi'] }
];

let currentRoomId_Manage = null;
let filteredRooms_Manage = [...roomsData_Manage];

function initManageRooms() {
    displayRooms_Manage();
    updateStats_Manage();
}

function displayRooms_Manage() {
    const tbody = document.getElementById('roomsTableBody');
    const emptyState = document.getElementById('emptyState');

    if (!tbody) return;

    if (filteredRooms_Manage.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    filteredRooms_Manage.forEach(room => {
        html += `
            <tr>
                <td><strong>${room.number}</strong></td>
                <td>Floor ${room.floor}</td>
                <td>${room.typeName}</td>
                <td>₹${room.price.toLocaleString()}</td>
                <td>${room.maxGuests}</td>
                <td>
                    <div class="features-list">
                        ${room.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        ${room.features.length > 3 ? `<span class="feature-tag">+${room.features.length - 3}</span>` : ''}
                    </div>
                </td>
                <td>
                    <span class="status-badge ${room.status === 'available' ? 'status-available' : 'status-maintenance'}">
                        ${room.status === 'available' ? 'Available' : 'Maintenance'}
                    </span>
                </td>
                <td>
                    <div class="action-group">
                        <button class="action-btn edit" onclick="editRoom_Manage('${room.number}')" title="Edit Room">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="openDeleteModal_Manage('${room.number}')" title="Delete Room">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function filterRooms_Manage() {
    const floorFilter = document.getElementById('floorFilter')?.value || 'all';
    const typeFilter = document.getElementById('typeFilter')?.value || 'all';
    const statusFilter = document.getElementById('statusFilter')?.value || 'all';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';

    filteredRooms_Manage = roomsData_Manage.filter(room => {
        if (floorFilter !== 'all' && room.floor.toString() !== floorFilter) return false;
        if (typeFilter !== 'all' && room.type !== typeFilter) return false;
        if (statusFilter !== 'all' && room.status !== statusFilter) return false;
        if (searchTerm && !room.number.toLowerCase().includes(searchTerm)) return false;
        return true;
    });

    displayRooms_Manage();
    updateStats_Manage();
}

function updateStats_Manage() {
    const totalRooms = filteredRooms_Manage.length;
    const availableRooms = filteredRooms_Manage.filter(r => r.status === 'available').length;
    const maintenanceRooms = filteredRooms_Manage.filter(r => r.status === 'maintenance').length;

    const totalPrice = filteredRooms_Manage.reduce((sum, r) => sum + r.price, 0);
    const avgPrice = totalRooms > 0 ? Math.round(totalPrice / totalRooms) : 0;

    setElementText('totalRooms', totalRooms);
    setElementText('availableRooms', availableRooms);
    setElementText('maintenanceRooms', maintenanceRooms);
    setElementText('avgPrice', '₹' + avgPrice.toLocaleString());
}

function openAddRoomModal() {
    const form = document.getElementById('roomForm');
    const modalTitle = document.getElementById('modalTitle');
    const saveBtn = document.getElementById('saveBtn');

    if (form) form.reset();
    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Room';
    if (saveBtn) saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Room';

    currentRoomId_Manage = null;

    const modal = document.getElementById('roomModal');
    if (modal) modal.style.display = 'flex';
}

function editRoom_Manage(roomNumber) {
    const room = roomsData_Manage.find(r => r.number === roomNumber);
    if (!room) return;

    currentRoomId_Manage = room.number;

    const roomNumberInput = document.getElementById('roomNumber');
    const floorSelect = document.getElementById('floor');
    const roomTypeSelect = document.getElementById('roomType');
    const priceInput = document.getElementById('price');
    const maxGuestsInput = document.getElementById('maxGuests');
    const statusSelect = document.getElementById('status');

    if (roomNumberInput) roomNumberInput.value = room.number;
    if (floorSelect) floorSelect.value = room.floor;
    if (roomTypeSelect) roomTypeSelect.value = room.type;
    if (priceInput) priceInput.value = room.price;
    if (maxGuestsInput) maxGuestsInput.value = room.maxGuests;
    if (statusSelect) statusSelect.value = room.status;

    document.querySelectorAll('.feature-checkbox input').forEach(cb => {
        cb.checked = room.features.includes(cb.value);
    });

    const modalTitle = document.getElementById('modalTitle');
    const saveBtn = document.getElementById('saveBtn');

    if (modalTitle) modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Room ' + room.number;
    if (saveBtn) saveBtn.innerHTML = '<i class="fas fa-save"></i> Update Room';

    const modal = document.getElementById('roomModal');
    if (modal) modal.style.display = 'flex';
}

function saveRoom_Manage() {
    const roomNumber = document.getElementById('roomNumber')?.value.trim();
    const floor = document.getElementById('floor')?.value;
    const type = document.getElementById('roomType')?.value;
    const price = parseInt(document.getElementById('price')?.value);
    const maxGuests = parseInt(document.getElementById('maxGuests')?.value);
    const status = document.getElementById('status')?.value;

    const features = [];
    document.querySelectorAll('.feature-checkbox input:checked').forEach(cb => {
        features.push(cb.value);
    });

    if (!roomNumber || !floor || !type || !price || !maxGuests) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    const typeNames = {
        'standard': 'Standard Room',
        'deluxe': 'Deluxe Room',
        'suite': 'Executive Suite',
        'family': 'Family Suite',
        'presidential': 'Presidential Suite'
    };

    if (!currentRoomId_Manage) {
        const exists = roomsData_Manage.some(r => r.number === roomNumber);
        if (exists) {
            showNotification('Room number already exists', 'error');
            return;
        }
    }

    const roomData = {
        number: roomNumber,
        floor: parseInt(floor),
        type: type,
        typeName: typeNames[type],
        price: price,
        maxGuests: maxGuests,
        status: status,
        features: features
    };

    if (currentRoomId_Manage) {
        const index = roomsData_Manage.findIndex(r => r.number === currentRoomId_Manage);
        if (index !== -1) {
            roomsData_Manage[index] = roomData;
            showNotification(`Room ${roomNumber} updated successfully`, 'success');
        }
    } else {
        roomsData_Manage.push(roomData);
        showNotification(`Room ${roomNumber} added successfully`, 'success');
    }

    closeModal_Manage();
    filterRooms_Manage();
    updateStats_Manage();
}

function openDeleteModal_Manage(roomNumber) {
    const deleteRoomNumber = document.getElementById('deleteRoomNumber');
    if (deleteRoomNumber) deleteRoomNumber.textContent = roomNumber;

    currentRoomId_Manage = roomNumber;

    const modal = document.getElementById('deleteModal');
    if (modal) modal.style.display = 'flex';
}

function confirmDelete_Manage() {
    if (currentRoomId_Manage) {
        roomsData_Manage = roomsData_Manage.filter(r => r.number !== currentRoomId_Manage);
        showNotification(`Room ${currentRoomId_Manage} deleted successfully`, 'success');

        closeDeleteModal_Manage();
        filterRooms_Manage();
        updateStats_Manage();
    }
}

function closeModal_Manage() {
    const modal = document.getElementById('roomModal');
    if (modal) modal.style.display = 'none';
}

function closeDeleteModal_Manage() {
    const modal = document.getElementById('deleteModal');
    if (modal) modal.style.display = 'none';
    currentRoomId_Manage = null;
}

// ========================================
// PAGE: VIEW-REPORTS.HTML
// ========================================

function initViewReports() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    if (startDate) startDate.value = formatDateForInput(firstDay);
    if (endDate) endDate.value = formatDateForInput(today);

    showNotification('Reports loaded successfully', 'success');
}

function applyDateFilter() {
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;

    if (!startDate || !endDate) {
        showNotification('Please select both dates', 'error');
        return;
    }

    if (new Date(startDate) > new Date(endDate)) {
        showNotification('Start date cannot be after end date', 'error');
        return;
    }

    showNotification(`Loading reports from ${formatDate(startDate)} to ${formatDate(endDate)}`, 'info');
}

function setDateRange(range) {
    const today = new Date();
    let startDate = new Date();

    switch(range) {
        case 'today':
            startDate = today;
            break;
        case 'week':
            startDate.setDate(today.getDate() - 7);
            break;
        case 'month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            break;
        case 'quarter':
            startDate = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
            break;
        case 'year':
            startDate = new Date(today.getFullYear(), 0, 1);
            break;
    }

    const startInput = document.getElementById('startDate');
    const endInput = document.getElementById('endDate');

    if (startInput) startInput.value = formatDateForInput(startDate);
    if (endInput) endInput.value = formatDateForInput(today);

    applyDateFilter();
}

function exportReports() {
    showNotification('Exporting reports as PDF...', 'info');
    setTimeout(() => {
        showNotification('Reports exported successfully', 'success');
    }, 1500);
}

function printReports() {
    window.print();
}

// ========================================
// PAGE: MODIFY-RESERVATIONS.HTML
// ========================================

function initModifyReservations() {
    // Initialize modify reservations page
    showNotification('Modify Reservations page loaded', 'info');
}

function searchReservations() {
    // Search functionality
    showNotification('Searching...', 'info');
}

function advancedSearch() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters) {
        advancedFilters.style.display = advancedFilters.style.display === 'none' ? 'block' : 'none';
    }
}

function filterReservations() {
    showNotification('Filters applied', 'success');
}

function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const roomTypeFilter = document.getElementById('roomTypeFilter');
    const dateFilter = document.getElementById('dateFilter');

    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (roomTypeFilter) roomTypeFilter.value = 'all';
    if (dateFilter) dateFilter.value = 'all';

    showNotification('Filters cleared', 'info');
}

function filterByStatus(status) {
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.value = status;
        filterReservations();
    }
}

function prevPage() {
    showNotification('Previous page', 'info');
}

function nextPage() {
    showNotification('Next page', 'info');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function saveChanges() {
    showNotification('Changes saved successfully', 'success');
    closeModal('editModal');
}

function editFromView() {
    closeModal('viewModal');
    const editModal = document.getElementById('editModal');
    if (editModal) editModal.style.display = 'flex';
}

function confirmCancel() {
    showNotification('Reservation cancelled', 'success');
    closeModal('cancelModal');
}