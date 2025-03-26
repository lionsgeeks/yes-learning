import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, ChevronRight, Clock, Folder, Image } from 'lucide-react';
import { Button } from '@headlessui/react';
import { Progress } from '@/components/ui/progress';

const breadcrumbs = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {

  const { courses } = usePage().props
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-6">
        <div>
          <h1 className='text-3xl font-bold'>Welcome Back, Ayman!</h1>
          <h1 className='text-2xl pt-2'>Continue learning </h1>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <img className='h-[65%] w-full object-cover' src="/storage/ee6ab2d0dc78dda0ec5e0c0583bf9e72.jpg" alt="" />
            <div className='p-2 flex-col gap-y-2'>
              <h1>Web Development Fundamentals</h1>
              <p>Module 3: CSS Layouts</p>
              <Progress value={65} className="h-2 mt-2 mb-2" />
              <div className='flex justify-between '>
                <p>65% complete</p>
                <p>35 min left</p>
              </div>
            </div>
          </div>

          <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
            <img className='h-[65%] w-full object-cover' src="/storage/ee6ab2d0dc78dda0ec5e0c0583bf9e72.jpg" alt="" />
            <div className='p-2 flex-col gap-y-2'>
              <h1>Web Development Fundamentals</h1>
              <p>Module 3: CSS Layouts</p>
              <Progress value={65} className="h-2 mt-2 mb-2" />
              <div className='flex justify-between '>
                <p>65% complete</p>
                <p>35 min left</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
          <Tabs defaultValue="courses" className="mt-6">
            <TabsList className="grid grid-cols-4 w-full md:w-auto">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="library">Library</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>


            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course} className="overflow-hidden">
                    <div className="relative h-40">
                      <img
                        src={`storage/${course.image}`}
                        alt={`Course ${course.image}`}
                        width={400}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Course Title {course.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        {/* <Clock className="h-4 w-4 mr-1" /> */}
                        {/* <span>{course.estimated_duration}</span> */}
                        {/* <span className="mx-2">•</span> */}
                        <Folder className="h-4 w-4 mr-1" />
                        <span>{course.chapterCount} modules</span>
                      </CardDescription>
                    </CardHeader>
                    <Link href={`course/`+course.id} className="block">
                      <CardContent className="cursor-pointer">
                        <Button variant="outline" className="w-full border py-2">
                          Take the course
                        </Button>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((achievement) => (
                  <Card key={achievement} className={achievement > 3 ? "opacity-50" : ""}>
                    <CardContent className="pt-6 text-center">
                      <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Award className={`h-8 w-8 ${achievement <= 3 ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="font-medium">Achievement {achievement}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement <= 3 ? "Earned on March 10, 2025" : "Complete related courses to unlock"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>


            <TabsContent value="library" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((module) => (
                  <Card key={module}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Module {module}</CardTitle>
                      <CardDescription>
                        {module <= 2 ? "Completed" : module <= 3 ? "In Progress" : "Locked"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={`/module/${module}`}
                        className={`flex items-center ${module > 3 ? "text-muted-foreground cursor-not-allowed" : "text-primary hover:underline"}`}
                      >
                        {module <= 3 ? (
                          <>
                            View Module <ChevronRight className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          "Complete previous modules to unlock"
                        )}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>


            <TabsContent value="stats" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Web Development Track</span>
                          <span>65%</span>
                        </div>
                        {/* <Progress value={65} className="h-2" /> */}
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>UI/UX Design Track</span>
                          <span>40%</span>
                        </div>
                        {/* <Progress value={40} className="h-2" /> */}
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
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
                          <BookOpen className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>Courses Completed</span>
                        </div>
                        <span className="font-medium">4</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                          <span>Hours Spent Learning</span>
                        </div>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 mr-2 text-muted-foreground" />
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
