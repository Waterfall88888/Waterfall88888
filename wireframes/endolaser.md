# Еталонний wireframe — сторінка процедури «Endolaser»

> Це **шаблон-система**: після затвердження всі інші сторінки процедур
> будуються за цією самою структурою (ті самі блоки, та сама логіка).
> Копія на сторінці — **португальською (PT)**; під кожним блоком — короткий
> переклад/пояснення українською (_курсивом_).
>
> Позначки:
> `[ПОТРІБНІ ДАНІ]` — реальну інформацію має надати клініка (не вигадуємо:
> імена лікарів, cédula, номери ERS, ціни, клінічні деталі).
> `[ФОТО]` — місце під зображення.
> `[CTA]` — кнопка заклику до дії.

---

## Загальні принципи шаблону

- **Mobile-first.** First screen короткий: вміщається на екран телефона без «простирадла» тексту.
- **Один головний CTA** повторюється тричі: після hook (above the fold), у середині, у кінці.
- **Основний CTA:** `Saber se é indicado para mim` (не «Marcar») — людина ще не вирішила.
- **Вторинний CTA:** WhatsApp (швидкий контакт).
- **Кожен медичний claim** має джерело у фінальному блоці «Informação clínica / Fontes».
- **Липка панель** на мобільному внизу екрана: `[Avaliação]` + `[WhatsApp]`.

---

## Структура зверху вниз

### 0. Хедер (глобальний, на всіх сторінках)
- Ліворуч: лого клініки. Праворуч: меню + перемикач мови + кнопка `[Marcar avaliação]`.
- Хлібні крихти: `Home › Especialidades › Endolaser` (+ Schema.org BreadcrumbList).

---

### 1. HOOK / First screen *(вище лінії згину — максимально коротко)*

**Макет:** великий заголовок ліворуч, якісне фото праворуч (на мобільному — фото зверху, текст під ним). Жодного довгого тексту тут.

**Структура за твоїм принципом: проблема → можливе рішення → ключове відмінність → CTA**

> **H1:** Papada ou gordura localizada que não desaparece com dieta e exercício?
>
> **Sub:** O Endolaser é uma abordagem minimamente invasiva que pode ser
> utilizada, em casos selecionados, para gordura localizada e flacidez da pele —
> com anestesia local e sem cirurgia aberta.
>
> **[CTA] Saber se é indicado para mim**  ·  **[CTA-2] WhatsApp**

_UA: «Підборіддя або локальний жир, що не йде від дієти й спорту? Endolaser —
мінімально інвазивний метод для локального жиру та в'ялості шкіри в окремих
випадках, під місцевою анестезією, без відкритої операції.»_
_Кнопки: «Дізнатися, чи підходить мені» + WhatsApp._

> ⚠️ Жодних гарантій результату в H1. Формулювання «pode ser utilizada, em casos
> selecionados» — свідомо обережне (вимога ERS: не вводити в оману).

---

### 2. O que o incomoda? *(що саме турбує пацієнта)*

**Макет:** короткий абзац + список-чипи типових скарг (клікабельні — для внутрішньої перелінковки на intent-сторінки, якщо є).

> **H2:** Reconhece-se nalguma destas situações?
> - Papada ou «queixo duplo»
> - Gordura localizada no abdómen, flancos, braços
> - Flacidez ligeira a moderada da pele
> - Zonas que não respondem a dieta e exercício

_UA: «Чи впізнаєте себе в цьому?» — список типових скарг. Чипи ведуть на
intent-сторінки (напр. /papada/), якщо такі створимо._

---

### 3. O que pode ser melhorado *(що потенційно можна покращити — обережно)*

**Макет:** 1 короткий абзац. Без обіцянок «позбудетесь назавжди».

> **Texto:** Em casos adequados, o Endolaser pode ajudar a reduzir gordura
> localizada e a melhorar a firmeza da pele na zona tratada. A indicação e o
> resultado esperado são sempre avaliados individualmente numa consulta médica.

_UA: «У відповідних випадках Endolaser може допомогти зменшити локальний жир і
покращити пружність шкіри в зоні. Показання й очікуваний результат оцінюються
індивідуально на консультації.»_

---

### 4. [CTA] Saber se é indicado para mim *(міні-квіз — моя пропозиція)*

**Макет:** помітна смуга/картка з CTA. По кліку — **міні-квіз на 2–3 питання**
(зона, що турбує; чи були процедури раніше), після чого відкривається WhatsApp
з **передзаповненим контекстом** → лід одразу кваліфікований.

> **[CTA] Saber se é indicado para mim**

_UA: Головний CTA. Квіз передає контекст у WhatsApp і чистить атрибуцію воронки.
Кожен лід отримує унікальний `lead_id` для наскрізного вимірювання до «Receita»._

---

### 5. Como funciona *(як працює — простими словами)*

**Макет:** 3–4 кроки з іконками (горизонтально на десктопі, вертикально на мобільному).

