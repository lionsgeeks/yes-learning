"use client"


import { Edit, Trash2, MoreHorizontal, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Link, router } from "@inertiajs/react"

interface CourseCardProps {
  course: {
    id: string
    name: string
    description: string
    image: string
    chaptersCount: number
    published: boolean
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)


  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md gap-3 pb-0">
        <Link href={`/admin/courses/${course.id}`}>
          <div className="relative aspect-video overflow-hidden">
            <img
              src={course.image}
              alt={course.name}
              className="object-cover transition-transform hover:scale-105"
            />
            {/* {!course.published && (
              <Badge variant="secondary" className="absolute right-2 top-2">
                Draft
              </Badge>
            )} */}
          </div>
        </Link>
        <CardHeader className="px-4">
          <div className="flex items-start justify-between">
            <Link href={`/admin/courses/${course.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg line-clamp-1">{course.name}</h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.visit(`/admin/courses/${course.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.visit(`/admin/courses/${course.id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <p className=" line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {course.chaptersCount} {course.chaptersCount === 1 ? "chapter" : "chapters"}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/courses/${course.id}`}>Manage</Link>
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the course and all its chapters and content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={()=>{}}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

