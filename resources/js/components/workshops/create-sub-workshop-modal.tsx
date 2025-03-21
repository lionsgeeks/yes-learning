"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CreateSubWorkshopModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateSubWorkshopModal({ open, onOpenChange }: CreateSubWorkshopModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    course: "",
    date: "",
    time: "",
    duration: "90",
    languages: {
      english: {
        instructor: "",
        meetLink: "",
      },
      french: {
        instructor: "",
        meetLink: "",
      },
      arabic: {
        instructor: "",
        meetLink: "",
      },
    },
    preferences: {
      recordSession: false,
      allowQuestions: true,
      requireRegistration: true,
      sendNotifications: true,
      notificationTime: "24h",
      published: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleLanguageChange = (language: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [language]: {
          ...prev.languages[language as keyof typeof prev.languages],
          [field]: value,
        },
      },
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    // In a real app, you would submit the form data here
    console.log(formData)
    onOpenChange(false)
    setStep(1)
  }

  const isStep1Valid = formData.name && formData.description && formData.date && formData.time && formData.duration

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) setStep(1)
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Sub-Workshop</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Enter basic information about the sub-workshop"
              : step === 2
                ? "Configure language-specific settings for the sub-workshop"
                : "Set sub-workshop preferences and notification settings"}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Step {step} of 3</div>
            <div className="text-sm text-muted-foreground">
              {step === 1 ? "Basic Info" : step === 2 ? "Language Settings" : "Preferences"}
            </div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Sub-Workshop Title</Label>
              <Input id="name" placeholder="Enter title" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Associated Course</Label>
              <Select value={formData.course} onValueChange={(value) => handleSelectChange("course", value)}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML Basics</SelectItem>
                  <SelectItem value="css">CSS Basics</SelectItem>
                  <SelectItem value="js">JS Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={formData.time} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="90"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <Tabs defaultValue="english">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="french">French</TabsTrigger>
                <TabsTrigger value="arabic">Arabic</TabsTrigger>
              </TabsList>

              <TabsContent value="english" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="english-instructor">Instructor</Label>
                  <Select
                    value={formData.languages.english.instructor}
                    onValueChange={(value) => handleLanguageChange("english", "instructor", value)}
                  >
                    <SelectTrigger id="english-instructor">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="english-meet">Google Meet Link</Label>
                  <Input
                    id="english-meet"
                    placeholder="https://meet.google.com/..."
                    value={formData.languages.english.meetLink}
                    onChange={(e) => handleLanguageChange("english", "meetLink", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="french" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="french-instructor">Instructor</Label>
                  <Select
                    value={formData.languages.french.instructor}
                    onValueChange={(value) => handleLanguageChange("french", "instructor", value)}
                  >
                    <SelectTrigger id="french-instructor">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marie">Marie Dubois</SelectItem>
                      <SelectItem value="pierre">Pierre Laurent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="french-meet">Google Meet Link</Label>
                  <Input
                    id="french-meet"
                    placeholder="https://meet.google.com/..."
                    value={formData.languages.french.meetLink}
                    onChange={(e) => handleLanguageChange("french", "meetLink", e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="arabic" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="arabic-instructor">Instructor</Label>
                  <Select
                    value={formData.languages.arabic.instructor}
                    onValueChange={(value) => handleLanguageChange("arabic", "instructor", value)}
                  >
                    <SelectTrigger id="arabic-instructor">
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                      <SelectItem value="fatima">Fatima Khalid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arabic-meet">Google Meet Link</Label>
                  <Input
                    id="arabic-meet"
                    placeholder="https://meet.google.com/..."
                    value={formData.languages.arabic.meetLink}
                    onChange={(e) => handleLanguageChange("arabic", "meetLink", e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Record Session</Label>
                  <p className="text-xs text-muted-foreground">Automatically record the workshop for later viewing</p>
                </div>
                <Switch
                  checked={formData.preferences.recordSession}
                  onCheckedChange={(checked) => handlePreferenceChange("recordSession", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Questions</Label>
                  <p className="text-xs text-muted-foreground">Enable Q&A during the workshop</p>
                </div>
                <Switch
                  checked={formData.preferences.allowQuestions}
                  onCheckedChange={(checked) => handlePreferenceChange("allowQuestions", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Registration</Label>
                  <p className="text-xs text-muted-foreground">Students must register before joining</p>
                </div>
                <Switch
                  checked={formData.preferences.requireRegistration}
                  onCheckedChange={(checked) => handlePreferenceChange("requireRegistration", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Notifications</Label>
                  <p className="text-xs text-muted-foreground">Notify enrolled students about this workshop</p>
                </div>
                <Switch
                  checked={formData.preferences.sendNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange("sendNotifications", checked)}
                />
              </div>

              {formData.preferences.sendNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="notificationTime">Notification Schedule</Label>
                  <Select
                    value={formData.preferences.notificationTime}
                    onValueChange={(value) => handlePreferenceChange("notificationTime", value)}
                  >
                    <SelectTrigger id="notificationTime">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 hours before workshop</SelectItem>
                      <SelectItem value="1h">1 hour before workshop</SelectItem>
                      <SelectItem value="both">Both 24 hours and 1 hour before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Publish Sub-Workshop</Label>
                  <p className="text-xs text-muted-foreground">Make this sub-workshop visible to students</p>
                </div>
                <Switch
                  checked={formData.preferences.published}
                  onCheckedChange={(checked) => handlePreferenceChange("published", checked)}
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={nextStep} disabled={!isStep1Valid}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {step === 2 ? (
                <Button onClick={nextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Create Sub-Workshop</Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

