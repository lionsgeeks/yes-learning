'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft, Clock, Filter, Image, Play, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    {
        title: 'Sub Libraries',
        href: `/sub_library`,
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
    const { library } = usePage().props;
    console.log(library);
    // Filter libraries based on search query
    const filteredLibraries = library.sublibraries.filter(
        (library) =>
            library.title.toLowerCase().includes(searchQuery.toLowerCase()) || library.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sub Library" />
            <div className="space-y-6 p-3 md:p-6">
                <div>
                    <Link href="/library" className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Libraries
                    </Link>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLibraries.map((library) => (
                        <Link key={library.id} href={`/ngo/sublibrary/${library.id}`} className="group">
                            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                                <CardContent className="p-4">
                                    <h3 className="group-hover:text-primary mb-1 line-clamp-1 font-medium transition-colors">{library.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2 text-sm">{library.coach}</p>
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
            </div>
        </AppLayout>
    );
}
