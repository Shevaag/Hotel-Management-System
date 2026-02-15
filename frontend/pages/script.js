// Password visibility
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

//Notification function
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Set content
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Role Selection Page
function initRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');

    roleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            //Detects which role was clicked
            const role = this.classList.contains('receptionist') ? 'Receptionist' : 'Manager';

            // Get the correct target
            const href = this.getAttribute('href');

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
}

// Receptionist Login Functions
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
                const demoUsername = 'username';
                const demoPassword = 'password';

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

// Manager Login Functions
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
                const demoPassword = 'admin';

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

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    // Import Font Awesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(faLink);

    // Initialize based on page
    if (filename === 'index.html' || filename === '') {
        initRoleSelection();
    } else if (filename === 'receptionist-login.html') {
        initReceptionistLogin();
    } else if (filename === 'manager-login.html') {
        initManagerLogin();
    }

    // Add animation classes
    const mainContent = document.querySelector('.container');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
});

// receptionist dashboard

// Dashboard JavaScript Functions

// Button Functions
function addReservation() {
    showNotification('Add New Reservation feature will be available soon!', 'info');
    // In the future, this will open the add reservation form
}

function viewBookings() {
    showNotification('View Booking Details feature will be available soon!', 'info');
    // In the future, this will show the bookings table
}

function calculateBill() {
    showNotification('Calculate & Print Bill feature will be available soon!', 'info');
    // In the future, this will open the bill calculator
}

function showHelp() {
    const helpBox = document.getElementById('helpBox');
    if (helpBox.style.display === 'none') {
        helpBox.style.display = 'block';
        showNotification('Help information displayed', 'success');
    } else {
        helpBox.style.display = 'none';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        showNotification('Logging out...', 'info');

        // Simulate logout delay
        setTimeout(() => {
            showNotification('Logged out successfully!', 'success');

            // In the future, redirect to login page
            // window.location.href = 'receptionist-login.html';

            setTimeout(() => {
                alert('Logout complete. In the final version, this will redirect to login page.');
            }, 1000);
        }, 1500);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    // Clear existing notifications after a delay
    const notifications = notificationContainer.querySelectorAll('.notification');
    if (notifications.length >= 3) {
        notifications[0].remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationContainer.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome!', 'success');
    }, 1000);

    // Set user info if available
    try {
        const userName = localStorage.getItem('userName');
        if (userName) {
            // Update page if needed
        }
    } catch (e) {
        console.log('Local storage not available');
    }
});

// Add Reservation JavaScript

// Generate random reservation number
function generateReservationNo() {
    const prefix = 'RES';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
}

