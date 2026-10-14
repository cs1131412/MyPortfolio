// Services listed on the Services page, based on the skills on my resume.
import webDevelopmentIcon from '../assets/services/web-development.svg'
import databaseDesignIcon from '../assets/services/database-design.svg'
import dataAnalyticsIcon from '../assets/services/data-analytics.svg'
import automationIcon from '../assets/services/automation.svg'
import apiIntegrationIcon from '../assets/services/api-integration.svg'

const services = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: webDevelopmentIcon,
    description:
      'Responsive websites and front-end interfaces built with HTML, CSS, JavaScript and React. Like this one here!',
  },
  {
    id: 'database-design',
    title: 'Database Design',
    icon: databaseDesignIcon,
    description:
      'Relational database design and SQL development, including Oracle SQL and PL/SQL.',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Dashboards',
    icon: dataAnalyticsIcon,
    description:
      'Interactive Power BI dashboards, star-schema data models and reporting that turn raw data into decisions.',
  },
  {
    id: 'automation',
    title: 'Python Automation',
    icon: automationIcon,
    description:
      'Scripts that remove repetitive manual work, including OCR-based document processing.',
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    icon: apiIntegrationIcon,
    description:
      'Connecting business systems through REST APIs and consolidating their data in one place.',
  },
]

export default services
