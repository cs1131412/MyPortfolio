# MyPortfolio — Full-Stack Portfolio

COMP229 (Web Application Development), Assignments 2 and 3 at Centennial College.

My portfolio as a full-stack application:
- **Front end:** the React site from Assignment 1, in `client/`. It now reads and writes its data through the API.
- **Back end:** a Node.js + Express REST API backed by MongoDB Atlas (through Mongoose).
- **Accounts:** visitors can sign up and sign in. **Users** can view everything, and the **Admin** can add, edit and delete projects, qualifications and contact messages directly on the site.

- **Repository:** https://github.com/cs1131412/MyPortfolio (the Assignment 2 version is tagged `assignment-2`)
- **Assignment 1 (front end, live):** https://colbysmithcentennialportfolio.netlify.app

## Built With

- [React](https://react.dev/) 19, [React Router](https://reactrouter.com/) 7 and [Vite](https://vite.dev/) 8 (front end)
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

Either use the provided .env, or make your own:

Copy `.env.example` to `.env` in the project root and fill it in:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=<a long random string>
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/Portfolio?retryWrites=true&w=majority
ADMIN_NAME=Administrator
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<choose a strong password>
```

`.env` is git-ignored. Secrets are never stored in the source code.

### 4. Create the admin account and starting content

```bash
npm run seed:admin     # creates (or updates) the admin user in MongoDB from ADMIN_* in .env
npm run seed:content   # loads my projects and qualifications (only if those collections are empty)
```

The admin account exists only in the database: its password is stored as a salted hash, and nobody can sign up as an admin.

### 5. Run

```bash
cd client
npm run dev
```

This starts both servers:
- **Website:** http://localhost:5173. It also works from other devices on the network at `http://<this-PC's-IP>:5173`.
- **API:** http://localhost:5000. The console shows `Server started on port 5000.` and `Connected to the database!`

The Vite dev server forwards `/api` and `/auth` requests to the API, so the website and API share one address.

Other scripts, run from the project root:

| Script | What it does |
|---|---|
| `npm start` | Run the API only (`node server.js`) |
| `npm run server` | Run the API only, restarting on changes (nodemon) |
| `npm run dev` | Same as `cd client && npm run dev` |
| `npm run seed:admin` | Create or update the admin account |
| `npm run seed:content` | Load the starting projects and qualifications (`-- --force` replaces them) |

## Using the Site

| Page | Visitor | User (signed in) | Admin |
|---|---|---|---|
| Home, About, Services | View | View | View |
| Projects, Education | View (loaded from the database) | View | **Add, edit, delete** |
| Contact | Send a message (saved to the database) | Send | Send |
| Messages | — (redirected to Sign In) | View all messages | **Edit, delete, delete all** |
| Sign In / Sign Up | Yes | — | — |

- **Signing in:** the header shows your name, your role (User or Admin) and **Sign Out**. Your session is kept in the browser until the token expires (1 day).
- **Forms:** all forms check their input before sending, such as required fields, email format, password length and matching passwords. Errors from the server, like "Email already exists", appear on the page.

## API

Base URL: `http://localhost:5000`. Protected routes need the header `Authorization: Bearer <token>`, using the token returned by sign-in.

### Authentication

| Method | URL | Action | Access |
|---|---|---|---|
| POST | `/auth/signin` | Sign in with `{ email, password }`. Returns `{ token, user: { _id, name, email, role } }` | Public |
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

### Permissions

| Resource | Anyone | Signed-in user | Admin only |
|---|---|---|---|
| `projects` | GET | GET | POST, PUT, DELETE |
| `qualifications` | GET | GET | POST, PUT, DELETE |
| `contacts` | POST (the contact form) | GET | PUT, DELETE |
| `users` | POST (sign up) | GET, PUT and DELETE **own** account | GET all, any account, DELETE all (keeps admins) |

The role is checked against the database on every admin request, so a role change takes effect immediately.

### Data

| Collection | Fields (\* required) |
|---|---|
| `contacts` | `firstname`\*, `lastname`\*, `email`\*, `contactNumber`, `message` |
| `projects` | `title`\*, `firstname`, `lastname`, `email`, `completion` (Date), `description` |
| `qualifications` | `title`\*, `firstname`, `lastname`, `email`, `completion` (Date), `description` |
| `users` | `name`\*, `email`\* (unique, case-insensitive), `password`\* (min. 6 characters, stored only as a salted hash), `role` (`user` or `admin`, default `user`), `created`, `updated` |

Errors are returned as JSON `{ "error": "..." }`, with these status codes:
- **400:** invalid input or malformed id
- **401:** not signed in
- **403:** not allowed (not an admin, or not your account)
- **404:** not found

## Testing

`postman/MyPortfolio.postman_collection.json` is a Postman collection with 55 requests. It covers every endpoint and the role rules: 401 when signed out, 403 for a regular user, success for the admin.

1. Import it into Postman and start the server.
2. On the collection's **Variables** tab, set `adminEmail` and `adminPassword` to the admin account from `.env`.
3. Run the folders in order. Sign-in saves the user and admin tokens, and each create request saves its new id.

It only deletes the records it creates itself, so it's safe to run against real data.

## Project Structure

```
server.js              Entry point: connect to MongoDB, start Express
config/config.js       Loads .env and exports the port, JWT secret and database URI
scripts/               seed-admin.js (admin account), seed-content.js (starting content)
server/
  express.js           Middleware, routes and error handling
  models/              contact, project, qualification and user schemas
  controllers/         CRUD handlers for each resource; auth.controller.js (sign-in, roles)
  routes/              Routes for each resource, plus auth.routes.js
  helpers/             dbErrorHandler.js (readable database error messages)
client/src/
  api/api.js           fetch calls to the API (adds the token, turns errors into messages)
  auth/AuthContext.jsx Signed-in user and token (React context + localStorage)
  hooks/useCollection.js  Loads a list and keeps it in sync after create/update/delete
  components/          NavBar, EntryForm, ContactForm, FormField, Notice, ProtectedRoute, …
  pages/               Home, About, Projects, Education, Services, Contact, Messages, SignIn, SignUp
postman/               Postman test collection
SPEC.md                Requirements and validation checklist
```

## Notes

- **Port 5000:** the API uses port 5000 because Windows reserves some port ranges on the development PC (including the usual 3000), and the reserved ranges can change after a reboot.
- **DNS problems:** if Atlas `mongodb+srv` addresses fail to resolve (`querySrv` errors), set `DNS_SERVER=8.8.8.8` in `.env`. It is off by default because some networks, such as VPNs, block outside DNS servers.
- **Polling file watchers:** nodemon and Vite check for file changes by polling, because the project was developed on a network drive, where file-change notifications don't work.
- **Changes to the course skeleton:**
  - Removed the hard-coded database credentials.
  - Load `.env` before the config is read.
  - Register middleware before the routes.
  - Use numeric HTTP status codes, which Express 5 requires.
  - Replace the empty error-message stub with working validation messages.
  - Accept only allowed fields from request bodies.

## AI Use Statement

I used Claude Code (Anthropic) as a coding assistant for both assignments, following the course's Specify → Generate → Inspect → Test → Refine workflow.

**Assignment 2 (REST API)**

- **Specify:** together we wrote `SPEC.md` from the assignment requirements.
- **Generate:** Claude Code reviewed and compared the course skeleton versions, generated the models, controllers, routes and authentication code, and found and fixed several bugs in the skeleton. It also wrote the Postman collection and helped put together the screenshot document.
- **Test:** Claude Code checked every endpoint with automated tests against a separate test database.
- **My part:** I set up the MongoDB Atlas cluster and the `.env` file myself, made the decisions about the data model and the project setup, and ran the Postman tests and took all the screenshots myself (friggin pain, it was, grumble grumble).

**Assignment 3 (front end integration, roles)**

- **My decisions:**
  - Keep developing in the same repository, with A2 tagged.
  - Let signed-in users read contact messages, following the assignment's "users can view" wording.
  - Load the Projects and Education pages from the database.
- **Generate:** Claude Code added the admin/user roles and admin-only routes, the admin seed script, and the React side: the auth context, the Sign In, Sign Up, project, qualification and contact forms, the Messages page, and the API integration. It also updated the Postman collection.
- **Test:** Claude Code verified the permission rules with an automated API test (42 checks), the site with an end-to-end UI test as a visitor, user and admin (27 checks), and the Postman collection with Newman (64 assertions), all against a separate test database.
- **My part:** I tested the finished site in my browser and took the submission screenshots myself.