// Calculate nights between two dates
function calculateNights(checkinDate, checkoutDate) {
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffTime = checkout - checkin;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Get room price based on room type
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

// Calculate and show price summary
function calculatePrice() {
    const roomType = document.getElementById('roomType').value;
    const checkinDate = document.getElementById('checkinDate').value;
    const checkoutDate = document.getElementById('checkoutDate').value;

    if (!roomType || !checkinDate || !checkoutDate) {
        document.getElementById('priceSummary').style.display = 'none';
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
    const roomTypeText = roomTypeSelect.options[roomTypeSelect.selectedIndex]?.text.split(' - ')[0] || roomType;

    // Update summary
    document.getElementById('summaryRoomType').textContent = roomTypeText;
    document.getElementById('summaryNights').textContent = nights + (nights > 1 ? ' nights' : ' night');
    document.getElementById('summaryRoomCharges').textContent = '₹' + roomCharges.toLocaleString();
    document.getElementById('summaryTax').textContent = '₹' + tax.toLocaleString();
    document.getElementById('summaryTotal').textContent = '₹' + total.toLocaleString();

    document.getElementById('priceSummary').style.display = 'block';
}

// Save reservation
function saveReservation(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        reservationNo: document.getElementById('reservationNo').value,
        guestName: document.getElementById('guestName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        roomType: document.getElementById('roomType').value,
        checkinDate: document.getElementById('checkinDate').value,
        checkoutDate: document.getElementById('checkoutDate').value,
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        specialRequests: document.getElementById('specialRequests').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        advanceAmount: document.getElementById('advanceAmount').value || 0,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
    };

    // Validate required fields
    if (!formData.guestName || !formData.phone || !formData.roomType || !formData.checkinDate || !formData.checkoutDate) {
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
        // Save to localStorage (temporary storage)
        const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
        reservations.push(formData);
        localStorage.setItem('reservations', JSON.stringify(reservations));

        showNotification('Reservation created successfully! ID: ' + formData.reservationNo, 'success');

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Optionally redirect back to dashboard after 2 seconds
        setTimeout(() => {
            goBack();
        }, 2000);
    }, 1500);
}

// Clear form
function clearForm() {
    if (confirm('Are you sure you want to clear all form fields?')) {
        document.getElementById('reservationForm').reset();
        document.getElementById('reservationNo').value = generateReservationNo();
        document.getElementById('priceSummary').style.display = 'none';
        showNotification('Form cleared', 'info');
    }
}

// Go back to dashboard
function goBack() {
    window.location.href = 'receptionist-dashboard.html';
}

// Set minimum date for date inputs
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkinInput = document.getElementById('checkinDate');
    const checkoutInput = document.getElementById('checkoutDate');

    checkinInput.min = today;

    checkinInput.addEventListener('change', function() {
        checkoutInput.min = this.value;
        if (checkoutInput.value && checkoutInput.value < this.value) {
            checkoutInput.value = '';
        }
        calculatePrice();
    });

    checkoutInput.addEventListener('change', calculatePrice);
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

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

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set auto-generated reservation number
    document.getElementById('reservationNo').value = generateReservationNo();

    // Set minimum dates for calendar
    setMinDates();

    // Add event listeners for price calculation
    document.getElementById('roomType').addEventListener('change', calculatePrice);
    document.getElementById('checkinDate').addEventListener('change', calculatePrice);
    document.getElementById('checkoutDate').addEventListener('change', calculatePrice);

    // Form submission
    document.getElementById('reservationForm').addEventListener('submit', saveReservation);

    // Welcome notification
    setTimeout(() => {
        showNotification('Fill in the reservation details', 'info');
    }, 500);
});

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

// Update room numbers based on selected room type
function updateRoomNumbers() {
    const roomType = document.getElementById('roomType').value;
    const roomNumberSelect = document.getElementById('roomNumber');
    const roomHint = document.getElementById('roomAvailabilityHint');

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

        // Show status
        let statusText = '';
        let statusClass = '';
        if (room.status === 'available') {
            statusText = 'Available';
            statusClass = 'available';
        } else if (room.status === 'booked') {
            statusText = 'Booked';
            statusClass = 'booked';
        } else if (room.status === 'occupied') {
            statusText = 'Occupied';
            statusClass = 'occupied';
        }

        option.textContent = `${room.number} - ${room.type} (${statusText})`;
        option.setAttribute('data-status', room.status);

        // Disable if not available
        if (room.status !== 'available') {
            option.disabled = true;
        }

        roomNumberSelect.appendChild(option);
    });

    // Enable select
    roomNumberSelect.disabled = false;

    // Update hint
    const availableCount = rooms.filter(r => r.status === 'available').length;
    if (roomHint) {
        if (availableCount === 0) {
            roomHint.textContent = 'No rooms available for this type';
            roomHint.style.color = '#e53e3e';
        } else {
            roomHint.textContent = `${availableCount} room(s) available`;
            roomHint.style.color = '#38a169';
        }
    }
}

