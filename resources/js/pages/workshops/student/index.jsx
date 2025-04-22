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
import TransText from "@/components/TransText"
// Mock data for workshops

export default function WorkshopsPage({ workshops, chapters }) {
    // console.log(chapters);

    const [searchQuery, setSearchQuery] = useState('');

    const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
    const [workshopToRegister, setWorkshopToRegister] = useState(null);

    const { data, setData, put, proccessing, erro } = useForm({
        workshop: '',
    });
    const today = new Date();
    const filteredWorkshops = workshops.filter((workshop) => {
        // Filter by search query
        const matchesSearch = new Date(workshop.date);
        return matchesSearch >= today;

    });

    const filter = workshops.filter((workshop) => {
        const createdAt = new Date(workshop.date);
        return createdAt < today;
    });

    // console.log("Workshops from the past:", filter);

    const registredfilter = workshops.filter((workshop) => {
        const registred = workshop.enrolled

        return registred;
    });

    // console.log("Workshops from the past:", filter);

    const getStatusBadge = (date) => {
        const now = new Date();
        if (isBefore(date, now)) {
            return (
                <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    <TransText en="past" fr="Passé" ar="مَرَّت" />
                </Badge>
            );
        } else if (isAfter(date, now) && isBefore(date, addHours(now, 24))) {
            return (
                <Badge variant="outline" className="bg-amber-100 text-amber-800">
                    <TransText en="Upcoming" fr="À venir" ar="قادِم " />
                </Badge>
            );
        } else {
            return (
                <Badge variant="outline" className="bg-green-100 text-green-800">
                    <TransText en="Scheduled" fr="Planifié" ar=" " />
                </Badge>
            );
        }
    };

    const handleRegisterClick = (workshop) => {
        setWorkshopToRegister(workshop);
        setRegistrationDialogOpen(true);
    };

    const handleRegisterConfirm = (id) => {
        setRegistrationDialogOpen(false);
        setWorkshopToRegister(null);
        setData('workshop', id);
        put(route('subWorkshop.enroll', id), {
            // onSuccess: () => {
            //     alert('good');
            // },
            // onError: (e) => {},
        });

    };

    return (
        <AppLayout>
            <Head title="Workshops" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold"><TransText en="Workshops" fr="Ateliers" ar="ورش عمل" /></h1>
                    <p className="text-muted-foreground mt-1"><TransText en="Join live interactive workshops with our instructors" fr="Rejoignez les ateliers interactifs en direct avec nos instructeurs." ar="انضم إلى ورش العمل التفاعلية المباشرة مع مدربينا" /></p>
                </div>




                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming"><TransText en="upcoming" fr="À venir" ar="القادمة" /></TabsTrigger>
                        <TabsTrigger value="registered"><TransText en="registered" fr="Inscrite" ar="مُسَجَّلَة " /></TabsTrigger>
                        <TabsTrigger value="past"><TransText en="past" fr="Passé" ar="مَرَّت " /></TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-6">
                        {filteredWorkshops.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filteredWorkshops.map((workshop) => (
                                    <Card key={workshop.id} className="flex flex-col overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-end">{getStatusBadge(workshop.date)}</div>
                                            <CardTitle className="mt-2"> <TransText en={workshop.name.en} fr={workshop.name.fr} ar={workshop.name.ar} />

                                            </CardTitle>
                                            <CardDescription>{workshop.chapter.title.en}</CardDescription>
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
                                                        {format(workshop.date, 'h:mm a')} GMT+1 • {workshop.duration} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Video className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span><TransText en={"instructor : " + workshop.instructor.en} fr={"instructeur : " + workshop.instructor.fr} ar={"مُدَرِّب  : " + workshop.instructor.ar} /></span>
                                                </div>
                                                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
                                                    <TransText en={workshop.description.en} fr={workshop.description.fr} ar={workshop.description.ar} />
                                                </p>
                                                <div className="text-muted-foreground mt-2 text-xs">
                                                    <span><TransText en={"prerequisite : " + workshop.prerequisite.en} fr={"prérequis : " + workshop.prerequisite.fr} ar={"مُتَطَلَّب سابِق  : " + workshop.prerequisite.ar} /></span>

                                                </div>
                                                <div className="mt-2 flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {workshop.enrolledCount} <TransText en="enrolled" fr="inscrit" ar="مُسَجَّلون" />

                                                    </span>

                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2 pt-0">
                                            {/* {console.log(JSON.parse(workshop.meetLink).ar)} */}
                                            {!workshop.enrolled && workshop.requireRegistration ? (
                                                <>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() => handleRegisterClick(workshop)}
                                                    // disabled={workshop.enrolled >= workshop.capacity}
                                                    >
                                                        <TransText en="Register" fr="s’inscrire" ar="تسجيل" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>

                                                    <TransText en=
                                                        <a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).en} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            Join
                                                        </a>

                                                        fr=<a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).fr} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            rejoindre
                                                        </a>

                                                        ar=<a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).ar} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            انضمَّ
                                                        </a>

                                                    />
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
                        {registredfilter.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {registredfilter.map((workshop) => (
                                    <Card key={workshop.id} className="flex flex-col overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-end">{getStatusBadge(workshop.date)}</div>
                                            <CardTitle className="mt-2"> <TransText en={JSON.parse(workshop.name).en} fr={JSON.parse(workshop.name).fr} ar={JSON.parse(workshop.name).ar} /></CardTitle>
                                            <CardDescription>{workshop.chapter.title.en}</CardDescription>
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
                                                        {format(workshop.date, 'h:mm a')} GMT+1 • {workshop.duration} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Video className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span><TransText en={"instructor : " + JSON.parse(workshop.instructor).en} fr={"instructeur : " + JSON.parse(workshop.instructor).fr} ar={"مُدَرِّب  : " + JSON.parse(workshop.instructor).ar} /></span>
                                                </div>
                                                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{JSON.parse(workshop.description).en}</p>
                                                <div className="text-muted-foreground mt-2 text-xs">
                                                    <span><TransText en={"prerequisite : " + JSON.parse(workshop.prerequisite).en} fr={"prérequis : " + JSON.parse(workshop.prerequisite).fr} ar={"مُتَطَلَّب سابِق  : " + JSON.parse(workshop.prerequisite).ar} /></span>

                                                </div>
                                                <div className="mt-2 flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {workshop.enrolledCount} <TransText en="enrolled" fr="inscrit" ar="مُسَجَّلون" />

                                                    </span>

                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex gap-2 pt-0">
                                            {/* {console.log(JSON.parse(workshop.meetLink).ar)} */}
                                            {!workshop.enrolled && workshop.requireRegistration ? (
                                                <>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() => handleRegisterClick(workshop)}
                                                    // disabled={workshop.enrolled >= workshop.capacity}
                                                    >
                                                        <TransText en="Register" fr="s’inscrire" ar="تسجيل" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>

                                                    <TransText en=
                                                        <a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).en} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            Join
                                                        </a>

                                                        fr=<a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).fr} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            rejoindre
                                                        </a>

                                                        ar=<a class="inline-flex items-center justify-center w-full rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" href={JSON.parse(workshop.meetLink).ar} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            انضمَّ
                                                        </a>

                                                    />
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

                    <TabsContent value="past" className="mt-6">
                        {filter.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filter.map((workshop) => (
                                    <Card key={workshop.id} className="flex flex-col overflow-hidden">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-end">{getStatusBadge(workshop.date)}</div>
                                            <CardTitle className="mt-2"> <TransText en={JSON.parse(workshop.name).en} fr={JSON.parse(workshop.name).fr} ar={JSON.parse(workshop.name).ar} /></CardTitle>
                                            <CardDescription>{workshop.chapter.title.en}</CardDescription>
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
                                                        {format(workshop.date, 'h:mm a')} GMT+1 • {workshop.duration} minutes
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <Video className="text-muted-foreground mr-2 h-4 w-4" />
                                                    <span><TransText en={"instructor : " + JSON.parse(workshop.instructor).en} fr={"instructeur : " + JSON.parse(workshop.instructor).fr} ar={"مُدَرِّب  : " + JSON.parse(workshop.instructor).ar} /></span>
                                                </div>
                                                <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">{JSON.parse(workshop.description).en}</p>
                                                <div className="text-muted-foreground mt-2 text-xs">
                                                    <span><TransText en={"prerequisite : " + JSON.parse(workshop.prerequisite).en} fr={"prérequis : " + JSON.parse(workshop.prerequisite).fr} ar={"مُتَطَلَّب سابِق  : " + JSON.parse(workshop.prerequisite).ar} /></span>

                                                </div>
                                                <div className="mt-2 flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {workshop.enrolledCount} <TransText en="enrolled" fr="inscrit" ar="مُسَجَّلون" />

                                                    </span>

                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="flex-1">
                                                <TransText en="passed" fr="s’inscrire" ar="تسجيل" />
                                            </Button>

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
                </Tabs>
            </div>

            {/* Registration Dialog */}
            <Dialog open={registrationDialogOpen} onOpenChange={setRegistrationDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><TransText en="Register for Workshop" fr="S'inscrire à l'atelier" ar="لتسجيل في ورشة العمل" /></DialogTitle>
                        <DialogDescription><TransText en="You're registering for the following workshop:" fr="Vous vous inscrivez pour l'atelier suivant :" ar=" : أنت تسجل في ورشة العمل التالية" /></DialogDescription>
                    </DialogHeader>

                    {workshopToRegister && (
                        <div className="">
                            <h3 className="text-lg font-medium"><TransText en={JSON.parse(workshopToRegister.name).en} fr={JSON.parse(workshopToRegister.name).fr} ar={JSON.parse(workshopToRegister.name).ar} /></h3>
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




                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setRegistrationDialogOpen(false)}>
                            <TransText en="Cancel" fr="Annuler" ar="إلغاء" />
                        </Button>
                        <Button
                            onClick={() => {
                                handleRegisterConfirm(workshopToRegister.id);
                            }}
                        >
                            <TransText en="Confirm Registration" fr="Confirmer l'inscription" ar="تأكيد التسجيل " />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
