import { Copy } from "./Copy";

//Reader має унікальний id, ім’я та список позичених копій.

export class Reader {
    id: string;
    name: string;
    listOfBooks: Copy[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.listOfBooks = [];
    }
}