// Add this to your existing calculatePrice function
function calculatePrice() {
    const roomType = document.getElementById('roomType').value;
    const checkinDate = document.getElementById('checkinDate').value;
    const checkoutDate = document.getElementById('checkoutDate').value;
    const roomNumber = document.getElementById('roomNumber').value;

    if (!roomType || !checkinDate || !checkoutDate) {
        document.getElementById('priceSummary').style.display = 'none';
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
    const roomTypeText = roomTypeSelect.options[roomTypeSelect.selectedIndex]?.text.split(' - ')[0] || roomType;

    // Update summary - include room number if selected
    let roomInfo = roomTypeText;
    if (roomNumber) {
        roomInfo += ` - Room ${roomNumber}`;
    }

    document.getElementById('summaryRoomType').textContent = roomInfo;
    document.getElementById('summaryNights').textContent = nights + (nights > 1 ? ' nights' : ' night');
    document.getElementById('summaryRoomCharges').textContent = '₹' + roomCharges.toLocaleString();
    document.getElementById('summaryTax').textContent = '₹' + tax.toLocaleString();
    document.getElementById('summaryTotal').textContent = '₹' + total.toLocaleString();

    document.getElementById('priceSummary').style.display = 'block';
}

// Update saveReservation function to include room number
function saveReservation(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        reservationNo: document.getElementById('reservationNo').value,
        guestName: document.getElementById('guestName').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        roomType: document.getElementById('roomType').value,
        roomNumber: document.getElementById('roomNumber').value, // NEW
        checkinDate: document.getElementById('checkinDate').value,
        checkoutDate: document.getElementById('checkoutDate').value,
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        specialRequests: document.getElementById('specialRequests').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        advanceAmount: document.getElementById('advanceAmount').value || 0,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
    };

    // Validate required fields - add roomNumber
    if (!formData.guestName || !formData.phone || !formData.roomType || !formData.roomNumber || !formData.checkinDate || !formData.checkoutDate) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    // ... rest of your saveReservation function
}

// Update initialize function
document.addEventListener('DOMContentLoaded', function() {
    // Set auto-generated reservation number
    document.getElementById('reservationNo').value = generateReservationNo();

    // Set minimum dates for calendar
    setMinDates();

    // Add event listeners
    document.getElementById('roomType').addEventListener('change', function() {
        updateRoomNumbers();
        calculatePrice();
    });

    document.getElementById('roomNumber').addEventListener('change', calculatePrice);
    document.getElementById('checkinDate').addEventListener('change', calculatePrice);
    document.getElementById('checkoutDate').addEventListener('change', calculatePrice);

    // Form submission
    document.getElementById('reservationForm').addEventListener('submit', saveReservation);

    // Welcome notification
    setTimeout(() => {
        showNotification('Fill in the reservation details', 'info');
    }, 500);
});

// View Bookings JavaScript - Simple Room Availability

// Sample room data
const roomsData = [
    // Standard Rooms
    { number: '101', type: 'standard', typeName: 'Standard Room'},
    { number: '102', type: 'standard', typeName: 'Standard Room' },
    { number: '103', type: 'standard', typeName: 'Standard Room' },
    { number: '104', type: 'standard', typeName: 'Standard Room'},
    { number: '105', type: 'standard', typeName: 'Standard Room'},

    // Deluxe Rooms
    { number: '201', type: 'deluxe', typeName: 'Deluxe Room' },
    { number: '202', type: 'deluxe', typeName: 'Deluxe Room'},
    { number: '203', type: 'deluxe', typeName: 'Deluxe Room'},
    { number: '204', type: 'deluxe', typeName: 'Deluxe Room'},
    { number: '205', type: 'deluxe', typeName: 'Deluxe Room' },

    // Suites
    { number: '301', type: 'suite', typeName: 'Executive Suite' },
    { number: '302', type: 'suite', typeName: 'Executive Suite' },
    { number: '303', type: 'suite', typeName: 'Executive Suite'},

    // Family Suites
    { number: '401', type: 'family', typeName: 'Family Suite'},
    { number: '402', type: 'family', typeName: 'Family Suite'},
    { number: '403', type: 'family', typeName: 'Family Suite'},

    // Presidential Suites
    { number: '501', type: 'presidential', typeName: 'Presidential Suite' },
    { number: '502', type: 'presidential', typeName: 'Presidential Suite' }
];

