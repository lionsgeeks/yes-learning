import TransText from '@/components/TransText';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Award, BookOpen, ChevronRight, Clock, Folder } from 'lucide-react';

import AchievementTable from '@/components/achievement/achievementTable';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { courses, quizzes, userQuiz, auth } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6" dir={auth.user.language == 'ar' ? 'rtl' : 'ltr'}>
                <div>
                    <h1 className="text-3xl font-bold">
                        <TransText en="Welcome Back," fr="Bon retour," ar="مرحبًا بعودتك،" /> {auth.user.name}
                    </h1>
                    <h1 className="pt-2 text-2xl">
                        <TransText en="Continue learning" fr="Continuer à apprendre" ar="واصل التعلم" />
                    </h1>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    {courses.slice(0, 2).map((course, index) => (
                        <div
                            key={index}
                            className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border"
                        >
                            <img className="h-[65%] w-full object-cover" src={'/storage/' + course.image} alt="" />
                            <div className="flex-col gap-y-2 p-2">
                                <h1 className='truncate'>
                                    <TransText {...JSON.parse(course.name)} />
                                </h1>
                                <p>
                                    <TransText en="Modules" fr="Modules" ar="الوحدات" />: {course.chapterCount}
                                </p>
                                <Progress value={(course.completedCount / course.chapterCount) * 100} className="mt-2 mb-2 h-2" />

                                <div className="flex gap-2">
                                    <p>{(course.completedCount ? (course.completedCount / course.chapterCount) * 100 : 0).toFixed(2)} %</p>
                                    <TransText en="Completed Modules" fr="Modules terminés" ar="الوحدات المكتملة" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-2 md:min-h-min">
                    <Tabs defaultValue="courses" className="mt-6">
                        <TabsList className="grid w-full grid-cols-3 md:w-auto">
                            <TabsTrigger value="courses">
                                <TransText en="Courses" fr="Cours" ar="الدورات" />
                            </TabsTrigger>
                            <TabsTrigger value="achievements">
                                <TransText en="Achievements" fr="Réalisations" ar="الإنجازات" />
                            </TabsTrigger>
                            <TabsTrigger value="library">
                                <TransText en="Library" fr="Bibliothèque" ar="المكتبة" />
                            </TabsTrigger>
                            {/* <TabsTrigger value="stats">
                                <TransText
                                    en="Statistics"
                                    fr="Statistiques"
                                    ar="الإحصائيات"
                                />
                            </TabsTrigger> */}
                        </TabsList>

                        <TabsContent value="courses" className="mt-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {courses.map((course) => (
                                    <Card key={course} className="overflow-hidden pt-0">
                                        <div className="relative h-40">
                                            <img
                                                src={`storage/${course.image}`}
                                                alt={`Course ${course.image}`}
                                                width={400}
                                                height={160}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader className="pb-2">
                                            <CardTitle className={`text-lg ${auth.user.language !== 'ar' ? '' : 'flex justify-end'}`}>
                                                <TransText
                                                    en={'Course Title: ' + JSON.parse(course.name).en}
                                                    fr={'Titre du cours : ' + JSON.parse(course.name).fr}
                                                    ar={JSON.parse(course.name).ar}
                                                />
                                            </CardTitle>
                                            <CardDescription className={`flex ${auth.user.language == 'ar' ? 'justify-end gap-2' : ''}`}>
                                                {/* <Clock className="h-4 w-4 mr-1" /> */}
                                                {/* <span>{course.estimated_duration}</span> */}
                                                {/* <span className="mx-2">•</span> */}
                                                <Folder className="mr-1 h-4 w-4" />
                                                <p>
                                                    {course.chapterCount} <span> </span>
                                                    <TransText en="Modules" fr="Modules" ar="الوحدات" />
                                                </p>
                                            </CardDescription>
                                        </CardHeader>
                                        <Link href={`course/` + course.id} className="block">
                                            <CardContent className="cursor-pointer">
                                                <Button variant="outline" className="w-full cursor-pointer border py-2">
                                                    <TransText en="Take the course" fr="Suivre le cours" ar="التحق بالدورة" />
                                                </Button>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="achievements" className="mt-6">
                            <AchievementTable quizzes={quizzes} userQuiz={userQuiz} />
                        </TabsContent>

                        <TabsContent value="library" className="mt-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((module) => (
                                    <Card key={module}>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg">Module {module}</CardTitle>
                                            <CardDescription>{module <= 2 ? 'Completed' : module <= 3 ? 'In Progress' : 'Locked'}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Link
                                                href={`/module/${module}`}
                                                className={`flex items-center ${module > 3 ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:underline'}`}
                                            >
                                                {module <= 3 ? (
                                                    <>
                                                        View Module <ChevronRight className="ml-1 h-4 w-4" />
                                                    </>
                                                ) : (
                                                    'Complete previous modules to unlock'
                                                )}
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="stats" className="mt-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Learning Progress</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Web Development Track</span>
                                                    <span>65%</span>
                                                </div>
                                                {/* <Progress value={65} className="h-2" /> */}
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>UI/UX Design Track</span>
                                                    <span>40%</span>
                                                </div>
                                                {/* <Progress value={40} className="h-2" /> */}
                                            </div>
                                            <div>
                                                <div className="mb-1 flex justify-between text-sm">
                                                    <span>Data Science Track</span>
                                                    <span>25%</span>
                                                </div>
                                                {/* <Progress value={25} className="h-2" /> */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Learning Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <BookOpen className="text-muted-foreground mr-2 h-5 w-5" />
                                                    <span>Courses Completed</span>
                                                </div>
                                                <span className="font-medium">4</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Clock className="text-muted-foreground mr-2 h-5 w-5" />
                                                    <span>Hours Spent Learning</span>
                                                </div>
                                                <span className="font-medium">32</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Award className="text-muted-foreground mr-2 h-5 w-5" />
                                                    <span>Achievements Earned</span>
                                                </div>
                                                <span className="font-medium">3</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
}
