package com.hotel.servlet;

import com.hotel.repo.ReservationRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;

@WebServlet("/api/reservations/*")
public class ReservationByNoServlet extends HttpServlet {

    private final ReservationRepository repo = new ReservationRepository();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // URL: /api/reservations/RES123...
        String pathInfo = req.getPathInfo(); // "/RES123..."
        if (pathInfo == null || pathInfo.equals("/") || pathInfo.trim().isEmpty()) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Reservation number is required\"}");
            return;
        }

        String reservationNo = pathInfo.substring(1).trim(); // remove leading "/"

        Document doc = repo.findByReservationNo(reservationNo);

        if (doc == null) {
            resp.setStatus(404);
            resp.getWriter().write("{\"success\":false,\"message\":\"Reservation not found\"}");
            return;
        }

        resp.getWriter().write(doc.toJson());
    }
}