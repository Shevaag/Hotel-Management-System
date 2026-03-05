// ========================================
// GLOBAL UTILITIES (Shared across all pages)
// ========================================

// Password visibility toggle
function togglePasswordVisibility(inputId, toggleBtnId) {
  const passwordInput = document.getElementById(inputId);
  const toggleBtn = document.getElementById(toggleBtnId);

  if (passwordInput && toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const type = passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;

      // Change icon
      const icon = this.querySelector("i");
      if (icon) {
        icon.className = type === "password" ? "fas fa-eye" : "fas fa-eye-slash";
      }
    });
  }
}

// Global notification function (SINGLE VERSION)
function showNotification(message, type = "info") {
  const notificationContainer = document.getElementById("notification");

  // Create container if it doesn't exist
  if (!notificationContainer) {
    const container = document.createElement("div");
    container.id = "notification";
    document.body.appendChild(container);
  }

  const container = document.getElementById("notification");

  // Limit to 3 notifications at a time
  const notifications = container.querySelectorAll(".notification");
  if (notifications.length >= 3) {
    notifications[0].remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "fa-info-circle";
  if (type === "success") icon = "fa-check-circle";
  if (type === "error") icon = "fa-times-circle";
  if (type === "warning") icon = "fa-exclamation-triangle";

  notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

  container.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease";
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
  if (!dateString) return "-";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-IN", options);
}

// Format date for input fields
function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
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

// Get room price by type (fallback if DB not found)
function getRoomPrice(roomType) {
  const prices = {
    standard: 3000,
    deluxe: 5000,
    suite: 8000,
    family: 10000,
    presidential: 15000,
  };
  return prices[roomType] || 0;
}

// Helper: get Tomcat app base path (e.g., /webapp-1.0-SNAPSHOT)
function getAppBasePath() {
  return "/" + window.location.pathname.split("/")[1];
}

// Go back function (handles different dashboards)
function goBack() {
  const role = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  if (role === "manager") {
    window.location.href = "manager-dashboard.html";
  } else if (role === "receptionist") {
    window.location.href = "receptionist-dashboard.html";
  } else {
    window.location.href = "index.html";
  }
}

// Safe text setter (used in multiple pages)
function setElementText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Add slideOut animation if not exists
if (!document.querySelector("#notification-animation")) {
  const style = document.createElement("style");
  style.id = "notification-animation";
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

document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf("/") + 1);

  // Import Font Awesome if not already present
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    document.head.appendChild(faLink);
  }

  // Initialize based on page
  if (filename === "index.html" || filename === "") {
    initRoleSelection();
  } else if (filename === "receptionist-login.html") {
    initReceptionistLogin();
  } else if (filename === "manager-login.html") {
    initManagerLogin();
  } else if (filename === "receptionist-dashboard.html") {
    initReceptionistDashboard();
  } else if (filename === "manager-dashboard.html") {
    initManagerDashboard();
  } else if (filename === "add-new-reservation.html") {
    initAddReservation();
  } else if (filename === "view-booking-details.html") {
    initViewBookings();
  } else if (filename === "calculate-printbill.html") {
    initCalculateBill();
  } else if (filename === "manage-rooms.html") {
    initManageRooms();
  } else if (filename === "view-report.html") {
    initViewReports();
  } else if (filename === "modify-reservation.html") {
    initModifyReservations();
  }

  // Add animation classes
  const mainContent = document.querySelector(".container");
  if (mainContent) {
    mainContent.classList.add("fade-in");
  }
});

// ========================================
// PAGE: INDEX.HTML (Role Selection)
// ========================================

function initRoleSelection() {
  const roleCards = document.querySelectorAll(".role-card");

  roleCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();

      const href = this.getAttribute("href");
      showNotification("Redirecting...", "info");

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
}

// ========================================
// PAGE: RECEPTIONIST-LOGIN.HTML (BACKEND)
// ========================================

