(() => {
  const P = window.PAGE;

  // lead_id: liga o pedido do site às etapas offline (Marcação → Compareceu → Procedimento → Receita).
  const leadId = P.leadPrefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  document.getElementById('f-lead').value = leadId;

  // Consentimento RGPD: nenhum evento de medição é enviado antes de "Aceitar".
  let consent = null;
  try { consent = localStorage.getItem('consent'); } catch (e) {}
  const cookie = document.getElementById('cookie');
  if (!consent) cookie.hidden = false;
  cookie.addEventListener('click', e => {
    const v = e.target.dataset.consent; if (!v) return;
    consent = v; try { localStorage.setItem('consent', v); } catch (e) {}
    cookie.hidden = true;
  });
  document.getElementById('manage-cookies').addEventListener('click', e => { e.preventDefault(); cookie.hidden = false; });

  function track(event, params) {
    if (consent !== 'granted') return;            // Consent Mode: sem consentimento, nada é enviado
    // Produção: gtag('event', event, params) + Meta Pixel/CAPI com o mesmo event_id
    console.log('[track]', event, params);
  }

  document.querySelectorAll('[data-cta]').forEach(el =>
    el.addEventListener('click', () => track('cta_click', { page: P.slug, cta: el.dataset.cta, lead_id: leadId })));

  // WhatsApp com lead_id na mensagem pré-preenchida
  const waText = encodeURIComponent(P.whatsappText + ' (ref: ' + leadId + ')');
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = 'https://wa.me/?text=' + waText;    // [ПОТРІБНІ ДАНІ]: número da clínica
    a.target = '_blank'; a.rel = 'noopener';
  });

  // Formulário curto → ecrã "Pedido recebido" + conversion event
  document.getElementById('lead-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    if (!f.nome.value.trim() || !f.contacto.value.trim()) { f.reportValidity(); return; }
    track('generate_lead', { page: P.slug, zona: f.zona ? f.zona.value : undefined, lead_id: leadId });
    document.getElementById('lead-card').classList.add('sent');
  });
})();
