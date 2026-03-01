# Lecture 7 — Express App Setup, Middleware, CORS, Cookie Parser, Async Handling, API Error/Response

## 🔹 Quick Revision (Top Summary)

- DB connection returns a Promise → use .then()/.catch()
- Start server only after DB connects
- app.js holds Express configuration
- Install and configure cors and cookie-parser
- CORS controls which origins can access API
- Middleware functions run before route handlers
- Express middleware signature: (req, res, next) or (err, req, res, next)
- Limit request body size using express.json()
- express.urlencoded() handles form data
- express.static() serves public files
- AsyncHandler avoids repetitive try/catch
- Custom ApiError and ApiResponse standardize API output

---

## 🔹 Definitions

### Promise
An object representing completion or failure of an asynchronous operation.

### Middleware
A function executed during request–response cycle before reaching route handler.

### CORS
Security mechanism controlling cross-origin HTTP requests.

### Cookie Parser
Middleware to parse cookies from incoming requests.

### Async Handler
Utility function that handles async errors automatically.

### API Error Class
Custom error structure for consistent error responses.

---

## 🔹 Explanation (Simple Understanding)

### Starting Server After DB Connection

Since database connection is asynchronous, server should start only after successful connection.

Otherwise, routes depending on DB may fail.

---

## 🔹 Using Promise (.then/.catch)

Example:

    connectDB()
      .then(() => {
        app.listen(process.env.PORT || 8000, () => {
          console.log("Server running");
        });
      })
      .catch((err) => {
        console.error("DB connection failed:", err);
      });

---

## 🔹 app.js — Central Express Configuration

Instead of putting everything in index.js, configuration is separated into app.js.

This improves:

- Maintainability
- Scalability
- Clean architecture

---

## 🔹 Installing Required Middleware

    npm install cors cookie-parser

---

## 🔹 CORS Configuration

CORS controls which domains can access your backend.

Import and use:

    import cors from "cors";

    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
      })
    );

In .env:

    CORS_ORIGIN=*

credentials: true allows cookies and auth headers.

---

## 🔹 JSON Body Parsing

Limits size of incoming JSON data.

    app.use(express.json({ limit: "16kb" }));

Prevents abuse via large payloads.

---

## 🔹 URL Encoded Data Parsing

Handles form submissions.

    app.use(
      express.urlencoded({
        extended: true,
        limit: "16kb"
      })
    );

extended: true allows nested objects.

---

## 🔹 Serving Static Files

Allows access to files in public folder.

    app.use(express.static("public"));

Example:

public/image.png → accessible via URL

---

## 🔹 Cookie Parser

Reads cookies from request headers.

    import cookieParser from "cookie-parser";

    app.use(cookieParser());

Useful for authentication and sessions.

---

## 🔹 Middleware Concept

Middleware functions execute in sequence during request processing.

Flow:

Request → Middleware → Route Handler → Response

---

### Basic Middleware Signature

    (req, res, next)

req → request data  
res → response object  
next → passes control to next middleware  

---

### Error Middleware Signature

    (err, req, res, next)

Used for centralized error handling.

---

## 🔹 Async Handler Utility

Async route handlers often require try/catch.

Instead of repeating it, create wrapper function.

---

### utils/asyncHandler.js

    const asyncHandler = (fn) => (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };

    export default asyncHandler;

Now routes automatically forward errors.

---

## 🔹 API Error Handling

Default errors are inconsistent.

Custom error class standardizes responses.

---

### ApiError Class

    class ApiError extends Error {
      constructor(statusCode, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
      }
    }

    export default ApiError;

---

## 🔹 API Response Class

Ensures consistent success responses.

---

### ApiResponse Class

    class ApiResponse {
      constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
      }
    }

    export default ApiResponse;

---

## 🔹 Example app.js (Complete)

    import express from "express";
    import cors from "cors";
    import cookieParser from "cookie-parser";

    const app = express();

    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
      })
    );

    app.use(express.json({ limit: "16kb" }));

    app.use(
      express.urlencoded({
        extended: true,
        limit: "16kb"
      })
    );

    app.use(express.static("public"));

    app.use(cookieParser());

    export default app;

---

## 🔹 Key Points / Important Facts

- Start server after DB connection
- Middleware processes requests sequentially
- CORS configuration is essential for frontend communication
- Limit request size for security
- Static files served from public folder
- AsyncHandler reduces repetitive code
- Custom error/response classes standardize APIs

---

## 🔹 Common Mistakes

- Starting server before DB connects
- Forgetting middleware order matters
- Allowing unlimited request size
- Hardcoding CORS origin
- Not handling async errors
- Returning inconsistent API responses

---

## 🔹 Interview Questions

### Basic

1. What is middleware in Express?
2. What is CORS?
3. Why use cookie-parser?
4. What is express.json() used for?
5. Difference between JSON and URL encoded data?

### Intermediate

6. Why wrap async route handlers?
7. How does middleware chaining work?
8. Why create custom error classes?
9. Difference between app.use() and app.get()?
10. What happens if next() is not called?

---

## 🔹 Practice Questions

1. Configure Express app with CORS and cookie parser
2. Add JSON body size limit
3. Create custom middleware logging requests
4. Implement AsyncHandler wrapper
5. Throw and handle custom API error

---

## 🔹 Mini Project Task

Build a base API server with production-ready setup.

Requirements:

- DB connection
- app.js configuration
- CORS support
- Cookie parsing
- Static file serving
- Async handler
- Custom error and response classes

Optional Enhancements:

- Add global error middleware
- Add request logging
- Add authentication middleware

---

## 🔹 Quick Revision

- DB connect → then start server
- app.js handles Express configuration
- Middleware processes requests before routes
- CORS controls cross-origin access
- Cookie parser reads cookies
- AsyncHandler handles async errors
- ApiError/ApiResponse standardize API output