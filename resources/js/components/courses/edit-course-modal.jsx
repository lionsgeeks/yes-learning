import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { ImageIcon, X } from 'lucide-react';

export function EditCourseModal({ open, onOpenChange, course }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [imagePreview, setImagePreview] = useState(null);

    // console.log(course);
    const { data, setData, post, progress } = useForm({
        id: course.id,
        name: {
            en: course.name.en,
            fr: course.name.fr,
            ar: course.name.ar,
        },
        description: {
            en: course.description.en,
            ar: course.description.ar,
            fr: course.description.fr,
        },
        label: {
            en: course.label.en,
            fr: course.label.fr,
            ar: course.label.ar,
        },
        published: course.published,
        image: course.image,
    });
    useEffect(() => {
        setImagePreview(data.image);
    }, [data.image]);

    const handleSubmit = async (e) => {
        console.log(data);
        e.preventDefault();
        setIsSubmitting(true);
        post(
            route('course.update', {
                _method: 'put',
                data: data,
                course: course.id,
            }),
        );
        setIsSubmitting(false);
        onOpenChange(false);
    };
    const handleInputChange = (e) => {
        const [field, lang] = e.target.name.split('.');
        // console.log(field, lang);
        const value = e.target.value;
        if (field == 'published') {
            setData('published', !data.published);
        } else {
            setData((prev) => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [lang]: value,
                },
            }));
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file); // This is correct for file uploads with Inertia
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Update the reset function to also clear the data.image
    const handleRemoveImage = () => {
        setImagePreview(null);
        setData('image', null); // Explicitly set to null
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <div className="p-5">
                <DialogContent className="h-[90%] overflow-y-auto sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>Update your course details. Click save when you're done.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 py-4" encType="multipart/form-data">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="en">English</TabsTrigger>
                                <TabsTrigger value="fr">Français</TabsTrigger>
                                <TabsTrigger value="ar">العربية </TabsTrigger>
                            </TabsList>
                            <TabsContent value="en" className="grid-cols- grid gap-4 space-y-4">
                                <div className="grid gap-6 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name.en">Course Name</Label>
                                        <Input
                                            id="name.en"
                                            name="name.en"
                                            placeholder="Enter Course name"
                                            value={data.name.en}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="label.en">Label</Label>
                                        <Input
                                            id="label.en"
                                            name="label.en"
                                            placeholder="Enter Course Label"
                                            value={data.label.en}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-">
                                        <Label htmlFor="description.en">Description</Label>
                                        <Textarea
                                            id="description.en"
                                            name="description.en"
                                            placeholder="Enter Course description"
                                            value={data.description.en}
                                            onChange={handleInputChange}
                                            className="mt-3 w-full rounded-lg border p-3"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="fr" className="grid-cols- grid gap-4 space-y-4">
                                <div className="grid gap-6 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name.fr">Nom du cours</Label>
                                        <Input
                                            id="name.fr"
                                            name="name.fr"
                                            placeholder="Saisir le nom du cours"
                                            value={data.name.fr}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="label.fr">Libellé</Label>
                                        <Input
                                            id="label.fr"
                                            name="label.fr"
                                            placeholder="Saisir le libellé du cours"
                                            value={data.label.fr}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-">
                                        <Label htmlFor="description.fr">Description</Label>
                                        <Textarea
                                            id="description.fr"
                                            name="description.fr"
                                            placeholder="Saisir la description du cours"
                                            value={data.description.fr}
                                            onChange={handleInputChange}
                                            className="mt-3 w-full rounded-lg border p-3"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="ar" className="grid-cols- grid gap-4 space-y-4">
                                <div dir="rtl" className="grid gap-6 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name.ar">اسم الدورة</Label>
                                        <Input
                                            id="name.ar"
                                            name="name.ar"
                                            placeholder="أدخل اسم الدورة"
                                            value={data.name.ar}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="label.ar">التصنيف</Label>
                                        <Input
                                            id="label.ar"
                                            name="label.ar"
                                            placeholder="أدخل تصنيف الدورة"
                                            value={data.label.ar}
                                            onChange={handleInputChange}
                                            className="mt-3"
                                        />
                                    </div>

                                    <div className="space-y-">
                                        <Label htmlFor="description.ar">الوصف</Label>
                                        <Textarea
                                            id="description.ar"
                                            name="description.ar"
                                            placeholder="أدخل وصف الدورة"
                                            value={data.description.ar}
                                            onChange={handleInputChange}
                                            className="mt-3 w-full rounded-lg border p-3"
                                        />
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                                checked={data.published}
                                onChange={handleInputChange}
                            />
                            <Label htmlFor="auto-award">Publish this course</Label>
                        </div>
                        <div className="border-muted space-y- relative flex flex-col items-center gap-y-2 rounded-lg border-2 border-dashed p-3">
                            {imagePreview ? (
                                <div className="reletive mt-4">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                        onClick={handleRemoveImage}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <img src={imagePreview} alt="Course cover preview" className="h-auto w-full rounded-md object-cover" />
                                </div>
                            ) : (
                                <>
                                    <input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="absolute top-0 h-full w-full opacity-0"
                                        onChange={handleImageChange}
                                    />
                                    <Label htmlFor="image-upload">Course Image</Label>
                                    <div className="text-muted-foreground mb-4">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                    <div className="text-muted-foreground flex text-sm">
                                        <label
                                            htmlFor="image-upload"
                                            className="text-primary focus-within:ring-primary relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:outline-none"
                                        >
                                            <span>Upload an image</span>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-muted-foreground mt-2 text-xs">PNG, JPG, GIF up to 3MB</p>
                                </>
                            )}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </div>
        </Dialog>
    );
}
