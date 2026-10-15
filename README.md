# MyPortfolio — Portfolio REST API

COMP229 (Web Application Development), Assignment 2 at Centennial College.

A Node.js + Express REST API backed by MongoDB Atlas (through Mongoose) for my portfolio application. It provides CRUD endpoints for contacts, projects, qualifications and users, plus JWT sign-in/sign-out with protected routes. The React front end from Assignment 1 lives in `client/`.

- **Repository:** https://github.com/cs1131412/MyPortfolio
- **Assignment 1 (front end, live):** https://colbysmithcentennialportfolio.netlify.app

## Built With

- [Node.js](https://nodejs.org/) 24 and [Express](https://expressjs.com/) 5, using ES modules
- [MongoDB Atlas](https://www.mongodb.com/atlas) and [Mongoose](https://mongoosejs.com/) 9
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [express-jwt](https://github.com/auth0/express-jwt) for authentication
- [concurrently](https://github.com/open-cli-tools/concurrently) and [nodemon](https://nodemon.io/) to run the front end and back end together
- Based on the course `mern_skeleton`

## Getting Started

### 1. Prerequisites

- Node.js 20.19+ or 22.12+ (needed by Vite in `client/`)
- A MongoDB Atlas cluster, with a database user and network access for your IP

### 2. Install

```bash
npm install            # backend dependencies (project root)
cd client
npm install            # front end dependencies
```

### 3. Configure

Copy `.env.example` to `.env` in the project root and fill it in:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=<a long random string>
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/Portfolio?retryWrites=true&w=majority
```

`.env` is git-ignored. Secrets are never stored in the source code.

### 4. Run

```bash
cd client
npm run dev
```

This starts both servers:
- **Front end:** http://localhost:5173
- **API:** http://localhost:5000. The console shows `Server started on port 5000.` and `Connected to the database!`

Other scripts, run from the project root:

| Script | What it does |
|---|---|
| `npm start` | Run the API only (`node server.js`) |
| `npm run server` | Run the API only, restarting on changes (nodemon) |
| `npm run dev` | Same as `cd client && npm run dev` |

## API

Base URL: `http://localhost:5000`. Protected routes need the header `Authorization: Bearer <token>`, using the token returned by sign-in.

### Authentication

| Method | URL | Action | Access |
|---|---|---|---|
| POST | `/auth/signin` | Sign in with `{ email, password }`. Returns `{ token, user }` | Public |
| GET | `/auth/signout` | Sign out (clears the token cookie) | Public |

### Resources

Each of `contacts`, `projects`, `qualifications` and `users` supports:

| Method | URL | Action |
|---|---|---|
| GET | `/api/<resource>` | Get all |
| GET | `/api/<resource>/:id` | Get one by id |
| POST | `/api/<resource>` | Add new |
| PUT | `/api/<resource>/:id` | Update by id |
| DELETE | `/api/<resource>/:id` | Remove by id |
| DELETE | `/api/<resource>` | Remove all |

| Resource | Public | Requires sign-in |
|---|---|---|
| `contacts` | POST (the contact form) | GET, PUT, DELETE |
| `projects` | GET | POST, PUT, DELETE |
| `qualifications` | GET | POST, PUT, DELETE |
| `users` | POST (sign up), GET all (name and email only) | GET one, PUT, DELETE. PUT and DELETE one only on your own account (403 otherwise) |

### Data

| Collection | Fields (\* required) |
|---|---|
| `contacts` | `firstname`\*, `lastname`\*, `email`\*, `contactNumber`, `message` |
| `projects` | `title`\*, `firstname`, `lastname`, `email`, `completion` (Date), `description` |
| `qualifications` | `title`\*, `firstname`, `lastname`, `email`, `completion` (Date), `description` |
| `users` | `name`\*, `email`\* (unique), `password`\* (min. 6 characters, stored only as a salted hash), `created`, `updated` |

Errors are returned as JSON `{ "error": "..." }`, with these status codes:
- **400:** invalid input or malformed id
- **401:** not signed in
- **403:** not your account
- **404:** not found

## Testing

`postman/MyPortfolio.postman_collection.json` is a Postman collection with 41 requests covering every endpoint, including the 401, 403 and 404 cases. Import it into Postman, start the server, and run the folders in order. Signing in saves the token automatically, and each create request saves its new id for the requests that follow.

## Project Structure

```
server.js              Entry point: connect to MongoDB, start Express
config/config.js       Loads .env and exports the port, JWT secret and database URI
server/
  express.js           Middleware, routes and error handling
  models/              contact, project, qualification and user schemas
  controllers/         CRUD handlers for each resource, plus auth.controller.js
  routes/              Routes for each resource, plus auth.routes.js
  helpers/             dbErrorHandler.js (readable database error messages)
client/                Assignment 1 React portfolio (Vite)
postman/               Postman test collection
SPEC.md                Requirements and validation checklist
```

## Notes

- **Port 5000:** the API uses port 5000 because Windows reserves ports 2993–3092 on the development PC, which includes the usual 3000.
- **DNS problems:** if Atlas `mongodb+srv` addresses fail to resolve (`querySrv` errors), set `DNS_SERVER=8.8.8.8` in `.env`. It is off by default because some networks, such as VPNs, block outside DNS servers.
- **Polling file watcher:** nodemon runs in polling mode (`-L`) because the project was developed on a network drive, where file-change notifications don't work.
- **Changes to the course skeleton:**
  - Removed the hard-coded database credentials.
  - Load `.env` before the config is read.
  - Register middleware before the routes.
  - Use numeric HTTP status codes, which Express 5 requires.
  - Replace the empty error-message stub with working validation messages.
  - Accept only allowed fields from request bodies.

## AI Use Statement

I used Claude Code (Anthropic) as a coding assistant for this assignment, following the course's Specify → Generate → Inspect → Test → Refine workflow.

- **Specify:** together we wrote `SPEC.md` from the assignment requirements.
- **Generate:** Claude Code reviewed and compared the course skeleton versions, generated the models, controllers, routes and authentication code, and found and fixed several bugs in the skeleton. It also wrote the Postman collection and helped put together the screenshot document.
- **Test:** Claude Code checked every endpoint with automated tests against a separate test database.
- **My part:** I set up the MongoDB Atlas cluster and the `.env` file myself, made the decisions about the data model and the project setup, and ran the Postman tests and took all the screenshots myself.
