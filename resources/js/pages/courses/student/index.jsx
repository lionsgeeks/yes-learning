import React, { useState } from "react";
import { usePage, Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Filter, Image, Search, Star, Tag, Users } from "lucide-react"
import TransText from "@/components/TransText"

const Course = () => {
    const { courses, auth } = usePage().props
    const breadcrumbs = [{ title: "Courses", href: `/courses`, },];
    const [search, setSearch] = useState("");
    const [label, setLabel] = useState("");

    const filteredCourses = courses.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    ).filter((item) => label ? item.label.toLowerCase().includes(label.toLowerCase()) : item);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Courses"} />
            <div className="space-y-6 lg:p-6 p-3 "
                dir={auth.user.language == "ar" ? 'rtl' : 'ltr'}
            >
                <div className="flex  flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            <TransText
                                en="Courses"
                                fr="Cours"
                                ar="الدورات"
                            />
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            <TransText
                                en="Discover and enroll in courses to enhance your skills"
                                fr="Découvrez et inscrivez-vous à des cours pour améliorer vos compétences"
                                ar="اكتشف وشارك في الدورات لتعزيز مهاراتك"
                            />

                        </p>
                    </div>
                </div>
                <Tabs className="" defaultValue="all">
                    <div className="flex flex-col items-center lg:flex-row gap-x-2 justify-between"
                        dir={auth.user.language == "ar" ? 'rtl' : 'ltr'}
                    >

                        <TabsList className="mb-4">
                            <TabsTrigger value="all">
                                <TransText
                                    en="All Courses"
                                    fr="Tous les cours"
                                    ar="جميع الدورات"
                                />
                            </TabsTrigger>
                            <TabsTrigger value="my-courses">
                                <TransText
                                    en="My Courses"
                                    fr="Mes cours"
                                    ar="دوراتي"
                                />
                            </TabsTrigger>
                            {/* <TabsTrigger value="featured">
                                <TransText
                                    en="Featured"
                                    fr="En vedette"
                                    ar="مميزة"
                                />
                            </TabsTrigger>
                            <TabsTrigger value="popular">
                                <TransText
                                    en="Popular"
                                    fr="Populaires"
                                    ar="الأكثر شهرة"
                                />
                            </TabsTrigger>
                            <TabsTrigger value="new">
                                <TransText
                                    en="New"
                                    fr="Nouveaux"
                                    ar="جديدة"
                                />
                            </TabsTrigger> */}

                        </TabsList>

                        <div className="flex flex-col sm:flex-row gap-2  lg:w-fit w-full ">
                            <div className="relative w-full">
                                <Search className="absolute  left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search"
                                    placeholder={auth.user.language == "en" ? 'Search By Title' : auth.user.language == "fr" ? 'Rechercher par Titre' : 'البحث حسب العنوان'}
                                    onChange={(e) => { setSearch(e.target.value) }} value={search}
                                    className="pl-8  w-full sm:w-[250px]" />
                            </div>

                            <div className="flex w-full flex-col sm:flex-row gap-4 mb-6">

                                <Select defaultValue=""
                                    value={label}
                                    onValueChange={(value) => setLabel(value)}
                                >
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder={auth.user.language == "en" ? 'Category' : auth.user.language == "fr" ? 'Catégorie' : 'الفئة'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={null}>
                                            <TransText
                                                en="All Categories"
                                                fr="Toutes les catégories"
                                                ar="جميع الفئات"
                                            />
                                        </SelectItem>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            dir={auth.user.language == "ar" ? 'rtl' : 'ltr'}
                        >
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="my-courses" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            dir={auth.user.language == "ar" ? 'rtl' : 'ltr'}
                        >
                            {filteredCourses
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
            // onSuccess: () => { alert("good") },
            // onError: (e) => { },
        })
    }





    return (
        <Card className={`overflow-hidden pt-0 ${course.enrolled ? "border-primary/50 bg-primary/5" : ""}`}>
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
                        <TransText
                            en="Enrolled"
                            fr="Inscrit"
                            ar="مسجل"
                        />
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white">

                        <div className="flex items-center bg-black/50 px-2 py-1  gap-1 rounded-full">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="text-sm ">{course.enrolledCount}
                                <TransText
                                    en="Participants"
                                    fr="Participants"
                                    ar="مشارك"
                                />

                            </span>
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
                        {course.duration}
                    </Badge>
                </div>

            </CardContent>

            <CardFooter>
                {course.enrolled ? (
                    <Button asChild className="w-full">
                        <Link href={`/course/${course.id}`}>
                            <TransText
                                en="Continue Learning"
                                fr="Continuer à apprendre"
                                ar="واصل التعلم"
                            />

                        </Link>
                    </Button>
                ) : (
                    <div className="w-full flex items-center justify-between gap-2">
                        <button onClick={enroll} className="flex-1 bg-alpha py-2 text-white rounded-lg">
                            <TransText
                                en="Enroll Now"
                                fr="Inscrivez-vous maintenant"
                                ar="سجّل الآن"
                            />
                        </button>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}


