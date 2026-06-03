import { AbstractBook } from "./AbstractBook";
import { Author } from "./Author";

//EBook реалізує AbstractBook, додає поле url

export class EBook extends AbstractBook {
  url: string;
  
  constructor(name: string, year: number, author: Author, url: string) {
    super(name, year, author.name);
    this.url = url;
  }
  
  getDescription(): string {
    return `EBook: ${this.name}, Year: ${this.year}, Author: ${this.author}, URL: ${this.url}`;
  }
}
