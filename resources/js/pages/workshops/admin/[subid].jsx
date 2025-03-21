"use client"
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, Clock, Copy, MoreHorizontal, Users, Video, AlertTriangle, Globe, LinkIcon, Mail, CheckCircle, BookOpen, ChevronRight, } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { format, isPast } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const breadcrumbs = [

    {
        title: "Workshop Session",
        href: `/admin/sub-workshop/1`,
    },
];

// Mock data for the sub-workshop
const subWorkshop = {
    id: "1-1",
    name: "HTML Fundamentals",
    description:
        "Introduction to HTML tags and document structure. Learn how to create well-structured web pages using semantic HTML elements.",
    subCourse: "HTML Basics",
    date: "2023-05-15",
    time: "10:00 AM",
    duration: 90,
    instructors: {
        english: "John Smith",
        french: "Marie Dubois",
        arabic: "Ahmed Hassan",
    },
    instructorEmails: {
        english: "john.smith@example.com",
        french: "marie.dubois@example.com",
        arabic: "ahmed.hassan@example.com",
    },
    meetLinks: {
        english: "https://meet.google.com/abc-defg-hij",
        french: "https://meet.google.com/klm-nopq-rst",
        arabic: "https://meet.google.com/uvw-xyz-123",
    },
    enrolledStudents: 24,
    maxCapacity: 30,
    workshopId: "1",
    workshopTitle: "Introduction to Web Development",
    status: "draft", // or "published"
    settings: {
        recordSession: true,
        allowQuestions: true,
        requireRegistration: true,
        sendNotifications: true,
        notificationTime: "24h",
    },
    prerequisites: ["Basic computer skills", "Understanding of internet concepts", "Text editor installed"],
}

// Mock data for participants
const participants = [
    {
        id: "1",
        name: "Alex Johnson",
        email: "alex@example.com",
        joinedAt: "2023-04-30T10:15:00Z",
        status: "confirmed",
        language: "english",
        completedPrerequisites: true,
    },
    {
        id: "2",
        name: "Emma Williams",
        email: "emma@example.com",
        joinedAt: "2023-05-01T14:22:00Z",
        status: "confirmed",
        language: "english",
        completedPrerequisites: false,
    },
    {
        id: "3",
        name: "Michael Brown",
        email: "michael@example.com",
        joinedAt: "2023-05-02T09:45:00Z",
        status: "pending",
        language: "english",
        completedPrerequisites: false,
    },
    {
        id: "4",
        name: "Sophie Martin",
        email: "sophie@example.com",
        joinedAt: "2023-05-01T11:30:00Z",
        status: "confirmed",
        language: "french",
        completedPrerequisites: true,
    },
    {
        id: "5",
        name: "Pierre Dupont",
        email: "pierre@example.com",
        joinedAt: "2023-05-02T13:45:00Z",
        status: "confirmed",
        language: "french",
        completedPrerequisites: false,
    },
    {
        id: "6",
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        joinedAt: "2023-05-01T09:15:00Z",
        status: "confirmed",
        language: "arabic",
        completedPrerequisites: true,
    },
    {
        id: "7",
        name: "Fatima Hassan",
        email: "fatima@example.com",
        joinedAt: "2023-05-03T10:30:00Z",
        status: "pending",
        language: "arabic",
        completedPrerequisites: false,
    },
]

