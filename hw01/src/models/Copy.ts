import { Book } from "./Book";

//Copy містить посилання на книгу та прапорець isAvailable

export class Copy {
  book: Book;
  isAvailable: boolean;
  
  constructor(book: Book) {
    this.book = book;
    this.isAvailable = true;
  }
  
  isCopyAvailable(): boolean {
    return this.isAvailable;
  }
}
