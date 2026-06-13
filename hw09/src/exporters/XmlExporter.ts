import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class XmlExporter extends DataExporter {
  protected render(): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<users>\n`;
    for (const user of this.data) {
      xml += `  <user>\n`;
      xml += `    <id>${user.id}</id>\n`;
      xml += `    <name>${user.name}</name>\n`;
      xml += `    <email>${user.email}</email>\n`;
      xml += `    <phone>${user.phone}</phone>\n`;
      xml += `  </user>\n`;
    }
    xml += `</users>`;
    return xml;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    const path = "./dist/users.xml";
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, this.result);
  }
}
