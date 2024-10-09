import { summaryData } from './types'

export async function getSummary(): Promise<summaryData> {
  const response = await fetch(`http://localhost:3333/summary`)
  const dataSummary = await response.json()

  return dataSummary.summary
}
