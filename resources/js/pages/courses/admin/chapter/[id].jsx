import { ContentBlockEditor } from '@/components/courses/content-block-editor';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ChapterPreview = () => {
    const { chapter, chapters, courses } = usePage().props;
    const [chapterID, setChapterID] = useState('');
    const [lang, setLang] = useState('en');
    const { post, data, setData } = useForm({
        content: chapter.content,
    });

    const [courseID, setCourseID] = useState('');
    const selectChapters = courseID ? chapters.filter((item) => item.course_id == courseID) : chapters;


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

    useEffect(() => {
        const selectedChapter = chapters.find((item) => item.id == chapterID)
        if (selectedChapter) {
            setData('content', selectedChapter.content);
        }
    }, [chapterID])

    const handleSubmit = () => {
        post(
            route('chapter.update', {
                _method: 'put',
                // data: data,
                chapter: chapter.id,
            }),
        );
    };
    const breadcrumbs = [{
        title: chapter.title.en,
        href: `/admin/chapter/${chapter.id}/edit`
    }]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chapter ${chapter.title.en}`} />
            <div className="flex flex-col gap-3 p-3 lg:p-6">
                <p className='font-semibold text-lg'>Copy Contents from Other Chapter: </p>
                <div className="flex items-center gap-2">
                    <select name="courseID" id="courseID" className='p-2 border rounded mt-2 w-[200px]' onChange={(e) => setCourseID(e.target.value)}>
                        <option value="" disabled defaultValue={""}>Select Course</option>
                        <option value="" >All Courses</option>
                        {
                            courses?.map((course, index) => (
                                <option key={index} value={course.id} className='text-black'>{course.name.en}</option>
                            ))
                        }
                    </select>

                    <select name="chapterID" id="chapterID" className='p-2 border rounded mt-2 w-[200px]' onChange={(e) => setChapterID(e.target.value)}>
                        <option value="" disabled defaultValue={""}>Select Chapter</option>
                        {
                            selectChapters?.map((chap, index) => (
                                <option key={index} value={chap.id} className='text-black'>{chap.title.en}</option>
                            ))
                        }
                    </select>

                    <Button
                        type="button"
                        onClick={() => { setData('content', chapter.content) }}
                    >
                        Reset Content
                    </Button>
                </div>
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
