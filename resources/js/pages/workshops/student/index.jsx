"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout";

import { Calendar, Clock, ExternalLink, Search, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, isBefore, isAfter, addHours } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Head } from "@inertiajs/react"

// Mock data for workshops
const initialWorkshops = [
    {
        id: 1,
        title: "Introduction to React Hooks",
        course: "Web Development Fundamentals",
        language: "en",
        date: new Date(2025, 3, 20, 14, 0), // April 20, 2025, 2:00 PM
        duration: 90, // minutes
        meetLink: "https://meet.google.com/abc-defg-hij",
        instructor: "Sarah Miller",
        capacity: 30,
        enrolled: 18,
        description:
            "Learn how to use React Hooks to simplify your functional components and manage state effectively. This workshop will cover useState, useEffect, useContext, and custom hooks with practical examples.",
        prerequisites: "Basic knowledge of React and JavaScript fundamentals.",
    },
    {
        id: 2,
        title: "Introduction aux React Hooks",
        course: "Web Development Fundamentals",
        language: "fr",
        date: new Date(2025, 3, 21, 14, 0), // April 21, 2025, 2:00 PM
        duration: 90, // minutes
        meetLink: "https://meet.google.com/abc-defg-hij",
        instructor: "Sarah Miller",
        capacity: 30,
        enrolled: 12,
        description:
            "Apprenez à utiliser les React Hooks pour simplifier vos composants fonctionnels et gérer l'état efficacement. Cet atelier couvrira useState, useEffect, useContext et les hooks personnalisés avec des exemples pratiques.",
        prerequisites: "Connaissance de base de React et des fondamentaux de JavaScript.",
    },
    {
        id: 3,
        title: "مقدمة في React Hooks",
        course: "Web Development Fundamentals",
        language: "ar",
        date: new Date(2025, 3, 22, 14, 0), // April 22, 2025, 2:00 PM
        duration: 90, // minutes
        meetLink: "https://meet.google.com/abc-defg-hij",
        instructor: "Sarah Miller",
        capacity: 30,
        enrolled: 15,
        description:
            "تعلم كيفية استخدام React Hooks لتبسيط المكونات الوظيفية وإدارة الحالة بفعالية. ستغطي ورشة العمل هذه useState وuseEffect وuseContext والخطافات المخصصة مع أمثلة عملية.",
        prerequisites: "معرفة أساسية بـ React وأساسيات JavaScript.",
    },
    {
        id: 4,
        title: "Advanced CSS Grid Techniques",
        course: "Advanced CSS Techniques",
        language: "en",
        date: new Date(2025, 3, 25, 15, 0), // April 25, 2025, 3:00 PM
        duration: 120, // minutes
        meetLink: "https://meet.google.com/jkl-mnop-qrs",
        instructor: "Michael Chen",
        capacity: 25,
        enrolled: 20,
        description:
            "Master advanced CSS Grid techniques for complex layouts. This workshop will cover grid template areas, auto-fit/auto-fill, and responsive design patterns.",
        prerequisites: "Basic knowledge of CSS and CSS Grid fundamentals.",
    },
    {
        id: 5,
        title: "Node.js Performance Optimization",
        course: "Node.js for Beginners",
        language: "en",
        date: new Date(2025, 4, 5, 13, 0), // May 5, 2025, 1:00 PM
        duration: 120, // minutes
        meetLink: "https://meet.google.com/tuv-wxyz-123",
        instructor: "David Wilson",
        capacity: 20,
        enrolled: 12,
        description:
            "Learn how to optimize your Node.js applications for better performance. This workshop covers profiling, memory management, and scaling strategies.",
        prerequisites: "Basic knowledge of Node.js and JavaScript.",
    },
]

