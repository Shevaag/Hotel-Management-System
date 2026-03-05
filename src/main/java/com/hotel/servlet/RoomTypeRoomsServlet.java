package com.hotel.servlet;

import com.hotel.repo.RoomTypeRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/api/room-types/rooms")
public class RoomTypeRoomsServlet extends HttpServlet {

    private final RoomTypeRepository repo = new RoomTypeRepository();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String action = req.getParameter("action"); // add | remove
        String type = req.getParameter("type");
        String roomNumber = req.getParameter("roomNumber");

        if (isBlank(action) || isBlank(type) || isBlank(roomNumber)) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Missing fields\"}");
            return;
        }

        action = action.trim().toLowerCase();
        type = type.trim().toLowerCase();
        roomNumber = roomNumber.trim();

        boolean ok;
        if ("add".equals(action)) {
            ok = repo.addRoomToType(type, roomNumber);
        } else if ("remove".equals(action)) {
            ok = repo.removeRoomFromType(type, roomNumber);
        } else {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Invalid action\"}");
            return;
        }

        if (!ok) {
            resp.setStatus(404);
            resp.getWriter().write("{\"success\":false,\"message\":\"Room type not found\"}");
            return;
        }

        resp.getWriter().write("{\"success\":true}");
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
}