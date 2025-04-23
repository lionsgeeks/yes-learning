"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Clock,
  Eye,
  FileText,
  Send,
  Users
} from "lucide-react";
import TransText from "@/components/TransText"

const NewsletterPage = ({ courses }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  const breadcrumbs = [
    { title: "Newsletter", href: "/admin/newsletter" },
  ];

  const { data, setData, post, processing, errors } = useForm({
    subject: { en: "", fr: "", ar: "" },
    content: { en: "", fr: "", ar: "" },
    template: "blank",
    recipient_type: "all",
    courses: [],
    schedule_date: "",
  });

  const getSelectedCourses = () => {
    return courses.filter((course) => data.courses.includes(course.id));
  };

  const handleSendNewsletter = () => {
    const payload = {
      ...data,
      courses: data.recipient_type === "courses" ? getSelectedCourses() : [],
    };
    post("/admin/newsletter/send", { data: payload });
  };

  const handleScheduleNewsletter = () => {
    const payload = {
      ...data,
      courses: data.recipient_type === "courses" ? getSelectedCourses() : [],
    };
    post("/admin/newsletter/schedule", { data: payload });
  };

  const handleCourseToggle = (courseId) => {
    if (data.courses.includes(courseId)) {
      setData("courses", data.courses.filter((id) => id !== courseId));
    } else {
      setData("courses", [...data.courses, courseId]);
    }
  };

  const handleInputChange = (field, value) => {
    setData({
      ...data,
      [field]: { ...data[field], [selectedLang]: value }
    });
  };

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

        {/* Language Selector */}
        <div className="mb-4">
          <Label htmlFor="language">Language</Label>
          <Select value={selectedLang} onValueChange={setSelectedLang}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
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
                      <Label htmlFor="subject">Subject ({selectedLang})</Label>
                      <Input
                        id="subject"
                        placeholder="Enter newsletter subject"
                        value={data.subject[selectedLang]}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                      />
                      {errors.subject && (
                        <p className="text-sm text-red-500">{errors.subject}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content ({selectedLang})</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your newsletter content here..."
                        className="min-h-[200px]"
                        value={data.content[selectedLang]}
                        onChange={(e) =>
                          handleInputChange("content", e.target.value)
                        }
                      />
                      {errors.content && (
                        <p className="text-sm text-red-500">{errors.content}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {/* <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showPreview ? "Hide Preview" : "Preview"}
                    </Button> */}
                    <div className="flex gap-2">
                      <Popover>
                        {/* <PopoverTrigger asChild>
                          <Button variant="outline">
                            <Clock className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                        </PopoverTrigger> */}
                        <PopoverContent className="w-auto p-4" align="end">
                          <div className="space-y-2">
                            <Input
                              type="datetime-local"
                              value={data.schedule_date}
                              onChange={(e) =>
                                setData("schedule_date", e.target.value)
                              }
                            />
                            <Button onClick={handleScheduleNewsletter}>
                              Schedule Send
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button onClick={handleSendNewsletter}>
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recipient Selector */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recipients</CardTitle>
                <CardDescription>
                  Choose who will receive this newsletter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient_type">Send To</Label>
                  <Select
                    value={data.recipient_type}
                    onValueChange={(value) => setData("recipient_type", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="courses">Courses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {data.recipient_type === "courses" && (
                  <div className="space-y-2">
                    <Label>Select Courses</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`course-${course.id}`}
                            checked={data.courses.includes(course)}
                            onCheckedChange={() =>
                              handleCourseToggle(course)
                            }
                          />
                          <Label htmlFor={`course-${course.id}`}>

                          <TransText en={course.name.en} fr={course.name.fr} ar={course.name.ar} />

                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewsletterPage;
