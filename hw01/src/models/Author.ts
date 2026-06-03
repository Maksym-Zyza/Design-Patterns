import { AbstractBook } from "./AbstractBook";

//Author зберігає ім’я та список написаних книг.
export class Author {
  private _name: string;
  private _listOfBooks: AbstractBook[];

  constructor(name: string) {
    this._name = name;
    this._listOfBooks = [];
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get listOfBooks(): AbstractBook[] {
    return this._listOfBooks;
  }

  addBook(book: AbstractBook): void {
    if (!this._listOfBooks.includes(book)) {
      this._listOfBooks.push(book);
    }
  }
}
