import { Reader } from "../models/Reader";
import { Copy } from "../models/Copy";

//BorrowService окремий сервіс для позичання книги читачу borrow(reader: Reader, copy: Copy)

export class BorrowService {
  borrow(reader: Reader, copy: Copy): boolean {
    if (copy.isCopyAvailable()) {
      copy.isAvailable = false;
      reader.addCopy(copy);
      return true;
    }
    return false;
  }

  returnBook(reader: Reader, copy: Copy): void {
    if (reader.listOfBooks.includes(copy)) {
      copy.isAvailable = true;
      reader.removeCopy(copy);
    }
  }
}
