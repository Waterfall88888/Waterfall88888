// Gera páginas HTML autónomas (CSS e JS embutidos) a partir de content/*.json.
// Uso: node prototype/build.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(root, 'template/style.css'), 'utf8');
const js = readFileSync(join(root, 'template/page.js'), 'utf8');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const need = note => `<span class="placeholder-data">[ПОТРІБНІ ДАНІ${note ? ' — ' + note : ''}]</span>`;
const href = slug => (slug === 'index' ? 'index.html' : `${slug}.html`);
const ldScript = obj => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')}\n</script>`;

// Blocos de resposta: {p} parágrafo · {short} resposta curta destacada · {list} lista · {know} 01/02/03
function block(b) {
  if (b.p) return `<p>${esc(b.p)}</p>`;
  if (b.short) return `<div class="short-answer">${esc(b.short)}</div>`;
  if (b.list) return `<ul class="answer-list">${b.list.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  if (b.know) return `<ol class="know">${b.know.map((i, n) => `<li><span class="num">0${n + 1}</span>${esc(i)}</li>`).join('')}</ol>`;
  throw new Error('Bloco desconhecido: ' + JSON.stringify(b));
}
const blockText = b => b.p || b.short || (b.list || b.know).join('; ');

// ---------- Partes comuns ----------

function header(c) {
  return `<header class="site-header">
  <div class="container">
    <a class="logo" href="index.html">Algarv<span>Estetic</span></a>
    <nav class="main-nav" aria-label="Principal">
      <a href="index.html#areas">Áreas</a><a href="index.html#international">International patients</a><a href="index.html#equipa">Equipa</a><a href="index.html#contactos">Contactos</a>
    </nav>
    <div class="header-right">
      <span class="lang"><b>PT</b> · EN</span>
      <a class="btn btn-primary header-cta" href="#avaliar" data-cta="header_marcar">Marcar ${esc(c.bookingNoun)}</a>
    </div>
  </div>
</header>`;
}

function leadForm(c) {
  const select = c.formOptions && c.formOptions.length
    ? `<div class="field"><label for="f-zona">${esc(c.formLabel || 'O que gostaria de avaliar?')}</label>
            <select id="f-zona" name="zona">${c.formOptions.map(o => `<option>${esc(o)}</option>`).join('')}<option>Não tenho a certeza</option></select>
          </div>`
    : '';
  // Páginas sensíveis: não recolher sintomas no formulário de marketing (minimização RGPD).
  const sensitive = c.sensitive ? '<p class="consent-line">Não precisa de descrever sintomas neste formulário.</p>' : '';
  return `<div class="form-card" id="lead-card">
        <form id="lead-form" novalidate>
          <h3>${esc(c.formTitle || c.ctaLabel)}</h3>
          <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
          <div class="field"><label for="f-contacto">Telefone ou email</label><input id="f-contacto" name="contacto" autocomplete="tel" required></div>
          ${select}${sensitive}
          <input type="hidden" name="lead_id" id="f-lead">
          <input type="hidden" name="page" value="${c.slug}">
          <p class="consent-line">Ao enviar, aceita ser contactado para organizar a ${esc(c.bookingNoun)}. Ver <a href="#">Política de Privacidade</a>.</p>
          <button class="btn btn-primary" type="submit" style="width:100%">Enviar pedido</button>
        </form>
        <div class="thanks" role="status" aria-live="polite">
          <div class="check">✓</div>
          <h3>Pedido recebido.</h3>
          <p class="muted">Entraremos em contacto para organizar a ${esc(c.bookingNoun)}.</p>
        </div>
      </div>`;
}

const internationalBlock = () => `<section class="section" id="international" lang="en">
    <div class="container">
      <div class="intl">
        <div>
          <div class="eyebrow">International patients</div>
          <h2>Visiting the Algarve?</h2>
          <p>If you are travelling to the Algarve and would like to plan an assessment or treatment during your stay, visit our International Patients page.</p>
          <a class="btn btn-outline" href="#" data-cta="intl_plan">Plan your visit</a>
          <p class="lang-note" style="margin-top:14px">Leads to the international pathway (timing, recovery, follow-up).</p>
        </div>
        <form class="form-card" style="box-shadow:none;border:1px solid var(--line)" onsubmit="return false">
          <p class="muted" style="font-size:.85rem;margin-bottom:12px">Preview of the qualification form on the International Patients page:</p>
          <div class="field"><label>Where do you live?</label><input placeholder="Country / city"></div>
          <div class="field"><label>When will you be in the Algarve?</label><input type="date"></div>
          <div class="field"><label>How long will you stay?</label><select><option>Less than 1 week</option><option>1–2 weeks</option><option>More than 2 weeks</option></select></div>
          <div class="field"><label>What would you like assessed?</label><input placeholder="Briefly"></div>
        </form>
      </div>
    </div>
  </section>`;

const doctorBlock = () => `<section class="section alt" id="medico">
    <div class="container">
      <h2>Quem realiza a avaliação</h2>
      <div class="doctor">
        <div class="doctor-photo">Foto real do médico</div>
        <dl>
          <dt>Nome completo</dt><dd>${need()}</dd>
          <dt>Qualificação profissional</dt><dd>${need('só qualificações reais e reconhecidas')}</dd>
          <dt>Cédula profissional</dt><dd>${need()}</dd>
        </dl>
      </div>
    </div>
  </section>`;

const priceBlock = c => `<section class="section" id="preco">
    <div class="container" style="max-width:780px">
      <h2>Preço</h2>
      <div class="price-box">
        <span class="status">Não publicar até decisão da administração</span>
        <p><strong>${esc(c.priceItem || c.name)} — desde €<span class="placeholder-data">___</span></strong></p>
        <p class="muted">O valor é definido após avaliação, de acordo com o caso.</p>
        <p style="margin:0;font-size:.9rem">A definir: preço da ${esc(c.bookingNoun)} · preço mínimo real · o que está incluído · o que pode ter custo adicional.</p>
      </div>
    </div>
  </section>`;

const sourcesBlock = () => `<section class="section alt" id="fontes">
    <div class="container sources" style="max-width:820px">
      <h2 style="color:var(--ink)">Informação clínica e fontes</h2>
      <p>O conteúdo desta página tem caráter informativo e não substitui uma consulta médica.</p>
      <ol>
        <li>${need('fonte 1')}</li>
        <li>${need('fonte 2')}</li>
        <li>${need('fonte 3')}</li>
      </ol>
      <p style="font-size:.82rem">Última revisão: <span class="placeholder-data">[data]</span></p>
    </div>
  </section>`;

const footer = () => `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="legal">
        <h4>Centro Médico AlgarvEstetic</h4>
        <dl>
          <dt>Entidade</dt><dd>${need('entidade responsável')}</dd>
          <dt>Morada</dt><dd>Portimão, Algarve · <span class="placeholder-data">[morada completa]</span></dd>
          <dt>Inscrição ERS</dt><dd>${need()}</dd>
          <dt>Registo</dt><dd>${need()}</dd>
          <dt>Licença</dt><dd><span class="placeholder-data">[quando aplicável]</span></dd>
        </dl>
      </div>
      <div>
        <h4>Contactos</h4>
        <p><span class="placeholder-data">[telefone]</span><br><span class="placeholder-data">[email]</span><br>WhatsApp</p>
        <p>Segunda a sexta-feira<br>09:00–18:00</p>
      </div>
      <div>
        <h4>Informação</h4>
        <p><a href="#">Política de Privacidade</a><br><a href="#">Política de Cookies</a><br><a href="#" id="manage-cookies">Gerir cookies</a><br><a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener">Livro de Reclamações</a><br><a href="index.html#international">International Patients</a></p>
      </div>
    </div>
    <div class="footer-bottom">Os números de registo são preenchidos apenas com os dados oficiais da clínica. Outros elementos legalmente obrigatórios devem ser confirmados antes da publicação.</div>
  </div>
</footer>`;

function doc(c, { ld, body }) {
  const pageConfig = JSON.stringify({ slug: c.slug, leadPrefix: c.leadPrefix, whatsappText: c.whatsappText });
  return `<!doctype html>
<html lang="pt">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<!--
  PROTÓTIPO VISUAL — não é o site final. Gerado por prototype/build.mjs a partir de content/${c.slug}.json.
  URL de produção previsto: /${c.slug === 'index' ? '' : c.slug + '/'}
  Cores, logótipo e imagens são marcadores de posição. [ПОТРІБНІ ДАНІ] = dados reais da clínica.
-->
${ld ? ldScript(ld) : ''}
<style>
${css}</style>
</head>
<body>

<div class="proto-badge" aria-hidden="true">PROTÓTIPO</div>

${header(c)}

<main>
${body}
</main>

${footer()}

<!-- Sticky CTA mobile -->
<div class="sticky-cta">
  <a class="btn btn-primary" href="#avaliar" data-cta="sticky_marcar">Marcar</a>
  <a class="btn btn-wa" href="#" data-cta="sticky_whatsapp" data-wa>WhatsApp</a>
</div>

<!-- RGPD cookie consent -->
<div class="cookie" id="cookie" hidden>
  <p>Usamos cookies de medição apenas com o seu consentimento, para perceber que páginas ajudam os pacientes a chegar à avaliação.</p>
  <div class="btn-row" style="margin:0">
    <button class="btn btn-primary" data-consent="granted">Aceitar</button>
    <button class="btn btn-outline" data-consent="denied">Recusar</button>
  </div>
</div>

<script>window.PAGE = ${pageConfig};</script>
<script>
${js}</script>
</body>
</html>
`;
}

// ---------- Página de procedimento / área ----------

function procedure(c) {
  // FAQ sem resposta aprovada fica visível como pendente e não entra no Schema.org.
  const answered = c.faq.filter(f => f.a);
  const ld = answered.length && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.map(blockText).join(' ') },
    })),
  };

  const body = `  <div class="container">
    <nav class="breadcrumbs" aria-label="breadcrumb"><a href="index.html">Home</a> › ${esc(c.name)}</nav>
  </div>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="container hero-grid">
      <div>
        <h1 class="seo-h1">${esc(c.h1)}</h1>
        ${c.h1Sub ? `<p class="h1-sub">${esc(c.h1Sub)}</p>` : ''}
        <p class="hook">${esc(c.hook)}</p>
        ${c.heroText.map(t => `<p class="lead">${esc(t)}</p>`).join('\n        ')}
        <div class="btn-row">
          <a class="btn btn-primary" href="#avaliar" data-cta="hero_avaliar">${esc(c.ctaLabel)}</a>
          <a class="btn btn-wa" href="#" data-cta="hero_whatsapp" data-wa>WhatsApp</a>
        </div>
        <div class="microcopy">${esc(c.microcopy)}</div>
      </div>
      <div class="visual" role="img" aria-label="Espaço para imagem">
        <div class="visual-label"><b>Imagem:</b> ${esc(c.imageNote)}</div>
      </div>
    </div>
  </section>
${c.chips ? `
  <!-- INDICAÇÕES -->
  <section class="section alt" id="indicacoes">
    <div class="container">
      <h2>${esc(c.chips.label)}</h2>
      <ul class="chips">${c.chips.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      ${c.chips.note ? `<p class="chips-note">${esc(c.chips.note)}</p>` : ''}
    </div>
  </section>
` : ''}
  <!-- VISIBLE -->
  <section class="section" id="informacao">
    <div class="container">
      <div class="qa">
${c.blocks.map(q => `        <div class="qa-row" id="${q.id}">
          <h2>${esc(q.h)}</h2>
          <div class="answer">
            ${q.answer.map(block).join('\n            ')}
          </div>
        </div>`).join('\n')}
      </div>
      ${c.keys && c.keys.length ? `<div class="keys">${c.keys.map(k => `<div class="callout info"><p>${esc(k)}</p></div>`).join('')}</div>` : ''}
      <div class="mid-cta"><a class="btn btn-primary" href="#avaliar" data-cta="mid_avaliar">${esc(c.ctaLabel)}</a></div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section alt" id="faq">
    <div class="container">
      <h2>Perguntas frequentes</h2>
      <div class="faq">
${c.faq.map(f => `        <details><summary>${esc(f.q)}</summary><div class="faq-a">${f.a ? f.a.map(block).join('') : `<p>${need('resposta a confirmar pelo médico')}</p>`}</div></details>`).join('\n')}
      </div>
    </div>
  </section>

  ${doctorBlock()}

  ${priceBlock(c)}

  <!-- CTA FINAL + FORM -->
  <section class="section cta-band" id="avaliar">
    <div class="container cta-grid">
      <div>
        <h2>${esc(c.finalCta.title)}</h2>
        ${c.finalCta.text.map(t => `<p>${esc(t)}</p>`).join('\n        ')}
        <div class="btn-row"><a class="btn btn-wa" href="#" data-cta="cta_whatsapp" data-wa>WhatsApp</a></div>
      </div>
      ${leadForm(c)}
    </div>
  </section>

  ${internationalBlock()}

  ${sourcesBlock()}`;

  return doc(c, { ld, body });
}

// ---------- Home ----------

function home(c, slugs) {
  for (const a of c.areas.items) for (const l of a.links) {
    if (!slugs.has(l.page)) throw new Error(`Home: página inexistente "${l.page}"`);
  }
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Centro Médico AlgarvEstetic',
    address: { '@type': 'PostalAddress', addressLocality: 'Portimão', addressRegion: 'Algarve', addressCountry: 'PT' },
    openingHours: 'Mo-Fr 09:00-18:00',
  };

  const body = `  <!-- 01 HERO -->
  <section class="hero home-hero" id="hero">
    <div class="container hero-grid">
      <div>
        <h1>${esc(c.h1)}</h1>
        <p class="lead">${esc(c.sub)}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#avaliar" data-cta="hero_marcar">Marcar consulta</a>
          <a class="btn btn-outline" href="#areas" data-cta="hero_areas">Ver áreas</a>
        </div>
      </div>
      <div class="visual" role="img" aria-label="Espaço para imagem">
        <div class="visual-label"><b>Imagem:</b> ${esc(c.imageNote)}</div>
      </div>
    </div>
  </section>

  <!-- 02 O QUE PROCURA? -->
  <section class="section alt" id="areas">
    <div class="container">
      <h2>${esc(c.areas.title)}</h2>
      <p class="lead">${esc(c.areas.intro)}</p>
      <div class="areas">
${c.areas.items.map(a => `        <article class="area">
          <h3>${esc(a.name)}</h3>
          ${a.sub ? `<p class="area-sub">${esc(a.sub)}</p>` : ''}
          <p class="tags">${a.tags.map(esc).join(' • ')}</p>
          <p>${esc(a.text)}</p>
          <div class="links">${a.links.map(l => `<a href="${href(l.page)}" data-cta="area_${l.page}">${esc(l.label)}</a>`).join('')}</div>
        </article>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- 03 NÃO SABE QUAL TRATAMENTO ESCOLHER? -->
  <section class="section">
    <div class="container">
      <div class="band">
        <div>
          <h2>${esc(c.notSure.title)}</h2>
          ${c.notSure.text.map(t => `<p>${esc(t)}</p>`).join('\n          ')}
        </div>
        <a class="btn btn-primary" href="#avaliar" data-cta="notsure_marcar">Marcar avaliação</a>
      </div>
    </div>
  </section>

  <!-- 04 PORQUÊ ALGARVESTETIC? -->
  <section class="section alt" id="porque">
    <div class="container">
      <div class="eyebrow">Porquê AlgarvEstetic?</div>
      <h2>${esc(c.why.title)}</h2>
      <div class="reasons">
${c.why.items.map(r => `        <div class="reason"><h3>${esc(r.h)}</h3><p>${esc(r.p)}</p></div>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- 05 INTERNATIONAL PATIENTS -->
  <section class="section" id="international" lang="en">
    <div class="container">
      <div class="intl">
        <div>
          <div class="eyebrow">International patients</div>
          <h2>${esc(c.international.title)}</h2>
          <p class="lead">${esc(c.international.sub)}</p>
          <p>${esc(c.international.text)}</p>
        </div>
        <div>
          <p><strong>We help you understand:</strong></p>
          <ul class="check-list">${c.international.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
          <div class="btn-row">
            <a class="btn btn-primary" href="#" data-cta="intl_page">International patients</a>
            <a class="btn btn-outline" href="#" data-cta="intl_plan">Plan your visit</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 06 EQUIPA MÉDICA -->
  <section class="section alt" id="equipa">
    <div class="container">
      <h2>Conheça a nossa equipa</h2>
      <p class="muted">Apenas informação profissional verificável.</p>
      <div class="team">
${[1, 2, 3].map(() => `        <div class="member">
          <div class="doctor-photo">Fotografia</div>
          <dl>
            <dt>Nome completo</dt><dd>${need()}</dd>
            <dt>Qualificação profissional</dt><dd>${need()}</dd>
            <dt>Cédula profissional</dt><dd>${need()}</dd>
            <dt>Áreas de atividade</dt><dd>${need()}</dd>
          </dl>
        </div>`).join('\n')}
      </div>
      <a class="btn btn-outline" href="#" data-cta="team">Conhecer a equipa</a>
    </div>
  </section>

  <!-- 07 TEM UMA DÚVIDA? -->
  <section class="section">
    <div class="container">
      <div class="band">
        <div>
          <h2>${esc(c.question.title)}</h2>
          ${c.question.text.map(t => `<p>${esc(t)}</p>`).join('\n          ')}
        </div>
        <div class="btn-row" style="margin:0">
          <a class="btn btn-wa" href="#" data-cta="question_whatsapp" data-wa>WhatsApp</a>
          <a class="btn btn-outline" href="#avaliar" data-cta="question_marcar">Marcar consulta</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 08 LOCALIZAÇÃO -->
  <section class="section alt" id="contactos">
    <div class="container location">
      <div>
        <h2>Estamos em Portimão</h2>
        <dl class="info-list">
          <dt>Morada</dt><dd>${need('morada completa')}</dd>
          <dt>Horário</dt><dd>Segunda a sexta-feira<br>09:00–18:00</dd>
          <dt>Telefone</dt><dd>${need()}</dd>
          <dt>WhatsApp</dt><dd>${need()}</dd>
          <dt>E-mail</dt><dd>${need()}</dd>
        </dl>
        <a class="btn btn-outline" href="#" data-cta="directions">Como chegar</a>
      </div>
      <div class="map">Mapa Google integrado<br>(carregar só após consentimento de cookies)</div>
    </div>
  </section>

  <!-- 09 CTA FINAL + FORM -->
  <section class="section cta-band" id="avaliar">
    <div class="container cta-grid">
      <div>
        <h2>${esc(c.final.title)}</h2>
        <p>${esc(c.final.text)}</p>
        <div class="btn-row"><a class="btn btn-wa" href="#" data-cta="cta_whatsapp" data-wa>WhatsApp</a></div>
      </div>
      ${leadForm(c)}
    </div>
  </section>`;

  return doc(c, { ld, body });
}

// ---------- Build ----------

const pages = readdirSync(join(root, 'content'))
  .filter(f => f.endsWith('.json'))
  .map(file => ({ file, c: JSON.parse(readFileSync(join(root, 'content', file), 'utf8')) }));
const slugs = new Set(pages.map(p => p.c.slug));

for (const { file, c } of pages) {
  c.bookingNoun = c.bookingNoun || 'avaliação';
  const html = c.type === 'home' ? home(c, slugs) : procedure(c);
  writeFileSync(join(root, href(c.slug)), html);
  console.log(`prototype/${href(c.slug)} ← content/${file}`);
}
