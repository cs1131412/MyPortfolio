# SPEC — React Portfolio Site (COMP229 Assignment 1)

## 1. Purpose

A personal portfolio website built with React. The site introduces me to potential employers. It presents my background, projects, education and services, and gives visitors a way to contact me.

Source of requirements: `Assignment 1 - React Portfolio-New.docx` (max mark 100, weighs 5% of the course grade).

## 2. Technology & Constraints

| Item | Decision |
|---|---|
| Framework | React (functional components + hooks) |
| Build tool | Vite |
| Routing | React Router (client-side routes, one per page) |
| Styling | Plain CSS (global stylesheet + per-component CSS where useful) |
| Language | JavaScript (JSX) |
| Hosting | Netlify (deployed from GitHub) |
| Version control | Git + public GitHub repository |

Constraints:
- No backend is required. The contact form does not need to send email.
- No secrets, API keys or private data are committed to the repository.
- All images and the logo are either my own or properly licensed. No third-party logos.
- The site must build (`npm run build`) and run (`npm run dev`) with zero errors and zero console errors.

## 3. Site-Wide Requirements

### 3.1 Navigation
- **NAV-1** A navigation bar appears on every page.
- **NAV-2** It links to all six pages: Home, About, Projects, Education, Services, Contact.
- **NAV-3** The link for the current page is visually indicated as active.
- **NAV-4** Navigation uses client-side routing (no full page reload).
- **NAV-5** Navigation is usable at mobile widths (≥ 360px), for example by wrapping or a toggle menu.

### 3.2 Custom Logo
- **LOGO-1** A custom logo is shown in or next to the navigation bar.
- **LOGO-2** The logo is original. A simple shape with my initials is acceptable.
- **LOGO-3** Clicking the logo navigates to Home.
- **LOGO-4** The logo has meaningful `alt` text (or `aria-label` if it is inline SVG).

### 3.3 Layout
- **LAY-1** A shared layout component (header/nav, main content, footer) wraps every page.
- **LAY-2** The layout is responsive and readable from 360px to desktop widths.
- **LAY-3** An unknown route shows a simple "Page not found" message with a link to Home.

## 4. Page Requirements

### 4.1 Home (`/`)
- **HOME-1** Displays a welcome message.
- **HOME-2** Displays a mission statement.
- **HOME-3** Has at least one button or link that goes to About Me and/or other pages.
- **HOME-4** After a contact form submission, shows a confirmation message that uses the submitted first name (see CON-6).

### 4.2 About Me (`/about`)
- **ABOUT-1** Displays my legal name.
- **ABOUT-2** Displays a photo of me (head-and-shoulders recommended) with `alt` text.
- **ABOUT-3** Includes a short, professional paragraph about who I am.
- **ABOUT-4** Includes a link to a PDF of my resume. The PDF is stored in the project and the link opens it in a new tab.

### 4.3 Projects (`/projects`)
- **PROJ-1** Shows at least 3 projects.
- **PROJ-2** Each project has an image, a title, a short description of my role and the outcome.
- **PROJ-3** Project data is kept in a data array/file and rendered with `.map()`, not hard-coded three times.

### 4.4 Education (`/education`)
- **EDU-1** Lists all of my educational and professional qualifications.
- **EDU-2** Each entry shows the institution, the credential or degree, and the dates or year.

### 4.5 Services (`/services`)
- **SVC-1** Shows a short list of services (e.g. web development, general programming, mobile apps).
- **SVC-2** Each service has an image or icon and a short description.

### 4.6 Contact (`/contact`)
- **CON-1** Displays my contact information (e.g. email, phone, location, LinkedIn/GitHub) in a panel or card.
- **CON-2** Contains a form with these fields: First Name, Last Name, Contact Number, Email Address, Message.
- **CON-3** Fields are controlled components (React state).
- **CON-4** Required fields: First Name, Last Name, Email, Message. Email must be a valid format. Submitting with invalid input shows a clear message and does not redirect.
- **CON-5** On valid submit, the form data is captured (stored in state and logged to the console) and the user is redirected to Home.
- **CON-6** The captured data is passed to Home (e.g. via router `state`) so Home can show a confirmation like "Thanks, {firstName}! Your message was received."
- **CON-7** Every input has an associated `<label>`.

## 5. Assets
- **AST-1** All images, the resume PDF and the logo load correctly in both development and the deployed build. There are no broken links or 404s.
- **AST-2** Images are reasonably sized for the web (roughly ≤ 500 KB each).

