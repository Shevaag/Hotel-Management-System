package com.hotel.servlet; //handles GET requests to fetch ALL room types from the system

import com.hotel.repo.RoomTypeRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet("/api/room-types")
public class RoomTypesServlet extends HttpServlet {

    private final RoomTypeRepository repo = new RoomTypeRepository(); //Creates a connection to the room type repository to fetch all room type data from the database

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException { //handles GET requests to retrieve all room types
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        List<Document> docs = repo.findAll();

        // Convert list of Documents to JSON array string
        String json = docs.stream()
                .map(Document::toJson)
                .collect(Collectors.joining(",", "[", "]"));

        resp.getWriter().write(json);
    }
}