"use client"

import { useState, useEffect } from "react"
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
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useForm } from "@inertiajs/react"

export function UpdateSubWorkshopModal({ open, onOpenChange, chapters, subWorkshop }) {

    const [step, setStep] = useState(1)

  const { data, setData, put, processing, errors } = useForm({
    // name: subWorkshop.name ,
    workshop_id:  subWorkshop.workshop_id ,
    // description: subWorkshop.description ,
        // prerequisite: subWorkshop.prerequisite ,
        chapter_id: subWorkshop.chapter_id ,
        date: subWorkshop.date ,
    time: subWorkshop.time ,
    duration: subWorkshop.duration,

    name:{
        en: JSON.parse(subWorkshop.name).en,
        fr:  JSON.parse(subWorkshop.name).fr,
        ar:  JSON.parse(subWorkshop.name).ar,
    },
    description:{
        en: JSON.parse(subWorkshop.description).en,
        fr:  JSON.parse(subWorkshop.description).fr,
        ar:  JSON.parse(subWorkshop.description).ar,
    },

    prerequisite:{
        en: JSON.parse(subWorkshop.prerequisite).en,
        fr:  JSON.parse(subWorkshop.prerequisite).fr,
        ar:  JSON.parse(subWorkshop.prerequisite).ar
    },


    instructor:  {
        en: JSON.parse(subWorkshop.instructor).en,
      fr: JSON.parse(subWorkshop.instructor).fr,
      ar: JSON.parse(subWorkshop.instructor).ar,
    }
    ,
    meetLink: {
        en: JSON.parse(subWorkshop.meetLink).en,
        fr: JSON.parse(subWorkshop.meetLink).fr,
        ar: JSON.parse(subWorkshop.meetLink).ar,
    },
    allowQuestions: subWorkshop.allowQuestions ,
    requireRegistration: subWorkshop.requireRegistration ,
    sendNotifications: subWorkshop.sendNotifications ,
    notificationTime:  "24h",
    published: subWorkshop.published ,




})

// console.log(subWorkshop.name);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    put(route("subworkshop.update", subWorkshop.id), {
      onSuccess: () => {
        onOpenChange(false)
        setStep(1)
      },
    })
  }

  const isStep1Valid = data.name && data.description && data.date && data.time && data.duration

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
          <DialogTitle>Update Sub-Workshop</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Update basic information about the sub-workshop"
              : step === 2
                ? "Modify instructor settings"
                : "Adjust sub-workshop preferences and notification settings"}
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Step {step} of 3</div>
            <div className="text-sm text-muted-foreground">
              {step === 1 ? "Basic Info" : step === 2 ? "Instructor Settings" : "Preferences"}
            </div>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4 py-4">


            <Tabs defaultValue="en">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
              </TabsList>

              {["en", "fr", "ar"].map((lang) => (


                  <TabsContent key={lang} value={lang}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${lang}`}>name ({lang.toUpperCase()})</Label>
                      <Input
                        id={`name-${lang}`}
                        placeholder={`name (${lang.toUpperCase()})`}
                        value={data.name[`${lang}`]}
                        onChange={(e) =>
                          setData("name", {
                            ...data.name,
                            [`${lang}`]: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${lang}`}>description ({lang.toUpperCase()})</Label>
                      <Input
                        id={`description-${lang}`}
                        placeholder="https://meet.google.com/..."
                        value={data.description[`${lang}`]}
                        onChange={(e) =>
                          setData("description", {
                            ...data.description,
                            [`${lang}`]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`prerequisite-${lang}`}>prerequisite ({lang.toUpperCase()})</Label>
                      <Textarea
                        id={`prerequisite-${lang}`}
                        placeholder="https://meet.google.com/..."
                        value={data.prerequisite[`${lang}`]}
                        onChange={(e) =>
                          setData("prerequisite", {
                            ...data.prerequisite,
                            [`${lang}`]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="course">Associated chapter</Label>
              <Select value={data.chapter_id} onValueChange={(value) => setData("chapter_id", value)}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.chapter_id && <p className="text-sm text-red-500">{errors.chapter_id}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={data.date} onChange={(e) => setData("date", e.target.value)} />
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={data.time} onChange={(e) => setData("time", e.target.value)} />
                {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="90"
                  value={data.duration}
                  onChange={(e) => setData("duration", e.target.value)}
                />
                {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <Tabs defaultValue="en">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="fr">French</TabsTrigger>
                <TabsTrigger value="ar">Arabic</TabsTrigger>
              </TabsList>

              {["en", "fr", "ar"].map((lang) => (


                  <TabsContent key={lang} value={lang}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`instructor-${lang}`}>Instructor ({lang.toUpperCase()})</Label>
                      <Input
                        id={`instructor-${lang}`}
                        placeholder={`Instructor (${lang.toUpperCase()})`}
                        value={data.instructor[`${lang}`]}
                        onChange={(e) =>
                          setData("instructor", {
                            ...data.instructor,
                            [`${lang}`]: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`meetLink-${lang}`}>Google Meet Link ({lang.toUpperCase()})</Label>
                      <Input
                        id={`meetLink-${lang}`}
                        placeholder="https://meet.google.com/..."
                        value={data.meetLink[`${lang}`]}
                        onChange={(e) =>
                          setData("meetLink", {
                            ...data.meetLink,
                            [`${lang}`]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="space-y-4">


              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Questions</Label>
                  <p className="text-xs text-muted-foreground">Enable Q&A during the workshop</p>
                </div>
                <Switch
                  checked={data.allowQuestions}
                  onCheckedChange={(checked) => setData("allowQuestions", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Registration</Label>
                  <p className="text-xs text-muted-foreground">Students must register before joining</p>
                </div>
                <Switch
                  checked={data.requireRegistration}
                  onCheckedChange={(checked) => setData("requireRegistration", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Send Notifications</Label>
                  <p className="text-xs text-muted-foreground">Notify enrolled students about this workshop</p>
                </div>
                <Switch
                  checked={data.sendNotifications}
                  onCheckedChange={(checked) => setData("sendNotifications", checked)}
                />
              </div>

              {data.sendNotifications && (
                <div className="space-y-2">
                  <Label htmlFor="notificationTime">Notification Schedule</Label>
                  <Select value={data.notificationTime} onValueChange={(value) => setData("notificationTime", value)}>
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
                <Switch checked={data.published} onCheckedChange={(checked) => setData("published", checked)} />
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
                <Button onClick={handleSubmit} disabled={processing}>
                  {processing ? "Updating..." : "Update Sub-Workshop"}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

