# Домашнє завдання до Теми Структурні патерни: Компонувальник та Міст

### Опис завдання

У цьому домашньому завданні необхідно буде реалізувати систему генерації документів, яка дозволяє створювати документ із кількох вкладених блоків. Буде три види блоків — параграфи, списки та секції. Документи необхідно зберігати і виводити у різних форматах: Markdown, HTML, plain text (чистий текст).

Архітектура застосунку повинна демонструвати чітке розділення відповідальностей:

- структура документа моделюється у вигляді дерева елементів, де `Section` є вузлом, який містить інші елементи;
- форматування виводу делегується окремим об’єктам — рендерерам, що реалізують єдиний інтерфейс.

Це завдання ілюструє два структурні патерни:

- Composite — має бути реалізовано в класі `Section`, який дозволяє створювати ієрархію елементів `DocNode`;
- Bridge — має бути реалізовано через інтерфейс `DocRenderer`, який можна підставляти у будь-який елемент для зміни формату виводу.

## Структура проекту

```
src/
├── interfaces/          # Інтерфейси
│   ├── DocNode.ts      # Базовий інтерфейс для всіх елементів документа
│   └── DocRenderer.ts  # Інтерфейс для рендерерів
├── renderers/          # Реалізації рендерерів
│   ├── BaseRenderer.ts      # Базовий клас для рендерерів
│   ├── HTMLRenderer.ts      # HTML формат
│   ├── MarkdownRenderer.ts  # Markdown формат
│   └── PlainTextRenderer.ts # Простий текст
├── nodes/              # Елементи документа
│   ├── List.ts        # Список
│   ├── Paragraph.ts   # Параграф
│   └── Section.ts     # Секція (Composite)
├── factories/          # Фабрики
│   └── RendererFactory.ts  # Фабрика для створення рендерерів
└── main.ts            # Точка входу
```

## Патерни проектування

### Composite

- Реалізовано в класі `Section`, який може містити інші елементи документа
- Всі елементи документа реалізують інтерфейс `DocNode`
- Дозволяє створювати деревоподібну структуру документа
- `Section` може містити `Paragraph`, `List` та інші `Section`

### Bridge

- Відокремлює абстракцію (`DocNode`) від реалізації (`DocRenderer`)
- Дозволяє незалежно змінювати формат виводу та структуру документа
- Реалізовано через:
  - Інтерфейс `DocRenderer`
  - Базовий клас `BaseRenderer`
  - Конкретні рендерери: `HTMLRenderer`, `MarkdownRenderer`, `PlainTextRenderer`

## Встановлення

```bash
npm install
```

## Використання

### Запуск з виводом в консоль

```bash
npm start -- markdown  # Markdown формат
npm start -- plain    # Простий текст
npm start -- html     # HTML формат
```

### Збереження у файл

```bash
npm start -- html output.html     # Зберегти як HTML
npm start -- markdown output.md   # Зберегти як Markdown
npm start -- plain output.txt     # Зберегти як текст
```

``

## Розширення

Для додавання нового формату виводу:

1. Створіть новий клас рендерера в `src/renderers/`
2. Успадкуйте його від `BaseRenderer`
3. Реалізуйте необхідні методи
4. Додайте новий формат у `RendererFactory`


## Завдання

Усі елементи документа Paragraph, List, та Section повинні реалізовувати інтерфейс DocNode, який містить метод render(): string.

```typescript
export interface DocNode {
  render(): string;
} 
```


Елементи не повинні самостійно вирішувати, у якому форматі генеруватись — це має бути повністю делеговано об’єкту DocRenderer, переданому через конструктор.

```typescript
export interface DocRenderer {
  renderHeader(level: number, text: string): string;
  renderParagraph(text: string): string;
  renderList(items: string[]): string;
  wrapDocument(content: string): string;
} 
```


Клас Section відповідає за групування інших елементів документа. Він реалізує інтерфейс DocNode, тому поводиться як повноцінний елемент документа, але при цьому містить список дочірніх елементів. У патерні Компонувальник (Composite) елемент може бути простим (Paragraph, List) або бути контейнером інших елементів, тобто мати children, як дерево. Клас Section — це контейнер. Він зберігає список інших DocNode, наприклад: один Paragraph, один List, ще один Section. Водночас, Section сам реалізує інтерфейс DocNode, тобто він сам є частиною документа, як і всі інші елементи.

