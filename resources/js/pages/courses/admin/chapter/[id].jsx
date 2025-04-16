import { ContentBlockEditor } from '@/components/courses/content-block-editor';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ChapterPreview = () => {
    const { chapter } = usePage().props;
    const [lang, setLang] = useState('en');
    const { post, data, setData } = useForm({
        content: chapter.content,
    });

    const handleBlocksChange = (updatedBlocks) => {
        const currentLangContent = data.content[lang] || [];
        const newLangContent = [...currentLangContent];
        if (newLangContent.length === 0) {
            newLangContent.push({ blocks: updatedBlocks });
        } else {
            newLangContent[0] = { ...newLangContent[0], blocks: updatedBlocks };
        }
        setData('content', {
            ...data.content,
            [lang]: newLangContent,
        });
    };

    const handleSubmit = () => {
        post(
            route('chapter.update', {
                _method: 'put',
                data: data,
                chapter: chapter.id,
            }),
        );
    };

    return (
        <AppLayout>
            <Head title={`Chapter ${chapter.title.en}`} />
            <div className="flex flex-col gap-3 p-3 lg:p-6">
                <div className="flex- flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild className="mr-2">
                        {/* <Link href="/admin/courses">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                        </Link> */}
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Edit {chapter.title.en}</h1>
                    <DropdownMenu className="">
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8">
                                {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية ' : 'Français'} <ChevronDown className="ml-1 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {['en', 'ar', 'fr'].map((language) => (
                                <DropdownMenuItem key={language} onClick={() => setLang(language)}>
                                    <span className="mr-2">{language}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <ContentBlockEditor blocks={data.content[lang]?.[0]?.blocks || []} onBlocksChange={handleBlocksChange} />
                <Button onClick={handleSubmit}>Save Chapter</Button>
            </div>
        </AppLayout>
    );
};

export default ChapterPreview;
