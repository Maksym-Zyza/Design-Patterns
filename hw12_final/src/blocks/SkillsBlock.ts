/**
 * Блок відображення навичок резюме
 */

import { Skills } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";

export class SkillsBlock implements IBlock {
  constructor(private d: Skills) {}

  /**
   * Рендеринг блоку навичок
   *
   * TODO: Реалізуйте метод для відображення категорій навичок
   * та їх списків у вигляді HTML елементів
   */
  render(): HTMLElement {
    // Створюємо секцію
    const sec = document.createElement("section");
    sec.className = "section skills";
    sec.innerHTML = "<h2>Skills</h2>";

    const list = document.createElement("ul");
    list.className = "skills-list";

    for (const [category, skills] of Object.entries(this.d)) {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${category}:</strong> ${skills.join(", ")}`;
      list.appendChild(item);
    }
    
    sec.appendChild(list);

    return sec;
  }
}
