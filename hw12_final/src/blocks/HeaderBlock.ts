/**
 * Блок відображення заголовка резюме
 */

import { ResumeModel } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class HeaderBlock implements IBlock {
  constructor(private d: ResumeModel["header"]) {}

  /**
   * Рендеринг блоку заголовка
   *
   * TODO: Реалізуйте метод render(), який створює DOM-елементи
   * для відображення даних заголовка: ім'я, позиція та контактна інформація.
   */
  render(): HTMLElement {
    // Створюємо контейнер для заголовка
    const header = document.createElement("header");
    header.className = "section header";

    header.innerHTML = `
      <h1>${this.d.fullName}</h1>
      <p class="title">${this.d.title}</p>
      <p class="contacts">
        ${this.d.contacts.email ? `<span>${this.d.contacts.email}</span>` : ""}
        ${this.d.contacts.phone ? `<span>${this.d.contacts.phone}</span>` : ""}
        ${this.d.contacts.location ? `<span>${this.d.contacts.location}</span>` : ""}
      </p>
    `;
    return header;
  }
}
