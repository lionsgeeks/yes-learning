"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextBlockEditorProps {
  content: {
    title: string
    body: string
  }
  onChange: (content: TextBlockEditorProps["content"]) => void
}

export function TextBlockEditor({ content, onChange }: TextBlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Section Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter section title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Content</Label>
        <Textarea
          id="body"
          value={content.body}
          onChange={(e) => onChange({ ...content, body: e.target.value })}
          placeholder="Enter text content here..."
          rows={6}
        />
      </div>
    </div>
  )
}

