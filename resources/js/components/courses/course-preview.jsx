import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { BookOpen, CheckCircle } from "lucide-react"



export function CoursePreview({ course }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  
      <Card className="lg:col-span-3">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">PREVIEW MODE</p>
              <CardTitle className="text-2xl mt-1">{course.title || "Course Title"}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Student View</div>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">{course.description || "Course description will appear here."}</p>
        </CardHeader>

        <CardContent className="pt-6">
          <Tabs defaultValue="content">
            {/* <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList> */}

            <TabsContent value="content" className="mt-6">
              {course.subcourses.length > 0 ? (
                <div className="space-y-8">
                  {course.subcourses.map((subcourse, index) => (
                    <div key={subcourse.id}>
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-sm font-medium">
                          {index + 1}
                        </div>
                        <h2 className="text-xl font-semibold">{subcourse.title}</h2>
                      </div>

                      {subcourse.blocks.length > 0 ? (
                        <div className="space-y-6 pl-11">
                          {subcourse.blocks.map((block) => (
                            <div key={block.id} className=" rounded-md p-4">
                              <h3 className="font-medium mb-2">{block.content.title}</h3>

                              {block.type === "text" && (
                                <div className="prose max-w-none">
                                  <p>{block.content.body || "Text content will appear here."}</p>
                                </div>
                              )}

                              {block.type === "image" && (
                                <div className="space-y-2">
                                  <div className="bg-muted aspect-video flex items-center justify-center rounded-md">
                                    <div className="text-muted-foreground">Image Preview</div>
                                  </div>
                                  {block.content.caption && (
                                    <p className="text-sm text-center text-muted-foreground">{block.content.caption}</p>
                                  )}
                                </div>
                              )}

                              {block.type === "video" && (
                                <div className="space-y-2">
                                  <div className="bg-muted aspect-video flex items-center justify-center rounded-md">
                                    <div className="text-muted-foreground">Video Preview</div>
                                  </div>
                                  {block.content.caption && (
                                    <p className="text-sm text-center text-muted-foreground">{block.content.caption}</p>
                                  )}
                                </div>
                              )}

                              {block.type === "list" && (
                                <div>
                                  {block.content.type === "bullet" ? (
                                    <ul className="list-disc pl-5 space-y-1">
                                      {(block.content.items || ["Sample item"]).map((item, i ) => (
                                        <li key={i}>{item}</li>
                                      ))}
                                    </ul>
                                  ) : block.content.type === "numbered" ? (
                                    <ol className="list-decimal pl-5 space-y-1">
                                      {(block.content.items || ["Sample item"]).map((item, i ) => (
                                        <li key={i}>{item}</li>
                                      ))}
                                    </ol>
                                  ) : (
                                    <div className="space-y-2">
                                      {(block.content.items || ["Sample item"]).map((item, i ) => (
                                        <div key={i} className="flex items-center">
                                          <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                          <span>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {block.type === "table" && (
                                <div className="overflow-x-auto">
                                  <table className="w-full border-collapse">
                                    <thead>
                                      <tr className="bg-muted">
                                        {Array.from({ length: block.content.cols || 3 }).map((_, i) => (
                                          <th key={i} className="border p-2 text-left">
                                            Header {i + 1}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Array.from({ length: block.content.rows || 3 }).map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                          {Array.from({ length: block.content.cols || 3 }).map((_, colIndex) => (
                                            <td key={colIndex} className="border p-2">
                                              Cell {rowIndex + 1},{colIndex + 1}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {block.type === "chart" && (
                                <div className="bg-muted h-64 flex items-center justify-center rounded-md">
                                  <div className="text-muted-foreground">Chart Preview</div>
                                </div>
                              )}


                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pl-11 text-muted-foreground">No content blocks in this module</div>
                      )}

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No modules yet</h3>
                  <p className="text-muted-foreground mt-1">Add modules to your course to see a preview</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources">
              <div className="py-8 text-center text-muted-foreground">Resources section preview</div>
            </TabsContent>

            <TabsContent value="discussions">
              <div className="py-8 text-center text-muted-foreground">Discussions section preview</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

