import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Filter, Image, Search, Star, Tag, Users } from "lucide-react"

const Course = () => {

    const breadcrumbs = [

        {
            title: "Courses",
            href: `/courses`,
        },
    ];


    // Mock data for courses
    const courses = [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn the core technologies that power the web: HTML, CSS, and JavaScript.",
            category: "Web Development",
            level: "Beginner",
            duration: "8 hours",
            enrolled: true,
            enrolledCount: 1245,
            rating: 4.8,
            instructor: "Sarah Miller",
            thumbnail: "/placeholder.svg?height=200&width=400&text=Web+Development",
            featured: true,
        },
        {
            id: 2,
            title: "Advanced JavaScript Concepts",
            description: "Deep dive into advanced JavaScript concepts like closures, prototypes, and async programming.",
            category: "Web Development",
            level: "Advanced",
            duration: "12 hours",
            enrolled: true,
            enrolledCount: 987,
            rating: 4.9,
            instructor: "Michael Chen",
            thumbnail: "/placeholder.svg?height=200&width=400&text=JavaScript",
            popular: true,
        },
        {
            id: 3,
            title: "UI/UX Design Principles",
            description: "Master the fundamentals of user interface and user experience design.",
            category: "Design",
            level: "Intermediate",
            duration: "10 hours",
            enrolled: false,
            enrolledCount: 1532,
            rating: 4.7,
            instructor: "Emma Rodriguez",
            thumbnail: "/placeholder.svg?height=200&width=400&text=UI/UX+Design",
            price: 49.99,
        },
        {
            id: 4,
            title: "React.js for Beginners",
            description: "Build modern, reactive web applications with React.js.",
            category: "Web Development",
            level: "Beginner",
            duration: "9 hours",
            enrolled: false,
            enrolledCount: 2156,
            rating: 4.6,
            instructor: "David Johnson",
            thumbnail: "/placeholder.svg?height=200&width=400&text=React.js",
            price: 39.99,
            popular: true,
        },
        {
            id: 5,
            title: "Data Science Essentials",
            description: "Introduction to data analysis, visualization, and machine learning concepts.",
            category: "Data Science",
            level: "Intermediate",
            duration: "15 hours",
            enrolled: false,
            enrolledCount: 1876,
            rating: 4.5,
            instructor: "Alex Thompson",
            thumbnail: "/placeholder.svg?height=200&width=400&text=Data+Science",
            price: 59.99,
        },
        {
            id: 6,
            title: "Mobile App Development with Flutter",
            description: "Create cross-platform mobile applications with Flutter and Dart.",
            category: "Mobile Development",
            level: "Intermediate",
            duration: "14 hours",
            enrolled: false,
            enrolledCount: 1243,
            rating: 4.7,
            instructor: "Sophia Wang",
            thumbnail: "/placeholder.svg?height=200&width=400&text=Flutter",
            price: 49.99,
            new: true,
        },
        {
            id: 7,
            title: "Python Programming Masterclass",
            description: "Comprehensive guide to Python programming from basics to advanced topics.",
            category: "Programming",
            level: "Beginner",
            duration: "20 hours",
            enrolled: true,
            enrolledCount: 3245,
            rating: 4.9,
            instructor: "James Wilson",
            thumbnail: "/placeholder.svg?height=200&width=400&text=Python",
            featured: true,
        },
        {
            id: 8,
            title: "DevOps and CI/CD Pipelines",
            description: "Learn modern DevOps practices and how to build CI/CD pipelines.",
            category: "DevOps",
            level: "Advanced",
            duration: "16 hours",
            enrolled: false,
            enrolledCount: 987,
            rating: 4.6,
            instructor: "Robert Garcia",
            thumbnail: "/placeholder.svg?height=200&width=400&text=DevOps",
            price: 69.99,
        },
        {
            id: 9,
            title: "Blockchain Development",
            description: "Introduction to blockchain technology and smart contract development.",
            category: "Blockchain",
            level: "Advanced",
            duration: "18 hours",
            enrolled: false,
            enrolledCount: 765,
            rating: 4.5,
            instructor: "Natalie Kim",
            thumbnail: "/placeholder.svg?height=200&width=400&text=Blockchain",
            price: 79.99,
            new: true,
        },
    ]

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
                                    <SelectItem value="web-development">Web Development</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="data-science">Data Science</SelectItem>
                                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                    <SelectItem value="programming">Programming</SelectItem>
                                    <SelectItem value="devops">DevOps</SelectItem>
                                    <SelectItem value="blockchain">Blockchain</SelectItem>
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
    return (
        <Card className={`overflow-hidden ${course.enrolled ? "border-primary/50 bg-primary/5" : ""}`}>
            <div className="relative">
                <Image
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
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

                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm">{course.enrolledCount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{course.title}</CardTitle>

                </div>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>

            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="font-normal">
                        <Tag className="h-3 w-3 mr-1" />
                        {course.category}
                    </Badge>
                    <Badge variant="secondary" className="font-normal">
                        <Clock className="h-3 w-3 mr-1" />
                        {course.duration}
                    </Badge>
                </div>

                {/* <div className="flex items-center text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium">{course.instructor.charAt(0)}</span>
                    </div>
                    <span className="text-muted-foreground">{course.instructor}</span>
                </div> */}
            </CardContent>

            <CardFooter>
                {course.enrolled ? (
                    <Button asChild className="w-full">
                        <Link href={`/course/${course.id}`}>Continue Learning</Link>
                    </Button>
                ) : (
                    <div className="w-full flex items-center justify-between gap-2">
                        <Button className="flex-1">Enroll Now</Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}


