import React from "react";
import { usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

const CourseDetails = () => {
    const { course } = usePage().props;

    const breadcrumbs = [

        {
            title: course.name, 
            href: `/course/${course.id}`, 
        },  
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.name} />
            <div className="p-6">
                <h1 className="text-2xl font-bold">{course.name}</h1>
                <p className="mt-2 text-gray-600">{course.description}</p>
            </div>
        </AppLayout>
    );
};

export default CourseDetails;
