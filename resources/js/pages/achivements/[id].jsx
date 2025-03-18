import React from 'react';
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";


const AchivementDetails = () => {
    const { achivement } = usePage().props;
    
        const breadcrumbs = [
    
            {
                title: achivement.name,
                href: `/achivement/${achivement.id}`,
            },
        ];
        
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title={achivement.name} />
        <div >

        </div>
    </AppLayout>
    );
};

export default AchivementDetails;