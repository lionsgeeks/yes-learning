import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ContentBlockEditor } from "@/components/courses/content-block-editor";
// import { SubcourseItem } from "@/components/courses/subcourse-item";
import { Button } from "@/components/ui/button";
import { CoursePreview } from "@/components/courses/course-preview"

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import SortableItem from "@/components/courses/content-blocks/sortableItem";

const ChapterContent = ({ subcourses, setSubcourses, activeSubcourse, setActiveSubcourse, addSubcourse, updateSubcourse, deleteSubcourse, data, setData, lang }) => {
    // Sensors for drag events
    console.log("subcourse ",subcourses, activeSubcourse);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    // Handles drag end event
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = subcourses[lang].findIndex((s) => s.id === active.id);
        const newIndex = subcourses[lang].findIndex((s) => s.id === over.id);
        const newOrder = arrayMove(subcourses, oldIndex, newIndex);

        setSubcourses(newOrder);
    };



    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Modules</CardTitle>
                        <CardDescription>Organize your course into modules</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-350px)]">
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis]}>
                                <SortableContext items={subcourses} strategy={verticalListSortingStrategy}>
                                    <div className="p-4 space-y-2">
                                        {subcourses.map((subcourse) => (
                                            <SortableItem
                                                key={subcourse.id}
                                                id={subcourse.id}
                                                subcourse={subcourse}
                                                deleteItem={() => deleteSubcourse(subcourse.id)}
                                                isActive={activeSubcourse === subcourse.id}
                                                onClick={() => { setActiveSubcourse(subcourse.id) }}
                                                onUpdate={(data) => updateSubcourse(subcourse.id, data)}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <Button variant="outline" className="w-full" onClick={addSubcourse}>
                                Add New Module
                            </Button>
                        </div>
                    </CardContent>
                </Card> */}

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{subcourses[lang]?.find((s) => s.id === activeSubcourse)?.title || "Module Content"}</CardTitle>
                        <CardDescription>Add and arrange content blocks for this module</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContentBlockEditor
                            subcourseId={activeSubcourse}
                            blocks={subcourses[lang]?.find((s) => s.id === activeSubcourse)?.blocks || []}
                            onBlocksChange={(blocks) => {
                                updateSubcourse(activeSubcourse, { blocks }, lang);
                            }}
                            lang={lang}
                        />
                    </CardContent>
                </Card>
                <div className="col-span-2">

                    <CoursePreview course={{ title: "Course Title", description: "Course description will appear here.", subcourses: subcourses, }} />
                </div>

            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                    Back to Details
                </Button>
                <Button onClick={() => setActiveTab("preview")}>Preview Course</Button>
            </div>
        </>
    );
};

export default ChapterContent;
