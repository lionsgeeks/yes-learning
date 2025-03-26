'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
interface ImageBlockEditorProps {
    content: {
        title: string;
        file: File;
        url: string;
        caption: string;
        altText: string;
    };
    onChange: (content: ImageBlockEditorProps['content']) => void;
}

export function ImageBlockEditor({ content, onChange }: ImageBlockEditorProps) {
    async function generateHashedFileName(element: any) {
        const encoder = new TextEncoder();
        const data = encoder.encode(element.name + Date.now()); // Unique input
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // Convert to hex
        const extension = element.name.split('.').pop();
        return `${hashHex}.${extension}`;
    }
    const handleImage = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        const hashedFileName = await generateHashedFileName(file);
        const renamedFile = new File([file], hashedFileName, { type: file.type });
        const url = `image/chapters/${hashedFileName}`;
        console.log('Generated URL:', url);
        onChange({ ...content, file: renamedFile, url: url });
    };
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">Image Title</Label>
                <Input
                    id="title"
                    value={content.title}
                    onChange={(e) => onChange({ ...content, title: e.target.value })}
                    placeholder="Enter image title"
                />
            </div>

            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6">
                {content.url ? (
                    <div className="w-full">
                        <img
                            src={content.url || '/placeholder.svg'}
                            alt={content.altText || 'Preview'}
                            className="mx-auto max-h-64 rounded-md object-contain"
                        />
                        <Button variant="outline" size="sm" className="mt-4" onClick={() => onChange({ ...content, url: '' })}>
                            Remove Image
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="text-muted-foreground mb-4">
                            <ImageIcon className="h-12 w-12" />
                        </div>
                        <div className="text-muted-foreground flex text-sm">
                            <label
                                htmlFor="image-upload"
                                className="text-primary focus-within:ring-primary relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:outline-none"
                            >
                                <span>Upload an image</span>
                                <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={(e) => handleImage(e)} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-muted-foreground mt-2 text-xs">PNG, JPG, GIF up to 10MB</p>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="caption">Caption (Optional)</Label>
                    <Input
                        id="caption"
                        value={content.caption}
                        onChange={(e) => onChange({ ...content, caption: e.target.value })}
                        placeholder="Enter image caption"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="altText">Alt Text (for accessibility)</Label>
                    <Input
                        id="altText"
                        value={content.altText}
                        onChange={(e) => onChange({ ...content, altText: e.target.value })}
                        placeholder="Describe the image for screen readers"
                    />
                </div>
            </div>
        </div>
    );
}
