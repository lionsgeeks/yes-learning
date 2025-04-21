import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
// import DashboardLayout from "@/components/dashboard-layout"
import { Filter, Search } from 'lucide-react';
// import Link from "next/link"
// import Image from "next/image"
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Libraries',
        href: `/library`,
    },
];

export default function LibrariesPage() {
    const { libraries } = usePage().props;
    console.log(libraries);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Library" />
            <div className="space-y-6 p-3 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Libraries</h1>
                        <p className="text-muted-foreground mt-1">Access recorded coaching sessions and learning resources</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                            <Input type="search" placeholder="Search libraries..." className="w-full pl-9 sm:w-[260px]" />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                    {libraries.map((library) => (
                        <Link key={library.id} href={`/ngo/library/${library.id}`} className="group">
                            <Card className="border-primary/20 from-background to-muted/30 flex h-full flex-col overflow-hidden rounded-xl border-2 bg-gradient-to-br p-0 transition-all hover:shadow-md sm:flex-row">
                                <CardContent className="border-primary/10 flex flex-1 flex-col justify-between border-t p-5 sm:border-t-0 sm:border-l sm:p-6">
                                    <h3 className="group-hover:text-primary text-primary/90 mb-1 line-clamp-1 font-semibold transition-colors">
                                        {library.title}
                                    </h3>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
