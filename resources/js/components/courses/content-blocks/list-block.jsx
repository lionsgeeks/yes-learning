"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {  Plus } from "lucide-react"
// import { DragDropContext, Droppable, Draggable } from "@/components/drag-drop"



export function ListBlockEditor({ content, onChange }) {
  const addItem = () => {
    onChange({
      ...content,
      items: [...content.items, ""],
    })
  }

  // const updateItem = (index: number, value: string) => {
  //   const newItems = [...content.items]
  //   newItems[index] = value
  //   onChange({
  //     ...content,
  //     items: newItems,
  //   })
  // }

  // const removeItem = (index: number) => {
  //   onChange({
  //     ...content,
  //     items: content.items.filter((_, i) => i !== index),
  //   })
  // }

  // const onDragEnd = (result: any) => {
  //   if (!result.destination) return

  //   const items = Array.from(content.items)
  //   const [reorderedItem] = items.splice(result.source.index, 1)
  //   items.splice(result.destination.index, 0, reorderedItem)

  //   onChange({
  //     ...content,
  //     items,
  //   })
  // }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">List Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter list title"
        />
      </div>

      <div className="space-y-2">
        <Label>List Type</Label>
        <RadioGroup
          value={content.type}
          onValueChange={(value) => onChange({ ...content })}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bullet" id="bullet" />
            <Label htmlFor="bullet">Bullet Points</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="numbered" id="numbered" />
            <Label htmlFor="numbered">Numbered List</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="checklist" id="checklist" />
            <Label htmlFor="checklist">Checklist</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label>List Items</Label>
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list-items">
            {(provided:any) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {content.items.map((item, index) => (
                  <Draggable key={index} draggableId={`item-${index}`} index={index}>
                    {(provided:any) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} className="flex items-center space-x-2">
                        <div {...provided.dragHandleProps} className="cursor-move">
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <Input
                          value={item}
                          onChange={(e) => updateItem(index, e.target.value)}
                          placeholder={`Item ${index + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(index)}
                          disabled={content.items.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}

        <Button variant="outline" size="sm" onClick={addItem} className="mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  )
}

