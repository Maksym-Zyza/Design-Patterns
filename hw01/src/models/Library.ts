import { Author } from "./Author";
import { AbstractBook } from "./AbstractBook";
import { Copy } from "./Copy";
import { Reader } from "./Reader";
import { Book } from "./Book";
import { EBook } from "./EBook";

//Library надає методи для:
//додавання книг, авторів, копій, читачів
//отримання вільних копій
//пошуку книг за автором

export class Library {
    books: AbstractBook[];
    authors: Author[];
    copies: Copy[];
    readers: Reader[];

    constructor() {
        this.books = [];
        this.authors = [];
        this.copies = [];
        this.readers = [];
    }

    addBook(book: AbstractBook) {
        this.books.push(book);
    }

    addAuthor(author: Author) {
        this.authors.push(author);
    }

    addCopy(copy: Copy) {
        this.copies.push(copy);
    }

    addReader(reader: Reader) {
        this.readers.push(reader);
    }

    getAvailableCopies(book: AbstractBook) {
        return this.copies.filter(copy => copy.book === book && copy.isAvailable);
    }

    findBooksByAuthor(author: Author) {
        return this.books.filter(book => book.author === author.name);
    }
}
