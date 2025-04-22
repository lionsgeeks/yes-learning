"use client"

import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import AppLayout from "@/layouts/app-layout"
import { Head, Link, useForm } from "@inertiajs/react"
import {
  Clock, Eye, FileText, Send, Users
} from "lucide-react"
import { useState } from "react"

const NewsletterPage = ({ courses }) => {
  const [showPreview, setShowPreview] = useState(false)

  const breadcrumbs = [
    { title: "Newsletter", href: "/admin/newsletter" },
  ]

  const { data, setData, post, processing, errors } = useForm({
    subject: "",
    content: "",
    template: "blank",
    recipient_type: "all",
    courses: [],
    schedule_date: "",
  })

  const getSelectedCourses = () => {
    return courses.filter((course) => data.courses.includes(course.id))
  }

  const handleSendNewsletter = () => {
    const payload = {
      ...data,
      courses: data.recipient_type === "courses" ? getSelectedCourses() : [],
    }
    post("/admin/newsletter/send", { data: payload })
  }

  const handleScheduleNewsletter = () => {
    const payload = {
      ...data,
      courses: data.recipient_type === "courses" ? getSelectedCourses() : [],
    }
    post("/admin/newsletter/schedule", { data: payload })
  }

  const handleCourseToggle = (courseId) => {
    if (data.courses.includes(courseId)) {
      setData("courses", data.courses.filter((id) => id !== courseId))
    } else {
      setData("courses", [...data.courses, courseId])
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Newsletter" />
      <div className="container mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
            <p className="text-muted-foreground">
              Create and send newsletters to your students
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={route("newsletter.history")}>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="compose" className="w-full">
              <TabsContent value="compose" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Compose Newsletter</CardTitle>
                    <CardDescription>
                      Create a new newsletter to send to your students
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter newsletter subject"
                        value={data.subject}
                        onChange={(e) => setData("subject", e.target.value)}
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your newsletter content here..."
                        className="min-h-[200px]"
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                      />
                      {errors.content && (
                        <p className="text-sm text-red-500">{errors.content}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showPreview ? "Hide Preview" : "Preview"}
                    </Button>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <Clock className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="end">
                          <div className="space-y-2">
                            <Input
                              id="date"
                              type="date"
                              value={data.schedule_date}
                              onChange={(e) => setData("schedule_date", e.target.value)}
                            />
                            {errors.schedule_date && (
                              <p className="text-sm text-red-500">{errors.schedule_date}</p>
                            )}
                          </div>
                          <Button
                            className="mt-4 w-full"
                            onClick={handleScheduleNewsletter}
                            disabled={processing || !data.subject || !data.content}
                          >
                            {processing ? "Scheduling..." : "Confirm Schedule"}
                          </Button>
                        </PopoverContent>
                      </Popover>
                      <Button
                        onClick={handleSendNewsletter}
                        disabled={processing || !data.subject || !data.content}
                      >
                        {processing ? "Sending..." : "Send Now"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {showPreview && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Email Preview</CardTitle>
                  <CardDescription>
                    Preview how your email will appear to recipients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border bg-white p-6">
                    <div className="mx-auto max-w-2xl">
                      <div className="mb-6">
                        <h2 className="mb-1 text-xl font-semibold">
                          {data.subject || "No subject"}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          From: YesLearning Admin &lt;admin@learnhub.edu&gt;
                        </p>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <div className="whitespace-pre-line">{data.content || "No content"}</div>
                      </div>
                      <div className="text-muted-foreground mt-8 border-t pt-4 text-sm">
                        <p>YesLearning Education Platform</p>
                        <p>© 2025 YesLearning. All rights reserved.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recipients</CardTitle>
                <CardDescription>
                  Select who will receive this newsletter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipient Group</Label>
                  <Select
                    value={data.recipient_type}
                    onValueChange={(value) => setData("recipient_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="courses">Specific Courses</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.recipient_type && (
                    <p className="text-sm text-red-500">{errors.recipient_type}</p>
                  )}
                </div>

                {data.recipient_type === "courses" && (
                  <div className="space-y-2">
                    <Label>Select Courses</Label>
                    <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-md border p-4">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={course.id}
                            checked={data.courses.includes(course)}
                            onCheckedChange={() => handleCourseToggle(course)}
                          />
                          <Label htmlFor={course.id} className="cursor-pointer">
                            {course.name.en}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.courses && (
                      <p className="text-sm text-red-500">{errors.courses}</p>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => alert("Recipients list exported!")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Export Recipients List
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default NewsletterPage