export default function WorkshopsPage() {
    const [workshops, setWorkshops] = useState(initialWorkshops)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState("all")
    const [selectedCourse, setSelectedCourse] = useState("all")
    const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false)
    const [workshopToRegister, setWorkshopToRegister] = useState(null)

    const filteredWorkshops = workshops.filter((workshop) => {
        // Filter by search query
        const matchesSearch =
            workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workshop.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workshop.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Filter by language
        const matchesLanguage = selectedLanguage === "all" || workshop.language === selectedLanguage

        // Filter by course
        const matchesCourse = selectedCourse === "all" || workshop.course === selectedCourse

        return matchesSearch && matchesLanguage && matchesCourse
    })


    const getStatusBadge = (date) => {
        const now = new Date()
        if (isBefore(date, now)) {
            return (
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    Completed
                </Badge>
            )
        } else if (isAfter(date, now) && isBefore(date, addHours(now, 24))) {
            return (
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Upcoming (24h)
                </Badge>
            )
        } else {
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                    Scheduled
                </Badge>
            )
        }
    }

    const handleRegisterClick = (workshop) => {
        setWorkshopToRegister(workshop)
        setRegistrationDialogOpen(true)
    }

    const handleRegisterConfirm = () => {
        // In a real app, this would send a registration request to the server
        setRegistrationDialogOpen(false)
        setWorkshopToRegister(null)
        // Show success message or update UI
    }

    // Get unique courses for filter
    const courses = Array.from(new Set(workshops.map((workshop) => workshop.course)))

    return (
        <AppLayout>
            <Head title="Workshops" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Workshops</h1>
                    <p className="text-muted-foreground mt-1">Join live interactive workshops with our instructors</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Languages</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                {courses.map((course) => (
                                    <SelectItem key={course} value={course}>
                                        {course}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search workshops..."
                            className="w-full sm:w-[260px] pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="registered">Registered</TabsTrigger>
                        <TabsTrigger value="past">Past Workshops</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-6">
                        {filteredWorkshops.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredWorkshops.map((workshop) => (
                                    <Card key={workshop.id} className="overflow-hidden flex flex-col">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-end items-start">
                                                {getStatusBadge(workshop.date)}
                                            </div>
                                            <CardTitle className="mt-2">{workshop.title}</CardTitle>
                                            <CardDescription>{workshop.course}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <div className="space-y-4">
                                                <div className="flex items-center text-sm">
                                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>{format(workshop.date, "EEEE, MMMM d, yyyy")}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>
                                                        {format(workshop.date, "h:mm a")} • {workshop.duration} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                                                    <span>Instructor: {workshop.instructor}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{workshop.description}</p>
                                                <div className="text-xs text-muted-foreground mt-2">
                                                    <span className="font-medium">Prerequisites:</span> {workshop.prerequisites}
                                                </div>
                                                <div className="flex items-center justify-between text-sm mt-2">
                                                    <span className="text-muted-foreground">
                                                        {workshop.enrolled}/{workshop.capacity} enrolled
                                                    </span>
                                                    <span className={workshop.enrolled >= workshop.capacity ? "text-red-500" : "text-green-600"}>
                                                        {workshop.enrolled >= workshop.capacity ? "Full" : "Available"}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2 pt-0">
                                            <Button
                                                className="flex-1"
                                                onClick={() => handleRegisterClick(workshop)}
                                                disabled={workshop.enrolled >= workshop.capacity}
                                            >
                                                Register
                                            </Button>
                                            <Button variant="outline" className="flex-1" asChild>
                                                <a href={workshop.meetLink} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Join
                                                </a>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border rounded-lg bg-muted/20">
                                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium">No workshops found</h3>
                                <p className="text-muted-foreground mt-1">
                                    Try adjusting your filters or check back later for new workshops
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="registered" className="mt-6">
                        <div className="text-center py-12 border rounded-lg bg-muted/20">
                            <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No registered workshops</h3>
                            <p className="text-muted-foreground mt-1">You haven't registered for any workshops yet</p>
                            <Button className="mt-4" onClick={() => document.querySelector('[data-value="upcoming"]')?.click()}>
                                Browse Workshops
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="past" className="mt-6">
                        <div className="text-center py-12 border rounded-lg bg-muted/20">
                            <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">No past workshops</h3>
                            <p className="text-muted-foreground mt-1">You haven't attended any workshops yet</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Registration Dialog */}
            <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Register for Workshop</DialogTitle>
                        <DialogDescription>You're registering for the following workshop:</DialogDescription>
                    </DialogHeader>

                    {workshopToRegister && (
                        <div className="py-4">
                            <h3 className="font-medium text-lg">{workshopToRegister.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{format(workshopToRegister.date, "EEEE, MMMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {format(workshopToRegister.date, "h:mm a")} • {workshopToRegister.duration} minutes
                                </span>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium">Would you like to receive reminders?</p>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="reminder24h" defaultChecked />
                                    <label htmlFor="reminder24h" className="text-sm">
                                        24 hours before
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="reminder1h" defaultChecked />
                                    <label htmlFor="reminder1h" className="text-sm">
                                        1 hour before
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                                <p className="font-medium">Note:</p>
                                <p className="mt-1">
                                    By registering, you'll receive the workshop materials and a calendar invitation. You can cancel your
                                    registration up to 12 hours before the workshop starts.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleRegisterConfirm}>Confirm Registration</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}

