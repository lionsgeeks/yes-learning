"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, AlertTriangle, CheckCircle2 } from "lucide-react"
import { format, isPast } from "date-fns"

export function SubWorkshopCard({ subWorkshop }) {
  // Check for missing information
  const missingInfo = []
  if (!subWorkshop.date) missingInfo.push("date")
  if (!subWorkshop.time) missingInfo.push("time")
  if (!subWorkshop.instructor) missingInfo.push("instructor")
  if (!subWorkshop.meetLink) missingInfo.push("meet link")

  // Check if the sub-workshop has already passed
  const isPastWorkshop = subWorkshop.date && isPast(new Date(`${subWorkshop.date} ${subWorkshop.time}`))

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{subWorkshop.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {subWorkshop.subCourse}
              </Badge>
              <Badge variant="secondary" className="text-xs uppercase">
                {subWorkshop.language}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-col gap-2">
          {subWorkshop.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {subWorkshop.description}
            </p>
          )}

          {subWorkshop.date && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{format(new Date(subWorkshop.date), "MMM d, yyyy")}</span>
              {subWorkshop.time && <span className="ml-1">at {subWorkshop.time}</span>}
              {isPastWorkshop && (
                <Badge variant="outline" className="ml-2 text-xs text-muted-foreground">
                  Passed
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>
              {subWorkshop.enrolledStudents}/{subWorkshop.maxCapacity} Students
            </span>
          </div>

          {subWorkshop.instructor && (
            <div className="mt-1">
              <div className="text-xs font-medium text-muted-foreground mb-1">Instructor:</div>
              <div className="flex items-center gap-2 text-sm">
                <span>{subWorkshop.instructor}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {missingInfo.length > 0 && (
        <CardFooter className="border-t bg-amber-50 px-4 py-2">
          <div className="flex items-center gap-2 text-amber-600 w-full">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs">Missing: {missingInfo.join(", ")}</span>
          </div>
        </CardFooter>
      )}

      {isPastWorkshop && missingInfo.length === 0 && (
        <CardFooter className="border-t bg-muted px-4 py-2">
          <div className="flex items-center gap-2 text-muted-foreground w-full">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs">Completed</span>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}