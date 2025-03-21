"use client"
import React, { useState } from 'react';
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { ArrowLeft, Edit, Plus, GripVertical, Eye, Settings, FileText, Pencil } from "lucide-react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable, } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EditCourseModal } from "@/components/courses/edit-course-modal"

// Sample data - in a real app, this would come from a database
const course = {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
    image: "/placeholder.svg?height=400&width=800",
    tagline: "Start your web development journey",
    published: true,
    chapters: [
        {
            id: "ch1",
            title: "Introduction to Web Development",
            description: "Overview of web development and the technologies involved.",
            position: 1,
            published: true,
            duration: "10 min",
        },
        {
            id: "ch2",
            title: "HTML Basics",
            description: "Learn the fundamentals of HTML markup language.",
            position: 2,
            published: true,
            duration: "15 min",
        },
        {
            id: "ch3",
            title: "CSS Styling",
            description: "Style your HTML with Cascading Style Sheets.",
            position: 3,
            published: true,
            duration: "20 min",
        },
        {
            id: "ch4",
            title: "JavaScript Fundamentals",
            description: "Introduction to programming with JavaScript.",
            position: 4,
            published: false,
            duration: "25 min",
        },
    ],
    quizzes: [
        {
            id: "q1",
            title: "HTML Quiz",
            questionCount: 10,
            published: true,
        },
        {
            id: "q2",
            title: "CSS Quiz",
            questionCount: 8,
            published: false,
        },
    ],
}

function SortableChapter({ chapter, onTogglePublish, onEdit }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }




    return (
        <div ref={setNodeRef} style={style} className="flex items-center p-4 border-b last:border-b-0">
            <div className="flex items-center mr-4 cursor-move" {...attributes} {...listeners}>
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                        {chapter.position}
                    </div>
                    <div>
                        <h3 className="font-medium truncate">{chapter.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">{chapter.description}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 ml-4">
                <div className="text-sm text-muted-foreground">{chapter.duration}</div>
                <Switch checked={chapter.published} onCheckedChange={() => onTogglePublish(chapter.id)} />
                <Button variant="outline" size="icon" onClick={() => onEdit(chapter)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}



const AdminCoursesShow = () => {

    const [chapters, setChapters] = useState(course.chapters)
    const [editModalOpen, setEditModalOpen] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    const handleTogglePublish = (chapterId) => {
        setChapters(
            chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, published: !chapter.published } : chapter)),
        )
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (active.id !== over.id) {
            setChapters((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                const newItems = [...items]
                const [movedItem] = newItems.splice(oldIndex, 1)
                newItems.splice(newIndex, 0, movedItem)

                // Update positions
                return newItems.map((item, index) => ({
                    ...item,
                    position: index + 1,
                }))
            })
        }
    }


    const handleEditChapter = (chapter) => {
        router.push(`/dashboard/courses/jhg/chapters/${chapter.id}`)
    }


    return (
        <AppLayout>
            <Head title={"Courses"} />
            <div className="space-y-6 lg:p-6 p-3 ">

                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/courses">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Link>
                    </Button>
                    <Button variant="outline" onClick={() => setEditModalOpen(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Course
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/dashboard/courses/jhg/workshops/new`}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Workshop
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/preview/courses/jhg`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="relative p-0 overflow-hidden aspect-video">
                            <img src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                            {!course.published && (
                                <Badge variant="secondary" className="absolute right-2 top-2">
                                    Draft
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="p-6">
                            <p>{course.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Course Statistics</CardTitle>
                            <CardDescription>Overview of your course content and engagement</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Chapters</p>
                                    <p className="text-2xl font-bold">{course.chapters.length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Quizzes</p>
                                    <p className="text-2xl font-bold">{course.quizzes.length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Published</p>
                                    <p className="text-2xl font-bold">
                                        {course.chapters.filter((ch) => ch.published).length}/{course.chapters.length}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Total Duration</p>
                                    <p className="text-2xl font-bold">70 min</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="chapters" className="mt-6">
                    <TabsList>
                        <TabsTrigger value="chapters">
                            <FileText className="h-4 w-4 mr-2" />
                            Chapters
                        </TabsTrigger>
                        <TabsTrigger value="quizzes">
                            <Settings className="h-4 w-4 mr-2" />
                            Quizzes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="chapters" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Course Chapters</h2>
                            <Button asChild>
                                <Link href={`/dashboard/courses/dd/chapters/new`}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Chapter
                                </Link>
                            </Button>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={chapters.map((chapter) => chapter.id)} strategy={verticalListSortingStrategy}>
                                        {chapters.map((chapter) => (
                                            <SortableChapter
                                                key={chapter.id}
                                                chapter={chapter}
                                                onTogglePublish={handleTogglePublish}
                                                onEdit={handleEditChapter}
                                            />
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="quizzes" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Course Quizzes</h2>
                            <Button asChild>
                                <Link href={`/dashboard/courses/dd/quizzes/new`}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Quiz
                                </Link>
                            </Button>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {course.quizzes.map((quiz) => (
                                        <div key={quiz.id} className="flex items-center p-4">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium">{quiz.title}</h3>
                                                <p className="text-sm text-muted-foreground">{quiz.questionCount} questions</p>
                                            </div>

                                            <div className="flex items-center gap-4 ml-4">
                                                <Switch checked={quiz.published} />
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/dashboard/courses/dd/quizzes/${quiz.id}`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <EditCourseModal course={course} open={editModalOpen} onOpenChange={setEditModalOpen} />

        </AppLayout>
    )
};

export default AdminCoursesShow;