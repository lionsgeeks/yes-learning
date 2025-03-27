"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from "lucide-react"

interface PDFBlockEditorProps {
  content: {
    title: string
    url: string
    description: string
    file: File
  }
  onChange: (content: PDFBlockEditorProps["content"]) => void
}

export function FileBlockEditor({ content, onChange }: PDFBlockEditorProps) {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
            const file = e.target.files? e.target.files[0] : null
            console.log('pdf : ',file);
            
            if (!file) return;
            // const hashedFileName = await generateHashedFileName(file);
            // const renamedFile = new File([file], hashedFileName, { type: file.type });
            const url = `documents/chapters/${file.name}`;
            // console.log('Generated URL:', url);
            onChange({ ...content, file: file, url: url });
        };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">PDF Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter PDF title"
        />
      </div>
      {content.url ? (
        <div className="border rounded-md p-4 bg-muted/30">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary mr-3" />
            <div>
              <div className="font-medium">{content.title || "PDF Document"}</div>
              <div className="text-sm text-muted-foreground">{content.url.split("/").pop()}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
          <div className="mb-4 text-muted-foreground">
            <FileText className="h-12 w-12" />
          </div>
          <div className="flex text-sm text-muted-foreground">
            <label
              htmlFor="pdf-upload"
              className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
            >
              <span>Upload a PDF</span>
              <input id="pdf-upload" name="pdf-upload" type="file" accept=".pdf,.xls,.xlsx" className="sr-only" onChange={(e) => handleFile(e)} />
            </label>
            <p className="pl-1">or enter URL</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">PDF up to 50MB</p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={content.description}
          onChange={(e) => onChange({ ...content, description: e.target.value })}
          placeholder="Enter a description of this PDF document"
          rows={3}
        />
      </div>
    </div>
  )
}

