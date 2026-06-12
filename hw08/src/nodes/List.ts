import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";
import { RenderEventPublisher } from "../RenderEventPublisher";

export class List implements DocNode {
  constructor(private items: string[], private renderer: DocRenderer) {}
  render(): string {
    const startTime = performance.now();
    const result = this.renderer.renderList(this.items);
    const renderTime = performance.now() - startTime;
    
    RenderEventPublisher.notify({
      type: 'List',
      content: '',
      items: this.items,
      renderTime
    });
    
    return result;
  }
}
