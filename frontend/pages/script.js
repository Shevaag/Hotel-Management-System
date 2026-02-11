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