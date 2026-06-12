# Домашнє завдання до Теми Поведінковий патерн Спостерігач

## Опис завдання

У цьому домашньому завданні необхідно додати до генератора документа (попереднє домашнє завдання) реактивний шар, який дозволяє відслідковувати процес рендерингу окремих елементів документа. Під час генерації кожен елемент `Paragraph`, `List`, `Section` має повідомляти про те, що він закінчив роботу. Реакція на ці події має реалізовуватись через механізм підписки — тобто через патерн Спостерігач (Observer).

Центральний об'єкт має називатися `RenderEventPublisher`, який зберігає список підписників і розсилає їм повідомлення про подію, що відбулася. Кожен підписник реалізує інтерфейс `RenderEventSubscriber`, який містить метод `update(context: RenderContext)`. Події передаються у вигляді об’єкта типу `RenderContext`, який включає тип елемента, його вміст, додаткову інформацію, як рівень заголовка, кількість пунктів у списку, а також час рендерингу.

Після інтеграції підписників, кожен елемент документа під час рендерингу зможе надсилати подію, на яку реагують підключені сервіси — наприклад, логування або збір статистики. Це дозволяє безболісно розширювати застосунок новими компонентами, такими як логери, аналітика, профайлери, системи повідомлень тощо.

## Структура проекту

```
src/
├── main.ts
├── RenderEventPublisher.ts
├── interfaces/
│   ├── RenderEventSubscriber.ts
│   ├── RenderContext.ts
│   ├── DocNode.ts
│   └── DocRenderer.ts
├── subscribers/
│   ├── RenderLoggerSubscriber.ts
│   ├── SummaryCollector.ts
│   └── PerformanceSubscriber.ts
├── nodes/
│   ├── Section.ts
│   ├── Paragraph.ts
│   └── List.ts
├── factories/
│   └── RendererFactory.ts
└── renderers/
    ├── HTMLRenderer.ts
    ├── MarkdownRenderer.ts
    ├── PlainTextRenderer.ts
    └── BaseRenderer.ts
```

## Як реалізовано патерн Observer

- Кожен елемент (Section, Paragraph, List) після рендеру викликає:
  ```ts
  RenderEventPublisher.notify(context);
  ```
- `RenderEventPublisher` — статичний клас, керує підписниками (subscribe/unsubscribe/notify)
- `RenderEventSubscriber` — інтерфейс підписника (метод update)
- `RenderContext` — об'єкт події (тип елемента, вміст, рівень, items, renderTime)
- Підписники (`subscribers/`):
  - `RenderLoggerSubscriber` — логування рендеру
  - `SummaryCollector` — підрахунок кількості елементів
  - `PerformanceSubscriber` — підрахунок часу рендеру

## Приклад запуску і виводу

```bash
npx ts-node src/main.ts markdown
```

```
# Структурні патерни
...
[Log] Rendered Paragraph (36 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
...
[Summary] Rendered 2 sections, 3 paragraphs, 2 lists
[Performance] Total render time: 12ms
```

## Завдання

Розширити структуру генератора документа з попередньої теми, реалізувавши спостережувану модель рендерингу. Для цього необхідно реалізувати такі компоненти:

Компонент RenderEventPublisher — це центральний об’єкт, який зберігає список підписників і розсилає їм події. Має бути реалізований як статичний клас.

```ts
export class RenderEventPublisher {
  static subscribe(subscriber: RenderEventSubscriber): void;
  static unsubscribe(subscriber: RenderEventSubscriber): void;
  static notify(context: RenderContext): void;
}
```

Компонент RenderEventSubscriber — це інтерфейс, який повинен реалізовувати кожен підписник.

```ts
import { RenderContext } from './RenderContext';

export interface RenderEventSubscriber {
    update(context: RenderContext): void;
}
```

Компонент RenderContext — це тип, який описує деталі події рендерингу.

```ts
export interface RenderContext {
    type: 'Section' | 'Paragraph' | 'List';
    content: string;
    level?: number;
    items?: string[];
    renderTime?: number;
}
```

Цей об’єкт передається всім підписникам щоразу, коли елемент документа закінчує свою роботу.

Необхідно також реалізувати підписники в директорії src/subscribers/.

Підписник RenderLoggerSubscriber виводить у консоль повідомлення про кожен відрендерений елемент, наприклад як [Log] Rendered Paragraph (36 chars).

Підписник SummaryCollector збирає статистику по типах елементів (кількість секцій, параграфів, списків) і виводить її після завершення генерації. Наприклад як, [Summary] Rendered 4 sections, 3 paragraphs, 2 lists

Останній підписник PerformanceSubscriber, який заміряє час генерації кожного елемента і виводить загальний час: [Performance] Total render time: 5ms.

Кожен елемент документа Section, Paragraph та List після завершення генерації викликає:

```ts
RenderEventPublisher.notify(context);
```

Сам виклик можна реалізувати у render()-методі відповідного елемента або винести у допоміжний метод, наприклад у BaseRenderer, якщо зручно.

