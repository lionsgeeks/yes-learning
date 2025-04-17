'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

export function CreateCourseModal({ open, onOpenChange }) {
    const { data, setData, post, processing, errors } = useForm({
        name: { en: '', fr: '', ar: '' },
        label: { en: '', fr: '', ar: '' },
        description: { en: '', fr: '', ar: '' },
        published: false,
        image: null,
    });
    const [activeTab, setActiveTab] = useState('en');
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        const [field, lang] = e.target.name.split('.');
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
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImagePreview(reader.result); // dyal l preview
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();

        post(route('course.store'), {
            data: data,
            onFinish: () => {
                setData({
                    name: { en: '', fr: '', ar: '' },
                    label: { en: '', fr: '', ar: '' },
                    description: { en: '', fr: '', ar: '' },
                    published: false,
                    image: null,
                });
                onOpenChange(false);
                setImagePreview(null);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-[90%] overflow-y-auto sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>Enter a name, description, tagline, and upload an image to create a new course.</DialogDescription>
                </DialogHeader>
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
                <div className="flex items-center space-x-2 pb-2">
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
                        <div className="mt-4">
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate}>Create Course</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
