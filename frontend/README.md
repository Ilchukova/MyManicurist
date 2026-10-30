# MyManicurist

Учебная информационная система для поиска мастеров маникюра и онлайн-записи.

## Стек
- React + TypeScript + Vite
- React Router
- CSS Modules
- Mock API (подготовлен для последующего MSW/Fastify)

## Структура
- `src/components` — переиспользуемые презентационные компоненты
- `src/pages` — маршрутные страницы
- `src/api` — API-клиент и запросы
- `src/hooks` — переиспользуемые React-хуки
- `src/store` — глобальное состояние приложения
- `src/routes` — конфигурация маршрутов
- `src/config` — конфигурация и константы
- `src/types` — TypeScript-типы домена
- `src/data/mock` — учебные моковые данные
- `src/utils` — чистые вспомогательные функции
- `src/assets/styles` — глобальные стили и CSS-переменные

## Запуск
```bash
npm install
npm run dev
```

## Следующие шаги курса
1. Заменить mock API на MSW.
2. Добавить Docker.
3. Подключить Fastify.
4. Вынести данные в БД.
5. Добавить CI/CD.
