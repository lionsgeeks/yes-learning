import React from "react";
import { usePage, Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    FileText,
    FolderOpen,
    Image,
    MessageSquare,
    Play,
    PlusCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"






const CourseDetails = () => {
    const { course } = usePage().props;

    const breadcrumbs = [

        {
            title: course.name,
            href: `/course/${course.id}`,
        },
    ];



    const modules = [
        {
            id: 1,
            title: "Introduction to Web Development",
            isExpanded: true,
            subModules: [
                { id: 101, title: "Course Overview", duration: "10 min", isCompleted: true, hasQuiz: false },
                { id: 102, title: "Setting Up Your Environment", duration: "15 min", isCompleted: true, hasQuiz: false },
                { id: 103, title: "Web Development Basics", duration: "20 min", isCompleted: false, hasQuiz: false },
            ],
        },

    ]

    const attachments = [
        { id: 1, name: "HTML Cheat Sheet.pdf", type: "PDF", size: "1.2 MB", icon: FileText },

    ]

    const currentSubModule = modules[0].subModules[2]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.name} />
            {/* <div className="mb-6 p-6">

                <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <h1 className="text-2xl font-bold">Web Development Fundamentals</h1>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-normal px-2 py-0">
                            <Clock className="h-3 w-3 mr-1" />8 hours total
                        </Badge>
                        <Badge variant="outline" className="text-xs font-normal px-2 py-0">
                            <BookOpen className="h-3 w-3 mr-1" />
                            24 lessons
                        </Badge>
                    </div>
                </div>
                <Progress value={15} className="h-2 mt-4" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>15% complete</span>
                    <span>3 of 24 lessons completed</span>
                </div>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
                {/* Left sidebar - Module navigation */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle className="text-lg">Course Content</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <Accordion type="multiple" defaultValue={["module-1"]} className="px-4 pb-4">
                                    {modules.map((module) => (
                                        <AccordionItem key={module.id} value={`module-${module.id}`}>
                                            <AccordionTrigger className="py-3 text-sm hover:no-underline">
                                                <div className="flex items-start text-left">
                                                    <span>{module.title}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-1 pl-2">
                                                    {module.subModules.map((subModule) => (
                                                        <Link
                                                            key={subModule.id}
                                                            href={`/module/${subModule.id}`}
                                                            className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors
                                ${subModule.id === currentSubModule.id
                                                                    ? "bg-primary text-primary-foreground"
                                                                    : "hover:bg-muted"
                                                                }`}
                                                        >
                                                            <div className="flex items-center">
                                                                {subModule.isCompleted ? (
                                                                    <div className="mr-2 h-4 w-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">
                                                                        ✓
                                                                    </div>
                                                                ) : (
                                                                    <div className="mr-2 h-4 w-4 rounded-full border border-input flex items-center justify-center text-[10px]"></div>
                                                                )}
                                                                <span className={subModule.id === currentSubModule.id ? "" : "text-muted-foreground"}>
                                                                    {subModule.title}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {subModule.hasQuiz && (
                                                                    <Badge variant="outline" className="h-5 px-1 text-[10px]">
                                                                        Quiz
                                                                    </Badge>
                                                                )}
                                                                <span className="text-xs text-muted-foreground">{subModule.duration}</span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Middle - Course content */}
                <div className="lg:col-span-6">
                    <Card className="overflow-hidden">
                        <div className="relative aspect-video">

                            <iframe className="w-full h-full" src="https://www.youtube.com/embed/xDAtMVP1v6k" title="React.js with Inertia in Laravel: Practical Example" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                        </div>

                        <CardContent className="p-6">
                            <Tabs defaultValue="content">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="content">Lesson Content</TabsTrigger>
                                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                                    <TabsTrigger value="notes">My Notes</TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-medium">Web Development Basics</h2>
                                        <Button variant="outline" size="sm">
                                            <PlusCircle className="h-4 w-4 mr-1" />
                                            Save to Bookmarks
                                        </Button>
                                    </div>

                                    <div className="prose max-w-none">
                                        <p>
                                            Web development is the work involved in developing a website for the Internet or an intranet. Web
                                            development can range from developing a simple single static page of plain text to complex web
                                            applications, electronic businesses, and social network services.
                                        </p>



                                        <h4>Back-end Technologies</h4>
                                        <ul>
                                            <li>
                                                <strong>Server-side languages</strong> - PHP, Python, Ruby, Node.js, etc.
                                            </li>
                                            <li>
                                                <strong>Databases</strong> - MySQL, MongoDB, PostgreSQL, etc.
                                            </li>
                                            <li>
                                                <strong>Server</strong> - Apache, Nginx, etc.
                                            </li>
                                        </ul>

                                        <div className="bg-muted p-4 rounded-md my-4">
                                            <h4 className="mt-0">Key Takeaways:</h4>
                                            <ul className="mb-0">
                                                <li>Web development involves both client-side and server-side programming</li>
                                                <li>HTML, CSS, and JavaScript are the core technologies for front-end development</li>
                                                <li>Back-end development involves server-side languages and databases</li>
                                                <li>Full-stack developers work on both front-end and back-end</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="discussion">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 pb-4">
                                            <Image
                                                src="/placeholder.svg?height=40&width=40"
                                                alt="User avatar"
                                                width={40}
                                                height={40}
                                                className="rounded-full"
                                            />
                                            <div className="flex-1">
                                                <textarea
                                                    className="w-full border rounded-md p-2 text-sm"
                                                    rows={3}
                                                    placeholder="Add to the discussion..."
                                                ></textarea>
                                                <div className="flex justify-end mt-2">
                                                    <Button size="sm">Post Comment</Button>
                                                </div>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-4 pt-2">
                                            <div className="flex gap-4">
                                                <Image
                                                    src="/placeholder.svg?height=40&width=40"
                                                    alt="User avatar"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">Alex Johnson</span>
                                                        <span className="text-xs text-muted-foreground">2 days ago</span>
                                                    </div>
                                                    <p className="text-sm mt-1">
                                                        I'm finding the distinction between front-end and back-end really helpful. Are there any
                                                        recommended resources for learning more about back-end development?
                                                    </p>
                                                    <div className="flex gap-4 mt-2">
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                                                />
                                                            </svg>
                                                            Like (12)
                                                        </Button>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="notes">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium">My Notes for This Lesson</h3>
                                            <Button variant="outline" size="sm">
                                                <PlusCircle className="h-4 w-4 mr-1" />
                                                Add Note
                                            </Button>
                                        </div>

                                        <div className="bg-muted/50 border rounded-md p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="font-medium">Front-end vs Back-end</div>
                                                <div className="text-xs text-muted-foreground">Added 2 days ago</div>
                                            </div>
                                            <p className="text-sm mt-2">
                                                Front-end: HTML, CSS, JavaScript - what users see and interact with. Back-end: Server-side
                                                languages, databases - powers the front-end. Remember to look into Node.js for JavaScript
                                                back-end development.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <div className="flex justify-between mt-6">
                        <Button variant="outline">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous Lesson
                        </Button>
                        <Link href="/quiz/1">
                            <Button>
                                Take Quiz
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Right sidebar - Attachments */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle className="text-lg">Attachments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {attachments.map((attachment) => (
                                    <div
                                        key={attachment.id}
                                        className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-primary/10 w-8 h-8 rounded flex items-center justify-center mr-3">
                                                <attachment.icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{attachment.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {attachment.type} • {attachment.size}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Download className="h-4 w-4" />
                                            <span className="sr-only">Download</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseDetails;
