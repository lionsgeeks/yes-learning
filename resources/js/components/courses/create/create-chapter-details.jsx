import React from 'react';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react';


const ChapterDetails = ({setActiveTab}) => {
    return (
        <>
                    <Card className=" col-span-3">
                                            <CardHeader>
                                                <CardTitle>Basic Information</CardTitle>
                                                <CardDescription>Enter the main details about your course</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="title">Course Title</Label>
                                                    <Input id="title" placeholder="Enter course title" />
                                                </div>
            
                                                <div className="space-y-2">
                                                    <Label htmlFor="description">Course Description</Label>
                                                    <Textarea
                                                        id="description"
                                                        placeholder="Describe what this course covers and its learning objectives"
                                                        rows={4}
                                                    />
                                                </div>
            
            
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="duration">Estimated Duration (hours)</Label>
                                                        <Input id="duration" type="number" min="1" placeholder="e.g., 8" />
                                                    </div>
            
                                                    <div className="space-y-2">
                                                        <Label htmlFor="prerequisites">Prerequisites</Label>
                                                        <Input id="prerequisites" placeholder="Any required prior knowledge" />
                                                    </div>
                                                </div>
            
                                                <div className="space-y-2">
                                                    <Label htmlFor="title">Tag Lines</Label>
                                                    <Input id="title" placeholder="Enter course Tagline separated by comma" />
                                                </div>
                                            </CardContent>
                                        </Card>
            
                                        <Card className=" col-span-2">
                                            <CardHeader>
                                                <CardTitle>Course Settings</CardTitle>
                                                <CardDescription>Configure additional course options</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="published">Published</Label>
                                                        <p className="text-sm text-muted-foreground">Make this course available to learners</p>
                                                    </div>
                                                    <Switch id="published" />
                                                </div>
            
                                                <Separator />
            
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="certificate">Enable Certificate</Label>
                                                        <p className="text-sm text-muted-foreground">Issue certificates upon course completion</p>
                                                    </div>
                                                    <Switch id="certificate" />
                                                </div>
            
                                                <Separator />
            
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label htmlFor="discussions">Enable Discussions</Label>
                                                        <p className="text-sm text-muted-foreground">Allow learners to discuss course content</p>
                                                    </div>
                                                    <Switch id="discussions" defaultChecked />
                                                </div>
                                            </CardContent>
                                            <div className="flex justify-end items-end  h-full">
                                                <Button onClick={() => setActiveTab("content")}>
                                                    Continue to Content
                                                    <Check className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
            
        </>
    );
};

export default ChapterDetails;