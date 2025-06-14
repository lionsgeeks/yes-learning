import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { CourseCard } from '@/components/courses/course-card';
import { CreateCourseModal } from '@/components/courses/create/create-course-modal';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    {
        title: 'Courses',
        href: `/admin/courses`,
    },
];

const AdminCourses = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { courses } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Courses'} />
            <div className="space-y-6 p-3 lg:p-6">
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
    );
};

export default AdminCourses;