## 6. Code Quality & Internal Documentation (5 marks)
- **DOC-1** Each component file begins with a short comment describing its purpose.
- **DOC-2** Non-obvious logic has comments, especially form handling, validation and the redirect.
- **DOC-3** Variable, function and component names describe what they are (e.g. `handleContactSubmit`, `projectList`, not `x` or `data2`).
- **DOC-4** Project structure is organized, for example:
  ```
  src/
    components/   (Layout, NavBar, Footer, Logo, ProjectCard, ...)
    pages/        (Home, About, Projects, Education, Services, Contact, NotFound)
    data/         (projects.js, education.js, services.js)
    assets/       (images, logo)
  public/
    resume.pdf
  ```
- **DOC-5** `README.md` explains what the project is, how to install and run it, and gives the live URL.

## 7. Version Control & Hosting (10 marks)
- **VC-1** The code is in a GitHub repository with a sensible `.gitignore` (`node_modules`, `dist`).
- **VC-2** Commits are made at real stages of development, one each time a major change is implemented. Commit messages are meaningful. Suggested milestones:
  1. Project scaffold (Vite + React)
  2. Routing + Layout + NavBar + Logo
  3. Home + About (with resume link)
  4. Projects + Education + Services
  5. Contact page + form + redirect
  6. Styling / responsiveness pass
  7. Documentation + deployment config
- **VC-3** The site is deployed to a cloud host from the GitHub repo: https://colbysmithcentennialportfolio.netlify.app
- **VC-4** Deep links work on the live site: refreshing on `/about` does not 404. This needs a Netlify `public/_redirects` file containing `/*  /index.html  200`.

## 8. Submission Checklist
- [ ] Zip archive of the project files, **without `node_modules`** (5 marks)
- [x] GitHub repository link (5 marks): https://github.com/cs1131412/portfolio
- [x] Live site link (10 marks): https://colbysmithcentennialportfolio.netlify.app
- [x] AI Use Statement (optional, recommended): in README.md

## 9. Acceptance / Validation Checklist

Verify each item manually on **both** local dev and the live site before submitting.

✅ = verified 2026-10-01 by scripted browser checks (local preview build and live Netlify site, at 1280px, 375px and 320px). ☐ = still to confirm by hand.

| ID(s) | Check | Local | Live |
|---|---|---|---|
| NAV-1–4 | Every nav link reaches its page with no reload; active link highlighted | ✅ | ✅ |
| NAV-5, LAY-2 | Usable at 360px width (DevTools device mode) | ✅ | ✅ |
| LOGO-1–3 | Logo visible, original, links to Home | ✅ | ✅ |
| LAY-3 | `/does-not-exist` shows Not Found page | ✅ | ✅ |
| HOME-1–3 | Welcome, mission statement and CTA button present and working | ✅ | ✅ |
| ABOUT-1–4 | Name, photo, bio present; resume PDF opens | ✅ | ✅ |
| PROJ-1–2 | ≥ 3 projects, each with image, role and outcome | ✅ | ✅ |
| EDU-1–2 | All qualifications listed with dates | ✅ | ✅ |
| SVC-1–2 | Services listed with images or icons | ✅ | ✅ |
| CON-1 | Contact info panel shown | ✅ | ✅ |
| CON-4 | Empty or invalid submit shows errors and stays on page | ✅ | ✅ |
| CON-5–6 | Valid submit logs data, redirects Home, Home shows "Thanks, {name}" | ✅ | ✅ |
| AST-1 | No broken images or 404s in the DevTools Network tab | ✅ | ✅ |
| — | No errors in the browser console | ✅ | ☐ |
| — | `npm run build` succeeds with no errors | ✅ | n/a |
| VC-4 | Refreshing on a sub-page works on the live site | n/a | ✅ |

## 10. Out of Scope
- Actually sending email or storing messages (no backend, no database).
- Authentication, CMS or admin features.
- Automated test suite. It isn't required for this assignment, though it could be added later.

## 11. Content I Must Supply Myself

Personal content must be real. It is not to be AI-invented.
- [ ] Legal name, short bio, mission statement
- [ ] Head-and-shoulders photo
- [ ] Resume PDF
- [ ] 3+ real projects (images, role, outcome)
- [ ] Education history (institutions, credentials, dates)
- [ ] List of services I offer
- [ ] Contact details I'm comfortable publishing

## 12. Open Questions
- The assignment doc says "Due: Week 4 May 31st". This looks carried over from a previous term, so I need to confirm the actual Fall 2026 due date.
