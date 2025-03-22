"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Video } from "lucide-react"



export function VideoBlockEditor({ content, onChange }) {
  const handleUrlChange = (e) => {
    const newUrl = e.target.value
    // Update the URL only if it's valid (basic validation for YouTube URLs)
    onChange({
      ...content,
      url: newUrl,
    })
  }

  function extractVideoId(url) {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/]+)/;
    const match = url.match(regex);
    return match && match[1];
  }

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
          onChange={handleUrlChange} // This handles URL changes
          placeholder="Enter YouTube, Vimeo, or other video URL"
        />
      </div>

      {content.url ? (
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
          {/* Check if the URL is valid and embed */}
          {content.url.includes("youtube.com") || content.url.includes("vimeo.com") ? (
            <iframe
              width="866"
              height="487"
              src={`https://www.youtube.com/embed/${extractVideoId(content.url)}`}  // Call a function to extract the video ID
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-sm text-muted-foreground">Invalid video URL</p>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center aspect-video">
          <div className="mb-4 text-muted-foreground">
            <Video className="h-12 w-12" />
          </div>
          <div className="flex text-sm text-muted-foreground">
            <p className="pl-1">Only YouTube or Vimeo videos are allowed</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Please insert a valid link</p>
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
