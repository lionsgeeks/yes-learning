import React, { useState } from 'react';
import { Plus } from "lucide-react"
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentBlockEditor } from "@/components/course/content-block-editor"
import { SubcourseItem } from "@/components/course/subcourse-item"
import { CoursePreview } from "@/components/course/course-preview"
import { ArrowLeft, Check, Loader2, Save } from "lucide-react"


const AdminCoursesCreate = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState("details")
    const [subcourses, setSubcourses] = useState([
        { id: "subcourse-1", title: "Introduction", description: "", blocks: [] },
        { id: "subcourse-2", title: "Core Concepts", description: "", blocks: [] },
    ])
    const [activeSubcourse, setActiveSubcourse] = useState("subcourse-1")

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            // router.push("/admin/courses")
        }, 1500)
    }

    const addSubcourse = () => {
        const newId = `subcourse-${subcourses.length + 1}`
        setSubcourses([...subcourses, { id: newId, title: `Module ${subcourses.length + 1}`, description: "", blocks: [] }])
        setActiveSubcourse(newId)
    }

    const updateSubcourse = (id, data) => {
        setSubcourses(subcourses.map((subcourse) => (subcourse.id === id ? { ...subcourse, ...data } : subcourse)))
    }

    const onDragEnd = (result) => {
        // Implement drag and drop reordering logic
        if (!result.destination) return

        const items = Array.from(subcourses)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setSubcourses(items)
    }

    return (
        <AppLayout>
            <Head title={"Chapter"} />
            <div className="space-y-6 lg:p-6 p-3 ">
            <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/admin/courses">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Course
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="content">Content & Modules</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the main details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="Enter course title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this course covers and its learning objectives"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="fundraising">Fundraising</SelectItem>
                      <SelectItem value="advocacy">Advocacy</SelectItem>
                      <SelectItem value="engagement">Community Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Estimated Duration (hours)</Label>
                  <Input id="duration" type="number" min="1" placeholder="e.g., 8" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Input id="prerequisites" placeholder="Any required prior knowledge" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>Configure additional course options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Published</Label>
                  <p className="text-sm text-muted-foreground">Make this course available to learners</p>
                </div>
                <Switch id="published" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="certificate">Enable Certificate</Label>
                  <p className="text-sm text-muted-foreground">Issue certificates upon course completion</p>
                </div>
                <Switch id="certificate" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="discussions">Enable Discussions</Label>
                  <p className="text-sm text-muted-foreground">Allow learners to discuss course content</p>
                </div>
                <Switch id="discussions" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Thumbnail</CardTitle>
              <CardDescription>Upload a cover image for your course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="mb-4 text-muted-foreground">
                  <svg
                    className="mx-auto h-12 w-12"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex text-sm text-muted-foreground">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, GIF up to 10MB (Recommended size: 1280x720px)
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={() => setActiveTab("content")}>
              Continue to Content
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Modules</CardTitle>
                <CardDescription>Organize your course into modules</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="subcourses">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 space-y-2">
                          {subcourses.map((subcourse, index) => (
                            <Draggable key={subcourse.id} draggableId={subcourse.id} index={index}>
                              {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <SubcourseItem
                                    subcourse={subcourse}
                                    isActive={activeSubcourse === subcourse.id}
                                    onClick={() => setActiveSubcourse(subcourse.id)}
                                    onUpdate={(data) => updateSubcourse(subcourse.id, data)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </ScrollArea>
                <div className="p-4 border-t">
                  <Button variant="outline" className="w-full" onClick={addSubcourse}>
                    Add New Module
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>{subcourses.find((s) => s.id === activeSubcourse)?.title || "Module Content"}</CardTitle>
                <CardDescription>Add and arrange content blocks for this module</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentBlockEditor
                  subcourseId={activeSubcourse}
                  blocks={subcourses.find((s) => s.id === activeSubcourse)?.blocks || []}
                  onBlocksChange={(blocks) => {
                    updateSubcourse(activeSubcourse, { blocks })
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("details")}>
              Back to Details
            </Button>
            <Button onClick={() => setActiveTab("preview")}>Preview Course</Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <CoursePreview
            course={{
              title: "Course Title",
              description: "Course description will appear here.",
              subcourses: subcourses,
            }}
          />

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setActiveTab("content")}>
              Back to Content
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Course
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
            </div>

        </AppLayout>
    )
};

export default AdminCoursesCreate;