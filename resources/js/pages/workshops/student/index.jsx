'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, useForm } from '@inertiajs/react';
import { addHours, format, isAfter, isBefore } from 'date-fns';
import { Calendar, Clock, ExternalLink, Search, Video } from 'lucide-react';

// Mock data for workshops

export default function WorkshopsPage({ workshops, chapters }) {
    console.log(chapters);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
    const [workshopToRegister, setWorkshopToRegister] = useState(null);

    const { data, setDate, put, proccessing, erro } = useForm({
        workshop: '',
    });
    const filteredWorkshops = workshops.filter((workshop) => {
        // Filter by search query
        const matchesSearch = workshop.name || workshop.instructor || workshop.description;

        // Filter by language
        const matchesLanguage = selectedLanguage === 'all' || workshop.language === selectedLanguage;

        // Filter by course
        const matchesCourse = selectedCourse === 'all';

        return matchesSearch && matchesLanguage && matchesCourse;
    });

    const getStatusBadge = (date) => {
        const now = new Date();
        if (isBefore(date, now)) {
            return (
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    Completed
                </Badge>
            );
        } else if (isAfter(date, now) && isBefore(date, addHours(now, 24))) {
            return (
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    Upcoming (24h)
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                    Scheduled
                </Badge>
            );
        }
    };

    const handleRegisterClick = (workshop) => {
        setWorkshopToRegister(workshop);
        setRegistrationDialogOpen(true);
    };

    const handleRegisterConfirm = (id) => {
        // In a real app, this would send a registration request to the server
        setRegistrationDialogOpen(false);
        setWorkshopToRegister(null);
        let formdata = new FormData();
        formdata.append('workshop', id);
        put(route('subWorkshop.enroll', id), {
            onSuccess: () => {
                alert('good');
            },
            onError: (e) => {},
        });
        // Show success message or update UI
    };

    return (
        <AppLayout>
            <Head title="Workshops" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Workshops</h1>
                    <p className="text-muted-foreground mt-1">Join live interactive workshops with our instructors</p>
                </div>

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap gap-2">
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Languages</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All chapters</SelectItem>
                                {chapters.map((chapter) => (
                                    <SelectItem key={chapter.id} value={chapter.title}>
                                        {chapter.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search workshops..."
                            className="w-full pl-9 sm:w-[260px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="registered">Registered</TabsTrigger>
                        <TabsTrigger value="past">Past Workshops</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-6">
                        {filteredWorkshops.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredWorkshops.map((workshop) => (
                                    <Card key={workshop.id} className="flex flex-col overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-end">{getStatusBadge(workshop.date)}</div>
                                            <CardTitle className="mt-2">{workshop.name}</CardTitle>
                                            <CardDescription>{workshop.chapter.title}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <div className="space-y-4">
                                                <div className="flex items-center text-sm">
                                                    <Calendar className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span>{format(workshop.date, 'EEEE, MMMM d, yyyy')}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span>
                                                        {format(workshop.date, 'h:mm a')} • {workshop.duration} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Video className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span>Instructor: {workshop.instructor}</span>
                                                </div>
                                                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{workshop.description}</p>
                                                <div className="text-muted-foreground mt-2 text-xs">
                                                    <span className="font-medium">Prerequisites:</span> {workshop.prerequisite}
                                                </div>
                                                <div className="mt-2 flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {workshop.enrolledCount}  enrolled
                                                    </span>
                                                   
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2 pt-0">
                                            {/* {console.log(JSON.parse(workshop.meetLink).meetlinkar)} */}
                                            {!workshop.enrolled && workshop.requireRegistration ? (
                                                <>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() => handleRegisterClick(workshop)}
                                                        // disabled={workshop.enrolled >= workshop.capacity}
                                                    >
                                                        Register
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="outline" className="flex-1" asChild>
                                                        <a href={JSON.parse(workshop.meetLink).meetlinken} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            Join
                                                        </a>
                                                    </Button>
                                                </>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-muted/20 rounded-lg border py-12 text-center">
                                <Video className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                <h3 className="text-lg font-medium">No workshops found</h3>
                                <p className="text-muted-foreground mt-1">Try adjusting your filters or check back later for new workshops</p>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="registered" className="mt-6">
                        <div className="bg-muted/20 rounded-lg border py-12 text-center">
                            <Video className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="text-lg font-medium">No registered workshops</h3>
                            <p className="text-muted-foreground mt-1">You haven't registered for any workshops yet</p>
                            <Button className="mt-4" onClick={() => document.querySelector('[data-value="upcoming"]')?.click()}>
                                Browse Workshops
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="past" className="mt-6">
                        <div className="bg-muted/20 rounded-lg border py-12 text-center">
                            <Video className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                            <h3 className="text-lg font-medium">No past workshops</h3>
                            <p className="text-muted-foreground mt-1">You haven't attended any workshops yet</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Registration Dialog */}
            <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Register for Workshop</DialogTitle>
                        <DialogDescription>You're registering for the following workshop:</DialogDescription>
                    </DialogHeader>

                    {workshopToRegister && (
                        <div className="py-4">
                            <h3 className="text-lg font-medium">{workshopToRegister.name}</h3>
                            <div className="mt-2 flex items-center gap-2">
                                <Calendar className="text-muted-foreground h-4 w-4" />
                                <span className="text-sm">{format(workshopToRegister.date, 'EEEE, MMMM d, yyyy')}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                                <Clock className="text-muted-foreground h-4 w-4" />
                                <span className="text-sm">
                                    {format(workshopToRegister.date, 'h:mm a')} • {workshopToRegister.duration} minutes
                                </span>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium">Would you like to receive reminders?</p>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="reminder24h" defaultChecked />
                                    <label htmlFor="reminder24h" className="text-sm">
                                        24 hours before
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="reminder1h" defaultChecked />
                                    <label htmlFor="reminder1h" className="text-sm">
                                        1 hour before
                                    </label>
                                </div>
                            </div>

                            <div className="bg-muted mt-4 rounded-md p-3 text-sm">
                                <p className="font-medium">Note:</p>
                                <p className="mt-1">
                                    By registering, you'll receive the workshop materials and a calendar invitation. You can cancel your registration
                                    up to 12 hours before the workshop starts.
                                </p>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                handleRegisterConfirm(workshopToRegister.id);
                            }}
                        >
                            Confirm Registration
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
