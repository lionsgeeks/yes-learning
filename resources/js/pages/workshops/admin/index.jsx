import React, { useState } from 'react';
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { CreateWorkshopModal } from "@/components/workshops/create-workshop-modal";
import { WorkshopCard } from "@/components/workshops/workshop-card";
import TransText from "@/components/TransText";

const breadcrumbs = [
  {
    title: "Workshops",
    href: `/admin/workshop`,
  },
];

const AdminWorkshops = ({ workshops, courses }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCourseFilterChange = (value) => {
    setSelectedCourse(value);
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearchTerm = workshop.name.toLowerCase().includes(searchTerm);
    const matchesCourse =
      selectedCourse === "all" || workshop.course.id === selectedCourse;
    return matchesSearchTerm && matchesCourse;
  });

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
            <Input
              placeholder="Search workshops..."
              className="max-w-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <Select defaultValue="all" onValueChange={handleCourseFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    <TransText en={course.name.en} fr={course.name.fr} ar={course.name.ar} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredWorkshops.map((workshop) => (
              <Link key={workshop.id} >
                <WorkshopCard workshop={workshop} courses={courses} />
              </Link>
            ))}
          </div>
        </div>

        <CreateWorkshopModal
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          courses={courses}
        />
      </div>
    </AppLayout>
  );
};

export default AdminWorkshops;
