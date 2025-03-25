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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronRight,
    Clock,
    Edit,
    Eye,
    FileUp,
    Filter,
    FolderPlus,
    Image,
    Layers,
    MoreHorizontal,
    Search,
    Trash2,
    Youtube,
} from 'lucide-react';
import { useState } from 'react';
// Mock data for libraries
const initialLibraries = [
    {
        id: 1,
        title: 'Frontend Development',
        description: 'Resources for learning modern frontend technologies',
        category: 'Development',
        status: 'Published',
        views: 1245,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Frontend',
        isMainLibrary: true,
        subLibraries: [
            {
                id: 101,
                title: 'Introduction to React Hooks',
                coach: 'Sarah Miller',
                date: 'March 15, 2025',
                duration: '1h 20min',
                status: 'Published',
                views: 245,
                thumbnail: '/placeholder.svg?height=60&width=120&text=React+Hooks',
                youtubeId: 'dH6i3GurZW8',
            },
            {
                id: 102,
                title: 'Advanced CSS Layouts',
                coach: 'Michael Chen',
                date: 'March 12, 2025',
                duration: '55min',
                status: 'Published',
                views: 189,
                thumbnail: '/placeholder.svg?height=60&width=120&text=CSS+Layouts',
                youtubeId: 'dH6i3GurZW8',
            },
            {
                id: 103,
                title: 'JavaScript Performance Optimization',
                coach: 'Sarah Miller',
                date: 'March 3, 2025',
                duration: '1h 15min',
                status: 'Published',
                views: 203,
                thumbnail: '/placeholder.svg?height=60&width=120&text=JS+Performance',
                youtubeId: 'dH6i3GurZW8',
            },
        ],
    },
    {
        id: 2,
        title: 'Backend Development',
        description: 'Server-side programming and architecture',
        category: 'Development',
        status: 'Published',
        views: 980,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Backend',
        isMainLibrary: true,
        subLibraries: [
            {
                id: 201,
                title: 'Backend Development with Node.js',
                coach: 'David Wilson',
                date: 'March 10, 2025',
                duration: '1h 45min',
                status: 'Published',
                views: 312,
                thumbnail: '/placeholder.svg?height=60&width=120&text=Node.js',
                youtubeId: 'dH6i3GurZW8',
            },
            {
                id: 202,
                title: 'API Development Best Practices',
                coach: 'David Wilson',
                date: 'February 25, 2025',
                duration: '1h 40min',
                status: 'Published',
                views: 195,
                thumbnail: '/placeholder.svg?height=60&width=120&text=API+Development',
                youtubeId: 'dH6i3GurZW8',
            },
        ],
    },
    {
        id: 3,
        title: 'Database & Storage',
        description: 'Database design and data management',
        category: 'Development',
        status: 'Published',
        views: 756,
        thumbnail: '/placeholder.svg?height=60&width=120&text=Database',
        isMainLibrary: true,
        subLibraries: [
            {
                id: 301,
                title: 'Database Design Principles',
                coach: 'Emma Rodriguez',
                date: 'March 8, 2025',
                duration: '1h 10min',
                status: 'Draft',
                views: 0,
                thumbnail: '/placeholder.svg?height=60&width=120&text=Database+Design',
                youtubeId: 'dH6i3GurZW8',
            },
        ],
    },
    {
        id: 4,
        title: 'UI/UX Design',
        description: 'User interface and experience design principles',
        category: 'Design',
        status: 'Published',
        views: 890,
        thumbnail: '/placeholder.svg?height=60&width=120&text=UI/UX',
        isMainLibrary: true,
        subLibraries: [
            {
                id: 401,
                title: 'UI/UX Design Fundamentals',
                coach: 'Alex Johnson',
                date: 'March 5, 2025',
                duration: '1h 30min',
                status: 'Published',
                views: 267,
                thumbnail: '/placeholder.svg?height=60&width=120&text=UI/UX+Design',
                youtubeId: 'dH6i3GurZW8',
            },
            {
                id: 402,
                title: 'Responsive Web Design',
                coach: 'Michael Chen',
                date: 'February 28, 2025',
                duration: '1h 05min',
                status: 'Scheduled',
                views: 0,
                thumbnail: '/placeholder.svg?height=60&width=120&text=Responsive+Design',
                youtubeId: 'dH6i3GurZW8',
            },
        ],
    },
];
const breadcrumbs = [
    {
        title: 'Libraries',
        href: '/admin/libraries',
    },
];
export default function AdminLibraries() {
    const [libraries, setLibraries] = useState(initialLibraries);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [libraryToDelete, setLibraryToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [libraryToEdit, setLibraryToEdit] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [expandedLibraries, setExpandedLibraries] = useState([]);
    const [viewLibraryDialogOpen, setViewLibraryDialogOpen] = useState(false);
    const [libraryToView, setLibraryToView] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    // Filter libraries based on search query and active tab
    const filteredLibraries = libraries.filter((library) => {
        const matchesSearch =
            library.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.subLibraries.some(
                (sub) => sub.title.toLowerCase().includes(searchQuery.toLowerCase()) || sub.coach.toLowerCase().includes(searchQuery.toLowerCase()),
            );

        if (activeTab === 'all') return matchesSearch;
        return matchesSearch && library.category.toLowerCase() === activeTab.toLowerCase();
    });

    const toggleExpandLibrary = (libraryId) => {
        if (expandedLibraries.includes(libraryId)) {
            setExpandedLibraries(expandedLibraries.filter((id) => id !== libraryId));
        } else {
            setExpandedLibraries([...expandedLibraries, libraryId]);
        }
    };

    const handleDeleteClick = (id, isMainLibrary, parentId) => {
        setLibraryToDelete({ id, isMainLibrary, parentId });
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (libraryToDelete) {
            if (libraryToDelete.isMainLibrary) {
                // Delete main library and all its sub-libraries
                setLibraries(libraries.filter((library) => library.id !== libraryToDelete.id));
            } else if (libraryToDelete.parentId) {
                // Delete sub-library only
                setLibraries(
                    libraries.map((library) =>
                        library.id === libraryToDelete.parentId
                            ? {
                                  ...library,
                                  subLibraries: library.subLibraries.filter((sub) => sub.id !== libraryToDelete.id),
                              }
                            : library,
                    ),
                );
            }
            setDeleteDialogOpen(false);
            setLibraryToDelete(null);
        }
    };

    const handleEditClick = (library, isMainLibrary, parentId) => {
        setLibraryToEdit({ ...library, isMainLibrary, parentId });
        setEditDialogOpen(true);
    };

    const handleEditSave = () => {
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            if (libraryToEdit?.isMainLibrary) {
                // Update main library
                setLibraries(
                    libraries.map((library) =>
                        library.id === libraryToEdit.id
                            ? {
                                  ...library,
                                  title: libraryToEdit.title,
                                  description: libraryToEdit.description,
                                  category: libraryToEdit.category,
                                  status: libraryToEdit.status,
                              }
                            : library,
                    ),
                );
            } else if (libraryToEdit?.parentId) {
                // Update sub-library
                setLibraries(
                    libraries.map((library) =>
                        library.id === libraryToEdit.parentId
                            ? {
                                  ...library,
                                  subLibraries: library.subLibraries.map((sub) =>
                                      sub.id === libraryToEdit.id
                                          ? {
                                                ...sub,
                                                title: libraryToEdit.title,
                                                coach: libraryToEdit.coach,
                                                duration: libraryToEdit.duration,
                                                status: libraryToEdit.status,
                                            }
                                          : sub,
                                  ),
                              }
                            : library,
                    ),
                );
            }

            setEditDialogOpen(false);
            setLibraryToEdit(null);
            setIsSubmitting(false);
        }, 500);
    };

    const handleViewLibrary = (library, isMainLibrary) => {
        setLibraryToView({ ...library, isMainLibrary });
        setViewLibraryDialogOpen(true);
    };

    const getUniqueCategories = () => {
        const categories = libraries.map((lib) => lib.category);
        return [...new Set(categories)];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Libraries'/>
            <div className="p-3 lg:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Library Management</h1>
                        <p className="text-muted-foreground mt-1">Organize and manage your educational content library</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/admin/create/library">
                                <Layers className="mr-2 h-4 w-4" />
                                Create Main Library
                            </Link>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <TabsList>
                            <TabsTrigger value="all">All Categories</TabsTrigger>
                            {getUniqueCategories().map((category) => (
                                <TabsTrigger key={category} value={category.toLowerCase()}>
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
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

                    <TabsContent value="all" className="mt-0">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Libraries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Library</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Content</TableHead>
                                            <TableHead>Views</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredLibraries.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                                                    No libraries found. Try adjusting your search.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredLibraries.map((library) => (
                                                <>
                                                    <TableRow key={library.id} className="bg-muted/30">
                                                        <TableCell>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => toggleExpandLibrary(library.id)}
                                                                className="h-8 w-8"
                                                            >
                                                                {expandedLibraries.includes(library.id) ? (
                                                                    <ChevronDown className="h-4 w-4" />
                                                                ) : (
                                                                    <ChevronRight className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                                    <Image
                                                                        src={library.thumbnail || '/placeholder.svg'}
                                                                        alt={library.title}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">{library.title}</p>
                                                                    <p className="text-muted-foreground line-clamp-1 text-xs">
                                                                        {library.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline">{library.category}</Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                variant={
                                                                    library.status === 'Published'
                                                                        ? 'default'
                                                                        : library.status === 'Draft'
                                                                          ? 'outline'
                                                                          : 'secondary'
                                                                }
                                                            >
                                                                {library.status}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="secondary">{library.subLibraries.length} items</Badge>
                                                        </TableCell>
                                                        <TableCell>{library.views}</TableCell>
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
                                                                    <DropdownMenuItem onClick={() => handleViewLibrary(library, true)}>
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem onClick={() => handleEditClick(library, true)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link
                                                                            href={`/admin/create/library/${library.id}/subLibrary`}
                                                                        >
                                                                            <FolderPlus className="mr-2 h-4 w-4" />
                                                                            Add Sub-Library
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        className="text-destructive"
                                                                        onClick={() => handleDeleteClick(library.id, true)}
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>

                                                    {/* Sub-libraries */}
                                                    {expandedLibraries.includes(library.id) &&
                                                        library.subLibraries.map((subLibrary) => (
                                                            <TableRow key={`sub-${subLibrary.id}`} className="bg-background">
                                                                <TableCell></TableCell>
                                                                <TableCell>
                                                                    <div className="border-primary/20 flex items-center gap-3 border-l-2 pl-6">
                                                                        <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                                            <Image
                                                                                src={subLibrary.thumbnail || '/placeholder.svg'}
                                                                                alt={subLibrary.title}
                                                                                fill
                                                                                className="object-cover"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium">{subLibrary.title}</p>
                                                                            <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                                                <Clock className="mr-1 h-3 w-3" />
                                                                                {subLibrary.duration}
                                                                                <span className="mx-1">•</span>
                                                                                {subLibrary.coach}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge variant="outline" className="bg-primary/5">
                                                                        <Youtube className="mr-1 h-3 w-3" />
                                                                        Video
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge
                                                                        variant={
                                                                            subLibrary.status === 'Published'
                                                                                ? 'default'
                                                                                : subLibrary.status === 'Draft'
                                                                                  ? 'outline'
                                                                                  : 'secondary'
                                                                        }
                                                                    >
                                                                        {subLibrary.status}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Badge variant="outline" className="bg-primary/5">
                                                                        {subLibrary.date}
                                                                    </Badge>
                                                                </TableCell>
                                                                <TableCell>{subLibrary.views}</TableCell>
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
                                                                            <DropdownMenuItem onClick={() => handleViewLibrary(subLibrary, false)}>
                                                                                <Eye className="mr-2 h-4 w-4" />
                                                                                View Content
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem
                                                                                onClick={() => handleEditClick(subLibrary, false, library.id)}
                                                                            >
                                                                                <Edit className="mr-2 h-4 w-4" />
                                                                                Edit
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                className="text-destructive"
                                                                                onClick={() => handleDeleteClick(subLibrary.id, false, library.id)}
                                                                            >
                                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Category-specific tabs */}
                    {getUniqueCategories().map((category) => (
                        <TabsContent key={category} value={category.toLowerCase()} className="mt-0">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle>{category} Libraries</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12"></TableHead>
                                                <TableHead>Library</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Content</TableHead>
                                                <TableHead>Views</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredLibraries.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">
                                                        No libraries found in this category.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredLibraries.map((library) => (
                                                    <>
                                                        <TableRow key={library.id} className="bg-muted/30">
                                                            <TableCell>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => toggleExpandLibrary(library.id)}
                                                                    className="h-8 w-8"
                                                                >
                                                                    {expandedLibraries.includes(library.id) ? (
                                                                        <ChevronDown className="h-4 w-4" />
                                                                    ) : (
                                                                        <ChevronRight className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                                        <Image
                                                                            src={library.thumbnail || '/placeholder.svg'}
                                                                            alt={library.title}
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium">{library.title}</p>
                                                                        <p className="text-muted-foreground line-clamp-1 text-xs">
                                                                            {library.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant={
                                                                        library.status === 'Published'
                                                                            ? 'default'
                                                                            : library.status === 'Draft'
                                                                              ? 'outline'
                                                                              : 'secondary'
                                                                    }
                                                                >
                                                                    {library.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge variant="secondary">{library.subLibraries.length} items</Badge>
                                                            </TableCell>
                                                            <TableCell>{library.views}</TableCell>
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
                                                                        <DropdownMenuItem onClick={() => handleViewLibrary(library, true)}>
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            View Details
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => handleEditClick(library, true)}>
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem asChild>
                                                                            <Link
                                                                                href={`/admin/libraries/sub-library/create?parentId=${library.id}&parentTitle=${encodeURIComponent(library.title)}`}
                                                                            >
                                                                                <FolderPlus className="mr-2 h-4 w-4" />
                                                                                Add Sub-Library
                                                                            </Link>
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem
                                                                            className="text-destructive"
                                                                            onClick={() => handleDeleteClick(library.id, true)}
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Delete
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>

                                                        {/* Sub-libraries */}
                                                        {expandedLibraries.includes(library.id) &&
                                                            library.subLibraries.map((subLibrary) => (
                                                                <TableRow key={`sub-${subLibrary.id}`} className="bg-background">
                                                                    <TableCell></TableCell>
                                                                    <TableCell>
                                                                        <div className="border-primary/20 flex items-center gap-3 border-l-2 pl-6">
                                                                            <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                                                                <Image
                                                                                    src={subLibrary.thumbnail || '/placeholder.svg'}
                                                                                    alt={subLibrary.title}
                                                                                    fill
                                                                                    className="object-cover"
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <p className="font-medium">{subLibrary.title}</p>
                                                                                <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                                                    <Clock className="mr-1 h-3 w-3" />
                                                                                    {subLibrary.duration}
                                                                                    <span className="mx-1">•</span>
                                                                                    {subLibrary.coach}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge
                                                                            variant={
                                                                                subLibrary.status === 'Published'
                                                                                    ? 'default'
                                                                                    : subLibrary.status === 'Draft'
                                                                                      ? 'outline'
                                                                                      : 'secondary'
                                                                            }
                                                                        >
                                                                            {subLibrary.status}
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Badge variant="outline" className="bg-primary/5">
                                                                            {subLibrary.date}
                                                                        </Badge>
                                                                    </TableCell>
                                                                    <TableCell>{subLibrary.views}</TableCell>
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
                                                                                <DropdownMenuItem
                                                                                    onClick={() => handleViewLibrary(subLibrary, false)}
                                                                                >
                                                                                    <Eye className="mr-2 h-4 w-4" />
                                                                                    View Content
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuItem
                                                                                    onClick={() => handleEditClick(subLibrary, false, library.id)}
                                                                                >
                                                                                    <Edit className="mr-2 h-4 w-4" />
                                                                                    Edit
                                                                                </DropdownMenuItem>
                                                                                <DropdownMenuSeparator />
                                                                                <DropdownMenuItem
                                                                                    className="text-destructive"
                                                                                    onClick={() =>
                                                                                        handleDeleteClick(subLibrary.id, false, library.id)
                                                                                    }
                                                                                >
                                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                                    Delete
                                                                                </DropdownMenuItem>
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                    </>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                {libraryToDelete?.isMainLibrary
                                    ? 'This will permanently delete this library and all its sub-libraries. This action cannot be undone.'
                                    : 'This will permanently delete this sub-library. This action cannot be undone.'}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Edit Library Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>{libraryToEdit?.isMainLibrary ? 'Edit Main Library' : 'Edit Sub-Library'}</DialogTitle>
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

                                {libraryToEdit.isMainLibrary ? (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Input
                                                id="description"
                                                value={libraryToEdit.description}
                                                onChange={(e) => setLibraryToEdit({ ...libraryToEdit, description: e.target.value })}
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
                                                        <SelectItem value="Development">Development</SelectItem>
                                                        <SelectItem value="Design">Design</SelectItem>
                                                        <SelectItem value="Business">Business</SelectItem>
                                                        <SelectItem value="Marketing">Marketing</SelectItem>
                                                        <SelectItem value="Data Science">Data Science</SelectItem>
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
                                                        <SelectItem value="Archived">Archived</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="coach">Coach</Label>
                                                <Input
                                                    id="coach"
                                                    value={libraryToEdit.coach}
                                                    onChange={(e) => setLibraryToEdit({ ...libraryToEdit, coach: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="duration">Duration</Label>
                                                <Input
                                                    id="duration"
                                                    value={libraryToEdit.duration}
                                                    onChange={(e) => setLibraryToEdit({ ...libraryToEdit, duration: e.target.value })}
                                                />
                                            </div>
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
                                        <div className="grid gap-2">
                                            <Label htmlFor="youtubeId">YouTube Video ID</Label>
                                            <Input
                                                id="youtubeId"
                                                value={libraryToEdit.youtubeId}
                                                onChange={(e) => setLibraryToEdit({ ...libraryToEdit, youtubeId: e.target.value })}
                                                placeholder="e.g. dQw4w9WgXcQ"
                                            />
                                            <p className="text-muted-foreground text-xs">The ID is the part after v= in a YouTube URL</p>
                                        </div>
                                    </>
                                )}
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

                {/* View Library Dialog */}
                <Dialog open={viewLibraryDialogOpen} onOpenChange={setViewLibraryDialogOpen}>
                    <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
                        {libraryToView && (
                            <>
                                <DialogHeader>
                                    <DialogTitle>{libraryToView.isMainLibrary ? 'Library Details' : 'Sub-Library Content'}</DialogTitle>
                                </DialogHeader>

                                <div className="mt-4 space-y-6">
                                    {libraryToView.isMainLibrary ? (
                                        <>
                                            <div className="flex flex-col gap-4 sm:flex-row">
                                                <div className="relative aspect-video w-full overflow-hidden rounded-md border sm:w-1/3">
                                                    <Image
                                                        src={libraryToView.thumbnail || '/placeholder.svg'}
                                                        alt={libraryToView.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <h3 className="text-xl font-semibold">{libraryToView.title}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline">{libraryToView.category}</Badge>
                                                        <Badge
                                                            variant={
                                                                libraryToView.status === 'Published'
                                                                    ? 'default'
                                                                    : libraryToView.status === 'Draft'
                                                                      ? 'outline'
                                                                      : 'secondary'
                                                            }
                                                        >
                                                            {libraryToView.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-muted-foreground">{libraryToView.description}</p>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center">
                                                            <Layers className="text-muted-foreground mr-1 h-4 w-4" />
                                                            <span>{libraryToView.subLibraries.length} sub-libraries</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Eye className="text-muted-foreground mr-1 h-4 w-4" />
                                                            <span>{libraryToView.views} total views</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-medium">Sub-Libraries</h4>
                                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                    {libraryToView.subLibraries.map((sub) => (
                                                        <Card key={sub.id} className="overflow-hidden">
                                                            <div className="flex">
                                                                <div className="relative h-20 w-20">
                                                                    <Image
                                                                        src={sub.thumbnail || '/placeholder.svg'}
                                                                        alt={sub.title}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <CardContent className="flex-1 p-3">
                                                                    <h5 className="line-clamp-1 font-medium">{sub.title}</h5>
                                                                    <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                                        <Clock className="mr-1 h-3 w-3" />
                                                                        {sub.duration}
                                                                        <span className="mx-1">•</span>
                                                                        {sub.coach}
                                                                    </div>
                                                                    <div className="mt-2 flex items-center gap-2">
                                                                        <Badge
                                                                            variant={
                                                                                sub.status === 'Published'
                                                                                    ? 'default'
                                                                                    : sub.status === 'Draft'
                                                                                      ? 'outline'
                                                                                      : 'secondary'
                                                                            }
                                                                            className="text-xs"
                                                                        >
                                                                            {sub.status}
                                                                        </Badge>
                                                                        <span className="text-muted-foreground text-xs">{sub.views} views</span>
                                                                    </div>
                                                                </CardContent>
                                                            </div>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                <div className="bg-muted aspect-video w-full overflow-hidden rounded-md">
                                                    <iframe
                                                        src={`https://www.youtube.com/embed/${libraryToView.youtubeId}`}
                                                        title={libraryToView.title}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="h-full w-full"
                                                    ></iframe>
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-xl font-semibold">{libraryToView.title}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            variant={
                                                                libraryToView.status === 'Published'
                                                                    ? 'default'
                                                                    : libraryToView.status === 'Draft'
                                                                      ? 'outline'
                                                                      : 'secondary'
                                                            }
                                                        >
                                                            {libraryToView.status}
                                                        </Badge>
                                                        <Badge variant="outline" className="bg-primary/5">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            {libraryToView.duration}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="text-muted-foreground">Coach:</span>
                                                        <span className="font-medium">{libraryToView.coach}</span>
                                                        <span className="text-muted-foreground mx-1">•</span>
                                                        <span className="text-muted-foreground">{libraryToView.date}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Eye className="text-muted-foreground h-4 w-4" />
                                                        <span>{libraryToView.views} views</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 border-t pt-4">
                                                    <h4 className="font-medium">Resources</h4>
                                                    <div className="space-y-2">
                                                        <div className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors">
                                                            <div className="flex items-center">
                                                                <div className="bg-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded">
                                                                    <FileUp className="text-primary h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">Presentation Slides</div>
                                                                    <div className="text-muted-foreground text-xs">PDF • 2.4 MB</div>
                                                                </div>
                                                            </div>
                                                            <Button variant="outline" size="sm">
                                                                Download
                                                            </Button>
                                                        </div>

                                                        <div className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors">
                                                            <div className="flex items-center">
                                                                <div className="bg-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded">
                                                                    <FileUp className="text-primary h-5 w-5" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">Code Examples</div>
                                                                    <div className="text-muted-foreground text-xs">ZIP • 1.8 MB</div>
                                                                </div>
                                                            </div>
                                                            <Button variant="outline" size="sm">
                                                                Download
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setViewLibraryDialogOpen(false)}>
                                        Close
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setViewLibraryDialogOpen(false);
                                            handleEditClick(
                                                libraryToView,
                                                libraryToView.isMainLibrary,
                                                libraryToView.isMainLibrary ? undefined : libraryToView.parentId,
                                            );
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
