# Домашнє завдання до Теми 4

### Опис завдання

У цьому домашньому завданні необхідно опрацювати три окремі приклади застосування породжувальних патернів: Одинак, Будівельник та Прототип.

Кожен приклад подано як реалістичну задачу з практичного TypeScript-контексту. Ваше завдання — проаналізувати початковий код та застосувати відповідний патерн, переписавши реалізацію.

## Структура проєкту

```
src/
├── builder/          # Builder pattern implementation
│   ├── DocumentBuilder.ts
│   └── main.ts
├── prototype/        # Prototype pattern implementation
│   └── main.ts
└── singleton/        # Singleton pattern implementation
    └── main.ts
```


### 1. Реалізація патерну Одинак

Надається реалізація класу AppConfigService, який зберігає глобальні налаштування для всього застосунку. У поточній реалізації немає обмеження на кількість створених екземплярів, тому кожен модуль створює новий об’єкт і втрачає єдність конфігурації.

Ваше завдання — перетворити AppConfigService на Одинак, щоб у всій системі існував лише один екземпляр конфігураційного сервісу.

Початковий код src\\singleton\\AppConfigService.ts:

```typescript
export class AppConfigService {
  constructor(
    public readonly companyName: string,
    public readonly footer: string
  ) {}
}
```

Файл src\\singleton\\main.ts

```typescript
import { AppConfigService } from "./core/AppConfigService";

const config1 = new AppConfigService("Acme Inc.", "Confidential");
const config2 = new AppConfigService("Another Corp", "Top Secret");

console.log(config1.companyName); // Acme Inc.
console.log(config2.companyName); // Another Corp
```

#### Очікуваний результат

Уся система має використовувати єдиний об’єкт AppConfigService.
Неможливо створити новий об’єкт напряму через new.
У main.ts при повторному виклику отримується вже створений екземпляр:

```typescript
const config1 = AppConfigService.getInstance();
const config2 = AppConfigService.getInstance();

console.log(config1 === config2); // true
```

#### Вимоги

Код із реалізацією Одинака AppConfigService у файлі src\\singleton\\AppConfigService.ts;
Файл main.ts, який демонструє правильну поведінку;


### 2. Реалізація патерну Будівельник

У компанії генеруються текстові документи, які складаються з кількох частин: заголовка, основного тексту, підпису. На цей момент документ формується вручну, через конкатенацію рядків у довільному порядку, що призводить до дублювання коду та помилок структури.

Ваше завдання — застосувати патерн Будівельник, щоб централізувати логіку формування документа, зробити її гнучкою, передбачуваною та контрольованою.

Початковий код в файлі src/builder/main.ts:

```typescript
const header = "ACME Corporation — Report";
const body = "Quarterly performance increased by 12%.";
const footer = "--- Confidential ---";

const myDocument = header + "\\n\\n" + body + "\\n\\n" + footer;

console.log(myDocument);
```


#### Очікуваний результат

```typescript
const builder = new DocumentBuilder();
const output = builder
  .addHeader("ACME Corporation — Report")
  .addBody("Quarterly performance increased by 12%.")
  .addFooter("--- Confidential ---")
  .build();

console.log(output);
```


#### Виведення:

```typescript
=== ACME Corporation — Report ===

Quarterly performance increased by 12%.

--- Confidential ---
```

#### Вимоги

1. У файлі src/builder/DocumentBuilder.ts створено клас DocumentBuilder, який:
    має методи addHeader(string), addBody(string), addFooter(string);
    будує документ методом build(): string;
    зберігає порядок частин незалежно від порядку викликів.
2. Переписано main.ts, і він створює документ через DocumentBuilder та демонструє використання патерну.



### 3. Реалізація патерну Прототип 

У внутрішній системі управління користувачами зберігаються типові профілі доступу — наприклад, "finance-chief" або "engineering-lead". Кожен профіль включає ім’я користувача, відділ і набір прав доступу. Часто виникає потреба створити нового користувача на основі існуючого профілю, з незначними змінами.

Ваше завдання — застосувати патерн Прототип, реалізувавши метод clone(), який створює незалежну копію об'єкта профілю користувача.

У файлі src/prototype/UserProfilePrototype.ts створіть інтерфейс:

```typescript
export interface UserProfilePrototype {
  clone(): UserProfilePrototype;
}
```

У файлі src/prototype/UserProfile.ts реалізуйте клас UserProfile, який реалізує UserProfilePrototype та має наступні поля:

```typescript
username: string;
department: 'finance' | 'engineering' | 'marketing';
permissions: {
  canEditUsers: boolean;
  canApproveBudget: boolean;
  canAccessInternalTools: boolean;
};
```

