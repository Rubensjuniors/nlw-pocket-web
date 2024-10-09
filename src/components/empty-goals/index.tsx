import Logo from '../../assets/img/logo-in.svg'
import lastStart from '../../assets/img/last-store.svg'
import { Plus } from 'lucide-react'
import { DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

export const EmptyGoals = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <img src={Logo} alt="in.orbit" />
      <img src={lastStart} alt="in.orbit" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar Meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