function initReceptionistLogin() {
  togglePasswordVisibility("password", "togglePassword");

  const form = document.getElementById("receptionistLoginForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username) {
      showNotification("Please enter username", "error");
      return;
    }
    if (!password) {
      showNotification("Please enter password", "error");
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    try {
      const base = getAppBasePath();

      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("role", "RECEPTIONIST");

      const res = await fetch(base + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json().catch(() => ({ success: false, message: "Bad server response" }));

      if (res.ok && data.success) {
        showNotification("Login successful! Redirecting...", "success");

        localStorage.setItem("userRole", "receptionist");
        localStorage.setItem("userName", username);

        sessionStorage.setItem("userRole", "receptionist");
        sessionStorage.setItem("userName", username);

        setTimeout(() => (window.location.href = "receptionist-dashboard.html"), 700);
      } else {
        showNotification(data.message || "Invalid username or password", "error");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      showNotification("Server not reachable", "error");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ========================================
// PAGE: MANAGER-LOGIN.HTML (BACKEND)
// ========================================

function initManagerLogin() {
  togglePasswordVisibility("password", "togglePassword");

  const form = document.getElementById("managerLoginForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const securityCode = document.getElementById("securityCode").value.trim();

    if (!username) {
      showNotification("Please enter username", "error");
      return;
    }
    if (!password) {
      showNotification("Please enter password", "error");
      return;
    }
    if (!securityCode) {
      showNotification("Please enter security code", "error");
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    try {
      const base = getAppBasePath();

      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("securityCode", securityCode);
      params.append("role", "MANAGER");

      const res = await fetch(base + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const data = await res.json().catch(() => ({ success: false, message: "Bad server response" }));

      if (res.ok && data.success) {
        showNotification("Manager login successful! Redirecting...", "success");

        localStorage.setItem("userRole", "manager");
        localStorage.setItem("userName", username);

        sessionStorage.setItem("userRole", "manager");
        sessionStorage.setItem("userName", username);

        setTimeout(() => (window.location.href = "manager-dashboard.html"), 700);
      } else {
        showNotification(data.message || "Login failed", "error");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      showNotification("Server not reachable", "error");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ========================================
// PAGE: RECEPTIONIST-DASHBOARD.HTML
// ========================================

function initReceptionistDashboard() {
  setTimeout(() => {
    showNotification("Welcome to Receptionist Dashboard!", "success");
  }, 500);

  try {
    const userName = localStorage.getItem("userName");
    if (userName) {
      const userElement = document.querySelector(".user-details h3");
      if (userElement) {
        userElement.textContent = `Welcome, ${userName}`;
      }
    }
  } catch (e) {
    console.log("Local storage not available");
  }
}

function addReservation() {
  window.location.href = "add-new-reservation.html";
}
function viewBookings() {
  window.location.href = "view-booking-details.html";
}
function calculateBill() {
  window.location.href = "calculate-printbill.html";
}
function showHelp() {
  const helpBox = document.getElementById("helpBox");
  if (helpBox) {
    if (helpBox.style.display === "none" || !helpBox.style.display) {
      helpBox.style.display = "block";
      showNotification("Help information displayed", "success");
    } else {
      helpBox.style.display = "none";
    }
  }
}
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    showNotification("Logging out...", "info");

    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setTimeout(() => {
      window.location.href = "receptionist-login.html";
    }, 1500);
  }
}

// ========================================
// PAGE: MANAGER-DASHBOARD.HTML
// ========================================

function initManagerDashboard() {
  setTimeout(() => {
    showNotification("Welcome to Manager Dashboard!", "success");
  }, 500);

  try {
    const userName = localStorage.getItem("userName");
    if (userName) {
      const userElement = document.querySelector(".user-details h3");
      if (userElement) {
        userElement.textContent = `Welcome, ${userName}`;
      }
    }
  } catch (e) {
    console.log("Local storage not available");
  }
}

function manageRooms() {
  window.location.href = "manage-rooms.html";
}
function viewReports() {
  window.location.href = "view-report.html";
}
function modifyReservations() {
  window.location.href = "modify-reservation.html";
}

// ========================================
// PAGE: ADD-NEW-RESERVATION.HTML (SAVE RESERVATION)
// ========================================

async function saveReservation(event) {
  event.preventDefault();

  const reservationNo = document.getElementById("reservationNo")?.value;
  const guestName = document.getElementById("guestName")?.value?.trim();
  const address = document.getElementById("address")?.value?.trim();
  const phone = document.getElementById("phone")?.value?.trim();
  const email = document.getElementById("email")?.value?.trim();
  const roomType = document.getElementById("roomType")?.value;
  const roomNumber = document.getElementById("roomNumber")?.value;
  const checkinDate = document.getElementById("checkinDate")?.value;
  const checkoutDate = document.getElementById("checkoutDate")?.value;
  const adults = document.getElementById("adults")?.value;
  const children = document.getElementById("children")?.value || "0";
  const specialRequests = document.getElementById("specialRequests")?.value || "";

  if (!guestName || !address || !phone || !email || !roomType || !roomNumber || !checkinDate || !checkoutDate) {
    showNotification("Please fill all required fields", "error");
    return;
  }

  const nights = calculateNights(checkinDate, checkoutDate);
  if (nights <= 0) {
    showNotification("Check-out date must be after check-in date", "error");
    return;
  }

  const submitBtn = event.target.querySelector(".btn-primary");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  submitBtn.disabled = true;

  try {
    const base = getAppBasePath();

    const params = new URLSearchParams();
    params.append("reservationNo", reservationNo);
    params.append("guestName", guestName);
    params.append("address", address);
    params.append("phone", phone);
    params.append("email", email);
    params.append("roomType", roomType);
    params.append("roomNumber", roomNumber);
    params.append("checkinDate", checkinDate);
    params.append("checkoutDate", checkoutDate);
    params.append("adults", adults);
    params.append("children", children);
    params.append("specialRequests", specialRequests);

    const res = await fetch(base + "/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json().catch(() => ({ success: false, message: "Bad server response" }));

    if (res.ok && data.success) {
      try {
        await loadReservationsFromDB();
        updateRoomNumbersFromDB();
      } catch (e) {
        console.warn("Could not refresh reservations after save:", e);
      }

      showNotification("Reservation created successfully! (" + data.reservationNo + ")", "success");
      setTimeout(() => goBack(), 1200);
    } else {
      showNotification(data.message || "Failed to save reservation", "error");
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    showNotification("Server not reachable", "error");
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// ========================================
// PAGE: VIEW-BOOKING-DETAILS.HTML (DB)
// ========================================

let roomsData = [];
let bookingsData = [];

async function initViewBookings() {
  try {
    await loadRoomsFromDB();
    await loadBookingsFromDB();
  } catch (e) {
    console.error("FETCH ERROR:", e);
    showNotification("Failed to load bookings from server", "error");
    return;
  }

  try {
    displayRooms();
  } catch (e) {
    console.error("RENDER ERROR:", e);
    showNotification("Loaded data but page rendering failed (check console)", "error");
  }
}

async function loadRoomsFromDB() {
  const base = getAppBasePath();
  const res = await fetch(base + "/api/room-types");
  if (!res.ok) throw new Error("room-types HTTP " + res.status);

  const roomTypes = await res.json();
  const rooms = [];

  roomTypes.forEach((rt) => {
    const type = rt.type;
    const typeName = rt.typeName;
    (rt.rooms || []).forEach((num) => {
      rooms.push({ number: String(num), type, typeName });
    });
  });

  rooms.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  roomsData = rooms;
}

async function loadBookingsFromDB() {
  const base = getAppBasePath();
  const res = await fetch(base + "/api/reservations");
  if (!res.ok) throw new Error("reservations HTTP " + res.status);

  const reservations = await res.json();

  bookingsData = reservations
    .filter((r) => (r.status || "").toLowerCase() === "confirmed")
    .map((r) => ({
      roomNumber: String(r.roomNumber),
      guestName: r.guestName || "-",
      guestPhone: r.phone || "-",
      checkinDate: r.checkinDate,
      checkoutDate: r.checkoutDate,
      adults: Number(r.adults || 0),
      children: Number(r.children || 0),
      bookingId: r.reservationNo || "-",
      status: "booked",
    }));
}

function displayRooms() {
  const roomList = document.getElementById("roomList");
  if (!roomList) return;

  const roomTypeFilter = document.getElementById("roomTypeFilter")?.value || "all";
  const statusFilter = document.getElementById("statusFilter")?.value || "all";
  const searchTerm = (document.getElementById("searchInput")?.value || "").toLowerCase();

  let filteredRooms = [...roomsData];

  if (roomTypeFilter !== "all") {
    filteredRooms = filteredRooms.filter((r) => r.type === roomTypeFilter);
  }

  if (searchTerm) {
    filteredRooms = filteredRooms.filter((r) => r.number.includes(searchTerm));
  }

  if (statusFilter !== "all") {
    filteredRooms = filteredRooms.filter((room) => {
      const isBooked = bookingsData.some((b) => b.roomNumber === room.number);
      return statusFilter === "available" ? !isBooked : isBooked;
    });
  }

  if (filteredRooms.length === 0) {
    roomList.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-door-closed"></i>
        <h3>No rooms found</h3>
        <p>Try adjusting your filters</p>
      </div>`;
    return;
  }

  let html = "";
  filteredRooms.forEach((room) => {
    const booking = bookingsData.find((b) => b.roomNumber === room.number);
    const isBooked = !!booking;

    html += `
      <div class="room-item ${isBooked ? "booked" : "available"}">
        <div class="room-header">
          <div>
            <span class="room-number">
              <i class="fas fa-door-open"></i> Room ${room.number}
            </span>
            <span class="room-type">${room.typeName}</span>
          </div>
          <span class="status-badge ${isBooked ? "status-booked" : "status-available"}">
            ${isBooked ? "Booked" : "Available"}
          </span>
        </div>

        ${isBooked ? getBookingDetailsHTML(booking) : getAvailableHTML(room)}

        <div class="room-actions">
          ${
            isBooked
              ? `<button class="btn-small btn-view" onclick="viewBooking('${booking.bookingId}')">
                   <i class="fas fa-eye"></i> View Details
                 </button>`
              : `<button class="btn-small btn-book" onclick="bookRoom('${room.number}')">
                   <i class="fas fa-calendar-plus"></i> Book Now
                 </button>`
          }
        </div>
      </div>`;
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
    </div>`;
}

function getAvailableHTML(room) {
  return `
    <div class="available-message">
      <i class="fas fa-check-circle"></i>
      <span>Room ${room.number} is available for booking</span>
    </div>`;
}

function filterRooms() {
  displayRooms();
}

function viewBooking(bookingId) {
  const booking = bookingsData.find((b) => b.bookingId === bookingId);
  if (!booking) {
    showNotification("Booking not found", "error");
    return;
  }
  showNotification(`Booking ${booking.bookingId} - ${booking.guestName}`, "info");
}

function bookRoom(roomNumber) {
  showNotification(`Booking Room ${roomNumber} - Redirecting...`, "info");
  setTimeout(() => {
    window.location.href = `add-new-reservation.html?room=${roomNumber}`;
  }, 700);
}

// ========================================
// PAGE: CALCULATE-BILL.HTML (DB)
// ========================================

let currentBillData = null; // ✅ kept only once (duplicate removed)

function initCalculateBill() { // ✅ kept only once (duplicate removed)
  const emptyState = document.getElementById("emptyState");
  const billDetails = document.getElementById("billDetailsSection");
  if (emptyState) emptyState.style.display = "block";
  if (billDetails) billDetails.style.display = "none";
}

async function fetchReservation() {
  const reservationNo = document.getElementById("reservationNo")?.value.trim();
  if (!reservationNo) {
    showNotification("Please enter a reservation number", "error");
    return;
  }

  const base = getAppBasePath();

  try {
    const res1 = await fetch(base + "/api/reservations/" + encodeURIComponent(reservationNo));
    const reservation = await res1.json().catch(() => null);

    if (!res1.ok || !reservation) {
      showNotification(reservation?.message || "Reservation not found", "error");
      return;
    }

    const roomTypeKey = (reservation.roomType || "").toLowerCase();
    const res2 = await fetch(base + "/api/room-types/" + encodeURIComponent(roomTypeKey));
    const roomTypeDoc = await res2.json().catch(() => null);

    if (!res2.ok || !roomTypeDoc) {
      showNotification(roomTypeDoc?.message || "Room type not found for pricing", "error");
      return;
    }

    const nights = calculateNights(reservation.checkinDate, reservation.checkoutDate);
    if (nights <= 0) {
      showNotification("Invalid dates in reservation", "error");
      return;
    }

    const pricePerDay = Number(roomTypeDoc.price || 0);
    const roomCharges = pricePerDay * nights;
    const tax = roomCharges * 0.18;
    const total = roomCharges + tax;

    currentBillData = {
      reservationNo: reservation.reservationNo,
      guestName: reservation.guestName,
      guestPhone: reservation.phone,
      roomNumber: reservation.roomNumber,
      roomTypeKey: roomTypeKey,
      roomTypeName: roomTypeDoc.typeName || roomTypeKey,
      pricePerDay: pricePerDay,
      checkinDate: reservation.checkinDate,
      checkoutDate: reservation.checkoutDate,
      nights,
      roomCharges,
      tax,
      total,
    };

    setElementText("displayReservationNo", currentBillData.reservationNo);
    setElementText("guestName", currentBillData.guestName);
    setElementText("guestPhone", currentBillData.guestPhone);
    setElementText("roomNumber", currentBillData.roomNumber);
    setElementText("roomType", currentBillData.roomTypeName);
    setElementText("pricePerDay", "Rs." + currentBillData.pricePerDay.toLocaleString());
    setElementText("checkinDate", formatDate(currentBillData.checkinDate));
    setElementText("checkoutDate", formatDate(currentBillData.checkoutDate));
    setElementText("nights", String(currentBillData.nights));

    setElementText("roomCharges", "Rs." + roomCharges.toLocaleString());
    setElementText("taxAmount", "Rs." + tax.toLocaleString());
    setElementText("totalAmount", "Rs." + total.toLocaleString());

    const emptyState = document.getElementById("emptyState");
    const billDetails = document.getElementById("billDetailsSection");
    if (emptyState) emptyState.style.display = "none";
    if (billDetails) billDetails.style.display = "block";

    showNotification("Bill generated successfully", "success");
  } catch (err) {
    console.error(err);
    showNotification("Failed to load bill from server", "error");
  }
}

function printBill() {
  if (!currentBillData) {
    showNotification("No bill to print", "error");
    return;
  }

  const printHTML = `
    <div class="print-bill">
      <div class="print-header">
        <h2>Ocean View Resort</h2>
        <p>Beach Road, Galle  | Tel: 0555676749/p>
        <p>GST: 27ABCDE1234F1Z5</p>
        <h3 style="margin-top: 20px; color: #2d3748;">TAX INVOICE</h3>
      </div>

      <div class="print-section">
        <h4>Invoice Details</h4>
        <div class="print-row"><span class="print-label">Invoice No:</span><span class="print-value">INV-${currentBillData.reservationNo}</span></div>
        <div class="print-row"><span class="print-label">Date:</span><span class="print-value">${new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</span></div>
        <div class="print-row"><span class="print-label">Reservation No:</span><span class="print-value">${currentBillData.reservationNo}</span></div>
      </div>

      <div class="print-section">
        <h4>Guest Details</h4>
        <div class="print-row"><span class="print-label">Guest Name:</span><span class="print-value">${currentBillData.guestName}</span></div>
        <div class="print-row"><span class="print-label">Phone:</span><span class="print-value">${currentBillData.guestPhone}</span></div>
        <div class="print-row"><span class="print-label">Room No:</span><span class="print-value">${currentBillData.roomNumber}</span></div>
        <div class="print-row"><span class="print-label">Room Type:</span><span class="print-value">${currentBillData.roomTypeName}</span></div>
      </div>

      <div class="print-section">
        <h4>Stay Details</h4>
        <div class="print-row"><span class="print-label">Check-in:</span><span class="print-value">${formatDate(currentBillData.checkinDate)}</span></div>
        <div class="print-row"><span class="print-label">Check-out:</span><span class="print-value">${formatDate(currentBillData.checkoutDate)}</span></div>
        <div class="print-row"><span class="print-label">Nights:</span><span class="print-value">${currentBillData.nights}</span></div>
        <div class="print-row"><span class="print-label">Price per Night:</span><span class="print-value">Rs.${currentBillData.pricePerDay.toLocaleString()}</span></div>
      </div>

      <div class="print-section">
        <h4>Charge Details</h4>
        <div class="print-row"><span class="print-label">Room Charges:</span><span class="print-value">Rs.${currentBillData.roomCharges.toLocaleString()}</span></div>
        <div class="print-row"><span class="print-label">CGST (9%):</span><span class="print-value">Rs.${(currentBillData.tax/2).toLocaleString()}</span></div>
        <div class="print-row"><span class="print-label">SGST (9%):</span><span class="print-value">Rs.${(currentBillData.tax/2).toLocaleString()}</span></div>
        <div class="print-total"><span>Total Amount:</span><span>Rs.${currentBillData.total.toLocaleString()}</span></div>
      </div>

      <div class="print-footer">
        <p>** This is a computer generated invoice **</p>
        <p>Thank you for choosing Ocean View Resort!</p>
      </div>
    </div>
  `;

  const printPreview = document.getElementById("printPreview");
  const printModal = document.getElementById("printModal");
  if (printPreview) printPreview.innerHTML = printHTML;
  if (printModal) printModal.style.display = "flex";
}

function confirmPrint() {
  const printContent = document.getElementById("printPreview")?.innerHTML;
  if (!printContent) return;

  const w = window.open("", "_blank");
  w.document.write(`
    <html><head><title>Bill Invoice - ${currentBillData?.reservationNo}</title>
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
    </head><body>${printContent}</body></html>
  `);
  w.document.close();
  w.focus();
  w.print();
  w.close();

  closePrintModal();
  showNotification("Bill sent to printer", "success");
}

function closePrintModal() {
  const modal = document.getElementById("printModal");
  if (modal) modal.style.display = "none";
}

function saveBill() {
  if (!currentBillData) {
    showNotification("No bill to save", "error");
    return;
  }

  const billData = {
    invoiceNo: "INV-" + currentBillData.reservationNo,
    date: new Date().toISOString(),
    ...currentBillData,
  };

  const savedBills = JSON.parse(localStorage.getItem("bills") || "[]");
  savedBills.push(billData);
  localStorage.setItem("bills", JSON.stringify(savedBills));

  showNotification("Bill saved successfully", "success");
}

function resetBill() {
  const resNo = document.getElementById("reservationNo");
  const emptyState = document.getElementById("emptyState");
  const billDetails = document.getElementById("billDetailsSection");

  if (resNo) resNo.value = "";
  if (emptyState) emptyState.style.display = "block";
  if (billDetails) billDetails.style.display = "none";

  currentBillData = null;
  showNotification("Form cleared", "info");
}

// ========================================
// PAGE: MANAGE-ROOMS.HTML
// ========================================

let roomTypes = [];
let currentType = null;

async function initManageRooms() {
  await loadRoomTypes();
  renderRoomTypesTable();
  updateSummaryCards();
}

async function loadRoomTypes() {
  const base = getAppBasePath();
  const res = await fetch(base + "/api/room-types");
  if (!res.ok) throw new Error("Failed to load room types");
  roomTypes = await res.json();
}

function renderRoomTypesTable() {
  const tbody = document.getElementById("roomsTableBody");
  if (!tbody) return;

  if (!roomTypes.length) {
    tbody.innerHTML = "";
    document.getElementById("emptyState").style.display = "block";
    return;
  }

  document.getElementById("emptyState").style.display = "none";

  tbody.innerHTML = roomTypes
    .map(
      (rt) => `
    <tr>
      <td><strong>${rt.type}</strong></td>
      <td>-</td>
      <td>${rt.typeName}</td>
      <td>Rs.${Number(rt.price || 0).toLocaleString()}</td>
      <td>${(rt.maxAdults || 0) + (rt.maxChildren || 0)}</td>
      <td>
        <div class="features-list">
          ${(rt.features || [])
            .slice(0, 3)
            .map((f) => `<span class="feature-tag">${f}</span>`)
            .join("")}
          ${(rt.features || []).length > 3 ? `<span class="feature-tag">+${rt.features.length - 3}</span>` : ""}
        </div>
      </td>
      <td>
        <span class="status-badge status-available">Rooms: ${(rt.rooms || []).length}</span>
      </td>
      <td>
        <div class="action-group">
          <button class="action-btn edit" onclick="openEditTypeModal('${rt.type}')"><i class="fas fa-edit"></i></button>
          <button class="action-btn" onclick="promptAddRoom('${rt.type}')" title="Add Room"><i class="fas fa-plus"></i></button>
          <button class="action-btn delete" onclick="promptRemoveRoom('${rt.type}')" title="Remove Room"><i class="fas fa-minus"></i></button>
        </div>
      </td>
    </tr>
  `
    )
    .join("");
}

function updateSummaryCards() {
  const totalTypes = roomTypes.length;
  const totalRooms = roomTypes.reduce((sum, rt) => sum + (rt.rooms ? rt.rooms.length : 0), 0);
  const avgPrice = totalTypes ? Math.round(roomTypes.reduce((s, rt) => s + Number(rt.price || 0), 0) / totalTypes) : 0;

  setElementText("totalRooms", totalRooms);
  setElementText("availableRooms", totalTypes);
  setElementText("maintenanceRooms", 0);
  setElementText("avgPrice", "Rs." + avgPrice.toLocaleString());
}

function openEditTypeModal(type) {
  const rt = roomTypes.find((x) => x.type === type);
  if (!rt) return;

  currentType = type;

  document.getElementById("modalTitle").innerHTML = `<i class="fas fa-edit"></i> Edit Type: ${rt.type}`;
  document.getElementById("saveBtn").innerHTML = `<i class="fas fa-save"></i> Update`;

  document.getElementById("roomNumber").value = "";
  document.getElementById("roomNumber").disabled = true;

  document.getElementById("floor").value = "";
  document.getElementById("floor").disabled = true;

  document.getElementById("roomType").value = rt.type;
  document.getElementById("roomType").disabled = true;

  document.getElementById("price").value = rt.price || 0;
  document.getElementById("maxGuests").value = rt.maxAdults || 0;
  document.getElementById("status").value = "available";
  document.getElementById("status").disabled = true;

  document.querySelectorAll(".feature-checkbox input").forEach((cb) => {
    cb.checked = (rt.features || []).includes(cb.value);
  });

  document.getElementById("roomModal").style.display = "flex";
}

async function saveRoom() {
  if (!currentType) {
    showNotification("Select a type to edit", "error");
    return;
  }

  const base = getAppBasePath();

  const type = currentType;
  const typeName = prompt("Enter Type Name (e.g., Deluxe Room):");
  if (!typeName) return;

  const price = document.getElementById("price").value;
  const maxAdults = document.getElementById("maxGuests").value;
  const maxChildren = prompt("Enter maxChildren for this type:");
  if (maxChildren === null) return;

  const features = [];
  document.querySelectorAll(".feature-checkbox input:checked").forEach((cb) => features.push(cb.value));

  const params = new URLSearchParams();
  params.append("type", type);
  params.append("typeName", typeName);
  params.append("price", price);
  params.append("maxAdults", maxAdults);
  params.append("maxChildren", maxChildren);
  params.append("features", features.join(","));

  const res = await fetch(base + "/api/room-types/update", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !data.success) {
    showNotification(data.message || "Update failed", "error");
    return;
  }

  showNotification("Room type updated!", "success");
  closeModal();
  await loadRoomTypes();
  renderRoomTypesTable();
  updateSummaryCards();
}

async function promptAddRoom(type) {
  const roomNumber = prompt(`Add room number to ${type} (e.g., 206):`);
  if (!roomNumber) return;

  const base = getAppBasePath();
  const params = new URLSearchParams();
  params.append("action", "add");
  params.append("type", type);
  params.append("roomNumber", roomNumber);

  const res = await fetch(base + "/api/room-types/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !data.success) {
    showNotification(data.message || "Add room failed", "error");
    return;
  }

  showNotification("Room added!", "success");
  await loadRoomTypes();
  renderRoomTypesTable();
  updateSummaryCards();
}

async function promptRemoveRoom(type) {
  const roomNumber = prompt(`Remove room number from ${type} (e.g., 205):`);
  if (!roomNumber) return;

  const base = getAppBasePath();
  const params = new URLSearchParams();
  params.append("action", "remove");
  params.append("type", type);
  params.append("roomNumber", roomNumber);

  const res = await fetch(base + "/api/room-types/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json().catch(() => ({ success: false }));
  if (!res.ok || !data.success) {
    showNotification(data.message || "Remove room failed", "error");
    return;
  }

  showNotification("Room removed!", "success");
  await loadRoomTypes();
  renderRoomTypesTable();
  updateSummaryCards();
}

function closeModal() {
  document.getElementById("roomModal").style.display = "none";
  currentType = null;
}

// ========================================
// PAGE: VIEW-REPORTS.HTML
// ========================================

function initViewReports() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  if (startDate) startDate.value = formatDateForInput(firstDay);
  if (endDate) endDate.value = formatDateForInput(today);

  showNotification("Reports loaded successfully", "success");
}

function applyDateFilter() {
  const startDate = document.getElementById("startDate")?.value;
  const endDate = document.getElementById("endDate")?.value;

  if (!startDate || !endDate) {
    showNotification("Please select both dates", "error");
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    showNotification("Start date cannot be after end date", "error");
    return;
  }

  showNotification(`Loading reports from ${formatDate(startDate)} to ${formatDate(endDate)}`, "info");
}

function setDateRange(range) {
  const today = new Date();
  let startDate = new Date();

  switch (range) {
    case "today":
      startDate = today;
      break;
    case "week":
      startDate.setDate(today.getDate() - 7);
      break;
    case "month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "quarter":
      startDate = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
      break;
    case "year":
      startDate = new Date(today.getFullYear(), 0, 1);
      break;
  }

  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");

  if (startInput) startInput.value = formatDateForInput(startDate);
  if (endInput) endInput.value = formatDateForInput(today);

  applyDateFilter();
}

function exportReports() {
  showNotification("Exporting reports as PDF...", "info");
  setTimeout(() => {
    showNotification("Reports exported successfully", "success");
  }, 1500);
}

function printReports() {
  window.print();
}

// ========================================
// PAGE: MODIFY-RESERVATIONS.HTML (DB - VIEW + DELETE ONLY)
// ========================================

let allReservations_Manager = [];
let filteredReservations_Manager = [];

async function initModifyReservations() {
  try {
    await loadReservationsForManager();
    filteredReservations_Manager = [...allReservations_Manager];
    renderReservationsTable();
    updateReservationSummary();
  } catch (e) {
    console.error(e);
    showNotification("Failed to load reservations from server", "error");
  }
}

async function loadReservationsForManager() {
  const base = getAppBasePath();
  const res = await fetch(base + "/api/reservations");
  if (!res.ok) throw new Error("Failed to fetch reservations: " + res.status);

  const list = await res.json();

  allReservations_Manager = (list || []).map((r) => {
    const checkin = r.checkinDate;
    const checkout = r.checkoutDate;
    const nights = calculateNights(checkin, checkout);

    return {
      reservationNo: r.reservationNo,
      guestName: r.guestName,
      phone: r.phone || "-",
      roomNumber: r.roomNumber,
      roomType: r.roomType,
      checkinDate: checkin,
      checkoutDate: checkout,
      nights: nights,
      status: r.status || "confirmed",
    };
  });

  allReservations_Manager.sort((a, b) => (b.reservationNo || "").localeCompare(a.reservationNo || ""));
}

function searchReservations() {
  const term = document.getElementById("searchInput")?.value.trim().toLowerCase() || "";

  if (!term) {
    filteredReservations_Manager = [...allReservations_Manager];
  } else {
    filteredReservations_Manager = allReservations_Manager.filter(
      (r) =>
        (r.reservationNo || "").toLowerCase().includes(term) ||
        (r.guestName || "").toLowerCase().includes(term) ||
        (r.phone || "").toLowerCase().includes(term) ||
        String(r.roomNumber || "").includes(term)
    );
  }

  renderReservationsTable();
  updateReservationSummary();
}

function renderReservationsTable() {
  const tbody = document.getElementById("reservationsTableBody");
  const emptyState = document.getElementById("emptyState");
  if (!tbody) return;

  if (filteredReservations_Manager.length === 0) {
    tbody.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }
  if (emptyState) emptyState.style.display = "none";

  let html = "";
  filteredReservations_Manager.forEach((r) => {
    html += `
      <tr>
        <td><strong>${r.reservationNo}</strong></td>
        <td>
          ${r.guestName}<br>
          <span style="font-size:12px;color:#718096;">${r.phone}</span>
        </td>
        <td>${r.roomNumber} <span style="font-size:12px;color:#718096;">(${r.roomType})</span></td>
        <td>${formatDate(r.checkinDate)}</td>
        <td>${formatDate(r.checkoutDate)}</td>
        <td>${r.nights}</td>
        <td>-</td>
        <td>
          <span class="status-badge status-booked">
            ${String(r.status).toUpperCase()}
          </span>
        </td>
        <td>
          <button class="btn-small btn-danger" onclick="deleteReservation('${r.reservationNo}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

async function deleteReservation(reservationNo) {
  if (!confirm(`Delete reservation ${reservationNo}? This cannot be undone.`)) return;

  try {
    const base = getAppBasePath();
    const params = new URLSearchParams();
    params.append("reservationNo", reservationNo);

    const res = await fetch(base + "/api/reservations/delete", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json().catch(() => ({ success: false, message: "Bad server response" }));

    if (!res.ok || !data.success) {
      showNotification(data.message || "Delete failed", "error");
      return;
    }

    showNotification("Reservation deleted", "success");

    allReservations_Manager = allReservations_Manager.filter((r) => r.reservationNo !== reservationNo);
    filteredReservations_Manager = filteredReservations_Manager.filter((r) => r.reservationNo !== reservationNo);

    renderReservationsTable();
    updateReservationSummary();
  } catch (e) {
    console.error(e);
    showNotification("Server not reachable", "error");
  }
}

function updateReservationSummary() {
  const total = filteredReservations_Manager.length;

  const totalEl = document.getElementById("totalCount");
  const confirmedEl = document.getElementById("confirmedCount");
  const checkedInEl = document.getElementById("checkedInCount");
  const pendingEl = document.getElementById("pendingCount");
  const cancelledEl = document.getElementById("cancelledCount");

  if (totalEl) totalEl.textContent = total;

  const countBy = (s) => filteredReservations_Manager.filter((r) => (r.status || "").toLowerCase() === s).length;

  if (confirmedEl) confirmedEl.textContent = countBy("confirmed");
  if (checkedInEl) checkedInEl.textContent = countBy("checked-in");
  if (pendingEl) pendingEl.textContent = countBy("pending");
  if (cancelledEl) cancelledEl.textContent = countBy("cancelled");
}

// ========================================
// PAGE: ADD-NEW-RESERVATION.HTML (DB + BOOKED CHECK)
// ========================================

let roomTypesMap = {};
let reservationsCache = [];

async function loadRoomTypesFromDB() {
  const base = getAppBasePath();

  const res = await fetch(base + "/api/room-types");
  if (!res.ok) throw new Error("Failed to fetch room types");
  const data = await res.json();

  roomTypesMap = {};
  data.forEach((rt) => {
    roomTypesMap[rt.type] = rt;
  });

  const roomTypeSelect = document.getElementById("roomType");
  if (!roomTypeSelect) return;

  const placeholder = roomTypeSelect.querySelector("option[disabled]");

  roomTypeSelect.innerHTML = "";
  if (placeholder) roomTypeSelect.appendChild(placeholder);

  data.forEach((rt) => {
    const opt = document.createElement("option");
    opt.value = rt.type;
    opt.textContent = rt.typeName;
    roomTypeSelect.appendChild(opt);
  });
}

async function loadReservationsFromDB() {
  const base = getAppBasePath();

  const res = await fetch(base + "/api/reservations");
  if (!res.ok) throw new Error("Failed to fetch reservations");
  reservationsCache = await res.json();
}

// ---- Date overlap helpers ----
function parseYMD(dateStr) {
  const [y, m, d] = String(dateStr).split("-").map(Number);
  return new Date(y, m - 1, d);
}

function rangesOverlap(checkinA, checkoutA, checkinB, checkoutB) {
  const aStart = parseYMD(checkinA);
  const aEnd = parseYMD(checkoutA);
  const bStart = parseYMD(checkinB);
  const bEnd = parseYMD(checkoutB);

  return aStart < bEnd && bStart < aEnd;
}

function isRoomBookedForDates(roomNumber, checkinDate, checkoutDate) {
  if (!checkinDate || !checkoutDate) return false;

  return reservationsCache.some((r) => {
    if (String(r.roomNumber) !== String(roomNumber)) return false;

    const status = String(r.status || "").toLowerCase();
    if (status === "cancelled") return false;

    if (!r.checkinDate || !r.checkoutDate) return false;

    return rangesOverlap(checkinDate, checkoutDate, r.checkinDate, r.checkoutDate);
  });
}

// ---- Update room numbers dropdown with availability ----
function updateRoomNumbersFromDB() {
  const roomType = document.getElementById("roomType")?.value;
  const roomNumberSelect = document.getElementById("roomNumber");
  const roomHint = document.getElementById("roomAvailabilityHint");

  const checkinDate = document.getElementById("checkinDate")?.value;
  const checkoutDate = document.getElementById("checkoutDate")?.value;
  const datesReady = !!(checkinDate && checkoutDate);

  if (!roomNumberSelect) return;

  roomNumberSelect.innerHTML = "";

  if (!roomType || !roomTypesMap[roomType]) {
    const option = document.createElement("option");
    option.value = "";
    option.disabled = true;
    option.selected = true;
    option.textContent = "-- First select Room Type --";
    roomNumberSelect.appendChild(option);

    roomNumberSelect.disabled = true;
    if (roomHint) {
      roomHint.textContent = "Select a room type first";
      roomHint.style.color = "#718096";
    }
    return;
  }

  const rooms = roomTypesMap[roomType].rooms || [];

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "-- Select Room Number --";
  roomNumberSelect.appendChild(defaultOption);

  let availableCount = 0;
  let bookedCount = 0;

  rooms.forEach((rn) => {
    const opt = document.createElement("option");
    opt.value = rn;

    if (!datesReady) {
      opt.textContent = `${rn} (Select dates)`;
      roomNumberSelect.appendChild(opt);
      return;
    }

    const booked = isRoomBookedForDates(rn, checkinDate, checkoutDate);

    if (booked) {
      bookedCount++;
      opt.textContent = `${rn} (Booked)`;
      opt.disabled = true;
    } else {
      availableCount++;
      opt.textContent = `${rn} (Available)`;
    }

    roomNumberSelect.appendChild(opt);
  });

  roomNumberSelect.disabled = false;

  if (roomHint) {
    if (!datesReady) {
      roomHint.textContent = "Select check-in & check-out dates to check availability";
      roomHint.style.color = "#dd6b20";
    } else {
      roomHint.textContent = `${availableCount} available, ${bookedCount} booked`;
      roomHint.style.color = availableCount > 0 ? "#38a169" : "#e53e3e";
    }
  }

  const selectedRoom = roomNumberSelect.value;
  if (selectedRoom && datesReady) {
    if (isRoomBookedForDates(selectedRoom, checkinDate, checkoutDate)) {
      roomNumberSelect.value = "";
    }
  }
}

// ---- Price helpers ----
function getRoomPriceFromDB(roomType) {
  const rt = roomTypesMap[roomType];
  if (!rt) return getRoomPrice(roomType);
  return Number(rt.price || 0);
}

function calculatePriceFromDB() {
  const roomType = document.getElementById("roomType")?.value;
  const checkinDate = document.getElementById("checkinDate")?.value;
  const checkoutDate = document.getElementById("checkoutDate")?.value;
  const roomNumber = document.getElementById("roomNumber")?.value;

  const priceSummary = document.getElementById("priceSummary");
  if (!roomType || !checkinDate || !checkoutDate) {
    if (priceSummary) priceSummary.style.display = "none";
    return;
  }

  const nights = calculateNights(checkinDate, checkoutDate);
  if (nights <= 0) {
    showNotification("Check-out date must be after check-in date", "error");
    if (priceSummary) priceSummary.style.display = "none";
    return;
  }

  const roomPrice = getRoomPriceFromDB(roomType);
  const roomCharges = roomPrice * nights;
  const tax = roomCharges * 0.18;
  const total = roomCharges + tax;

  const rt = roomTypesMap[roomType];
  const roomTypeText = rt?.typeName || roomType;
  const roomInfo = roomNumber ? `${roomTypeText} - Room ${roomNumber}` : roomTypeText;

  document.getElementById("summaryRoomType").textContent = roomInfo;
  document.getElementById("summaryNights").textContent = nights + (nights > 1 ? " nights" : " night");
  document.getElementById("summaryRoomCharges").textContent = "Rs." + roomCharges.toLocaleString();
  document.getElementById("summaryTax").textContent = "Rs." + tax.toLocaleString();
  document.getElementById("summaryTotal").textContent = "Rs." + total.toLocaleString();

  if (priceSummary) priceSummary.style.display = "block";
}

// ---- Reservation number + date min ----
function generateReservationNo() {
  const prefix = "RES";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}${timestamp}${random}`;
}

function setMinDates() {
  const today = new Date().toISOString().split("T")[0];
  const checkinInput = document.getElementById("checkinDate");
  const checkoutInput = document.getElementById("checkoutDate");

  if (checkinInput) checkinInput.min = today;

  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener("change", function () {
      checkoutInput.min = this.value;
      if (checkoutInput.value && checkoutInput.value < this.value) {
        checkoutInput.value = "";
      }
    });
  }
}

// ---- INIT ----
async function initAddReservation() {
  const resNoField = document.getElementById("reservationNo");
  if (resNoField) resNoField.value = generateReservationNo();

  setMinDates();

  try {
    await loadRoomTypesFromDB();
  } catch (e) {
    console.log("Room types fetch failed:", e);
    showNotification("Could not load room types from server", "error");
  }

  try {
    await loadReservationsFromDB();
  } catch (e) {
    console.log("Reservations fetch failed:", e);
    showNotification("Could not load reservations to check availability", "error");
  }

  const roomType = document.getElementById("roomType");
  const roomNumber = document.getElementById("roomNumber");
  const checkinDate = document.getElementById("checkinDate");
  const checkoutDate = document.getElementById("checkoutDate");

  if (roomType)
    roomType.addEventListener("change", function () {
      updateRoomNumbersFromDB();
      calculatePriceFromDB();
    });

  if (checkinDate)
    checkinDate.addEventListener("change", function () {
      updateRoomNumbersFromDB();
      calculatePriceFromDB();
    });

  if (checkoutDate)
    checkoutDate.addEventListener("change", function () {
      updateRoomNumbersFromDB();
      calculatePriceFromDB();
    });

  if (roomNumber) roomNumber.addEventListener("change", calculatePriceFromDB);

  const form = document.getElementById("reservationForm");
  if (form) form.addEventListener("submit", saveReservation);

  updateRoomNumbersFromDB();

  setTimeout(() => showNotification("Fill in the reservation details", "info"), 300);
}