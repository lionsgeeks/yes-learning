'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { ChevronLeft, Clock, Filter, Play, Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

// import Image from 'next/image';
// import Link from 'next/link';
import { useState } from 'react';

const breadcrumbs = [
  {
      title: 'Libraries',
      href: `/library`,
  },
];
// Mock data for module libraries
const moduleLibraries = [
    {
        id: 1,
        title: 'React Hooks Fundamentals',
        duration: '45min',
        category: 'Frontend',
        description: 'Learn the basics of React Hooks and how to use them in your applications.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=React+Hooks',
    },
    {
        id: 2,
        title: 'Advanced useState Patterns',
        duration: '38min',
        category: 'Frontend',
        description: 'Explore advanced patterns and techniques with the useState hook.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=useState',
    },
    {
        id: 3,
        title: 'useEffect Deep Dive',
        duration: '52min',
        category: 'Frontend',
        description: 'A comprehensive look at the useEffect hook and its applications.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=useEffect',
    },
    {
        id: 4,
        title: 'Custom Hooks Creation',
        duration: '41min',
        category: 'Frontend',
        description: 'Learn how to create and use custom hooks to reuse logic across components.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=Custom+Hooks',
    },
    {
        id: 5,
        title: 'Context API with Hooks',
        duration: '35min',
        category: 'Frontend',
        description: 'Using React Context API with hooks for state management.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=Context+API',
    },
    {
        id: 6,
        title: 'Performance Optimization',
        duration: '48min',
        category: 'Frontend',
        description: 'Techniques for optimizing performance in React applications using hooks.',
        thumbnail: '/placeholder.svg?height=180&width=320&text=Performance',
    },
];

export default function ModuleLibrariesPage() {
    // const moduleId = Number.parseInt(params.id);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter libraries based on search query
    const filteredLibraries = moduleLibraries.filter(
        (library) =>
            library.title.toLowerCase().includes(searchQuery.toLowerCase()) || library.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6 p-3 md:p-6">
                <div>
                    <Link
                        href="/library"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Libraries
                    </Link>
                    <h1 className="mt-2 text-3xl font-bold">React Hooks Module</h1>
                    <p className="text-muted-foreground mt-1">Access all library content for this module</p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">Frontend</Badge>
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Hooks</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input
                                type="search"
                                placeholder="Search libraries..."
                                className="w-full pl-9 sm:w-[260px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Content</TabsTrigger>
                        <TabsTrigger value="videos">Videos</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredLibraries.map((library) => (
                                <Link key={library.id} href={`/library/${library.id}`} className="group">
                                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                                        <div className="relative aspect-video">
                                            {/* <Image
                                                src={library.thumbnail || '/placeholder.svg'}
                                                alt={library.title}
                                                width={320}
                                                height={180}
                                                className="w-full object-cover"
                                            /> */}
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
                                            </div>
                                            <h3 className="group-hover:text-primary mb-1 line-clamp-1 font-medium transition-colors">
                                                {library.title}
                                            </h3>
                                            <p className="text-muted-foreground line-clamp-2 text-sm">{library.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        {filteredLibraries.length === 0 && (
                            <div className="rounded-lg border py-12 text-center">
                                <h3 className="text-lg font-medium">No libraries found</h3>
                                <p className="text-muted-foreground mt-2">Try adjusting your search query</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="videos" className="mt-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredLibraries.map((library) => (
                                <Link key={library.id} href={`/libraries/detail/${library.id}`} className="group">
                                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
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
                                            <h3 className="group-hover:text-primary mb-1 line-clamp-1 font-medium transition-colors">
                                                {library.title}
                                            </h3>
                                            <p className="text-muted-foreground line-clamp-2 text-sm">{library.description}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="resources" className="mt-6">
                        <div className="rounded-lg border py-12 text-center">
                            <h3 className="text-lg font-medium">Additional Resources</h3>
                            <p className="text-muted-foreground mt-2">Downloadable resources will appear here</p>
                            <Button className="mt-4" variant="outline">
                                Browse All Resources
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
