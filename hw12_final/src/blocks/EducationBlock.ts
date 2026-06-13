/**
 * Блок відображення освіти в резюме
 */

import { Education } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class EducationBlock implements IBlock {
  constructor(private d: Education[]) {}

  /**
   * Рендеринг блоку освіти
   *
   * TODO: Реалізуйте метод для відображення інформації про освіту
   */
  render(): HTMLElement {
    // Створюємо секцію
    const el = document.createElement("section");
    el.className = "section education";
    el.innerHTML = "<h2>Education</h2>";

    this.d.forEach(edu => {
      const eduItem = document.createElement("div");
      eduItem.className = "education-item";
      eduItem.innerHTML = `
        <h3>${edu.institution}</h3>
        <p>${edu.degree} in ${edu.field} (${edu.graduation})</p>
      `;
      el.appendChild(eduItem);
    });

    return el;
  }
}
