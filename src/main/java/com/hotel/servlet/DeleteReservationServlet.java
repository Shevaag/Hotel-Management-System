package com.hotel.servlet; //handles HTTP requests to delete hotel reservations from the system

import com.hotel.repo.ReservationRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/api/reservations/delete")
public class DeleteReservationServlet extends HttpServlet {

    private final ReservationRepository repo = new ReservationRepository(); //Creates a connection to the reservation repository to perform database operations

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException { //handles POST requests to delete a reservation
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