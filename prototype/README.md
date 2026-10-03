# Прототипи сторінок процедур

Кожна сторінка = **текст процедури** (`content/<slug>.json`) + **спільний шаблон**
(`build.mjs`, `template/style.css`, `template/page.js`).
Готові `*.html` генеруються — не редагуйте їх вручну.

```
node prototype/build.mjs
```

## Додати процедуру
1. Скопіюйте `content/endolaser.json` → `content/<slug>.json`.
2. Заповніть поля. Відповідь на питання — масив блоків:
   - `{ "p": "..." }` — абзац
   - `{ "short": "Não." }` — коротка виділена відповідь
   - `{ "list": ["...", "..."] }` — список
   - `{ "know": ["...", "...", "..."] }` — блок «O que deve saber» (01/02/03)
3. Поле `faq` у питання → потрапляє в Schema.org FAQPage (формулюйте як пошуковий запит).
4. `node prototype/build.mjs` → з'явиться `prototype/<slug>.html`.

Блоки лікаря, ціни, International patients, джерел і футер ERS — спільні для всіх
сторінок і живуть у шаблоні.
