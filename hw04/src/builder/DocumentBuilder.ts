export class DocumentBuilder {
  private header: string = "";
  private body: string = "";
  private footer: string = "";

  addHeader(text: string): this {
    this.header = `=== ${text} ===`;
    return this;
  }

  addBody(text: string): this {
    this.body = text;
    return this;
  }

  addFooter(text: string): this {
    this.footer = text;
    return this;
  }

  build(): string {
    const parts = [];
    if (this.header) parts.push(this.header);
    if (this.body) parts.push(this.body);
    if (this.footer) parts.push(this.footer);
    return parts.join("\n\n");
  }
}
