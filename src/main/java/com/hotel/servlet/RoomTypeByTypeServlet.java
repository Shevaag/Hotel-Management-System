package com.hotel.servlet; //handles GET requests to fetch a specific room type by its name/type identifier

import com.hotel.repo.RoomTypeRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;

@WebServlet("/api/room-types/*")
public class RoomTypeByTypeServlet extends HttpServlet {

    private final RoomTypeRepository repo = new RoomTypeRepository(); //Creates a connection to the room type repository to fetch room type data from the database

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException { //handles GET requests to retrieve a specific room type.
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