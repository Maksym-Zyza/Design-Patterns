import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class SummaryCollector implements RenderEventSubscriber {
  private stats = { Section: 0, Paragraph: 0, List: 0 };

  update(context: RenderContext): void {
    if (context.type === 'Finished') {
      console.log(`[Summary] Rendered ${this.stats.Section} sections, ${this.stats.Paragraph} paragraphs, ${this.stats.List} lists`);
      return;
    }

    if (context.type in this.stats) {
      this.stats[context.type as keyof typeof this.stats]++;
    }
  }
}
