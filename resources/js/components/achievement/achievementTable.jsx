import { Link, usePage } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"
import TransText from "@/components/TransText"

export default function achievementTable({ quizzes, userQuiz }) {
    const { auth } = usePage().props

    const didQuiz = (quizId) => {
        return userQuiz.find(item => item.quiz_id == quizId);
    }

    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const locale = auth.user.language == "ar" ? 'ar-MA' : auth.user.language == "fr" ? 'fr-FR' : 'en-US'
        const formattedDate = date.toLocaleDateString(locale, options);

        const [weekday, month, day, year] = formattedDate.split(' ');
        return `${weekday} ${day} ${month} ${year}`;
    }
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    quizzes?.map((quiz, i) => (
                        <>
                            <Card key={i} className={`${didQuiz(quiz.id) ? "bg-beta/10" : "opacity-40"}`}>
                                <Link href="" className="cursor-default" >
                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Award className={`h-10 w-10 ${i < 8 ? "text-primary" : "text-muted-foreground"}`} />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-1">
                                                <TransText {...JSON.parse(quiz.title)} />
                                            </h3>
                                            <div className="text-sm text-muted-foreground mb-3 capitalize">
                                                {userQuiz.find(item => item.quiz_id == quiz.id) ?

                                                    formatDate(userQuiz.find(item => item.quiz_id == quiz.id).created_at)
                                                    :
                                                    <>
                                                        <p>
                                                            <TransText
                                                                en="Not Achieved Yet"
                                                                fr="Pas encore atteint"
                                                                ar="لم يتم تحقيقه بعد"
                                                            />
                                                        </p>
                                                    </>
                                                }
                                            </div>
                                            <div className="text-xs bg-muted rounded p-2">
                                                <TransText {...JSON.parse(quiz.description)} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        </>
                    ))
                }
            </div>
        </>
    )
}
