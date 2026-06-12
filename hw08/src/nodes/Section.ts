import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
    const startTime = performance.now();
    const header = this.renderer.renderHeader(this.level, this.title);
    let result = header;
    if (this.children.length > 0) {
      const renderedChildren = this.children.map(child => child.render()).join('\n\n');
      result = `${header}\n\n${renderedChildren}`;
    }
    const renderTime = performance.now() - startTime;
    
    RenderEventPublisher.notify({
      type: 'Section',
      content: this.title,
      level: this.level,
      renderTime
    });
    
    return result;
  }
}
