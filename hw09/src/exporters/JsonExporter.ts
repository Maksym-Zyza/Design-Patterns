import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class JsonExporter extends DataExporter {
  protected render(): string {
    return JSON.stringify(this.data, null, 2);
  }

  protected save(): void {
    const path = "./dist/users.json";
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, this.result);
  }
}
