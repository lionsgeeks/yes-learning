"use client"
import React from 'react';
import { usePage, Head, Link, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Calendar, MoreHorizontal, Plus, Users, Globe } from "lucide-react"
import { CreateSubWorkshopModal } from "@/components/workshops/create-sub-workshop-modal"
import { CreateWorkshopModal } from "@/components/workshops/create-workshop-modal"
import { SubWorkshopCard } from "@/components/workshops/sub-workshop-card"
import { format } from "date-fns"
import { DeleteWorkshopDialog } from "@/components/workshops/delete-workshop-dialog";

const breadcrumbs = [

    {
        title: "Workshops",
        href: `/admin/workshop/detail`,
    },
];


// Mock data for the workshop



// Mock data for sub-workshops


const WorkshopDetails = ({workshop , subWorkshops , chapters , courses}) => {
// console.log(workshop);
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    // const [isPublished, setIsPublished] = useState(workshop.status === "published")

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
                        <Link href="/admin/workshops">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold">{JSON.parse(workshop.name).en}</h1>
                            {/* {isPublished ? (
                                <Badge className="bg-green-500">Published</Badge>
                            ) : (
                                <Badge variant="outline" className="text-amber-500 border-amber-500">
                                    Draft
                                </Badge>
                            )} */}
                        </div>
                        <p className="text-sm text-muted-foreground">{workshop.course.name.en}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{isPublished ? "Published" : "Draft"}</span>
                            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
                        </div> */}
                        <div className="flex gap-2 jus">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {/* <DropdownMenuItem>Duplicate Workshop</DropdownMenuItem> */}
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        Edit Workshop
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDeleteDialogOpen(true);
                                        }}
                                    >
                                        Delete Workshop
                                    </DropdownMenuItem>

                                    <DeleteWorkshopDialog
                                        open={isDeleteDialogOpen}
                                        onOpenChange={setIsDeleteDialogOpen}
                                        workshopTitle={workshop.name}
                                        workshopId={workshop.id}
                                    />
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
                            <CardDescription>{JSON.parse(workshop.description).en}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Course</h3>
                                    <Badge variant="outline" className="mt-1">
                                        {workshop.course.name.en}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">Enrollment</h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>
                                            Students
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

                <CreateSubWorkshopModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} chapters={chapters} workshop={workshop.id} />
            </div>


            <CreateWorkshopModal
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                workshop={workshop}
                courses={courses}
            />

        </AppLayout>
    );
};

export default WorkshopDetails




