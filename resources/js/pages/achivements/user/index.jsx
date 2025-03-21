import React from "react";
import { usePage, Head , Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Badge, BookOpen, Trophy } from "lucide-react"
const Achievement = () => {

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle>Achievement Progress</CardTitle>
              <CardDescription>Your progress toward level advancement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Level 2</span>
                    <span className="text-sm font-medium">8/20 achievements</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-muted rounded-lg p-4 flex items-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">8</div>
                      <div className="text-sm text-muted-foreground">Achievements Earned</div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 flex items-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">4</div>
                      <div className="text-sm text-muted-foreground">Courses Completed</div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 flex items-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Badge className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">Level 2</div>
                      <div className="text-sm text-muted-foreground">Current Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Achievements</TabsTrigger>
            <TabsTrigger value="course">Course Achievements</TabsTrigger>
            <TabsTrigger value="special">Special Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className={i >= 8 ? "opacity-40" : ""}>
                    <Link href="/achievement/1" >
                    <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className={`h-10 w-10 ${i < 8 ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {i === 0 && "First Course"}
                        {i === 1 && "Perfect Score"}
                        {i === 2 && "Fast Learner"}
                        {i === 3 && "Discussion Expert"}
                        {i === 4 && "Weekly Streak"}
                        {i === 5 && "Quiz Master"}
                        {i === 6 && "Module Champion"}
                        {i === 7 && "Coding Ninja"}
                        {i >= 8 && `Achievement ${i + 1}`}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {i < 8 ? "Earned on March 10, 2025" : "Complete related activities to unlock"}
                      </p>
                      <div className="text-xs bg-muted rounded p-2">
                        {i === 0 && "Complete your first course"}
                        {i === 1 && "Score 100% on a module assessment"}
                        {i === 2 && "Complete a course in under 3 days"}
                        {i === 3 && "Post 10 comments in discussions"}
                        {i === 4 && "Log in 7 days in a row"}
                        {i === 5 && "Get all questions right on 5 quizzes"}
                        {i === 6 && "Complete all modules in a track"}
                        {i === 7 && "Submit 5 coding challenges"}
                        {i >= 8 && "Criteria to unlock this achievement"}
                      </div>
                    </div>
                  </CardContent>
                    </Link>

                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="course" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className={i >= 4 ? "opacity-40" : ""}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className={`h-10 w-10 ${i < 4 ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {i === 0 && "HTML Master"}
                        {i === 1 && "CSS Expert"}
                        {i === 2 && "JavaScript Guru"}
                        {i === 3 && "Frontend Developer"}
                        {i === 4 && "Backend Developer"}
                        {i === 5 && "Full Stack Developer"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {i < 4 ? "Earned on March 10, 2025" : "Complete related courses to unlock"}
                      </p>
                      <div className="text-xs bg-muted rounded p-2">
                        {i === 0 && "Complete the HTML fundamentals course"}
                        {i === 1 && "Complete the CSS fundamentals course"}
                        {i === 2 && "Complete the JavaScript fundamentals course"}
                        {i === 3 && "Complete the Frontend development track"}
                        {i === 4 && "Complete the Backend development track"}
                        {i === 5 && "Complete both Frontend and Backend tracks"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className={i >= 4 ? "opacity-40" : ""}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className={`h-10 w-10 ${i < 4 ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {i === 0 && "Early Bird"}
                        {i === 1 && "Night Owl"}
                        {i === 2 && "Social Butterfly"}
                        {i === 3 && "Perfect Attendance"}
                        {i === 4 && "Marathon Learner"}
                        {i === 5 && "Certified Professional"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {i < 4 ? "Earned on March 10, 2025" : "Complete special activities to unlock"}
                      </p>
                      <div className="text-xs bg-muted rounded p-2">
                        {i === 0 && "Complete a lesson before 6 AM"}
                        {i === 1 && "Complete a lesson after midnight"}
                        {i === 2 && "Invite 5 friends to join the platform"}
                        {i === 3 && "Log in every day for a month"}
                        {i === 4 && "Study for 5 hours in one sitting"}
                        {i === 5 && "Pass the certification exam with 90%+"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
            </div>
        </AppLayout>
    );
};

export default Achievement;
