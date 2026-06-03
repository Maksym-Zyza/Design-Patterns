import { Copy } from "./Copy";

//Reader має унікальний id, ім’я та список позичених копій.

export class Reader {
  private _id: string;
  private _name: string;
  private _listOfBooks: Copy[];

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._listOfBooks = [];
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get listOfBooks(): Copy[] {
    return this._listOfBooks;
  }

  addCopy(copy: Copy): void {
    if (!this._listOfBooks.includes(copy)) {
      this._listOfBooks.push(copy);
    }
  }

  removeCopy(copy: Copy): void {
    this._listOfBooks = this._listOfBooks.filter(c => c !== copy);
  }
}
