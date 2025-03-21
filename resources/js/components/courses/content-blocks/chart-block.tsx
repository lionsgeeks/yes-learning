"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Plus, Trash2 } from "lucide-react"

interface ChartBlockEditorProps {
  content: {
    title: string
    type: string
    data: any[]
  }
  onChange: (content: ChartBlockEditorProps["content"]) => void
}

export function ChartBlockEditor({ content, onChange }: ChartBlockEditorProps) {
  // Initialize with sample data if empty
  if (!content.data || !content.data.length) {
    const sampleData = [
      { name: "Category A", value: 40 },
      { name: "Category B", value: 30 },
      { name: "Category C", value: 20 },
      { name: "Category D", value: 10 },
    ]

    onChange({
      ...content,
      type: content.type || "bar",
      data: sampleData,
    })
  }

  const addDataPoint = () => {
    onChange({
      ...content,
      data: [...content.data, { name: `Category ${content.data.length + 1}`, value: 0 }],
    })
  }

  const removeDataPoint = (index: number) => {
    onChange({
      ...content,
      data: content.data.filter((_, i) => i !== index),
    })
  }

  const updateDataPoint = (index: number, field: string, value: any) => {
    const newData = [...content.data]
    newData[index] = {
      ...newData[index],
      [field]: field === "value" ? Number(value) : value,
    }

    onChange({
      ...content,
      data: newData,
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Chart Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter chart title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="chartType">Chart Type</Label>
        <Select value={content.type} onValueChange={(value) => onChange({ ...content, type: value })}>
          <SelectTrigger id="chartType">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Bar Chart
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                Line Chart
              </div>
            </SelectItem>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Pie Chart
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Chart Data</Label>
          <Button variant="outline" size="sm" onClick={addDataPoint}>
            <Plus className="h-4 w-4 mr-2" />
            Add Data Point
          </Button>
        </div>

        <div className="space-y-2 mt-2">
          {content.data?.map((point, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={point.name}
                onChange={(e) => updateDataPoint(index, "name", e.target.value)}
                placeholder="Category name"
                className="flex-1"
              />
              <Input
                type="number"
                value={point.value}
                onChange={(e) => updateDataPoint(index, "value", e.target.value)}
                placeholder="Value"
                className="w-24"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeDataPoint(index)}
                disabled={content.data.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 bg-muted/30">
        <div className="text-sm font-medium mb-2">Chart Preview</div>
        <div className="h-48 flex items-center justify-center">
          <div className="text-muted-foreground">
            {content.type === "bar" && <BarChart className="h-12 w-12" />}
            {content.type === "line" && <LineChart className="h-12 w-12" />}
            {content.type === "pie" && <PieChart className="h-12 w-12" />}
          </div>
        </div>
      </div>
    </div>
  )
}