// Sample booking data - some rooms are booked
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayRooms();
});

// Display rooms
function displayRooms() {
    const roomList = document.getElementById('roomList');

    // Get filter values
    const roomTypeFilter = document.getElementById('roomTypeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Filter rooms
    let filteredRooms = [...roomsData];

    // Filter by room type
    if (roomTypeFilter !== 'all') {
        filteredRooms = filteredRooms.filter(room => room.type === roomTypeFilter);
    }

    // Filter by search term
    if (searchTerm) {
        filteredRooms = filteredRooms.filter(room => room.number.includes(searchTerm));
    }

    // Filter by status
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

    // Generate HTML for each room
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

                <div class="room-details">

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

// Get booking details HTML
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

// Get available message HTML
function getAvailableHTML(room) {
    return `
        <div class="available-message">
            <i class="fas fa-check-circle"></i>
            <span>Room ${room.number} is available for booking</span>
        </div>
    `;
}

// Filter rooms
function filterRooms() {
    displayRooms();
}

// View booking details
function viewBooking(bookingId) {
    const booking = bookingsData.find(b => b.bookingId === bookingId);
    if (booking) {
        showNotification(`Viewing booking: ${booking.bookingId} - ${booking.guestName}`, 'info');
        // Here you can open a modal or navigate to booking details page
    }
}

// Book room
function bookRoom(roomNumber) {
    showNotification(`Booking Room ${roomNumber} - Redirecting to reservation form...`, 'info');
    // Navigate to add reservation page
    setTimeout(() => {
        window.location.href = `add-reservation.html?room=${roomNumber}`;
    }, 1500);
}

// Go back to dashboard
function goBack() {
    window.location.href = 'receptionist-dashboard.html';
}

// Format date
function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-times-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationContainer.appendChild(notification);

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

// Calculate Bill JavaScript

// Sample reservation data
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

// Current bill data
let currentBillData = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Show empty state
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('billDetailsSection').style.display = 'none';
});

// Fetch reservation details
function fetchReservation() {
    const reservationNo = document.getElementById('reservationNo').value.trim();

    if (!reservationNo) {
        showNotification('Please enter a reservation number', 'error');
        return;
    }

    // Find reservation in sample data
    const reservation = sampleReservations.find(r => r.id === reservationNo);

    if (!reservation) {
        showNotification('Reservation not found', 'error');
        return;
    }

    // Calculate bill
    calculateBill(reservation);
}

// Calculate bill
function calculateBill(reservation) {
    // Store current bill data
    currentBillData = reservation;

    // Calculate charges
    const roomCharges = reservation.pricePerDay * reservation.nights;
    const tax = roomCharges * 0.18; // 18% GST
    const total = roomCharges + tax;

    // Format dates
    const checkinDate = formatDate(reservation.checkinDate);
    const checkoutDate = formatDate(reservation.checkoutDate);

    // Update reservation details
    document.getElementById('displayReservationNo').textContent = reservation.id;
    document.getElementById('guestName').textContent = reservation.guestName;
    document.getElementById('guestPhone').textContent = reservation.guestPhone;
    document.getElementById('roomNumber').textContent = reservation.roomNumber;
    document.getElementById('roomType').textContent = reservation.roomType;
    document.getElementById('pricePerDay').textContent = '₹' + reservation.pricePerDay.toLocaleString();
    document.getElementById('checkinDate').textContent = checkinDate;
    document.getElementById('checkoutDate').textContent = checkoutDate;
    document.getElementById('nights').textContent = reservation.nights;

    // Update bill summary
    document.getElementById('roomCharges').textContent = '₹' + roomCharges.toLocaleString();
    document.getElementById('taxAmount').textContent = '₹' + tax.toLocaleString();
    document.getElementById('totalAmount').textContent = '₹' + total.toLocaleString();

    // Hide empty state, show bill details
    document.getElementById('emptyState').style.display = 'none';
    document.getElementById('billDetailsSection').style.display = 'block';

    showNotification('Bill generated successfully', 'success');
}

