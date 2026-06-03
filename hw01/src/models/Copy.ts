import { AbstractBook } from "./AbstractBook";

//Copy містить посилання на книгу та прапорець isAvailable

export class Copy {
  private _book: AbstractBook;
  private _isAvailable: boolean;
  
  constructor(book: AbstractBook) {
    this._book = book;
    this._isAvailable = true;
  }

  get book(): AbstractBook {
    return this._book;
  }

  set book(value: AbstractBook) {
    this._book = value;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  set isAvailable(value: boolean) {
    this._isAvailable = value;
  }
  
  isCopyAvailable(): boolean {
    return this._isAvailable;
  }
}
