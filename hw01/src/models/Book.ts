import { AbstractBook } from "./AbstractBook";
import { Author } from "./Author";

//Book реалізує AbstractBook, містить назву, рік, автора.
export class Book implements AbstractBook {
  name: string;
  year: number;
  author: string; 
  
  constructor(name: string, year: number, author: Author) {
    this.name = name;
    this.year = year;
    this.author = author.name;
  }

  getDescription(): string {
    return `Book: ${this.name}, Year: ${this.year}, Author: ${this.author}`;
  }
}