// Print bill
function printBill() {
    if (!currentBillData) {
        showNotification('No bill to print', 'error');
        return;
    }

    // Calculate totals
    const roomCharges = currentBillData.pricePerDay * currentBillData.nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    // Create print preview HTML
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

    // Show print modal
    document.getElementById('printPreview').innerHTML = printHTML;
    document.getElementById('printModal').style.display = 'flex';
}

// Confirm print
function confirmPrint() {
    const printContent = document.getElementById('printPreview').innerHTML;
    const printWindow = window.open('', '_blank');

    printWindow.document.write(`
        <html>
        <head>
            <title>Bill Invoice - ${currentBillData.id}</title>
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

// Close print modal
function closePrintModal() {
    document.getElementById('printModal').style.display = 'none';
}

// Save bill
function saveBill() {
    if (!currentBillData) {
        showNotification('No bill to save', 'error');
        return;
    }

    // Calculate totals
    const roomCharges = currentBillData.pricePerDay * currentBillData.nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    // Create bill object
    const billData = {
        invoiceNo: 'INV-' + currentBillData.id,
        date: new Date().toISOString(),
        reservation: currentBillData,
        roomCharges: roomCharges,
        tax: tax,
        total: total
    };

    // Save to localStorage (simulate database save)
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    savedBills.push(billData);
    localStorage.setItem('bills', JSON.stringify(savedBills));

    showNotification('Bill saved successfully', 'success');
}

// Reset bill
function resetBill() {
    document.getElementById('reservationNo').value = '';
    document.getElementById('emptyState').style.display = 'block';
    document.getElementById('billDetailsSection').style.display = 'none';
    currentBillData = null;
    showNotification('Form cleared', 'info');
}

// Go back to dashboard
function goBack() {
    // Check user role from localStorage
    const userRole = localStorage.getItem('userRole') || 'receptionist';

    if (userRole === 'manager') {
        window.location.href = 'manager-dashboard.html';
    } else {
        window.location.href = 'receptionist-dashboard.html';
    }
}

// Format date
function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-times-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationContainer.appendChild(notification);

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

// Manage Rooms JavaScript

// Sample room database (from your earlier sample)
let roomsData = [
    // Standard Rooms - Floor 1
    { number: '101', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '102', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '103', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'maintenance', features: ['WiFi', 'TV', 'AC'] },
    { number: '104', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },
    { number: '105', floor: 1, type: 'standard', typeName: 'Standard Room', price: 3000, maxGuests: 2, status: 'available', features: ['WiFi', 'TV', 'AC'] },

    // Deluxe Rooms - Floor 2
    { number: '201', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '202', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '203', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '204', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },
    { number: '205', floor: 2, type: 'deluxe', typeName: 'Deluxe Room', price: 5000, maxGuests: 3, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'] },

    // Executive Suites - Floor 3
    { number: '301', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },
    { number: '302', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'maintenance', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },
    { number: '303', floor: 3, type: 'suite', typeName: 'Executive Suite', price: 8000, maxGuests: 4, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area'] },

    // Family Suites - Floor 4
    { number: '401', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },
    { number: '402', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },
    { number: '403', floor: 4, type: 'family', typeName: 'Family Suite', price: 10000, maxGuests: 5, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Kitchenette'] },

    // Presidential Suites - Floor 5
    { number: '501', floor: 5, type: 'presidential', typeName: 'Presidential Suite', price: 15000, maxGuests: 6, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Dining Area', 'Jacuzzi'] },
    { number: '502', floor: 5, type: 'presidential', typeName: 'Presidential Suite', price: 15000, maxGuests: 6, status: 'available', features: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Living Area', 'Dining Area', 'Jacuzzi'] }
];

// Current state
let currentRoomId = null;
let filteredRooms = [...roomsData];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayRooms();
    updateStats();
});

// Display rooms in table
function displayRooms() {
    const tbody = document.getElementById('roomsTableBody');
    const emptyState = document.getElementById('emptyState');

    if (filteredRooms.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    let html = '';
    filteredRooms.forEach(room => {
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
                        <button class="action-btn edit" onclick="editRoom('${room.number}')" title="Edit Room">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="openDeleteModal('${room.number}')" title="Delete Room">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// Filter rooms
function filterRooms() {
    const floorFilter = document.getElementById('floorFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredRooms = roomsData.filter(room => {
        // Floor filter
        if (floorFilter !== 'all' && room.floor.toString() !== floorFilter) {
            return false;
        }

        // Room type filter
        if (typeFilter !== 'all' && room.type !== typeFilter) {
            return false;
        }

        // Status filter
        if (statusFilter !== 'all' && room.status !== statusFilter) {
            return false;
        }

        // Search filter
        if (searchTerm && !room.number.toLowerCase().includes(searchTerm)) {
            return false;
        }

        return true;
    });

    displayRooms();
    updateStats();
}

// Update statistics
function updateStats() {
    const totalRooms = filteredRooms.length;
    const availableRooms = filteredRooms.filter(r => r.status === 'available').length;
    const maintenanceRooms = filteredRooms.filter(r => r.status === 'maintenance').length;

    // Calculate average price
    const totalPrice = filteredRooms.reduce((sum, r) => sum + r.price, 0);
    const avgPrice = totalRooms > 0 ? Math.round(totalPrice / totalRooms) : 0;

    document.getElementById('totalRooms').textContent = totalRooms;
    document.getElementById('availableRooms').textContent = availableRooms;
    document.getElementById('maintenanceRooms').textContent = maintenanceRooms;
    document.getElementById('avgPrice').textContent = '₹' + avgPrice.toLocaleString();
}

// Open modal to add new room
function openAddRoomModal() {
    // Reset form
    document.getElementById('roomForm').reset();
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-plus-circle"></i> Add New Room';
    document.getElementById('saveBtn').innerHTML = '<i class="fas fa-save"></i> Save Room';

    // Clear room ID
    currentRoomId = null;

    // Show modal
    document.getElementById('roomModal').style.display = 'flex';
}

// Edit room
function editRoom(roomNumber) {
    const room = roomsData.find(r => r.number === roomNumber);
    if (!room) return;

    // Store current room ID
    currentRoomId = room.number;

    // Fill form with room data
    document.getElementById('roomNumber').value = room.number;
    document.getElementById('floor').value = room.floor;
    document.getElementById('roomType').value = room.type;
    document.getElementById('price').value = room.price;
    document.getElementById('maxGuests').value = room.maxGuests;
    document.getElementById('status').value = room.status;

    // Check features
    document.querySelectorAll('.feature-checkbox input').forEach(cb => {
        cb.checked = room.features.includes(cb.value);
    });

    // Update modal title
    document.getElementById('modalTitle').innerHTML = '<i class="fas fa-edit"></i> Edit Room ' + room.number;
    document.getElementById('saveBtn').innerHTML = '<i class="fas fa-save"></i> Update Room';

    // Show modal
    document.getElementById('roomModal').style.display = 'flex';
}

// Save room (add or update)
function saveRoom() {
    // Get form values
    const roomNumber = document.getElementById('roomNumber').value.trim();
    const floor = document.getElementById('floor').value;
    const type = document.getElementById('roomType').value;
    const price = parseInt(document.getElementById('price').value);
    const maxGuests = parseInt(document.getElementById('maxGuests').value);
    const status = document.getElementById('status').value;

    // Get selected features
    const features = [];
    document.querySelectorAll('.feature-checkbox input:checked').forEach(cb => {
        features.push(cb.value);
    });

    // Validate
    if (!roomNumber || !floor || !type || !price || !maxGuests) {
        showNotification('Please fill all required fields', 'error');
        return;
    }

    // Room type name mapping
    const typeNames = {
        'standard': 'Standard Room',
        'deluxe': 'Deluxe Room',
        'suite': 'Executive Suite',
        'family': 'Family Suite',
        'presidential': 'Presidential Suite'
    };

    // Check if room number already exists (for new room)
    if (!currentRoomId) {
        const exists = roomsData.some(r => r.number === roomNumber);
        if (exists) {
            showNotification('Room number already exists', 'error');
            return;
        }
    }

    // Create room object
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

    if (currentRoomId) {
        // Update existing room
        const index = roomsData.findIndex(r => r.number === currentRoomId);
        if (index !== -1) {
            roomsData[index] = roomData;
            showNotification(`Room ${roomNumber} updated successfully`, 'success');
        }
    } else {
        // Add new room
        roomsData.push(roomData);
        showNotification(`Room ${roomNumber} added successfully`, 'success');
    }

    // Close modal and refresh
    closeModal();
    filterRooms();
    updateStats();
}

// Open delete confirmation modal
function openDeleteModal(roomNumber) {
    document.getElementById('deleteRoomNumber').textContent = roomNumber;
    currentRoomId = roomNumber;
    document.getElementById('deleteModal').style.display = 'flex';
}

// Confirm delete
function confirmDelete() {
    if (currentRoomId) {
        // Remove room from array
        roomsData = roomsData.filter(r => r.number !== currentRoomId);

        showNotification(`Room ${currentRoomId} deleted successfully`, 'success');

        // Close modal and refresh
        closeDeleteModal();
        filterRooms();
        updateStats();
    }
}

// Close add/edit modal
function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
    currentRoomId = null;
}

// Go back to dashboard
function goBack() {
    window.location.href = 'manager-dashboard.html';
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-times-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationContainer.appendChild(notification);

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

// Manager Dashboard JavaScript Functions

// Button Functions
function addReservation() {
    showNotification('Add New Reservation feature will be available soon!', 'info');
    // In the future, this will open the add reservation form
}

function viewBookings() {
    showNotification('View Booking Details feature will be available soon!', 'info');
    // In the future, this will show the bookings table
}

function calculateBill() {
    showNotification('Calculate & Print Bill feature will be available soon!', 'info');
    // In the future, this will open the bill calculator
}

// Manager specific functions
function manageRooms() {
    showNotification('Manage Rooms feature will be available soon!', 'info');
    // In the future, this will open room management
}

function viewReports() {
    showNotification('View Reports feature will be available soon!', 'info');
    // In the future, this will show reports dashboard
}

function modifyReservations() {
    showNotification('Modify Reservations feature will be available soon!', 'info');
    // In the future, this will open reservation editor
}

function showHelp() {
    const helpBox = document.getElementById('helpBox');
    if (helpBox.style.display === 'none') {
        helpBox.style.display = 'block';
        showNotification('Help information displayed', 'success');
    } else {
        helpBox.style.display = 'none';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout from Manager Dashboard?')) {
        showNotification('Logging out...', 'info');

        // Simulate logout delay
        setTimeout(() => {
            showNotification('Logged out successfully!', 'success');

            // In the future, redirect to login page
            // window.location.href = 'manager-login.html';

            setTimeout(() => {
                alert('Manager logout complete. In the final version, this will redirect to login page.');
            }, 1000);
        }, 1500);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationContainer = document.getElementById('notification');

    // Clear existing notifications after a delay
    const notifications = notificationContainer.querySelectorAll('.notification');
    if (notifications.length >= 3) {
        notifications[0].remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    if (type === 'error') icon = 'fa-times-circle';

    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    notificationContainer.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to Manager Dashboard! Administrative access granted.', 'success');
    }, 500);

    // Set manager info if available
    try {
        const userName = localStorage.getItem('managerName');
        if (userName) {
            // Update page if needed
        }
    } catch (e) {
        console.log('Local storage not available');
    }
});