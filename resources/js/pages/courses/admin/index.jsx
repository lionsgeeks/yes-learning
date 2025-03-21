import React, { useState } from 'react';
import { Plus } from "lucide-react"
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { CreateCourseModal } from "@/components/courses/create-course-modal"


// Sample data - in a real app, this would come from a database
const courses = [
    {
        id: "1",
        title: "Web Development Fundamentals",
        description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
        image: "/placeholder.svg?height=220&width=400",
        tagline: "Start your web development journey",
        chaptersCount: 8,
        published: true,
    },
    {
        id: "2",
        title: "React.js for Beginners",
        description: "A comprehensive introduction to React.js and modern frontend development.",
        image: "/placeholder.svg?height=220&width=400",
        tagline: "Build interactive UIs with React",
        chaptersCount: 12,
        published: true,
    },
    {
        id: "3",
        title: "Advanced Node.js",
        description: "Take your Node.js skills to the next level with advanced concepts and patterns.",
        image: "/placeholder.svg?height=220&width=400",
        tagline: "Master server-side JavaScript",
        chaptersCount: 10,
        published: false,
    },
]


const AdminCourses = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    return (
        <AppLayout>
            <Head title={"Courses"} />
            <div className="space-y-6 lg:p-6 p-3 ">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                        <p className="text-muted-foreground">Create and manage your courses</p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Course
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            <CreateCourseModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />

        </AppLayout>
    )
};

export default AdminCourses;