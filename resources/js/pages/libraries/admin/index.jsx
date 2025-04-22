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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    ChevronRight,
    Clock,
    Edit,
    Eye,
    File,
    FileText,
    Filter,
    FolderPlus,
    Layers,
    MoreHorizontal,
    Search,
    Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Libraries',
        href: '/admin/libraries',
    },
];

export default function AdminLibraries() {
    const { libraries } = usePage().props;
    const { data, setData, delete: destroy, post, put, reset, processing } = useForm();
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [libraryToDelete, setLibraryToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [libraryToEdit, setLibraryToEdit] = useState(null);
    const [expandedLibraries, setExpandedLibraries] = useState([]);
    const [viewLibraryDialogOpen, setViewLibraryDialogOpen] = useState(false);
    const [libraryToView, setLibraryToView] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        if (editDialogOpen && libraryToEdit) {
            setData({ ...libraryToEdit });
            reset(
                libraryToEdit.isMainLibrary
                    ? {
                          title: libraryToEdit.title,
                      }
                    : {
                          title: libraryToEdit.title,
                          coach: libraryToEdit.coach,
                          link: libraryToEdit.link,
                          documents: libraryToEdit.filelibraries,
                      },
            );
        }
    }, [editDialogOpen, libraryToEdit, reset]);
    console.log('library to edit ', libraryToEdit);
    const handleDeleteConfirm = () => {
        if (libraryToDelete) {
            destroy(route(libraryToDelete.isMainLibrary ? 'library.destroy' : 'sublibrary.destroy', { id: libraryToDelete.id }), {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setLibraryToDelete(null);
                },
            });
        }
    };

    function extractVideoId(url) {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/]+)/;
        const match = url.match(regex);
        return match && match[1];
    }

    const handleEditSave = () => {
        if (!libraryToEdit) return;
        post(
            route(libraryToEdit.isMainLibrary ? 'library.update' : 'sublibrary.update', {
                _method: 'put',
                data: libraryToEdit,
                ...(libraryToEdit.isMainLibrary ? { library: libraryToEdit.id } : { sublibrary: libraryToEdit.id }),
            }),
            {
                onSuccess: () => setEditDialogOpen(false),
                preserveScroll: true,
            },
        );
    };

    const handleNestedInputChange = (field, lang, value) => {
        setData(field, {
            ...data[field],
            [lang]: value,
        });
    };

    const filteredLibraries = libraries.filter((library) => {
        const matchesSearch =
            library.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.title.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
            library.title.fr.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
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

    const handleEditClick = (library, isMainLibrary, parentId) => {
        setLibraryToEdit({ ...library, isMainLibrary, parentId });
        reset(
            isMainLibrary
                ? {
                      title: library.title,
                  }
                : {
                      title: library.title,
                      coach: library.coach,
                      link: library.link,
                  },
        );
        setEditDialogOpen(true);
    };

    const handleViewLibrary = (library, isMainLibrary) => {
        setLibraryToView({ ...library, isMainLibrary });
        setViewLibraryDialogOpen(true);
    };
    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        const validTypes = ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

        const validFiles = files.filter((file) => {
            // Validate file type
            if (!validTypes.includes(file.type)) {
                alert(`Invalid file type: ${file.name}`);
                return false;
            }
            // Validate file size
            if (file.size > MAX_FILE_SIZE) {
                alert(`File too large (max 10MB): ${file.name}`);
                return false;
            }

            return true;
        });
        console.log('documents : ', validFiles);
        setData('documents', [...(data.documents || []), ...validFiles]);
    };
    const destroyFile = (id) => {
        destroy(route('file.delete', { id: id }),{
            onSuccess:() => {
                setLibraryToEdit(prev => ({
                    ...prev,
                    filelibraries: prev.filelibraries.filter(file => file.id !== id)
                }));
                
            }
        }, );
    };
    const removeFile = (index) => {
        setData(
            'documents',
            data.documents.filter((_, i) => i !== index),
        );
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Libraries" />
            <div className="p-3 lg:p-6">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Library Management</h1>
                        <p className="text-muted-foreground mt-1">Organize and manage your educational content library</p>
                    </div>
                </div>

                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                                                                <div>
                                                                    <p className="font-medium">{library.title.en}</p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
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
                                                                    {/* //! add sub library manually */}
                                                                    {/* <DropdownMenuItem asChild>
                                                                        <Link href={`/admin/create/library/${library.id}/subLibrary`}>
                                                                            <FolderPlus className="mr-2 h-4 w-4" />
                                                                            Add Sub-Library
                                                                        </Link>
                                                                    </DropdownMenuItem> */}
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

                                                    {expandedLibraries.includes(library.id) &&
                                                        library.sublibraries.map((subLibrary) => (
                                                            <TableRow key={`sub-${subLibrary.id}`} className="bg-background">
                                                                <TableCell></TableCell>
                                                                <TableCell>
                                                                    <div className="border-primary/20 flex items-center gap-3 border-l-2 pl-6">
                                                                        <div>
                                                                            <p className="font-medium">{subLibrary.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
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
                </Tabs>

                {/* Delete Dialog */}
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
                                disabled={processing}
                            >
                                {processing ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Edit Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>{libraryToEdit?.isMainLibrary ? 'Edit Main Library' : 'Edit Sub-Library'}</DialogTitle>
                            <DialogDescription>Make changes to the library details below.</DialogDescription>
                        </DialogHeader>

                        {libraryToEdit && (
                            <div className="grid gap-4 py-4">
                                {libraryToEdit.isMainLibrary ? (
                                    <Tabs defaultValue="en">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="en">English</TabsTrigger>
                                            <TabsTrigger value="fr">French</TabsTrigger>
                                            <TabsTrigger value="ar">Arabic</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="en">
                                            <div className="space-y-2">
                                                <Label htmlFor="title.en">Title (English)</Label>
                                                <Input
                                                    id="title.en"
                                                    value={data.title?.en || ''}
                                                    onChange={(e) => handleNestedInputChange('title', 'en', e.target.value)}
                                                />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="fr">
                                            <div className="space-y-2">
                                                <Label htmlFor="title.fr">Title (French)</Label>
                                                <Input
                                                    id="title.fr"
                                                    value={data.title?.fr || ''}
                                                    onChange={(e) => handleNestedInputChange('title', 'fr', e.target.value)}
                                                />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="ar">
                                            <div className="space-y-2">
                                                <Label htmlFor="title.ar">Title (Arabic)</Label>
                                                <Input
                                                    id="title.ar"
                                                    value={data.title?.ar || ''}
                                                    onChange={(e) => handleNestedInputChange('title', 'ar', e.target.value)}
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                ) : (
                                    <ScrollArea>
                                        <div className="space-y-2">
                                            <Label htmlFor="coach">Title</Label>
                                            <Input id="title" value={data.title || ''} onChange={(e) => setData('title', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="coach">Coach</Label>
                                            <Input id="coach" value={data.coach || ''} onChange={(e) => setData('coach', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="youtubeId">YouTube Video ID</Label>
                                            <Input
                                                id="youtubeId"
                                                value={data.link || ''}
                                                onChange={(e) => setData('link', extractVideoId(e.target.value))}
                                            />
                                        </div>
                                        {data.filelibraries?.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                <h4 className="text-sm font-medium">Selected Files:</h4>
                                                <ul className="text-muted-foreground space-y-1 text-sm">
                                                    {data.filelibraries.map((file, index) => (
                                                        <li key={index} className="flex items-center justify-between">
                                                            <span>{file.name}</span>
                                                            <Button variant="ghost" size="sm" onClick={() => destroyFile(file.id)}>
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {data.documents?.length > 0 && (
                                            <ul className="text-muted-foreground space-y-1 text-sm">
                                                {data.documents.map((file, index) => (
                                                    <li key={index} className="flex items-center justify-between">
                                                        <span>{file.name}</span>
                                                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Documents</Label>
                                            <div className="flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6">
                                                <div className="text-muted-foreground mb-4">
                                                    <FileText className="h-12 w-12" />
                                                </div>
                                                <div className="text-muted-foreground flex text-sm">
                                                    <label
                                                        htmlFor="pdf-upload"
                                                        className="text-primary focus-within:ring-primary relative cursor-pointer rounded-md font-medium focus-within:ring-2 focus-within:outline-none"
                                                    >
                                                        <span>Upload a PDF</span>
                                                        <input
                                                            multiple
                                                            id="pdf-upload"
                                                            name="pdf-upload"
                                                            type="file"
                                                            accept=".pdf,.xls,.xlsx"
                                                            className="sr-only"
                                                            onChange={(e) => handleFile(e)}
                                                        />
                                                    </label>
                                                    <p className="pl-1">or enter URL</p>
                                                </div>
                                                <p className="text-muted-foreground mt-2 text-xs">PDF up to 50MB</p>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditSave} disabled={processing}>
                                {processing ? 'Saving...' : 'Save changes'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* View Dialog */}
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
                                                <div className="flex-1 space-y-3">
                                                    <h3 className="text-xl font-semibold">{libraryToView.title.en}</h3>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center">
                                                            <Layers className="text-muted-foreground mr-1 h-4 w-4" />
                                                            <span>{libraryToView.sublibraries.length} sub-libraries</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="font-medium">Sub-Libraries</h4>
                                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                    {libraryToView.sublibraries.map((sub) => (
                                                        <Card key={sub.id} className="overflow-hidden">
                                                            <div className="flex">
                                                                <CardContent className="flex-1 p-3">
                                                                    <h5 className="line-clamp-1 font-medium">{sub.title}</h5>
                                                                    <div className="text-muted-foreground mt-1 flex items-center text-xs">
                                                                        <Clock className="mr-1 h-3 w-3" />
                                                                        {sub.duration}
                                                                        <span className="mx-1">•</span>
                                                                        {sub.coach}
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
                                                <div className="bg-muted flex aspect-video w-full items-center justify-center overflow-hidden rounded-md">
                                                    {libraryToView.link ? (
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${libraryToView.link}`}
                                                            title={libraryToView.title}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="h-full w-full"
                                                        ></iframe>
                                                    ) : (
                                                        <p className="text-2xl text-black">No video provided</p>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <h3 className="text-xl font-semibold">{libraryToView.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <span className="text-muted-foreground">Coach:</span>
                                                        <span className="font-medium">{libraryToView.coach}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-semibold">Documents</h3>
                                                    <div className="space-y-3">
                                                        {libraryToView.filelibraries.map((doc, index) => (
                                                            <div
                                                                key={index}
                                                                className="hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors"
                                                            >
                                                                <div className="flex items-center">
                                                                    <div className="bg-primary/10 mr-3 flex h-10 w-10 items-center justify-center rounded">
                                                                        <File className="text-primary h-5 w-5" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium">{doc.name}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
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
