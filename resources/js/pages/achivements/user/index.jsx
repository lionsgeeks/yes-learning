import { usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import AchievementTable from "@/components/achievement/achievementTable";

const Achievement = () => {
    const { quizzes, userQuiz } = usePage().props
    const breadcrumbs = [

        {
            title: "Achievements",
            href: `/Achievements`,
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Achievements"} />
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold">Achievements</h1>
                    <p className="text-muted-foreground mt-2">Track your learning progress and collect achievements</p>
                </div>

                <AchievementTable quizzes={quizzes} userQuiz={userQuiz} />
            </div>
        </AppLayout>
    );
};

export default Achievement;