> **H2:** Como funciona o Endolaser
> 1. **Avaliação médica** — indicação, zona e plano personalizado.
> 2. **Anestesia local** na área a tratar.
> 3. **Microfibra laser** introduzida através de micro-incisão; atua na gordura
>    e estimula o colagénio.
> 4. **Regresso gradual** à rotina, com indicações pós-procedimento.

_UA: 4 кроки: мед.оцінка → місцева анестезія → лазерна мікрофібра через
мікропрокол (діє на жир + стимулює колаген) → поступове повернення до життя.
Клінічні деталі підтверджує лікар клініки._ `[ПОТРІБНІ ДАНІ: уточнити протокол]`

---

### 6. Porque escolher esta abordagem? *(переваги — лише перевірювані, без «ми найкращі»)*

**Макет:** 3–4 картки з об'єктивними характеристиками.

> - Avaliação médica antes do procedimento
> - Anestesia local (sem necessidade de anestesia geral, quando aplicável)
> - Técnica minimamente invasiva, com micro-incisões
> - Acompanhamento pós-procedimento

_UA: Тільки об'єктивне (вимога ERS): мед.оцінка до процедури, місцева анестезія,
мінімальна інвазивність, супровід після. Жодного «найкращі/унікальні»._

---

### 7. Dói? / Anestesia *(знімаємо головний страх)*

> **H2:** Dói?
> **Texto:** O procedimento é realizado sob anestesia local, pelo que o
> desconforto durante a sessão é habitualmente reduzido. Pode existir
> sensibilidade nos dias seguintes.

_UA: Під місцевою анестезією, дискомфорт під час сеансу зазвичай незначний; у
наступні дні можлива чутливість._

---

### 8. Recuperação dia a dia *(відновлення по днях — дуже цінно для довіри)*

**Макет:** таймлайн (День 1–2 / Дні 3–7 / Semanas seguintes).

> - **Dias 1–2:** inchaço e possíveis hematomas; uso de malha de compressão se indicado.
> - **Dias 3–7:** regresso gradual à rotina na maioria dos casos.
> - **Semanas seguintes:** melhoria progressiva à medida que o colagénio responde.

_UA: Дні 1–2: набряк/синці, компресійна білизна за показанням. Дні 3–7: поступове
повернення. Далі: прогресивне покращення._ `[ПОТРІБНІ ДАНІ: реальні строки клініки]`

---

### 9. Quando esperar resultados *(коли чекати зміни)*

> **Texto:** Os resultados desenvolvem-se de forma progressiva ao longo de
> semanas a meses, à medida que a pele reage e o colagénio é estimulado.

_UA: Результат розвивається поступово, тижні–місяці._

---

### 10. O que este tratamento NÃO faz *(чесне обмеження — різко піднімає довіру)*

**Макет:** виразний блок з іконкою, іншим фоном.

> **H2:** O que o Endolaser **não** é
> - **Não** é um método de emagrecimento.
> - **Não** substitui cirurgia em todos os casos.
> - **Não** trata obesidade nem substitui dieta e exercício.

_UA: НЕ схуднення, НЕ заміна операції в усіх випадках, НЕ лікування ожиріння._

---

### 11. 3 coisas que deve saber antes de decidir *(знімає заперечення)*

> 1. Existe um período de recuperação (inchaço/hematomas possíveis).
> 2. O resultado é progressivo — não é imediato.
> 3. A indicação depende da avaliação médica; nem todos os casos são adequados.

_UA: 1) є відновлення; 2) результат поступовий; 3) показання — за мед.оцінкою,
підходить не всім._

---

### 12. Riscos *(ризики — коротко й відповідально)*

> **Texto:** Como qualquer procedimento médico, pode haver riscos e efeitos
> secundários (inchaço, hematomas, sensibilidade; raramente, outras
> complicações). Todos os riscos são explicados na consulta.

_UA: Як будь-яка мед.процедура — можливі набряк, синці, чутливість; рідко інші
ускладнення. Усе пояснюють на консультації._ `[ПОТРІБНІ ДАНІ: перелік від лікаря]`

---

### 13. FAQ *(розкривні питання + Schema.org FAQPage)*

Приклади питань:
> - Quantas sessões são necessárias?
> - Quanto tempo demora o procedimento?
> - Quando posso voltar ao trabalho?
> - O resultado é permanente?
> - Quem não é candidato?

_UA: Скільки сеансів / скільки триває / коли на роботу / чи результат постійний /
кому протипоказано. Відповіді_ `[ПОТРІБНІ ДАНІ]` _+ розмітка FAQPage для SEO._

---

### 14. Médico + qualificação confirmada *(довіра, юридично коректно)*

**Макет:** фото лікаря + ім'я + реальна кваліфікація + cédula.

> **[ФОТО]** `[ПОТРІБНІ ДАНІ: Dr./Dra. Nome]`
> `[ПОТРІБНІ ДАНІ: qualificação real]` · Cédula profissional: `[ПОТРІБНІ ДАНІ]`