export default function SubWorkshopDetailPage() {
    const isPublished = subWorkshop.status === "published"

    // Check for missing information
    const missingInfo = []
    if (!subWorkshop.date) missingInfo.push("date")
    if (!subWorkshop.time) missingInfo.push("time")

    // Check if any language is missing instructor or meet link
    const languages = ["english", "french", "arabic"]
    const missingInstructors = languages.filter(
        (lang) => !subWorkshop.instructors[lang],
    )
    const missingMeetLinks = languages.filter(
        (lang) => !subWorkshop.meetLinks[lang],
    )

    if (missingInstructors.length > 0) {
        missingInfo.push(`instructor (${missingInstructors.map((l) => l.substring(0, 2).toUpperCase()).join(", ")})`)
    }

    if (missingMeetLinks.length > 0) {
        missingInfo.push(`meet link (${missingMeetLinks.map((l) => l.substring(0, 2).toUpperCase()).join(", ")})`)
    }

    // Check if the sub-workshop has already passed
    const isPastWorkshop = subWorkshop.date && isPast(new Date(`${subWorkshop.date} ${subWorkshop.time}`))

    // Language display names
    const languageNames = {
        english: "English",
        french: "French",
        arabic: "Arabic",
    }

    // Language codes
    const languageCodes = {
        english: "EN",
        french: "FR",
        arabic: "AR",
    }

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Workshop Session"} />

            <div className="container mx-auto p-3 lg:p-6">
            <div className="mb-6 flex items-center">
                <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link href={`/admin/workshops/${subWorkshop.workshopId}`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{subWorkshop.name}</h1>
                        {isPublished ? (
                            <Badge>Published</Badge>
                        ) : (
                            <Badge variant="outline" className="text-amber-500 border-amber-500">
                                Draft
                            </Badge>
                        )}
                        {isPastWorkshop && <Badge variant="outline">Passed</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        <Link href={`/workshops/${subWorkshop.workshopId}`} className="hover:underline">
                            {subWorkshop.workshopTitle}
                        </Link>{" "}
                        &gt; {subWorkshop.subCourse}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{isPublished ? "Published" : "Draft"}</span>
                        <Switch checked={isPublished} />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/workshops/${subWorkshop.workshopId}/sub-workshops/${subWorkshop.id}/edit`}>Edit</Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {missingInfo.length > 0 && (
                <Card className="mb-6 bg-amber-50 border-amber-200">
                    <CardContent className="py-4">
                        <div className="flex items-center gap-2 text-amber-600">
                            <AlertTriangle className="h-5 w-5" />
                            <div>
                                <h3 className="font-medium">Incomplete Sub-Workshop</h3>
                                <p className="text-sm">
                                    This sub-workshop is missing: {missingInfo.join(", ")}. Please complete all required information
                                    before publishing.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Redesigned Overview Card */}
            <div className="grid gap-6 md:grid-cols-3 mb-6">
                <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle>Overview</CardTitle>
                        <CardDescription>{subWorkshop.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    Date
                                </div>
                                <div className="text-sm">
                                    {subWorkshop.date ? format(new Date(subWorkshop.date), "MMMM d, yyyy") : "Not set"}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    Time
                                </div>
                                <div className="text-sm">
                                    {subWorkshop.time ? `${subWorkshop.time} (${subWorkshop.duration} min)` : "Not set"}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    Enrollment
                                </div>
                                <div className="text-sm">
                                    {subWorkshop.enrolledStudents}/{subWorkshop.maxCapacity} participants
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm font-medium flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    Languages
                                </div>
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

                        <Separator className="my-4" />

                        <div className="space-y-2">
                            <div className="text-sm font-medium flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                Prerequisites
                            </div>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                                {subWorkshop.prerequisites.map((prereq, index) => (
                                    <li key={index}>{prereq}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Communication</CardTitle>
                        <CardDescription>Send emails to participants</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-between" size="sm">
                                <div className="flex items-center">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Reminder
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="text-xs text-muted-foreground">Remind participants about the upcoming session</div>
                        </div>

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-between" size="sm">
                                <div className="flex items-center">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Prerequisites Reminder
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="text-xs text-muted-foreground">Remind participants to complete prerequisites</div>
                        </div>

                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-between" size="sm">
                                <div className="flex items-center">
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    Send Meeting Links
                                </div>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="text-xs text-muted-foreground">Send meeting links to all confirmed participants</div>
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <Button className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Custom Email
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Language Sessions */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Language Sessions</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {languages.map((language) => {
                        const hasInstructor = !!subWorkshop.instructors[language]
                        const hasMeetLink = !!subWorkshop.meetLinks[language]
                        const isComplete = hasInstructor && hasMeetLink

                        return (
                            <Card key={language} className="border">
                                <CardHeader className="pb-3 border-b">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Badge variant="secondary">{languageCodes[language]}</Badge>
                                            {languageNames[language]}
                                        </CardTitle>
                                        {isComplete ? (
                                            <Badge>Complete</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-amber-500 border-amber-500">
                                                Incomplete
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 pt-4">
                                    <div className="space-y-3">
                                        <div className="text-sm font-medium">Instructor</div>
                                        {hasInstructor ? (
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        {subWorkshop.instructors[language]
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">
                                                        {subWorkshop.instructors[language]}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {subWorkshop.instructorEmails[language]}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-amber-600 text-sm flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4" />
                                                No instructor assigned
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="space-y-3">
                                        <div className="text-sm font-medium">Google Meet</div>
                                        {hasMeetLink ? (
                                            <div className="space-y-2">
                                                <div className="rounded-md border bg-muted p-2 text-xs text-muted-foreground break-all">
                                                    {subWorkshop.meetLinks[language]}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex-1 h-8 text-xs"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                subWorkshop.meetLinks[language] || "",
                                                            )
                                                        }
                                                    >
                                                        <Copy className="mr-1 h-3 w-3" />
                                                        Copy
                                                    </Button>
                                                    <Button size="sm" className="flex-1 h-8 text-xs" asChild>
                                                        <a
                                                            href={subWorkshop.meetLinks[language]}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Video className="mr-1 h-3 w-3" />
                                                            Join
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-amber-600 text-sm flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4" />
                                                No meeting link provided
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between pt-1">
                                        <div className="text-sm">
                                            {participants.filter((p) => p.language === language).length} participants
                                        </div>
                                        <Button size="sm" variant="ghost" asChild className="h-8 text-xs">
                                            <Link href={`#${language}-participants`}>View List</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Settings Card */}
            <Card className="mb-6">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Sub-workshop configuration</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        Edit Settings
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Record Session</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.settings.recordSession ? "default" : "outline"}>
                                    {subWorkshop.settings.recordSession ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Allow Questions</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.settings.allowQuestions ? "default" : "outline"}>
                                    {subWorkshop.settings.allowQuestions ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Registration</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.settings.requireRegistration ? "default" : "outline"}>
                                    {subWorkshop.settings.requireRegistration ? "Required" : "Optional"}
                                </Badge>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Notifications</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.settings.sendNotifications ? "default" : "outline"}>
                                    {subWorkshop.settings.sendNotifications ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            {subWorkshop.settings.sendNotifications && (
                                <div className="text-xs text-muted-foreground mt-2">
                                    Sent{" "}
                                    {subWorkshop.settings.notificationTime === "24h"
                                        ? "24 hours"
                                        : subWorkshop.settings.notificationTime === "1h"
                                            ? "1 hour"
                                            : "24 hours and 1 hour"}{" "}
                                    before
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Participants Tabs */}
            <div>
                <h2 className="text-xl font-semibold mb-4" id="participants">
                    Participants
                </h2>
                <Tabs defaultValue="english">
                    <TabsList className="w-full grid grid-cols-3 mb-4">
                        {languages.map((language) => (
                            <TabsTrigger
                                key={language}
                                value={language}
                                id={`${language}-participants`}
                                className="flex items-center gap-2"
                            >
                                <div variant="secondary" className="h-5 px-1.5">
                                    {languageCodes[language]}
                                </div>
                                <span>{participants.filter((p) => p.language === language).length}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {languages.map((language) => (
                        <TabsContent key={language} value={language}>
                            <Card>
                                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>{languageNames[language]} Participants</CardTitle>
                                        <CardDescription>
                                            {participants.filter((p) => p.language === language).length} enrolled
                                        </CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Email
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                                <DropdownMenuItem>Send Prerequisites</DropdownMenuItem>
                                                <DropdownMenuItem>Send Meeting Link</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Custom Email</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button variant="outline" size="sm">
                                            Export
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Joined</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Prerequisites</TableHead>
                                                <TableHead className="w-[80px]"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {participants
                                                .filter((participant) => participant.language === language)
                                                .map((participant) => (
                                                    <TableRow key={participant.id}>
                                                        <TableCell className="font-medium">{participant.name}</TableCell>
                                                        <TableCell>{participant.email}</TableCell>
                                                        <TableCell>{format(new Date(participant.joinedAt), "MMM d, yyyy")}</TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    participant.status === "confirmed"
                                                                        ? "default"
                                                                        : participant.status === "pending"
                                                                            ? "outline"
                                                                            : "destructive"
                                                                }
                                                            >
                                                                {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {participant.completedPrerequisites ? (
                                                                <div className="flex items-center text-sm">
                                                                    <CheckCircle className="mr-1 h-4 w-4 text-muted-foreground" />
                                                                    <span>Completed</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center text-sm text-amber-600">
                                                                    <AlertTriangle className="mr-1 h-4 w-4" />
                                                                    <span>Incomplete</span>
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" size="icon">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Open menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                                                    <DropdownMenuItem>Change Status</DropdownMenuItem>
                                                                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
        </AppLayout>


    )
}

