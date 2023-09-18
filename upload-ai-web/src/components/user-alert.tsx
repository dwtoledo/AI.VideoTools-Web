import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface UserAlertProps {
  title?: string
  message?: string
  actionText?: string
  openTrigger: boolean
  onClose: () => void
}

export function UserAlert({
  title = 'Title',
  message = 'Message',
  actionText = 'Ok',
  onClose,
  openTrigger,
}: UserAlertProps) {
  return (
    <>
      <AlertDialog open={openTrigger} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>{actionText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
