"use client"
import React from 'react';
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Calendar, MoreHorizontal, Plus, Users, Globe } from "lucide-react"
import { CreateSubWorkshopModal } from "@/components/workshops/create-sub-workshop-modal"
import { Switch } from "@/components/ui/switch"
import { SubWorkshopCard } from "@/components/workshops/sub-workshop-card"
// import { format } from "date-fns"

const breadcrumbs = [

    {
        title: "Workshops",
        href: `/admin/workshop/detail`,
    },
];


// Mock data for the workshop
const workshop = {
    id: "1",
    title: "Introduction to Web Development",
    description:
      "Learn the basics of HTML, CSS, and JavaScript in this comprehensive workshop series. Perfect for beginners who want to start their journey in web development.",
    course: "Web Development Fundamentals",
    enrolledStudents: 24,
    maxCapacity: 30,
    status: "draft", // or "published"
    settings: {
      recordSession: true,
      allowQuestions: true,
      requireRegistration: true,
      visibility: "Course Enrolled Students Only",
    },
  }


// Mock data for sub-workshops
const subWorkshops = [
    {
        id: "1",
        name: "HTML Fundamentals",
        description: "Introduction to HTML tags and document structure",
        subCourse: "HTML Basics",
        date: "2023-05-15",
        time: "10:00 AM",
        language: "English",
        instructors: {
            english: "John Smith",
            french: "Marie Dubois",
            arabic: "Ahmed Hassan",
        },
        meetLinks: {
            english: "https://meet.google.com/abc-defg-hij",
            french: "https://meet.google.com/klm-nopq-rst",
            arabic: "https://meet.google.com/uvw-xyz-123",
        },
        enrolledStudents: 24,
        maxCapacity: 30,
        isComplete: true,
    },
    {
        id: "1-2",
        name: "CSS Styling",
        description: "Learn how to style web pages with CSS",
        subCourse: "CSS Basics",
        date: "2023-05-22",
        time: "10:00 AM",
        language: "French",
        instructors: {
            english: "Sarah Johnson",
            french: "Pierre Laurent",
            arabic: "Fatima Khalid",
        },
        meetLinks: {
            english: "",
            french: "https://meet.google.com/def-ghij-klm",
            arabic: "",
        },
        enrolledStudents: 18,
        maxCapacity: 30,
        isComplete: false,
    },
    {
        id: "1-3",
        name: "JavaScript Basics",
        description: "Introduction to JavaScript programming",
        subCourse: "JS Fundamentals",
        date: "2023-06-29",
        time: "10:00 AM",
        language: "Arabic",
        instructors: {
            english: "Michael Brown",
            french: "Sophie Martin",
            arabic: "Omar Farooq",
        },
        meetLinks: {
            english: "https://meet.google.com/nop-qrst-uvw",
            french: "https://meet.google.com/xyz-123-456",
            arabic: "https://meet.google.com/789-abc-def",
        },
        enrolledStudents: 15,
        maxCapacity: 30,
        isComplete: false,
    },
]

const WorkshopDetails = () => {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isPublished, setIsPublished] = useState(workshop.status === "published")

    // Find the next upcoming sub-workshop
    const now = new Date()
    const upcomingSubWorkshops = subWorkshops
        .filter((sw) => new Date(`${sw.date} ${sw.time}`) > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const nextSubWorkshop = upcomingSubWorkshops.length > 0 ? upcomingSubWorkshops[0] : null




    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Workshop Detail"} />

            <div className="container mx-auto p-3 lg:p-6">
                <div className="mb-6 flex items-center">
                    <Button variant="ghost" size="icon" asChild className="mr-2">
                        <Link href="/workshops">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{workshop.title}</h1>
                            {/* {isPublished ? (
                                <Badge className="bg-green-500">Published</Badge>
                            ) : (
                                <Badge variant="outline" className="text-amber-500 border-amber-500">
                                    Draft
                                </Badge>
                            )} */}
                        </div>
                        <p className="text-sm text-muted-foreground">{workshop.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{isPublished ? "Published" : "Draft"}</span>
                            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                        </div> */}
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link href={`/workshops/${workshop.id}/edit`}>Edit Workshop</Link>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Duplicate Workshop</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">Delete Workshop</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Workshop Overview Card */}
                    <Card className="md:col-span-2">
                        <CardHeader className="pb-2">
                            <CardTitle>Workshop Overview</CardTitle>
                            <CardDescription>{workshop.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Course</h3>
                                    <Badge variant="outline" className="mt-1">
                                        {workshop.course}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Enrollment</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            {workshop.enrolledStudents}/{workshop.maxCapacity} Students
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Languages</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex gap-1">
                                            <Badge variant="secondary" className="text-xs">
                                                EN
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                FR
                                            </Badge>
                                            <Badge variant="secondary" className="text-xs">
                                                AR
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {nextSubWorkshop && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Next Session</h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>
                                                {format(new Date(nextSubWorkshop.date), "MMM d, yyyy")} at {nextSubWorkshop.time}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Workshop Settings Card */}
                    <Card className="md:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Record Session</span>
                                <span className="text-sm font-medium">{workshop.settings.recordSession ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Allow Questions</span>
                                <span className="text-sm font-medium">{workshop.settings.allowQuestions ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Require Registration</span>
                                <span className="text-sm font-medium">{workshop.settings.requireRegistration ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Visibility</span>
                                <span className="text-sm font-medium">{workshop.settings.visibility}</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full" asChild>
                                <Link href={`/workshops/${workshop.id}/settings`}>Edit Settings</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Sub-Workshops Section */}
                    <div className="md:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Sub-Workshops</h2>
                            <Button onClick={() => setIsCreateModalOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Sub-Workshop
                            </Button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {subWorkshops.map((subWorkshop) => (
                                <Link key={subWorkshop.id} href={`/admin/sub-workshop/${subWorkshop.id}`}>
                                    <SubWorkshopCard subWorkshop={subWorkshop} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <CreateSubWorkshopModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
            </div>

        </AppLayout>
    );
};

export default WorkshopDetails




