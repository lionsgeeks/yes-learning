
import type React from "react"

import { useState } from "react"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    

    // Create a preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
          <p className="text-xs text-muted-foreground mb-4">Recommended: 1280×720px (16:9 ratio), PNG or JPG</p>
          <Button variant="outline" size="sm" asChild>
            <label>
              Browse Files
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </Button>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img src={preview || "/placeholder.svg"} alt="Course preview"  className="object-cover" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

