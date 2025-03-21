import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "@inertiajs/react"


export default function QuizStudentScore() {
    // This would normally fetch the students based on the module ID
    const students = [
        {
            id: "1",
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            progress: 85,
            lastActive: "Today",
            status: "active",
        },
        {
            id: "2",
            name: "Sarah Williams",
            email: "sarah.williams@example.com",
            progress: 72,
            lastActive: "Yesterday",
            status: "active",
        },
        {
            id: "3",
            name: "Michael Chen",
            email: "michael.chen@example.com",
            progress: 45,
            lastActive: "2 weeks ago",
            status: "inactive",
        },
        {
            id: "4",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@example.com",
            progress: 92,
            lastActive: "3 days ago",
            status: "active",
        },
        {
            id: "5",
            name: "David Wilson",
            email: "david.wilson@example.com",
            progress: 68,
            lastActive: "1 week ago",
            status: "active",
        },
    ]

    return (
        <div className="sticky top-0 right-0">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead className="lg:hidden">Status</TableHead>
                        <TableHead className="lg:hidden">Last Active</TableHead>
                        {/* <TableHead></TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Avatar>
                                        <AvatarImage src="/placeholder.svg" alt={student.name} />
                                        <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">
                                <span className=" font-medium">{student.progress}%</span>
                            </TableCell>
                            <TableCell className="lg:hidden">
                                <Badge variant={student.status === "active" ? "default" : "outline"}>{student.status}</Badge>
                            </TableCell>
                            <TableCell className="lg:hidden">{student.lastActive}</TableCell>
                            {/* <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/students/${student.id}`}>View student profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>Send message</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">Remove from module</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

