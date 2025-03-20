import Forum from '@/components/libraryComponents/forum';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Link, usePage } from '@inertiajs/react';
import { BookmarkPlus, ChevronLeft, Clock, Download, FileText, Share2, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
const getLibraryData = (id) => {
    // In a real app, you would fetch this data from an API
    return {
        id: Number.parseInt(id),
        title: 'Introduction to React Hooks',
        coach: 'Sarah Miller',
        coachTitle: 'Senior Frontend Developer',
        coachAvatar: '/placeholder.svg?height=40&width=40',
        date: 'March 15, 2025',
        duration: '1h 20min',
        category: 'Frontend',
        description:
            "In this coaching session, we dive deep into React Hooks, exploring how they simplify state management and side effects in functional components. You'll learn about useState, useEffect, useContext, and custom hooks with practical examples.",
        views: 245,
        likes: 87,
        videoUrl: '/placeholder.svg?height=480&width=854&text=React+Hooks+Video',
        documents: [
            {
                id: 1,
                name: 'React Hooks Cheat Sheet.pdf',
                type: 'PDF',
                size: '1.2 MB',
                icon: FileText,
            },
            {
                id: 2,
                name: 'Custom Hooks Examples.zip',
                type: 'ZIP',
                size: '3.5 MB',
                icon: FileText,
            },
            {
                id: 3,
                name: 'Presentation Slides.pdf',
                type: 'PDF',
                size: '2.8 MB',
                icon: FileText,
            },
        ],
        comments: [
            {
                id: 1,
                user: 'Alex Johnson',
                avatar: '/placeholder.svg?height=40&width=40',
                time: '2 days ago',
                content:
                    "This was incredibly helpful! I've been struggling with understanding useEffect dependencies, but your explanation cleared it up for me.",
                likes: 12,
            },
            {
                id: 2,
                user: 'Emma Rodriguez',
                avatar: '/placeholder.svg?height=40&width=40',
                time: '1 day ago',
                content:
                    "Great session! Could you elaborate more on custom hooks? I'm trying to create one for form validation but running into issues.",
                likes: 8,
            },
            {
                id: 3,
                user: 'Michael Chen',
                avatar: '/placeholder.svg?height=40&width=40',
                time: '12 hours ago',
                content: "The comparison between class components and hooks was really insightful. I'm converting my old projects to use hooks now!",
                likes: 5,
            },
        ],
        relatedLibraries: [
            {
                id: 6,
                title: 'JavaScript Performance Optimization',
                coach: 'Sarah Miller',
                duration: '1h 15min',
                thumbnail: '/placeholder.svg?height=90&width=160&text=JS+Performance',
            },
            {
                id: 2,
                title: 'Advanced CSS Layouts',
                coach: 'Michael Chen',
                duration: '55min',
                thumbnail: '/placeholder.svg?height=90&width=160&text=CSS+Layouts',
            },
            {
                id: 5,
                title: 'UI/UX Design Fundamentals',
                coach: 'Alex Johnson',
                duration: '1h 30min',
                thumbnail: '/placeholder.svg?height=90&width=160&text=UI/UX+Design',
            },
        ],
    };
};

const LibraryDetails = () => {
    const { library: lib } = usePage().props;

    const library = getLibraryData(lib.id);
    const breadcrumbs = [
        {
            title: library.title,
            href: `/library/${library.id}`,
        },
    ];
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleSubmitComment = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your API
        console.log('Submitting comment:', newComment);
        setNewComment('');
        // Then you would add the new comment to the list
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                <div className="mb-6">
                    <Link href="/sub_library/1" className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Sub Libraries
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold">{library.title}</h1>
                    <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-sm">
                        <Badge variant="outline" className="text-xs font-normal">
                            {library.category}
                        </Badge>
                        <span>•</span>
                        <span className="flex items-center">
                            <Clock className="mr-1 h-3.5 w-3.5" />
                            {library.duration}
                        </span>
                        <span>•</span>
                        <span>{library.views} views</span>
                        <span>•</span>
                        <span>{library.date}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                            {/* <Image
                            src={library.videoUrl || '/placeholder.svg'}
                            alt={library.title}
                            width={854}
                            height={480}
                            className="h-full w-full object-contain"
                        /> */}
                            <iframe
                                className="h-full w-full"
                                src="https://www.youtube.com/embed/E1faj4pzePo"
                                title="Africa - A Journey Through Nature &amp; Tradition | Documentary | Continents of the World Ep. 1"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                            <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                                <div className="rounded-full bg-black/70 px-3 py-1 text-xs text-white">{library.duration}</div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" className="h-8 gap-1" onClick={() => setIsLiked(!isLiked)}>
                                        <ThumbsUp className={`h-4 w-4 ${isLiked ? 'text-primary fill-current' : ''}`} />
                                        {isLiked ? library.likes + 1 : library.likes}
                                    </Button>
                                    <Button variant="secondary" size="sm" className="h-8 gap-1" onClick={() => setIsBookmarked(!isBookmarked)}>
                                        <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? 'text-primary fill-current' : ''}`} />
                                        Save
                                    </Button>
                                    <Button variant="secondary" size="sm" className="h-8 gap-1">
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <Tabs defaultValue="about">
                            <TabsList>
                                <TabsTrigger value="about">About</TabsTrigger>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                            </TabsList>

                            <TabsContent value="about" className="mt-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        {/* <AvatarImage src={library.coachAvatar} alt={library.coach} /> */}
                                        <AvatarFallback> {library.coach.split(" ")[0][0]}{library.coach.split(" ")[1][0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{library.coach}</div>
                                        <div className="text-muted-foreground text-sm">{library.coachTitle}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div>
                                    <h3 className="mb-2 font-medium">Description</h3>
                                    <p className="text-muted-foreground">{library.description}</p>
                                </div>

                                <div>
                                    <h3 className="mb-2 font-medium">What You'll Learn</h3>
                                    <ul className="text-muted-foreground list-disc space-y-1 pl-5">
                                        <li>Understanding the motivation behind React Hooks</li>
                                        <li>Using useState for local component state</li>
                                        <li>Managing side effects with useEffect</li>
                                        <li>Creating and using custom hooks</li>
                                        <li>Common pitfalls and best practices</li>
                                    </ul>
                                </div>
                            </TabsContent>

                            <TabsContent value="documents" className="mt-4">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Shared Documents</h3>
                                    <div className="space-y-3">
                                        {library.documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded">
                                                        <doc.icon className="text-primary h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{doc.name}</div>
                                                        <div className="text-muted-foreground text-xs">
                                                            {doc.type} • {doc.size}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm" className="gap-1">
                                                    <Download className="h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="discussion" className="mt-4">
                                {/* {library.comments.map((comment) => (
                                            <div key={comment.id} className="space-y-2">
                                                <div className="flex items-start gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={comment.avatar} alt={comment.user} />
                                                        <AvatarFallback>
                                                            <User className="h-4 w-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{comment.user}</span>
                                                            <span className="text-muted-foreground text-xs">{comment.time}</span>
                                                        </div>
                                                        <p className="text-muted-foreground mt-1">{comment.content}</p>
                                                        <div className="mt-2 flex gap-4">
                                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                                <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                                                                Like ({comment.likes})
                                                            </Button>
                                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                                                <MessageSquare className="mr-1 h-3.5 w-3.5" />
                                                                Reply
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                <Forum comments={library.comments} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        {/* Coach Info Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">About the Coach</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="mb-3 h-20 w-20">
                                        {/* <AvatarImage src={library.coachAvatar} alt={library.coach} /> */}
                                        <AvatarFallback>{library.coach.split(" ")[0][0]}{library.coach.split(" ")[1][0]}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-medium">{library.coach}</h3>
                                    <p className="text-muted-foreground mb-3 text-sm">{library.coachTitle}</p>
                                    <p className="text-muted-foreground mb-4 text-sm">
                                        Experienced developer specializing in frontend technologies with a focus on React and modern JavaScript.
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        View Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Libraries */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Related Libraries</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {library.relatedLibraries.map((related) => (
                                    <Link key={related.id} href={`/libraries/${related.id}`} className="group flex gap-3">
                                        {/* <Image
                                        src={related.thumbnail || '/placeholder.svg'}
                                        alt={related.title}
                                        width={160}
                                        height={90}
                                        className="h-12 w-20 flex-shrink-0 rounded-md object-cover"
                                    /> */}
                                        <div className="min-w-0 flex-1">
                                            <h4 className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                                                {related.title}
                                            </h4>
                                            <p className="text-muted-foreground mt-1 text-xs">
                                                {related.coach} • {related.duration}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Tags */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">React</Badge>
                                    <Badge variant="secondary">Hooks</Badge>
                                    <Badge variant="secondary">JavaScript</Badge>
                                    <Badge variant="secondary">Frontend</Badge>
                                    <Badge variant="secondary">Web Development</Badge>
                                    <Badge variant="secondary">State Management</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default LibraryDetails;
