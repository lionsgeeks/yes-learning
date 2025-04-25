'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface PDFBlockEditorProps {
    content: {
        title: string;
        url: string;
        description: string;
        file: File;
    };
    onChange: (content: PDFBlockEditorProps['content']) => void;
}

export function FileBlockEditor({ content, onChange }: PDFBlockEditorProps) {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const file = e.target.files ? e.target.files[0] : null;

        if (!file) return;
        // const hashedFileName = await generateHashedFileName(file);
        // const renamedFile = new File([file], hashedFileName, { type: file.type });
        const url = `documents/chapters/${file.name}`;

        onChange({ ...content, file: file, url: url });
    };
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="title">PDF Title</Label>
                <Input
                    id="title"
                    value={content.title}
                    onChange={(e) => onChange({ ...content, title: e.target.value })}
                    placeholder="Enter PDF title"
                />
            </div>
            {content.url ? (
                <div className="bg-muted/30 rounded-md border p-4">
                    <div className="flex items-center">
                        <FileText className="text-primary mr-3 h-8 w-8" />
                        <div>
                            <div className="font-medium">{content.title || 'PDF Document'}</div>
                            <div className="text-muted-foreground text-sm">{content.url.split('/').pop()}</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6">
                    <div className="text-muted-foreground mb-4">
                        <FileText className="h-12 w-12" />
                    </div>
                    <div className="text-muted-foreground flex text-sm">
                        <label
                            htmlFor="pdf-upload"
                            className="text-primary focus-within:ring-primary relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:outline-none"
                        >
                            <span>Upload a PDF</span>
                            <input
                                id="pdf-upload"
                                name="pdf-upload"
                                type="file"
                                accept=".pdf,.xls,.xlsx,.doc,.docx,.ppt,.pptx" 
                                className="sr-only"
                                onChange={(e) => handleFile(e)}
                            />
                        </label>
                        <p className="pl-1">or enter URL</p>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs">PDF up to 50MB</p>
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    value={content.description}
                    onChange={(e) => onChange({ ...content, description: e.target.value })}
                    placeholder="Enter a description of this PDF document"
                    rows={3}
                />
            </div>
        </div>
    );
}
