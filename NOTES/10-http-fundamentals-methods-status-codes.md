# Lecture 10 — HTTP, URL/URI/URN, Headers, Payloads, Methods, Status Codes

## 🔹 Quick Revision (Top Summary)

- HTTP = protocol for communication between client and server
- URL identifies location of resource on web
- URI is broader term; URL and URN are types of URI
- HTTP message = Start line + Headers + Body (payload)
- Headers carry metadata about request/response
- Payload = actual data sent
- Methods define action (GET, POST, etc.)
- Status codes indicate result of request
- CORS controls cross-origin access
- Security headers protect applications

---

## 🔹 Definitions

### HTTP (HyperText Transfer Protocol)
A stateless application-layer protocol used for communication on the web.

### URI (Uniform Resource Identifier)
A general identifier for a resource.

### URL (Uniform Resource Locator)
A URI that specifies location and access method.

### URN (Uniform Resource Name)
A URI that identifies a resource by name, not location.

### Header
Metadata sent along with HTTP message.

### Payload (Body)
Actual data transmitted in request or response.

---

## 🔹 Simple Explanation

When you open a website:

Browser sends HTTP request → Server processes → Server sends HTTP response.

Everything on the web runs on this cycle.

---

## 🔹 URI vs URL vs URN

### URI — General Identifier

All URLs and URNs are URIs.

Example:

    https://example.com/page

---

### URL — Location + Access Method

Specifies where resource is located and how to access it.

Structure:

    protocol://domain:port/path?query#fragment

Example:

    https://example.com/products?id=10

---

### URN — Name-Based Identifier

Identifies resource without location.

Example:

    urn:isbn:0451450523

Rarely used in typical web development.

---

## 🔹 HTTP Message Structure

Both request and response contain:

1. Start line
2. Headers
3. Empty line
4. Body (optional)

---

## 🔹 Request Representation

Example request:

    GET /api/users HTTP/1.1
    Host: example.com
    Authorization: Bearer token
    Content-Type: application/json

    { "name": "Akmal" }

---

## 🔹 Response Representation

Example response:

    HTTP/1.1 200 OK
    Content-Type: application/json

    { "message": "Success" }

---

## 🔹 Headers

Headers provide additional information about message.

Format:

    Header-Name: value

---

## 🔹 Most Common Request Headers

### Host

Specifies target server.

    Host: example.com

---

### Authorization

Sends authentication credentials.

    Authorization: Bearer <token>

---

### Content-Type

Specifies format of data sent.

    Content-Type: application/json

Other examples:

- text/html
- multipart/form-data
- application/x-www-form-urlencoded

---

### User-Agent

Identifies client software.

---

## 🔹 Common Response Headers

### Set-Cookie

Used to store cookies in browser.

---

### Cache-Control

Controls caching behavior.

---

### Access-Control-Allow-Origin

CORS-related header.

---

## 🔹 Payload (Body)

Actual data transmitted.

Examples:

- JSON data
- Form data
- File uploads
- HTML content

GET requests usually have no body.

---

## 🔹 CORS (Cross-Origin Resource Sharing)

Browser security feature controlling cross-origin requests.

Origin = protocol + domain + port

Example:

Frontend: http://localhost:5173  
Backend: http://localhost:8000  

Different ports → Different origin → Blocked without CORS.

Server must explicitly allow:

    Access-Control-Allow-Origin: *

---

## 🔹 Security Headers

Used to protect applications.

Examples:

### Content-Security-Policy (CSP)

Prevents malicious scripts.

---

### X-Frame-Options

Prevents clickjacking.

---

### Strict-Transport-Security

Forces HTTPS connections.

---

## 🔹 HTTP Methods

Methods define action requested by client.

---

### GET — Retrieve Data

- Safe
- No modification
- Idempotent

Example:

    GET /products

---

### POST — Create Data

Used to send new data to server.

Example:

    POST /users

---

### PUT — Update Entire Resource

Replaces resource completely.

---

### PATCH — Partial Update

Modifies only specific fields.

---

### DELETE — Remove Resource

Deletes data from server.

---

## 🔹 Idempotency

An operation is idempotent if repeating it produces same result.

GET, PUT, DELETE → Idempotent  
POST → Not idempotent

---

## 🔹 HTTP Status Codes

Three-digit codes indicating request outcome.

---

### 1xx — Informational

Rarely used.

---

### 2xx — Success

#### 200 OK

Request successful.

#### 201 Created

Resource successfully created.

#### 204 No Content

Success but no body returned.

---

### 3xx — Redirection

#### 301 Moved Permanently

Resource has new permanent location.

#### 302 Found

Temporary redirect.

---

### 4xx — Client Errors

Client made invalid request.

#### 400 Bad Request

Invalid syntax or parameters.

#### 401 Unauthorized

Authentication required.

#### 403 Forbidden

Access denied despite authentication.

#### 404 Not Found

Resource does not exist.

---

### 5xx — Server Errors

Server failed to process valid request.

#### 500 Internal Server Error

Generic server failure.

#### 502 Bad Gateway

Invalid upstream response.

#### 503 Service Unavailable

Server overloaded or down.

---

## 🔹 Key Points / Things to Remember

- HTTP is stateless
- URL is type of URI
- Headers carry metadata
- Payload contains actual data
- Methods define actions
- Status codes communicate result
- CORS protects users from malicious sites
- Security headers harden applications

---

## 🔹 Common Mistakes

- Confusing URL and URI
- Sending sensitive data in URL
- Using wrong HTTP method
- Ignoring status codes
- Misconfiguring CORS
- Not validating headers

---

## 🔹 Interview Questions

### Basic

1. What is HTTP?
2. Difference between URI and URL?
3. What are HTTP headers?
4. What is CORS?
5. What does status code 404 mean?

### Intermediate

6. Difference between PUT and PATCH?
7. What is idempotency?
8. Why are security headers important?
9. How does authentication work via headers?
10. Explain HTTP request lifecycle.

---

## 🔹 Practice Tasks

1. Inspect HTTP requests using browser DevTools
2. Create API endpoints using different methods
3. Send requests using Postman
4. Observe headers and status codes
5. Trigger different error responses

---

## 🔹 Mini Project Idea

Build a simple REST API demonstrating HTTP fundamentals.

Features:

- CRUD operations for a resource
- Proper status codes
- Custom headers
- CORS configuration
- Error handling

Optional Enhancements:

- Authentication header
- Rate limiting
- Logging middleware