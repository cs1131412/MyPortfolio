// Loads the portfolio's projects and qualifications (from Assignment 1) into MongoDB,
// so the Projects and Education pages start with real content. Only fills empty
// collections, unless run with --force (which replaces their contents).
// Run with: npm run seed:content
import config from '../config/config.js'
import mongoose from 'mongoose'
import Project from '../server/models/project.model.js'
import Qualification from '../server/models/qualification.model.js'

const owner = { firstname: 'Colby', lastname: 'Smith', email: 'csmit253@my.centennialcollege.ca' }

const projects = [
  {
    title: 'Interactive Power BI Dashboards',
    completion: '2024-08-31',
    description:
      'Business Analyst at ConsumerGenius. Designed and built interactive Power BI dashboards for teams across the company, tracking everything from finances to incoming support call volume. Before the dashboards, leadership could not see where every dollar was going; they helped significantly reduce costs in some areas.',
  },
  {
    title: 'REST API Data Warehouse',
    completion: '2024-08-31',
    description:
      'Business Analyst at ConsumerGenius. Consolidated QuickBooks, Salesforce and Ringba REST API data into a centralized data warehouse, cutting data processing from hours of manual downloads to a few seconds.',
  },
  {
    title: 'OCR Data-Entry Automation',
    completion: '2024-08-31',
    description:
      'Business Analyst at ConsumerGenius. Wrote Python scripts using Azure Document Intelligence (OCR) to automate data entry of purchase receipts, saving an estimated 200+ hours of manual work per year.',
  },
  {
    title: 'AI-Powered Privacy Protection System — SRS',
    completion: '2026-04-30',
    description:
      'Centennial College team project. Wrote the functional and non-functional requirements, use cases and interview questions for an SRS describing a system that uses ML models to detect and block phishing websites. Earned 100%.',
  },
]

const qualifications = [
  {
    title: 'Ontario College Advanced Diploma — Software Engineering Technology (Co-op)',
    completion: '2028-04-30',
    description: 'Centennial College, Toronto, ON (Remote). January 2026 – present, expected completion 2028. GPA 4.1 / 4.5.',
  },
  {
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    completion: '2024-04-30',
    description: 'Microsoft certification, earned April 2024.',
  },
]

const force = process.argv.includes('--force')

async function seed(Model, items, label) {
  const count = await Model.countDocuments()
  if (count > 0 && !force) {
    console.log(`${label}: ${count} already in the database, skipped (use --force to replace)`)
    return
  }
  if (force) await Model.deleteMany({})
  await Model.insertMany(items.map((item) => ({ ...owner, ...item })))
  console.log(`${label}: added ${items.length}`)
}

if (!config.mongoUri) {
  console.error('Set MONGODB_URI in .env first.')
  process.exit(1)
}

try {
  await mongoose.connect(config.mongoUri)
  await seed(Project, projects, 'Projects')
  await seed(Qualification, qualifications, 'Qualifications')
} catch (err) {
  console.error('Could not seed content:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect()
}
