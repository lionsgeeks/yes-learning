import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const ChapterDetails = ({ setActiveTab, data, setData }) => {
    return (
        <>
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Enter the main details about your course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input 
                                className="mt-4" 
                                id="title" 
                                placeholder="Enter course title" 
                                value={data.title} 
                                onChange={(e) => setData({ ...data, title: e.target.value })} 
                            />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="duration">Estimated Duration (Minutes)</Label>
                            <Input 
                                className="mt-4" 
                                id="duration" 
                                type="number" 
                                min="1" 
                                placeholder="e.g., 8"
                                value={data.estimated_duration}
                                onChange={(e) => setData({ ...data, estimated_duration: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Course Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe what this course covers and its learning objectives"
                            className="h-[35vh] mt-4"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-2">
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
                        <Switch 
                            id="published" 
                            checked={data.published} 
                            onCheckedChange={(value) => setData({ ...data, published: value })} 
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="certificate">Enable Certificate</Label>
                            <p className="text-sm text-muted-foreground">Issue certificates upon course completion</p>
                        </div>
                        <Switch 
                            id="certificate" 
                            checked={data.enable_certificate} 
                            onCheckedChange={(value) => setData({ ...data, enable_certificate: value })} 
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="discussions">Enable Discussions</Label>
                            <p className="text-sm text-muted-foreground">Allow learners to discuss course content</p>
                        </div>
                        <Switch 
                            id="discussions" 
                            checked={data.enable_discussions} 
                            onCheckedChange={(value) => setData({ ...data, enable_discussions: value })} 
                        />
                    </div>
                </CardContent>
                <div className="flex justify-end items-end h-full mr-3">
                    <Button onClick={() => {setActiveTab("content")
                    }}>
                        Continue to Content
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card>
        </>
    );
};

export default ChapterDetails;
