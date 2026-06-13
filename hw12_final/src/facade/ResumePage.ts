import { ResumeImporter } from "../importer/ResumeImporter";

/**
 * Фасад: єдина точка входу.
 */
export class ResumePage {
  async init(jsonPath: string): Promise<void> {
    try {
      const data = await this.fetchData(jsonPath);
      const importer = new ResumeImporter(data);
      importer.import();
    } catch (error) {
      console.error("Failed to initialize resume:", error);
    }
  }

  private async fetchData(path: string): Promise<unknown> {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load data from ${path}`);
    }
    return await response.json();
  }
}
