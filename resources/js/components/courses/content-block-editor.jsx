"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { AlignLeft, BarChart, GripVertical, ImageIcon, List, Plus, Presentation, Table, Trash2, Video,} from "lucide-react"
import { TextBlockEditor } from "./content-blocks/text-block"
import { ImageBlockEditor } from "./content-blocks/image-block"
import { VideoBlockEditor } from "./content-blocks/video-block"
import { ListBlockEditor } from "./content-blocks/list-block"
import { TableBlockEditor } from "./content-blocks/table-block"
import { ChartBlockEditor } from "./content-blocks/chart-block"
import { TabsContent } from "@radix-ui/react-tabs"



export function ContentBlockEditor({  blocks, onBlocksChange }) {
  const [activeBlockId, setActiveBlockId] = useState(null)

  const addBlock = (type) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContentForType(type),
    }

    onBlocksChange([...blocks, newBlock])
    setActiveBlockId(newBlock.id)
  }

  const updateBlock = (id, content) => {
    console.log(content);
    
    onBlocksChange(blocks.map((block) => (block.id === id ? { ...block, content } : block)))
    console.log(blocks);
    
  }

  const removeBlock = (id) => {
    onBlocksChange(blocks.filter((block) => block.id !== id))
    if (activeBlockId === id) {
      setActiveBlockId(null)
    }
  }

const onDragEnd = (event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const oldIndex = blocks.findIndex((block) => block.id === active.id);
  const newIndex = blocks.findIndex((block) => block.id === over.id);

  if (oldIndex !== -1 && newIndex !== -1) {
    const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);
    onBlocksChange(reorderedBlocks);
  }
};

  const getDefaultContentForType = (type) => {
    switch (type) {
      case "text":
        return { title: "New Text Section", body: "" }
      case "image":
        return { title: "New Image", url: "", caption: "", altText: "" }
      case "video":
        return { title: "New Video", url: "", caption: "" }
      case "list":
        return { title: "New List", items: ["Item 1"], type: "bullet" }
      case "table":
        return { title: "New Table", rows: 3, cols: 3, data: Array(3).fill(Array(3).fill("")) }
      case "chart":
        return { title: "New Chart", type: "bar", data: [] }
      default:
        return {}
    }
  }

  const renderBlockEditor = (block) => {
    switch (block.type) {
      case "text":
        return <TextBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      case "image":
        return <ImageBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      case "video":
        return <VideoBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      case "list":
        return <ListBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      case "table":
        return <TableBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      case "chart":
        return <ChartBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />
      default:
        return <div>Unknown block type</div>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {blocks.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">No content blocks yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add your first content block using the buttons below
                </p>
              </div>
            ) : (
              blocks.map((block) => 
              <SortableBlock key={block.id} block={block} activeBlockId={activeBlockId} setActiveBlockId={setActiveBlockId} removeBlock={removeBlock} renderBlockEditor={renderBlockEditor} />)
            )}
          </div>
        </SortableContext>
      </DndContext>
      </div>

      <div className="border rounded-md p-4">
        <h3 className="text-sm font-medium mb-3 p-3">Add Content Block</h3>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="basic">Add Chapter Content</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            <Button variant="outline" className="justify-start" onClick={() => addBlock("text")}>
              <AlignLeft className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => addBlock("list")}>
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => addBlock("image")}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => addBlock("video")}>
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => addBlock("table")}>
              <Table className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button variant="outline" className="justify-start" onClick={() => addBlock("chart")}>
              <BarChart className="h-4 w-4 mr-2" />
              Chart
            </Button>
          </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}







function SortableBlock({ block, activeBlockId, setActiveBlockId, removeBlock, renderBlockEditor }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id })

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`${activeBlockId === block.id ? "ring-2 ring-primary" : ""} p-2`}
    >
      <div className="flex items-center p-3 border-b bg-muted/50">
        <div {...listeners} {...attributes} className="mr-2 cursor-move">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 font-medium">
          {block.content.title || `${block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block`}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setActiveBlockId(activeBlockId === block.id ? null : block.id)}>
          {block.type === "text" && <AlignLeft className="h-4 w-4" />}
          {block.type === "image" && <ImageIcon className="h-4 w-4" />}
          {block.type === "video" && <Video className="h-4 w-4" />}
          {block.type === "list" && <List className="h-4 w-4" />}
          {block.type === "table" && <Table className="h-4 w-4" />}
          {block.type === "chart" && <BarChart className="h-4 w-4" />}
          {block.type === "presentation" && <Presentation className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => removeBlock(block.id)} className="text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {activeBlockId === block.id && <CardContent className="p-4">{renderBlockEditor(block)}</CardContent>}
    </Card>
  )
}
