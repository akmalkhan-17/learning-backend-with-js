# Lecture 3 — Fields, Mongoose, Schemas, Models, Professional Diagrams

## 1. Why Fields Are Important

In backend development, data is stored in databases.

Fields define:

- What data is stored
- Data types
- Validation rules
- Relationships between entities
- Structure of documents

Example (User entity):

- username
- email
- password
- createdAt
- role

Without well-defined fields, data becomes inconsistent and unreliable.

---

## 2. Schema Design Before Coding

Professional development requires designing data structure first.

Tools used for planning:

- Moon Modeler → Database modeling tool
- eraser.io → Diagramming and architecture tool
- ER diagrams → Show entities and relationships

Designing schemas early prevents major refactoring later.

---

## 3. Online Coding Environments

Sometimes projects are demonstrated using browser-based IDEs:

- CodeSandbox
- StackBlitz

Advantages:

- No local setup required
- Quick experimentation
- Shareable environments
- Useful for tutorials and demos

---

## 4. Introduction to Mongoose

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

It provides:

- Schema definition
- Validation
- Model creation
- Query abstraction
- Relationship handling

MongoDB itself is schema-less, but Mongoose enforces structure.

---

## 5. Installing Mongoose

    npm install mongoose

---

## 6. Importing Mongoose (ES Modules)

    import mongoose from "mongoose";

---

## 7. Standard File Naming for Models

Professional convention:

    user.model.js
    post.model.js
    product.model.js

Some projects use plural:

    users.model.js

Consistency is more important than exact naming.

---

## 8. What Is a Schema?

A schema defines the structure of documents in a MongoDB collection.

It specifies:

- Fields
- Data types
- Validation rules
- Default values
- Relationships

---

## 9. Creating a Schema

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true
      }
    });

Explanation:

- mongoose.Schema() creates schema object
- Field name → username
- type → Data type
- required → Validation rule

---

## 10. Common Field Options

### Type

Defines data type:

    String
    Number
    Boolean
    Date
    Array
    ObjectId

---

### Required

Ensures field must be provided.

    required: true

---

### Default Value

    role: {
      type: String,
      default: "user"
    }

---

### Unique Constraint

    email: {
      type: String,
      unique: true
    }

---

## 11. Reading Documentation

Mongoose has extensive documentation for advanced options:

- Validation rules
- Custom validators
- Indexes
- Middleware
- Virtual fields

Official docs are primary reference in real development.

---

## 12. Timestamps Option

Automatically adds time-related fields:

- createdAt
- updatedAt

Enable using schema options:

    const userSchema = new mongoose.Schema(
      {
        username: {
          type: String,
          required: true
        }
      },
      {
        timestamps: true
      }
    );

---

## 13. Creating a Model from Schema

Models allow interaction with the database.

    const User = mongoose.model("User", userSchema);

Exporting model:

    export default User;

---

## 14. Collection Naming Behavior

Mongoose automatically:

1. Converts model name to lowercase
2. Converts to plural form

Example:

Model name → "User"  
Collection name → "users"

This is default behavior.

---

## 15. ObjectId and Relationships

MongoDB uses ObjectId as unique identifier for documents.

Used for referencing other documents.

Example field:

    createdBy: mongoose.Schema.Types.ObjectId

This stores the ID of another document.

---

## 16. Referencing Another Model

To create relationships between collections, use ref.

Example:

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

Meaning:

- createdBy stores ObjectId
- ref specifies which model it refers to
- Enables population (joining data later)

---

## 17. Example Complete User Schema

    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
      {
        username: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true
        },
        role: {
          type: String,
          default: "user"
        }
      },
      {
        timestamps: true
      }
    );

    const User = mongoose.model("User", userSchema);

    export default User;

---

## 18. Why Schema Design Matters

Poor schema design leads to:

- Data inconsistency
- Difficult queries
- Performance issues
- Complex migrations
- Security risks

Good schema design enables scalable applications.

---

## 19. Key Concepts to Remember

- Fields define stored data structure
- Mongoose enforces schema in MongoDB
- Schemas define fields and validation
- Models interact with collections
- ObjectId enables relationships
- timestamps adds createdAt and updatedAt automatically
- Mongoose pluralizes collection names

---

## 20. Common Mistakes

- Using wrong data types
- Forgetting required fields
- Not handling relationships properly
- Inconsistent naming
- Ignoring validation rules
- Designing schema after coding

---

## 21. Interview Questions

### Basic

1. What is Mongoose?
2. What is a schema?
3. Difference between schema and model?
4. What is ObjectId?
5. Why use timestamps?

### Intermediate

6. How does Mongoose handle collection naming?
7. What is ref used for?
8. Difference between embedded documents and references?
9. Why is schema validation important?
10. Can MongoDB work without Mongoose?

---

## 22. Practice Questions

1. Create schema for a Product model
2. Add required and default fields
3. Add timestamps to schema
4. Create relationship between User and Post
5. Export model properly

---

## 23. Mini Project Task

Design backend data models for a To-Do application.

### User Model

Fields:

- username
- email
- password
- role
- timestamps

### Todo Model

Fields:

- title
- description
- completed (Boolean)
- createdBy (reference to User)
- timestamps

Implement schemas using Mongoose.

---

## 24. Quick Revision

- Fields define database structure
- Mongoose is ODM for MongoDB
- Schema defines document structure
- Model interacts with database
- ObjectId enables references
- timestamps adds createdAt and updatedAt