package com.hotel.servlet;

import com.hotel.repo.ReservationRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/api/reservations/delete")
public class DeleteReservationServlet extends HttpServlet {

    private final ReservationRepository repo = new ReservationRepository();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String reservationNo = req.getParameter("reservationNo");

        if (reservationNo == null || reservationNo.trim().isEmpty()) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Missing reservationNo\"}");
            return;
        }

        boolean deleted = repo.deleteByReservationNo(reservationNo.trim());

        if (!deleted) {
            resp.setStatus(404);
            resp.getWriter().write("{\"success\":false,\"message\":\"Reservation not found\"}");
            return;
        }

        resp.getWriter().write("{\"success\":true}");
    }
}