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


const AdminWorkshops = ({ workshops , courses }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)


    // Mock data for workshops
   


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

      <CreateWorkshopModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} courses={courses}  />
    </div>

        </AppLayout>
    );
};

export default AdminWorkshops;