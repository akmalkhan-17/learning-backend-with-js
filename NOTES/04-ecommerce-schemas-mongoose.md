# Lecture 4 — E-Commerce Schemas, References, Enums, Embedded Models

## 🔹 Quick Revision (Top Summary)

- Separate models are created for User, Product, Category, Order
- Schemas define structure of each collection
- Images stored as URL (String), not actual files
- ref links one model to another using ObjectId
- orderItems can use embedded sub-schema (mini model)
- Arrays of objects can be defined using [schema]
- enum restricts field values to specific allowed options
- Complex apps use multiple related schemas
- Hospital schema design started (similar modeling approach)

---

## 🔹 Definitions

### Schema
A blueprint that defines the structure of documents in a MongoDB collection.

### Model
A class created from a schema that allows interaction with the database.

### Reference (ref)
A way to link documents across collections using ObjectId.

### Embedded Document
A document stored inside another document instead of a separate collection.

### Enum
A validation rule that restricts a field to predefined values.

---

## 🔹 Explanation (Simple Understanding)

Real-world applications cannot use one big database table.

E-commerce systems need separate entities:

- Users → customers/admins
- Products → items being sold
- Categories → grouping of products
- Orders → purchase records

Each entity gets its own schema.

---

### Why productImage is stored as String

Images are not stored directly in the database.

Instead, the database stores a URL pointing to the image stored on:

- Cloud storage (AWS S3, Cloudinary)
- CDN
- Server file system

Benefits:

- Faster database performance
- Reduced storage load
- Easier image delivery

---

### Referencing Category from Product

A product belongs to a category.

Instead of duplicating category data, we store its ObjectId.

This creates a relationship between collections.

---

### What ref Actually Refers To

ref tells Mongoose:

"This ObjectId belongs to this specific model."

It enables population (joining data later).

---

### Embedded Model for Order Items

An order can contain multiple products.

Instead of creating a separate collection for order items, a mini schema is embedded inside the order.

This is efficient when data is tightly related and used together.

---

### Why Use Enum

Some fields should only allow specific values.

Example:

Order status should not accept random text.

Enums enforce controlled data.

---

## 🔹 Examples

### E-Commerce Entities

User → Places orders  
Product → Belongs to category  
Category → Groups products  
Order → Contains multiple order items  

---

## 🔹 Code Snippets

### 1. User Model (user.model.js)

    import mongoose from "mongoose";

    const userSchema = new mongoose.Schema(
      {
        name: {
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
        }
      },
      {
        timestamps: true
      }
    );

    const User = mongoose.model("User", userSchema);
    export default User;

---

### 2. Category Model (category.model.js)

    import mongoose from "mongoose";

    const categorySchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        description: String
      },
      {
        timestamps: true
      }
    );

    const Category = mongoose.model("Category", categorySchema);
    export default Category;

---

### 3. Product Model (product.model.js)

    import mongoose from "mongoose";

    const productSchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },

        productImage: {
          type: String   // URL of image
        },

        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        }
      },
      {
        timestamps: true
      }
    );

    const Product = mongoose.model("Product", productSchema);
    export default Product;

---

### 4. Embedded Order Item Schema

Mini model inside Order model.

    const orderItemSchema = new mongoose.Schema({
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true
      }
    });

---

### 5. Order Model (order.model.js)

    import mongoose from "mongoose";

    const orderSchema = new mongoose.Schema(
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },

        orderItems: {
          type: [orderItemSchema]
        },

        status: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered"],
          default: "pending"
        },

        totalAmount: Number
      },
      {
        timestamps: true
      }
    );

    const Order = mongoose.model("Order", orderSchema);
    export default Order;

---

## 🔹 Key Points / Important Facts

- Separate models improve scalability
- ObjectId links documents across collections
- ref enables population (data joining)
- Embedded schemas are useful for tightly related data
- URL storage for images is standard practice
- Enums enforce controlled values
- timestamps automatically track creation and updates

---

## 🔹 Common Mistakes

- Storing images directly in database
- Forgetting ref for relationships
- Using strings instead of ObjectId for references
- Not validating fields
- Overusing embedded documents
- Ignoring enum for status fields

---

## 🔹 Interview Questions

### Basic

1. What is a schema in Mongoose?
2. Difference between schema and model?
3. Why store image URLs instead of images?
4. What is ObjectId?

### Intermediate

5. What does ref do in Mongoose?
6. Embedded vs referenced documents?
7. When should you use enums?
8. How are relationships handled in MongoDB?

---

## 🔹 Practice Questions

1. Create schema for a Cart model
2. Add reference from Cart to User
3. Add array of products in Cart
4. Add enum for order status
5. Add timestamps to all models

---

## 🔹 Mini Project Task

Design database models for a basic online store.

Required models:

User  
Product  
Category  
Order  
Cart  

Enhancements:

- Add stock quantity to products
- Add payment status enum
- Add shipping address field
- Add product ratings

---

## 🔹 Hospital Schema (Concept Introduction)

Hospital system will require entities such as:

- Patient
- Doctor
- Appointment
- Department
- Medical Records

Similar modeling principles apply:

Separate schemas + references + validation + timestamps