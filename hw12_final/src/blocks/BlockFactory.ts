/**
 * Патерн Factory Method (Фабричний метод)
 *
 * Клас BlockFactory відповідає за створення різних типів блоків резюме
 * залежно від типу, переданого як параметр.
 */

import {
  ResumeModel,
  Education,
  Experience,
  Skills,
} from "../models/ResumeModel";
import { HeaderBlock } from "./HeaderBlock";
import { SummaryBlock } from "./SummaryBlock";
import { ExperienceBlock } from "./ExperienceBlock";
import { EducationBlock } from "./EducationBlock";
import { SkillsBlock } from "./SkillsBlock";

export interface IBlock {
  render(): HTMLElement;
}

export type BlockType =
  | "header"
  | "summary"
  | "experience"
  | "education"
  | "skills";

export class BlockFactory {
  /**
   * Метод для створення блоку відповідного типу
   *
   * @param type Тип блоку для створення
   * @param model Дані моделі для цього блоку
   * @returns Створений блок, готовий для рендерингу
   *
   * TODO: Реалізуйте метод createBlock, який створює і повертає
   * відповідний блок залежно від типу, використовуючи патерн Factory Method.
   */
  createBlock(type: BlockType, m: ResumeModel): IBlock {
    // TODO: Реалізуйте логіку створення відповідного об'єкта IBlock
    switch (type) {
      case "header":
        return new HeaderBlock(m.header);
      case "summary":
        return new SummaryBlock(m.summary);
      case "experience":
        return new ExperienceBlock(m.experience);
      case "education":
        return new EducationBlock(m.education);
      case "skills":
        return new SkillsBlock(m.skills);
      default:
        throw new Error(`Unknown block type: ${type}`);
    }
  }
}
