import React from "react";
import { usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

const Course = () => {

    const breadcrumbs = [

        {
            title: "Courses", 
            href: `/courses`, 
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Courses"} />
            <div className="p-6">

            </div>
        </AppLayout>
    );
};

export default Course;
