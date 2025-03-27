import React, { useEffect, useState } from 'react';
import { usePage, Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
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
        { id: 'subcourse-1', title: 'Chapter 1', description: '', block: [] }
    ])
    const [activeSubcourse, setActiveSubcourse] = useState("subcourse-1")
    const courseId = new URLSearchParams(window.location.search).get("course");



    const { data, setData, post, processing } = useForm({
        title: "",
        description: "",
        estimated_duration: "",
        published: false,
        enable_certificate: false,
        enable_discussion: false,
        content: [],
        course_id: courseId,

        quizTitle: '',
        quizDescription: '',
        quizTime: '',
        quizPublish: 0,
        questions: [],
    });
    useEffect(() => {
        setData("content", subcourses)
    }, [subcourses])


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitting:", data);

        post(route('chapter.store'), {
            data: data,
            onFinish: () => {
                setData({
                    title: "",
                    description: "",
                    estimated_duration: "",
                    published: false,
                    enable_certificate: false,
                    enable_discussion: false,
                    content: [],
                    course_id: courseId,

                    quizTitle: '',
                    quizDescription: '',
                    quizTime: '',
                    quizPublish: 0,
                    questions: [],
                });
            },
        });
    };

    const addSubcourse = () => {
        const newId = `subcourse-${subcourses.length + 1}`
        setSubcourses([...subcourses, { id: newId, title: `Chapter ${subcourses.length + 1}`, description: "", blocks: [] }])
        setActiveSubcourse(newId)
    }

    const updateSubcourse = (id, data) => {
        setSubcourses(subcourses.map((subcourse) => (subcourse.id === id ? { ...subcourse, ...data } : subcourse)))
    }
    const deleteSubcourse = (id) => {
        setSubcourses(subcourses.filter((subcourse) => subcourse.id !== id));
    };

    const onDragEnd = (result) => {
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
                            <ChapterDetails data={data} setData={setData} setActiveTab={setActiveTab} />
                        </TabsContent>

                        <TabsContent value="content" className="space-y-4">
                            <ChapterContent
                                data={data}
                                setData={setData}
                                deleteSubcourse={deleteSubcourse}
                                updateSubcourse={updateSubcourse}
                                onDragEnd={onDragEnd}
                                addSubcourse={addSubcourse}
                                subcourses={subcourses}
                                activeSubcourse={activeSubcourse}
                                setActiveSubcourse={setActiveSubcourse}
                                setSubcourses={setSubcourses} />
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
                            <CreateQuizPage
                                data={data}
                                setData={setData}
                            />
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
