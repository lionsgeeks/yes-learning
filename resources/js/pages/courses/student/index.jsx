import React from "react";
import { usePage, Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Filter, Image, Search, Star, Tag, Users } from "lucide-react"

const Course = () => {
    const { courses } = usePage().props

    const breadcrumbs = [{ title: "Courses", href: `/courses`, },];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Courses"} />
            <div className="space-y-6 lg:p-6 p-3 ">
                <div className="flex  flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Courses</h1>
                        <p className="text-muted-foreground mt-1">Discover and enroll in courses to enhance your skills</p>
                    </div>
                </div>

                <Tabs className="" defaultValue="all">
                    <div className="flex flex-col  items-center lg:flex-row gap-x-2 justify-between">

                        <TabsList className="mb-4">
                            <TabsTrigger value="all">All Courses</TabsTrigger>
                            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
                            <TabsTrigger value="featured">Featured</TabsTrigger>
                            <TabsTrigger value="popular">Popular</TabsTrigger>
                            <TabsTrigger value="new">New</TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col sm:flex-row gap-2  lg:w-fit w-full ">
                            <div className="relative w-full">
                                <Search className="absolute  left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search courses..." className="pl-8  w-full sm:w-[250px]" />
                            </div>

                            <div className="flex w-full flex-col sm:flex-row gap-4 mb-6">
                                <Select defaultValue="all">
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {
                                            courses.map((e, i) =>
                                                <>
                                                    <SelectItem key={i} value={e.label}>{e.label}</SelectItem>

                                                </>
                                            )
                                        }

                                    </SelectContent>
                                </Select>

                            </div>
                        </div>
                    </div>

                    <TabsContent value="all" className="mt-0 ">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="my-courses" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses
                                .filter((course) => course.enrolled)
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="featured" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses
                                .filter((course) => course.featured)
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="popular" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses
                                .filter((course) => course.popular)
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="new" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses
                                .filter((course) => course.new)
                                .map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
};

export default Course;

function CourseCard({ course }) {

    const { data, setDate, put, proccessing, erro } = useForm({
        "course": course.id
    })

    const enroll = () => {
        let formdata = new FormData()
        formdata.append("course", course.id)
        put(route("course.enroll", course.id), {
            onSuccess: () => { alert("good") },
            onError: (e) => { },
        })
    }


    return (
        <Card className={`overflow-hidden ${course.enrolled ? "border-primary/50 bg-primary/5" : ""}`}>
            <div className="relative">
                <img
                    src={"storage/" + course.image}
                    alt={course.name}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                {course.enrolled && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enrolled
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white">

                        <div className="flex items-center bg-black/50 px-2 py-1  rounded-full">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm ">{course.enrolledCount} Participant</span>
                        </div>
                    </div>
                </div>
            </div>

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.name}</CardTitle>

                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-normal">
                        <Tag className="h-3 w-3 mr-1" />
                        {course.label}
                    </Badge>
                    <Badge variant="secondary" className="font-normal">
                        <Clock className="h-3 w-3 mr-1" />
                        90 min
                        {/* {course.duration} */}
                    </Badge>
                </div>

            </CardContent>

            <CardFooter>
                {course.enrolled ? (
                    <Button asChild className="w-full">
                        <Link href={`/course/${course.id}`}>Continue Learning</Link>
                    </Button>
                ) : (
                    <div className="w-full flex items-center justify-between gap-2">
                        <button onClick={enroll} className="flex-1 bg-alpha py-2 text-white rounded-lg">Enroll Now</button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}


