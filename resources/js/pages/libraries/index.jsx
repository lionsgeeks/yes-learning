import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import DashboardLayout from "@/components/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Play, Search } from "lucide-react"
// import Link from "next/link"
// import Image from "next/image"
import { Link } from "@inertiajs/react"

const breadcrumbs = [

    {
        title: "Libraries",
        href: `/library`,
    },
];
// Mock data for libraries
const libraries = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    coach: "Sarah Miller",
    date: "March 15, 2025",
    duration: "1h 20min",
    category: "Frontend",
    description: "Learn how to use React Hooks to simplify your functional components.",
    views: 245,
    thumbnail: "/placeholder.svg?height=180&width=320&text=React+Hooks",
  },
  {
    id: 2,
    title: "Advanced CSS Layouts",
    coach: "Michael Chen",
    date: "March 12, 2025",
    duration: "55min",
    category: "CSS",
    description: "Master CSS Grid and Flexbox for complex responsive layouts.",
    views: 189,
    thumbnail: "/placeholder.svg?height=180&width=320&text=CSS+Layouts",
  },
  {
    id: 3,
    title: "Backend Development with Node.js",
    coach: "David Wilson",
    date: "March 10, 2025",
    duration: "1h 45min",
    category: "Backend",
    description: "Build scalable server-side applications with Node.js and Express.",
    views: 312,
    thumbnail: "/placeholder.svg?height=180&width=320&text=Node.js",
  },
  {
    id: 4,
    title: "Database Design Principles",
    coach: "Emma Rodriguez",
    date: "March 8, 2025",
    duration: "1h 10min",
    category: "Database",
    description: "Learn best practices for designing efficient and scalable databases.",
    views: 178,
    thumbnail: "/placeholder.svg?height=180&width=320&text=Database+Design",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    coach: "Alex Johnson",
    date: "March 5, 2025",
    duration: "1h 30min",
    category: "Design",
    description: "Understand the principles of creating user-friendly interfaces.",
    views: 267,
    thumbnail: "/placeholder.svg?height=180&width=320&text=UI/UX+Design",
  },
  {
    id: 6,
    title: "JavaScript Performance Optimization",
    coach: "Sarah Miller",
    date: "March 3, 2025",
    duration: "1h 15min",
    category: "JavaScript",
    description: "Techniques to improve the performance of your JavaScript applications.",
    views: 203,
    thumbnail: "/placeholder.svg?height=180&width=320&text=JS+Performance",
  },
  {
    id: 7,
    title: "Responsive Web Design",
    coach: "Michael Chen",
    date: "February 28, 2025",
    duration: "1h 05min",
    category: "CSS",
    description: "Create websites that work well on all devices and screen sizes.",
    views: 231,
    thumbnail: "/placeholder.svg?height=180&width=320&text=Responsive+Design",
  },
  {
    id: 8,
    title: "API Development Best Practices",
    coach: "David Wilson",
    date: "February 25, 2025",
    duration: "1h 40min",
    category: "Backend",
    description: "Design and implement robust and scalable APIs for your applications.",
    views: 195,
    thumbnail: "/placeholder.svg?height=180&width=320&text=API+Development",
  },
]

export default function LibrariesPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Libraries</h1>
            <p className="text-muted-foreground mt-1">Access recorded coaching sessions and learning resources</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search libraries..." className="w-full sm:w-[260px] pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Libraries</TabsTrigger>
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {libraries.map((library) => (
                <Link key={library.id} href={`/library/${library.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                    <div className="relative aspect-video">
                      {/* <Image
                        src={library.thumbnail || "/placeholder.svg"}
                        alt={library.title}
                        width={320}
                        height={180}
                        className="object-cover w-full"
                      /> */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Button variant="secondary" size="sm" className="gap-1">
                          <Play className="h-4 w-4" />
                          Watch Now
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {library.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {library.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{library.views} views</span>
                      </div>
                      <h3 className="font-medium line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                        {library.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Coach: {library.coach} • {library.date}
                      </p>
                      <p className="text-sm line-clamp-2 text-muted-foreground">{library.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="frontend" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {libraries
                .filter((lib) => ["Frontend", "CSS", "JavaScript"].includes(lib.category))
                .map((library) => (
                  <Link key={library.id} href={`/libraries/${library.id}`} className="group">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      <div className="relative aspect-video">
                        <Image
                          src={library.thumbnail || "/placeholder.svg"}
                          alt={library.title}
                          width={320}
                          height={180}
                          className="object-cover w-full"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Button variant="secondary" size="sm" className="gap-1">
                            <Play className="h-4 w-4" />
                            Watch Now
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {library.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs font-normal">
                            {library.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{library.views} views</span>
                        </div>
                        <h3 className="font-medium line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                          {library.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Coach: {library.coach} • {library.date}
                        </p>
                        <p className="text-sm line-clamp-2 text-muted-foreground">{library.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          {/* Other tab contents would follow the same pattern */}
          <TabsContent value="backend" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {libraries
                .filter((lib) => lib.category === "Backend")
                .map((library) => (
                  <Link key={library.id} href={`/libraries/${library.id}`} className="group">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      {/* Card content same as above */}
                      <div className="relative aspect-video">
                        <Image
                          src={library.thumbnail || "/placeholder.svg"}
                          alt={library.title}
                          width={320}
                          height={180}
                          className="object-cover w-full"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Button variant="secondary" size="sm" className="gap-1">
                            <Play className="h-4 w-4" />
                            Watch Now
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {library.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs font-normal">
                            {library.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{library.views} views</span>
                        </div>
                        <h3 className="font-medium line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                          {library.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          Coach: {library.coach} • {library.date}
                        </p>
                        <p className="text-sm line-clamp-2 text-muted-foreground">{library.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

