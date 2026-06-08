# Домашнє завдання до Теми Структурні патерни: Адаптер та Фасад

### Опис завдання

Мета домашнього завдання — опанувати застосування структурних патернів у реальному контексті, а саме:

- Фасад (Facade) — для спрощення складного процесу аналізу і побудови звіту;
- Адаптер (Adapter) — для уніфікації форматів виводу звіту.

Наше домашнє завдання моделює ситуацію зі створення справжньої інструментальної утиліти, яка зустрічається у проектах з CLI-архітектурою.

Реалізуйте консольну утиліту для аналізу файлової системи, яка:

- виконує повний аналіз обраної директорії;
- генерує звіт про її вміст;
- зберігає цей звіт у форматі `JSON`, `CSV` або `XML` залежно від обраного режиму;
- демонструє поєднання двох структурних патернів: Адаптер і Фасад;
- застосовує ієрархію фасадів: високорівневий фасад керує низькорівневим.

Архітектурні особливості застосунку наступні.

- Застосунок має два ієрархічні фасади:
  - `ReportManager` — високорівневий фасад, керує всім життєвим циклом;
  - `AnalyzerFacade` — низькорівневий фасад, координує аналіз і форматування;
- Патерн Адаптер дозволяє підключати нові формати без зміни вже написаної логіки застосунку;
- Розділення обов’язків — кожен компонент відповідає лише за свою зону.

### Патерни проектування

#### 1. Патерн "Фасад"

У проекті реалізовано два рівні фасадів:

1. **AnalyzerFacade** (низькорівневий фасад):

   - Приховує складність роботи з DirectoryAnalyzer
   - Координує взаємодію між аналізатором та адаптером
   - Надає простий метод generateReport()

2. **ReportManager** (високорівневий фасад):
   - Приховує роботу з AnalyzerFacade
   - Керує вибором адаптерів
   - Займається файловою системою
   - Обробляє помилки
   - Форматує імена файлів

#### 2. Патерн "Адаптер"

Реалізовано через інтерфейс ReportAdapter з трьома конкретними реалізаціями:

- JsonReportAdapter
- XmlReportAdapter
- CsvReportAdapter

### Структура файлів

```
├── DirectoryReport.ts    # Інтерфейс звіту
├── DirectoryAnalyzer.ts  # Аналіз директорій
├── ReportAdapter.ts      # Інтерфейс адаптера
├── JsonReportAdapter.ts  # Адаптер для JSON
├── XmlReportAdapter.ts   # Адаптер для XML
├── CsvReportAdapter.ts   # Адаптер для CSV
├── AnalyzerFacade.ts     # Низькорівневий фасад
├── ReportManager.ts      # Високорівневий фасад
└── main.ts              # Точка входу
```

## Встановлення та запуск

1. Встановіть залежності:

```bash
npm install
```

2. Запустіть аналіз:

```bash
# Аналіз поточної директорії з виводом у JSON (за замовчуванням)
npm start

# Аналіз вказаної директорії
npm start ./path/to/directory

# Аналіз з вказаним форматом (json, xml, csv)
npm start ./path/to/directory json
npm start ./path/to/directory xml
npm start ./path/to/directory csv
```

## Результати

Звіти зберігаються в директорії `reports` з іменами виду:

- `report-2024-02-20T12-34-56-789Z.json`
- `report-2024-02-20T12-34-56-789Z.xml`
- `report-2024-02-20T12-34-56-789Z.csv`

Кожен звіт містить:

- Кількість файлів
- Кількість директорій
- Загальний розмір файлів
- Статистику по розширеннях файлів



### Завдання

1. У файлі DirectoryReport.ts створіть інтерфейс DirectoryReport, який описує результат аналізу директорії. Цей інтерфейс буде використовуватись у всіх модулях системи як єдиний формат для передачі результату. Інтерфейс повинен містити такі поля:

```typescript
export interface DirectoryReport {
  files: number;                         // загальна кількість знайдених файлів
  directories: number;                   // кількість вкладених директорій
  totalSize: number;                     // загальний розмір файлів у байтах
  extensions: Record<string, number>;   // статистика: кількість файлів за розширенням
}
```

2. У файлі DirectoryAnalyzer.ts створіть клас DirectoryAnalyzer, відповідальний за обхід файлової системи. У класі реалізуйте метод analyze, який повинен:

- рекурсивно обійти вказану директорію;
- підрахувати загальну кількість файлів;
- визначити кількість вкладених директорій;
- обчислити загальний розмір усіх знайдених файлів у байтах;
- побудувати словник, де ключ — це розширення файлу (наприклад, .ts), а значення — кількість таких файлів.

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { DirectoryReport } from './DirectoryReport';

