> ⚠️ **Історичний документ.** Актуальний текст сторінок — `prototype/content/*.json`,
> правила й SEO-карта — `PLAN.md` §11–12. Тут зберігаються технічні вимоги v1.0.

# ТЗ — Master Landing Page «Endolaser / Endolifting» · Algarvestetic

> **Статус: еталон v1.1 (коротка версія тексту).** За цією сторінкою будуються всі інші
> сторінки процедур (одна система, один шаблон).
> Візуальна реалізація: `prototype/endolaser.html`.

## Мета сторінки
Отримати від зацікавленого відвідувача одну з трьох дій:
1. `Saber se é indicado para mim`
2. `Marcar avaliação`
3. `Contactar por WhatsApp`

Сторінка **не** змушує пацієнта вирішувати про процедуру онлайн — вона веде до
**медичної оцінки**.

---

## Структура сторінки (v1.1 — коротка версія)

Текст скорочено: кожен блок — одне питання пацієнта. Заголовки-питання
збігаються з пошуковими запитами («endolaser dói», «endolaser emagrece»),
тому вони ж розмічені як Schema.org FAQPage.

### HERO
**H1:** Papada, gordura localizada ou pele mais flácida?
**Sub:** O Endolaser é um procedimento minimamente invasivo utilizado, em casos
selecionados, para pequenos depósitos de gordura localizada e flacidez, ajudando a
melhorar o contorno da zona tratada.
**CTA:** `[ SABER SE É INDICADO PARA MIM ]` · `[ WHATSAPP ]`
**Microcopy:** Avaliação médica antes do procedimento.
**Візуал:** НЕ generic beauty model (лікар під час процедури / fibre / анатомічна візуалізація).

### Para que serve?
Pode ser considerado para: papada · pequenos depósitos de gordura na face ou corpo ·
perda de definição do contorno · flacidez ligeira a moderada.

### Como funciona?
Uma fibra ótica fina é introduzida sob a pele através de pequenos pontos de entrada.
A energia laser produz um efeito térmico controlado, permitindo atuar sobre pequenos
depósitos de gordura e promover remodelação dos tecidos.

### Dói?
Pode ser desconfortável. É realizada anestesia local infiltrativa e/ou bloqueios
anestésicos, conforme a zona. Pode sentir pressão, manipulação ou calor.

### Como é a recuperação?
Podem ocorrer edema, pequenos hematomas, sensibilidade e endurecimento temporário.
O regresso à rotina depende da área e extensão tratadas.

### Quando vejo o resultado?
O edema inicial pode alterar o contorno. Depois, a remodelação continua
progressivamente durante as semanas e meses seguintes.

### Endolaser emagrece?
**Não.** Destina-se a pequenos depósitos de gordura localizada. Não é um tratamento
para perda de peso.

### Substitui cirurgia?
**Nem sempre.** Excesso importante de pele, flacidez acentuada ou maior volume de
gordura podem necessitar de outra abordagem.

### O que deve saber
01 Existe recuperação. · 02 O resultado é progressivo. · 03 Nem todos têm indicação
para Endolaser.

### Existem riscos?
Podem ocorrer infeção, irregularidades, alterações da sensibilidade, lesão térmica e
outras complicações menos frequentes. Os riscos específicos são explicados antes do
procedimento.

### Обов'язкові блоки (немає в тексті власника, але лишаються в шаблоні)
- **Quem realiza:** фото, ім'я, реальна кваліфікація, cédula. Без невизнаних титулів. `[ПОТРІБНІ ДАНІ]`
- **Preço:** не публікувати до рішення адміністрації; потім `desde €___` лише якщо
  ціна реально доступна, + що входить (ERS). `[ПОТРІБНІ ДАНІ]`
- **International patients** (лише на PT-сторінці) → `[ PLAN YOUR VISIT ]`.
- **Informação clínica e fontes:** 3–5 джерел лише під claims зі сторінки. `[ПОТРІБНІ ДАНІ]`
- **Footer ERS:** Entidade · Morada · Inscrição ERS · Registo · Licença · Contactos ·
  Privacidade · Cookies. Не вигадувати номери. `[ПОТРІБНІ ДАНІ]`

### Фінальний CTA — Será adequado para mim?
Se pretende melhorar papada, gordura localizada, flacidez ou definição do contorno,
comece por uma avaliação. `[ SABER SE É INDICADO PARA MIM ]` (форма) · `[ WHATSAPP ]`

> Попередня довга версія (18 екранів, v1.0) — в історії git.

---

## Технічні вимоги (обов'язкові)
1. **Sticky CTA на мобільному:** внизу дві невеликі кнопки `Marcar | WhatsApp` (не величезна панель).
2. **Швидкість:** без важкого 4K-відео в hero. Mobile page speed > красива заставка.
3. **Коротка форма:** Nome + telefone/email + «O que gostaria de avaliar?». Без мед.історії в маркетинговій формі.
4. **Після відправки — не просто "Obrigado":** екран «Pedido recebido. Entraremos em contacto para organizar a avaliação.» + фіксуємо conversion event.
5. **International Patients форма** квалифікує турліда: Where do you live? · When will you be in the Algarve? · How long will you stay? · What would you like assessed?

## Compliance-доповнення (Claude)
- **RGPD cookie-банер + Google Consent Mode** перед будь-якими пікселями; conversion events (вимога №4) чекають на згоду.
- **`lead_id`** на кожній формі/WhatsApp → наскрізна воронка до «Receita» (офлайн-стадії дописує персонал у CRM/таблицю; Meta CAPI + offline conversions upload).
- **Фото «до/після»/пацієнтів** = медичні дані: лише з письмовою згодою.

---

## Схема контенту (поля для решти сторінок процедур)
Кожна наступна процедура = заповнення цих полів за цим самим шаблоном:
`slug · hero{h1,sub,image,microcopy} · indications[] ·
questions[{q, shortAnswer?, answer}] (Como funciona, Dói, Recuperação, Resultado, Emagrece?, Substitui cirurgia?, Riscos) ·
mustKnow[3] · doctor{name,qualification,cedula,photo} · price{fixed,from,included[]} ·
finalCta{title,text} · international? · sources[] · legal{entidade,morada,ers,registo,licenca} ·
tracking{leadIdPrefix}`