```typescript
export class Section implements DocNode {
  constructor(
    private title: string,
    private renderer: DocRenderer,
    private children: DocNode[] = [],
    private level: number = 1
  ) {}

  add(child: DocNode): void {
    this.children.push(child);
  }

  render(): string {
		// TODO
  }
} 
```


Метод render() спочатку формує заголовок секції, а потім додає до нього вивід усіх дочірніх елементів у заданому порядку. Коли ми викликаємо section.render(), метод повинен вивести свій власний заголовок потім — викликати render() для кожного дочірнього елемента та об’єднати всі ці частини в один результат — суцільний текст.

Усі рендери мають реалізовувати інтерфейс DocRenderer, який визначає форматування для заголовків, параграфів і списків. Усі рендери мають наслідуватись від BaseRenderer.

```typescript
import { DocRenderer } from "../interfaces/DocRenderer";

export abstract class BaseRenderer implements DocRenderer {
  abstract renderHeader(level: number, text: string): string;
  abstract renderParagraph(text: string): string;
  abstract renderList(items: string[]): string;

  wrapDocument(content: string): string {
    return content;
  }

  protected escape(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
} 
```


Метод wrapDocument() використовується рендерами для обгортки всього виводу — наприклад, у <html>-розмітку.

Для вибору рендера реалізуйте фабрику RendererFactory у директорії src/factories/. Метод createRenderer(format: string): DocRenderer приймає назву формату і повертає відповідний об’єкт. Якщо формат невідомий, фабрика повинна повертати Markdown рендер за замовчуванням.

```typescript
class RendererFactory {
  static create(type: RendererType): DocRenderer {
		//TODO
  }

  static getSupportedFormats(): RendererType[] {
    return ['html', 'markdown', 'plain'];
  }
} 
```


Тип RendererType має бути оголошений як:

```typescript
export type RendererType = 'html' | 'markdown' | 'plain';
```

і може бути розміщений безпосередньо у файлі фабрики.

Цей клас повинен інкапсулювати логіку вибору між MarkdownRenderer, PlainTextRenderer та HTMLRenderer, і має використовуватись у main.ts замість прямого створення рендера.

Формат виводу вибирається через аргумент командного рядка при запуску main.ts. Опціонально можна передати другий аргумент — шлях до файлу, в який потрібно зберегти результат. Якщо шлях не вказано — результат виводиться в консоль.



Приклад реалізації main.ts

```typescript
import { writeFileSync } from 'fs';
import { RendererFactory, RendererType } from './factories/RendererFactory';
import { Section } from './nodes/Section';
import { Paragraph } from './nodes/Paragraph';
import { List } from './nodes/List';

function createDocument(format: RendererType): string {
  const renderer = RendererFactory.create(format);
  const doc = new Section("Структурні патерни", renderer, [], 1);

  const patterns = new Section("Основні патерни", renderer, [
    new Paragraph("Розглянемо два важливих структурних патерни.", renderer),
    new Section("Composite", renderer, [
      new Paragraph("Дозволяє створювати деревоподібні структури об'єктів.", renderer),
      new List(["Спрощує структуру", "Гнучкий код", "Легка підтримка"], renderer)
    ], 2),
    new Section("Bridge", renderer, [
      new Paragraph("Розділяє абстракцію та реалізацію.", renderer),
      new List(["Незалежні зміни", "Краща масштабованість"], renderer)
    ], 2)
  ], 2);

  doc.add(patterns);
  return doc.render();
}

const { format, output } = {
  format: (process.argv[2] || 'markdown') as RendererType,
  output: process.argv[3]
};

const content = createDocument(format);
const renderer = RendererFactory.create(format);
const result = renderer.wrapDocument(content);

output ? writeFileSync(output, result) : console.log(result); 
```


### Очікуваний результат

При запуску:


```bash
npx ts-node .\\src\\main.ts markdown output.md 
```



Буде створено файл output.md:

```md
# Структурні патерни

## Основні патерни

Розглянемо два важливих структурних патерни.

## Composite

Дозволяє створювати деревоподібні структури об'єктів.

- Спрощує структуру
- Гнучкий код
- Легка підтримка

## Bridge

Розділяє абстракцію та реалізацію.

- Незалежні зміни
- Краща масштабованість
```

