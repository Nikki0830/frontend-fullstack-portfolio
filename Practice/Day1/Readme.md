# Day 1 – Frontend & Full-Stack Development

**Portfolio Preparation | Day 1 Learning Documentation**

## Overview

Day 1 focused on understanding the foundations of modern frontend and backend development. We explored JavaScript, TypeScript, Node.js, npm, Express.js, REST APIs, Next.js App Router and Git/GitHub.

The objective was to understand how frontend and backend applications communicate and how a professional development project is organised.

---

## 1. JavaScript Fundamentals

### What is JavaScript?

JavaScript is a programming language used to build interactive websites and application functionality.

### Variables

JavaScript provides three main variable declaration keywords:

| Keyword | Reassignment | Redeclaration in same scope |
|---|---|---|
| `var` | Yes | Yes |
| `let` | Yes | No |
| `const` | No | No |

Example:

```javascript
const employeeName = "Nikita";
let employeeAge = 25;
let employeeSalary = 35000;

employeeAge = 26;
employeeSalary = 40000;

console.log(employeeName);
console.log(employeeAge);
console.log(employeeSalary);
```

**Key learning:**
- Use `const` when a variable should not be reassigned.
- Use `let` when a variable needs reassignment.
- Avoid `var` in modern JavaScript unless there's a specific reason.

### JavaScript Data Types

JavaScript supports primitive and non-primitive data types.

Primitive:
- String
- Number
- Boolean
- Undefined
- Null
- BigInt
- Symbol

Non-primitive:
- Objects
- Arrays
- Functions

---

## 2. TypeScript Fundamentals

### What is TypeScript?

TypeScript is a programming language built on JavaScript that adds static type checking.

It helps developers detect many type-related errors during development, before runtime.

### JavaScript vs TypeScript

| JavaScript | TypeScript |
|---|---|
| Dynamically typed | Static type checking |
| No explicit type annotations required | Supports type annotations |
| Many errors appear at runtime | Many type errors caught during development |
| `.js` extension | `.ts` extension |
| Runs in JavaScript environments | Transformed into JavaScript |

### Example: JavaScript

```javascript
let age = 25;

age = "Twenty Five";
```

JavaScript allows this reassignment.

### Example: TypeScript

```typescript
let age: number = 25;

age = "Twenty Five"; // TypeScript error
```

### Benefits of TypeScript

1. Early error detection.
2. Better code autocomplete.
3. Improved code readability.
4. Easier refactoring.
5. Better collaboration between developers.
6. Improved maintainability in large applications.

### TypeScript Compilation

```text
TypeScript (.ts)
       |
       v
Type checking / compilation
       |
       v
JavaScript (.js)
       |
       v
Browser or JavaScript runtime
```

**Important:** TypeScript types are removed during compilation. They do not automatically validate external API data at runtime.

### Basic TypeScript syntax

```typescript
let employeeName: string = "Nikita";
let employeeAge: number = 25;
let isActive: boolean = true;
```

### Function with TypeScript

```typescript
function multiplyPrice(price: number): number {
    return price * 2;
}

multiplyPrice(500);

// Type error
multiplyPrice("500");
```

---

## 3. Node.js

### What is Node.js?

Node.js is a JavaScript runtime environment that allows JavaScript code to execute outside the browser.

### Why do we use Node.js?

- Create backend servers.
- Build REST APIs.
- Connect to databases.
- Handle file operations.
- Implement authentication.
- Process application logic.

### Browser JavaScript vs Node.js

| Browser | Node.js |
|---|---|
| Runs JavaScript in a browser | Runs JavaScript outside the browser |
| Handles DOM and browser events | Handles servers, files and backend operations |
| Provides browser APIs | Provides Node.js APIs |

**Interview question:** Is Node.js a programming language?

Answer: No. JavaScript is the programming language, and Node.js is the runtime environment used to execute JavaScript outside the browser.

---

## 4. npm – Node Package Manager

### What is npm?

npm is a package manager used to install, manage and execute JavaScript packages.

Examples:
- Express.js
- React
- Zod
- PostgreSQL libraries

### Important npm commands

| Command | Purpose |
|---|---|
| `npm init -y` | Creates package.json |
| `npm install express` | Installs Express |
| `npm install` | Installs project dependencies |
| `npm uninstall express` | Removes Express |
| `npm start` | Executes the start script |
| `npm run dev` | Executes the dev script |
| `npm list` | Lists installed packages |

### Understanding package.json

