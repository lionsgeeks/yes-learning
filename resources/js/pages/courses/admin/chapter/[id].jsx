import { ContentBlockEditor } from '@/components/courses/content-block-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ChapterPreview = () => {
    const { chapter, chapters, courses } = usePage().props;
    const [chapterID, setChapterID] = useState('');
    const [lang, setLang] = useState('en');
    const { post, data, setData } = useForm({
        title: {
            en: chapter.title.en,
            ar: chapter.title.ar,
            fr: chapter.title.fr,
        },
        description: {
            en: chapter.description.en,
            ar: chapter.description.ar,
            fr: chapter.description.fr,
        },
        estimated_duration: {
            en: chapter.estimated_duration.en,
            ar: chapter.estimated_duration.ar,
            fr: chapter.estimated_duration.fr,
        },
        content: chapter.content,
    });
    // useEffect(() => {
    //     setData({
    //         title: chapter.title[lang],
    //         description: chapter.description[lang],
    //         estimated_duration: chapter.estimated_duration[lang],
    //         content: chapter.content,
    //     });
    // }, [lang]);
    console.log(chapter);
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
        const selectedChapter = chapters.find((item) => item.id == chapterID);
        if (selectedChapter) {
            setData('content', selectedChapter.content);
        }
    }, [chapterID]);

    const handleSubmit = () => {
        post(
            route('chapter.update', {
                _method: 'put',
                // data: data,
                chapter: chapter.id,
            }),
        );
    };
    const breadcrumbs = [
        {
            title: chapter.title.en,
            href: `/admin/chapter/${chapter.id}/edit`,
        },
    ];
    const Transtext = (param) => {
        return param[lang];
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chapter ${chapter.title.en}`} />
            <div className="flex flex-col gap-3 p-3 lg:p-6">
                <p className="text-lg font-semibold">Copy Contents from Other Chapter: </p>
                <div className="flex flex-col gap-2 md:flex-row lg:items-center">
                    <select name="courseID" id="courseID" className="mt-2 w-[200px] rounded border p-2" onChange={(e) => setCourseID(e.target.value)}>
                        <option value="" disabled defaultValue={''}>
                            Select Course
                        </option>
                        <option value="">All Courses</option>
                        {courses?.map((course, index) => (
                            <option key={index} value={course.id} className="text-black">
                                {course.name.en}
                            </option>
                        ))}
                    </select>

                    <select
                        name="chapterID"
                        id="chapterID"
                        className="mt-2 w-[200px] rounded border p-2"
                        onChange={(e) => setChapterID(e.target.value)}
                    >
                        <option value="" disabled defaultValue={''}>
                            Select Chapter
                        </option>
                        {selectChapters?.map((chap, index) => (
                            <option key={index} value={chap.id} className="text-black">
                                {chap.title.en}
                            </option>
                        ))}
                    </select>

                    <Button
                        type="button"
                        onClick={() => {
                            setData('content', chapter.content);
                        }}
                    >
                        Reset Content
                    </Button>
                </div>
                <div className="flex flex-col justify-between gap-2">
                    <Button variant="ghost" size="sm" asChild className="mr-2">
                        {/* <Link href="/admin/courses">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                        </Link> */}
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Edit {chapter.title.en}</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-alpha h-8 w-fit text-white">
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
                <Card dir={lang === 'ar' ? 'rtl' : 'ltr'} className="col-span-5">
                    <CardHeader>
                        <CardTitle> {Transtext({ en: 'Basic Information', ar: 'المعلومات الأساسية', fr: 'Informations de base' })} </CardTitle>
                        <CardDescription>
                            {Transtext({
                                en: 'Enter the main details about your course',
                                ar: 'أدخل التفاصيل الرئيسية حول دورتك',
                                fr: 'Informations de base',
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">{Transtext({ en: 'Course Title', ar: 'عنوان الدورة', fr: 'titre du cours' })}</Label>
                                <Input
                                    className="mt-4"
                                    id="title"
                                    placeholder={Transtext({
                                        en: 'Enter course title',
                                        ar: '	أدخل عنوان الدورة',
                                        fr: 'Saisissez le titre du cours',
                                    })}
                                    value={data.title[lang]}
                                    onChange={(e) =>
                                        setData('title', {
                                            ...data.title,
                                            [lang]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="duration">
                                    {Transtext({ en: 'Estimated Duration (Minutes)', ar: 'المدة التقديرية', fr: 'Durée estimée' })}{' '}
                                </Label>
                                <Input
                                    className="mt-4"
                                    id="duration"
                                    type="number"
                                    min="1"
                                    placeholder="e.g., 8"
                                    value={data.estimated_duration[lang]}
                                    onChange={(e) =>
                                        setData('estimated_duration', {
                                            ...data.estimated_duration,
                                            [lang]: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">
                                {Transtext({ en: 'Course Description', ar: 'وصف الدورة', fr: 'Description du cours' })}{' '}
                            </Label>
                            <Textarea
                                id="description"
                                placeholder={Transtext({
                                    en: 'Describe what this course covers and its learning objectives',
                                    ar: 'صِف ما تغطيه هذه الدورة وأهدافها التعليمية',
                                    fr: 'Décrivez le contenu de ce cours et ses objectifs d’apprentissage',
                                })}
                                className="mt-4 h-[35vh]"
                                value={data.description[lang]}
                                onChange={(e) =>
                                    setData('description', {
                                        ...data.description,
                                        [lang]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <ContentBlockEditor
                    blocks={data.content[lang]?.[0]?.blocks || []}
                    onBlocksChange={handleBlocksChange}
                    courses={courses}
                    lang={lang}
                />
                <Button onClick={handleSubmit}>Save Chapter</Button>
            </div>
        </AppLayout>
    );
};

export default ChapterPreview;
