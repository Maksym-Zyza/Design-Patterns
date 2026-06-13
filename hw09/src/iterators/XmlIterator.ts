import { readFileSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private data: UserData[] = [];

  constructor(filePath: string) {
    const content = readFileSync(filePath, 'utf-8');
    const parser = new XMLParser();
    const parsed = parser.parse(content);
    if (parsed && parsed.users && parsed.users.user) {
      const users = Array.isArray(parsed.users.user) ? parsed.users.user : [parsed.users.user];
      this.data = users.map((u: any) => ({
        id: Number(u.id),
        name: String(u.name),
        email: String(u.email),
        phone: String(u.phone)
      }));
    }
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.data) {
      yield user;
    }
  }
}
