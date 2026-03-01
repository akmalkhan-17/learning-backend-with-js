# Lecture 8 — User & Video Models, Indexing, Watch History, Password Hashing, JWT Auth

## 🔹 Quick Revision (Top Summary)

- MongoDB auto-generates _id → no need to define manually
- User schema includes username, email, fullname, avatar, coverImage
- Cloudinary URLs stored as strings for images
- index: true improves search performance
- watchHistory stores ObjectId references to Video documents
- bcrypt hashes passwords before saving
- Use pre("save") hook for encryption
- Do NOT use arrow functions in Mongoose hooks (this binding issue)
- isModified("password") prevents re-hashing unchanged passwords
- Methods added to schema for password verification
- JWT used for authentication (access + refresh tokens)
- Tokens generated using schema methods

---

## 🔹 Definitions

### Index
A database structure that improves query speed.

### Reference (ref)
Links one document to another collection via ObjectId.

### Hashing
One-way encryption used to securely store passwords.

### Hook (Middleware)
Function that runs automatically during schema lifecycle events.

### JWT (JSON Web Token)
A signed token used for stateless authentication.

---

## 🔹 Simple Explanation

### MongoDB _id Field

Every document automatically gets a unique identifier:

    _id: ObjectId

You don’t need to define it manually.

---

### Why Store Images as URLs

Actual images are stored on cloud services (Cloudinary, S3).

Database stores only the URL:

- Saves storage
- Improves performance
- Easier delivery via CDN

---

### Why index: true Is Important

Without index:

Database scans entire collection → slow

With index:

Database uses optimized lookup → fast

Common indexed fields:

- username
- email
- searchable fields

---

## 🔹 User Schema Example

    import mongoose, { Schema } from "mongoose";

    const userSchema = new Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          index: true
        },

        email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true
        },

        fullName: {
          type: String,
          required: true
        },

        avatar: {
          type: String  // Cloudinary URL
        },

        coverImage: {
          type: String
        },

        watchHistory: [
          {
            type: Schema.Types.ObjectId,
            ref: "Video"
          }
        ]
      },
      { timestamps: true }
    );

---

## 🔹 Watch History (Reference Array)

Stores IDs of videos watched by user.

Not embedded → referenced.

Benefits:

- Avoid data duplication
- Easy to fetch video details
- Scalable for large histories

---

## 🔹 Video Model + Aggregation Plugin

Aggregation is used for complex queries (analytics, joins, pagination).

Plugin example:

    import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

    videoSchema.plugin(mongooseAggregatePaginate);

Allows paginated aggregation results.

---

## 🔹 Password Hashing with bcrypt

Install:

    npm install bcrypt

Hash passwords before storing.

---

## 🔹 Pre-Save Hook for Encryption

Runs automatically before saving document.

IMPORTANT: Use function(), NOT arrow function.

Arrow functions don’t bind this to document.

---

### Password Hashing Hook

    import bcrypt from "bcrypt";

    userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();

      this.password = await bcrypt.hash(this.password, 10);
      next();
    });

---

## 🔹 Why isModified("password")?

Prevents hashing every time document is saved.

Only hashes when password changes.

Without this:

Password would be hashed again → login breaks.

---

## 🔹 Why next() Is Used

Signals completion of middleware.

Without calling next():

Request will hang.

---

## 🔹 Password Verification Method

Custom instance method added to schema.

    userSchema.methods.isPasswordCorrect = async function (password) {
      return await bcrypt.compare(password, this.password);
    };

Used during login.

---

## 🔹 JWT Authentication

JWT = signed token sent to client after login.

Client sends token with requests for authentication.

---

## 🔹 Environment Variables for Tokens

    ACCESS_TOKEN_SECRET=your_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_secret
    REFRESH_TOKEN_EXPIRY=10d

---

## 🔹 Generating Access Token

    import jwt from "jsonwebtoken";

    userSchema.methods.generateAccessToken = function () {
      return jwt.sign(
        {
          _id: this._id,
          email: this.email,
          username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
      );
    };

---

## 🔹 Generating Refresh Token

    userSchema.methods.generateRefreshToken = function () {
      return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
      );
    };

---

## 🔹 Why Two Tokens?

Access Token:

- Short-lived
- Used for API requests

Refresh Token:

- Long-lived
- Used to generate new access tokens

Improves security.

---

## 🔹 Key Points / Things to Remember

- MongoDB auto-creates _id
- Index improves search performance
- Store images as URLs
- Use references for relationships
- Hash passwords before saving
- Do not use arrow functions in hooks
- JWT enables stateless authentication
- Separate access and refresh tokens

---

## 🔹 Common Mistakes

- Storing plain-text passwords
- Re-hashing passwords on every save
- Forgetting next() in middleware
- Using arrow functions in hooks
- Hardcoding JWT secrets
- Not validating unique fields

---

## 🔹 Interview Questions

### Basic

1. Why hash passwords?
2. What is JWT?
3. Difference between access and refresh token?
4. What is indexing in databases?
5. What is ObjectId?

### Intermediate

6. Why avoid arrow functions in Mongoose hooks?
7. How does bcrypt hashing work?
8. What happens if password is hashed twice?
9. Why use references instead of embedding?
10. How does JWT verification work?

---

## 🔹 Practice Tasks

1. Create user registration schema
2. Add password hashing
3. Implement login password check
4. Generate JWT after login
5. Store watch history for videos

---

## 🔹 Mini Project Idea

Build authentication system for a video platform.

Features:

- User registration
- Login with JWT
- Password hashing
- Access & refresh tokens
- Watch history tracking
- Profile with avatar URL

Optional Enhancements:

- Email verification
- Password reset
- Role-based access
- Token blacklist