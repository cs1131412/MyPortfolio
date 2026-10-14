// Projects shown on the Projects page, rendered as cards by ProjectCard.
import powerBiImage from '../assets/projects/powerbi-dashboards.svg'
import dataWarehouseImage from '../assets/projects/api-data-warehouse.svg'
import ocrImage from '../assets/projects/ocr-automation.svg'
import aippsImage from '../assets/projects/aipps-srs.svg'

const projects = [
  {
    id: 'powerbi-dashboards',
    title: 'Interactive Power BI Dashboards',
    context: 'ConsumerGenius · Business Analyst · May–Aug 2024',
    image: powerBiImage,
    role: 'Designed and built interactive Power BI dashboards for teams across the company, tracking everything from finances to incoming support call volume.',
    outcome:
      'Improved data accessibility and supported data-driven decisions across departments. Before my dashboard, company leadership was unaware of where every dollar was going, and we were able to significantly reduce cost in some sectors with it.',
    tools: ['Power BI', 'Data modelling'],
  },
  {
    id: 'api-data-warehouse',
    title: 'REST API Data Warehouse',
    context: 'ConsumerGenius · Business Analyst · May–Aug 2024',
    image: dataWarehouseImage,
    role: 'Consolidated QuickBooks, Salesforce and Ringba REST API data into a centralized data warehouse.',
    outcome:
      'Substantially cut data processing time from multiple hours for manual downloads and data compilation, to a few seconds.',
    tools: ['REST APIs', 'SQL', 'Star-schema design'],
  },
  {
    id: 'ocr-automation',
    title: 'OCR Data-Entry Automation',
    context: 'ConsumerGenius · Business Analyst · May–Aug 2024',
    image: ocrImage,
    role: 'Wrote Python scripts using Azure Document Intelligence (OCR) to automate manual data entry of receipts for company purchases.',
    outcome: 'Saved an estimated 200+ hours of tedious, repetitive manual work annually.',
    tools: ['Python', 'Azure Document Intelligence'],
  },
  {
    id: 'aipps-srs',
    title: 'AI-Powered Privacy Protection System — SRS',
    context: 'Centennial College · Academic team project',
    image: aippsImage,
    role:
      'Wrote the functional and non-functional requirements sections, use cases and interview questions, working in an Agile team.',
    outcome:
      'Delivered a Software Requirements Specification for a program that uses ML models to detect and block phishing websites. The SRS was good enough to earn our team a 100%.',
    tools: ['Requirements engineering', 'Agile', 'Use cases'],
  },
]

export default projects
