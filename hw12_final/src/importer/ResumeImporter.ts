/**
 * Конкретна реалізація імпортера резюме
 * Наслідується від AbstractImporter і реалізує абстрактні методи
 */

import { AbstractImporter } from "./AbstractImporter";
import { ResumeModel } from "../models/ResumeModel";
import { BlockFactory } from "../blocks/BlockFactory";

export class ResumeImporter extends AbstractImporter<ResumeModel> {
  /**
   * Перевіряє, чи відповідає JSON-об'єкт очікуваній структурі
   *
   * TODO: Реалізуйте валідацію JSON-даних резюме.
   * Перевірте наявність необхідних полів (header, summary, experience, education, skills)
   */
  protected validate(): void {
    const data = this.raw as any;
    if (!data || typeof data !== "object") {
      throw new Error("Invalid JSON");
    }
    const requiredFields = ["header", "summary", "experience", "education", "skills"];
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }

  /**
   * Перетворює JSON-дані у внутрішню модель резюме
   *
   */
  protected map(): ResumeModel {
    return this.raw as ResumeModel;
  }

  /**
   * Рендерить модель резюме у DOM
   *
   * TODO: Реалізуйте рендеринг моделі у DOM-дерево
   */
  protected render(model: ResumeModel): void {
    const root = document.getElementById("resume-content")!;
    if (!root) {
      console.error("Resume content root element not found");
      return;
    }
    
    // Очистити попередній контент
    root.innerHTML = "";

    const factory = new BlockFactory();
    const blockTypes: ("header" | "summary" | "experience" | "education" | "skills")[] = [
      "header", "summary", "experience", "education", "skills"
    ];

    for (const type of blockTypes) {
      const block = factory.createBlock(type, model);
      root.appendChild(block.render());
    }
  }
}
