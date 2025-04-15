import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Filter, Lock, MoreHorizontal, Search, Trash2, Unlock, UserPlus } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "@inertiajs/react";



export default function AdminUsersTable({
    Users,
    title,
    description,
    showAddButton = true,
    addButtonLink = "/admin/users/create",
    onUserUpdate,
    onUserDelete,
    role,
    courses,
    joinDate,
}) {
    const [users, setUsers] = useState(Users);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredUsers = users.filter(
        (user) =>
            user.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            user.role?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (userToDelete) {
            if (onUserDelete) {
                onUserDelete(userToDelete);
            }
            setUsers(users.filter((user) => user.id !== userToDelete));
            setDeleteDialogOpen(false);
            setUserToDelete(null);
        }
    };

    const handleEditClick = (user) => {
        setUserToEdit({ ...user });
        setEditDialogOpen(true);
    };

    const handleEditSave = () => {
        if (!userToEdit) return;
        setIsSubmitting(true);

        setTimeout(() => {
            const updatedUsers = users.map((user) => (user.id === userToEdit.id ? userToEdit : user));

            if (onUserUpdate && userToEdit) {
                onUserUpdate(userToEdit);
            }

            setUsers(updatedUsers);
            setEditDialogOpen(false);
            setUserToEdit(null);
            setIsSubmitting(false);
        }, 500);
    };

    const handleToggleStatus = (userId) => {
        const userToToggle = users.find((user) => user.id === userId);
        if (!userToToggle) return;

        const updatedUser = {
            ...userToToggle,
            status: userToToggle.status === "Active" ? "Inactive" : "Active",
        };

        if (onUserUpdate) {
            onUserUpdate(updatedUser);
        }

        setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
    };

    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const [weekday, month, day, year] = formattedDate.split(' ');
        return `${weekday} ${day} ${month} ${year}`;
    }
    return (
        <>
            <div className="lg:p-6 p-3">
                <div className="flex flex-row items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        {description && <p className="text-muted-foreground mt-1">{description}</p>}
                    </div>
                    {showAddButton && (
                        <div className="flex items-center gap-2">
                            <Button asChild>
                                <Link href={addButtonLink}>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Add User
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <CardTitle>Users</CardTitle>
                            <div className="flex items-center sm:justify-normal justify-evenly gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search users..."
                                        className="w-full sm:w-[260px] pl-9"
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
                    <CardContent >
                        <Table>
                            <TableHeader>
                                <TableRow className="lg:flex-row lg:flex hidden w-full">
                                    <TableHead className="w-full ">User</TableHead>
                                    {role && <TableHead className="w-full">Role</TableHead>}
                                    {/* <TableHead className="w-full">Status</TableHead> */}
                                    {courses && <TableHead className="w-full">Subscribed Courses</TableHead>}
                                    {joinDate && <TableHead className="w-full">Join Date</TableHead>}
                                    {/* <TableHead className="text-right w-full">Actions</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="flex-col flex gap-y-2">
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="flex flex-col  p-2 rounded-lg lg:flex-row w-full border-2 lg:border-1">
                                        <TableCell className="w-full">
                                            <div className="flex items-center gap-3 justify-between">
                                                <div className="flex">
                                                    <Avatar>
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>
                                                            {user.name.charAt(0)}
                                                            {user.name.split(" ")[1]?.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                                <div className="lg:hidden">

                                                    <DropdownMenu >
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Actions</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem onClick={() => handleEditClick(user)}>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            {user.status === "Active" ? (
                                                                <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                                                    <Lock className="h-4 w-4 mr-2" />
                                                                    Deactivate
                                                                </DropdownMenuItem>
                                                            ) : (
                                                                <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                                                    <Unlock className="h-4 w-4 mr-2" />
                                                                    Activate
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(user.id)}>
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </TableCell>
                                        {
                                            role && <TableCell className="w-full">
                                                <Badge
                                                    variant={
                                                        user.role === "admin"
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {user.role === "admin" ? "Admin" : "User"}
                                                </Badge>
                                            </TableCell>
                                        }
                                        {/* <TableCell className="w-full">
                                            <Badge
                                                variant={user.status === "Active" ? "outline" : "secondary"}
                                                className={
                                                    user.status === "Active"
                                                        ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                                                        : ""
                                                }
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell> */}
                                        {courses && <TableCell className="w-full">{user.courses}</TableCell>}
                                        {joinDate && <TableCell className="w-full">{formatDate(user.created_at)}</TableCell>}
                                        {/* <TableCell className="text-right w-full lg:flex hidden lg:items-end lg:justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleEditClick(user)}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    {user.status === "Active" ? (
                                                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                                            <Lock className="h-4 w-4 mr-2" />
                                                            Deactivate
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                                            <Unlock className="h-4 w-4 mr-2" />
                                                            Activate
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(user.id)}>
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <TableRow className="flex flex-col  p-2 rounded-lg lg:flex-row w-full">
                                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground w-full">
                                            No users found. Try adjusting your search.
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
                                This will permanently delete this user account and all associated data. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                className="bg-destructive  text-white hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Edit User Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>Make changes to the user details below.</DialogDescription>
                        </DialogHeader>
                        {userToEdit && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={userToEdit.name}
                                            onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userToEdit.email}
                                            onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={userToEdit.role}
                                            onValueChange={(value) => setUserToEdit({ ...userToEdit, role: value })}
                                        >
                                            <SelectTrigger id="role">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Student">Student</SelectItem>
                                                <SelectItem value="Instructor">Instructor</SelectItem>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={userToEdit.status}
                                            onValueChange={(value) => setUserToEdit({ ...userToEdit, status: value })}
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="courses">Enrolled Courses</Label>
                                    <Input
                                        id="courses"
                                        type="number"
                                        value={userToEdit.courses}
                                        onChange={(e) => setUserToEdit({ ...userToEdit, courses: Number.parseInt(e.target.value) || 0 })}
                                        disabled={userToEdit.status === "Inactive"}
                                    />
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleEditSave} disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
