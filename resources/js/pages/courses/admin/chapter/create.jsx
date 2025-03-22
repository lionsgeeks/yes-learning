import React, { useState } from 'react';
import { Plus } from "lucide-react"
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CoursePreview } from "@/components/courses/course-preview"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import ChapterDetails from '../../../../components/courses/create/create-chapter-details';
import ChapterContent from '../../../../components/courses/create/create-chapter-content';
import CreateQuizPage from '../../../../components/quizComponents/createQuiz';


const AdminCoursesCreate = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState("details")
    const [subcourses, setSubcourses] = useState([
        { id: "subcourse-1", title: "Introduction", description: "", blocks: [] },
        { id: "subcourse-2", title: "Core Concepts", description: "", blocks: [] },
    ])
    const [activeSubcourse, setActiveSubcourse] = useState("subcourse-1")

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            // router.push("/admin/courses")
        }, 1500)
    }

    const addSubcourse = () => {
        const newId = `subcourse-${subcourses.length + 1}`
        setSubcourses([...subcourses, { id: newId, title: `Module ${subcourses.length + 1}`, description: "", blocks: [] }])
        setActiveSubcourse(newId)
    }

    const updateSubcourse = (id, data) => {
        setSubcourses(subcourses.map((subcourse) => (subcourse.id === id ? { ...subcourse, ...data } : subcourse)))
    }
    const deleteSubcourse = (id) => {
        setSubcourses(subcourses.filter((subcourse) => subcourse.id !== id));
    };

    const onDragEnd = (result) => {
        // Implement drag and drop reordering logic
        if (!result.destination) return

        const items = Array.from(subcourses)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setSubcourses(items)
    }

    return (
        <AppLayout>
            <Head title={"Chapter"} />
            <div className="space-y-6 lg:p-6 p-3 ">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Button variant="ghost" size="sm" asChild className="mr-2">
                                <Link href="/admin/courses">
                                    <ArrowLeft className="h-4 w-4 mr-1" />
                                    Back
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                        </div>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Course
                                </>
                            )}
                        </Button>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="details">Course Details</TabsTrigger>
                            <TabsTrigger value="content">Content & Modules</TabsTrigger>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="quizz">Quizz</TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4 grid grid-cols-5 gap-4">
                            <ChapterDetails setActiveTab={setActiveTab} />
                        </TabsContent>

                        <TabsContent value="content" className="space-y-4">
                            <ChapterContent deleteSubcourse={deleteSubcourse} updateSubcourse={updateSubcourse} onDragEnd={onDragEnd} addSubcourse={addSubcourse} subcourses={subcourses} activeSubcourse={activeSubcourse} setSubcourses={setSubcourses} />
                        </TabsContent>

                        <TabsContent value="preview">
                            <CoursePreview course={{ title: "Course Title", description: "Course description will appear here.", subcourses: subcourses, }} />
                            <div className="flex justify-between mt-6">
                                <Button variant="outline" onClick={() => setActiveTab("content")}>
                                    Back to Content
                                </Button>
                                <Button onClick={() => setActiveTab("quizz")}>Go to Quizz</Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="quizz">
                            <CreateQuizPage />
                            <div className="flex justify-between mt-6">
                                <Button variant="outline" onClick={() => setActiveTab("content")}>
                                    Back to Content
                                </Button>
                                <Button onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Course
                                        </>
                                    )}
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

        </AppLayout>
    )
};

export default AdminCoursesCreate;