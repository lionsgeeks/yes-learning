'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';
interface ImageBlockEditorProps {
    content: {
        title: string;
        file: File;
        url: string;
        caption: string;
        altText: string;
    };
    onChange: (content: ImageBlockEditorProps['content']) => void;
}

export function FileBlockEditor() {
  
    return (
        <div>Lionsgeek</div>
    );
}
