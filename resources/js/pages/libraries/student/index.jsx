import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
// import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from '@/components/ui/badge';
import { Clock, Filter, Image, Play, Search } from 'lucide-react';
// import Link from "next/link"
// import Image from "next/image"
import { Head, Link } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Libraries',
        href: `/library`,
    },
];
// Mock data for libraries
const libraries = [
    {
        id: 1,
        title: 'Introduction to React Hooks',
        coach: 'Sarah Miller',
        date: 'March 15, 2025',
        duration: '1h 20min',
        category: 'Frontend',
        description: 'Learn how to use React Hooks to simplify your functional components.',
        views: 245,
        thumbnail: '/placeholder.svg?height=180&width=320&text=React+Hooks',
    },
    {
        id: 2,
        title: 'Advanced CSS Layouts',
        coach: 'Michael Chen',
        date: 'March 12, 2025',
        duration: '55min',
        category: 'CSS',
        description: 'Master CSS Grid and Flexbox for complex responsive layouts.',
        views: 189,
        thumbnail: '/placeholder.svg?height=180&width=320&text=CSS+Layouts',
    },
    {
        id: 3,
        title: 'Backend Development with Node.js',
        coach: 'David Wilson',
        date: 'March 10, 2025',
        duration: '1h 45min',
        category: 'Backend',
        description: 'Build scalable server-side applications with Node.js and Express.',
        views: 312,
        thumbnail: '/placeholder.svg?height=180&width=320&text=Node.js',
    },
    {
        id: 4,
        title: 'Database Design Principles',
        coach: 'Emma Rodriguez',
        date: 'March 8, 2025',
        duration: '1h 10min',
        category: 'Database',
        description: 'Learn best practices for designing efficient and scalable databases.',
        views: 178,
        thumbnail: '/placeholder.svg?height=180&width=320&text=Database+Design',
    },
    {
        id: 5,
        title: 'UI/UX Design Fundamentals',
        coach: 'Alex Johnson',
        date: 'March 5, 2025',
        duration: '1h 30min',
        category: 'Design',
        description: 'Understand the principles of creating user-friendly interfaces.',
        views: 267,
        thumbnail: '/placeholder.svg?height=180&width=320&text=UI/UX+Design',
    },
    {
        id: 6,
        title: 'JavaScript Performance Optimization',
        coach: 'Sarah Miller',
        date: 'March 3, 2025',
        duration: '1h 15min',
        category: 'JavaScript',
        description: 'Techniques to improve the performance of your JavaScript applications.',
        views: 203,
        thumbnail: '/placeholder.svg?height=180&width=320&text=JS+Performance',
    },
    {
        id: 7,
        title: 'Responsive Web Design',
        coach: 'Michael Chen',
        date: 'February 28, 2025',
        duration: '1h 05min',
        category: 'CSS',
        description: 'Create websites that work well on all devices and screen sizes.',
        views: 231,
        thumbnail: '/placeholder.svg?height=180&width=320&text=Responsive+Design',
    },
    {
        id: 8,
        title: 'API Development Best Practices',
        coach: 'David Wilson',
        date: 'February 25, 2025',
        duration: '1h 40min',
        category: 'Backend',
        description: 'Design and implement robust and scalable APIs for your applications.',
        views: 195,
        thumbnail: '/placeholder.svg?height=180&width=320&text=API+Development',
    },
];

