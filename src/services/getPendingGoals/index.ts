import { pendingGoalsType } from './types'

export async function getPendingGoals(): Promise<pendingGoalsType[]> {
  const response = await fetch(`http://localhost:3333/pending-goals`)
  const dataPendingGoals = await response.json()

  return dataPendingGoals.pendingGoals
}
