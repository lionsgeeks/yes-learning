"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2, Users } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "@inertiajs/react"

// Mock data for achievements


// Simple achievement icon component
function AchievementIcon({ icon, size = "sm" }) {
  const sizeClasses = {
    sm: "h-10 w-10 text-xl",
    md: "h-14 w-14 text-2xl",
    lg: "h-20 w-20 text-3xl",
  }

  return (
    <div className={`flex items-center justify-center rounded-full bg-primary/10 ${sizeClasses[size]}`}>{icon}</div>
  )
}

export default function Achievement({ limit, showHeader = true, showActions = true, className = "p-6"  ,achievement }) {
  const [achievements, setAchievements] = useState(limit ? achievement.slice(0, limit) : achievement)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [achievementToDelete, setAchievementToDelete] = useState(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [achievementToEdit, setAchievementToEdit] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewUsersDialogOpen, setViewUsersDialogOpen] = useState(false)
  const [selectedAchievementId, setSelectedAchievementId] = useState(null)

  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (achievementId) => {
    setAchievementToDelete(achievementId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (achievementToDelete) {
      setAchievements(achievements.filter((achievement) => achievement.id !== achievementToDelete))
      setDeleteDialogOpen(false)
      setAchievementToDelete(null)
    }
  }

  const handleEditClick = (achievement) => {
    setAchievementToEdit({ ...achievement })
    setEditDialogOpen(true)
  }

  const handleEditSave = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setAchievements(
        achievements.map((achievement) => (achievement.id === achievementToEdit?.id ? achievementToEdit : achievement)),
      )
      setEditDialogOpen(false)
      setAchievementToEdit(null)
      setIsSubmitting(false)
    }, 500)
  }

  const handleViewUsers = (achievementId) => {
    setSelectedAchievementId(achievementId)
    setViewUsersDialogOpen(true)
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Easy</Badge>
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>
      case "Hard":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hard</Badge>
      default:
        return <Badge variant="outline">{difficulty}</Badge>
    }
  }

  return (
    <div className={className}>
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-muted-foreground mt-1">Manage platform achievements</p>
          </div>
       
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Recent Achievements</CardTitle>
            {showActions && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search achievements..."
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
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Achievement</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Earned By</TableHead>
                {showActions && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAchievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <AchievementIcon icon={achievement.icon} size="sm" />
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{achievement.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{achievement.category}</Badge>
                  </TableCell>
                  <TableCell>{getDifficultyBadge(achievement.difficulty)}</TableCell>
                  <TableCell>{achievement.points}</TableCell>
                  <TableCell>
                    <Badge
                      variant={achievement.status === "Active" ? "default" : "secondary"}
                      className={achievement.status === "Active" ? "" : "opacity-70"}
                    >
                      {achievement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{achievement.earnedBy}</span>
                    </div>
                  </TableCell>
                  {showActions && (
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
                          <DropdownMenuItem onClick={() => handleEditClick(achievement)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewUsers(achievement.id)}>
                            <Users className="h-4 w-4 mr-2" />
                            View Users
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/achievements/${achievement.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick(achievement.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {filteredAchievements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={showActions ? 7 : 6} className="text-center py-8 text-muted-foreground">
                    No achievements found. Try adjusting your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {limit && achievements.length > 0 && (
            <div className="mt-4 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/admin/achievements">View All Achievements</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this achievement. Users who have already earned it will lose it from their
              profile. This action cannot be undone.
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

      {/* Edit Achievement Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Achievement</DialogTitle>
            <DialogDescription>Make changes to the achievement details below.</DialogDescription>
          </DialogHeader>
          {achievementToEdit && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Achievement Name</Label>
                <Input
                  id="name"
                  value={achievementToEdit.name}
                  onChange={(e) => setAchievementToEdit({ ...achievementToEdit, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={achievementToEdit.description}
                  onChange={(e) => setAchievementToEdit({ ...achievementToEdit, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={achievementToEdit.category}
                    onValueChange={(value) => setAchievementToEdit({ ...achievementToEdit, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Course">Course</SelectItem>
                      <SelectItem value="Assessment">Assessment</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={achievementToEdit.difficulty}
                    onValueChange={(value) => setAchievementToEdit({ ...achievementToEdit, difficulty: value })}
                  >
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={achievementToEdit.points}
                    onChange={(e) =>
                      setAchievementToEdit({
                        ...achievementToEdit,
                        points: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={achievementToEdit.icon}
                    onChange={(e) => setAchievementToEdit({ ...achievementToEdit, icon: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={achievementToEdit.status}
                  onValueChange={(value) => setAchievementToEdit({ ...achievementToEdit, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="auto-award"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={achievementToEdit.autoAward}
                  onChange={(e) => setAchievementToEdit({ ...achievementToEdit, autoAward: e.target.checked })}
                />
                <Label htmlFor="auto-award">Automatically award achievement when criteria is met</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Users Dialog */}
      <Dialog open={viewUsersDialogOpen} onOpenChange={setViewUsersDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Users with this Achievement</DialogTitle>
            <DialogDescription>
              {selectedAchievementId &&
                `Viewing users who have earned "${achievements.find((a) => a.id === selectedAchievementId)?.name}"`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date Earned</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Mock data for users who earned the achievement */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">User Name {i}</p>
                          <p className="text-xs text-muted-foreground">user{i}@example.com</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{`March ${10 + i}, 2025`}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewUsersDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

