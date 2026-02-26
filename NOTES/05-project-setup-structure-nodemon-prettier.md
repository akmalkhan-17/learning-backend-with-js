# Lecture 5 — Project Setup, Folder Structure, Nodemon, Prettier, CLI Usage

## 🔹 Quick Revision (Top Summary)

- Create project folders like public/temp and src
- .gitkeep keeps empty folders tracked by Git
- .gitignore prevents unwanted files from tracking
- src folder contains main source code
- Use nodemon for automatic server restart during development
- Add dev script in package.json
- Professional backend structure uses controllers, models, routes, etc.
- Prettier enforces consistent code formatting
- -D installs dev-only dependencies
- .prettierrc configures formatting rules
- .prettierignore excludes files from formatting
- CLI shortcuts improve workflow efficiency

---

## 🔹 Definitions

### Source Code Folder (src)
Directory containing all application logic and code.

### Nodemon
A development tool that automatically restarts the server when files change.

### Dev Dependency
A package needed only during development, not in production.

### Prettier
An automatic code formatter that enforces consistent style.

### .gitkeep
A placeholder file used to keep empty folders tracked in Git.

---

## 🔹 Explanation (Simple Understanding)

### Public Folder

Used for static assets:

- Images
- Uploads
- Temporary files
- Public documents

Example structure:

    public/
      temp/

---

### Why Use .gitkeep

Git does NOT track empty folders.

To keep folder structure in repository:

Create empty file:

    public/temp/.gitkeep

---

### .gitignore Generator

Used to quickly create ignore rules based on project type.

Prevents committing:

- node_modules
- build files
- environment variables
- editor configs

---

### src Folder

Contains actual application code.

Professional projects separate source from configuration files.

Example:

    src/
      index.js

---

### Creating Files via CLI

Inside src:

    touch index.js

If touch doesn't work on Windows PowerShell, use:

    ni index.js

("ni" = New-Item)

---

## 🔹 Server Restart Problem

Normally, after changing code:

1. Stop server
2. Start server again

This slows development.

---

## 🔹 Nodemon Solution

Nodemon watches files and automatically restarts server.

Install as dev dependency:

    npm install -D nodemon

---

### Adding Script in package.json

    "scripts": {
      "dev": "nodemon src/index.js"
    }

Run using:

    npm run dev

---

### Future Alternative (Production-Grade)

Better modern options:

- PM2 → production process manager
- ts-node-dev → for TypeScript projects
- Node --watch (built-in in newer Node versions)

---

## 🔹 Project Folder Structure

Professional backend structure:

    src/
      controllers/
      db/
      middlewares/
      models/
      routes/
      utils/
      index.js

---

### controllers/

Contains business logic.

Example: handling requests, processing data.

---

### db/

Database connection setup.

Example: MongoDB connection file.

---

### middlewares/

Functions that run before request reaches controller.

Examples:

- Authentication
- Logging
- Validation

---

### models/

Mongoose schemas and database models.

Defines data structure.

---

### routes/

Defines API endpoints.

Connects URLs to controllers.

---

### utils/

Reusable helper functions.

Examples:

- Token generation
- File handling
- Email utilities

---

## 🔹 Prettier — Code Formatter

Prettier automatically formats code to maintain consistency.

Important for production because:

- Improves readability
- Prevents style conflicts in teams
- Makes code reviews easier
- Standardizes formatting

---

## 🔹 Installing Prettier

Install as dev dependency:

    npm install -D prettier

Reason for -D:

Prettier is not needed in production runtime.

---

## 🔹 .prettierrc Configuration

Defines formatting rules.

Example:

    {
      "singleQuote": false,
      "bracketSpacing": true,
      "semi": true,
      "trailingComma": "es5",
      "tabWidth": 2
    }

Meaning:

- singleQuote false → use double quotes
- bracketSpacing true → spaces inside objects
- semi true → semicolons required
- trailingComma es5 → commas where valid in ES5
- tabWidth 2 → indentation size

---

## 🔹 .prettierignore

Files that Prettier should NOT format.

Example:

    *.env
    .env
    .env.*
    /.vscode
    /node_modules
    ./dist

Reason:

- Generated files
- Sensitive data
- External dependencies
- Build outputs

---

## 🔹 CLI Navigation

### Move Back One Folder

    cd ..

---

## 🔹 Useful PowerShell Shortcuts (Windows 11)

### Move Up Multiple Levels

    cd ../..

---

### List Files

    ls

or

    dir

---

### Clear Terminal

    cls

---

### Create Folder

    mkdir folderName

---

### Create File

    ni filename.js

---

### Delete File

    del filename.js

---

### Delete Folder

    rm -r folderName

---

### Open Current Folder in VS Code

    code .

---

### Show Current Path

    pwd

---

### Run Previous Command

Press ↑ arrow key

---

## 🔹 Examples

### Starting Development Server

    npm run dev

Server auto-restarts on file changes.

---

## 🔹 Key Points / Important Facts

- Use src for source code
- Keep empty folders using .gitkeep
- Nodemon speeds development
- Structured folders improve scalability
- Prettier ensures consistent code style
- Dev dependencies are not deployed
- CLI proficiency improves productivity

---

## 🔹 Common Mistakes

- Committing node_modules
- Not using src folder
- Restarting server manually every time
- Mixing business logic with routes
- Ignoring code formatting
- Installing dev tools as production dependencies

---

## 🔹 Interview Questions

### Basic

1. What is nodemon and why is it used?
2. What is Prettier?
3. Difference between dependency and devDependency?
4. Why use src folder?
5. What is middleware?

### Intermediate

6. Why should formatting tools not be in production dependencies?
7. Explain MVC-like folder structure.
8. How does nodemon detect file changes?
9. Why separate controllers and routes?
10. What is a process manager like PM2?

---

## 🔹 Practice Questions

1. Create a new Node project with proper structure
2. Install nodemon and configure dev script
3. Add Prettier with custom rules
4. Create folders for controllers, routes, models
5. Test auto-restart on file change

---

## 🔹 Mini Project Task

Set up a professional backend project template.

Requirements:

- Proper folder structure
- Nodemon configured
- Prettier configured
- Git initialized with .gitignore
- Sample route returning JSON

Optional Enhancements:

- Add ESLint
- Add environment variable support
- Add database connection template
