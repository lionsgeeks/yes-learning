'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TabsContent } from '@radix-ui/react-tabs';
import { AlignLeft, BarChart, File, GripVertical, ImageIcon, List, Presentation, Table, Trash2, Video } from 'lucide-react';
import { ChartBlockEditor } from './content-blocks/chart-block';
import { FileBlockEditor } from './content-blocks/file-block';
import { ImageBlockEditor } from './content-blocks/image-block';
import { ListBlockEditor } from './content-blocks/list-block';
import { TableBlockEditor } from './content-blocks/table-block';
import { TextBlockEditor } from './content-blocks/text-block';
import { VideoBlockEditor } from './content-blocks/video-block';

export function ContentBlockEditor({ blocks, onBlocksChange, lang }) {

    const [activeBlockId, setActiveBlockId] = useState(null);

    const addBlock = (type) => {
        const newBlock = {
            id: `block-${Date.now()}`,
            type,
            content: getDefaultContentForType(type),
        };

        onBlocksChange([...blocks, newBlock]);
        setActiveBlockId(newBlock.id);
    };

    const updateBlock = (id, content) => {
        onBlocksChange(blocks.map((block) => (block.id === id ? { ...block, content } : block)));
    };

    const removeBlock = (id) => {
        onBlocksChange(blocks?.filter((block) => block.id !== id));
        if (activeBlockId === id) {
            setActiveBlockId(null);
        }
    };

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = blocks.findIndex((block) => block.id === active.id);
        const newIndex = blocks.findIndex((block) => block.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const reorderedBlocks = arrayMove(blocks, oldIndex, newIndex);
            onBlocksChange(reorderedBlocks);
        }
    };

    const getDefaultContentForType = (type) => {
        switch (type) {
            case 'text':
                return { title: 'New Text Section', body: '' };
            case 'image':
                return { title: 'New Image', url: '', caption: '', altText: '' };
            case 'document':
                return { title: 'New File', url: '', caption: '' };
            case 'video':
                return { title: 'New Video', url: '', caption: '' };
            case 'list':
                return { title: 'New List', items: ['Item 1'], type: 'bullet' };
            case 'table':
                return { title: 'New Table', rows: 3, cols: 3, data: Array(3).fill(Array(3).fill('')) };
            case 'chart':
                return { title: 'New Chart', type: 'bar', data: [] };
            default:
                return {};
        }
    };

    const renderBlockEditor = (block) => {
        switch (block.type) {
            case 'text':
                return <TextBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'image':
                return <ImageBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'video':
                return <VideoBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'list':
                return <ListBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'table':
                return <TableBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'chart':
                return <ChartBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            case 'document':
                return <FileBlockEditor content={block.content} onChange={(content) => updateBlock(block.id, content)} />;
            default:
                return <div>Unknown block type</div>;
        }
    };

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="space-y-4">
            <div className="flex flex-col space-y-4">
                <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                    <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-4">
                            {blocks?.length === 0 ? (
                                <div className="rounded-md border-2 border-dashed py-8 text-center">
                                    <p className="text-muted-foreground">No content blocks yet</p>
                                    <p className="text-muted-foreground mt-1 text-sm">Add your first content block using the buttons below</p>
                                </div>
                            ) : (
                                blocks.map((block) => (
                                    <SortableBlock
                                        key={block.id}
                                        block={block}
                                        activeBlockId={activeBlockId}
                                        setActiveBlockId={setActiveBlockId}
                                        removeBlock={removeBlock}
                                        renderBlockEditor={renderBlockEditor}
                                    />
                                ))
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>

            <div className="rounded-md border p-4">
                <h3 className="mb-3 p-3 text-sm font-medium">Add Content Block</h3>
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="basic">Add Chapter Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basic">
                        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('text')}>
                                <AlignLeft className="mr-2 h-4 w-4" />
                                Text
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('list')}>
                                <List className="mr-2 h-4 w-4" />
                                List
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('image')}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Image
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('video')}>
                                <Video className="mr-2 h-4 w-4" />
                                Video
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('table')}>
                                <Table className="mr-2 h-4 w-4" />
                                Table
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('chart')}>
                                <BarChart className="mr-2 h-4 w-4" />
                                Chart
                            </Button>
                            <Button variant="outline" className="justify-start" onClick={() => addBlock('document')}>
                                <File className="mr-2 h-4 w-4" />
                                Document
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function SortableBlock({ block, activeBlockId, setActiveBlockId, removeBlock, renderBlockEditor }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: block.id });

    return (
        <Card
            ref={setNodeRef}
            style={{ transform: CSS.Transform.toString(transform), transition }}
            className={`${activeBlockId === block.id ? 'ring-primary ring-2' : ''} p-2`}
        >
            <div className="bg-muted/50 flex items-center border-b p-3">
                <div {...listeners} {...attributes} className="mr-2 cursor-move">
                    <GripVertical className="text-muted-foreground h-5 w-5" />
                </div>
                <div className="flex-1 font-medium">{block.content.title || `${block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block`}</div>
                <Button variant="ghost" size="icon" onClick={() => setActiveBlockId(activeBlockId === block.id ? null : block.id)}>
                    {block.type === 'text' && <AlignLeft className="h-4 w-4" />}
                    {block.type === 'image' && <ImageIcon className="h-4 w-4" />}
                    {block.type === 'video' && <Video className="h-4 w-4" />}
                    {block.type === 'list' && <List className="h-4 w-4" />}
                    {block.type === 'table' && <Table className="h-4 w-4" />}
                    {block.type === 'chart' && <BarChart className="h-4 w-4" />}
                    {block.type === 'presentation' && <Presentation className="h-4 w-4" />}
                    {block.type === 'document' && <File className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => removeBlock(block.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            {activeBlockId === block.id && <CardContent className="p-4">{renderBlockEditor(block)}</CardContent>}
        </Card>
    );
}
