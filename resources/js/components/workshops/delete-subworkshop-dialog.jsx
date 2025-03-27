import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useForm } from "@inertiajs/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function DeleteSubWorkshopDialog({ open, onOpenChange, workshopTitle, workshopId }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { delete: deleteWorkshop, processing } = useForm()

  const handleDelete = () => {
    setIsDeleting(true)

    deleteWorkshop(route("subworkshop.destroy", workshopId), {
      onSuccess: () => {
        onOpenChange(false)
        setIsDeleting(false)
      },
      onError: () => {
        setIsDeleting(false)
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {workshopTitle} workshop and remove its data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={processing}
            className="bg-red-500 text-red-50 hover:bg-red-600"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

