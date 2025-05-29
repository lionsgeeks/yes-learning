import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress";

const breadcrumbs = [
    {
        title: 'NGO Details',
        href: '/ngo_show',
    },
];

export default function NgoShowPage() {
    const { user, userCourses, userChapters, userQuiz, quizScore } = usePage().props;
    const lang = user?.language;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='NGO' />

            <div className='p-6'>
                <Card>
                    <CardContent className="space-y-4">
                        <div>
                            <h1 className='text-2xl font-semibold text-alpha mb-4'>NGO Details</h1>
                            <div className='grid grid-cols-4 gap-2'>
                                <div className='shadow p-2 border-l-2 border-alpha rounded'>
                                    <h1 className='text-xl text-alpha font-semibold'>Name</h1>
                                    <p>{user.name}</p>
                                </div>
                                <div className='shadow p-2 border-l-2 border-alpha rounded'>
                                    <h1 className='text-xl text-alpha font-semibold'>Email</h1>
                                    <p>{user.email}</p>
                                </div>
                                <div className='shadow p-2 border-l-2 border-alpha rounded'>
                                    <h1 className='text-xl text-alpha font-semibold'>Language</h1>
                                    <p>{user.language == 'en' ? 'English' : user.language == "ar" ? 'Arabic' : 'French'}</p>
                                </div>
                                <div className='shadow p-2 border-l-2 border-alpha rounded'>
                                    <h1 className='text-xl text-alpha font-semibold'>Registration Date</h1>
                                    <p>{new Date(user.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>



                        <div>
                            <h1 className='text-2xl font-semibold text-alpha mb-4'>Courses Details</h1>
                            <div className='grid grid-cols-3 gap-4'>
                                {userCourses.map((course, index) => {
                                    const courseChapters = userChapters.filter(chap => chap.course_id === course.id);
                                    const courseProgress = (courseChapters.length / course.chapters.length) * 100;

                                    const courseQuiz = userQuiz?.find(qz => qz.course_id === course.id);
                                    const courseScore = quizScore.find(scr => scr.quiz_id === courseQuiz?.id);
                                    const score = Math.round(courseScore?.score ?? 0);
                                    const quizDate = courseScore?.created_at ? new Date(courseScore.created_at).toLocaleString() : 'Not Yet';

                                    return (
                                        <div key={course.id ?? index} className="shadow-lg p-2 rounded border-t-2 border-beta space-y-3">
                                            <div className="flex items-center justify-start gap-4">
                                                <img
                                                    src={`/storage/${course.image}`}
                                                    alt="Course"
                                                    className="w-20 aspect-square rounded-full object-cover"
                                                />
                                                <div>
                                                    <a className="text-lg font-semibold "
                                                        href={`/admin/courses/${course.id}`}
                                                    >{course.name[lang]}</a>
                                                    <p className="px-2 mt-2 bg-beta/10 border border-beta/40 text-beta w-fit rounded-full">
                                                        {course.label[lang]}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-alpha">
                                                <div className="p-8 bg-alpha/10  rounded text-center">
                                                    <p className=" font-bold">CHAPTERS</p>
                                                    <p>{courseChapters.length} / {course.chapters.length}</p>
                                                </div>
                                                <div className="p-8 bg-alpha/10 rounded text-center">
                                                    <p className="font-bold">SCORE</p>
                                                    <p>{score}%</p>
                                                </div>
                                            </div>

                                            <div className=" text-center px-2 py-3 text-alpha">
                                                <div className="flex items-center justify-between">
                                                    <p className=" font-bold">Course Progress</p>
                                                    <p>{courseProgress.toFixed(0)}%</p>
                                                </div>
                                                <Progress value={courseProgress} className="mt-4 h-2" />
                                            </div>

                                            <div className="bg-beta/10 rounded text-center py-2 text-beta">
                                                <p>Quiz Completed On: {quizDate}</p>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>


                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
