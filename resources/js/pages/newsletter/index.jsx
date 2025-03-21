import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Clock, Eye, FileText, Send, Users } from 'lucide-react';
import { useState } from 'react';

const NewsletterPage = () => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('blank');
    const [selectedRecipients, setSelectedRecipients] = useState('all');
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [scheduleDate, setScheduleDate] = useState(undefined);
    const [isSending, setIsSending] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const breadcrumbs = [
        {
            title: 'Newsletter',
            href: '/admin/newsletter',
        },
    ];

    const courses = [
        { id: 'course1', name: 'Introduction to Web Development' },
        { id: 'course2', name: 'Advanced JavaScript' },
        { id: 'course3', name: 'UX/UI Design Fundamentals' },
        { id: 'course4', name: 'Data Science Basics' },
    ];

    const handleCourseToggle = (courseId) => {
        setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]));
    };

    const handleSendNewsletter = async () => {
        setIsSending(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message and reset form
        alert('Newsletter sent successfully!');
        setIsSending(false);
        setSubject('');
        setContent('');
        setSelectedTemplate('blank');
        setSelectedRecipients('all');
        setSelectedCourses([]);
        setScheduleDate(undefined);
    };

    const handleScheduleNewsletter = async () => {
        setIsSending(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success message and reset form
        alert(`Newsletter scheduled for ${scheduleDate ? format(scheduleDate, 'PPP') : 'today'}!`);
        setIsSending(false);
        setSubject('');
        setContent('');
        setSelectedTemplate('blank');
        setSelectedRecipients('all');
        setSelectedCourses([]);
        setScheduleDate(undefined);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter" />
            <div className="container mx-auto p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Newsletter</h1>
                        <p className="text-muted-foreground">Create and send newsletters to your students</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/admin/news_letter/history">
                            <Button variant="outline">
                                <FileText className="mr-2 h-4 w-4" />
                                View History
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Tabs defaultValue="compose" className="w-full">
                            <TabsContent value="compose" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Compose Newsletter</CardTitle>
                                        <CardDescription>Create a new newsletter to send to your students</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                placeholder="Enter newsletter subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="content">Content</Label>
                                            <Textarea
                                                id="content"
                                                placeholder="Write your newsletter content here..."
                                                className="min-h-[200px]"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            {showPreview ? 'Hide Preview' : 'Preview'}
                                        </Button>
                                        <div className="flex gap-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline">
                                                        <Clock className="mr-2 h-4 w-4" />
                                                        Schedule
                                                    </Button>
                                                </PopoverTrigger>
                                                {/* TODO: trigger input date  */}
                                                <PopoverContent className="w-auto p-4" align="end">
                                                    <div className="space-y-2">
                                                        {/* <Label htmlFor="date">Date</Label> */}
                                                        <Input
                                                            id="date"
                                                            type="date"
                                                            value={scheduleDate}
                                                            onChange={(e) => {
                                                                setScheduleDate(e.target.value);
                                                                console.log(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <Button
                                                        className="mt-4 w-full"
                                                        onClick={handleScheduleNewsletter}
                                                        disabled={isSending || !subject || !content}
                                                    >
                                                        {isSending ? 'Scheduling...' : 'Confirm Schedule'}
                                                    </Button>
                                                </PopoverContent>
                                            </Popover>
                                            <Button onClick={handleSendNewsletter} disabled={isSending || !subject || !content}>
                                                {isSending ? 'Sending...' : 'Send Now'}
                                                <Send className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {showPreview && (
                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle>Email Preview</CardTitle>
                                    <CardDescription>Preview how your email will appear to recipients</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border bg-white p-6">
                                        <div className="mx-auto max-w-2xl">
                                            <div className="mb-6">
                                                <h2 className="mb-1 text-xl font-semibold">{subject || 'No subject'}</h2>
                                                <p className="text-muted-foreground text-sm">From: LearnHub Admin &lt;admin@learnhub.edu&gt;</p>
                                            </div>
                                            <div className="prose prose-sm max-w-none">
                                                <div className="whitespace-pre-line">{content || 'No content'}</div>
                                            </div>
                                            <div className="text-muted-foreground mt-8 border-t pt-4 text-sm">
                                                <p>LearnHub Education Platform</p>
                                                <p>© 2025 LearnHub. All rights reserved.</p>
                                                <p className="mt-2">
                                                    <a href="#" className="text-primary hover:underline">
                                                        Unsubscribe
                                                    </a>{' '}
                                                    |
                                                    <a href="#" className="text-primary ml-2 hover:underline">
                                                        View in browser
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Recipients</CardTitle>
                                <CardDescription>Select who will receive this newsletter</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recipients">Recipient Group</Label>
                                    <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select recipients" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Students</SelectItem>
                                            <SelectItem value="active">Active Students</SelectItem>
                                            <SelectItem value="inactive">Inactive Students</SelectItem>
                                            <SelectItem value="courses">Specific Courses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedRecipients === 'courses' && (
                                    <div className="space-y-2">
                                        <Label>Select Courses</Label>
                                        <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-md border p-4">
                                            {courses.map((course) => (
                                                <div key={course.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={course.id}
                                                        checked={selectedCourses.includes(course.id)}
                                                        onCheckedChange={() => handleCourseToggle(course.id)}
                                                    />
                                                    <Label htmlFor={course.id} className="cursor-pointer">
                                                        {course.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Estimated recipients:</span>
                                        <span className="font-medium">
                                            {selectedRecipients === 'all'
                                                ? '1,245'
                                                : selectedRecipients === 'active'
                                                  ? '987'
                                                  : selectedRecipients === 'inactive'
                                                    ? '258'
                                                    : selectedCourses.length > 0
                                                      ? `${selectedCourses.length * 45}`
                                                      : '0'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" onClick={() => alert('Recipients list exported!')}>
                                    <Users className="mr-2 h-4 w-4" />
                                    Export Recipients List
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default NewsletterPage;
