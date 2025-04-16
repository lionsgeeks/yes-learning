import { CoursePreview } from '@/components/courses/course-preview';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ChevronDown, Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChapterContent from '../../../../components/courses/create/create-chapter-content';
import ChapterDetails from '../../../../components/courses/create/create-chapter-details';

const AdminCoursesCreate = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [activeLangTab, setActiveLangTab] = useState('en');
    const [subcourses, setSubcourses] = useState({
        en: [{ id: 'subcourse-1', title: 'Chapter 1', description: '', block: [] }],
        fr: [{ id: 'subcourse-1', title: 'Chapter 1', description: '', block: [] }],
        ar: [{ id: 'subcourse-1', title: 'Chapter 1', description: '', block: [] }],
    });

    const [activeSubcourse, setActiveSubcourse] = useState('subcourse-1');
    const courseId = new URLSearchParams(window.location.search).get('course');
    console.log('course id : ', courseId);
    const { data, setData, post, processing } = useForm({
        en: {
            title: '',
            description: '',
            estimated_duration: '',
            published: false,
            enable_certificate: false,
            enable_discussion: false,
            content: [],
            quizTitle: '',
            quizDescription: '',
            quizTime: '',
            quizPublish: 0,
            questions: [],
        },
        fr: {
            title: '',
            description: '',
            estimated_duration: '',
            published: false,
            enable_certificate: false,
            enable_discussion: false,
            content: [],
            quizTitle: '',
            quizDescription: '',
            quizTime: '',
            quizPublish: 0,
            questions: [],
        },
        ar: {
            title: '',
            description: '',
            estimated_duration: '',
            published: false,
            enable_certificate: false,
            enable_discussion: false,
            content: [],
            quizTitle: '',
            quizDescription: '',
            quizTime: '',
            quizPublish: 0,
            questions: [],
        },
        course_id: courseId,
    });
    useEffect(() => {
        setData((prev) => ({
            ...prev,
            en: {
                ...prev.en,
                content: subcourses.en,
            },
            fr: {
                ...prev.fr,
                content: subcourses.fr,
            },
            ar: {
                ...prev.ar,
                content: subcourses.ar,
            },
        }));
    }, [subcourses]);
    const Transtext = (param) => {
        return param[activeLangTab];
    };
    useEffect(() => {
        setActiveTab('details');
    }, [activeLangTab]);
    function areAllLanguagesValid(data) {
        const languages = ['en', 'fr', 'ar'];

        return languages.every((lang) => {
            const langData = data[lang];
            return (
                langData.title.trim() !== '' &&
                langData.description.trim() !== '' &&
                langData.estimated_duration.trim() !== '' &&
                (langData.content.length > 0 || (langData.quizTitle.trim() !== '' && langData.questions.length > 0))
            );
        });
    }

    const handleSubmit = (e) => {
        console.log('all feilds are fill : ', areAllLanguagesValid);
        e.preventDefault();
        if (areAllLanguagesValid(data)) {
            console.log('Submitting:', data);
            post(route('chapter.store'), {
                data: data,
                onFinish: () => {
                    setData({
                        en: {
                            title: '',
                            description: '',
                            estimated_duration: '',
                            published: false,
                            enable_certificate: false,
                            enable_discussion: false,
                            content: [],
                        },
                        fr: {
                            title: '',
                            description: '',
                            estimated_duration: '',
                            published: false,
                            enable_certificate: false,
                            enable_discussion: false,
                            content: [],
                        },
                        ar: {
                            title: '',
                            description: '',
                            estimated_duration: '',
                            published: false,
                            enable_certificate: false,
                            enable_discussion: false,
                            content: [],
                        },
                        course_id: courseId,
                    });
                },
            });
        } else {
            alert('All inputs should be filled');
        }
    };

    const addSubcourse = (lang) => {
        console.log('add course');
        const newId = `subcourse-${subcourses[lang].length + 1}`;
        setSubcourses((prev) => ({
            ...prev,
            [lang]: [
                ...prev[lang],
                {
                    id: newId,
                    title: `Chapter ${prev[lang].length + 1}`,
                    description: '',
                    blocks: [],
                },
            ],
        }));
        setActiveSubcourse(newId);
    };

    const updateSubcourse = (id, data, lang) => {
        console.log('update course : ', lang, id, data);
        setSubcourses((prev) => ({
            ...prev,
            [lang]: prev[lang].map((subcourse) => (subcourse.id === id ? { ...subcourse, ...data } : subcourse)),
        }));
    };
    const deleteSubcourse = (id, lang) => {
        setSubcourses((prev) => ({
            ...prev,
            [lang]: prev[lang].filter((subcourse) => subcourse.id !== id),
        }));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(subcourses);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSubcourses(items);
    };

    return (
        <AppLayout>
            <Head title={'Chapter'} />
            <div className="space-y-6 p-3 lg:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-start">
                            <Button variant="ghost" size="sm" asChild className="mr-2">
                                <Link href="/admin/courses">
                                    <ArrowLeft className="mr-1 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                        </div>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Course
                                </>
                            )}
                        </Button>
                    </div>
                    <div dir={activeLangTab === 'ar' ? 'rtl' : 'ltr' } className={`bg-alpha mb-6 flex items-center justify-between rounded-lg p-3 text-white`}>
                        <div className="flex items-center">
                            <span className="font-medium">
                                {Transtext({ en: 'Editing english Language Content', ar: 'تعديل محتوى اللغة العربية ', fr: 'Modification du contenu en langue français' })}
                                {'  '}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8">
                                    Switch <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {['en', 'ar', 'fr'].map((lang) => (
                                    <DropdownMenuItem key={lang} onClick={() => setActiveLangTab(lang)}>
                                        <span className="mr-2">{lang}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Tabs value={activeLangTab} onValueChange={setActiveLangTab} className="space-y-4">
                        <TabsContent value="en" className="grid-cols- grid gap-4 space-y-4">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">Course Details</TabsTrigger>
                                    <TabsTrigger value="content">Content & Modules</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    {/* <TabsTrigger value="quizz">Quizz</TabsTrigger> */}
                                </TabsList>

                                <TabsContent value="details" className="grid grid-cols-5 gap-4 space-y-4">
                                    <ChapterDetails data={data['en']} setData={setData} setActiveTab={setActiveTab} lang="en" />
                                </TabsContent>

                                <TabsContent value="content" className="space-y-4">
                                    <ChapterContent
                                        data={data['en']}
                                        setData={setData}
                                        deleteSubcourse={deleteSubcourse}
                                        updateSubcourse={updateSubcourse}
                                        onDragEnd={onDragEnd}
                                        addSubcourse={addSubcourse}
                                        subcourses={subcourses}
                                        activeSubcourse={activeSubcourse}
                                        setActiveSubcourse={setActiveSubcourse}
                                        setSubcourses={setSubcourses}
                                        lang="en"
                                    />
                                </TabsContent>

                                <TabsContent value="preview">
                                    <CoursePreview
                                        course={{
                                            title: 'Course Title',
                                            description: 'Course description will appear here.',
                                            subcourses: subcourses.en,
                                        }}
                                        lang="en"
                                    />
                                    <div className="mt-6 flex justify-between">
                                        <Button variant="outline" onClick={() => setActiveTab('content')}>
                                            Back to Content
                                        </Button>
                                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save Course
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </TabsContent>
                        <TabsContent value="fr" className="grid-cols- grid gap-4 space-y-4">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="details">Course Details</TabsTrigger>
                                    <TabsTrigger value="content">Content & Modules</TabsTrigger>
                                    <TabsTrigger value="preview">Preview</TabsTrigger>
                                    {/* <TabsTrigger value="quizz">Quizz</TabsTrigger> */}
                                </TabsList>

                                <TabsContent value="details" className="grid grid-cols-5 gap-4 space-y-4">
                                    <ChapterDetails data={data['fr']} setData={setData} setActiveTab={setActiveTab} lang="fr" />
                                </TabsContent>

                                <TabsContent value="content" className="space-y-4">
                                    <ChapterContent
                                        data={data['fr']}
                                        setData={setData}
                                        deleteSubcourse={deleteSubcourse}
                                        updateSubcourse={updateSubcourse}
                                        onDragEnd={onDragEnd}
                                        addSubcourse={addSubcourse}
                                        subcourses={subcourses}
                                        activeSubcourse={activeSubcourse}
                                        setActiveSubcourse={setActiveSubcourse}
                                        setSubcourses={setSubcourses}
                                        lang="fr"
                                    />
                                </TabsContent>

                                <TabsContent value="preview">
                                    <CoursePreview
                                        course={{
                                            title: 'Course Title',
                                            description: 'Course description will appear here.',
                                            subcourses: subcourses.fr,
                                        }}
                                        lang="fr"
                                    />
                                    <div className="mt-6 flex justify-between">
                                        <Button variant="outline" onClick={() => setActiveTab('content')}>
                                            Back to Content
                                        </Button>
                                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save Course
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </TabsContent>
                        <TabsContent value="ar" dir="rtl" className="grid-cols- grid gap-4 space-y-4">
                            <div dir="rtl">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="details">Course Details</TabsTrigger>
                                        <TabsTrigger value="content">Content & Modules</TabsTrigger>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                        {/* <TabsTrigger value="quizz">Quizz</TabsTrigger> */}
                                    </TabsList>

                                    <TabsContent value="details" className="grid grid-cols-5 gap-4 space-y-4">
                                        <ChapterDetails data={data['ar']} setData={setData} setActiveTab={setActiveTab} lang="ar" />
                                    </TabsContent>

                                    <TabsContent value="content" className="space-y-4">
                                        <ChapterContent
                                            data={data}
                                            setData={setData}
                                            deleteSubcourse={deleteSubcourse}
                                            updateSubcourse={updateSubcourse}
                                            onDragEnd={onDragEnd}
                                            addSubcourse={addSubcourse}
                                            subcourses={subcourses}
                                            activeSubcourse={activeSubcourse}
                                            setActiveSubcourse={setActiveSubcourse}
                                            setSubcourses={setSubcourses}
                                            lang="ar"
                                        />
                                    </TabsContent>

                                    <TabsContent value="preview">
                                        <CoursePreview
                                            course={{
                                                title: 'Course Title',
                                                description: 'Course description will appear here.',
                                                subcourses: subcourses.ar,
                                            }}
                                            lang="ar"
                                        />
                                        <div className="mt-6 flex justify-between">
                                            <Button variant="outline" onClick={() => setActiveTab('content')}>
                                                Back to Content
                                            </Button>
                                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="mr-2 h-4 w-4" />
                                                        Save Course
                                                    </>
                                                )}
                                            </Button>{' '}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminCoursesCreate;
