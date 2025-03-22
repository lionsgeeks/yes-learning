"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@headlessui/react"

interface CreateCourseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCourseModal({ open, onOpenChange }: CreateCourseModalProps) {
  const [workshopName, setWorkshopName] = useState("")

  const handleCreate = () => {
    // In a real app, you would create the workshop here
    // For now, we'll just close the modal and redirect to a mock ID
    onOpenChange(false)
    // router.push("/workshops/new-workshop")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>Enter a name and Description to create a new Course.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2 ">
            <Label className="" htmlFor="name">Course Name</Label>
            <Input
              id="name"
              placeholder="Enter Course name"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Description</Label>
            <div className="mt-3">
            <Textarea
              id="name"
              placeholder="Enter Course description"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
              className=" w-full p-3 border rounded-lg"
            />

            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} >
            Create Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

