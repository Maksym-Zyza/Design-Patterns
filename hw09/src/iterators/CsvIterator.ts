import { readFileSync } from "fs";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private data: UserData[] = [];

  constructor(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    if (lines.length > 1) {
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        const [id, name, email, ...phoneParts] = line.split(',');
        if (id !== undefined && name !== undefined) {
          this.data.push({
            id: Number(id),
            name: name,
            email: email,
            phone: phoneParts.join(',')
          });
        }
      }
    }
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.data) {
      yield user;
    }
  }
}
