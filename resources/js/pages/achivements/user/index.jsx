import { usePage, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

import AchievementTable from "@/components/achievement/achievementTable";
import TransText from "@/components/TransText"
const Achievement = () => {
    const { quizzes, userQuiz, auth } = usePage().props
    const breadcrumbs = [

        {
            title: "Achievements",
            href: `/Achievements`,
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}
        >
            <Head title={"Achievements"} />
            <div className="space-y-6 p-6"
                dir={auth.user.language == "ar" ? 'rtl' : 'ltr'}
            >
                <div>
                    <h1 className="text-3xl font-bold">
                        <TransText
                            en="Achievements"
                            fr="Réalisations"
                            ar="الإنجازات"
                        />
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        <TransText
                            en="Track your learning progress and collect achievements"
                            fr="Suivez vos progrès d'apprentissage et collectez des réalisations"
                            ar="تتبع تقدمك في التعلم واجمع الإنجازات"
                        />
                    </p>
                </div>

                <AchievementTable quizzes={quizzes} userQuiz={userQuiz} />
            </div>
        </AppLayout>
    );
};

export default Achievement;
