# Lecture 9 — File Upload Handling, Cloudinary, Multer, Server Storage, Cleanup

## 🔹 Quick Revision (Top Summary)

- Files uploaded via HTTP require special handling (not JSON)
- Multer handles multipart/form-data uploads in Express
- diskStorage stores files temporarily on server
- Cloudinary stores files permanently in cloud
- Secrets must be stored in .env
- Upload flow: Client → Server → Cloudinary → Delete local file
- fs.unlinkSync removes temporary files after upload
- Middleware is used to intercept file uploads
- Multer is preferred over express-fileupload for production
- diskStorage callback defines destination and filename

---

## 🔹 Definitions

### Multipart/Form-Data
Encoding used to send files in HTTP requests.

### Multer
Middleware for handling file uploads in Express.

### Cloudinary
Cloud service for storing and delivering media files.

### diskStorage
Multer storage engine that saves files on server disk.

### fs.unlinkSync()
Node.js function to delete a file from filesystem.

---

## 🔹 Simple Explanation

Files are NOT sent like normal JSON data.

Browsers send files using multipart/form-data.

Your backend must:

1. Receive file
2. Temporarily store it
3. Upload to cloud storage
4. Remove local copy

---

## 🔹 Why Cloudinary?

Cloudinary provides:

- Image/video hosting
- CDN delivery
- Automatic optimization
- Transformation (resize, compress, crop)
- Free tier available

---

## 🔹 Better Alternatives?

Cloudinary is excellent for most projects.

Other options:

- AWS S3 → industry standard for large-scale apps
- Firebase Storage → easy for Google ecosystem
- Supabase Storage → modern alternative

For learning and small/medium apps → Cloudinary is perfect.

---

## 🔹 Installing Required Packages

    npm install cloudinary multer

---

## 🔹 Cloudinary Setup

Create account → Get credentials:

- cloud_name
- api_key
- api_secret

Store in .env:

    CLOUDINARY_CLOUD_NAME=xxx
    CLOUDINARY_API_KEY=xxx
    CLOUDINARY_API_SECRET=xxx

---

## 🔹 Cloudinary Utility File

Create:

    utils/cloudinary.js

---

### Cloudinary Configuration

    import { v2 as cloudinary } from "cloudinary";
    import fs from "fs";

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

---

## 🔹 Upload Function

Uploads file from local path to Cloudinary.

    const uploadOnCloudinary = async (localFilePath) => {
      try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
        });

        // Delete local file after upload
        fs.unlinkSync(localFilePath);

        return response;

      } catch (error) {
        fs.unlinkSync(localFilePath); // cleanup even on failure
        return null;
      }
    };

    export default uploadOnCloudinary;

---

## 🔹 Why Delete Local File?

Temporary storage wastes disk space.

Production servers must stay clean.

We don’t "delete" permanently from cloud — only local temp file is removed.

---

## 🔹 Multer Middleware Setup

Create middleware for receiving files.

---

### diskStorage Configuration

    import multer from "multer";

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/temp");
      },

      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

---

### Export Upload Middleware

    export const upload = multer({
      storage
    });

Note: `storage: storage` can be shortened to `storage`.

---

## 🔹 Why diskStorage?

Two storage options:

Memory storage → stores in RAM  
Disk storage → stores on server  

Disk storage is safer for large files and needed before cloud upload.

---

## 🔹 Using Middleware in Route

Example:

    app.post("/upload", upload.single("image"), async (req, res) => {
      const localPath = req.file.path;

      const result = await uploadOnCloudinary(localPath);

      res.json(result);
    });

---

## 🔹 Middleware Concept in File Upload

Multer intercepts request BEFORE route handler.

Flow:

Client → Multer → Save file → Route handler → Cloud upload → Response

---

## 🔹 Key Points / Things to Remember

- File uploads require multipart/form-data
- Multer handles file parsing
- diskStorage saves temporary files
- Cloudinary stores permanent files
- Always delete temp files
- Keep secrets in environment variables
- Middleware executes before route logic

---

## 🔹 Common Mistakes

- Forgetting to delete local files
- Hardcoding Cloudinary credentials
- Not handling upload errors
- Using memory storage for large files
- Incorrect file path configuration
- Not creating temp folder

---

## 🔹 Interview Questions

### Basic

1. How are files uploaded in HTTP?
2. What is Multer used for?
3. Why use cloud storage instead of server storage?
4. What is Cloudinary?
5. Difference between JSON data and file upload?

### Intermediate

6. Memory storage vs disk storage in Multer?
7. Why remove temporary files?
8. How would you secure file uploads?
9. What happens if upload fails mid-way?
10. How does CDN improve media delivery?

---

## 🔹 Practice Tasks

1. Upload image to server using Multer
2. Upload image to Cloudinary
3. Store Cloudinary URL in database
4. Handle multiple file uploads
5. Restrict file types

---

## 🔹 Mini Project Idea

Build media upload system for a social platform.

Features:

- Upload profile picture
- Upload cover image
- Store URLs in database
- Delete old images on update
- Show uploaded media

Optional Enhancements:

- Image resizing
- File size limits
- Multiple uploads
- Video upload support