`package.json` contains project metadata, scripts and dependency declarations.

Example:

```json
{
  "name": "express-practice",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

Important properties:

| Property | Purpose |
|---|---|
| name | Project name |
| version | Project version |
| type | Module system for `.js` files |
| scripts | Project commands |
| dependencies | Required application packages |

### Understanding package-lock.json

- Records exact resolved dependency versions.
- Helps reproduce dependency installations.
- Is automatically maintained by npm.
- Should be committed to GitHub.

### Understanding node_modules

- Contains installed packages.
- Includes package dependencies.
- Can become very large.
- Should not be uploaded to GitHub.

If node_modules is deleted, run:

```bash
npm install
```

npm restores the required dependencies using the project manifests and lockfile.

---

## 5. Semantic Versioning

Package versions commonly follow:

```text
MAJOR.MINOR.PATCH
  5  .  1  .  0
```

| Part | Meaning |
|---|---|
| Major | Breaking changes |
| Minor | New backward-compatible features |
| Patch | Backward-compatible bug fixes |

### Version symbols

| Notation | Meaning |
|---|---|
| `^5.1.0` | Compatible updates below 6.0.0 |
| `~5.1.0` | Patch updates below 5.2.0 |
| `5.1.0` | Exact version |
| `*` | Any version |

Examples:

```text
^5.1.0  => >=5.1.0 and <6.0.0

~5.1.0  => >=5.1.0 and <5.2.0

5.1.0   => Exactly 5.1.0
```

**Important:** The caret does not automatically update a package every time a new version is released. package-lock.json also influences the version installed.

Commands:

```bash
npm install
npm update
```

---

## 6. ECMAScript and ES Modules

### What is ECMAScript?

ECMAScript (ES) is the standard specification that defines JavaScript language features.

ES6 is also called ECMAScript 2015.

Important ES6 features:
- let and const
- Arrow functions
- Template literals
- Destructuring
- Spread and rest operators
- ES Modules

### What are ES Modules?

ES Modules are JavaScript's standard module system.

They allow us to divide code into separate files and reuse functionality.

**Export: employee.js**

```javascript
const employeeName = "Nikita";

export default employeeName;
```

**Import: server.js**

```javascript
import employeeName from "./employee.js";

console.log(employeeName);
```

### CommonJS vs ES Modules

| CommonJS | ES Modules |
|---|---|
| `require()` | `import` |
| `module.exports` | `export` |
| Common in older Node.js projects | Standard JavaScript module system |

To use ES Modules with `.js` files in our Node.js project:

```json
{
  "type": "module"
}
```

---

## 7. API and REST API

### What is an API?

API (Application Programming Interface) is a mechanism that allows different software applications to communicate and exchange information.

Example: A React frontend requests employee information from a Node.js backend through an API.

### What is a REST API?

REST API (Representational State Transfer API) is an API designed using REST architectural principles. It commonly uses HTTP methods to perform operations on resources.

### API vs REST API

| API | REST API |
|---|---|
| General communication interface | API following REST principles |
| Can follow different architectural approaches | Uses REST conventions |
| Broad concept | Specific approach to API design |

**Remember:**

Every REST API is an API, but not every API is a REST API.

Other API approaches include GraphQL, SOAP and WebSocket-based APIs.

### CRUD Operations

CRUD stands for:

- Create
- Read
- Update
- Delete

### HTTP Methods

| Method | Purpose | Example |
|---|---|---|
| GET | Read data | `/api/employees` |
| POST | Create data | `/api/employees` |
| PUT | Update/replace data | `/api/employees/1` |
| DELETE | Delete data | `/api/employees/1` |

---

## 8. Express.js Backend

### What is Express.js?

Express.js is a lightweight web framework built on Node.js that simplifies creating web servers and REST APIs.

### Node.js vs Express.js

| Node.js | Express.js |
|---|---|
| JavaScript runtime | Web framework |
| Executes JavaScript | Simplifies server and API development |
| Provides HTTP functionality | Provides convenient routing and middleware |

### Backend installation

```bash
npm init -y

npm install express
```

Configure ES Modules in package.json:

```json
"type": "module"
```

### First Express server

Create `server.js`:

```javascript
import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Welcome to our Employee Management Backend!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Run:

```bash
node server.js
```

Open:

```text
http://localhost:5000
```

Expected response:

```text
Welcome to our Employee Management Backend!
```

### Understanding req and res

