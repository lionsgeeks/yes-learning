import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ContentBlockEditor } from "@/components/courses/content-block-editor"
import { SubcourseItem } from "@/components/courses/subcourse-item"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button"

const ChapterContent = ({onDragEnd , addSubcourse , subcourses , activeSubcourse}) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Modules</CardTitle>
                        <CardDescription>Organize your course into modules</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-350px)]">
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="subcourses">
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="p-4 space-y-2">
                                            {subcourses.map((subcourse, index) => (
                                                <Draggable key={subcourse.id} draggableId={subcourse.id} index={index}>
                                                    {(provided) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <SubcourseItem
                                                                deleteItem={() => deleteSubcourse(subcourse.id)}
                                                                subcourse={subcourse}
                                                                isActive={activeSubcourse === subcourse.id}
                                                                onClick={() => setActiveSubcourse(subcourse.id)}
                                                                onUpdate={(data) => updateSubcourse(subcourse.id, data)}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </ScrollArea>
                        <div className="p-4 border-t">
                            <Button variant="outline" className="w-full" onClick={addSubcourse}>
                                Add New Module
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{subcourses.find((s) => s.id === activeSubcourse)?.title || "Module Content"}</CardTitle>
                        <CardDescription>Add and arrange content blocks for this module</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContentBlockEditor
                            subcourseId={activeSubcourse}
                            blocks={subcourses.find((s) => s.id === activeSubcourse)?.blocks || []}
                            onBlocksChange={(blocks) => {
                                updateSubcourse(activeSubcourse, { blocks })
                            }}
                        />
                    </CardContent>
                </Card>
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