package com.hotel.servlet;

import com.hotel.repo.UserRepository;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.bson.Document;

import java.io.IOException;

@WebServlet("/api/login")
public class LoginServlet extends HttpServlet {

    private final UserRepository repo = new UserRepository();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String role = req.getParameter("role");
        String securityCode = req.getParameter("securityCode"); // only manager

        // ✅ DEBUG 1: what backend receives
        System.out.println("LOGIN => username=" + username + ", password=" + password + ", role=" + role + ", securityCode=" + securityCode);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        if (isBlank(username) || isBlank(password) || isBlank(role)) {
            resp.setStatus(400);
            resp.getWriter().write("{\"success\":false,\"message\":\"Missing fields\"}");
            return;
        }

        role = role.trim().toUpperCase();
        Document user = repo.findByUsernamePasswordRole(username.trim(), password, role);

        // ✅ DEBUG 2: did MongoDB find a matching user?
        System.out.println("USER FOUND? " + (user != null));

        if (user == null) {
            resp.setStatus(401);
            resp.getWriter().write("{\"success\":false,\"message\":\"Invalid username or password\"}");
            return;
        }

        if ("MANAGER".equals(role)) {
            String storedCode = user.getString("securityCode");
            if (isBlank(securityCode) || storedCode == null || !storedCode.equals(securityCode.trim())) {
                resp.setStatus(401);
                resp.getWriter().write("{\"success\":false,\"message\":\"Invalid security code\"}");
                return;
            }
        }

        HttpSession session = req.getSession(true);
        session.setAttribute("username", user.getString("username"));
        session.setAttribute("role", user.getString("role"));

        resp.getWriter().write("{\"success\":true,\"role\":\"" + user.getString("role") + "\"}");
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }
}