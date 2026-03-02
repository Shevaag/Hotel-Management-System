package com.hotel.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoDBConnection {
    private static MongoClient client;

    private static final String URI = "mongodb://localhost:27017";
    private static final String DB_NAME = "hotel_reservation"; // your DB name

    public static MongoDatabase db() {
        if (client == null) {
            client = MongoClients.create(URI);
        }
        return client.getDatabase(DB_NAME);
    }
}