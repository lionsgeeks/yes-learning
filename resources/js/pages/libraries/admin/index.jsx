import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Clock, Edit, Eye, Filter, Image, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialLibraries = [
    {
        id: 1,
        title: 'Introduction to React Hooks',
        coach: 'Sarah Miller',
        date: 'March 15, 2025',
        duration: '1h 20min',
        category: 'Frontend',
        status: 'Published',
        views: 245,
        thumbnail: '/placeholder.svg?height=60&width=120&text=React+Hooks',
    },
    {
        id: 2,
        title: 'Advanced CSS Layouts',
        coach: 'Michael Chen',
        date: 'March 12, 2025',
        duration: '55min',
        category: 'CSS',
        status: 'Published',
        views: 189,
        thumbnail: '/placeholder.svg?height=60&width=120&text=CSS+Layouts',
    },
    {
        id: 3,
        title: 'Backend Development with Node.js',
        coach: 'David Wilson',
        date: 'March 10, 2025',
        duration: '1h 45min',
        category: 'Backend',
        status: 'Published',
        views: 312,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Node.js',
    },
    {
        id: 4,
        title: 'Database Design Principles',
        coach: 'Emma Rodriguez',
        date: 'March 8, 2025',
        duration: '1h 10min',
        category: 'Database',
        status: 'Draft',
        views: 0,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Database+Design',
    },
    {
        id: 5,
        title: 'UI/UX Design Fundamentals',
        coach: 'Alex Johnson',
        date: 'March 5, 2025',
        duration: '1h 30min',
        category: 'Design',
        status: 'Published',
        views: 267,
        thumbnail: '/placeholder.svg?height=60&width=120&text=UI/UX+Design',
    },
    {
        id: 6,
        title: 'JavaScript Performance Optimization',
        coach: 'Sarah Miller',
        date: 'March 3, 2025',
        duration: '1h 15min',
        category: 'JavaScript',
        status: 'Published',
        views: 203,
        thumbnail: '/placeholder.svg?height=60&width=120&text=JS+Performance',
    },
    {
        id: 7,
        title: 'Responsive Web Design',
        coach: 'Michael Chen',
        date: 'February 28, 2025',
        duration: '1h 05min',
        category: 'CSS',
        status: 'Scheduled',
        views: 0,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Responsive+Design',
    },
    {
        id: 8,
        title: 'API Development Best Practices',
        coach: 'David Wilson',
        date: 'February 25, 2025',
        duration: '1h 40min',
        category: 'Backend',
        status: 'Published',
        views: 195,
        thumbnail: '/placeholder.svg?height=60&width=120&text=API+Development',
    },
];

const AdminLibraries = () => {
    const [libraries, setLibraries] = useState(initialLibraries);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [libraryToDelete, setLibraryToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [libraryToEdit, setLibraryToEdit] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const breadcrumbs = [
        {
            title: 'Libraries',
            href: `/library`,
        },
    ];
    const filteredLibraries = libraries.filter(
        (library) =>
            library.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDeleteClick = (libraryId) => {
        setLibraryToDelete(libraryId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (libraryToDelete) {
            setLibraries(libraries.filter((library) => library.id !== libraryToDelete));
            setDeleteDialogOpen(false);
            setLibraryToDelete(null);
        }
    };

    const handleEditClick = (library) => {
        setLibraryToEdit({ ...library });
        setEditDialogOpen(true);
    };

    const handleEditSave = () => {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setLibraries(libraries.map((library) => (library.id === libraryToEdit?.id ? libraryToEdit : library)));
            setEditDialogOpen(false);
            setLibraryToEdit(null);
            setIsSubmitting(false);
        }, 500);
    };

    const handleViewLibrary = (libraryId) => {
        // In a real app, this would navigate to the library view page
        console.log(`Viewing library ${libraryId}`);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Libraries'/>
            <div className="p-3 lg:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Manage Libraries</h1>
                        <p className="text-muted-foreground mt-1">Create and manage coaching session recordings</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/admin/create/library">
                                <Plus className="mr-2 h-4 w-4" />
                                Create Library
                            </Link>
                        </Button>
                    </div>
                </div>

                <Card className='overflow-x-scroll lg:overflow-x-auto lg:w-full w-[93vw]'>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Libraries</CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                                    <Input
                                        type="search"
                                        placeholder="Search libraries..."
                                        className="w-full pl-9 sm:w-[260px]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4" />
                                    <span className="sr-only">Filter</span>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Library</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Coach</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLibraries.map((library) => (
                                    <TableRow key={library.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={library.thumbnail || '/placeholder.svg'}
                                                    alt={library.title}
                                                    width={120}
                                                    height={60}
                                                    className="h-12 w-20 rounded-md object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">{library.title}</p>
                                                    <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                        <Clock className="mr-1 h-3 w-3" />
                                                        {library.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{library.category}</Badge>
                                        </TableCell>
                                        <TableCell>{library.coach}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    library.status === 'Published' ? 'default' : library.status === 'Draft' ? 'outline' : 'secondary'
                                                }
                                            >
                                                {library.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{library.date}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleViewLibrary(library.id)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleEditClick(library)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(library.id)}>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredLibraries.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                                            No libraries found. Try adjusting your search.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete this library and all associated resources. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90 text-white">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Edit Library Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Edit Library</DialogTitle>
                            <DialogDescription>Make changes to the library details below.</DialogDescription>
                        </DialogHeader>
                        {libraryToEdit && (
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Library Title</Label>
                                    <Input
                                        id="title"
                                        value={libraryToEdit.title}
                                        onChange={(e) => setLibraryToEdit({ ...libraryToEdit, title: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={libraryToEdit.category}
                                            onValueChange={(value) => setLibraryToEdit({ ...libraryToEdit, category: value })}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Frontend">Frontend</SelectItem>
                                                <SelectItem value="Backend">Backend</SelectItem>
                                                <SelectItem value="CSS">CSS</SelectItem>
                                                <SelectItem value="JavaScript">JavaScript</SelectItem>
                                                <SelectItem value="Database">Database</SelectItem>
                                                <SelectItem value="Design">Design</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={libraryToEdit.status}
                                            onValueChange={(value) => setLibraryToEdit({ ...libraryToEdit, status: value })}
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Published">Published</SelectItem>
                                                <SelectItem value="Draft">Draft</SelectItem>
                                                <SelectItem value="Scheduled">Scheduled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="coach">Coach</Label>
                                    <Select
                                        value={libraryToEdit.coach}
                                        onValueChange={(value) => setLibraryToEdit({ ...libraryToEdit, coach: value })}
                                    >
                                        <SelectTrigger id="coach">
                                            <SelectValue placeholder="Select coach" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                                            <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                                            <SelectItem value="David Wilson">David Wilson</SelectItem>
                                            <SelectItem value="Emma Rodriguez">Emma Rodriguez</SelectItem>
                                            <SelectItem value="Alex Johnson">Alex Johnson</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            value={libraryToEdit.duration}
                                            onChange={(e) => setLibraryToEdit({ ...libraryToEdit, duration: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="views">Views</Label>
                                        <Input
                                            id="views"
                                            type="number"
                                            value={libraryToEdit.views}
                                            onChange={(e) => setLibraryToEdit({ ...libraryToEdit, views: Number.parseInt(e.target.value) || 0 })}
                                            disabled={libraryToEdit.status !== 'Published'}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditSave} disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
};
export default AdminLibraries;
