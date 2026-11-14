// Illustrations for project cards. Projects now come from the database, so the
// original Assignment 1 illustrations are matched by title; any other project
// gets a generic image.
import powerBiImage from '../assets/projects/powerbi-dashboards.svg'
import dataWarehouseImage from '../assets/projects/api-data-warehouse.svg'
import ocrImage from '../assets/projects/ocr-automation.svg'
import aippsImage from '../assets/projects/aipps-srs.svg'
import genericImage from '../assets/projects/generic-project.svg'

const imagesByKeyword = [
  ['power bi', powerBiImage],
  ['data warehouse', dataWarehouseImage],
  ['ocr', ocrImage],
  ['privacy protection', aippsImage],
]

export function imageForProject(title = '') {
  const lowerTitle = title.toLowerCase()
  const match = imagesByKeyword.find(([keyword]) => lowerTitle.includes(keyword))
  return match ? match[1] : genericImage
}
