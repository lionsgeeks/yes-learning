  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, AlertTriangle, CheckCircle2 } from "lucide-react"
import { format, isPast } from "date-fns"

interface SubWorkshopCardProps {
  subWorkshop: {
    id: string
    name: string
    description: string
    subCourse: string
    date: string
    time: string
    language: string
    instructors: {
      english: string
      french: string
      arabic: string
    }
    meetLinks: {
      english: string
      french: string
      arabic: string
    }
    enrolledStudents: number
    maxCapacity: number
    isComplete: boolean
  }
}

export function SubWorkshopCard({ subWorkshop }: SubWorkshopCardProps) {
  // Check for missing information
  const missingInfo = []
  if (!subWorkshop.date) missingInfo.push("date")
  if (!subWorkshop.time) missingInfo.push("time")

  // Check if any language is missing instructor or meet link
  const languages = ["english", "french", "arabic"]
  const missingInstructors = languages.filter(
    (lang) => !subWorkshop.instructors[lang as keyof typeof subWorkshop.instructors],
  )
  const missingMeetLinks = languages.filter(
    (lang) => !subWorkshop.meetLinks[lang as keyof typeof subWorkshop.meetLinks],
  )

  if (missingInstructors.length > 0) {
    missingInfo.push(`instructor (${missingInstructors.map((l) => l.substring(0, 2).toUpperCase()).join(", ")})`)
  }

  if (missingMeetLinks.length > 0) {
    missingInfo.push(`meet link (${missingMeetLinks.map((l) => l.substring(0, 2).toUpperCase()).join(", ")})`)
  }

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
              <div className="flex gap-1">
                <Badge variant="secondary" className="text-xs">
                  EN
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  FR
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  AR
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex flex-col gap-2">
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

          <div className="mt-1 space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Instructors:</div>
            <div className="grid grid-cols-3 gap-1 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-4 px-1 bg-primary rounded-l">
                  EN
                </div>
                <span className="truncate">{subWorkshop.instructors.english || "—"}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 px-1 bg-primary rounded-l">
                  FR
                </div>
                <span className="truncate">{subWorkshop.instructors.french || "—"}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 px-1 bg-primary rounded-l">
                  AR
                </div>
                <span className="truncate">{subWorkshop.instructors.arabic || "—"}</span>
              </div>
            </div>
          </div>
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

