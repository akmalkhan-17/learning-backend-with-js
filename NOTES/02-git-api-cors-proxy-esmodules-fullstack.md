# Lecture 2 — Git Setup, Ignoring node_modules, Express API, CORS, Proxy, ES Modules, Full-Stack Workflow

## 1. Initializing Git in a Project

Git is a version control system used to track changes in code.

It enables:

- Saving project history
- Collaboration
- Reverting mistakes
- Deployment workflows

Initialize Git inside project folder:

    git init

This creates a hidden `.git` directory.

---

## 2. Adding Files to Git

To stage all files:

    git add .

This adds everything in the project directory.

---

## 3. Problem: node_modules Was Added

node_modules contains installed dependencies.

Problems if committed:

- Extremely large size
- Thousands of files
- Slows Git operations
- Not required (can be reinstalled)
- Considered bad practice

node_modules should NEVER be committed.

---

## 4. Fix Using .gitignore

Create a `.gitignore` file to exclude files from tracking.

Example:

    node_modules/
    .env
    dist/
    build/

---

## 5. Removing node_modules if Already Added

If node_modules was staged:

    git rm -r --cached node_modules

Then re-add files:

    git add .
    git commit -m "Remove node_modules from tracking"

---

## 6. Reinstalling Dependencies

Since node_modules is ignored, dependencies are restored using:

    npm install

Based on package.json.

---

## 7. ES Modules — Using import Instead of require()

Node.js supports two module systems:

CommonJS → Older default  
ES Modules → Modern JavaScript standard  

### CommonJS Syntax

    const express = require("express");

### ES Module Syntax

    import express from "express";

Modern projects often use ES Modules.

---

## 8. Error: "Cannot use import outside a module"

When using import syntax without configuration, Node throws an error because it assumes CommonJS.

Node must be told to treat files as ES Modules.

---

## 9. Fix — Enable ES Modules

Add this to package.json:

    "type": "module"

Example:

    {
      "name": "backend-project",
      "version": "1.0.0",
      "type": "module"
    }

Now Node accepts import syntax.

---

## 10. Creating Express Server Using ES Modules

    import express from "express";

    const app = express();

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

---

## 11. Building a Jokes API with Express

An API endpoint returns data stored in an array.

Example:

    import express from "express";

    const app = express();

    const jokes = [
      "Why don’t programmers like nature? Too many bugs.",
      "Why do Java developers wear glasses? Because they don’t C#.",
      "How many programmers does it take to change a light bulb? None, it's a hardware problem.",
      "Why did the developer go broke? Because he used up all his cache.",
      "There are only 10 types of people: those who understand binary and those who don’t."
    ];

    app.get("/jokes", (req, res) => {
      res.json(jokes);
    });

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });

---

## 12. Frontend–Backend Communication

Frontend sends HTTP requests to backend.

Backend processes request and returns response (usually JSON).

Flow:

Frontend → Request → Backend → Response → Frontend displays data

---

## 13. CORS — Cross-Origin Resource Sharing

CORS is a browser security mechanism that blocks requests between different origins.

Origin = protocol + domain + port

Example:

Frontend: http://localhost:5173  
Backend: http://localhost:3000  

Different ports → Different origins → Request blocked

---

## 14. Why CORS Exists

Protects users from malicious websites accessing private resources.

---

## 15. Enabling CORS in Express

Install package:

    npm install cors

Use middleware:

    import cors from "cors";
    app.use(cors());

---

## 16. Using Vite for Frontend

Vite is a fast development server for modern frontend frameworks (commonly React).

Runs on a different port than backend.

---

## 17. Problem: Calling Backend with Full URL

Frontend calling:

    http://localhost:3000/jokes

Issues:

- Must write full URL everywhere
- Causes CORS problems
- Hard to maintain

---

## 18. Solution: Proxy

Proxy forwards requests from frontend server to backend server.

Frontend calls relative path only.

---

## 19. Serving API at /api/jokes

Instead of exposing `/jokes` directly, proxy allows cleaner structure:

Frontend calls:

    /api/jokes

Proxy forwards to backend `/jokes`.

---

## 20. How Proxy Avoids CORS

1. Browser sends request to frontend server
2. Frontend server forwards request to backend
3. Backend sees request from same origin (frontend server)
4. CORS restriction is bypassed

---

## 21. Vite Proxy Configuration

In vite.config.js:

    export default {
      server: {
        proxy: {
          "/api": "http://localhost:3000"
        }
      }
    };

Now:

Frontend → /api/jokes  
Backend receives → /jokes

---

## 22. React vs Vite Proxy Setup

Different tools configure proxy differently.

Create React App uses package.json proxy field.

Vite uses configuration file.

---

## 23. Running Frontend and Backend Simultaneously

Full-stack apps require two servers.

Use separate terminals in VS Code.

Backend terminal:

    node server.js

Frontend terminal:

    npm run dev

---

## 24. Separation of Concerns

Frontend and backend should be independent.

Frontend → UI and user interaction  
Backend → Data processing and APIs  

Mixing them causes:

- Poor scalability
- Hard maintenance
- Deployment issues

---

## 25. Why Using React Inside Backend Is Bad Practice

Backend should not render frontend frameworks directly during development.

Better approach:

React app (frontend) communicates with Express API (backend).

---

## 26. Key Concepts to Remember

- Initialize Git using git init
- node_modules should be ignored
- .gitignore prevents unwanted files from tracking
- ES Modules use import syntax
- Node requires `"type": "module"` for import
- Express APIs return JSON data
- CORS blocks cross-origin requests
- Proxy avoids CORS during development
- Frontend and backend run separately

---

## 27. Common Mistakes

- Committing node_modules
- Forgetting .gitignore
- Using import without enabling ES Modules
- Running only one server
- Mixing frontend code into backend
- Hardcoding backend URLs everywhere

---

## 28. Interview Questions

### Basic

1. What is Git and why is it used?
2. Why should node_modules not be committed?
3. What is .gitignore?
4. What is CORS?
5. Difference between require and import?

### Intermediate

6. How does proxy solve CORS issues?
7. What is an origin?
8. Why is separation of frontend and backend important?
9. How do you remove files already tracked by Git?
10. How do you enable ES Modules in Node.js?

---

## 29. Practice Questions

1. Initialize Git in a project
2. Create a .gitignore file ignoring node_modules
3. Convert require-based code to import
4. Build an API returning an array
5. Connect frontend using proxy
6. Run frontend and backend together

---

## 30. Mini Project Task

Build a simple full-stack jokes application.

### Backend

- Express server using ES Modules
- Route: /jokes
- Returns array of jokes

### Frontend

- Fetch jokes from backend
- Display jokes on page
- Use proxy (/api/jokes)

Optional Enhancements:

- Add button to fetch random joke
- Add POST route to add new joke
- Store jokes in database later

---

## 31. Quick Revision

- Git tracks project changes
- node_modules must be ignored
- ES Modules use import syntax
- Enable ES Modules with `"type": "module"`
- Express creates APIs
- CORS restricts cross-origin requests
- Proxy forwards requests to backend
- Frontend and backend run separately
