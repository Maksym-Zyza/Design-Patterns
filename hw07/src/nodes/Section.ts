import { DocNode } from "../interfaces/DocNode";
import { DocRenderer } from "../interfaces/DocRenderer";

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
    const header = this.renderer.renderHeader(this.level, this.title);
    if (this.children.length === 0) {
      return header;
    }
    const renderedChildren = this.children.map(child => child.render()).join('\n\n');
    return `${header}\n\n${renderedChildren}`;
  }
}
