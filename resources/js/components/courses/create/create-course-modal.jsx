"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@headlessui/react"
import { ImageIcon } from "lucide-react"
import { useForm } from "@inertiajs/react"

export function CreateCourseModal({ open, onOpenChange }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    label: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null)

  const handleInputChange = (e) => {
    setData(e.target.name, e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setData('image', file);
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setImagePreview(reader.result);  // dyal l preview
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('label', data.label);
    formData.append('description', data.description);
    formData.append('image', data.image);

    post(route('course.store'), {
      data: formData,
      onFinish: () => {
        setData({
          name: '',
          tagline: '',
          description: '',
          desclaelription: '',
          image: null,
        });
        onOpenChange(false)
        setImagePreview(null)
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>Enter a name, description, tagline, and upload an image to create a new course.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Course name"
              value={data.name}
              onChange={handleInputChange}
              className="mt-3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Label</Label>
            <Input
              id="label"
              name="label"
              placeholder="Enter Course Label"
              value={data.label}
              onChange={handleInputChange}
              className="mt-3"
            />
          </div>




          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter Course description"
              value={data.description}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg mt-3"
            />
          </div>

          <div className="space-y-2 relative border-dashed border-2 p-3 border-muted flex flex-col items-center gap-y-2 rounded-lg">
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Course cover preview"
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="absolute top-0 opacity-0 w-full h-full"
              onChange={handleImageChange}
            />
            <Label htmlFor="image-upload">Course Image</Label>
            <div className="mb-4 text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
            </div>
            <div className="flex text-sm text-muted-foreground">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
              >
                <span>Upload an image</span>
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 3MB</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
