import * as fs from "fs";
import * as path from "path";
import { DirectoryReport } from "./DirectoryReport";

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    const report: DirectoryReport = {
      files: 0,
      directories: 0,
      totalSize: 0,
      extensions: {},
    };

    const processDirectory = (currentPath: string) => {
      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(currentPath, { withFileTypes: true });
      } catch (error) {
        return;
      }

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          report.directories++;
          processDirectory(fullPath);
        } else if (entry.isFile()) {
          report.files++;
          try {
            const stats = fs.statSync(fullPath);
            report.totalSize += stats.size;
          } catch (e) {
            // ignore stat errors
          }
          
          let fileExt = path.extname(entry.name);
          if (!fileExt && entry.name.startsWith('.')) {
              fileExt = entry.name;
          } else if (!fileExt) {
              fileExt = 'no_extension';
          }

          if (report.extensions[fileExt]) {
            report.extensions[fileExt]++;
          } else {
            report.extensions[fileExt] = 1;
          }
        }
      }
    };

    processDirectory(dirPath);
    return report;
  }
}
