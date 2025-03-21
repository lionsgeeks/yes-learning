"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageIcon } from "lucide-react"

interface ImageBlockEditorProps {
  content: {
    title: string
    url: string
    caption: string
    altText: string
  }
  onChange: (content: ImageBlockEditorProps["content"]) => void
}

export function ImageBlockEditor({ content, onChange }: ImageBlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Image Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter image title"
        />
      </div>

      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
        {content.url ? (
          <div className="w-full">
            <img
              src={content.url || "/placeholder.svg"}
              alt={content.altText || "Preview"}
              className="max-h-64 mx-auto object-contain rounded-md"
            />
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onChange({ ...content, url: "" })}>
              Remove Image
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-muted-foreground">
              <ImageIcon className="h-12 w-12" />
            </div>
            <div className="flex text-sm text-muted-foreground">
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
              >
                <span>Upload an image</span>
                <input id="image-upload" name="image-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 10MB</p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="caption">Caption (Optional)</Label>
          <Input
            id="caption"
            value={content.caption}
            onChange={(e) => onChange({ ...content, caption: e.target.value })}
            placeholder="Enter image caption"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="altText">Alt Text (for accessibility)</Label>
          <Input
            id="altText"
            value={content.altText}
            onChange={(e) => onChange({ ...content, altText: e.target.value })}
            placeholder="Describe the image for screen readers"
          />
        </div>
      </div>
    </div>
  )
}

