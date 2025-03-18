
import { useState } from "react"
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, ChevronLeft, Clock, Medal, Share2, Trophy, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AchievementDetailPage({ params }) {
  const achievementId = 1
  const [isUnlocked, setIsUnlocked] = useState(achievementId <= 3)

  // Mock achievement data
  const achievement = {
    id: achievementId,
    name:
      achievementId === 1
        ? "First Course"
        : achievementId === 2
          ? "Perfect Score"
          : achievementId === 3
            ? "Fast Learner"
            : achievementId === 4
              ? "Discussion Expert"
              : achievementId === 5
                ? "Weekly Streak"
                : `Achievement ${achievementId}`,
    description:
      achievementId === 1
        ? "Complete your first course on the platform"
        : achievementId === 2
          ? "Score 100% on a module assessment"
          : achievementId === 3
            ? "Complete a course in under 3 days"
            : achievementId === 4
              ? "Post 10 comments in discussions"
              : achievementId === 5
                ? "Log in 7 days in a row"
                : "Complete specific activities to unlock this achievement",
    icon: achievementId === 1 ? BookOpen : achievementId === 2 ? Trophy : achievementId === 3 ? Clock : Award,
    dateEarned: isUnlocked ? "March 10, 2025" : null,
    category:
      achievementId === 1 || achievementId === 3
        ? "Course Completion"
        : achievementId === 2
          ? "Assessment"
          : achievementId === 4
            ? "Community"
            : achievementId === 5
              ? "Engagement"
              : "General",
    rarity:
      achievementId === 1
        ? "Common (45% of users)"
        : achievementId === 2
          ? "Rare (15% of users)"
          : achievementId === 3
            ? "Very Rare (5% of users)"
            : achievementId === 4
              ? "Ultra Rare (2% of users)"
              : "Legendary (1% of users)",
    points:
      achievementId === 1 ? 10 : achievementId === 2 ? 25 : achievementId === 3 ? 50 : achievementId === 4 ? 75 : 100,
    progress: isUnlocked ? 100 : achievementId === 4 ? 70 : achievementId === 5 ? 40 : 0,
    criteria:
      achievementId === 1
        ? "Complete any course on the platform"
        : achievementId === 2
          ? "Answer all questions correctly in any module assessment"
          : achievementId === 3
            ? "Complete all lessons in a course within 72 hours of starting"
            : achievementId === 4
              ? "Post at least 10 comments in course discussions"
              : achievementId === 5
                ? "Log in to the platform for 7 consecutive days"
                : "Complete specific activities to unlock this achievement",
    steps:
      achievementId === 1
        ? [
            { id: 1, name: "Enroll in a course", completed: true },
            { id: 2, name: "Complete all modules", completed: true },
            { id: 3, name: "Pass the final assessment", completed: true },
          ]
        : achievementId === 2
          ? [
              { id: 1, name: "Take a module assessment", completed: true },
              { id: 2, name: "Answer all questions correctly", completed: true },
            ]
          : achievementId === 3
            ? [
                { id: 1, name: "Start a course", completed: true },
                { id: 2, name: "Complete all lessons within 3 days", completed: true },
              ]
            : achievementId === 4
              ? [
                  { id: 1, name: "Post your first comment", completed: true },
                  { id: 2, name: "Post 5 comments", completed: true },
                  { id: 3, name: "Post 10 comments", completed: false },
                ]
              : achievementId === 5
                ? [
                    { id: 1, name: "Log in for 1 day", completed: true },
                    { id: 2, name: "Log in for 3 consecutive days", completed: true },
                    { id: 3, name: "Log in for 5 consecutive days", completed: false },
                    { id: 4, name: "Log in for 7 consecutive days", completed: false },
                  ]
                : [
                    { id: 1, name: "Step 1", completed: false },
                    { id: 2, name: "Step 2", completed: false },
                    { id: 3, name: "Step 3", completed: false },
                  ],
    relatedAchievements: [
      { id: achievementId === 1 ? 3 : 1, name: achievementId === 1 ? "Fast Learner" : "First Course" },
      { id: achievementId === 2 ? 4 : 2, name: achievementId === 2 ? "Discussion Expert" : "Perfect Score" },
      { id: achievementId === 3 ? 5 : 3, name: achievementId === 3 ? "Weekly Streak" : "Fast Learner" },
    ],
    recentEarners: [
      { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Sarah Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 4, name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  }

  const AchievementIcon = achievement.icon

  return (
    <AppLayout>
      <div className="p-6">
        <Link
          href="/achivement"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Achievements
        </Link>
        <h1 className="text-3xl font-bold mt-2">{achievement.name}</h1>
        <p className="text-muted-foreground">{achievement.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Main achievement info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center space-x-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${isUnlocked ? "bg-primary/10" : "bg-muted"}`}
              >
                <AchievementIcon className={`h-8 w-8 ${isUnlocked ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div>
                <CardTitle>{achievement.name}</CardTitle>
                <CardDescription>
                  {isUnlocked ? (
                    <span className="text-green-600 font-medium">Earned on {achievement.dateEarned}</span>
                  ) : (
                    <span>Not yet earned</span>
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Category</div>
                      <div className="flex items-center">
                        <Badge variant="outline">{achievement.category}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Rarity</div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="bg-primary/5">
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Points Value</div>
                      <div className="flex items-center">
                        <Medal className="h-4 w-4 mr-1 text-amber-500" />
                        <span>{achievement.points} points</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Status</div>
                      <div className="flex items-center">
                        {isUnlocked ? (
                          <Badge className="bg-green-500">Unlocked</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-muted">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">How to Earn</h3>
                    <p className="text-muted-foreground">{achievement.criteria}</p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Achievement Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-0.5 text-primary">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Earn {achievement.points} points toward your level progression</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-0.5 text-primary">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Display this achievement on your profile</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-0.5 text-primary">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Unlock related achievements in this category</span>
                      </li>
                    </ul>
                  </div>
                </TabsContent>

               
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          <div className="space-y-6">
            {/* Actions */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isUnlocked ? (
                  <Button className="w-full" variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Achievement
                  </Button>
                ) : (
                  <Button className="w-full" asChild>
                    <Link href={achievementId === 4 ? "/course/1" : achievementId === 5 ? "/dashboard" : "/courses"}>
                      Start Working on This
                    </Link>
                  </Button>
                )}

                <Button className="w-full" variant="outline" asChild>
                  <Link href="/achievements">View All Achievements</Link>
                </Button>
              </CardContent>
            </Card> */}

         

            {/* Achievement stats */}
            <Card>
              <CardHeader>
                <CardTitle>Achievement Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Rarity</span>
                    <Badge variant="outline" className="bg-primary/5">
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Category</span>
                    <Badge variant="outline">{achievement.category}</Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Points Value</span>
                    <div className="flex items-center">
                      <Medal className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{achievement.points}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Added to Platform</span>
                    <span className="text-sm">January 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

