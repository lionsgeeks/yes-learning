import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, Clock, Download, FileText, Image, PlusCircle } from 'lucide-react';
import { useState } from 'react';

const CourseDetails = () => {
    const { course, chapters, image_url } = usePage().props;
    // console.log('course ', course);
    console.log('chapters', chapters);
    const breadcrumbs = [
        {
            title: course.name,
            href: `/course/${course.id}`,
        },
    ];


    const attachments = [{ id: 1, name: 'HTML Cheat Sheet.pdf', type: 'PDF', size: '1.2 MB', icon: FileText }];
    const [currentSubModuleId, setCurrentSubModuleId] = useState(1);
    const [coursePercentage, setCoursePercentage] = useState(0);
    const calculPercentage = (param) => {
        setCoursePercentage((param / chapters.length) * 100);
    };

    function extractVideoId(url) {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/]+)/;
        const match = url.match(regex);
        return match && match[1];
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.name} />
            <div className="mb-6 p-6">
                <Link href="/course" className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors">
                    <ChevronLeft className="mr- h-4 w-4" />
                    Back to Courses
                </Link>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-xl font-bold">{course.name}</h1>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="px-2 py-0 text-xs font-normal">
                            <Clock className="mr-1 h-3 w-3" />
                            {chapters.reduce((sum, chapter) => sum + chapter.estimated_duration, 0)} Minutes total
                        </Badge>
                        <Badge variant="outline" className="px-2 py-0 text-xs font-normal">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {chapters.length} lessons
                        </Badge>
                    </div>
                </div>
                <Progress value={coursePercentage} className="mt-4 h-2" />
                <div className="text-muted-foreground mt-1 flex justify-between text-xs">
                    <span>{Math.round(coursePercentage)}% completed</span>
                    <span>
                        {currentSubModuleId} of {chapters.length} lessons completed
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
                {/* Left sidebar - Module navigation */}
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="py-3">
                            <CardTitle className="text-lg">Course Content</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[calc(100vh-300px)]">
                                <Accordion type="multiple" defaultValue={['module-1']} className="px-4 pb-4">
                                    <AccordionItem key={course.id} value={`module-${course.id}`}>
                                        <AccordionTrigger className="py-3 text-sm hover:no-underline">
                                            <div className="flex items-start text-left">
                                                <span>{course.name}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-1 pl-2">
                                                {chapters.map((subModule, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            setCurrentSubModuleId(index + 1);
                                                            calculPercentage(index + 1);
                                                        }}
                                                        // href={`/module/${subModule.id}`}
                                                        className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                                                            index + 1 === currentSubModuleId ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                                        }`}
                                                    >
                                                        {/* </Card> */}

                                                        <div className="flex items-center">
                                                            {subModule.published ? (
                                                                <div className="bg-primary/20 text-primary mr-2 flex h-4 w-4 items-center justify-center rounded-full text-[10px]">
                                                                    ✓
                                                                </div>
                                                            ) : (
                                                                <div className="border-input mr-2 flex h-4 w-4 items-center justify-center rounded-full border text-[10px]"></div>
                                                            )}
                                                            <span className={index + 1 === currentSubModuleId ? '' : 'text-muted-foreground'}>
                                                                {subModule.title}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {subModule.hasQuiz && (
                                                                <Badge variant="outline" className="h-5 px-1 text-[10px]">
                                                                    Quiz
                                                                </Badge>
                                                            )}
                                                            <span className={index + 1 === currentSubModuleId ? '' : 'text-muted-foreground text-xs'}>
                                                                {subModule.estimated_duration}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Middle - Course content */}
                <div className="lg:col-span-6">
                    <Card className="overflow-hidden">
                        <CardContent className="p-6">
                            <Tabs defaultValue="content">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="content">Lesson Content</TabsTrigger>
                                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                                    <TabsTrigger value="notes">My Notes</TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-medium">{chapters[0].title}</h2>
                                        <Button variant="outline" size="sm">
                                            <PlusCircle className="mr-1 h-4 w-4" />
                                            Save to Bookmarks
                                        </Button>
                                    </div>

                                    <div className="prose max-w-none">
                                        {chapters.flatMap((chapter, chapterIndex) =>
                                            chapter.content.flatMap((content, contentIndex) =>
                                                content.blocks.map(
                                                    (block, blockIndex) =>
                                                        chapterIndex + 1 === currentSubModuleId && (
                                                            <div key={`${chapterIndex}-${contentIndex}-${blockIndex}`} className="rounded-md p-4">
                                                                {/* Block Title */}
                                                                {block.content.title && <h3 className="mb-2 font-medium">{block.content.title}</h3>}

                                                                {/* Text Block */}
                                                                {block.type === 'text' && block.content.body && (
                                                                    <div className="prose max-w-none">
                                                                        <p>{block.content.body}</p>
                                                                    </div>
                                                                )}

                                                                {/* Image Block */}
                                                                {block.type === 'image' && (
                                                                    <div className="space-y-2">
                                                                        <div className="bg-muted flex aspect-video items-center justify-center rounded-md">
                                                                            {/* <div className="text-muted-foreground">Image Preview</div> */}
                                                                            <img
                                                                                src={`${image_url}/${block.content.url}`}
                                                                                alt="Course cover preview"
                                                                                className="h-auto w-full rounded-md object-cover"
                                                                            />
                                                                        </div>
                                                                        {block.content.caption && (
                                                                            <p className="text-muted-foreground text-center text-sm">
                                                                                {block.content.caption}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Video Block */}
                                                                {block.type === 'video' && block.content.url && (
                                                                    <div className="space-y-2">
                                                                        <div className="bg-muted flex aspect-video items-center justify-center rounded-md">
                                                                            <iframe
                                                                                width="866"
                                                                                height="487"
                                                                                src={`https://www.youtube.com/embed/${extractVideoId(block.content.url)}`} // Extract video ID function
                                                                                title="Video"
                                                                                frameBorder="0"
                                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                                referrerPolicy="strict-origin-when-cross-origin"
                                                                                allowFullScreen
                                                                            ></iframe>
                                                                        </div>
                                                                        {block.content.caption && (
                                                                            <p className="text-muted-foreground text-center text-sm">
                                                                                {block.content.caption}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* List Block */}
                                                                {block.type === 'list' && (
                                                                    <div>
                                                                        {block.content.type === 'bullet' ? (
                                                                            <ul className="list-disc space-y-1 pl-5">
                                                                                {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                    <li key={i}>{item}</li>
                                                                                ))}
                                                                            </ul>
                                                                        ) : block.content.type === 'numbered' ? (
                                                                            <ol className="list-decimal space-y-1 pl-5">
                                                                                {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                    <li key={i}>{item}</li>
                                                                                ))}
                                                                            </ol>
                                                                        ) : (
                                                                            <div className="space-y-2">
                                                                                {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                    <div key={i} className="flex items-center">
                                                                                        <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                                                        <span>{item}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Table Block */}
                                                                {block.type === 'table' && (
                                                                    <div className="overflow-x-auto">
                                                                        <table className="w-full border-collapse">
                                                                            <thead>
                                                                                <tr className="bg-muted">
                                                                                    {Array.from({ length: block.content.cols || 3 }).map((_, i) => (
                                                                                        <th key={i} className="border p-2 text-left">
                                                                                            Header {i + 1}
                                                                                        </th>
                                                                                    ))}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {Array.from({ length: block.content.rows || 3 }).map(
                                                                                    (_, rowIndex) => (
                                                                                        <tr key={rowIndex}>
                                                                                            {Array.from({ length: block.content.cols || 3 }).map(
                                                                                                (_, colIndex) => (
                                                                                                    <td key={colIndex} className="border p-2">
                                                                                                        Cell {rowIndex + 1},{colIndex + 1}
                                                                                                    </td>
                                                                                                ),
                                                                                            )}
                                                                                        </tr>
                                                                                    ),
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                )}

                                                                {/* Chart Block */}
                                                                {block.type === 'chart' && renderChart(block)}
                                                            </div>
                                                        ),
                                                ),
                                            ),
                                        )}
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
                                                    className="w-full rounded-md border p-2 text-sm"
                                                    rows={3}
                                                    placeholder="Add to the discussion..."
                                                ></textarea>
                                                <div className="mt-2 flex justify-end">
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
                                                        <span className="text-muted-foreground text-xs">2 days ago</span>
                                                    </div>
                                                    <p className="mt-1 text-sm">
                                                        I'm finding the distinction between front-end and back-end really helpful. Are there any
                                                        recommended resources for learning more about back-end development?
                                                    </p>
                                                    <div className="mt-2 flex gap-4">
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                                <PlusCircle className="mr-1 h-4 w-4" />
                                                Add Note
                                            </Button>
                                        </div>

                                        <div className="bg-muted/50 rounded-md border p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="font-medium">Front-end vs Back-end</div>
                                                <div className="text-muted-foreground text-xs">Added 2 days ago</div>
                                            </div>
                                            <p className="mt-2 text-sm">
                                                Front-end: HTML, CSS, JavaScript - what users see and interact with. Back-end: Server-side languages,
                                                databases - powers the front-end. Remember to look into Node.js for JavaScript back-end development.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-between">
                        {currentSubModuleId > 1 && (
                            <Button variant="outline" onClick={() => setCurrentSubModuleId(currentSubModuleId - 1)}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous Lesson
                            </Button>
                        )}
                        {currentSubModuleId === chapters.length ? (
                            <Link href="/quiz/1">
                                <Button>
                                    Take Quiz
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                onClick={() => {
                                    setCurrentSubModuleId(currentSubModuleId + 1);
                                    calculPercentage(currentSubModuleId);
                                }}
                            >
                                Next
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}
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
                                        className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-2 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="bg-primary/10 mr-3 flex h-8 w-8 items-center justify-center rounded">
                                                <attachment.icon className="text-primary h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{attachment.name}</div>
                                                <div className="text-muted-foreground text-xs">
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
