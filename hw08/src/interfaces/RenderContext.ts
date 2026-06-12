export interface RenderContext {
    type: 'Section' | 'Paragraph' | 'List' | 'Finished';
    content: string;
    level?: number;
    items?: string[];
    renderTime?: number;
} 