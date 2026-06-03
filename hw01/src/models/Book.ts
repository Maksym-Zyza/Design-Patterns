import { AbstractBook } from "./AbstractBook";
import { Author } from "./Author";

//Book реалізує AbstractBook, містить назву, рік, автора.
export class Book extends AbstractBook {
  constructor(name: string, year: number, author: Author) {
    super(name, year, author);
    author.addBook(this);
  }

  getDescription(): string {
    return `Physical book "${this.name}" by ${this.author.name} (${this.year})`;
  }
}
