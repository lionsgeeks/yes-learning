import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, Eye, Search } from 'lucide-react';

const NewsletterHistoryPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNewsletter, setSelectedNewsletter] = useState(null);
    const breadcrumbs = [
        {
            title: 'Newsletter History',
            href: '/admin/news_letter/history',
        },
    ];
    // Mock data
    const newsletters = [
        {
            id: 'nl-001',
            subject: 'Welcome to the Spring Semester!',
            sentDate: new Date(2025, 2, 15),
            recipients: 1245,
            openRate: 72.4,
            clickRate: 45.2,
            status: 'sent',
        },
        {
            id: 'nl-002',
            subject: 'New Courses Available - Enroll Today!',
            sentDate: new Date(2025, 2, 8),
            recipients: 1230,
            openRate: 68.7,
            clickRate: 39.5,
            status: 'sent',
        },
        {
            id: 'nl-003',
            subject: 'Important: Platform Maintenance Notice',
            sentDate: new Date(2025, 2, 1),
            recipients: 1220,
            openRate: 82.1,
            clickRate: 12.3,
            status: 'sent',
        },
        {
            id: 'nl-004',
            subject: 'Workshop Registration Now Open',
            sentDate: new Date(2025, 1, 22),
            recipients: 985,
            openRate: 65.8,
            clickRate: 51.2,
            status: 'sent',
        },
        {
            id: 'nl-005',
            subject: 'Your February Learning Progress Report',
            sentDate: new Date(2025, 1, 15),
            recipients: 1210,
            openRate: 59.3,
            clickRate: 32.7,
            status: 'sent',
        },
        {
            id: 'nl-006',
            subject: 'Summer Course Preview',
            sentDate: new Date(2025, 3, 5),
            recipients: 1250,
            openRate: 0,
            clickRate: 0,
            status: 'scheduled',
        },
    ];

    const filteredNewsletters = newsletters.filter((newsletter) => newsletter.subject.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleViewNewsletter = (newsletter) => {
        setSelectedNewsletter(newsletter);
    };

    const handleDuplicateNewsletter = (id) => {
        router.push('/admin/newsletter?duplicate=' + id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Newsletter History" />
            <div className="container mx-auto p-3 lg:p-6">
                <div className="mb-6">
                    <Link
                        href="/admin/newsletter"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-colors"
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Newsletter
                    </Link>
                    <h1 className="mt-2 text-2xl font-bold">Newsletter History</h1>
                    <p className="text-muted-foreground mt-1">View and manage your sent and scheduled newsletters</p>
                </div>

                <Card className="w-[93vw] overflow-x-scroll lg:w-full lg:overflow-x-auto">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>All Newsletters</CardTitle>
                                <CardDescription>View performance metrics and manage past newsletters</CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                                <Input
                                    placeholder="Search newsletters..."
                                    className="pl-8"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Date</TableHead>
                                    {/* <TableHead>Recipients</TableHead>
                                    <TableHead>Open Rate</TableHead>
                                    <TableHead>Click Rate</TableHead> */}
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredNewsletters.map((newsletter) => (
                                    <TableRow key={newsletter.id}>
                                        <TableCell className="font-medium">{newsletter.subject}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                                                <p>{format(newsletter.sentDate, 'PPP')}</p>
                                            </div>
                                        </TableCell>
                                        {/* <TableCell>{newsletter.recipients.toLocaleString()}</TableCell>
                                        <TableCell>{newsletter.status === 'scheduled' ? '-' : `${newsletter.openRate}%`}</TableCell>
                                        <TableCell>{newsletter.status === 'scheduled' ? '-' : `${newsletter.clickRate}%`}</TableCell> */}
                                        <TableCell>
                                            <Badge variant={newsletter.status === 'sent' ? 'default' : 'outline'}>
                                                {newsletter.status === 'sent' ? 'Sent' : 'Scheduled'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleViewNewsletter(newsletter)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                {/* <Button variant="ghost" size="icon" onClick={() => handleDuplicateNewsletter(newsletter.id)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button> */}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {filteredNewsletters.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                                            No newsletters found matching your search
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-muted-foreground text-sm">
                                Showing {filteredNewsletters.length} of {newsletters.length} newsletters
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm">Page {currentPage} of 1</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    disabled={true} // Only one page in this example
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={!!selectedNewsletter} onOpenChange={() => setSelectedNewsletter(null)}>
                    <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                        {/* <DialogHeader>
                            <DialogTitle>Newsletter Details</DialogTitle>
                            <DialogDescription>View the complete newsletter and performance metrics</DialogDescription>
                        </DialogHeader> */}

                        {selectedNewsletter && (
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">{selectedNewsletter.subject}</h3>
                                    <p className="text-muted-foreground text-sm">Sent on {format(selectedNewsletter.sentDate, 'MMMM d, yyyy')}</p>
                                </div>
                                <Card>
                                    <CardHeader className="bg-background sticky top-0 z-10">
                                        <CardTitle>Newsletter Content</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="rounded-md border bg-white p-6">
                                            <div className="mx-auto max-w-2xl">
                                                <div className="mb-6">
                                                    <h2 className="mb-1 text-xl font-semibold">{selectedNewsletter.subject}</h2>
                                                    <p className="text-muted-foreground text-sm">From: Yes Learning &lt;admin@yeslearning.com&gt;</p>
                                                </div>
                                                <div className="prose prose-sm max-w-none">
                                                    <p>Dear Students,</p>
                                                    <p>
                                                        {selectedNewsletter.id === 'nl-001' &&
                                                            "Welcome to the Spring Semester! We're excited to have you back for another term of learning and growth."}
                                                        {selectedNewsletter.id === 'nl-002' &&
                                                            "We're excited to announce several new courses that have been added to our catalog. These courses cover cutting-edge topics and are taught by industry experts."}
                                                        {selectedNewsletter.id === 'nl-003' &&
                                                            'Please be advised that our platform will undergo scheduled maintenance this weekend. During this time, some features may be temporarily unavailable.'}
                                                        {selectedNewsletter.id === 'nl-004' &&
                                                            'Registration is now open for our upcoming workshops. These hands-on sessions provide practical skills that complement your course learning.'}
                                                        {selectedNewsletter.id === 'nl-005' &&
                                                            "Your February learning progress report is now available. We've compiled your achievements and areas for improvement to help guide your studies."}
                                                        {selectedNewsletter.id === 'nl-006' &&
                                                            "Get a sneak peek at our upcoming summer courses! We've prepared an exciting lineup of courses to keep your learning journey going through the summer months."}
                                                    </p>
                                                    <p>
                                                        Log in to your account to{' '}
                                                        {selectedNewsletter.id.includes('001')
                                                            ? 'view your course schedule'
                                                            : selectedNewsletter.id.includes('002')
                                                              ? 'browse the new offerings'
                                                              : selectedNewsletter.id.includes('003')
                                                                ? 'plan accordingly'
                                                                : selectedNewsletter.id.includes('004')
                                                                  ? 'secure your spot'
                                                                  : selectedNewsletter.id.includes('005')
                                                                    ? 'review your progress'
                                                                    : 'preview the courses'}
                                                        .
                                                    </p>
                                                    <p>
                                                        Best regards,
                                                        <br />
                                                        LearnHub Team
                                                    </p>
                                                </div>
                                                {/* <div className="text-muted-foreground mt-8 border-t pt-4 text-sm">
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
                                                </div> */}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => handleDuplicateNewsletter(selectedNewsletter.id)}>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Duplicate
                                    </Button>
                                </div> */}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};

export default NewsletterHistoryPage;
