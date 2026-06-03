import { Author } from "./Author";
import { AbstractBook } from "./AbstractBook";
import { Copy } from "./Copy";
import { Reader } from "./Reader";

//Library надає методи для:
//додавання книг, авторів, копій, читачів
//отримання вільних копій
//пошуку книг за автором

export class Library {
  private _books: AbstractBook[];
  private _authors: Author[];
  private _copies: Copy[];
  private _readers: Reader[];

  constructor() {
    this._books = [];
    this._authors = [];
    this._copies = [];
    this._readers = [];
  }

  get books(): AbstractBook[] {
    return this._books;
  }

  get authors(): Author[] {
    return this._authors;
  }

  get copies(): Copy[] {
    return this._copies;
  }

  get readers(): Reader[] {
    return this._readers;
  }

  addBook(book: AbstractBook): void {
    this._books.push(book);
  }

  addAuthor(author: Author): void {
    this._authors.push(author);
  }

  addCopy(copy: Copy): void {
    this._copies.push(copy);
  }

  addReader(reader: Reader): void {
    this._readers.push(reader);
  }

  getAvailableCopies(book: AbstractBook): Copy[] {
    return this._copies.filter(copy => copy.book === book && copy.isCopyAvailable());
  }

  findBooksByAuthor(author: Author): AbstractBook[] {
    return this._books.filter(book => book.author === author);
  }
}
