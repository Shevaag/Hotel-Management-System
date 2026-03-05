package com.hotel.servlet;

import com.hotel.repo.RoomTypeRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;

@WebServlet("/api/room-types/*")
public class RoomTypeByTypeServlet extends HttpServlet {

    private final RoomTypeRepository repo = new RoomTypeRepository();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // URL: /api/room-types/deluxe
        String pathInfo = req.getPathInfo(); // "/deluxe"
        if (pathInfo == null || pathInfo.equals("/") || pathInfo.trim().isEmpty()) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Room type is required\"}");
            return;
        }

        String type = pathInfo.substring(1).trim().toLowerCase();

        Document doc = repo.findByType(type);

        if (doc == null) {
            resp.setStatus(404);
            resp.getWriter().write("{\"success\":false,\"message\":\"Room type not found\"}");
            return;
        }

        resp.getWriter().write(doc.toJson());
    }
}