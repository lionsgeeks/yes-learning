import React from 'react';
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { CreateWorkshopModal } from "@/components/workshops/create-workshop-modal"
import { WorkshopCard } from "@/components/workshops/workshop-card"

const breadcrumbs = [

    {
        title: "Workshops",
        href: `/admin/workshop`,
    },
];


const AdminWorkshops = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    // Mock data for workshops
    const workshops = [
        {
            id: "1",
            title: "Introduction to Web Development",
            description: "Learn the basics of HTML, CSS, and JavaScript",
            course: "Web Development Fundamentals",
            date: "2023-05-15",
            subWorkshops: 3,
            enrolledStudents: 24,
            maxCapacity: 30,
            isComplete: true,
        },
        {
            id: "2",
            title: "Advanced React Patterns",
            description: "Master advanced React concepts and patterns",
            course: "Frontend Development",
            date: "2023-06-10",
            subWorkshops: 5,
            enrolledStudents: 18,
            maxCapacity: 25,
            isComplete: true,
        },
        {
            id: "3",
            title: "Database Design Principles",
            description: "Learn how to design efficient and scalable databases",
            course: "Database Management",
            date: "2023-07-05",
            subWorkshops: 2,
            enrolledStudents: 15,
            maxCapacity: 20,
            isComplete: false,
        },
    ]


    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={"Workshops"} />
            <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workshops</h1>
          <p className="text-muted-foreground">Create and manage workshops for your courses</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Workshop
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Input placeholder="Search workshops..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="web-dev">Web Development</SelectItem>
              <SelectItem value="frontend">Frontend Development</SelectItem>
              <SelectItem value="database">Database Management</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <Link key={workshop.id} href={`/admin/workshops/${workshop.id}`}>
              <WorkshopCard workshop={workshop} />
            </Link>
          ))}
        </div>
      </div>

      <CreateWorkshopModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>

        </AppLayout>
    );
};

export default AdminWorkshops;