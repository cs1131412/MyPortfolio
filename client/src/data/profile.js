// Personal content used by the Home and About pages, kept in one place so it
// can be edited without touching component code.

const profile = {
  legalName: 'Colby Smith',
  headline: 'Junior Software Developer',
  studentSummary: 'Software Engineering Technology student at Centennial College',

  welcomeMessage:
    "Hello! I am a software developer, currently studying at Centennial College, and this is my portfolio. Please feel free to view more information about me, or view a list of my projects.",

  missionStatement:
    'My mission statement is that I want to make the world a better place. Earning money simply isn\'t enough; I want to know that I work for a good cause, and that what I do benefits everyone.',

  // Short, professional paragraphs for the About page (a prospective employer may read this).
  bioParagraphs: [
    'Hello. I am Colby Smith, a junior software developer who\'s currently studying Software Engineering Technology at Centennial College. I\'ve always had a deep passion for technology; I\'ve been using a computer since I was old enough to walk, and after becoming frustrated with some of the software I used, I began to learn how to program and modify it to my will. Pursuing a career in software development is the obvious next step, and I believe I\'d excel in the role.',
    "I'm currently focused on securing a co-op position for my next work term. If you're a recruiter at a company that has a position open, feel free to reach out!",
  ],

  // Served from the public/ folder, so the path is from the site root.
  resumeUrl: '/resume.pdf',

  // Shown publicly on the Contact page. Phone number deliberately left out.
  contact: {
    email: 'csmit253@my.centennialcollege.ca',
    linkedInUrl: 'https://www.linkedin.com/in/colby-smith-2b2980206/',
    location: 'London, Ontario, Canada',
    availability: 'Open to 4, 8, and 12 month co-op openings',
  },
}

export default profile
