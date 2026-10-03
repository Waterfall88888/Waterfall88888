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

// Blocos de resposta: {p} parágrafo · {short} resposta curta destacada · {list} lista · {know} 01/02/03
function block(b) {
  if (b.p) return `<p>${esc(b.p)}</p>`;
  if (b.short) return `<div class="short-answer">${esc(b.short)}</div>`;
  if (b.list) return `<ul class="answer-list">${b.list.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  if (b.know) return `<ol class="know">${b.know.map((i, n) => `<li><span class="num">0${n + 1}</span>${esc(i)}</li>`).join('')}</ol>`;
  throw new Error('Bloco desconhecido: ' + JSON.stringify(b));
}
const blockText = b => b.p || b.short || (b.list || b.know).join('; ');

function faqLd(c) {
  const mainEntity = c.questions.filter(q => q.faq).map(q => ({
    '@type': 'Question',
    name: q.faq,
    acceptedAnswer: { '@type': 'Answer', text: q.answer.map(blockText).join(' ') },
  }));
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }, null, 2).replace(/</g, '\\u003c');
}

function page(c) {
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
  Cores, logótipo e imagens são marcadores de posição. [ПОТРІБНІ ДАНІ] = dados reais da clínica.
-->
<script type="application/ld+json">
${faqLd(c)}
</script>
<style>
${css}</style>
</head>
<body>

<div class="proto-badge" aria-hidden="true">PROTÓTIPO</div>

<header class="site-header">
  <div class="container">
    <a class="logo" href="#">Algarve<span>stetic</span></a>
    <div class="header-right">
      <span class="lang"><b>PT</b> · EN</span>
      <a class="btn btn-primary header-cta" href="#avaliar" data-cta="header_marcar">Marcar avaliação</a>
    </div>
  </div>
</header>

<main>
  <div class="container">
    <nav class="breadcrumbs" aria-label="breadcrumb">
      <a href="#">Home</a> › <a href="#">Especialidades</a> › ${esc(c.name)}
    </nav>
  </div>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="container hero-grid">
      <div>
        <div class="eyebrow">${esc(c.eyebrow)}</div>
        <h1>${esc(c.h1)}</h1>
        <p class="lead">${esc(c.sub)}</p>
        <div class="btn-row">
          <a class="btn btn-primary" href="#avaliar" data-cta="hero_avaliar">${esc(c.ctaLabel)}</a>
          <a class="btn btn-wa" href="#" data-cta="hero_whatsapp" data-wa>WhatsApp</a>
        </div>
        <div class="microcopy">${esc(c.microcopy)}</div>
      </div>
      <div class="visual" role="img" aria-label="Espaço para imagem do procedimento">
        <div class="visual-label"><b>Imagem:</b> ${esc(c.imageNote)} <b>Não</b> usar modelo genérico de beleza.</div>
      </div>
    </div>
  </section>

  <!-- PARA QUE SERVE? -->
  <section class="section alt" id="para-que-serve">
    <div class="container">
      <h2>Para que serve?</h2>
      <p class="lead">${esc(c.indicationsIntro)}</p>
      <div class="cards">
${c.indications.map((t, i) => `        <div class="card"><div class="card-icon">${i + 1}</div><p>${esc(t)}</p></div>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- PERGUNTAS -->
  <section class="section" id="perguntas">
    <div class="container qa">
${c.questions.map(q => `
      <div class="qa-row" id="${q.id}">
        <h2>${esc(q.q)}</h2>
        <div class="answer">
          ${q.answer.map(block).join('\n          ')}
        </div>
      </div>`).join('\n')}

    </div>
  </section>

  <!-- QUEM REALIZA -->
  <section class="section alt" id="medico">
    <div class="container">
      <h2>Avaliação e procedimento</h2>
      <div class="doctor">
        <div class="doctor-photo">Foto real do médico</div>
        <dl>
          <dt>Nome completo</dt><dd>${need()}</dd>
          <dt>Qualificação profissional</dt><dd>${need('só qualificações reais e reconhecidas')}</dd>
          <dt>Cédula profissional</dt><dd>${need()}</dd>
        </dl>
      </div>
    </div>
  </section>

  <!-- PREÇO -->
  <section class="section" id="preco">
    <div class="container" style="max-width:780px">
      <h2>Preço</h2>
      <div class="price-box">
        <span class="status">Não publicar até decisão da administração</span>
        <p><strong>${esc(c.name)} — desde €<span class="placeholder-data">___</span></strong></p>
        <p class="muted">O valor depende da área e extensão do tratamento e é definido após avaliação.</p>
        <p style="margin:0;font-size:.9rem">A definir: preço da avaliação · preço mínimo real · zonas incluídas · o que está incluído · o que pode ter custo adicional.</p>
      </div>
    </div>
  </section>

  <!-- CTA FINAL + FORM -->
  <section class="section cta-band" id="avaliar">
    <div class="container cta-grid">
      <div>
        <h2>${esc(c.finalCta.title)}</h2>
        <p>${esc(c.finalCta.text)}</p>
        <div class="btn-row">
          <a class="btn btn-wa" href="#" data-cta="cta_whatsapp" data-wa>WhatsApp</a>
        </div>
      </div>
      <div class="form-card" id="lead-card">
        <form id="lead-form" novalidate>
          <h3>${esc(c.ctaLabel)}</h3>
          <div class="field"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
          <div class="field"><label for="f-contacto">Telefone ou email</label><input id="f-contacto" name="contacto" autocomplete="tel" required></div>
          <div class="field"><label for="f-zona">O que gostaria de avaliar?</label>
            <select id="f-zona" name="zona">
              ${c.formOptions.map(o => `<option>${esc(o)}</option>`).join('')}<option>Não tenho a certeza</option>
            </select>
          </div>
          <input type="hidden" name="lead_id" id="f-lead">
          <input type="hidden" name="page" value="${c.slug}">
          <p class="consent-line">Ao enviar, aceita ser contactado para organizar a avaliação. Ver <a href="#">Política de Privacidade</a>.</p>
          <button class="btn btn-primary" type="submit" style="width:100%">Enviar pedido</button>
        </form>
        <div class="thanks" role="status" aria-live="polite">
          <div class="check">✓</div>
          <h3>Pedido recebido.</h3>
          <p class="muted">Entraremos em contacto para organizar a avaliação.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- INTERNATIONAL PATIENTS (só na página PT) -->
  <section class="section" id="international" lang="en">
    <div class="container">
      <div class="intl">
        <div>
          <div class="eyebrow">International patients</div>
          <h2>Visiting the Algarve?</h2>
          <p>If you are travelling to the Algarve and would like to plan an assessment or treatment during your stay, visit our International Patients page.</p>
          <a class="btn btn-outline" href="#" data-cta="intl_plan">Plan your visit</a>
          <p class="lang-note" style="margin-top:14px">Block shown only on the PT page. Leads to the international pathway (timing, recovery, follow-up).</p>
        </div>
        <form class="form-card" style="box-shadow:none;border:1px solid var(--line)" onsubmit="return false">
          <p class="muted" style="font-size:.85rem;margin-bottom:12px">Preview of the qualification form on the International Patients page:</p>
          <div class="field"><label>Where do you live?</label><input placeholder="Country / city"></div>
          <div class="field"><label>When will you be in the Algarve?</label><input type="date"></div>
          <div class="field"><label>How long will you stay?</label><select><option>Less than 1 week</option><option>1–2 weeks</option><option>More than 2 weeks</option></select></div>
          <div class="field"><label>What would you like assessed?</label><input placeholder="e.g. acne scars"></div>
        </form>
      </div>
    </div>
  </section>

  <!-- INFORMAÇÃO CLÍNICA E FONTES -->
  <section class="section alt" id="fontes">
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
  </section>
</main>

<!-- LEGAL / ERS -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="legal">
        <h4>Algarvestetic</h4>
        <dl>
          <dt>Entidade</dt><dd>${need()}</dd>
          <dt>Morada</dt><dd>Portimão, Algarve · <span class="placeholder-data">[morada completa]</span></dd>
          <dt>Inscrição ERS</dt><dd>${need()}</dd>
          <dt>Registo</dt><dd>${need()}</dd>
          <dt>Licença</dt><dd><span class="placeholder-data">[quando aplicável]</span></dd>
        </dl>
      </div>
      <div>
        <h4>Contactos</h4>
        <p><span class="placeholder-data">[telefone]</span><br><span class="placeholder-data">[email]</span><br>WhatsApp · Horário</p>
      </div>
      <div>
        <h4>Informação</h4>
        <p><a href="#">Política de Privacidade</a><br><a href="#" id="manage-cookies">Gestão de cookies</a><br><a href="#">International Patients</a></p>
      </div>
    </div>
    <div class="footer-bottom">Os números de registo são preenchidos apenas com os dados oficiais da clínica.</div>
  </div>
</footer>

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

for (const file of readdirSync(join(root, 'content')).filter(f => f.endsWith('.json'))) {
  const c = JSON.parse(readFileSync(join(root, 'content', file), 'utf8'));
  writeFileSync(join(root, `${c.slug}.html`), page(c));
  console.log(`prototype/${c.slug}.html ← content/${file}`);
}
