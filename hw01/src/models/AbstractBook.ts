import { Author } from "./Author";

export abstract class AbstractBook {
  private _name: string;
  private _year: number;
  private _author: Author; 
  
  constructor(name: string, year: number, author: Author) {
    this._name = name;
    this._year = year;
    this._author = author;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get author(): Author {
    return this._author;
  }

  set author(value: Author) {
    this._author = value;
  }

  abstract getDescription(): string;
}
