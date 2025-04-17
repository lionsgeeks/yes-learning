"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"

interface TableBlockEditorProps {
  content: {
    title: string
    rows: number
    cols: number
    data: string[][]
  }
  onChange: (content: TableBlockEditorProps["content"]) => void
}

export function TableBlockEditor({ content, onChange }: TableBlockEditorProps) {
  useEffect(() => {
    if (!content.data || content.data.length === 0) {
      const initialData = Array.from({ length: content.rows }, () =>
        Array.from({ length: content.cols }, () => "")
      )

      onChange({
        ...content,
        data: initialData,
      })
    }
  }, [])

  const updateDimensions = (rows: number, cols: number) => {
    const newData = Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => content.data?.[rowIndex]?.[colIndex] || "")
    )

    onChange({
      ...content,
      rows,
      cols,
      data: newData,
    })
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newData = content.data.map((row) => [...row]) // Deep copy to avoid mutation issues
    newData[rowIndex][colIndex] = value

    onChange({
      ...content,
      data: newData,
    })
  }

  const addRow = () => updateDimensions(content.rows + 1, content.cols)
  const removeRow = () => content.rows > 1 && updateDimensions(content.rows - 1, content.cols)
  const addColumn = () => updateDimensions(content.rows, content.cols + 1)
  const removeColumn = () => content.cols > 1 && updateDimensions(content.rows, content.cols - 1)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Table Title</Label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter table title"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Table Dimensions</Label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={removeRow} disabled={content.rows <= 1}>
              <Trash2 className="h-3 w-3 mr-1" />
              Row
            </Button>
            <Button variant="outline" size="sm" onClick={addRow}>
              <Plus className="h-3 w-3 mr-1" />
              Row
            </Button>
            <Button variant="outline" size="sm" onClick={removeColumn} disabled={content.cols <= 1}>
              <Trash2 className="h-3 w-3 mr-1" />
              Column
            </Button>
            <Button variant="outline" size="sm" onClick={addColumn}>
              <Plus className="h-3 w-3 mr-1" />
              Column
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                {Array.from({ length: content.cols }).map((_, colIndex) => (
                  <th key={colIndex} className="border p-2">
                    <Input
                      value={content.data?.[0]?.[colIndex] || ""}
                      onChange={(e) => updateCell(0, colIndex, e.target.value)}
                      placeholder={`Header ${colIndex + 1}`}
                      className="border-0 p-0 h-8 bg-transparent"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: content.rows - 1 }).map((_, rowIndex) => (
                <tr key={rowIndex + 1}>
                  {Array.from({ length: content.cols }).map((_, colIndex) => (
                    <td key={colIndex} className="border p-2">
                      <Input
                        value={content.data?.[rowIndex + 1]?.[colIndex] || ""}
                        onChange={(e) => updateCell(rowIndex + 1, colIndex, e.target.value)}
                        placeholder={`Cell ${rowIndex + 1},${colIndex + 1}`}
                        className="border-0 p-0 h-8"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
