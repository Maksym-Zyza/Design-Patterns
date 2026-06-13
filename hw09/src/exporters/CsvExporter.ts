import { DataExporter } from "./DataExporter";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export class CsvExporter extends DataExporter {
  protected render(): string {
    if (this.data.length === 0) return "";
    const header = "id,name,email,phone\n";
    const rows = this.data.map(user => `${user.id},${user.name},${user.email},${user.phone}`);
    return header + rows.join("\n");
  }

  protected save(): void {
    const path = "./dist/users.csv";
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, this.result);
  }
}
