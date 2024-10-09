import { Plus } from 'lucide-react'
import { OutlineButton } from '../ui/outline-button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPendingGoals } from '../../services/getPendingGoals'
import { completionGoal } from '../../services/goalCompletion'

export const PendingGoals = () => {
  const queryClient = useQueryClient()
  const { data: dataPendingGoals } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60
  })

  if (!dataPendingGoals) {
    return null
  }

  async function handlerCompleteGoal(goalId: string) {
    try {
      await completionGoal(goalId)

      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    } catch (err) {
      throw new Error(`handlerCompleteGoal: ${err}`)
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {dataPendingGoals.map((goal) => {
        const isDisabled = goal.completionsCount >= goal.desiredWeeklyFrequency
        return (
          <OutlineButton
            key={goal.id}
            disabled={isDisabled}
            onClick={() => handlerCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        )
      })}
    </div>
  )
}
