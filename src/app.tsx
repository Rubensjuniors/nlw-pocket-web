import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useQuery } from '@tanstack/react-query'
import { EmptyGoals } from './components/empty-goals'
import { getSummary } from './services/getSummary'

export function App() {
  const { data: dataSummary } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60
  })

  return (
    <Dialog>
      {dataSummary && dataSummary?.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