Клас повинен реалізувати метод clone(), який повертає новий об’єкт з новим об’єктом permissions, як глибока копія.

У файлі src/prototype/main.ts

```typescript
створіть профіль "Гупало Іван" з усіма правами;
створіть копію цього профілю;
змініть username та вимкніть canEditUsers у копії;
виведіть обидва профілі у консоль та переконайтесь, що оригінал не змінився.
```

#### Очікуваний результат

```typescript
const chief = new UserProfile("Гупало Іван", "finance", {
  canEditUsers: true,
  canApproveBudget: true,
  canAccessInternalTools: true
});

const deputy = chief.clone() as UserProfile;
deputy.username = "Коваль Максим";
deputy.permissions.canEditUsers = false;

console.log(chief);
console.log(deputy);
```

#### Вимоги

1. У файлі src/prototype/UserProfilePrototype.ts описано інтерфейс UserProfilePrototype з методом clone(): UserProfilePrototype.

2. У файлі src/prototype/UserProfile.ts реалізовано клас UserProfile, який:
    реалізує інтерфейс UserProfilePrototype;
    має публічні поля:
    username: string;
    department: 'finance' | 'engineering' | 'marketing';
    permissions: { canEditUsers: boolean; canApproveBudget: boolean; canAccessInternalTools: boolean; }

3. У методі clone() класу UserProfile реалізовано:
    створення нового екземпляра класу UserProfile;
    копіювання значень усіх полів;
    обов’язкове створення нового об’єкта permissions, а не посилання на існуючий, тобто глибоке клонування.

4. У main.ts реалізовано демонстрацію:
    створення об’єкта UserProfile з усіма правами доступу;
    клонування цього об’єкта через clone();
    редагування деяких полів у копії;
    виведення в консоль обох об’єктів для підтвердження незалежності копії.


## Рекомендації:

### 1. Singleton (Одинак): Контроль над глобальним станом
    Студенти часто забувають, що Singleton - це не просто клас, який "важко створити", а клас, який забороняє створювати себе ззовні.

    На що звернути увагу: Обов'язково зробіть конструктор private. Якщо залишити його публічним, патерн не працюватиме, бо будь-хто зможе написати new AppConfigService().
    Технічна порада: Екземпляр класу зберігайте у статичному полі private static instance. Метод getInstance() має перевіряти: якщо інстанс вже є - повертати його, якщо немає - створювати.

### 2. Builder (Будівельник): Порядок має значення
    Builder використовується, коли об'єкт збирається покроково, і ми хочемо уникнути "конструкторів-монстрів" з десятком параметрів.

    На що звернути увагу: Метод build() - це фінальний етап. До цього моменту методи addHeader, addBody тощо повинні повертати this. Це дозволяє використовувати Fluent Interface (ланцюжок викликів через крапку).
    Гнучкість: Зверніть увагу на вимогу "зберігати порядок частин незалежно від порядку викликів". Це означає, що всередині Builder ви можете мати окремі змінні для заголовка, тіла та футера, а в методі build() збирати їх у правильній послідовності: header + body + footer.

### 3. Prototype (Прототип): Глибоке копіювання
    Це найпідступніша частина завдання. В JavaScript/TypeScript об'єкти передаються за посиланням.
    Критично важливий момент: Коли ви робите clone(), ви не можете просто написати return new UserProfile(this.username, this.department, this.permissions). Чому? Тому що this.permissions - це об'єкт. Якщо ви просто передасте його, то оригінал і копія будуть посилатися на один і той самий об'єкт у пам'яті. Зміните права у копії - вони зміняться і в оригіналі.
    Рішення: Вам потрібно зробити глибоку копію (deep copy) поля permissions. Найпростіший спосіб у цьому завданні - створити новий об'єкт:
    permissions: { ...this.permissions } // Spread operator створює копію

### Чек-лист для перевірки ДЗ:

- **Singleton**: Чи став конструктор приватним? Чи повертає config1 === config2 значення true?
- **Builder**: Чи працює ланцюжок викликів (.addHeader().addBody().build())? Чи виглядає фінальний рядок так, як в очікуваному результаті?
- **Prototype**: Чи перевірили ви, що зміна permissions у клона не впливає на оригінал? Це найчастіша помилка на рев'ю.
- **Структура**: Чи рознесені патерни по різних папках, як того вимагає завдання?


## Запуск

1. Встановити залежності:

```bash
npm install
```

2. Запустити приклад Builder патерну:

```bash
npm run builder
```

3. Запустити приклад Prototype патерну:

```bash
npm run prototype
```

4. Запустити приклад Singleton патерну:

```bash
npm run singleton
```

Для розробки з автоматичною перезбіркою:

```bash
npm run dev
```
