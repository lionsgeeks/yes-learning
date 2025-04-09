'use client';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowLeft, Edit, Eye, GripVertical, Pencil, Plus } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { EditCourseModal } from "@/components/courses/edit-course-modal"

import AdminUsersTable from "@/components/usersComponents/admin-users-table.jsx"
import CreateQuizPage from '../../../components/quizComponents/createQuiz';

import { Card, CardContent, CardHeader } from '@/components/ui/card';


// Sample data - in a real app, this would come from a database

function SortableChapter({ chapter, onTogglePublish, onEdit, idx }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: chapter.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex items-center border-b p-4 last:border-b-0">
            <div className="mr-4 flex cursor-move items-center" {...attributes} {...listeners}>
                <GripVertical className="text-muted-foreground h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-center">
                    <div className="bg-primary/10 text-primary mr-3 flex h-8 w-8 items-center justify-center rounded-full">{idx + 1}</div>
                    <div>
                        <h3 className="truncate font-medium">{chapter.title.en}</h3>
                        <p className="text-muted-foreground truncate text-sm">{chapter.description.en}...</p>
                    </div>
                </div>
            </div>

            <div className="ml-4 flex items-center gap-4">
                <Switch checked={chapter.published} onCheckedChange={() => onTogglePublish(chapter.id)} />
                <Button variant="outline" size="icon" onClick={() => onEdit(chapter)}>
                    <Pencil className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

const AdminCoursesShow = () => {
    const { course, modules, courseQuiz } = usePage().props
    console.log(course)
    const breadcrumbs = [{ title: 'course - ' + course.name.en }];

    const [chapters, setChapters] = useState(modules);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleTogglePublish = (chapterId) => {
        setChapters(chapters.map((chapter) => (chapter.id === chapterId ? { ...chapter, published: !chapter.published } : chapter)));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setChapters((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = [...items];
                const [movedItem] = newItems.splice(oldIndex, 1);
                newItems.splice(newIndex, 0, movedItem);

                // Update positions
                return newItems.map((item, index) => ({
                    ...item,
                    position: index + 1,
                }));
            });
        }
    };

    const handleEditChapter = (chapter) => {
        router.push(`/dashboard/courses/jhg/chapters/${chapter.id}`)
    }




    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Courses'} />
            <div className="space-y-6 p-3 lg:p-6">
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/courses">
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
                        <CardHeader className="relative aspect-video overflow-hidden p-0">
                            <img src={course.image} alt={course.name.en} fill className="object-cover" />
                            {!course.published && (
                                <Badge variant="secondary" className="absolute top-2 right-2">
                                    Draft
                                </Badge>
                            )}
                        </CardHeader>
                        <CardContent className="p-">
                            <p className='text-xl font-bold'>{course.name.en}</p>
                            <p>{course.description.en}</p>
                        </CardContent>
                    </Card>

                    <Card className="h-[70vh] overflow-y-auto">
                        <CardHeader>
                            {/* <CardTitle>Course Statistics</CardTitle>
                            <CardDescription>Overview of your course content and engagement</CardDescription> */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Course Chapters</h2>
                                <Button asChild>
                                    <Link href={`/admin/chapter/create?course=` + course.id}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Chapter
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={chapters.map((chapter) => chapter.id)} strategy={verticalListSortingStrategy}>
                                    {chapters.map((chapter, idx) => (
                                        <>
                                            <SortableChapter
                                                key={chapter.id}
                                                chapter={chapter}
                                                onTogglePublish={handleTogglePublish}
                                                onEdit={handleEditChapter}
                                                idx={idx}
                                            />
                                        </>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </CardContent>
                    </Card>
                </div>


                {/* Quiz Creation */}
                <CreateQuizPage course_id={course.id} courseQuiz={courseQuiz} />


                <div className="">
                    <AdminUsersTable role title="Enrolled users" description="Manage NGOs enrolled in this course" Users={course.users} />
                    {/* <Achievement achievement={initialAchievements }/> */}
                </div>
            </div>

            <EditCourseModal course={course} open={editModalOpen} onOpenChange={setEditModalOpen} />

        </AppLayout>
    );
};

export default AdminCoursesShow;
