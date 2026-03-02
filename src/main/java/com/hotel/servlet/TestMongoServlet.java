package com.hotel.servlet;

import com.hotel.config.MongoDBConnection;
import com.mongodb.client.MongoCollection;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;

import java.io.IOException;

@WebServlet("/test-mongo")
public class TestMongoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        MongoCollection<Document> col = MongoDBConnection.db().getCollection("test");
        col.insertOne(new Document("msg", "MongoDB connected from Tomcat!"));

        resp.setContentType("text/plain");
        resp.getWriter().println("Inserted into MongoDB successfully!");
    }
}