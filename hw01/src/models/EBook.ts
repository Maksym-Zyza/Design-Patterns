import { AbstractBook } from "./AbstractBook";
import { Author } from "./Author";

//EBook реалізує AbstractBook, додає поле url

export class EBook extends AbstractBook {
  private _url: string;
  
  constructor(name: string, year: number, author: Author, url: string) {
    super(name, year, author);
    this._url = url;
    author.addBook(this);
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
  
  getDescription(): string {
    return `E-book "${this.name}" by ${this.author.name} (${this.year}) - Available at: <${this.url}>`;
  }
}
