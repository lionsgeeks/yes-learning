import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import {  DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { GripVertical, Trash2 } from "lucide-react";

export function ListBlockEditor({ content, onChange }) {
  const addItem = () => {
    onChange({
      ...content,
      items: [...content.items, ""],
    });
  };

  const updateItem = (index, value) => {
    const newItems = [...content.items];
    newItems[index] = value;
    onChange({
      ...content,
      items: newItems,
    });
  };

  const removeItem = (index) => {
    onChange({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = content.items.indexOf(active.id);
      const newIndex = content.items.indexOf(over?.id);

      const items = arrayMove(content.items, oldIndex, newIndex);

      onChange({
        ...content,
        items,
      });
    }
  };

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
          onValueChange={(value) => onChange({ ...content, type: value })}
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
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext
            items={content.items}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {content.items.map((item, index) => (
                <div
                  key={index}
                  id={item}
                  className="flex items-center space-x-2"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="cursor-move">
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
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            <div className="flex items-center space-x-2">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
          </DragOverlay>
        </DndContext>

        <Button variant="outline" size="sm" onClick={addItem} className="mt-2">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
