import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Upload } from 'lucide-react';
import { useState } from 'react';

const CreateLibrary = () => {
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const { post, data, setData, progress } = useForm({
        title: '',
        image: null,
    });

    const handleThumbnailUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setThumbnailPreview(event.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        post(route('library.store'), {
            onFinish: () =>
                setData({
                    title: '',
                    image: null,
                }),
        });
    };

    const breadcrumbs = [
        {
            title: 'Create Library',
            href: '/admin/create/library',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-3 lg:p-6">
                <div className="mb-6">
                    <Link
                        href="/admin/libraries"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Libraries
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold">Create Main Library</h1>
                    <p className="text-muted-foreground mt-1">Create a new main library to organize your content</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Main Library Details</CardTitle>
                                    <CardDescription>Provide information about this library category</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Library Title</Label>
                                        <Input
                                            id="title"
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter a descriptive title"
                                            required
                                        />
                                    </div>
                                    {/* <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select required>
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="development">Development</SelectItem>
                                                <SelectItem value="design">Design</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="data-science">Data Science</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                    {/* <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe what this library category contains"
                                            className="min-h-[120px]"
                                            required
                                        />
                                    </div> */}
                                    {/* <div className="space-y-2">
                                        <Label htmlFor="tags">Tags</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="tags"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                placeholder="Add tags to help with search and categorization"
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
                                    </div> */}
                                    <Label>Thumbnail Image</Label>
                                    <div className="flex flex-col items-center gap-6 sm:flex-row">
                                        {thumbnailPreview ? (
                                            <div className="relative h-40 w-40 overflow-hidden rounded-md border">
                                                <img src={thumbnailPreview} alt="Thumbnail preview" className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="flex-1 space-y-4">
                                                <div className="rounded-lg border-2 border-dashed p-6 text-center">
                                                    <Upload className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                                                    <h3 className="mb-2 font-medium">Drag and drop your image</h3>
                                                    <p className="text-muted-foreground mb-4 text-sm">
                                                        Supports JPG, PNG, and WebP formats up to 5MB
                                                    </p>
                                                    <Button variant="outline" className="relative">
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 cursor-pointer opacity-0"
                                                            accept="image/jpeg,image/png,image/webp"
                                                            onChange={handleThumbnailUpload}
                                                        />
                                                        Select Image
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card>
                                {/* <CardHeader>
                                    <CardTitle>Publishing Options</CardTitle>
                                </CardHeader> */}
                                <CardContent className="space-y-4">
                                    {/* <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select defaultValue="draft">
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div> */}
                                </CardContent>
                                <CardFooter className="flex flex-col gap-2">
                                    <Button className="w-full" type="submit" disabled={progress}>
                                        {progress ? 'Creating...' : 'Create Library'}
                                    </Button>
                                    <Button variant="outline" className="w-full" type="button" asChild>
                                        <Link href="/admin/libraries">Cancel</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};
export default CreateLibrary;
