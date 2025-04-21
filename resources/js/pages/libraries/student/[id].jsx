import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft, Download, File } from 'lucide-react';

const LibraryDetails = () => {
    const { sublibrary } = usePage().props;
    console.log(sublibrary);
    const breadcrumbs = [
        {
            title: sublibrary.title,
            href: `/library/${sublibrary.id}`,
        },
    ];

    const handleSubmitComment = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your API
        // console.log('Submitting comment:', newComment);
        setNewComment('');
        // Then you would add the new comment to the list
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={sublibrary.title} />
            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/library"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Sub Libraries
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold">{sublibrary.title}</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                            <iframe
                                className="h-full w-full"
                                src={`https://www.youtube.com/embed/${sublibrary.link}`}
                                title="Africa - A Journey Through Nature &amp; Tradition | Documentary | Continents of the World Ep. 1"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                            ></iframe>
                        </div>

                        <Tabs defaultValue="documents">
                            <TabsList>
                                <TabsTrigger value="documents">Documents</TabsTrigger>
                                {/* <TabsTrigger value="discussion">Discussion</TabsTrigger> */}
                            </TabsList>

                            <TabsContent value="documents" className="mt-4">
                                    <div className="space-y-3">
                                        {sublibrary.filelibraries.map((doc, index) => (
                                            <div
                                                key={index}
                                                className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors"
                                            >
                                                <div className="flex items-center">
                                                    <div className="bg-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded">
                                                        <File className="text-primary h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{doc.name}</div>
                                                    </div>
                                                </div>
                                                <a download href={`/storage/${doc.path}`} variant="outline" size="sm" className="gap-1">
                                                    <Button>
                                                        <Download className="h-4 w-4" />
                                                        Download
                                                    </Button>
                                                </a>
                                            </div>
                                        ))}
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
                                {/* <Forum comments={library.comments} /> */}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        {/* Coach Info Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Coach</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="mb-3 h-20 w-20">
                                        <AvatarFallback>
                                            {sublibrary.coach.split(' ')[0][0].toUpperCase()}.{sublibrary.coach.split(' ')[0][1].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-lg font-medium">{sublibrary.coach}</h3>
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