_UA: Фото + ім'я + реальна кваліфікація + cédula. НЕ писати «especialista», якщо
спеціальність офіційно не визнана (вимога ERS). + Schema.org Physician._

---

### 15. Preço / princípio de preço *(ціна як інструмент конверсії, за правилами ERS)*

**Макет:** картка ціни з чітким «що входить».

> **Fixo:** `Avaliação médica — €[ПОТРІБНІ ДАНІ]`
> **Variável:** `Endolaser — desde €[ПОТРІБНІ ДАНІ]` (depende da zona e da complexidade)
>
> **O que está incluído:** `[ПОТРІБНІ ДАНІ: consulta, procedimento, X consultas de seguimento...]`

_UA: Де ціна фіксована — показуємо. Де залежить — «desde €X», АЛЕ лише якщо ця
ціна реально доступна, + поруч що саме входить (вимога ERS при рекламі ціни)._

---

### 16. CTA фінальний: Marcar avaliação + WhatsApp

> **[CTA] Marcar avaliação**  ·  **[CTA-2] WhatsApp**

_UA: Тут уже можна «Marcar avaliação» — людина прочитала сторінку й готова._

---

### 17. Informação clínica / Fontes *(обов'язковий блок — моя пропозиція)*

**Макет:** акуратний дрібний блок унизу.

> **Informação clínica:** O conteúdo desta página tem caráter informativo e não
> substitui uma consulta médica.
> **Fontes:** `[ПОТРІБНІ ДАНІ: посилання на наукові джерела для кожного claim]`

_UA: Інформаційний характер + джерела під кожен медичний claim. Дисциплінує
маркетинг: немає обіцянки без підстави (вимога ERS щодо наукової обґрунтованості)._

---

### 18. Footer (глобальний) — обов'язкові ідентифікатори ERS

> - Nome do estabelecimento · Morada (localização)
> - Nº de inscrição ERS: `[ПОТРІБНІ ДАНІ]`
> - Registo do estabelecimento / Licença de funcionamento: `[ПОТРІБНІ ДАНІ]`
> - Contactos · Horário · Mapa (Google Maps)
> - Política de privacidade (RGPD) · Gestão de cookies

_UA: ERS вимагає обов'язкові ідентифікаційні дані закладу — виносимо у футер
шаблону, тобто на кожну сторінку._

---

## Схема контенту (поля, що визначають БУДЬ-ЯКУ сторінку процедури)

Щоб 6 інших сторінок робилися «по одній системі», кожна процедура = цей набір полів:

```yaml
slug:                 # endolaser
hero:
  h1:                 # проблема у формі питання
  sub:                # можливе рішення + ключове відмінність
  image:              # [ФОТО]
concerns: []          # список скарг (чипи)
canBeImproved:        # обережний абзац
howItWorks: []        # кроки
whyThisApproach: []   # лише перевірювані переваги
pain:                 # Dói? / анестезія
recovery: []          # таймлайн по днях
whenResults:          # коли чекати
whatItDoesNotDo: []   # чесні обмеження
threeThingsToKnow: [] # 3 речі перед рішенням
risks: []             # ризики
faq: []               # питання/відповіді (+ FAQPage schema)
doctor:               # фото, ім'я, кваліфікація, cédula
  name:               # [ПОТРІБНІ ДАНІ]
  qualification:      # [ПОТРІБНІ ДАНІ]
  cedula:             # [ПОТРІБНІ ДАНІ]
price:
  fixed:              # якщо є
  from:               # "desde €X" (лише якщо реально доступно)
  included: []        # що входить (вимога ERS)
clinicalInfo:         # дисклеймер
sources: []           # ОБОВ'ЯЗКОВО: джерело під кожен claim
tracking:
  leadIdPrefix:       # для наскрізної воронки до Receita
```

> Коли цей шаблон затверджено — кожна наступна сторінка = заповнення цих полів.
> Верстку пишемо один раз, контент підставляється.

---

## Відкриті питання перед затвердженням шаблону

1. **Мови сайту** — фінально: PT + EN + ? (FR/ES/PL/RU)
2. **Хто фіксує офлайн-результати** воронки (Compareceu/Procedimento/Receita)?
   Є CRM, чи стартуємо з таблиці?
3. **Ціни Endolaser** — фіксована консультація + «desde €X»? Реальні цифри від клініки.
4. **Дані лікаря** — ім'я, кваліфікація, cédula для блоку довіри.
5. **ERS-ідентифікатори** закладу для футера.
6. Чи робимо **intent-сторінки** (papada, gordura localizada) окремо, чи поки лише категорії?

---

*Статус: wireframe v0.1 — чекає на затвердження. Після «ок» зроблю візуальний
HTML-макет цієї сторінки (сіра розкладка з реальною копією), щоб побачити «як на екрані».*
