# AlgarvEstetic — план і документація проєкту

> **Версія 1.0.** Єдине джерело правди для проєкту: стратегія, архітектура,
> правила контенту, юридичні й технічні вимоги, статус сторінок, відкриті питання.
> Текст сторінок португальською зберігається в `prototype/content/*.json`.

**Зміст**
1. [Про проєкт](#1-про-проєкт)
2. [Ключові принципи](#2-ключові-принципи)
3. [Архітектура сайту та SEO-карта](#3-архітектура-сайту-та-seo-карта)
4. [Home](#4-home)
5. [Шаблон сторінки напряму](#5-шаблон-сторінки-напряму)
6. [Статус сторінок напрямів](#6-статус-сторінок-напрямів)
7. [Юридичні вимоги (ERS, RGPD)](#7-юридичні-вимоги-ers-rgpd)
8. [Технічні вимоги](#8-технічні-вимоги)
9. [Вимірювання: воронка до доходу](#9-вимірювання-воронка-до-доходу)
10. [Технологічний стек](#10-технологічний-стек)
11. [Прототип: як влаштований](#11-прототип-як-влаштований)
12. [Що потрібно від клініки](#12-що-потрібно-від-клініки)
13. [Рішення, що очікують погодження](#13-рішення-що-очікують-погодження)
14. [Roadmap](#14-roadmap)
15. [Структура репозиторію](#15-структура-репозиторію)

---

## 1. Про проєкт

| | |
|---|---|
| **Клініка** | Centro Médico AlgarvEstetic, Портімау (Алгарве, Португалія), з 2015 р. |
| **Старий сайт** | https://www.algarvestetic.com |
| **Завдання** | Переробити застарілий сайт на сучасний, функціональний, привабливий |
| **Мовна аудиторія** | Місцеві мешканці + іноземці (туристи, експати) |

**Проблема старого сайту.** Google його індексує, але головна сторінка
(H1 «Cuidados médicos profissionais a preços acessíveis em Portimão») змішує
загальну медицину, хірургію, проктологію, вени, шкіру, естетику, CO₂, PRP тощо.
Тематичний фокус розмитий. Старі тексти суперечать новим правилам
(«especialistas experientes», «garantindo resultados ótimos», «restaurar a juventude»).

**Мета нового сайту:** **SEO + навчання пацієнта + система конверсії**.
Сайт веде пацієнта не до онлайн-рішення про процедуру, а до **медичної оцінки**.

**Цільові дії відвідувача:**
1. `Saber se é indicado para mim` / `Avaliar…` — оцінка показань
2. `Marcar avaliação` / `Marcar consulta` — запис
3. `WhatsApp` — швидкий контакт

---

## 2. Ключові принципи

1. **Медичний центр, а не салон.** Home виглядає як медичний центр із сильним
   естетичним і хірургічним напрямом. Endolaser і CO₂ не домінують.
2. **Спершу оцінка.** «Primeiro avaliamos. Depois definimos.» Пацієнту не треба
   обирати техніку до консультації.
3. **Від проблеми пацієнта, а не від обладнання.** Заголовки — питання пацієнта
   («Papada, gordura localizada ou pele mais flácida?»).
4. **Довіра через чесність.** Чого процедура НЕ робить, ризики, «не можемо
   обіцяти». Без самовихваляння, лише перевірювані переваги.
5. **Короткий основний скрол.** 3–6 екранів: «це моя проблема» → «що можна
   зробити» → «чи болить / відновлення» → «що робити далі».
6. **Жодного медичного твердження без підстави.** Кожне твердження має джерело
   в блоці «Informação clínica e fontes».

---

## 3. Архітектура сайту та SEO-карта

```
HOME  /
├── Endolaser / Endolifting ........ /endolaser-algarve/
├── Laser CO₂ Fracionado ........... /laser-co2-fracionado-algarve/
│     └── (далі) Cicatrizes de acne  /cicatrizes-acne-algarve/        ← пріоритет
├── Cirurgia Estética
│     ├── Correção das Pálpebras ... /blefaroplastia-algarve/
│     └── Saúde e Estética Íntima .. /saude-estetica-intima/
├── Tratamento Capilar ............. /queda-de-cabelo-algarve/
├── Tratamento de Cicatrizes ....... /tratamento-cicatrizes-algarve/
├── Doenças da Pele ................ /doencas-da-pele-portimao/
│     └── (далі) /dermatoscopia-portimao/ · /acne-portimao/ · /biopsia-pele-portimao/
│                /verrugas-papilomas-portimao/ · /manchas-pele-fotoenvelhecimento/
├── Avaliação Proctológica ......... /avaliacao-proctologica-portimao/
├── International Patients (EN) .... /international-patients-algarve/
└── Equipa · Contactos · Legal
```

| Сторінка | H1 | SEO title |
|---|---|---|
| Home | Centro Médico em Portimão — Saúde, Cirurgia e Medicina Estética | Centro Médico em Portimão \| AlgarvEstetic |
| Endolaser | Endolaser no Algarve — Gordura Localizada e Flacidez | Endolaser Algarve \| Gordura Localizada e Flacidez |
| Laser CO₂ | Laser CO₂ Fracionado no Algarve | Laser CO₂ Algarve \| Cicatrizes de Acne e Textura da Pele |
| Pálpebras | Correção das Pálpebras (Blefaroplastia) no Algarve | Blefaroplastia Algarve \| Correção das Pálpebras |
| Zona íntima | Saúde e Estética da Zona Íntima | Saúde e Estética Íntima \| AlgarvEstetic Algarve |
| Capilar | Queda de Cabelo — Avaliação e Tratamento no Algarve | Queda de Cabelo Algarve \| PRP e PRF Capilar |
| Cicatrizes | Tratamento de Cicatrizes no Algarve | Tratamento de Cicatrizes Algarve \| Acne, Cirurgia e Trauma |
| Doenças da pele | Avaliação de Doenças e Alterações da Pele em Portimão | Doenças da Pele Portimão \| Dermatoscopia, Acne e Biópsias |
| Proctologia | Avaliação Proctológica em Portimão + «Consulta de Cirurgia Geral» | Proctologia Portimão \| Hemorroidas, Fissuras e Avaliação |

**Meta description для Home:** Centro médico em Portimão. Consultas médicas,
Cirurgia Geral, doenças da pele, medicina estética, tratamentos capilares e
tecnologias laser. Marque a sua avaliação.

**SEO-логіка:**
- **`-algarve` vs `-portimao`.** Процедури, заради яких приїжджають з усього регіону
  (Lagos, Albufeira…), отримують `-algarve`. Консультації з локальним наміром
  (шкіра, проктологія) — `-portimao`.
- **Терміни, які шукають пацієнти, лишаються в SEO**, навіть якщо в тексті ми
  вживаємо інше слово. Наприклад, «Blefaroplastia» в H1 і title, а в тексті
  переважно «correção das pálpebras». «Proctologia» в title, а на сторінці
  юридично обраний формат «Consulta de Cirurgia Geral».
- **Капілярна сторінка називається за проблемою пацієнта** («Queda de Cabelo»),
  PRP/PRF — другорядні ключові слова.
- **Зона íntima:** не фіксуємо URL під «rejuvenescimento íntimo» до окремого
  дослідження запитів.
- **Title не перевантажуємо** сімома процедурами.
- **Під кожну дочірню SEO-сторінку — окремий намір пошуку.** Не робимо десятки
  майже однакових сторінок.

---

## 4. Home

**Задача:** за 15–20 секунд дати зрозуміти, що тут лікують і роблять, куди натиснути
і чому варто залишитися. Home не пояснює процедури.

| # | Блок | Зміст |
|---|---|---|
| 01 | Hero | H1 + «Consultas médicas, procedimentos e tratamentos personalizados para residentes e visitantes do Algarve.» · `[Marcar consulta]` `[Ver áreas]` |
| 02 | Como podemos ajudar? | 7 карток напрямів: назва, ключові проблеми, 1 речення, `[Saber mais]` |
| 03 | Não sabe qual tratamento escolher? | «Não precisa de escolher uma técnica antes da consulta.» · `[Marcar avaliação]` |
| 04 | Porquê AlgarvEstetic? | Avaliação primeiro · Diferentes abordagens · Acompanhamento · Diagnóstico quando necessário |
| 05 | International Patients (EN) | Visiting the Algarve? + 4 пункти (що оцінити, скільки часу в Португалії, відновлення, контрольні огляди) |
| 06 | Equipa médica | Фото · ім'я · кваліфікація · cédula · сфери діяльності — лише перевірювані дані |
| 07 | Tem uma dúvida? | `[WhatsApp]` `[Marcar consulta]` |
| 08 | Localização | Morada · Google Maps · Seg–Sex 09:00–18:00 · телефон · WhatsApp · e-mail |
| 09 | CTA final | «Comece pela avaliação certa.» + коротка форма |
| 10 | Footer | Юридичні дані (див. §7) |

---

## 5. Шаблон сторінки напряму

### 5.1 Три рівні інформації
- **VISIBLE** — те, що пацієнт бачить при звичайному скролі.
- **FAQ** — важливе, але лише для зацікавленого пацієнта (акордеон).
- **REMOVE** — повтори й деталі, що не допомагають ухвалити рішення.

### 5.2 Порядок блоків
```
Хлібні крихти (Home › Напрям)
HERO: SEO-H1 (невеликий) → питання пацієнта (великим) → 1–2 абзаци → [CTA] [WhatsApp] → рядок під кнопками
Показання (chips): «Pode ser considerado para: …»
VISIBLE: 3–6 коротких блоків (Como funciona? · Dói? · Recuperação · Resultado …)
Ключові повідомлення (напр. «Endolaser não é um tratamento para emagrecer.»)
[CTA] — одна кнопка посередині сторінки
FAQ (акордеон, 6 питань)
Quem realiza a avaliação — лікар
Preço
Фінальний CTA + коротка форма
International Patients (EN)
Informação clínica e fontes
Footer ERS
```

### 5.3 Правила CTA
- CTA в Hero, один після ключового медичного блоку і фінальний.
- На мобільному внизу екрана завжди дві невеликі кнопки `Marcar | WhatsApp`.
- **Не ставити** WhatsApp після кожного блоку: це візуальний шум.
- Головна кнопка формулюється як дія без рішення: «Saber se é indicado para mim»,
  «Avaliar a minha pele». Не просто «Marcar», бо людина ще не вирішила.

### 5.4 Що прибрали (REMOVE), за сторінками
| Сторінка | Прибрано з основного тексту |
|---|---|
| Endolaser | друге пояснення жир+в'ялість; повтор «результат індивідуальний»; другий заклик посередині |
| CO₂ | довге пояснення мікрозон; повтори про колаген; дискусія про потужність; класифікація рубців (→ сторінка Cicatrizes) |
| Pálpebras | кілька пояснень про природність; повторні анатомічні списки; детальне дозрівання рубця |
| Íntima | повтор «немає універсальної техніки»; довгі пояснення про анатомічну норму; загальний список ризиків |
| Capilar | деталі про тромбоцити й фактори росту; метааналізи; повтори про діагноз |
| Cicatrizes | наукові пояснення кожного типу рубця; повтор про комбінацію методів; PRP в основному тексті |
| Doenças da pele | другий список тривожних ознак; повтор різниці дерматоскопія/гістологія; друге пояснення про діагноз до видалення |
| Proctologia | окремі довгі описи фісури та пілонідальної хвороби; повтори про кровотечу; довгий список тривожних ознак (→ FAQ) |

> **Doenças da pele** скорочено менше, ніж інші сторінки: вона має давати медичну довіру.

---

## 6. Статус сторінок напрямів

✅ = відповідь у FAQ є, з текстів власника · ⏳ = відповідь має дати лікар
(на сторінці показана як `[ПОТРІБНІ ДАНІ]`, у розмітку Schema.org не потрапляє).

### Endolaser / Endolifting — `/endolaser-algarve/`
- **Hook:** Papada, gordura localizada ou pele mais flácida? · **CTA:** Saber se é indicado para mim
- **VISIBLE:** Como funciona? · Dói? · Recuperação · Resultado · ключове: «não é um tratamento para emagrecer»
- **FAQ:** ✅ Uma sessão chega? · ✅ Quando posso trabalhar? · ✅ Quando posso fazer exercício? · ✅ Ficam cicatrizes? · ✅ Substitui cirurgia? · ✅ Quais são os riscos?

### Laser CO₂ Fracionado — `/laser-co2-fracionado-algarve/`
- **Hook:** Cicatrizes de acne, textura irregular, poros mais visíveis ou linhas finas? · **CTA:** Avaliar a minha pele
- **VISIBLE:** Como funciona? · Dói? · Recuperação · Resultado · ключові: «não podemos prometer que desapareçam», «fotoproteção é fundamental»
- **FAQ:** ⏳ Quantas sessões? · ⏳ Quando posso usar maquilhagem? · ⏳ Quando posso trabalhar? · ✅ Posso apanhar sol? · ⏳ Posso ficar com manchas? · ✅ Quais são os riscos?

### Correção das Pálpebras — `/blefaroplastia-algarve/`
- **Hook:** O olhar parece pesado ou cansado? · **CTA:** Marcar avaliação
- **VISIBLE:** Como funciona? · Dói? · Recuperação · E a cicatriz? · ключове: «não é mudar o seu rosto»
- **FAQ:** ⏳ Quando posso trabalhar? · ⏳ Quando posso usar maquilhagem? · ⏳ Quanto tempo dura o edema? · ✅ Trata olheiras? · ⏳ O resultado é permanente? · ✅ Quais são os riscos?

### Saúde e Estética da Zona Íntima — `/saude-estetica-intima/` *(чутлива)*
- **Hook:** Alterações íntimas que provocam desconforto ou a incomodam esteticamente? · **CTA:** Marcar avaliação confidencial
- **VISIBLE:** Existe um único tratamento? (Não.) · Ácido hialurónico · Pequenos lábios · Recuperação
- **FAQ:** ✅ Dói? · ⏳ Quando posso ter relações? · ⏳ Quanto dura o resultado? · ✅ Que anestesia é utilizada? · ✅ Ácido hialurónico é indicado para mim? · ✅ Quais são os riscos?

### Tratamento Capilar — `/queda-de-cabelo-algarve/`
- **Hook:** Está a perder cabelo ou a notar menor densidade? · **CTA:** Avaliar a minha queda de cabelo
- **VISIBLE:** O que é PRP? · E PRF? · Dói? · Recuperação · Quando vejo resultado? · ключове: «não criam novos folículos»
- **FAQ:** ✅ Quantas sessões? · ⏳ Preciso de manutenção? · ✅ PRP ou PRF? · ⏳ PRP substitui minoxidil? · ⏳ Quando lavo o cabelo? · ✅ Quais são os riscos?

### Tratamento de Cicatrizes — `/tratamento-cicatrizes-algarve/`
- **Hook:** A cicatriz ficou funda, elevada, irregular ou continua a incomodar? · **CTA:** Avaliar a minha cicatriz
- **VISIBLE:** Como podem ser tratadas? · A cicatriz desaparece? · Cicatrizes antigas? · ключове: «Primeiro classificamos a cicatriz.»
- **FAQ:** ✅ Dói? · ✅ Quantas sessões? · ✅ Qual o tempo de recuperação? · ✅ CO₂ é melhor? · ✅ Queloide pode voltar? · ✅ Quais são os riscos?

### Doenças da Pele — `/doencas-da-pele-portimao/`
- **Hook:** Uma lesão nova, um sinal que mudou, acne ou uma alteração da pele que não desaparece? · **CTA:** Marcar consulta
- **VISIBLE:** Sinais e lesões · Dermatoscopia · Biópsia e estudo histopatológico · Verrugas e papilomas · Acne · Manchas e fotoenvelhecimento
- **FAQ:** ✅ Quando um sinal deve ser avaliado? · ⏳ Dermatoscopia dói? · ✅ Quando é necessária biópsia? · ✅ A lesão removida vai para histologia? · ✅ Como tratar acne? · ✅ Posso remover um sinal por estética?

### Avaliação Proctológica — `/avaliacao-proctologica-portimao/` *(чутлива)*
- **Hook:** Dor, sangramento, comichão ou desconforto anal? · **CTA:** Marcar consulta de Cirurgia Geral
- **VISIBLE:** O que avaliamos (chips) · Como é a consulta? · O exame dói? · Se forem hemorróidas…? · E o laser? · Tenho sangue. São hemorróidas? · ключове: «Consulta não significa cirurgia.»
- **FAQ:** ✅ Preciso de anuscopia? · ⏳ Como me preparo? · ✅ Tenho vergonha — como decorre o exame? · ✅ Hemorróidas precisam sempre de cirurgia? · ⏳ Como funciona o tratamento laser? · ✅ Quando devo procurar avaliação rapidamente?

**Разом:** 48 питань FAQ, з них **32 ✅** і **16 ⏳**.

---

## 7. Юридичні вимоги (ERS, RGPD)

### 7.1 ERS — реклама медичних послуг
- **Ідентифікація закладу на кожній сторінці (футер):** entidade responsável,
  morada, inscrição ERS, registo do estabelecimento, licença de funcionamento
  (коли застосовно), контакти. **Не вигадувати** відсутні номери.
- **Лікар:** реальне фото, повне ім'я, реальна кваліфікація, cédula profissional.
  Жодних невизнаних титулів.
- **Заборонені слова щодо діяльності клініки:** «Dermatologia», «Dermatologista»,
  «Especialista». Прототип автоматично перевіряється на їх відсутність.
- **Ціна:** публікувати лише після рішення адміністрації (ціна оцінки, мінімальна
  реальна ціна, що входить, що оплачується додатково). «Desde €X» — лише якщо
  лікування за цією ціною реально доступне, і поруч вказано, що входить.
- **Жодних гарантій результату** і тверджень, що вводять в оману.
- **«Informação clínica e fontes»:** 3–5 актуальних джерел лише під твердження,
  що є на сторінці. Переглядати, коли змінюється доказова база.
- **Старі тексти не переносимо** без перевірки на відповідність цим правилам.

### 7.2 RGPD — захист даних
- **Банер згоди на cookies + Google Consent Mode.** Жоден піксель і жодна подія
  аналітики не надсилаються до натискання «Aceitar». Google Maps також
  завантажується лише після згоди.
- **Фото «до/після» і фото пацієнтів** — це медичні дані. Лише з письмовою згодою.
- **Мінімізація даних у формах:** ім'я + контакт + (опційно) область. Без
  медичної історії в маркетинговій формі.
- **Чутливі сторінки** (зона íntima, проктологія): форма **не питає про симптоми**,
  текст WhatsApp нейтральний («gostaria de marcar uma consulta»).
- Política de Privacidade і Política de Cookies — посилання у футері.

### 7.3 Інше
- **Livro de Reclamações** — посилання у футері (обов'язкове для бізнесу в PT).
- Інші юридично обов'язкові елементи підтвердити з юристом до публікації.

---

## 8. Технічні вимоги

1. **Sticky CTA на мобільному:** внизу дві невеликі кнопки `Marcar | WhatsApp`, без
   великої спливаючої панелі.
2. **Швидкість:** жодного важкого 4K-відео в Hero. Швидкість на мобільному важливіша
   за гарну заставку.
3. **Коротка форма:** Nome + telefone/email + «O que gostaria de avaliar?».
4. **Після відправки** — не просто «Obrigado»: екран «Pedido recebido. Entraremos
   em contacto para organizar a avaliação.» + фіксуємо подію конверсії.
5. **Форма International Patients** кваліфікує ліда: Where do you live? · When will
   you be in the Algarve? · How long will you stay? · What would you like assessed?
6. **Mobile-first, адаптивність:** без горизонтального скролу на 390px.
7. **Schema.org:** `MedicalClinic` (Home), `FAQPage` (лише затверджені відповіді),
   далі `Physician`, `MedicalProcedure`, `BreadcrumbList`.
8. **301-редиректи** зі старих URL на нові (див. §14).
9. **Доступність:** контраст, фокус на полях форми, FAQ на нативних `<details>`.

---

## 9. Вимірювання: воронка до доходу

Міряємо не кліки на WhatsApp, а шлях до грошей для кожної сторінки:

```
Google/Meta → Landing → WhatsApp/Form → Marcação → Compareceu → Procedimento → Receita
```

- **`lead_id`** генерується на кожну заявку з форми і на кожне звернення в WhatsApp
  (передається в повідомленні як `ref:`).
- **Офлайн-етапи** (Marcação → Compareceu → Procedimento → Receita) персонал фіксує
  в CRM або таблиці за `lead_id`.
- **Meta CAPI (server-side) + завантаження офлайн-конверсій** у Google Ads / Meta.
- **Мета:** через 60–90 днів побачити, які напрями дають **оплачені процедури**,
  а не лише трафік, і перерозподілити бюджет. Наприклад, проктологія може давати
  менше трафіку, ніж CO₂, але більше оплачених процедур.
- Усі події — лише після згоди на cookies (§7.2).

---

## 10. Технологічний стек

Рекомендація для робочого сайту:

| Шар | Вибір | Чому |
|---|---|---|
| Фреймворк | **Next.js (React) + TypeScript** | SEO, швидкість, статична генерація |
| Стилі | **Tailwind CSS** | швидка й послідовна адаптивна верстка |
| Мови | **next-intl** | PT — основна, EN — International; `hreflang` |
| Контент | JSON зі схемою з прототипу → за потреби **CMS** (Sanity / Strapi) | клініка зможе додавати процедури сама |
| Форми | API-роут + e-mail/CRM (напр. Resend) | `lead_id`, без зайвих даних |
| Аналітика | GA4 + Meta Pixel/CAPI через Consent Mode | §9 |
| Хостинг | **Vercel** | оптимально для Next.js |

---

## 11. Прототип: як влаштований

- **Де:** `prototype/`. Готові сторінки: `index.html` і 8 сторінок напрямів.
- **Принцип:** спільний шаблон (`build.mjs`, `template/style.css`, `template/page.js`) +
  текст кожної сторінки в `content/<slug>.json`. Зміна дизайну застосовується до
  всіх сторінок одразу. JSON-файли без змін перейдуть у Next.js.
- **Збірка:** `node prototype/build.mjs` → генерує `prototype/<slug>.html`.
  Ім'я файлу = майбутній URL.
- **Додати сторінку:** скопіювати JSON, заповнити поля, запустити збірку.
  Схема полів — у `prototype/README.md`.
- **Плейсхолдери:** кольори, лого, фото — умовні. Жовті `[ПОТРІБНІ ДАНІ]` — дані,
  які має надати клініка.
- **Перевірено:** усі 9 сторінок на 390px і 1280px — без горизонтального скролу,
  без помилок JS і битих посилань, без заборонених слів.

---

## 12. Що потрібно від клініки

**Дані для юридичного блоку і контактів**
- [ ] Entidade responsável (юридична назва)
- [ ] Повна адреса
- [ ] Nº inscrição ERS · registo do estabelecimento · licença de funcionamento
- [ ] Телефон · номер WhatsApp · e-mail

**Команда**
- [ ] Для кожного лікаря: фото, повне ім'я, кваліфікація, cédula, сфери діяльності
- [ ] Хто веде які напрями (для блоку «Quem realiza» на кожній сторінці)

**Медичний контент**
- [ ] 16 відповідей FAQ, позначених ⏳ у §6
- [ ] 3–5 джерел на кожну сторінку напряму
- [ ] Затвердити рядки під кнопками в Hero на 6 нових сторінках (див. §13)

**Ціни** (для кожного напряму)
- [ ] Ціна оцінки/консультації · мінімальна реальна ціна · що входить · що оплачується додатково

**Бренд і медіа**
- [ ] Лого, фірмові кольори, шрифти (якщо є)
- [ ] Реальні фото: лікарі, процедури, обладнання, інтер'єр. Фото пацієнтів — лише з письмовою згодою

**Організаційне**
- [ ] Мови сайту: PT + EN — підтвердити; FR/ES/PL/RU потрібні?
- [ ] Хто фіксуватиме офлайн-етапи воронки, і в чому (CRM чи таблиця)
- [ ] Чи потрібна CMS, щоб клініка сама редагувала контент

---

## 13. Рішення, що очікують погодження

1. **Порядок напрямів на Home.** Зараз Endolaser і CO₂ стоять першими, що суперечить
   принципу «медичний центр, а не салон». **Пропозиція:** почати з медичних напрямів
   (Doenças da Pele · Avaliação Proctológica · Cirurgia Estética…).
2. **Застереження на сторінці зони íntima.** Зі старої версії випало речення
   «Dor, sangramento, prurido ou lesões devem ser avaliados antes de procedimentos
   estéticos». **Пропозиція:** повернути, хоча б у FAQ.
3. **Формулювання про PRF.** «PRF não deve ser apresentado como…» звучало як
   інструкція для маркетингу. В прототипі замінено на «O PRF não deve ser visto como
   simplesmente superior ao PRP». Підтвердити.
4. **Рядки під кнопками в Hero на 6 нових сторінках** складені на основі текстів
   власника. Підтвердити або замінити.
5. **Деякі відповіді FAQ зібрані з речень власника** з короткою зв'язкою
   («Depende do caso.», «Depende do tratamento.»). Нових медичних тверджень немає,
   але лікарю варто переглянути.
6. **Сонце й CO₂ для туристів.** Пропозиція: додати речення про планування процедури
   з урахуванням сезону й поїздки (CO₂ + літнє сонце Алгарве = ризик пігментації).
7. **Нові питання для FAQ CO₂** (відповіді має дати лікар): «Tomei isotretinoína
   (Roaccutane) — posso fazer?»

---

## 14. Roadmap

| Етап | Статус |
|---|---|
| 1. Стратегія, правила, архітектура, SEO-карта | ✅ |
| 2. Тексти 7 напрямів + Home (PT) | ✅ (16 відповідей FAQ ⏳) |
| 3. Прототипи всіх сторінок | ✅ |
| 4. **Аудит старого сайту + карта міграції** | ⛔ заблоковано (див. нижче) |
| 5. Бренд: лого, кольори, фото | очікує матеріалів |
| 6. Робочий проєкт на Next.js | наступний після погодження прототипу |
| 7. Аналітика, Consent Mode, `lead_id`, CRM | разом з етапом 6 |
| 8. Сторінка International Patients (EN) | після етапу 6 |
| 9. Дочірні SEO-сторінки (`/cicatrizes-acne-algarve/` першою) | після запуску |
| 10. EN-версії сторінок напрямів | після запуску |
| 11. Тестування, 301-редиректи, запуск | фінал |

### Етап 4 — аудит старого сайту
**Мета:** таблиця кожної старої сторінки з рішенням «залишити / переписати /
видалити / 301 → новий URL». Інакше старі сторінки лишаться в індексі й
конкуруватимуть з новими.

**Блокер:** мережеві налаштування хмарного середовища, де йде розробка, блокують
`www.algarvestetic.com`. Як відкрити доступ: меню середовища в заголовку сесії →
**Edit** → **Network access** → **Custom** → додати `algarvestetic.com` у Allowed
domains (https://code.claude.com/docs/en/cloud-environments#network-access).
Інший варіант — надати sitemap або список URL старого сайту.

---

## 15. Структура репозиторію

```
PLAN.md                     ← цей документ
prototype/
  README.md                 ← як працює прототип, схема полів
  build.mjs                 ← генератор сторінок
  template/style.css        ← спільний дизайн
  template/page.js          ← форма, згода на cookies, lead_id, WhatsApp
  content/*.json            ← текст кожної сторінки (PT)
  index.html, *.html        ← згенеровані сторінки (не редагувати вручну)
wireframes/endolaser.md     ← історичний документ (перше ТЗ Endolaser, v1.0)
```

Гілка розробки: `claude/loving-euler-ew8py5`.
