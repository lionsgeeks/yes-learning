"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GripVertical, Pencil, Trash } from "lucide-react"
import { useState } from "react"

interface SubcourseItemProps {
  subcourse: {
    id: string
    title: string
    description: string
    blocks?: any[]
  }
  isActive: boolean
  onClick: () => void
  onUpdate: (data: Partial<SubcourseItemProps["subcourse"]>) => void
  deleteItem: () => void
}

export function SubcourseItem({ subcourse, isActive, onClick, onUpdate , deleteItem }: SubcourseItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(subcourse.title)

  const handleSave = () => {
    onUpdate({ title })
    setIsEditing(false)
  }

  return (
    <div className={`rounded-md border p-3 mb-2 ${isActive ? "border-primary bg-primary/5" : "bg-card"}`}>
      <div className="flex items-center gap-2">
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />

        {isEditing ? (
          <div className="flex-1">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8"
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
          </div>
        ) : (
          <div className="flex-1 font-medium cursor-pointer truncate" onClick={onClick}>
            {subcourse.title}
          </div>
        )}

        <div className="flex">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(!isEditing)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteItem()}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="pl-7 mt-1 text-xs text-muted-foreground">{subcourse.blocks?.length || 0} content blocks</div>
    </div>
  )
}

