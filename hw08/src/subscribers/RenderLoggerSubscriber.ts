import { RenderEventSubscriber } from "../interfaces/RenderEventSubscriber";
import { RenderContext } from "../interfaces/RenderContext";

export class RenderLoggerSubscriber implements RenderEventSubscriber {
  update(context: RenderContext): void {
    if (context.type === 'Finished') return;

    if (context.type === 'Section') {
      console.log(`[Log] Rendered Section ("${context.content}", level ${context.level})`);
    } else if (context.type === 'Paragraph') {
      console.log(`[Log] Rendered Paragraph (${context.content.length} chars)`);
    } else if (context.type === 'List') {
      console.log(`[Log] Rendered List (${context.items?.length || 0} items)`);
    }
  }
}
