"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GripVertical, ImageIcon, Plus, Presentation, Trash2 } from "lucide-react"
// import { DragDropContext, Droppable, Draggable } from "@/components/drag-drop"

interface PresentationBlockEditorProps {
  content: {
    title: string
    slides: {
      id: string
      title: string
      content: string
      imageUrl?: string
    }[]
  }
  onChange: (content: PresentationBlockEditorProps["content"]) => void
}

export function PresentationBlockEditor({ content, onChange }: PresentationBlockEditorProps) {
  // Initialize with empty slides if none exist
  if (!content.slides || !content.slides.length)  {
  // Initialize with empty slides if none exist
  if (!content.slides || !content.slides.length) {
    onChange({
      ...content,
      slides: [
        {
          id: `slide-${Date.now()}`,
          title: 'Slide 1',
          content: '',
        }
      ]
    })
  }
  
  const addSlide = () => {
    onChange({
      ...content,
      slides: [
        ...content.slides,
        {
          id: `slide-${Date.now()}`,
          title: `Slide ${content.slides.length + 1}`,
          content: '',
        }
      ]
    })
  }
  
  const updateSlide = (id: string, field: string, value: string) => {
    onChange({
      ...content,
      slides: content.slides.map(slide => 
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    })
  }
  
  const removeSlide = (id: string) => {
    onChange({
      ...content,
      slides: content.slides.filter(slide => slide.id !== id)
    })
  }
  
  const onDragEnd = (result: any) => {
    if (!result.destination) return
    
    const items = Array.from(content.slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    
    onChange({
      ...content,
      slides: items
    })
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Presentation Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter presentation title"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Slides</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={addSlide}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Slide
          </Button>
        </div>
        
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="slides">
            {(provided:any) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {content.slides.map((slide, index) => (
                  <Draggable key={slide.id} draggableId={slide.id} index={index}>
                    {(provided:any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="border rounded-md p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center gap-2"
                          >
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">Slide {index + 1}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSlide(slide.id)}
                            disabled={content.slides.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`slide-title-${slide.id}`}>Slide Title</Label>
                            <Input
                              id={`slide-title-${slide.id}`}
                              value={slide.title}
                              onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                              placeholder="Enter slide title"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`slide-content-${slide.id}`}>Slide Content</Label>
                            <Textarea
                              id={`slide-content-${slide.id}`}
                              value={slide.content}
                              onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
                              placeholder="Enter slide content"
                              rows={3}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Slide Image (Optional)</Label>
                            {slide.imageUrl ? (
                              <div className="relative">
                                <img
                                  src={slide.imageUrl || "/placeholder.svg"}
                                  alt="Slide"
                                  className="h-32 object-cover rounded-md"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => updateSlide(slide.id, 'imageUrl', '')}
                                >
                                  Remove Image
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                <Button variant="outline" size="sm">
                                  Upload Image
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </div>
      
      <div className="border rounded-md p-4 bg-muted/30">
        <div className="text-sm font-medium mb-2">Presentation Preview</div>
        <div className="aspect-[4/3] flex items-center justify-center bg-muted rounded-md">
          <Presentation className="h-12 w-12 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
}