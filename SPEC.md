# SPEC — MyPortfolio REST API (COMP229 Assignment 2)

## 1. Purpose

A Node.js + Express REST API, backed by MongoDB Atlas through Mongoose, for my portfolio application. The React front end from Assignment 1 lives in `client/`.

Sources: `Assignment 2- BackendNEW.docx` (max mark 100, 10% of the course), the course `mern_skeleton` (version 2) and the Week 6 authentication material.

## 2. Technology & Constraints

| Item | Decision |
|---|---|
| Runtime | Node.js 24 (ES modules) |
| Server | Express 5 |
| Database | MongoDB Atlas, database name **`Portfolio`** |
| ODM | Mongoose 9 |
| Auth | JWT (`jsonwebtoken` to sign, `express-jwt` to verify), passwords hashed with salted HMAC (Week 6) |
| Dev tooling | `concurrently` + `nodemon -L` (polling, because the project is on a network drive) |
| Package manager | npm |
| Server port | **5000**. Windows reserves 2993–3092 on this PC, so 3000 is unavailable. |

Constraints:
- **SEC-1** Secrets (Atlas URI, JWT secret) live only in `.env`, which is git-ignored. `.env.example` documents the keys. No credentials appear in source, logs or commits.
- **SEC-2** Passwords are never stored or returned in plain text. `hashed_password` and `salt` are never included in responses.
- **SEC-3** Error messages and logs never print the connection string.

## 3. Project Structure

```
MyPortfolio/
  server.js            Entry point: connect to MongoDB, start Express
  config/config.js     Loads .env; exports port, jwtSecret, mongoUri
  server/
    express.js         Middleware, routes, error handler
    models/            contact, project, qualification, user (Mongoose)
    controllers/       one per resource + auth.controller.js
    routes/            one per resource + auth.routes.js
    helpers/           dbErrorHandler.js
  client/              Assignment 1 React app (Vite)
  .env.example
```

## 4. Part I — Setup (15 marks)

- **SET-1** `MyPortfolio` is a copy of `mern_skeleton`, with `client/` replaced by the Assignment 1 site.
- **SET-2** `cd client && npm run dev` starts **both** Vite (5173) and the API (5000) via `concurrently`.
- **SET-3** nodemon restarts the API when files in `server.js`, `server/` or `config/` change.

## 5. Part II — Database & Server (25 marks)

- **DB-1** Atlas database `Portfolio` contains the collections `contacts`, `projects`, `qualifications` and `users`. *(Screenshot: Atlas collections.)*
- **SRV-1** `GET /` returns `{"message":"Welcome to My Portfolio application."}`. *(Screenshot: browser.)*
- **SRV-2** On startup the console shows `Connected to the database!`. *(Screenshot: console.)*

## 6. Data Models

All string fields are trimmed. `email` must match a basic email format.

| Collection | Fields |
|---|---|
| `contacts` | `firstname`\* string, `lastname`\* string, `email`\* string, `contactNumber` string *(extra, from A1 form)*, `message` string *(extra, from A1 form)* |
| `projects` | `title`\* string, `firstname` string, `lastname` string, `email` string, `completion` Date, `description` string |
| `qualifications` | `title`\* string, `firstname` string, `lastname` string, `email` string, `completion` Date, `description` string |
| `users` | `name`\* string, `email`\* unique string, `password`\* (virtual → `hashed_password` + `salt`, min 6 chars), `created` Date, `updated` Date |

\* required

## 7. Part III — REST API (30 marks) & Testing (20 marks)

Each resource (`contacts`, `projects`, `qualifications`, `users`) exposes:

| Method | URL | Action |
|---|---|---|
| GET | `/api/<resource>` | get all |
| GET | `/api/<resource>/:id` | get one by id |
| POST | `/api/<resource>` | add new |
| PUT | `/api/<resource>/:id` | update by id |
| DELETE | `/api/<resource>/:id` | remove by id |
| DELETE | `/api/<resource>` | remove all |

Behaviour:
- **API-1** Successful responses return JSON. Creating a resource returns the created document (users: a success message, as in the skeleton).
- **API-2** Invalid input returns **400** with `{ error: "<readable message>" }`, e.g. a missing required field or a duplicate user email.
- **API-3** An unknown or malformed id returns **404** / **400** with `{ error }`. It must not crash.
- **API-4** "Remove all" returns how many documents were deleted.
- **TEST-1** Every endpoint is tested in Postman or Thunder Client. *(Screenshots for each.)*

## 8. Part IV — Authentication (10 marks)

- **AUTH-1** `POST /auth/signin` with `{ email, password }` returns `{ token, user: { _id, name, email } }` and sets cookie `t`. Wrong credentials return **401**.
- **AUTH-2** `GET /auth/signout` clears the cookie and returns `{ message: "signed out" }`.
- **AUTH-3** Protected routes require `Authorization: Bearer <token>`. A missing or invalid token returns **401**.
- **AUTH-4** Route protection:

| Resource | Public | Requires sign-in |
|---|---|---|
| contacts | POST (the contact form) | GET all/one, PUT, DELETE one/all |
| projects | GET all/one | POST, PUT, DELETE one/all |
| qualifications | GET all/one | POST, PUT, DELETE one/all |
| users | POST (sign up), GET all (name/email only) | GET one, PUT, DELETE one *(own account only → 403 otherwise)*, DELETE all |

## 9. Validation Checklist

| ID | Check | ✓ |
|---|---|---|
| SET-2 | `npm run dev` in `client/` serves 5173 and 5000 | ☐ |
| SRV-1 | Welcome message at http://localhost:5000/ | ☐ |
| SRV-2 | "Connected to the database!" in console | ☐ |
| DB-1 | Four collections visible in Atlas `Portfolio` | ☐ |
| API | All 24 endpoints return the expected status and body | ☐ |
| AUTH | Sign-in token works; no token gives 401; wrong user gives 403; sign-out works | ☐ |
| SEC-1 | `git ls-files` contains no `.env`; no URI in source | ☐ |

## 10. Submission

- [ ] Zip of the project, **without `node_modules`**, `.env` or `.rar`
- [ ] GitHub link: https://github.com/cs1131412/MyPortfolio
- [ ] Word document with screenshots: Atlas DB, welcome message, DB connection console, and Postman/Thunder Client tests

## 11. Out of Scope

- Connecting the React pages to the API (optional extra: the A1 contact form could `POST /api/contacts`).
- Deploying the backend.
