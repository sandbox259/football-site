import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

// Simple utility to join class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn("absolute right-4 top-4 text-white/70 hover:text-white focus:outline-none", className)}
    {...props}
  >
    {children || "✕"}
  </DialogPrimitive.Close>
))
DialogClose.displayName = DialogPrimitive.Close.displayName

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 w-full max-w-[95vw] sm:max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 sm:p-6 shadow-lg max-h-[85vh] overflow-y-auto overflow-x-hidden box-border bg-gray-900/95 border border-white/20 text-white",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName
