package com.hotel.servlet; //handles POST requests to update an existing room type's details

import com.hotel.repo.RoomTypeRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet("/api/room-types/update")
public class RoomTypeUpdateServlet extends HttpServlet {

    private final RoomTypeRepository repo = new RoomTypeRepository(); //Creates a connection to the room type repository for database operations

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException { //handles POST requests to update room type information
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        String type = req.getParameter("type"); // standard/deluxe...
        String typeName = req.getParameter("typeName");
        String priceStr = req.getParameter("price");
        String maxAdultsStr = req.getParameter("maxAdults");
        String maxChildrenStr = req.getParameter("maxChildren");
        String featuresCsv = req.getParameter("features"); // "WiFi,TV,AC"

        if (isBlank(type) || isBlank(typeName) || isBlank(priceStr) || isBlank(maxAdultsStr) || isBlank(maxChildrenStr)) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Missing required fields\"}");
            return;
        }

        int price = parseIntSafe(priceStr, -1);
        int maxAdults = parseIntSafe(maxAdultsStr, -1);
        int maxChildren = parseIntSafe(maxChildrenStr, -1);

        if (price < 0 || maxAdults < 0 || maxChildren < 0) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Invalid numbers\"}");
            return;
        }

        List<String> features = List.of();
        if (!isBlank(featuresCsv)) {
            features = Arrays.stream(featuresCsv.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());
        }

        boolean ok = repo.updateTypeFields(type.trim().toLowerCase(), typeName.trim(), price, maxAdults, maxChildren, features);

        if (!ok) {
            resp.setStatus(404);
            resp.getWriter().write("{\"success\":false,\"message\":\"Room type not found\"}");
            return;
        }

        resp.getWriter().write("{\"success\":true}");
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }
    private int parseIntSafe(String s, int fallback) { try { return Integer.parseInt(s.trim()); } catch (Exception e) { return fallback; } }
}