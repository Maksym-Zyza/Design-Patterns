import { Reader } from "../models/Reader";
import { Copy } from "../models/Copy";

//BorrowService окремий сервіс для позичання книги читачу borrow(reader: Reader, copy: Copy)

export class BorrowService {
  borrow(reader: Reader, copy: Copy) {
    if (copy.isAvailable) {
      copy.isAvailable = false;
      reader.listOfBooks.push(copy);
      console.log(`${reader.name} borrowed ${copy.book.name}`);
    } else {
      console.log(`${reader.name} cannot borrow ${copy.book.name} because it is not available`);
    }
  }

  returnBook(reader: Reader, copy: Copy) {
    if (reader.listOfBooks.includes(copy)) {
      copy.isAvailable = true;
      reader.listOfBooks = reader.listOfBooks.filter(c => c !== copy);
      console.log(`${reader.name} returned ${copy.book.name}`);
    } else {
      console.log(`${reader.name} cannot return ${copy.book.name} because it is not borrowed by ${reader.name}`);
    }
  }
}
