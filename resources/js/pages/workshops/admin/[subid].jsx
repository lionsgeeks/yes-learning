"use client"
import { usePage, Head, Link, useForm } from "@inertiajs/react";
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
import AdminUsersTable from "@/components/usersComponents/admin-users-table.jsx"
import { DeleteSubWorkshopDialog } from "../../../components/workshops/delete-subworkshop-dialog";
import { useState } from "react";
import { UpdateSubWorkshopModal } from "@/components/workshops/update-sub-workshop-modal"

const breadcrumbs = [

    {
        title: "Sub-Workshop Session",
        href: `/admin/sub-workshop/1`,
    },
];



export default function SubWorkshopDetailPage({subWorkshop , chapters}) {
    const isPublished = subWorkshop.status === "published"
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Check for missing information
    const missingInfo = []
    if (!subWorkshop.date) missingInfo.push("date")
    if (!subWorkshop.time) missingInfo.push("time")

    // Check if any language is missing instructor or meet link
    const languages = ["en", "fr", "ar"]
    const missingInstructors = languages.filter(
        (lang) => !JSON.parse(subWorkshop.instructor).instructor-[lang],
    )
    const missingMeetLinks = languages.filter(
        (lang) => !JSON.parse(subWorkshop.meetLink).meetLink-[lang],
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
            <Head title={"Sub-Workshop Session"} />

            <div className="container mx-auto p-3 lg:p-6">
            <div className="mb-6 flex items-center">
                <Button variant="ghost" size="icon" asChild className="mr-2">
                    <Link href={`/admin/workshops/${subWorkshop.workshop_id}`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold">{JSON.parse(subWorkshop.name).en}</h1>
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
                    <Button
                        variant="outline"
                        onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEditModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <UpdateSubWorkshopModal
                        open={isEditModalOpen}
                        onOpenChange={setIsEditModalOpen}
                        subWorkshop={subWorkshop}
                        chapters={chapters}
                    />
                        <Button
                            className="text-destructive"
                             variant="outline"
                            onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsDeleteDialogOpen(true);
                            }}
                            >
                            Delete Sub-Workshop
                        </Button>


                                <DeleteSubWorkshopDialog
                                    open={isDeleteDialogOpen}
                                    onOpenChange={setIsDeleteDialogOpen}
                                    workshopTitle={JSON.parse(subWorkshop.name).en}
                                    workshopId={subWorkshop.id}
                                />
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
                        <CardDescription>{JSON.parse(subWorkshop.name).en}</CardDescription>
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
                                    {subWorkshop.users.length} participants
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
                                    <li >{JSON.parse(subWorkshop.prerequisite).en}</li>
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
                        const instructorData = JSON.parse(subWorkshop.instructor);
                        const meetLinkData = JSON.parse(subWorkshop.meetLink);

                        const hasInstructor = !!instructorData[`${language}`];
                        const hasMeetLink = !!meetLinkData[`${language}`];
                        const isComplete = hasInstructor && hasMeetLink;

                        console.log();

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
                                                {/* <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        {instructorData[`instructor${language}`]
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar> */}
                                                <div>
                                                    <div className="font-medium">
                                                        {instructorData[`${language}`]}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {instructorData[`${language}`]}
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
                                                    {meetLinkData[`${language}`]}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="flex-1 h-8 text-xs"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(
                                                                meetLinkData[`${language}`] || "",
                                                            )
                                                        }
                                                    >
                                                        <Copy className="mr-1 h-3 w-3" />
                                                        Copy
                                                    </Button>
                                                    <Button size="sm" className="flex-1 h-8 text-xs" asChild>
                                                        <a
                                                            href={meetLinkData[`${language}`]}
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



                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Settings Card */}
            {/* <Card className="mb-6">
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
                                <Badge variant={subWorkshop.allowQuestions ? "default" : "outline"}>
                                    {subWorkshop.allowQuestions ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Registration</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.requireRegistration ? "default" : "outline"}>
                                    {subWorkshop.requireRegistration ? "Required" : "Optional"}
                                </Badge>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="text-sm font-medium mb-1">Notifications</div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant={subWorkshop.sendNotifications ? "default" : "outline"}>
                                    {subWorkshop.sendNotifications ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                            {subWorkshop.settings.sendNotifications && (
                                <div className="text-xs text-muted-foreground mt-2">
                                    Sent{" "}
                                    {subWorkshop.notificationTime === "24h"
                                        ? "24 hours"
                                        : subWorkshop.notificationTime === "1h"
                                            ? "1 hour"
                                            : "24 hours and 1 hour"}{" "}
                                    before
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card> */}


            <AdminUsersTable
                title="Manage Users"
                description="Check Students Information"
                Users={subWorkshop.users}
                role={1}
                courses={1}
                joinDate={1}
                showAddButton={false}
            />
        </div>
        </AppLayout>


    )
}

