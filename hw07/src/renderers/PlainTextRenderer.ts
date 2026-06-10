import { BaseRenderer } from "./BaseRenderer";

export class PlainTextRenderer extends BaseRenderer {
  renderHeader(level: number, text: string): string {
    return text.toUpperCase();
  }

  renderParagraph(text: string): string {
    return text;
  }

  renderList(items: string[]): string {
    return items.map(item => `* ${item}`).join('\n');
  }
}
