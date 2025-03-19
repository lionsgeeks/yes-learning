"use client";

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
import { Edit, Eye, Filter, Lock, MessageSquare, MoreHorizontal, Search, Trash2, Unlock } from "lucide-react";
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



export default function AdminDiscussionsTable({
  Discussions ,
  title = "Discussions",
  description = "Monitor and moderate discussion forums",
  showHeader = true,
  onDiscussionUpdate,
  onDiscussionDelete,
  onDiscussionView,
}) {
  const [discussions, setDiscussions] = useState(Discussions);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [discussionToDelete, setDiscussionToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [discussionToEdit, setDiscussionToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredDiscussions = discussions.filter(
    (discussion) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (discussionId) => {
    setDiscussionToDelete(discussionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (discussionToDelete) {
      // If external handler is provided, call it
      if (onDiscussionDelete) {
        onDiscussionDelete(discussionToDelete);
      }

      // Update local state
      setDiscussions(discussions.filter((discussion) => discussion.id !== discussionToDelete));
      setDeleteDialogOpen(false);
      setDiscussionToDelete(null);
    }
  };

  const handleEditClick = (discussion) => {
    setDiscussionToEdit({ ...discussion });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!discussionToEdit) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const updatedDiscussions = discussions.map((discussion) =>
        discussion.id === discussionToEdit.id ? discussionToEdit : discussion
      );

      // If external handler is provided, call it
      if (onDiscussionUpdate && discussionToEdit) {
        onDiscussionUpdate(discussionToEdit);
      }

      // Update local state
      setDiscussions(updatedDiscussions);
      setEditDialogOpen(false);
      setDiscussionToEdit(null);
      setIsSubmitting(false);
    }, 500);
  };

  const handleToggleStatus = (discussionId) => {
    const discussionToToggle = discussions.find((discussion) => discussion.id === discussionId);
    if (!discussionToToggle) return;

    const newStatus =
      discussionToToggle.status === "Active"
        ? "Locked"
        : discussionToToggle.status === "Locked"
        ? "Active"
        : discussionToToggle.status;

    const updatedDiscussion = {
      ...discussionToToggle,
      status: newStatus,
    };

    // If external handler is provided, call it
    if (onDiscussionUpdate) {
      onDiscussionUpdate(updatedDiscussion);
    }

    // Update local state
    setDiscussions(
      discussions.map((discussion) => {
        if (discussion.id === discussionId) {
          return updatedDiscussion;
        }
        return discussion;
      })
    );
  };

  const handleViewDiscussion = (discussionId) => {
    // If external handler is provided, call it
    if (onDiscussionView) {
      onDiscussionView(discussionId);
    } else {
      // Default behavior - log to console
      console.log(`Viewing discussion ${discussionId}`);
    }
  };

  return (
    <>
    <div className="p-6">
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && <p className="text-muted-foreground mt-1">{description}</p>}
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Discussions</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search discussions..."
                  className="w-full sm:w-[260px] pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Badge variant="outline">Active</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Badge variant="outline">Archived</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Badge variant="outline">Locked</Badge>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Title</TableHead>
                <TableHead className="w-[30%]">Author</TableHead>
                <TableHead className="w-[20%]">Course</TableHead>
                <TableHead className="w-[10%]">Replies</TableHead>
                <TableHead className="w-[10%]">Status</TableHead>
                <TableHead className="w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscussions.map((discussion) => (
                <TableRow key={discussion.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                        <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>{discussion.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{discussion.author}</TableCell>
                  <TableCell>{discussion.course}</TableCell>
                  <TableCell>{discussion.replies}</TableCell>
                  <TableCell>
                    <Badge variant={discussion.status === "Active" ? "outline" : "secondary"}>
                      {discussion.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" onClick={() => handleViewDiscussion(discussion.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => handleEditClick(discussion)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => handleDeleteClick(discussion.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => handleToggleStatus(discussion.id)}>
                        {discussion.status === "Locked" ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Discussion Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Discussion</DialogTitle>
          </DialogHeader>
          {discussionToEdit && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discussion-title">Title</Label>
                <Input
                  id="discussion-title"
                  value={discussionToEdit.title}
                  onChange={(e) => setDiscussionToEdit({ ...discussionToEdit, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discussion-status">Status</Label>
                <Select
                  value={discussionToEdit.status}
                  onValueChange={(value) =>
                    setDiscussionToEdit({ ...discussionToEdit, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Locked">Locked</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setEditDialogOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleEditSave} disabled={isSubmitting}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Discussion Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the discussion. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
    </>
  );
}
