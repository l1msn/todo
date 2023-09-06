## Оглавление

- [Обзор проекта](https://github.com/l1msn/todo#обзор-проекта)
- [Стек](https://github.com/l1msn/todo#стек)
- [Запуск проекта](https://github.com/l1msn/todo#запуск-проекта)
- [Скрипты](https://github.com/l1msn/todo#скрипты)
- [Тесты](https://github.com/l1msn/todo#тесты)
- [Vercel](https://github.com/l1msn/todo#netlify)
- [Обзор компонентов и функционала](https://github.com/l1msn/todo#обзор-компонентов-и-функционала)

----

## Обзор проекта

Оценить проект можите по [ссылке](https://melodic-torte-ef50e9.netlify.app)

Проект представляет из себя pet-проект для демонстрации своих навыков
работадателю.

----

## Стек


| Стэк         | Технологии                                             |
|--------------|--------------------------------------------------------|
| Клиентская часть | TypeScript, React, SCSS                                |
| Сборщики | Webpack                                                |
| Тестирование | React Testing Library (+user event), Cypress(e2e), Jest(unit) |
| Линтеры/Форматирование | ESLint, StyleLint, Prettier                            |
| Дополнительно | Babel, i18n                |

----

----

### Запуск проекта

```
npm install - устанавливаем зависимости
npm start - запуск сервера + frontend проекта в dev режиме
```
```
npm run test:unit - тестирование по Jest\RTL(unit, int)
npm run test:e2e - тестирование по Cypress(e2e)
```

----

### Скрипты

- `npm start` - Запуск frontend проекта на webpack dev server
- `npm run build:prod` - Сборка в prod режиме
- `npm run build:dev` - Сборка в dev режиме (не минимизирован)
- `npm run prettier` - Исправление prettier
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов style линтером
- `npm run lint:scss:fix` - Исправление scss файлов style линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:e2e` - Запуск e2e тестов с Cypress
- `npm run storybook` - запуск Storybook
- `npm run storybook:build` - Сборка storybook билда

----

### Тесты

В проекте используются 4 вида тестов:
1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) e2e тестирование с Cypress `npm run test:e2e`


----

### Netlify

Клиентская часть размещена на [Netlify](https://app.netlify.com) - https://melodic-torte-ef50e9.netlify.app

----

## Обзор компонентов и функционала

Основной компонент widget [ToDoList.tsx](https://github.com/l1msn/todo/blob/master/src/widgets/ToDoList/ui/ToDoList.tsx)
Ячейки ToDoList'а [ToDoTab.tsx](https://github.com/l1msn/todo/blob/master/src/entities/ToDo/ui/ToDoTab/ToDoTab.tsx)
Тестирование Jest\RTL(unit,int) [ToDoList.test.tsx](https://github.com/l1msn/todo/blob/master/src/widgets/ToDoList/ui/ToDoList.test.tsx)
Тестирование Cypress(e2e) [todolist.cy.ts](https://github.com/l1msn/todo/blob/master/cypress/e2e/todolist.cy.ts)
Внутри этих компонентов имеются комментарии

Данные todo'шки сохраняются в localStorage(в ТЗ не указан никакой StateManager\DB).
Если нет данных в localStorage, то используются стандартные заданные. Иначе будут братся актуальные из localStorage.




----
