//Author зберігає ім’я та список написаних книг.
export class Author {
  name: string;
  listOfBooks: string[];

  constructor(name: string) {
    this.name = name;
    this.listOfBooks = [];
  }
}
