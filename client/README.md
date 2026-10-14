# React Portfolio

Hello. This is my personal portfolio website, built with React for COMP229 (Web Application Development). This website has been built with a mixture of my own information and code, and the good help of Claude (see the AI Use Statement at the bottom if you want to know more.)

- **Live site:** https://colbysmithcentennialportfolio.netlify.app
- **Repository:** https://github.com/cs1131412/portfolio

## Pages

| Route | Page | Contents |
|---|---|---|
| `/` | Home | Welcome message, mission statement, links to About and Projects |
| `/about` | About Me | Name, photo, short bio, link to resume (PDF) |
| `/projects` | Projects | Four projects with image, my role, outcome and tools used |
| `/education` | Education | Diploma program and certifications |
| `/services` | Services | Services I offer, with icons |
| `/contact` | Contact Me | Contact information panel and a validated contact form |
| any other | Not Found | "Page not found" message with a link home |

The contact form validates its fields, captures the submission (logged to the browser console), and redirects to the Home page, which shows a thank-you message. There is no backend, so messages are not emailed or stored.

## Built With

- [React](https://react.dev/) 19 — components and state
- [React Router](https://reactrouter.com/) 7 — client-side routing
- [Vite](https://vite.dev/) 8 — dev server and production build
- Plain CSS — responsive layout with automatic light/dark mode
- [Oxlint](https://oxc.rs/) — linting
- [Netlify](https://www.netlify.com/) — hosting

## Getting Started

Requires [Node.js](https://nodejs.org/) 20.19+ or 22.12+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally at http://localhost:4173 |
| `npm run lint` | Check the code with Oxlint |

## Project Structure

```
public/
  _redirects        Netlify rule so deep links (e.g. /about) work on refresh
  favicon.svg       Site icon (same design as the logo)
  resume.pdf        Resume linked from the About page
src/
  main.jsx          Entry point: mounts the app inside BrowserRouter
  App.jsx           Route table
  index.css         Global styles and colour variables
  components/       Layout, NavBar, Logo, Footer, ProjectCard, ContactForm
  pages/            One component per page, plus NotFound
  data/             Page content (profile, projects, education, services)
  assets/           Profile photo, project illustrations, service icons
SPEC.md             Requirements and acceptance checklist for the assignment
netlify.toml        Netlify build settings
```

Page content lives in `src/data/`, separate from the components, so text can be updated without changing any component code.

## Deployment

The site is deployed on Netlify from the `main` branch of this repository. Each push to `main` triggers a new build. Build settings come from `netlify.toml`: Netlify runs `npm run build` and publishes the `dist/` folder.

## AI Use Statement

I used Claude Code (Anthropic) as a coding assistant, following the course's Specify → Generate → Inspect → Test → Refine workflow. Together we wrote `SPEC.md` from the assignment requirements, and Claude Code then generated the project setup, components, styles and illustrations milestone by milestone. It also ran build, lint and browser checks along the way. I wrote the personal content (welcome message, mission statement, bio, project details and contact details) myself. I reviewed the changes, tested the site in my browser, and directed fixes before accepting each milestone.
