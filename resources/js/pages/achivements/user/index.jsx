import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card"
import { Award, Badge, BookOpen, Trophy } from "lucide-react"
const Achievement = () => {
    const { quizzes, userQuiz } = usePage().props
    const breadcrumbs = [

        {
            title: "Achievements",
            href: `/Achievements`,
        },
    ];

    const didQuiz = (quizId) => {
        // console.log(userQuiz.find(item => item.quiz_id == quizId))
        return userQuiz.find(item => item.quiz_id == quizId);
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const [weekday, month, day, year] = formattedDate.split(' ');
        return `${weekday} ${day} ${month} ${year}`;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Achievements"} />
            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold">Achievements</h1>
                    <p className="text-muted-foreground mt-2">Track your learning progress and collect achievements</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        quizzes.map((quiz, i) => (
                            <>
                                <Card key={i} className={didQuiz(quiz.id) ? "" : "opacity-40"}>
                                    <Link href="" className="cursor-default" >
                                        <CardContent className="p-6">
                                            <div className="text-center">
                                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <Award className={`h-10 w-10 ${i < 8 ? "text-primary" : "text-muted-foreground"}`} />
                                                </div>
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {quiz.title}
                                                </h3>
                                                <div className="text-sm text-muted-foreground mb-3">
                                                    {userQuiz.find(item => item.quiz_id == quiz.id) ?

                                                        formatDate(userQuiz.find(item => item.quiz_id == quiz.id).created_at)
                                                        :
                                                        <>
                                                            <p>Not Achieved Yet.</p>
                                                        </>
                                                    }
                                                </div>
                                                <div className="text-xs bg-muted rounded p-2">
                                                    {quiz.description}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>

                                </Card>
                            </>
                        ))
                    }
                </div>
            </div>
        </AppLayout>
    );
};

export default Achievement;
