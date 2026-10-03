# Прототипи сторінок

Кожна сторінка = **текст** (`content/<slug>.json`) + **спільний шаблон**
(`build.mjs`, `template/style.css`, `template/page.js`).
Готові `*.html` генеруються — не редагуйте їх вручну. Ім'я файлу = майбутній URL
(`endolaser-algarve.html` → `/endolaser-algarve/`), `home.json` → `index.html`.

```
node prototype/build.mjs
```

## Структура сторінки напряму (VISIBLE / FAQ)
Hero (SEO-H1 + питання-хук + текст + CTA) → `chips` (показання) → `blocks`
(основний текст) → `keys` (ключові повідомлення) + CTA → `faq` (акордеон) →
лікар → ціна → фінальний CTA з формою → International patients → джерела → footer ERS.

## Поля `content/<slug>.json`
| Поле | Що це |
|---|---|
| `slug`, `title`, `description` | URL, SEO title, meta description |
| `h1`, `h1Sub?` | SEO-заголовок (невеликий), підзаголовок |
| `hook`, `heroText[]` | головне питання пацієнта (великим) і текст під ним |
| `ctaLabel`, `microcopy`, `imageNote` | кнопка, рядок під кнопками, опис потрібного фото |
| `chips?` `{label, items[], note?}` | «Pode ser considerado para:» |
| `blocks[]` `{id, h, answer[]}` | VISIBLE-блоки |
| `keys[]` | ключові повідомлення перед CTA |
| `faq[]` `{q, a?}` | без `a` → жовта позначка «відповідь має дати лікар» |
| `finalCta` `{title, text[]}` | фінальний блок |
| `formOptions[]`, `formLabel?`, `formTitle?` | вибір у формі (порожньо → поле не показується) |
| `sensitive?` | чутлива сторінка: без симптомів у формі |
| `bookingNoun?` | «avaliação» (за замовч.) або «consulta» |
| `priceItem?` | назва в блоці ціни |
| `whatsappText`, `leadPrefix` | текст WhatsApp, префікс `lead_id` |

Блоки відповіді: `{p}` абзац · `{short}` коротка виділена відповідь · `{list}` список ·
`{know}` 01/02/03.
