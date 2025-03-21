"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Video } from "lucide-react"

interface VideoBlockEditorProps {
  content: {
    title: string
    url: string
    caption: string
  }
  onChange: (content: VideoBlockEditorProps["content"]) => void
}

export function VideoBlockEditor({ content, onChange }: VideoBlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Video Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter video title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Video URL</Label>
        <Input
          id="url"
          value={content.url}
          onChange={(e) => onChange({ ...content, url: e.target.value })}
          placeholder="Enter YouTube, Vimeo, or other video URL"
        />
      </div>

      {content.url ? (
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
          <div className="text-muted-foreground">Video Preview</div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center aspect-video">
          <div className="mb-4 text-muted-foreground">
            <Video className="h-12 w-12" />
          </div>
          <div className="flex text-sm text-muted-foreground">
            <label
              htmlFor="video-upload"
              className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
            >
              <span>Upload a video</span>
              <input id="video-upload" name="video-upload" type="file" className="sr-only" />
            </label>
            <p className="pl-1">or enter URL</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">MP4, WebM up to 100MB</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="caption">Caption (Optional)</Label>
        <Textarea
          id="caption"
          value={content.caption}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
          placeholder="Enter video caption or description"
          rows={3}
        />
      </div>
    </div>
  )
}

