/**
 * Патерн Composite (Компоновщик)
 *
 * Блок досвіду роботи, який містить дочірні блоки проєктів
 */

import { Experience, Project } from "../models/ResumeModel";
import { IBlock } from "./BlockFactory";
import { ProjectBlock } from "./ProjectBlock";
import { HighlightDecorator } from "../decorators/HighlightDecorator";

export class ExperienceBlock implements IBlock {
  constructor(private d: Experience[]) {}

  /**
   * Рендеринг блоку досвіду роботи
   *
   * TODO: Реалізуйте метод render(), який створює DOM-елементи для секції досвіду
   * та використовує патерн Composite для рендерингу проєктів всередині цієї секції.
   */
  render(): HTMLElement {
    // Створюємо контейнер для досвіду роботи
    const container = document.createElement("section");
    container.className = "section experience";
    container.innerHTML = "<h2>Experience</h2>";

    this.d.forEach(exp => {
      const expItem = document.createElement("div");
      expItem.className = "experience-item";
      expItem.innerHTML = `
        <h3>${exp.position}</h3>
        <p>${exp.company} | ${exp.start} - ${exp.end}</p>
      `;

      if (exp.projects && exp.projects.length > 0) {
        const projectsContainer = document.createElement("div");
        projectsContainer.className = "projects-list";
        
        exp.projects.forEach(proj => {
          let projectBlock: IBlock = new ProjectBlock(proj);
          if (proj.isRecent) {
            projectBlock = new HighlightDecorator(projectBlock);
          }
          projectsContainer.appendChild(projectBlock.render());
        });
        
        expItem.appendChild(projectsContainer);
      }
      
      container.appendChild(expItem);
    });

    return container;
  }
}
