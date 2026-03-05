package com.hotel.repo;

import com.hotel.config.MongoDBConnection;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import com.mongodb.client.result.DeleteResult;

import java.time.Instant;

public class ReservationRepository {

    private final MongoCollection<Document> reservations =
            MongoDBConnection.db().getCollection("reservations");

    public boolean existsByReservationNo(String reservationNo) {
        return reservations.find(Filters.eq("reservationNo", reservationNo)).first() != null;
    }

    public void insert(Document doc) {
        doc.append("createdAt", Instant.now().toString());
        reservations.insertOne(doc);
    }

    public List<Document> findAll() {
        List<Document> list = new ArrayList<>();
        reservations.find().sort(new Document("bookingDate", -1)).into(list); // newest first
        return list;
    }

    public Document findByReservationNo(String reservationNo) {
        return reservations.find(Filters.eq("reservationNo", reservationNo)).first();
    }

    public boolean deleteByReservationNo(String reservationNo) {

        DeleteResult result =
                reservations.deleteOne(Filters.eq("reservationNo", reservationNo));

        return result.getDeletedCount() > 0;
    }

}