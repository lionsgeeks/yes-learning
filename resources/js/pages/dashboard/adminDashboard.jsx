import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from '@/layouts/app-layout';
import { ArrowUpRight, BookOpen, FileText, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Head, Link, usePage } from "@inertiajs/react";
import AdminUsersTable from "@/components/usersComponents/admin-users-table.jsx"
import Achievement from "@/components/achievement/achievement.jsx"
import AdminDiscussionsTable from "@/components/discussions/admin-discussions-table.jsx";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import TransText from "@/components/TransText"
import TruncateText from "@/components/TruncateText"
import { useEffect, useState } from "react";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const breadcrumbs = [
    {
        title: 'AdminDashboard',
        href: '/AdminDashboard',
    },
];
export default function AdminDashboardPage() {
    const { userCount, libraryCount, completionCount, users, quizzes, courses } = usePage().props;

    const timeAgo = (dateString) => {
        const now = new Date();
        const pastDate = new Date(dateString);
        const diffTime = now - pastDate; // Difference in milliseconds
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Convert to days

        if (diffDays <= 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return '1 day ago';
        } else {
            return `${diffDays} days ago`;
        }
    }

    const data = {
        labels: ["Course 1", "Course 2", "Course 3", "Course 4"],
        datasets: [
            {
                data: [30, 50, 20, 40],
                backgroundColor: ["#fb0000", "#295da6", "#059925", "#b09417"],
            },
        ],
    };
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        let data = {
            labels: [],
            datasets: [
                {
                    data: [],
                    backgroundColor: [],
                },
            ],

        };
        courses.forEach(course => {
            const hex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
            data.labels.push(course.name);
            data.datasets[0].data.push(course.subscribed);
            data.datasets[0].backgroundColor.push(hex);
        });

        setChartData(data);
    }, []);

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="AdminDashboard" />

            <div className="lg:p-6 p-3">

                {/* <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-2">
                        <Button variant="outline">Export Data</Button>
                        <Button>Create New</Button>
                    </div>
                </div> */}

                <Tabs defaultValue="overview">
                    {/* <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList> */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{userCount}</div>
                                    {/* <p className="text-xs text-muted-foreground flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                                        <span className="text-green-500 font-medium">12%</span> from last month
                                    </p> */}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{courses.length}</div>
                                    {/* <p className="text-xs text-muted-foreground flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                                        <span className="text-green-500 font-medium">4</span> new this month
                                    </p> */}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Library Sessions</CardTitle>
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{libraryCount}</div>
                                    {/* <p className="text-xs text-muted-foreground flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                                        <span className="text-green-500 font-medium">8</span> new this month
                                    </p> */}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{completionCount}</div>
                                    {/* <p className="text-xs text-muted-foreground flex items-center mt-1">
                                        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                                        <span className="text-green-500 font-medium">18%</span> from last month
                                    </p> */}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Charts and Analytics */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>User Engagement</CardTitle>
                                    <CardDescription>Users Quiz Scores</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px] overflow-auto">
                                    {
                                        quizzes.length > 0 ? (
                                            quizzes.map((quiz, index) => (
                                                <div key={index} className={`py-3 px-2 border rounded ${index % 2 == 0 && "bg-gray-600/10"}`}>
                                                    <p className="w-full text-justify tracking-wide mb-2">
                                                        <span className="font-bold">
                                                            <TruncateText text={quiz.user.name} length="25" />
                                                        </span> passed <span className="font-bold">
                                                            <TruncateText text={JSON.parse(quiz.quiz.title).en} length="25" />
                                                        </span> with a score of <span className="font-bold text-alpha">{Math.round(quiz.score)}%</span>
                                                    </p>
                                                </div>
                                            ))
                                        ) :
                                            <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                                                <p className="text-muted-foreground">No User Engagement Yet.</p>
                                            </div>
                                    }
                                </CardContent>
                            </Card>
                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Course Popularity</CardTitle>
                                    <CardDescription>Most active courses by enrollment</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                                        <Doughnut data={chartData || data} options={options} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>Common administrative tasks</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="outline" className="w-full justify-between" asChild>
                                        <Link href="/admin/courses">
                                            Create New Course
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-between" asChild>
                                        <Link href="/admin/create/library">
                                            Upload Library Session
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    {/* <Button variant="outline" className="w-full justify-between" asChild>
                                        <Link href="/admin/users/create">
                                            Add New User
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button> */}
                                    <Button variant="outline" className="w-full justify-between" asChild>
                                        <Link href="/settings/profile">
                                            Platform Settings
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Signups</CardTitle>
                                    <CardDescription>New users in the last 7 days</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {users.slice(0,4).map((user, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                                <div className="ml-auto text-xs text-muted-foreground">
                                                    {timeAgo(user.created_at)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* <Card>
                                <CardHeader>
                                    <CardTitle>System Status</CardTitle>
                                    <CardDescription>Platform health and metrics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Server Status</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Operational</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Database</span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Healthy</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Storage</span>
                                            <span className="text-xs">68% used</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">API Requests</span>
                                            <span className="text-xs">2.4k/min</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Last Backup</span>
                                            <span className="text-xs">Today, 04:30 AM</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card> */}
                        </div>
                    </TabsContent>

                    <TabsContent value="activity">
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>Latest actions across the platform</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mt-1">
                                                {i % 3 === 0 ? (
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                ) : i % 3 === 1 ? (
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">
                                                        {i % 3 === 0 ? "User Registration" : i % 3 === 1 ? "Course Update" : "Library Session Added"}
                                                    </span>{" "}
                                                    -{" "}
                                                    {i % 3 === 0
                                                        ? `New user registered: user${i}@example.com`
                                                        : i % 3 === 1
                                                            ? `Course "${["Web Development", "UI/UX Design", "Data Science"][i % 3]}" was updated`
                                                            : `New library session "${["JavaScript Fundamentals", "React Hooks Deep Dive", "CSS Grid Mastery"][i % 3]
                                                            }" was added`}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.floor(i / 2)} hour{Math.floor(i / 2) !== 1 ? "s" : ""} ago
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        by {["Admin", "Sarah Miller", "David Wilson"][i % 3]}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reports">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>User Growth Report</CardTitle>
                                    <CardDescription>Monthly user registration trends</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[200px]">
                                    <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                                        <p className="text-muted-foreground">User Growth Chart</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Completion Report</CardTitle>
                                    <CardDescription>Completion rates by course</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[200px]">
                                    <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                                        <p className="text-muted-foreground">Completion Rate Chart</p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Revenue Report</CardTitle>
                                    <CardDescription>Monthly revenue breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[200px]">
                                    <div className="h-full w-full bg-muted/20 rounded-md flex items-center justify-center">
                                        <p className="text-muted-foreground">Revenue Chart</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            <AdminUsersTable
                title="Manage Users"
                description="Check Students Information"
                Users={users}
                role={1}
                courses={1}
                joinDate={1}
                showAddButton={false}
            />
            {/* <Achievement achievement={initialAchievements }/> */}
        </AppLayout>
    )
}