| Term | Meaning |
|---|---|
| req | Incoming request object |
| res | Outgoing response object |

Express provides both objects to route handler callbacks in this order:

```javascript
(req, res) => {}
```

### Understanding route parameters

Example:

```javascript
app.get("/api/employees/:id", (req, res) => {
    const employeeId = req.params.id;

    res.send(`Employee ID: ${employeeId}`);
});
```

For this URL:

```text
http://localhost:5000/api/employees/3
```

`req.params.id` returns:

```javascript
"3"
```

It is a string by default.

Convert it when necessary:

```javascript
const employeeId = Number(req.params.id);
```

### JavaScript type conversion

```javascript
typeof "500";         // string

typeof Number("500"); // number

"5" === 5;            // false
```

Strict equality checks both value and data type.

### Express request and response methods

| Property/method | Purpose |
|---|---|
| `req.params` | URL parameters |
| `req.query` | Query string parameters |
| `req.body` | Request body data |
| `req.headers` | Request headers |
| `res.send()` | Sends a response |
| `res.json()` | Sends JSON |
| `res.status()` | Sets HTTP status code |

### Future backend architecture

```text
backend/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── employee.routes.js
│   ├── controllers/
│   │   └── employee.controller.js
│   ├── services/
│   │   └── employee.service.js
│   ├── middleware/
│   └── server.js
│
├── .env
├── .gitignore
└── package.json
```

Responsibilities:

- Routes: Define API endpoints.
- Controllers: Handle requests and responses.
- Services: Contain business logic.
- Config: Manage application configuration and database connection.
- Middleware: Handle shared request-processing logic.

---

## 9. Next.js App Router Introduction

### What is Next.js?

Next.js is a React framework used to build full-stack web applications.

It provides:
- File-system-based routing.
- Server-side rendering.
- Server and Client Components.
- API Route Handlers.
- Image optimization.
- SEO features.
- Loading and error handling.

### React vs Next.js

| React | Next.js |
|---|---|
| UI library | React framework |
| Routing usually requires an additional library | Built-in App Router |
| UI-focused | Full-stack application features |
| Client rendering is common in typical setups | Supports server and client rendering |

Next.js uses React; it does not replace React.

### App Router structure

```text
src/
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── globals.css
    │
    ├── products/
    │   ├── page.tsx
    │   └── [id]/
    │       └── page.tsx
    │
    ├── cart/
    │   └── page.tsx
    │
    └── login/
        └── page.tsx
```

### Important files

| File | Purpose |
|---|---|
| `app/` | Application routing |
| `page.tsx` | Page component |
| `layout.tsx` | Shared layout |
| `globals.css` | Global styles |
| `[id]/` | Dynamic route segment |
| `loading.tsx` | Loading UI |
| `error.tsx` | Error UI |
| `not-found.tsx` | Not-found UI |

### Example routes

| File | URL |
|---|---|
| `app/page.tsx` | `/` |
| `app/products/page.tsx` | `/products` |
| `app/cart/page.tsx` | `/cart` |
| `app/products/[id]/page.tsx` | `/products/1` |

### Server Components vs Client Components

Server Components:
- Default in App Router.
- Can fetch data on the server.
- Do not send their own client-side JavaScript for component interactivity.

Client Components:
- Used for browser-side interactivity.
- Support useState and useEffect.
- Handle event handlers and browser APIs.
- Marked with `"use client"`.

Example:

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}
```

### Next.js vs Express

| Next.js | Express.js |
|---|---|
| React framework | Backend web framework |
| Supports App Router | Supports explicit routes |
| Provides Route Handlers | Provides REST API endpoints |
| Supports Server Components | Does not provide React rendering |

Our project plan:

- Project 1: React + TypeScript + Express + PostgreSQL.
- Project 2: Next.js + TypeScript + Redux Toolkit + MySQL.

---

## 10. Git and GitHub

### What is Git?

Git is a distributed version control system that tracks changes in source code.

### What is GitHub?

GitHub is an online platform for hosting Git repositories and collaborating on code.

| Git | GitHub |
|---|---|
| Version control system | Code hosting platform |
| Tracks changes locally | Hosts repositories online |
| Creates commits | Supports collaboration and pull requests |

### Important Git terminology

| Term | Meaning |
|---|---|
| Repository | Git-tracked project |
| Commit | Saved snapshot of changes |
| Branch | Separate development line |
| Main | Primary branch |
| Clone | Copy a remote repository |
| Push | Upload local commits |
| Pull | Fetch and integrate remote changes |
| Merge | Combine branches |
| Pull Request | Request to merge changes |
| `.gitignore` | Excludes specified files from Git |

### Git workflow

```text
Working Directory
       |
       | git add
       v
