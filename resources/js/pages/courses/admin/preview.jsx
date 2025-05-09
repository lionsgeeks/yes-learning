import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { BookOpen, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const CourseDetails = () => {
    const { course, chapters, auth } = usePage().props;
    // console.log('course :', course);
    // console.log('chapters :', chapters);
    const [currentChapterId, setCurrentChapterId] = useState(chapters[0]?.id);
    const [lang, setLang] = useState('en');

    const [currentSubModuleId, setCurrentSubModuleId] = useState(1);
    const [coursePercentage, setCoursePercentage] = useState(0);
    const calculPercentage = (param) => {
        setCoursePercentage((param / chapters.length) * 100);
    };
    const breadcrumbs = [
        {
            title: course.name[lang],
            href: `/course/${course.id}`,
        },
    ];

    const readChapters = () => {
        setCurrentSubModuleId(currentSubModuleId + 1);
        calculPercentage(currentSubModuleId);
        setCurrentChapterId(currentChapterId + 1);
    };
    function renderChart(block) {
        const content = block.content;
        const chartData = {
            labels: content.data.map((point) => point.name),
            datasets: [
                {
                    label: 'Dataset',
                    data: content.data.map((point) => point.value),
                    backgroundColor: content?.type === 'pie' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: content?.title || 'Chart Preview',
                },
            },
        };

        return (
            <div className="bg- rounded-md">
                <div className="h-full w-full">
                    <div className="flex h-full items-center justify-center">
                        <div className="">
                            {block.content?.type === 'bar' && <Bar data={chartData} options={chartOptions} />}
                            {block.content?.type === 'line' && <Line data={chartData} options={chartOptions} />}
                            {block.content?.type === 'pie' && <Pie data={chartData} options={chartOptions} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function extractVideoId(url) {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/]+)/;
        const match = url.match(regex);
        return match && match[1];
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={course.name[lang]} />
            <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <div className="p-6">
                    <Link
                        href="/admin/courses"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr- h-4 w-4" />
                        Back to Courses
                    </Link>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                        <h1 className="text-xl font-bold">{course.name[lang]}</h1>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="px-2 py-0 text-xs font-normal">
                                <BookOpen className="mr-1 h-3 w-3" />
                                {chapters.length} lessons
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8">
                                {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية ' : 'Français'} <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {['en', 'ar', 'fr'].map((lang) => (
                                <DropdownMenuItem key={lang} onClick={() => setLang(lang)}>
                                    <span className="mr-2">{lang}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-12">
                    {/* Left sidebar - Module navigation */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader className="py-">
                                <CardTitle className="text-lg">Course Content</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-[calc(100vh-300px)]">
                                    <div className="space-y-1 p-2">
                                        {chapters.map((subModule, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setCurrentSubModuleId(index + 1);
                                                    calculPercentage(index + 1);
                                                    setCurrentChapterId(subModule.id);
                                                }}
                                                // href={`/module/${subModule.id}`}
                                                className={`flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors ${
                                                    index + 1 === currentSubModuleId ? 'bg-primary/80 text-primary-foreground' : 'hover:bg-muted'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {subModule.hasQuiz && (
                                                        <Badge variant="outline" className="h-5 px-1 text-[10px]">
                                                            Quiz
                                                        </Badge>
                                                    )}
                                                    <span className={index + 1 === currentSubModuleId ? '' : 'text-muted-foreground text-xs'}>
                                                        {subModule.estimated_duration[lang]}
                                                    </span>
                                                    <span className={index + 1 === currentSubModuleId ? '' : 'text-muted-foreground'}>
                                                        {subModule?.title[lang]}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle - Course content */}

                    <div dir={auth.user.language === 'ar' ? 'rtl' : 'ltr'} className="lg:col-span-9">
                        <Card className="overflow-hidden">
                            <CardContent className="">
                                <Tabs defaultValue="content">
                                    <TabsList className="mb-4">
                                        <TabsTrigger value="content"> Lesson Content</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="content" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-medium">{chapters[0]?.title[lang]}</h2>
                                        </div>

                                        <div dir={auth.user.language === 'ar' ? 'rtl' : 'ltr'} className="prose max-w-none">
                                            {chapters.flatMap((chapter, chapterIndex) =>
                                                chapter?.content[lang]?.flatMap((content, contentIndex) =>
                                                    content?.blocks?.map(
                                                        (block, blockIndex) =>
                                                            chapterIndex + 1 === currentSubModuleId && (
                                                                <div key={`${chapterIndex}-${contentIndex}-${blockIndex}`} className="rounded-md p-4">
                                                                    {/* Block Title */}
                                                                    {block.content?.title && (
                                                                        <h3 className="mb-2 font-medium">{block.content?.title}</h3>
                                                                    )}

                                                                    {/* Text Block */}
                                                                    {block?.type === 'text' && block.content.body && (
                                                                        <div className="prose max-w-none">
                                                                            <p>{block.content.body}</p>
                                                                        </div>
                                                                    )}

                                                                    {/* Image Block */}
                                                                    {block?.type === 'image' && (
                                                                        <div className="space-y-2">
                                                                            <div className="bg-muted flex aspect-video items-center justify-center rounded-md">
                                                                                <img
                                                                                    src={`/storage/${block.content.url}`}
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
                                                                    {block?.type === 'video' && block.content.url && (
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
                                                                    {block?.type === 'list' && (
                                                                        <div>
                                                                            {block.content?.type === 'bullet' ? (
                                                                                <ul className="list-disc space-y-1 pl-5">
                                                                                    {(block.content.items || ['Sample item'])?.map((item, i) => (
                                                                                        <li key={i}>{item}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            ) : block.content?.type === 'numbered' ? (
                                                                                <ol className="list-decimal space-y-1 pl-5">
                                                                                    {(block.content.items || ['Sample item'])?.map((item, i) => (
                                                                                        <li key={i}>{item}</li>
                                                                                    ))}
                                                                                </ol>
                                                                            ) : (
                                                                                <div className="space-y-2">
                                                                                    {(block.content?.items || ['Sample item'])?.map((item, i) => (
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
                                                                    {block?.type === 'table' && (
                                                                        <div className="overflow-x-auto">
                                                                            <table className="w-full border-collapse">
                                                                                <thead>
                                                                                    <tr className="bg-muted">
                                                                                        {Array.from({ length: block.content.cols || 3 })?.map(
                                                                                            (_, i) => (
                                                                                                <th key={i} className="border p-2 text-left">
                                                                                                    {block.content?.data[0][i]}
                                                                                                </th>
                                                                                            ),
                                                                                        )}
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {Array.from({ length: block.content.rows - 1 || 3 })?.map(
                                                                                        (_, rowIndex) => (
                                                                                            <tr key={rowIndex}>
                                                                                                {Array.from({ length: block.content.cols || 3 })?.map(
                                                                                                    (_, colIndex) => (
                                                                                                        <td key={colIndex} className="border p-2">
                                                                                                            {
                                                                                                                block.content?.data[rowIndex + 1][
                                                                                                                    colIndex
                                                                                                                ]
                                                                                                            }
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
                                                                    {block?.type === 'chart' && renderChart(block)}

                                                                    {/* document block */}
                                                                    {block?.type === 'document' && (
                                                                        <div className="space-y-2">
                                                                            <div className="overflow-hidden rounded-md border">
                                                                                <div className="bg-muted/30 flex items-center justify-between border-b p-3">
                                                                                    <div className="flex items-center">
                                                                                        <FileText className="text-primary mr-2 h-5 w-5" />
                                                                                        <div className="font-medium">
                                                                                            <span>{block.content?.title || 'PDF Document'}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <a
                                                                                        href={`/storage/${block.content.url}`}
                                                                                        target="_blank"
                                                                                        download
                                                                                    >
                                                                                        <Button variant="outline" size="sm" className="h-8">
                                                                                            <Download className="mr-2 h-4 w-4" />
                                                                                            Download
                                                                                        </Button>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                            {block.content.description && (
                                                                                <p className="text-muted-foreground text-sm">
                                                                                    {block.content.description}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ),
                                                    ),
                                                ),
                                            )}
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
                                <Button onClick={() => router.visit('/admin/courses')}>
                                    Back to courses
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        readChapters();
                                    }}
                                >
                                    Next
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default CourseDetails;