У main.ts має бути підключено всі підписники через subscribe().

```ts
const logger = new RenderLoggerSubscriber();
const summary = new SummaryCollector();
const perf = new PerformanceSubscriber();

RenderEventPublisher.subscribe(logger);
RenderEventPublisher.subscribe(summary);
RenderEventPublisher.subscribe(perf);
```

### Очікуваний результат

Запуск застосунку:

```bash
npx ts-node .\\src\\main.ts markdown output.md
```


Повинен виводити в консолі повідомлення рендерингу:

```text
[Log] Rendered Paragraph (44 chars)
[Log] Rendered Paragraph (53 chars)
[Log] Rendered List (3 items)
[Log] Rendered Section ("Composite", level 2)
[Log] Rendered Paragraph (34 chars)
[Log] Rendered List (2 items)
[Log] Rendered Section ("Bridge", level 2)
[Log] Rendered Section ("Основні патерни", level 2)
[Log] Rendered Section ("Структурні патерни", level 1)
[Summary] Rendered 4 sections, 3 paragraphs, 2 lists
[Performance] Total render time: 5ms
```

Ці повідомлення генеруються як результат виклику notify(context) і спрацьовування підписників.

Структура проєкту має бути доповнена такими файлами:

```
- RenderEventPublisher.ts
- interfaces/RenderEventSubscriber.ts
- interfaces/RenderContext.ts
- subscribers/RenderLoggerSubscriber.ts
- subscribers/SummaryCollector.ts
- subscribers/PerformanceSubscriber.ts
```

## Поради щодо виконання

Вітаю на восьмому тижні! Ми переходимо до вивчення поведінкових патернів, і першим у списку є, мабуть, найпопулярніший із них - Observer (Спостерігач). Це завдання показує, як зробити систему «реактивною». Тепер ваш генератор документів не просто мовчки створює файл, а «кричить» про  кожну свою дію, дозволяючи іншим сервісам (логам, аналітиці) миттєво на це реагувати.
Ось мої поради, як найкраще інтегрувати цей патерн у ваш проєкт:

### 1. Observer (Спостерігач): Розірвання зв'язків

Головна цінність цього патерну в тому, що Paragraph або Section поняття не мають, що існує якийсь SummaryCollector.

На що звернути увагу: Елементи документа знають лише про RenderEventPublisher.notify(). Вони просто кидають подію "в ефір".

Чому це важливо: Це дозволяє вам додавати скільки завгодно нових підписників (наприклад, надсилати статистику в Telegram або записувати в базу даних), не змінюючи жодного рядка коду в класах документів.

### 2. Реалізація RenderEventPublisher
У завданні пропонується реалізувати його як статичний клас. Це зручно, оскільки нам потрібна єдина точка доступу до подій у всьому застосунку.

Порада: Зберігайте список підписників у приватному статичному масиві private static subscribers: RenderEventSubscriber[] = [];.
Логіка notify: Пройдіть циклом по цьому масиву та викличте метод update(context) у кожного підписника. Використовуйте try...catch всередині циклу, щоб один "зламаний" підписник не зупинив процес рендерингу всього документа.

### 3. Збір статистики у SummaryCollector
Цей підписник має накопичувати дані.

На що звернути увагу: Створіть усередині класу об'єкт для зберігання лічильників, наприклад:

private stats = { Section: 0, Paragraph: 0, List: 0 };

Порада: Оскільки SummaryCollector має вивести підсумок після завершення всієї генерації, вам потрібно буде або викликати спеціальний метод printSummary() вручну в main.ts, або додати в RenderContext спеціальний тип події Finished.

### 4. Вимірювання часу в PerformanceSubscriber
Для точного вимірювання часу в Node.js найкраще використовувати performance.now().

- Технічна деталь: Щоб отримати renderTime, засікайте час на початку методу render() у кожному вузлі та обчислюйте різницю перед викликом notify().
- Результат: Це навчить вас не просто писати код, а й думати про його ефективність.
Чек-лист для самоперевірки:

- Порядок виклику: Чи викликаєте ви subscribe() у main.ts до того, як почнете рендерити документ? (Якщо підписатися після - події будуть втрачені).
- Типізація: Чи використовуєте ви RenderContext для передачі даних? Перевірте, чи правильно заповнюються поля level для секцій та items для списків.
- Логіка Section: Пам'ятайте, що Section закінчує свій рендер останньою (після всіх своїх дітей). Тому в логах подія від Section (level 1) має з'явитися в самому кінці.
- Незалежність: Чи може ваша програма працювати, якщо в main.ts не буде жодного підписника? (Відповідь має бути - ТАК, вона просто мовчки створить файл).

Порада від мене: Патерн Observer - це основа сучасного фронтенду (RxJS, події в браузері) та бекенду (Event-driven architecture). Розуміння того, як об'єкти спілкуються через події, переведе вашу архітектуру з рівня "лінійної" на рівень "модульної та гнучкої".