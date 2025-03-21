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

interface CreateWorkshopModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateWorkshopModal({ open, onOpenChange }: CreateWorkshopModalProps) {
  const [workshopName, setWorkshopName] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")

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
          <DialogTitle>Create New Workshop</DialogTitle>
          <DialogDescription>Enter a name and select a course to create a new workshop.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2 ">
            <Label className="" htmlFor="name">Workshop Name</Label>
            <Input
              id="name"
              placeholder="Enter workshop name"
              value={workshopName}
              onChange={(e) => setWorkshopName(e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Associated Course</Label>
            <div className="mt-3">

            <Select  value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-dev">Web Development Fundamentals</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="database">Database Management</SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!workshopName || !selectedCourse}>
            Create Workshop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

