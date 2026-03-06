package com.hotel.repo;

import com.hotel.config.MongoDBConnection;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.*;

public class RoomTypeRepository {

    private final MongoCollection<Document> roomTypes =
            MongoDBConnection.db().getCollection("roomTypes");

    public List<Document> findAll() { //gets all room types
        return roomTypes.find().into(new ArrayList<>());
    }

    public Document findByType(String type) { //find one specific roomtype
        return roomTypes.find(eq("type", type)).first();
    }

    // used by RoomTypeUpdateServlet
    public boolean updateTypeFields(String type, //update the details of a room
                                    String typeName,
                                    int price,
                                    int maxAdults,
                                    int maxChildren,
                                    List<String> features) {

        UpdateResult result = roomTypes.updateOne(
                eq("type", type),
                combine(
                        set("typeName", typeName),
                        set("price", price),
                        set("maxAdults", maxAdults),
                        set("maxChildren", maxChildren),
                        set("features", features == null ? List.of() : features)
                )
        );

        return result.getMatchedCount() > 0;
    }

    // used by RoomTypeRoomsServlet (add room number into rooms array)
    public boolean addRoomToType(String type, String roomNumber) { //adds a room number to a room type's list of room
        UpdateResult result = roomTypes.updateOne(
                eq("type", type),
                addToSet("rooms", roomNumber)
        );
        return result.getMatchedCount() > 0;
    }

    // used by RoomTypeRoomsServlet (remove room number from rooms array)
    public boolean removeRoomFromType(String type, String roomNumber) { //removes a room number from a room type
        UpdateResult result = roomTypes.updateOne(
                eq("type", type),
                pull("rooms", roomNumber)
        );
        return result.getMatchedCount() > 0;
    }
}