# Wildberries Academy - Landing Page

Лендинг для обучающего курса по работе с маркетплейсами Wildberries.

## 🚀 Структура проекта

```
WB_land/
├── index.html      # Главная страница
├── styles.css      # Стили
├── script.js       # JavaScript (FAQ, меню, анимации)
└── README.md       # Документация
```

## 📦 Как запустить локально

### Вариант 1: Просто открыть файл
Откройте `index.html` в браузере (двойной клик по файлу).

### Вариант 2: Локальный сервер (рекомендуется)
```bash
# Python 3
python -m http.server 8000

# Node.js (если установлен npx)
npx serve .

# VS Code: установите расширение "Live Server"
```

Откройте http://localhost:8000

## 🌐 Как захостить (бесплатно)

### Вариант 1: Netlify (рекомендую — самый простой)

1. Зайдите на [netlify.com](https://netlify.com)
2. Зарегистрируйтесь (можно через GitHub)
3. Перетащите папку проекта в окно "Drag and drop your site"
4. Готово! Получите ссылку вида `random-name.netlify.app`
5. Можно подключить свой домен бесплатно

### Вариант 2: GitHub Pages

1. Создайте репозиторий на GitHub
2. Загрузите файлы в репозиторий
3. Settings → Pages → Source: Deploy from branch → main → Save
4. Через минуту сайт будет на `username.github.io/repo-name`

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/wb-landing.git
git push -u origin main
```

### Вариант 3: Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Нажмите "Deploy"
4. Готово!

### Вариант 4: Cloudflare Pages

1. Зайдите на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Подключите репозиторий или загрузите файлы
3. Быстрый CDN по всему миру

## ✏️ Как редактировать

### Тексты
Все тексты находятся в `index.html`. Просто найдите нужный блок и измените текст.

### Цвета
Все цвета определены в начале `styles.css` в секции `:root`:
```css
:root {
    --color-primary: #E83E8C;      /* Основной розовый */
    --color-secondary: #7C3AED;    /* Фиолетовый */
    --color-dark: #0D0B1E;         /* Тёмный фон */
    /* ... */
}
```

### Изображения
Для добавления реальных фото эксперта или кейсов:

1. Создайте папку `assets/`
2. Положите туда изображения
3. Замените placeholder в HTML:
```html
<!-- Было -->
<div class="expert__photo-placeholder">...</div>

<!-- Стало -->
<img src="assets/expert.jpg" alt="Фото эксперта" class="expert__photo">
```

### Формы
Сейчас форма только показывает "Отправлено". Для реальной работы:

**Вариант A: Google Forms**
```html
<form action="ВАША_ССЫЛКА_GOOGLE_FORMS" method="POST">
```

**Вариант B: Formspree (бесплатно)**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Вариант C: Telegram бот**
Используйте сервис [телеграм-формы](https://telegram.me/FormBot) или напишите свой бот.

## 🎨 Секции лендинга

1. **Hero** — первый экран с заголовком и CTA
2. **Для кого** — 4 карточки целевой аудитории
3. **Чему научитесь** — навыки и инструменты
4. **Программа** — 8 модулей с раскрытием
5. **Процесс обучения** — 5 шагов
6. **Кейсы учеников** — 4 карточки до/после
7. **Эксперт** — информация о наставнике
8. **Бесплатный курс** — лид-магнит с формой
9. **Тарифы** — 3 варианта покупки
10. **FAQ** — 8 вопросов с раскрытием
11. **Финальный CTA** — призыв к действию
12. **Footer** — контакты и ссылки

## 📱 Адаптивность

Лендинг полностью адаптивен:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (до 768px)

## ⚡ Оптимизация

- Минимальный JS без фреймворков
- CSS Variables для быстрой кастомизации
- Lazy loading готов к добавлению
- Шрифт Manrope с Google Fonts

## 🔧 Интеграции (по желанию)

### Аналитика
```html
<!-- В head перед </head> -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXX');
</script>

<!-- Яндекс.Метрика -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){...})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(XXXXXX, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
</script>
```

### Чат-виджеты
- [Tawk.to](https://tawk.to) — бесплатно
- [Carrot quest](https://carrotquest.io)
- [JivoSite](https://jivo.ru)

## 📄 Лицензия

MIT — используйте как хотите.

---

Сделано с 💜 для Wildberries Academy

