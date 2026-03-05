package com.hotel.servlet;

import com.hotel.repo.ReservationRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet("/api/reservations")
public class ReservationsServlet extends HttpServlet {

    private final ReservationRepository repo = new ReservationRepository();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        var list = repo.findAll();
        String json = list.stream()
                .map(Document::toJson)
                .collect(Collectors.joining(",", "[", "]"));

        resp.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

        String reservationNo = req.getParameter("reservationNo");
        String guestName = req.getParameter("guestName");
        String address = req.getParameter("address");
        String phone = req.getParameter("phone");
        String email = req.getParameter("email");
        String roomType = req.getParameter("roomType");
        String roomNumber = req.getParameter("roomNumber");
        String checkinDate = req.getParameter("checkinDate");
        String checkoutDate = req.getParameter("checkoutDate");
        String adults = req.getParameter("adults");
        String children = req.getParameter("children");
        String specialRequests = req.getParameter("specialRequests");

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (isBlank(reservationNo) || isBlank(guestName) || isBlank(address) || isBlank(phone) ||
                isBlank(email) || isBlank(roomType) || isBlank(roomNumber) ||
                isBlank(checkinDate) || isBlank(checkoutDate) || isBlank(adults)) {

            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Missing required fields\"}");
            return;
        }

        if (repo.existsByReservationNo(reservationNo.trim())) {
            resp.setStatus(409);
            resp.getWriter().write("{\"success\":false,\"message\":\"Reservation number already exists\"}");
            return;
        }

        Document doc = new Document()
                .append("reservationNo", reservationNo.trim())
                .append("guestName", guestName.trim())
                .append("address", address.trim())
                .append("phone", phone.trim())
                .append("email", email.trim())
                .append("roomType", roomType.trim())
                .append("roomNumber", roomNumber.trim())
                .append("checkinDate", checkinDate.trim())
                .append("checkoutDate", checkoutDate.trim())
                .append("adults", parseIntSafe(adults, 1))
                .append("children", parseIntSafe(children, 0))
                .append("specialRequests", specialRequests == null ? "" : specialRequests.trim())
                .append("status", "confirmed");

        repo.insert(doc);

        resp.getWriter().write("{\"success\":true,\"reservationNo\":\"" + reservationNo.trim() + "\"}");
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private int parseIntSafe(String s, int fallback) {
        try { return Integer.parseInt(s); } catch (Exception e) { return fallback; }
    }
}