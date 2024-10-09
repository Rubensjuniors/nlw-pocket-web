import * as DialogPrimitive from '@radix-ui/react-dialog'
import { forwardRef } from 'react'

export function Dialog(props: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Dialog {...props} />
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.DialogTrigger {...props} />
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
  return <DialogPrimitive.DialogClose {...props} />
}

export function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.DialogPortal {...props} />
}

export const DialogOverlay = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogOverlayProps
>((props, ref) => {
  return (
    <DialogPrimitive.DialogOverlay
      {...props}
      ref={ref}
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    />
  )
})

export const DialogContent = forwardRef<
  HTMLDivElement,
  DialogPrimitive.DialogContentProps
>((props, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.DialogContent
        {...props}
        ref={ref}
        className="fixed z-50 right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-8"
      />
    </DialogPortal>
  )
})

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.DialogTitleProps
>((props, ref) => {
  return (
    <DialogPrimitive.DialogTitle
      {...props}
      ref={ref}
      className="text-lg font-semibold"
    />
  )
})

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogPrimitive.DialogDescriptionProps
>((props, ref) => {
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      ref={ref}
      className="text-zinc-400 text-sm leading-relaxed"
    />
  )
})

DialogOverlay.displayName = 'DialogOverlay'
DialogContent.displayName = 'DialogContent'
DialogTitle.displayName = 'DialogTitle'
DialogDescription.displayName = 'DialogDescription'