Staging Area
       |
       | git commit
       v
Local Repository
       |
       | git push
       v
GitHub Repository
```

### Important Git commands

```bash
git init

git status

git add .

git commit -m "Initial commit"

git log --oneline

git branch

git switch -c feature/login

git switch main

git pull

git push

git clone REPOSITORY_URL

git diff
```

### Initial GitHub setup

```bash
git init

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/frontend-fullstack-portfolio.git

git add .

git commit -m "Initial commit: portfolio project setup"

git push -u origin main
```

### .gitignore

Example:

```gitignore
node_modules/
.env
.env.local
.next/
dist/
build/
npm-debug.log*
```

Never commit passwords, API keys or other secrets.

---

## 11. Day 1 – Practical Folder Structure

```text
frontend-fullstack-portfolio/
│
├── 01-admin-employee-dashboard/
│   └── Day1/
│       ├── node-practice/
│       │   ├── hello.js
│       │   ├── employee.js
│       │   ├── server.js
│       │   └── package.json
│       │
│       └── express-practice/
│           ├── node_modules/
│           ├── server.js
│           ├── package.json
│           └── package-lock.json
│
├── README.md
└── .gitignore
```

This is our learning structure. The production backend structure will be created separately as we implement the employee dashboard.

---

## 12. Day 1 – Learning and Practical Progress

### Concepts covered

- [x] JavaScript variables: var, let and const.
- [x] JavaScript vs TypeScript introduction.
- [x] Benefits of TypeScript and type safety.
- [x] Node.js introduction.
- [x] npm and package management.
- [x] package.json and package-lock.json.
- [x] node_modules and .gitignore.
- [x] ECMAScript and ES Modules.
- [x] CommonJS vs ES Modules.
- [x] API and REST API definitions.
- [x] HTTP methods and CRUD.
- [x] Express.js introduction.
- [x] Express server creation.
- [x] Next.js introduction.
- [x] App Router concepts.
- [x] Server vs Client Components introduction.
- [x] Git and GitHub fundamentals.

### Practical work completed / started

- [x] Verified Node.js, npm and Git installation.
- [x] Created Node.js practice files.
- [x] Installed Express.
- [x] Created an Express server.
- [x] Started server on port 5000.
- [x] Tested the welcome route in the browser.
- [x] Practised URL parameter concepts through examples.

### Pending practical work

- [ ] Complete TypeScript fundamentals and practical exercises.
- [ ] Build employee GET, POST, PUT and DELETE APIs.
- [ ] Practise req.params, req.query and req.body.
- [ ] Learn Express middleware and route organisation.
- [ ] Create and run a Next.js TypeScript application.
- [ ] Explore the generated App Router structure.
- [ ] Complete Git initial commit and GitHub push.
- [ ] Verify both project environments.

---

## 13. Interview Questions – Day 1

1. What is JavaScript?
2. What is the difference between var, let and const?
3. What is TypeScript, and why do we use it?
4. What is type safety?
5. What is Node.js?
6. Is Node.js a programming language?
7. What is npm?
8. What is package.json?
9. What is package-lock.json?
10. What is node_modules?
11. What is the difference between CommonJS and ES Modules?
12. What is an API?
13. What is a REST API?
14. What is CRUD?
15. What is Express.js?
16. What is the difference between Node.js and Express.js?
17. What are req and res?
18. What are route parameters?
19. What is Next.js?
20. What is App Router?
21. What is the difference between Server and Client Components?
22. What is Git?
23. What is GitHub?
24. What is the difference between git add, git commit and git push?

---

## 14. Day 1 – Final Learning Objective

By the end of this learning phase, the goal is to understand how the different technologies work together:

```text
Frontend
React / Next.js / TypeScript
          |
          v
       API Request
          |
          v
Backend
Node.js / Express.js
          |
          v
      REST API
          |
          v
Database
PostgreSQL / MySQL
```

**Important:** Reading and understanding the concepts is the first step. We will mark a topic as completed only after practical implementation, testing and explaining it independently.

**Next session:** Continue with deeper TypeScript fundamentals, Express REST API implementation, Next.js project setup and GitHub integration.

*Portfolio target: Build practical, interview-ready projects demonstrating frontend and full-stack development skills.*