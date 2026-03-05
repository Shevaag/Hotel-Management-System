package com.hotel.repo;

import com.hotel.config.MongoDBConnection;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;

public class UserRepository {
    private final MongoCollection<Document> users =
            MongoDBConnection.db().getCollection("users");

    public Document findByUsernamePasswordRole(String username, String password, String role) {
        return users.find(Filters.and(
                Filters.eq("username", username),
                Filters.eq("password", password),
                Filters.eq("role", role)
        )).first();
    }
}