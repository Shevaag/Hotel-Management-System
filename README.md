Ocean View Resort – Hotel Reservation System
Overview

The Ocean View Resort Hotel Reservation System is a web-based application designed to manage hotel room reservations efficiently.

The system replaces manual booking processes with a computerized solution.

It allows hotel staff to manage:

room reservations

room types

guest bookings

billing

reports

The system is implemented using a three-tier architecture:

Frontend interface

Backend web services

MongoDB database

Features
User Authentication

Secure login system for two roles:

Manager

Receptionist

Role-based access to system functionalities.

Reservation Management

Add new reservations.

View all reservation details.

Search reservations by:

reservation number

guest name

room number.

Delete reservations if required.

Room Management

Manage room types and room numbers.

Add new rooms dynamically.

Remove existing rooms.

Update room type details including:

price

guest capacity

room features.

Room Availability Checking

Prevents double booking of rooms.

Checks whether a room is already reserved for selected dates.

Displays room status as:

Available

Booked.

Billing System

Calculates room charges based on:

room type

number of nights stayed.

Automatically calculates tax.

Generates printable bill invoices.

Checkout functionality removes completed reservations from the database.

Reports

Displays reservation statistics.

Allows filtering reports by:

start date

end date.

Reports can be printed for management use.

Help System

Separate help guides are available for:

Receptionist

Manager.

Explains how to use the system functions.

System Architecture

The application follows a 3-tier architecture.

Frontend Layer

HTML

CSS

JavaScript

Provides the interactive user interface.

Backend Layer

Java Servlets

REST-style API endpoints

Handles business logic and communication with the database.

Database Layer

MongoDB

Stores all system data.

Technologies Used

Java – Backend development.

Java Servlets – Web services and API handling.

MongoDB – NoSQL database.

HTML – Page structure.

CSS – Styling and layout.

JavaScript – Client-side logic and validation.

Apache Tomcat – Web server for running the application.

Project Structure
src
 ├── main
 │   ├── java
 │   │   └── com.hotel
 │   │        ├── config
 │   │        │     └── MongoDBConnection.java
 │   │        ├── repo
 │   │        │     ├── ReservationRepository.java
 │   │        │     ├── RoomTypeRepository.java
 │   │        │     └── UserRepository.java
 │   │        └── servlet
 │   │              ├── LoginServlet.java
 │   │              ├── ReservationsServlet.java
 │   │              ├── ReservationByNoServlet.java
 │   │              ├── DeleteReservationServlet.java
 │   │              ├── RoomTypesServlet.java
 │   │              ├── RoomTypeUpdateServlet.java
 │   │              └── RoomTypeRoomsServlet.java
 │   └── webapp
 │        └── frontend
 │             └── pages
 │                  ├── index.html
 │                  ├── receptionist-dashboard.html
 │                  ├── manager-dashboard.html
 │                  ├── add-new-reservation.html
 │                  ├── view-booking-details.html
 │                  ├── calculate-printbill.html
 │                  ├── manage-rooms.html
 │                  └── view-report.html

 How to Run the Project
Requirements

Java JDK 17 or later

Apache Tomcat

MongoDB

Maven

Step 1 – Start MongoDB

Make sure MongoDB is running locally:

mongodb://localhost:27017
Step 2 – Build the Project

Run the following command:

mvn clean package
Step 3 – Deploy to Tomcat

Deploy the generated .war file to the Tomcat webapps folder.

Example:

target/webapp-1.0-SNAPSHOT.war
Step 4 – Start Tomcat

Run:

startup.bat
Step 5 – Open the Application

Open your browser and navigate to:

http://localhost:8080/webapp-1.0-SNAPSHOT/frontend/pages/index.html

Design Patterns Used
Repository Pattern

Used to separate database operations from application logic.

Examples:

ReservationRepository

RoomTypeRepository

UserRepository

Key Functionalities Implemented

Dynamic room availability checking.

Date overlap detection for reservations.

Real-time bill calculation.

Role-based authentication system.

Interactive user interface with notifications.

REST-based backend services.

Version Control

The project was developed using Git and GitHub.

Development workflow included the following branches:

frontend – user interface development.

backend – backend logic and database integration.

main – final integrated version of the system.

Author
Natkunaraj Shevaag

Maven – Project build and dependency management.

Git & GitHub – Version control and project repository.
