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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "@inertiajs/react"

export function CreateWorkshopModal({ open, onOpenChange, courses }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description:'',
    course_id:''
  })

  const handleCreate = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("course_id", data.course_id)

    post(route("workshop.store"), {
      data: formData,
      onFinish: () => {
        setData({ name: "" , course_id:"" , description:""})
        onOpenChange(false)
      },
    })
  }
console.log(data);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workshop</DialogTitle>
          <DialogDescription>Enter a name and select a course to create a new workshop.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2 ">
            <Label className="" htmlFor="name">Workshop Name</Label>
            <Input
              id="name"
              placeholder="Enter workshop name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value) }
              className="mt-3"
            />
          </div>
          <div className="space-y-2 ">
            <Label className="" htmlFor="description">Workshop description</Label>
            <Input
              id="description"
              placeholder="Enter workshop description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value) }
              className="mt-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Associated Course</Label>
            <div className="mt-3">
              <Select value={data.course_id} onValueChange={(value) => setData('course_id', value)}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.name} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            Create Workshop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
