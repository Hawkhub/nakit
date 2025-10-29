# Nakit - Каталог товаров 💎

Монорепозиторий для сайта-каталога ювелирных изделий с Pocketbase бэкендом и Next.js фронтендом.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Pocketbase](https://img.shields.io/badge/Pocketbase-0.22-orange)](https://pocketbase.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Быстрый старт (5 минут)

```bash
# 1. Установка зависимостей
npm install

# 2. Автоматическая настройка (скачает Pocketbase)
./scripts/setup.sh

# 3. Запуск всего проекта
npm run dev
```

**URLs после запуска:**
- Frontend: http://localhost:3000
- Backend Admin: http://127.0.0.1:8090/_/
- API: http://127.0.0.1:8090/api/

### Первоначальная настройка Pocketbase

При первом запуске Pocketbase:
1. Откройте http://127.0.0.1:8090/_/
2. Создайте админ аккаунт
3. Settings → Import collections
4. Загрузите `backend/pb_schema.json`
5. Нажмите "Import"

### Создание .env.local для фронтенда

```bash
echo "NEXT_PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090" > frontend/.env.local
```

## ✨ Возможности

- ✅ **Каталог товаров** с красивой адаптивной сеткой
- ✅ **Детальные страницы** товаров с галереей изображений
- ✅ **Server-Side Rendering** для лучшего SEO
- ✅ **Автоматическая оптимизация** изображений
- ✅ **TypeScript** для type safety
- ✅ **Готовая админ-панель** Pocketbase
- ✅ **REST API** из коробки
- ✅ **Интересный grid layout** с вариативными размерами карточек

## 📁 Структура проекта

```
nakit/
├── backend/              # Pocketbase бэкенд
│   ├── pb_data/         # База данных (автоматически)
│   ├── pb_hooks/        # Серверные хуки
│   │   └── main.pb.js
│   ├── pb_migrations/   # Миграции (автоматически)
│   ├── pb_schema.json   # Схема для импорта
│   ├── scripts/
│   │   ├── download-pocketbase.sh
│   │   └── start-pocketbase.js
│   └── README.md        # Документация backend
│
├── frontend/            # Next.js фронтенд
│   ├── public/          # Статика
│   ├── src/
│   │   ├── app/        # Страницы (App Router)
│   │   │   ├── layout.tsx    # Root layout
│   │   │   ├── page.tsx      # Главная
│   │   │   ├── loading.tsx   # Loading UI
│   │   │   ├── error.tsx     # Error UI
│   │   │   └── product/
│   │   │       └── [id]/
│   │   │           ├── page.tsx
│   │   │           └── loading.tsx
│   │   ├── components/      # React компоненты
│   │   │   ├── Navbar.tsx
│   │   │   └── ProductCard.tsx
│   │   └── lib/             # Утилиты
│   │       └── pocketbase.ts # API клиент + типы
│   ├── next.config.mjs
│   ├── tsconfig.json
│   └── README.md        # Документация frontend
│
├── scripts/             # Утилиты проекта
│   └── setup.sh        # Автоматическая настройка
├── docker-compose.yml   # Docker конфигурация
├── Makefile            # Команды
└── package.json        # Workspace root
```

## 🛠 Технологии

### Backend
- **Pocketbase 0.22+** - база данных + REST API
- **SQLite** - хранилище данных
- **JavaScript** - серверные хуки

### Frontend
- **Next.js 14** - React фреймворк с App Router
- **React 18** - UI библиотека
- **TypeScript 5.5** - типизация
- **CSS3** - стилизация
- **Pocketbase SDK** - клиент API

### DevOps
- **npm workspaces** - monorepo
- **Docker** - контейнеризация
- **GitHub Actions** - CI/CD
- **Make** - автоматизация

## 🗄️ База данных

### Коллекции

**Основные:**
- **products** - товары (11 полей + связи)
- **product_colors** - цвета (справочник)
- **product_collections** - коллекции товаров
- **product_types** - типы товаров (справочник)
- **shops** - магазины (с адресами)

### Связи

```
Product ──► ProductCollection (many-to-one)
Product ──► ProductColor      (many-to-one)
Product ──► ProductType       (many-to-one)
Product ──► Shop              (many-to-many)
```

### API эндпоинты

- `GET /api/collections/products/records` - список товаров
- `GET /api/collections/products/records/:id` - один товар
- `GET /api/collections/products/records?expand=collection_id,color_id,type_id` - с связями
- `GET /api/files/:collection/:recordId/:filename?thumb=WxH` - изображения с ресайзом

Все эндпоинты публичные для чтения, автоматически фильтруют скрытые элементы (`hidden=false`).

### Структура Product

```typescript
interface Product {
  id: string;
  title: string;              // до 255 символов
  description?: string;       // до 2000 символов
  price: number;
  hidden?: boolean;
  preview_image?: string;     // одно изображение
  images?: string[];          // до 10 изображений
  collection_id?: string;
  shop_ids?: string[];
  type_id?: string;
  color_id?: string;
  is_transformorable?: boolean;
}
```

## 📝 Добавление данных

### 1. Откройте админ-панель

http://127.0.0.1:8090/_/

### 2. Создайте справочники

**Цвета:**
```
product_colors:
- Золото 585
- Золото 750
- Серебро 925
- Белое золото
- Розовое золото
```

**Типы:**
```
product_types:
- Кольцо
- Серьги
- Браслет
- Колье
- Подвеска
```

**Коллекции (опционально):**
```
product_collections:
- Классика
- Современность
- Винтаж
```

**Магазины (опционально):**
```
shops:
- name: "Центральный"
- address: "г. Москва, ул. Тверская, д. 1"
- phone: "+7 (495) 123-45-67"
- hidden: false
```

### 3. Создайте товары

Collections → products → New record:
- **title**: "Золотое кольцо"
- **price**: 50000
- **description**: "Красивое кольцо"
- **hidden**: false
- **preview_image**: загрузите фото
- Выберите связи (цвет, тип, коллекцию, магазины)

## 💻 Полезные команды

### NPM команды

```bash
# Запуск всего проекта
npm run dev

# Только бэкенд
npm run dev:backend

# Только фронтенд
npm run dev:frontend

# Билд фронтенда
npm run build:frontend
```

### Make команды

```bash
make dev              # Запуск всего проекта
make dev-backend      # Только backend
make dev-frontend     # Только frontend
make build            # Сборка frontend
make setup            # Первоначальная настройка
make download-pb      # Скачать Pocketbase
```

## 🐳 Docker

```bash
# Создать .env файл
cp .env.example .env

# Запустить
docker-compose up -d

# Остановить
docker-compose down
```

## 🚀 Деплой

### Backend (Pocketbase)

1. Скопируйте Pocketbase на VPS
2. Скопируйте `pb_data` (база данных)
3. Запустите:
```bash
./pocketbase serve --http="0.0.0.0:8090"
```
4. Настройте nginx/caddy для reverse proxy
5. Добавьте SSL сертификат

### Frontend (Next.js)

1. Обновите `.env.production`:
```bash
NEXT_PUBLIC_POCKETBASE_URL=https://your-api-domain.com
```

2. Соберите:
```bash
cd frontend
npm run build
```

3. Деплой на **Vercel**:
```bash
vercel --prod
```

Или **Netlify**:
```bash
netlify deploy --prod
```

Или **Custom VPS**:
```bash
npm run start
```

## 🔧 Разработка

### Добавление новой коллекции в БД

1. Откройте админ-панель: http://127.0.0.1:8090/_/
2. Создайте новую коллекцию
3. Экспортируйте схему: Settings → Export collections
4. Сохраните в `backend/pb_schema.json`
5. Добавьте TypeScript типы в `frontend/src/lib/pocketbase.ts`

### Добавление новой страницы

1. Создайте папку в `frontend/src/app/`
2. Добавьте файл `page.tsx`
3. Опционально: `loading.tsx`, `error.tsx`

### Добавление компонента

```typescript
// frontend/src/components/MyComponent.tsx
export function MyComponent() {
  return <div>Мой компонент</div>;
}
```

### Работа с изображениями

```typescript
import { getImageUrl } from '@/lib/pocketbase';

const url = getImageUrl(
  'products',     // коллекция
  product.id,     // ID записи
  filename,       // имя файла
  '400x400'       // размер превью (опционально)
);
```

## 🔒 Безопасность

### Backend
- Данные админа в `pb_data`
- API rules ограничивают публичный доступ
- Только чтение для неавторизованных
- CORS настраивается в Pocketbase

### Frontend
- Server-side рендеринг
- Нет sensitive данных на клиенте
- Image optimization через Next.js
- Environment variables для конфигурации

### API Rules в Pocketbase

**List/View Rules:**
```
hidden = false || hidden = null
```

**Create/Update/Delete Rules:**
```
null
```
(только админы)

## 🐛 Troubleshooting

### Товары не отображаются
- Проверьте `hidden = false` у товаров
- Проверьте консоль браузера
- Проверьте URL Pocketbase в `.env.local`

### Изображения не загружаются
- Проверьте `next.config.mjs` - remotePattern
- Проверьте файл загружен в Pocketbase
- Проверьте права на чтение

### Ошибка CORS
- Pocketbase по умолчанию разрешает localhost
- Для продакшена настройте CORS

### TypeScript ошибки
- Выполните `npm install` в `frontend/`
- Проверьте `tsconfig.json`

### Pocketbase не запускается
- Проверьте права: `chmod +x backend/pocketbase`
- Скачайте правильную версию для вашей платформы

## ✅ Чеклист запуска

### Первоначальная настройка
- [ ] Выполнен `npm install`
- [ ] Скачан Pocketbase
- [ ] Создан файл `frontend/.env.local`
- [ ] Импортирована схема БД

### Backend
- [ ] Pocketbase запускается
- [ ] Админ панель доступна
- [ ] Все 5 коллекций созданы

### Frontend
- [ ] Dev сервер запускается
- [ ] Главная страница открывается
- [ ] Нет ошибок в консоли

### Данные
- [ ] Созданы цвета (минимум 1)
- [ ] Созданы типы (минимум 1)
- [ ] Создан минимум 1 товар с `hidden = false`

### Проверка
- [ ] Товары отображаются на главной
- [ ] Изображения загружаются
- [ ] Клик по товару открывает детальную страницу

## 🤝 Contributing

### Код-стайл
- Комментарии на русском языке
- Используйте async/await вместо Promise
- Компоненты в PascalCase
- Файлы в kebab-case
- Типы экспортируйте из `lib/pocketbase.ts`

### Workflow
1. Fork проекта
2. Создайте feature branch: `git checkout -b feature/amazing-feature`
3. Commit изменения: `git commit -m 'Add amazing feature'`
4. Push в branch: `git push origin feature/amazing-feature`
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 👨‍💻 Автор

Nakit Team

---

**Документация подразделов:**
- [Backend README](backend/README.md) - документация Pocketbase
- [Frontend README](frontend/README.md) - документация Next.js
