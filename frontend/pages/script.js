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