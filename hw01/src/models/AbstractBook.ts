export abstract class AbstractBook {
  name: string;
  year: number;
  author: string; 
  
  constructor(name: string, year: number, author: string) {
    this.name = name;
    this.year = year;
    this.author = author;
  }
}
