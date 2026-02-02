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