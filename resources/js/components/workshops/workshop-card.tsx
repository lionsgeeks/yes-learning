"use client"

import type React from "react"

import { MoreHorizontal, Calendar, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DeleteWorkshopDialog } from "@/components/workshops/delete-workshop-dialog"
import { useState } from "react"

interface WorkshopCardProps {
  workshop: {
    id: string
    title: string
    description: string
    course: string
    date: string
    subWorkshops: number
    enrolledStudents: number
    maxCapacity: number
    isComplete: boolean
    status?: "draft" | "published"
  }
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on the dropdown menu
    if ((e.target as HTMLElement).closest("[data-dropdown-trigger]")) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const isDraft = workshop.status === "draft" || !workshop.status

  return (
    <Card className="overflow-hidden pb-0 transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{workshop.title}</CardTitle>
            </div>
            <CardDescription className="line-clamp-1 mt-1">{workshop.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild data-dropdown-trigger onClick={handleClick}>
              <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Handle edit action
                }}
              >
                Edit Workshop
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDeleteDialogOpen(true)
                }}
              >
                Delete Workshop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Badge variant="outline" className="mr-2">
              {workshop.course}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{new Date(workshop.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>
              {workshop.enrolledStudents}/{workshop.maxCapacity} Students
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className={`border-t px-6 py-3 ${!workshop.isComplete ? "bg-amber-50" : "bg-muted/50"}`}>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">{workshop.subWorkshops} Sub-Workshops</span>

          {!workshop.isComplete && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">Incomplete</span>
            </div>
          )}
        </div>
      </CardFooter>

      <DeleteWorkshopDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        workshopTitle={workshop.title}
      />
    </Card>
  )
}