export default function LibrariesPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Library" />
            <div className="space-y-6 p-3 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Libraries</h1>
                        <p className="text-muted-foreground mt-1">Access recorded coaching sessions and learning resources</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input type="search" placeholder="Search libraries..." className="w-full pl-9 sm:w-[260px]" />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Libraries</TabsTrigger>
                        <TabsTrigger value="frontend">Frontend</TabsTrigger>
                        <TabsTrigger value="backend">Backend</TabsTrigger>
                        <TabsTrigger value="design">Design</TabsTrigger>
                        <TabsTrigger value="database">Database</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {libraries.map((library) => (
                                <Link key={library.id} href={`/sub_library/${library.id}`} className="group">
                                    <Card className="border-primary/20 from-background to-muted/30 flex h-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br p-0 transition-all hover:shadow-md sm:flex-row">
                                        <div className="relative aspect-video sm:aspect-square sm:w-1/3">
                                            <Image src={library.thumbnail || '/placeholder.svg'} alt={library.title} fill className="object-cover" />
                                            <div className="from-primary/80 absolute inset-0 flex scale-95 items-center justify-center bg-gradient-to-t to-black/60 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                                                <Button variant="secondary" size="sm" className="gap-1">
                                                    <Play className="h-4 w-4" />
                                                    Watch Now
                                                </Button>
                                            </div>
                                            <div className="absolute right-2 bottom-2 flex items-center rounded bg-black/70 px-2 py-1 text-xs text-white">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {library.duration}
                                            </div>
                                        </div>
                                        <CardContent className="border-primary/10 flex flex-1 flex-col justify-between border-t p-5 sm:border-t-0 sm:border-l sm:p-6">
                                            <div>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {library.category}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-xs">{library.views} views</span>
                                                </div>
                                                <h3 className="group-hover:text-primary text-primary/90 mb-1 line-clamp-1 font-semibold transition-colors">
                                                    {library.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-2 text-xs">
                                                    Coach: {library.coach} • {library.date}
                                                </p>
                                                <p className="text-muted-foreground line-clamp-2 text-sm">{library.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="frontend" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 bg-red-500 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {libraries
                                .filter((lib) => ['Frontend', 'CSS', 'JavaScript'].includes(lib.category))
                                .map((library) => (
                                    <Link key={library.id} href={`/library/${library.id}`} className="group">
                                        <Card className="border-primary/20 from-background to-muted/30 flex h-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br transition-all hover:shadow-md sm:flex-row">
                                            <div className="relative aspect-video sm:aspect-square sm:w-1/3">
                                                <Image
                                                    src={library.thumbnail || '/placeholder.svg'}
                                                    alt={library.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="from-primary/80 absolute inset-0 flex scale-95 items-center justify-center bg-gradient-to-t to-black/60 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                                                    <Button variant="secondary" size="sm" className="gap-1">
                                                        <Play className="h-4 w-4" />
                                                        Watch Now
                                                    </Button>
                                                </div>
                                                <div className="absolute right-2 bottom-2 flex items-center rounded bg-black/70 px-2 py-1 text-xs text-white">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {library.duration}
                                                </div>
                                            </div>
                                            <CardContent className="border-primary/10 flex flex-1 flex-col justify-between border-t p-5 sm:border-t-0 sm:border-l sm:p-6">
                                                <div>
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <Badge variant="outline" className="text-xs font-normal">
                                                            {library.category}
                                                        </Badge>
                                                        <span className="text-muted-foreground text-xs">{library.views} views</span>
                                                    </div>
                                                    <h3 className="group-hover:text-primary text-primary/90 mb-1 line-clamp-1 font-semibold transition-colors">
                                                        {library.title}
                                                    </h3>
                                                    <p className="text-muted-foreground mb-2 text-xs">
                                                        Coach: {library.coach} • {library.date}
                                                    </p>
                                                    <p className="text-muted-foreground line-clamp-2 text-sm">{library.description}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </TabsContent>

                    {/* Other tab contents would follow the same pattern */}
                    <TabsContent value="backend" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {libraries
                                .filter((lib) => lib.category === 'Backend')
                                .map((library) => (
                                    <Link key={library.id} href={`/libraries/${library.id}`} className="group">
                                        <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                                            {/* Card content same as above */}
                                            <div className="relative aspect-video">
                                                <Image
                                                    src={library.thumbnail || '/placeholder.svg'}
                                                    alt={library.title}
                                                    width={320}
                                                    height={180}
                                                    className="w-full object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                                    <Button variant="secondary" size="sm" className="gap-1">
                                                        <Play className="h-4 w-4" />
                                                        Watch Now
                                                    </Button>
                                                </div>
                                                <div className="absolute right-2 bottom-2 flex items-center rounded bg-black/70 px-2 py-1 text-xs text-white">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {library.duration}
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Badge variant="outline" className="text-xs font-normal">
                                                        {library.category}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-xs">{library.views} views</span>
                                                </div>
                                                <h3 className="group-hover:text-primary mb-1 line-clamp-1 font-medium transition-colors">
                                                    {library.title}
                                                </h3>
                                                <p className="text-muted-foreground mb-2 text-xs">
                                                    Coach: {library.coach} • {library.date}
                                                </p>
                                                <p className="text-muted-foreground line-clamp-2 text-sm">{library.description}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
