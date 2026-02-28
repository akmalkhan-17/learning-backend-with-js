# Lecture 6 — MongoDB Atlas Connection, dotenv, Mongoose, Modular DB Setup

## 🔹 Quick Revision (Top Summary)

- MongoDB Atlas provides cloud-hosted databases
- Connection string stored in .env file (never in code)
- No trailing slash in base URI; DB name appended separately
- Use async/await + try/catch for DB connection
- Two approaches: direct in index.js or modular DB file
- dotenv loads environment variables globally
- ES Modules require explicit file paths (e.g., db/index.js)
- Node v20 does NOT require old experimental flags
- Successful connection logs host information

---

## 🔹 Definitions

### MongoDB Atlas
Cloud-hosted MongoDB service for storing data online.

### Connection String (URI)
A special URL containing credentials and cluster info used to connect to database.

### Environment Variables (.env)
External configuration values stored outside source code.

### Mongoose
ODM library used to interact with MongoDB in Node.js.

### Modular Connection
Separating database logic into its own file for maintainability.

---

## 🔹 Explanation (Simple Understanding)

In real applications:

❌ Database credentials should NOT be hardcoded  
✅ They are stored in environment variables  

Atlas hosts your database on remote servers (often in another region/continent), so connection is asynchronous.

---

## 🔹 Step 1 — Create MongoDB Atlas Database

Typical steps:

1. Create free Atlas account
2. Create Shared (free-tier) cluster
3. Create database user (username + password)
4. Allow network access (IP whitelist)
5. Get connection string

Example URI:

    mongodb+srv://username:password@cluster.mongodb.net/

---

## 🔹 Step 2 — Store URI in .env File

Create `.env` in project root:

    PORT=8000
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net

Important:

- No trailing slash
- No database name yet
- .env must be in .gitignore

---

## 🔹 Step 3 — Define Database Name

Create constants file:

    // src/constants.js
    export const DB_NAME = "lbackend";

---

## 🔹 Step 4 — Install Dependencies

    npm install mongoose dotenv

---

## 🔹 Step 5 — Load Environment Variables

In index.js:

    import dotenv from "dotenv";

    dotenv.config({
      path: "./.env"
    });

This makes variables available via process.env.

---

## 🔹 Approach 1 — Connect Inside index.js

### Using async IIFE (Immediately Invoked Function Expression)

Note: Semicolon before IIFE prevents syntax issues.

    import mongoose from "mongoose";
    import { DB_NAME } from "./constants.js";

    ;(async () => {
      try {
        await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {
          console.log(`Server running on port ${process.env.PORT}`);
        });

      } catch (error) {
        console.error("DB connection error:", error);
      }
    })();

---

## 🔹 Why async/await + try/catch?

- DB server is remote → network latency
- Connection may fail
- Errors must be handled gracefully

---

## 🔹 Approach 2 — Modular Connection (Professional)

### Create src/db/index.js

    import mongoose from "mongoose";
    import { DB_NAME } from "../constants.js";

    const connectDB = async () => {
      try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
          "MongoDB connected, HOST:",
          connectionInstance.connection.host
        );

      } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
      }
    };

    export default connectDB;

---

### Use in index.js

    import connectDB from "./db/index.js";

    connectDB();

---

## 🔹 Why Modular Approach Is Better

- Cleaner architecture
- Reusable connection logic
- Easier testing
- Scales for large applications

---

## 🔹 Handling Errors

Two options:

### Throw Error

Allows higher-level handling.

### process.exit(1)

Stops application immediately if DB connection fails.

Preferred for critical startup failures.

---

## 🔹 Accessing Connection Details

Mongoose returns connection object.

Example:

    connectionInstance.connection.host

Useful for debugging and logging.

---

## 🔹 dotenv with Modern Node (v20+)

Old tutorials used:

    -r dotenv/config --experimental-json-modules

This is NOT required now.

Modern approach:

Just import and configure manually:

    import dotenv from "dotenv";
    dotenv.config();

No package.json changes needed.

---

## 🔹 Common ES Modules Errors and Fixes

### Error 1 — Directory Import Not Supported

Wrong:

    import connectDB from "./db";

Correct:

    import connectDB from "./db/index.js";

ES Modules require explicit file paths.

---

### Error 2 — Cannot Find Module

Wrong:

    import { DB_NAME } from "../constants";

Correct:

    import { DB_NAME } from "../constants.js";

Must include .js extension.

---

## 🔹 Example Final index.js (Clean Version)

    import dotenv from "dotenv";
    import express from "express";
    import connectDB from "./db/index.js";

    dotenv.config({ path: "./.env" });

    const app = express();

    connectDB();

    app.get("/", (req, res) => {
      res.send("Server running");
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

---

## 🔹 Key Points / Important Facts

- Always store secrets in .env
- Never commit .env to Git
- Use async DB connection
- Modular approach is industry standard
- ES Modules require file extensions
- Atlas URI must include credentials
- Connection failure should stop app

---

## 🔹 Common Mistakes

- Hardcoding database credentials
- Forgetting dotenv.config()
- Missing DB name in connection string
- Using require syntax in ES Module project
- Importing folders instead of files
- Forgetting .js extension
- Committing .env file

---

## 🔹 Interview Questions

### Basic

1. What is MongoDB Atlas?
2. Why use environment variables?
3. What is Mongoose?
4. Why use async/await for DB connection?
5. What is a connection string?

### Intermediate

6. Difference between local MongoDB and Atlas?
7. Why separate DB connection logic?
8. What happens if DB connection fails?
9. How does dotenv work?
10. Why does ES Module import require file extensions?

---

## 🔹 Practice Questions

1. Create Atlas cluster and connect to Node app
2. Move credentials to .env
3. Implement modular DB connection
4. Log connection host
5. Handle connection failure

---

## 🔹 Mini Project Task

Set up a complete backend starter with database.

Requirements:

- Atlas connection
- .env configuration
- Modular DB setup
- Express server
- Test route

Optional Enhancements:

- Add reconnect logic
- Add logging system
- Add health-check endpoint

---

## 🔹 Quick Revision

- Atlas hosts cloud MongoDB
- Store URI in .env
- Append DB name during connection
- Use async/await + try/catch
- Prefer modular DB file
- Import paths must include file names in ES Modules
- Modern Node does not need experimental flags