export class DirectoryAnalyzer {
    analyze(dirPath: string): DirectoryReport {
        // TODO
    }
} 
```

3. У файлі ReportAdapter.ts опишіть інтерфейс ReportAdapter, який визначає спільний контракт для адаптерів форматування звіту.

Інтерфейс повинен мати метод:

```typescript
export interface ReportAdapter {
  export(report: DirectoryReport): string;
}
```

Цей метод приймає звіт у форматі DirectoryReport і повертає його текстову репрезентацію у відповідному форматі



4. Реалізуйте адаптери форматування звіту JsonReportAdapter.ts, CsvReportAdapter.ts, XmlReportAdapter.ts які експортують report у відповідному форматі та розташовані у відповідних файлах.

```typescript
import { ReportAdapter } from './ReportAdapter';
import { DirectoryReport } from './DirectoryReport';

export class JsonReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
        // TODO
    }
} 

export class CsvReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
				// TODO
    }
} 

export class XmlReportAdapter implements ReportAdapter {
    export(report: DirectoryReport): string {
				// TODO
    }
} 

```

Кожен клас має реалізовувати інтерфейс ReportAdapter та відповідати за перетворення об’єкта типу DirectoryReport у заданий текстовий формат. Реалізація кожного методу export() повинна повертати текст, готовий до збереження у файл.



5. У файлі AnalyzerFacade.ts реалізуйте клас AnalyzerFacade, який інкапсулює взаємодію між логікою аналізу директорії DirectoryAnalyzer та адаптерами форматів ReportAdapter.



Клас повинен мати метод generateReport, який повинен виконати:

1. Аналіз директорії за допомогою DirectoryAnalyzer.analyze();

2. Передати результат адаптеру для перетворення у потрібний формат;

3. Повернути рядок, який містить сформований звіт.

```typescript
import { DirectoryAnalyzer } from './DirectoryAnalyzer';
import { ReportAdapter } from './ReportAdapter';

export class AnalyzerFacade {
    private analyzer: DirectoryAnalyzer;
    private adapter: ReportAdapter;

    constructor(adapter: ReportAdapter) {
        this.analyzer = new DirectoryAnalyzer();
        this.adapter = adapter;
    }

    generateReport(path: string): string {
				// TODO
    }
} 
```


6. Нарешті створіть високорівневий фасад для керування всім процесом. У файлі ReportManager.ts реалізуйте клас ReportManager, який забезпечує повний життєвий цикл генерації та збереження звіту.

Його обов’язки:

- обрати адаптер згідно з переданим форматом (json, csv, xml);
- створити об’єкт AnalyzerFacade;
- викликати генерацію звіту;
- створити директорію reports/, якщо вона ще не існує;
- зберегти звіт у файл з ім’ям, що містить часову мітку;
- повідомити про успіх у консоль;
- обробити можливі помилки та повідомити про них користувача.

```typescript
import { ReportAdapter } from './ReportAdapter';
import { JsonReportAdapter } from './JsonReportAdapter';
import { CsvReportAdapter } from './CsvReportAdapter';
import { XmlReportAdapter } from './XmlReportAdapter';
import { AnalyzerFacade } from './AnalyzerFacade';
import * as fs from 'fs';
import * as path from 'path';

export class ReportManager {
				// TODO
} 
```


7. Реалізуйте головний файл у main.ts:

```typescript
import { ReportManager } from './ReportManager';

const targetPath = process.argv[2] || '.';
const format = process.argv[3] || 'json';

const manager = new ReportManager(format);
manager.generateReport(targetPath);
```


### Очікуваний результат

Застосунок запускається:

```bash
npx ts-node main.ts "E:\\files\\picture" xml
```

У консолі ми отримуємо:
```bash
Report generated successfully: reports\\report-2025-04-14T12-35-48-339Z.xml
```
У директорії reports/ буде створено файл звіту у відповідному форматі (.json, .csv, .xml). Ім’я файлу включає точну дату та час створення. Вміст звіту залежить від структури директорії.

Результат у форматі JSON може виглядати так:
```json

{
  "files": 54,
  "directories": 5,
  "totalSize": 8469671,
  "extensions": {
    ".jpg": 22,
    ".png": 28,
    ".svg": 1,
    ".jpeg": 2,
    ".PNG": 1
  }
}
```

Результат у форматі CSV може виглядати так:

```csv   
Metric,Value
Total Files,54
Total Directories,5
Total Size (bytes),8469671

Extension,Count
.png,28
.jpg,22
.jpeg,2
.svg,1
.PNG,1
```


Результат у форматі XML може виглядати так:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<report>
  <files>54</files>
  <directories>5</directories>
  <totalSize>8469671</totalSize>
  <extensions>
    <extension name=".jpg" count="22"/>
    <extension name=".png" count="28"/>
    <extension name=".svg" count="1"/>
    <extension name=".jpeg" count="2"/>
    <extension name=".PNG" count="1"/>
  </extensions>
</report>   
```


Усі дані мають відповідати реальним підрахункам, а формат — обраному адаптеру.