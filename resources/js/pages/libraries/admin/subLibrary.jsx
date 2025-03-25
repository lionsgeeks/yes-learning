import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Switch } from "@/components/ui/switch"
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, FileUp, Plus, X } from 'lucide-react';
import { useState } from 'react';

const CreateSubLibrary = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeId, setYoutubeId] = useState('');
    const [moduleId, setModuleId] = useState('');
    const [isSubLibrary, setIsSubLibrary] = useState(false);
    const [parentLibraryId, setParentLibraryId] = useState('');
    const breadcrumbs = [
        {
            title: 'Create Sub Library',
            href: `/admin/create/library/1/subLibrary`,
        },
    ];
    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleAddDocument = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newDocs = Array.from(e.target.files).map((file) => ({
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            }));
            setUploadedDocuments([...uploadedDocuments, ...newDocs]);
        }
    };

    const handleRemoveDocument = (docName) => {
        setUploadedDocuments(uploadedDocuments.filter((doc) => doc.name !== docName));
    };

    const handleYoutubeUrlChange = (e) => {
        const url = e.target.value;
        setYoutubeUrl(url);

        // Extract YouTube ID from URL
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            setYoutubeId(match[2]);
        } else {
            setYoutubeId('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Redirect to libraries page after successful creation
            router.push('/admin/libraries');
        }, 1500);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Create Library'/>
            <div className="p-3 lg:p-6">
                <div className="mb-6">
                    <Link
                        href="/admin/libraries"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Libraries
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold">Create New Sub Library</h1>
                    <p className="text-muted-foreground mt-1">Add a new sub-library with YouTube video content</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Library Details</CardTitle>
                                    <CardDescription>Provide information about this library</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Library Title</Label>
                                        <Input id="title" placeholder="Enter a descriptive title" required />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Select required>
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="frontend">Frontend</SelectItem>
                                                    <SelectItem value="backend">Backend</SelectItem>
                                                    <SelectItem value="design">Design</SelectItem>
                                                    <SelectItem value="database">Database</SelectItem>
                                                    <SelectItem value="devops">DevOps</SelectItem>
                                                    <SelectItem value="mobile">Mobile Development</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="module">Associated Module</Label>
                                            <Select value={moduleId} onValueChange={setModuleId} required>
                                                <SelectTrigger id="module">
                                                    <SelectValue placeholder="Select module" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Web Development Fundamentals</SelectItem>
                                                    <SelectItem value="2">Advanced CSS Techniques</SelectItem>
                                                    <SelectItem value="3">Node.js for Beginners</SelectItem>
                                                    <SelectItem value="4">Database Design Masterclass</SelectItem>
                                                    <SelectItem value="5">UI/UX Design Principles</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="isSubLibrary">Is this a sub-library?</Label>
                                            <Switch id="isSubLibrary" checked={isSubLibrary} onCheckedChange={setIsSubLibrary} />
                                        </div>
                                        <p className="text-muted-foreground text-xs">
                                            Sub-libraries are nested under a parent library for more detailed content
                                        </p>
                                    </div>

                                    {isSubLibrary && (
                                        <div className="space-y-2">
                                            <Label htmlFor="parentLibrary">Parent Library</Label>
                                            <Select value={parentLibraryId} onValueChange={setParentLibraryId} required={isSubLibrary}>
                                                <SelectTrigger id="parentLibrary">
                                                    <SelectValue placeholder="Select parent library" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">React Hooks Fundamentals</SelectItem>
                                                    <SelectItem value="2">Advanced CSS Grid Techniques</SelectItem>
                                                    <SelectItem value="3">Node.js Performance Optimization</SelectItem>
                                                    <SelectItem value="4">Database Design Principles</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <textarea
                                            id="description"
                                            className="min-h-[100px] w-full rounded-md border p-3"
                                            placeholder="Describe what students will learn in this library"
                                        ></textarea>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="tags"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                placeholder="Add tags to help students find this content"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddTag();
                                                    }
                                                }}
                                            />
                                            <Button type="button" onClick={handleAddTag} variant="outline">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {tags.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="gap-1">
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTag(tag)}
                                                            className="hover:bg-secondary/20 ml-1 rounded-full"
                                                        >
                                                            <X className="h-3 w-3" />
                                                            <span className="sr-only">Remove {tag} tag</span>
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>YouTube Video</CardTitle>
                                    <CardDescription>Add a YouTube video for this library</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="youtubeUrl">YouTube URL</Label>
                                        <Input
                                            id="youtubeUrl"
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            value={youtubeUrl}
                                            onChange={handleYoutubeUrlChange}
                                            required
                                        />
                                        <p className="text-muted-foreground text-xs">Paste the full YouTube URL of the video you want to embed</p>
                                    </div>

                                    {youtubeId && (
                                        <div className="space-y-2">
                                            <Label>Preview</Label>
                                            <div className="bg-muted aspect-video overflow-hidden rounded-md">
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${youtubeId}`}
                                                    title="YouTube video player"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="h-full w-full"
                                                ></iframe>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="videoStartTime">Start Time (Optional)</Label>
                                        <div className="flex gap-2">
                                            <Input id="videoStartMinutes" type="number" min="0" placeholder="Minutes" className="w-24" />
                                            <Input id="videoStartSeconds" type="number" min="0" max="59" placeholder="Seconds" className="w-24" />
                                        </div>
                                        <p className="text-muted-foreground text-xs">Specify a start time for the video (e.g., to skip intros)</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Tabs defaultValue="documents">
                                <TabsList>
                                    <TabsTrigger value="documents">Documents</TabsTrigger>
                                    <TabsTrigger value="learning">Learning Objectives</TabsTrigger>
                                </TabsList>

                                <TabsContent value="documents" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Upload Documents</CardTitle>
                                            <CardDescription>Share resources related to this library</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="rounded-lg border-2 border-dashed p-8 text-center">
                                                <FileUp className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                                                <h3 className="mb-2 font-medium">Drag and drop your documents</h3>
                                                <p className="text-muted-foreground mb-4 text-sm">
                                                    Supports PDF, DOCX, PPTX, and ZIP files up to 100MB each
                                                </p>
                                                <Button variant="outline" className="relative">
                                                    <input
                                                        type="file"
                                                        className="absolute inset-0 cursor-pointer opacity-0"
                                                        accept=".pdf,.docx,.pptx,.zip"
                                                        multiple
                                                        onChange={handleAddDocument}
                                                    />
                                                    Select Documents
                                                </Button>
                                            </div>

                                            {uploadedDocuments.length > 0 && (
                                                <div className="mt-6">
                                                    <h4 className="mb-3 font-medium">Uploaded Documents</h4>
                                                    <div className="space-y-2">
                                                        {uploadedDocuments.map((doc, index) => (
                                                            <div key={index} className="flex items-center justify-between rounded-md border p-3">
                                                                <div className="flex items-center">
                                                                    <FileUp className="text-muted-foreground mr-2 h-4 w-4" />
                                                                    <div>
                                                                        <p className="text-sm font-medium">{doc.name}</p>
                                                                        <p className="text-muted-foreground text-xs">{doc.size}</p>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleRemoveDocument(doc.name)}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                    <span className="sr-only">Remove {doc.name}</span>
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="learning" className="mt-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Learning Objectives</CardTitle>
                                            <CardDescription>Define what students will learn</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="objectives">Learning Objectives</Label>
                                                    <textarea
                                                        id="objectives"
                                                        className="min-h-[100px] w-full rounded-md border p-3"
                                                        placeholder="List the key learning objectives (one per line)"
                                                    ></textarea>
                                                    <p className="text-muted-foreground text-xs">
                                                        These will be displayed as bullet points on the library page
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="prerequisites">Prerequisites</Label>

                                                    <textarea
                                                        id="prerequisites"
                                                        className="min-h-[100px] w-full rounded-md border p-3"
                                                        placeholder="List any prerequisites for this content"
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Publishing Options</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select defaultValue="draft">
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label htmlFor="visibility">Visibility</Label>
                                        <Select defaultValue="public">
                                            <SelectTrigger id="visibility">
                                                <SelectValue placeholder="Select visibility" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="public">Public</SelectItem>
                                                <SelectItem value="private">Private</SelectItem>
                                                <SelectItem value="unlisted">Unlisted</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-muted-foreground text-xs">Public libraries are visible to all students</p>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label htmlFor="instructor">Instructor</Label>
                                        <Select defaultValue="current">
                                            <SelectTrigger id="instructor">
                                                <SelectValue placeholder="Select instructor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="current">Sarah Miller (You)</SelectItem>
                                                <SelectItem value="michael">Michael Chen</SelectItem>
                                                <SelectItem value="david">David Wilson</SelectItem>
                                                <SelectItem value="emma">Emma Rodriguez</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label htmlFor="publish-date">Publish Date</Label>
                                        <Input id="publish-date" type="date" />
                                        <p className="text-muted-foreground text-xs">Leave blank to publish immediately</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create Library'}
                                    </Button>
                                    <Button variant="outline" className="w-full" type="button" asChild>
                                        <Link href="/admin/libraries">Cancel</Link>
                                    </Button>
                                </CardFooter>
                            </Card>

                            {/* <Card>
                                <CardHeader>
                                    <CardTitle>YouTube Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="autoplay">Autoplay</Label>
                                            <p className="text-muted-foreground text-xs">Automatically play video when page loads</p>
                                        </div>
                                        <Switch id="autoplay" />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showControls">Show Controls</Label>
                                            <p className="text-muted-foreground text-xs">Display YouTube player controls</p>
                                        </div>
                                        <Switch id="showControls" defaultChecked />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="showRelated">Show Related Videos</Label>
                                            <p className="text-muted-foreground text-xs">Show related videos when the video ends</p>
                                        </div>
                                        <Switch id="showRelated" />
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="enableCaptions">Enable Captions</Label>
                                            <p className="text-muted-foreground text-xs">Show closed captions if available</p>
                                        </div>
                                        <Switch id="enableCaptions" defaultChecked />
                                    </div>
                                </CardContent>
                            </Card> */}
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default CreateSubLibrary;
