import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '../ui/dialog'
import { X } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { radioGroupItems } from './constantes'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem
} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoal } from '../../services/createGoal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalFormSchema = z.object({
  title: z.string().min(1, 'informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
})

export type CreateGoalFormSchemaType = z.infer<typeof createGoalFormSchema>

export const CreateGoal = () => {
  const queryClient = useQueryClient()
  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalFormSchemaType>({
      resolver: zodResolver(createGoalFormSchema)
    })

  async function handlerCreateGoal(data: CreateGoalFormSchemaType) {
    try {
      await createGoal(data)

      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      reset()
    } catch (err) {
      throw new Error(`handlerCreateGoal: ${err}`)
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar Meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handlerCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                autoFocus
                id="title"
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {formState.errors.title && (
                <p className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={3}
                render={({ field: { onChange, value, ref } }) => {
                  return (
                    <RadioGroup onValueChange={onChange} value={String(value)}>
                      {radioGroupItems.map((item) => (
                        <RadioGroupItem key={item.id} value={String(item.id)}>
                          <RadioGroupIndicator />
                          <span className="text-zinc-300 text-sm font-medium leading-none">
                            {item.title}
                          </span>
                          <span className="text-lg leading-none">
                            {item.emoji}
                          </span>
                        </RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button type="submit" className="flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