При запуску:

```bash
npx ts-node .\\src\\main.ts html output.html 
```

Створюється файл output.html з вмістом:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }

    h2 {
      color: #2c3e50;
      margin-top: 2em;
    }

    ul {
      list-style-type: disc;
      padding-left: 2em;
    }
  </style>
</head>

<body>
  <h1>Структурні патерни</h1>

  <h2>Основні патерни</h2>

  <p>Розглянемо два важливих структурних патерни.</p>

  <h2>Composite</h2>

  <p>Дозволяє створювати деревоподібні структури об&#039;єктів.</p>

  <ul>
    <li>Спрощує структуру</li>
    <li>Гнучкий код</li>
    <li>Легка підтримка</li>
  </ul>

  <h2>Bridge</h2>

  <p>Розділяє абстракцію та реалізацію.</p>

  <ul>
    <li>Незалежні зміни</li>
    <li>Краща масштабованість</li>
  </ul>
</body>

</html>
```

Форматування залежить лише від рендера. Структура документа не змінюється.


## Поради

Вітаю на сьомому тижні! Це одне з найцікавіших завдань курсу, оскільки воно демонструє, як два потужні патерни - Composite (Компонувальник) та Bridge (Міст) - працюють разом для створення складної, але гнучкої системи. Ми будуємо генератор документів, де структура (що ми пишемо) повністю відокремлена від представлення (як це виглядає).

Ось мої поради, як реалізувати це завдання на високому рівні:

### 1. Composite (Компонувальник): Робота з деревом

Патерн Composite дозволяє нам ставитися до одного об'єкта та до групи об'єктів однаково.

- На що звернути увагу: Клас Section - це ваш "вузол" дерева. Він одночасно є елементом документа (DocNode) і контейнером для інших елементів.
- Реалізація render(): Тут криється магія рекурсії. Метод render() у секції повинен спочатку викликати рендер свого заголовка, а потім пройтися циклом по всіх children і викликати їхні методи render(). Вам не потрібно знати, що лежить всередині - параграф чи інша секція. Вони всі мають метод render().

### 2. Bridge (Міст): Розділяємо абстракцію та реалізацію

Це серце завдання. Замість того, щоб створювати класи HtmlParagraph, MarkdownParagraph тощо, ми створюємо один Paragraph, який використовує інтерфейс DocRenderer.

На що звернути увагу: Елементи документа (Paragraph, List, Section) не знають нічого про HTML чи Markdown. Вони лише кажуть: «Рендерер, намалюй мені параграф з таким текстом».
Чому це круто: Ви можете додати новий формат (наприклад, PDF або JSON), просто створивши новий клас рендерера. Вам не доведеться змінювати жоден клас у папці nodes/.
### 3. BaseRenderer та захист від XSS
Використання базового класу BaseRenderer з методом escape() - це дуже хороша практика.

Порада: Обов'язково використовуйте this.escape(text) у вашому HTMLRenderer. Це вбереже ваш документ від того, щоб символи < або & не "зламали" розмітку сторінки. У Markdown-рендерері це може бути не так критично, але для HTML - обов'язково.


### 4. Фабрика та динамічність
Клас RendererFactory робить вашу програму професійною.

На що звернути увагу: Використовуйте фабрику в main.ts. Це дозволяє вашій програмі бути "закритою для змін, але відкритою для розширення" (принцип OCP). Якщо ви додасте новий формат, ви просто оновите фабрику, а основна логіка створення документа в createDocument залишиться незмінною.

### Чек-лист для самоперевірки:

- Рекурсія в Section: Чи викликає ваша секція метод render() для всіх своїх дітей?
- Типізація: Чи скрізь ви використовуєте інтерфейси DocNode та DocRenderer замість конкретних класів?
- HTML Обгортка: Чи не забули ви викликати wrapDocument() наприкінці? Для HTML-файлу це критично, бо без тегів <html> та <body> файл не буде валідним документом.
- CLI аргументи: Чи коректно працює програма, якщо запустити її без другого аргументу (вивід у консоль)?

Порада від мене: Поєднання Composite та Bridge часто використовується в графічних редакторах або браузерних рушіях. Розуміння цієї архітектури - це крок до розуміння того, як влаштовані складні інтерфейси та системи рендерингу.