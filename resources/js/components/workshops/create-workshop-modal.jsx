import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "@inertiajs/react";

export function CreateWorkshopModal({ open, onOpenChange, courses, workshop }) {
  console.log(courses);
  
  const isEditing = Boolean(workshop);
  
  const { data, setData, post, put, processing, errors } = useForm({
    name: workshop?.name || "",
    description: workshop?.description || "",
    course_id: workshop?.course_id || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("course_id", data.course_id);

    if (isEditing) {
      put(route("workshop.update", { id: workshop.id }), {
        data: formData,
        onFinish: () => {
          onOpenChange(false);
        },
      });
    } else {
      post(route("workshop.store"), {
        data: formData,
        onFinish: () => {
          setData({ name: "", course_id: "", description: "" });
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Workshop" : "Create New Workshop"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the workshop details and save your changes."
              : "Enter a name and select a course to create a new workshop."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2 ">
            <Label htmlFor="name">Workshop Name</Label>
            <Input
              id="name"
              placeholder="Enter workshop name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="description">Workshop Description</Label>
            <Input
              id="description"
              placeholder="Enter workshop description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              className="mt-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Associated Course</Label>
            <div className="mt-3">
              <Select value={data.course_id} onValueChange={(value) => setData("course_id", value)}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
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
          <Button onClick={handleSubmit} disabled={processing}>
            {isEditing ? "Update Workshop" : "Create Workshop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
