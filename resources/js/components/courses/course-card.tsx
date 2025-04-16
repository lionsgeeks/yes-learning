'use client';

import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { EditCourseModal } from '@/components/courses/edit-course-modal';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import TruncateText from '../TruncateText';

interface CourseCardProps {
    course: {
        id: string;
        name: {
            en: string;
            fr: string;
            ar: string;
        };
        label: {
            en: string;
            fr: string;
            ar: string;
        };
        description: {
            en: string;
            fr: string;
            ar: string;
        };
        image: string;
        chaptersCount: number;
        published: boolean;
    };
}

export function CourseCard({ course }: CourseCardProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const { delete: destroy } = useForm();
    const [editModalOpen, setEditModalOpen] = useState(false);

    return (
        <div>
            <Card className="gap-3 overflow-hidden transition-all hover:shadow-md p-0">
                <Link href={`/admin/courses/${course.id}`}>
                    <div className="relative aspect-video overflow-hidden">
                        <img src={course.image} alt={course.name.en} className="object-cover transition-transform hover:scale-105" />
                        {!course.published && (
                            <Badge variant="secondary" className="absolute top-2 right-2">
                                Draft
                            </Badge>
                        )}
                        <Badge className="absolute top-2 left-2"> <TruncateText text={course.label.en} length={10} />  </Badge>
                    </div>
                </Link>
                <CardHeader className="px-4">
                    <div className="flex items-start justify-between">
                        <Link href={`/admin/courses/${course.id}`} className="hover:underline">
                            <h3 className="line-clamp-1 text-lg font-semibold"><TruncateText text={course.name.en} length={19} /> </h3>
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
                                <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setShowDeleteAlert(true)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="px-4 pt-0">
                    <p className="text-muted-foreground line-clamp-2 text-sm">{course.description.en}</p>
                </CardContent>
                <CardFooter className="flex justify-between p-4 pt-0">
                    {/* <div className="text-sm text-muted-foreground">
            {course.chaptersCount} {course.chaptersCount === 1 ? "chapter" : "chapters"}
          </div> */}
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
                            onClick={() => {
                                destroy(route('course.destroy', course.id));
                            }}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <EditCourseModal course={course} open={editModalOpen} onOpenChange={setEditModalOpen} />
        </div>
    );
}
