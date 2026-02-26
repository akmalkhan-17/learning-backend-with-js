# Lecture 1 — Express Introduction, Server Listening, GET Method, req & res, Axios

## 1. Backend Development

Backend development refers to server-side programming responsible for:

- Processing client requests
- Executing business logic
- Communicating with databases
- Authentication and authorization
- Sending responses to the frontend

Frontend = user interface  
Backend = logic + data + processing

Example: Login system

1. User enters credentials (frontend)
2. Data sent to server
3. Server verifies credentials
4. Server sends success/failure response
5. Frontend displays result

---

## 2. Node.js and Express

Node.js allows JavaScript to run on the server instead of the browser.

However, building servers using only Node.js core modules is complex.

Express is a framework built on top of Node.js that simplifies backend development.

### Why Express is used

- Minimal and lightweight
- Simple routing
- Middleware support
- Faster development
- Widely used in industry

---

## 3. Project Setup

### Initialize Node Project

    npm init -y

Creates a package.json file containing project metadata and dependencies.

### Install Express

    npm install express

---

## 4. Creating an Express Server

    const express = require("express");

    const app = express();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

### Explanation

require("express")  
→ Imports Express library

express()  
→ Creates application instance (server object)

app.listen(port, callback)  
→ Starts server and waits for incoming requests

---

## 5. Server Listening

Listening means the server continuously waits for client requests on a specific port.

Without listening, the server cannot communicate.

### Port Concept

A port is a communication endpoint.

Examples:

- 80 → HTTP
- 443 → HTTPS
- 3000 → Common development port

Access locally using:

http://localhost:3000

localhost refers to your own machine.

---

## 6. HTTP Methods Overview

HTTP methods specify the type of operation requested.

Common methods:

GET → Retrieve data  
POST → Create new data  
PUT → Update data  
DELETE → Remove data  

This lecture focuses on GET.

---

## 7. GET Method

GET requests are used to retrieve data from the server.

Important properties:

- Safe (does not modify data)
- Idempotent (same request → same result)
- Parameters sent in URL

Examples:

- Opening a webpage
- Fetching user profile
- Searching data
- Calling APIs

---

## 8. Handling GET Requests in Express

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

### How It Works

1. Browser sends GET request to "/"
2. Express matches route
3. Callback function executes
4. Server sends response

Syntax:

app.get(path, handlerFunction)

---

## 9. Request Object (req)

Represents data sent by the client.

Contains all information about the incoming request.

### Important Properties

req.query → Query parameters  
req.params → Route parameters  
req.headers → Request headers  
req.body → Data sent in request body  
req.method → HTTP method  
req.url → Requested URL  

### Query Parameter Example

URL:

http://localhost:3000/search?name=akmal&age=20

Code:

    app.get("/search", (req, res) => {
      console.log(req.query);
      res.send("Search received");
    });

Output:

    { name: "akmal", age: "20" }

---

## 10. Response Object (res)

Used to send data back to the client.

If no response is sent, the browser will keep waiting.

### Common Methods

res.send() → Sends text or HTML

    res.send("Hello");

res.json() → Sends JSON data

    res.json({
      name: "Akmal",
      role: "Student"
    });

res.status() → Sets HTTP status code

    res.status(404).send("Not Found");

res.redirect() → Redirects client

    res.redirect("/home");

---

## 11. JSON in Backend

JSON (JavaScript Object Notation) is the standard format for API communication.

Example:

    {
      "name": "Akmal",
      "course": "B.Tech",
      "year": 2
    }

Frontend applications consume this structured data.

---

## 12. Axios — HTTP Client Library

Axios is used to make HTTP requests to other servers or APIs.

Works in both browser and Node.js.

Useful for backend-to-backend communication.

---

## 13. Installing Axios

    npm install axios

---

## 14. Making GET Request with Axios

    const axios = require("axios");

    axios.get("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

### Execution Flow

1. Axios sends request to external API
2. Server processes request
3. Server sends response
4. Axios receives response
5. .then() handles success
6. .catch() handles errors

---

## 15. Real Uses of Axios

- Calling third-party APIs (weather, maps, payments)
- Microservices communication
- Data aggregation
- External authentication services

---

## 16. Key Points

- Express simplifies Node.js backend development
- Server must listen to handle requests
- GET requests retrieve data only
- req contains client information
- res sends server response
- JSON is standard data format
- Axios performs HTTP requests

---

## 17. Common Mistakes

- Forgetting app.listen()
- Not sending any response
- Using GET for modifying data
- Port already in use
- Sending multiple responses for one request
- Not handling Axios errors

---

## 18. Interview Questions

### Basic

1. What is Express.js?
2. What does app.listen() do?
3. What is a GET request?
4. What are req and res objects?
5. Why is Axios used?

### Intermediate

6. Difference between GET and POST?
7. What happens if server sends no response?
8. Difference between res.send() and res.json()?
9. Can Node.js create servers without Express?
10. What is a port in networking?

---

## 19. Practice Questions

1. Create a server that returns "Backend Running" at "/"
2. Create "/about" route returning your details
3. Accept query parameters and display them
4. Send JSON response with student information
5. Run server on a different port

---

## 20. Mini Project Task

Build a simple backend server with these routes:

/ → "Server is running"  
/student → JSON with your details  
/time → Current date and time  
/github → Fetch GitHub user data using Axios  

Example API:

https://api.github.com/users/octocat

---

## 21. Quick Revision

- Backend handles server-side logic
- Express simplifies server creation
- Server listens on a port
- GET requests fetch data
- req holds request data
- res sends response
- Axios makes HTTP requests
