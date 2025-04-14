import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { BookOpen, CheckCircle, Download, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2'; // Importing Chart.js components
import { Button } from '../ui/button';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

export function CoursePreview({ course }) {
    console.log('inside the course preview : ', course);
    // Separate function to render chart
    function renderChart(block) {
        const content = block.content; // Get the block's content
        const chartData = {
            labels: content.data.map((point) => point.name),
            datasets: [
                {
                    label: 'Dataset',
                    data: content.data.map((point) => point.value),
                    backgroundColor: content.type === 'pie' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const chartOptions = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: content.title || 'Chart Preview',
                },
            },
        };

        return (
            <div className="bg- rounded-md">
                <div className="h-full w-full">
                    <div className="flex h-full items-center justify-center">
                        <div className="">
                            {block.content.type === 'bar' && <Bar data={chartData} options={chartOptions} />}
                            {block.content.type === 'line' && <Line data={chartData} options={chartOptions} />}
                            {block.content.type === 'pie' && <Pie data={chartData} options={chartOptions} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Function to extract YouTube video ID
    function extractVideoId(url) {
        const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?/]+)/;
        const match = url.match(regex);
        return match && match[1];
    }

    // preview image
    function ImagePreview({ block }) {
        const [imagePreview, setImagePreview] = useState(null);

        useEffect(() => {
            const file = block.content?.file;
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        setImagePreview(reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        }, [block]);

        return imagePreview ? (
            <img src={imagePreview} alt="Course cover preview" className="h-auto w-full rounded-md object-cover" />
        ) : (
            <div className="text-muted-foreground">Image Preview</div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <Card className="lg:col-span-4">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">NGO View</div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="">
                    <Tabs defaultValue="content">

                        <TabsContent value="content" className="mt-3">
                            {course.subcourses.length > 0 ? (
                                <div className="space-y-8">
                                    {course.subcourses.map((subcourse, index) => (
                                        <div key={subcourse.id}>
                                            {subcourse.blocks?.length > 0 ? (
                                                <div className="">
                                                    {subcourse.blocks.map((block) => (
                                                        <div key={block.id} className="rounded-md p-4">
                                                            <h3 className="mb-2 font-medium">{block.content.title}</h3>

                                                            {block.type === 'text' && (
                                                                <div className="prose max-w-none">
                                                                    <p>{block.content.body || 'Text content will appear here.'}</p>
                                                                </div>
                                                            )}

                                                            {block.type === 'image' && (
                                                                <div className="space-y-2">
                                                                    <div className="bg-muted flex aspect-video items-center justify-center rounded-md">
                                                                        <ImagePreview block={block} />
                                                                    </div>
                                                                    {block.content.caption && (
                                                                        <p className="text-muted-foreground text-center text-sm">
                                                                            {block.content.caption}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {block.type === 'video' && (
                                                                <div className="space-y-2">
                                                                    <div className="bg-muted flex aspect-video rounded-md">
                                                                        {block.type === 'video' && (
                                                                            <div className="w-full space-y-2">
                                                                                <div className="bg-muted aspect-video rounded-md">
                                                                                    {/* Extract video ID and embed */}
                                                                                    <iframe
                                                                                        className="h-full w-full"
                                                                                        src={`https://www.youtube.com/embed/${extractVideoId(block.content.url)}`} // Call a function to extract the video ID
                                                                                        title="Video"
                                                                                        frameBorder="0"
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                                                        allowFullScreen
                                                                                    ></iframe>
                                                                                </div>
                                                                                {/* TODO : fix width */}

                                                                                {block.content.caption && (
                                                                                    <p className="text-muted-foreground w-full text-center text-sm">
                                                                                        {block.content.caption}
                                                                                    </p>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {/* TODO : fix width */}
                                                                    {block.content.caption && (
                                                                        <p className="text-muted-foreground w-full text-center text-sm">
                                                                            {block.content.caption}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {block.type === 'list' && (
                                                                <div>
                                                                    {block.content.type === 'bullet' ? (
                                                                        <ul className="list-disc space-y-1 pl-5">
                                                                            {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                <li key={i}>{item}</li>
                                                                            ))}
                                                                        </ul>
                                                                    ) : block.content.type === 'numbered' ? (
                                                                        <ol className="list-decimal space-y-1 pl-5">
                                                                            {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                <li key={i}>{item}</li>
                                                                            ))}
                                                                        </ol>
                                                                    ) : (
                                                                        <div className="space-y-2">
                                                                            {(block.content.items || ['Sample item']).map((item, i) => (
                                                                                <div key={i} className="flex items-center">
                                                                                    <CheckCircle className="text-primary mr-2 h-4 w-4" />
                                                                                    <span>{item}</span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {block.type === 'table' && (
                                                                <div className="overflow-x-auto">
                                                                    <table className="w-full border-collapse">
                                                                        <thead>
                                                                            <tr className="bg-muted">
                                                                                {Array.from({ length: block.content.cols || 3 }).map((_, i) => (
                                                                                    <th key={i} className="border p-2 text-left">
                                                                                        {block.content?.data[0][i] || `Header ${i + 1}`}
                                                                                    </th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {Array.from({ length: block.content.rows - 1 || 3 }).map(
                                                                                (_, rowIndex) => (
                                                                                    <tr key={rowIndex}>
                                                                                        {Array.from({ length: block.content.cols || 3 }).map(
                                                                                            (_, colIndex) => (
                                                                                                <td key={colIndex} className="border p-2">
                                                                                                    {block.content?.data[rowIndex + 1][colIndex] ||
                                                                                                        `Cell ${rowIndex + 1 }, ${ colIndex + 1}`}
                                                                                                </td>
                                                                                            ),
                                                                                        )}
                                                                                    </tr>
                                                                                ),
                                                                            )}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )}

                                                            {block.type === 'chart' && renderChart(block)}
                                                            {block.type === 'document' && (
                                                                <div className="space-y-2">
                                                                    <div className="overflow-hidden rounded-md border">
                                                                        <div className="bg-muted/30 flex items-center justify-between border-b p-3">
                                                                            <div className="flex items-center">
                                                                                <FileText className="text-primary mr-2 h-5 w-5" />
                                                                                <div className="font-medium">
                                                                                    {block.content.title || 'PDF Document'}
                                                                                </div>
                                                                            </div>
                                                                            <Button variant="outline" size="sm" className="h-8">
                                                                                <Download className="mr-2 h-4 w-4" />
                                                                                Download
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                    {block.content.description && (
                                                                        <p className="text-muted-foreground text-sm">{block.content.description}</p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-muted-foreground pl-11">No content blocks in this module</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                    <h3 className="text-lg font-medium">No modules yet</h3>
                                    <p className="text-muted-foreground mt-1">Add modules to your course to see a preview</p>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="resources">
                            <div className="text-muted-foreground py-8 text-center">Resources section preview</div>
                        </TabsContent>

                        <TabsContent value="discussions">
                            <div className="text-muted-foreground py-8 text-center">Discussions section preview</div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
