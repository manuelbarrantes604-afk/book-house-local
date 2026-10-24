(() => {
'use strict';
const CFG = window.SITE_CONFIG;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = (n, d = 0) => '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
const money2 = n => money(n, Math.round(n * 100) % 100 ? 2 : 0);
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return iso(d); };
const nightsBetween = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const TODAY = iso(new Date());

/* ---------- i18n ---------- */
const T = {
 en: { nav_homes:'Homes', nav_photos:'Photos', nav_map:'Location', nav_reviews:'Reviews', nav_faq:'FAQ', book_now:'Book now', search:'Search',
  hero_title:'Local homes, booked direct.', hero_sub:'Whole homes in Bentonville and Springdale, hosted by Manuel. Pick a town, pick a home, and book straight with us.',
  loc_all:'All homes', homes_in:'Homes in {c}', homes_all:'Homes in Northwest Arkansas', n_homes:'{n} home', n_homes_p:'{n} homes', back_all:'All homes', total_for:'total for {n} nights · incl. taxes',
  not_for_dates:'Not available for your dates', tax_detail:'Tax breakdown', taxes_incl:'Includes Arkansas lodging taxes ({p}%)', dates_hint:'Add dates to see the total with taxes',
  pol_title:'Cancellation policy: Firm', pol_full:'Full refund if you cancel at least 30 days before check-in.', pol_half:'50% refund if you cancel 7–30 days before check-in.', pol_none:'No refund if you cancel less than 7 days before check-in.',
  pol_grace:'Full refund if you cancel within 48 hours of booking, as long as check-in is at least 14 days away.', pol_scope:'Refunds cover the full amount paid (nights, cleaning fee and taxes). Check-in time is 4:00 PM Central.',
  pol_full_d:'Full refund until {d}', pol_half_d:'50% refund until {d}', pol_none_d:'No refund after {d}', pol_short:'Firm cancellation · full refund until {d}', pol_short_nodate:'Firm cancellation · full refund up to 30 days before check-in', pol_short_half:'Firm cancellation · 50% refund until {d}', pol_short_none:'Firm cancellation · non-refundable for these dates',
  ct:'CT', home:'Home', check_in:'Check-in', check_out:'Checkout', guests:'Guests',
  check_avail:'Check availability', choose_home:'Choose your home', your_trip:'Your trip', guests_sub:'Adults & children · max 10', pets:'Pets', pets_sub:'Up to 2 · no pet fee', reserve:'Reserve',
  map_title:"Where you'll be", reviews_title:'What guests say', show_more:'Show more reviews', faq_title:'Questions', night:'night', nights:'nights',
  from:'from', per_night:'/ night', selected:'✓ Selected', view_home:'View this home', show_all:'Show all photos', about:'About this home', sleeping:'Where you’ll sleep', amenities:'What this place offers',
  show_all_amen:'Show all {n} amenities', rules:'House rules', ttk:'Good to know', read_more:'Read more', read_less:'Show less', pick_in:'Select your check-in date', pick_out:'Now pick your checkout date',
  min_n:'Minimum {n} nights from this date', not_avail:'Some nights in that range are booked', no_co:'Checkout isn’t available on that day', max_n:'For stays over {n} nights, message us', ok_range:'{n} nights · tap Reserve when ready',
  cleaning:'Cleaning fee', extra_guests:'Extra guests ({n} × {p}/night)', total:'Total', taxes:'Taxes', same_price:'Same nightly prices and fees as our Airbnb listing — booked directly with us.', add_dates:'Add dates for prices',
  clear:'Clear dates', legend_min:'2+ night minimum', legend_strike:'Booked', synced:'Prices & availability synced {t}', all_homes:'Both homes', sleeps:'Sleeps', beds:'Beds', baths:'Baths', bedrooms:'Bedrooms',
  rating:'Rating', pets_ok:'Pets', avg_next:'Avg. nightly (next 30 days)', your_dates:'Your dates', unavailable:'Not available', pick_this:'Choose {h}', parking:'Parking', reviews_n:'{n} reviews',
  host_title:'Hosted by {n}', host_years:'years hosting', host_rating:'rating', host_reviews:'reviews', top_host:'Top-rated host', step_trip:'Your trip', step_details:'Your details', step_pay:'Payment',
  continue:'Continue', back:'Back', full_name:'Full name', email:'Email', phone:'Phone', notes:'Anything we should know? (arrival time, occasion…)', agree:'I agree to the house rules and the Firm cancellation policy.',
  pay_btn:'Continue to secure payment', pending_t:'Payment setup pending', pending_b:'Online payment is being set up. No card was charged and nothing is booked yet. Your request summary is below — we’ll confirm availability with you directly.',
  demo:'Preview · payments not live yet', ok_t:'Request received', ok_b:'Thanks! Your card is authorized, not charged yet. When Manuel confirms your stay (usually within the hour) the charge goes through.', cancel_t:'Payment canceled', cancel_b:'No charge was made. Your dates aren’t held yet.',
  within:'≈ {d} mi from {h}', straight:'straight-line distance', dist_from:'Distances from', cancel_policy:'Cancellation', checkin_out:'Check-in after 4:00 PM · Checkout before 10:00 AM · Self check-in with smart lock',
  err_name:'Please enter your name', err_email:'Please enter a valid email', err_phone:'Please enter a phone number', err_agree:'Please accept the house rules', copy:'Copy summary', copied:'Copied ✓', change:'Change',
  nightly_detail:'Nightly prices', photos:'photos', home_tour:'Photo tour', all:'All' },
 es: { nav_homes:'Casas', nav_photos:'Fotos', nav_map:'Ubicación', nav_reviews:'Reseñas', nav_faq:'Preguntas', book_now:'Reservar', search:'Buscar',
  hero_title:'Casas locales, reserva directo.', hero_sub:'Casas completas en Bentonville y Springdale, con Manuel como anfitrión. Elige el pueblo, elige la casa y reserva directo con nosotros.',
  loc_all:'Todas', homes_in:'Casas en {c}', homes_all:'Casas en el noroeste de Arkansas', n_homes:'{n} casa', n_homes_p:'{n} casas', back_all:'Todas las casas', total_for:'total por {n} noches · con impuestos',
  not_for_dates:'No disponible en tus fechas', tax_detail:'Detalle de impuestos', taxes_incl:'Incluye impuestos de hospedaje de Arkansas ({p}%)', dates_hint:'Elige fechas para ver el total con impuestos',
  pol_title:'Política de cancelación: Firme', pol_full:'Reembolso total si cancelas al menos 30 días antes de la llegada.', pol_half:'Reembolso del 50% si cancelas entre 7 y 30 días antes de la llegada.', pol_none:'Sin reembolso si cancelas a menos de 7 días de la llegada.',
  pol_grace:'Reembolso total si cancelas dentro de las 48 horas después de reservar, siempre que falten al menos 14 días para la llegada.', pol_scope:'Los reembolsos cubren el monto total pagado (noches, limpieza e impuestos). La llegada es a las 4:00 PM hora del Centro.',
  pol_full_d:'Reembolso total hasta el {d}', pol_half_d:'Reembolso del 50% hasta el {d}', pol_none_d:'Sin reembolso después del {d}', pol_short:'Cancelación firme · reembolso total hasta el {d}', pol_short_nodate:'Cancelación firme · reembolso total hasta 30 días antes de la llegada', pol_short_half:'Cancelación firme · reembolso del 50% hasta el {d}', pol_short_none:'Cancelación firme · sin reembolso para estas fechas',
  ct:'hora del Centro', home:'Casa', check_in:'Llegada', check_out:'Salida', guests:'Huéspedes',
  check_avail:'Ver disponibilidad', choose_home:'Elige tu casa', your_trip:'Tu viaje', guests_sub:'Adultos y niños · máx. 10', pets:'Mascotas', pets_sub:'Hasta 2 · sin cargo', reserve:'Reservar',
  map_title:'Dónde te vas a quedar', reviews_title:'Lo que dicen los huéspedes', show_more:'Ver más reseñas', faq_title:'Preguntas frecuentes', night:'noche', nights:'noches',
  from:'desde', per_night:'/ noche', selected:'✓ Seleccionada', view_home:'Ver esta casa', show_all:'Ver todas las fotos', about:'Sobre esta casa', sleeping:'Dónde vas a dormir', amenities:'Lo que ofrece este lugar',
  show_all_amen:'Ver los {n} servicios', rules:'Reglas de la casa', ttk:'Bueno saber', read_more:'Leer más', read_less:'Ver menos', pick_in:'Elige tu fecha de llegada', pick_out:'Ahora elige tu fecha de salida',
  min_n:'Mínimo {n} noches desde esta fecha', not_avail:'Algunas noches de ese rango están ocupadas', no_co:'No se puede salir ese día', max_n:'Para más de {n} noches, escríbenos', ok_range:'{n} noches · toca Reservar cuando estés listo',
  cleaning:'Limpieza', extra_guests:'Huéspedes extra ({n} × {p}/noche)', total:'Total', taxes:'Impuestos', same_price:'Los mismos precios por noche y cargos que nuestro anuncio de Airbnb, reservando directo.', add_dates:'Elige fechas para ver precios',
  clear:'Borrar fechas', legend_min:'Mínimo 2 noches', legend_strike:'Ocupado', synced:'Precios y disponibilidad actualizados {t}', all_homes:'Ambas casas', sleeps:'Capacidad', beds:'Camas', baths:'Baños', bedrooms:'Habitaciones',
  rating:'Calificación', pets_ok:'Mascotas', avg_next:'Promedio por noche (próx. 30 días)', your_dates:'Tus fechas', unavailable:'No disponible', pick_this:'Elegir {h}', parking:'Estacionamiento', reviews_n:'{n} reseñas',
  host_title:'Anfitrión: {n}', host_years:'años como anfitrión', host_rating:'calificación', host_reviews:'reseñas', top_host:'Anfitrión mejor calificado', step_trip:'Tu viaje', step_details:'Tus datos', step_pay:'Pago',
  continue:'Continuar', back:'Atrás', full_name:'Nombre completo', email:'Correo', phone:'Teléfono', notes:'¿Algo que debamos saber? (hora de llegada, ocasión…)', agree:'Acepto las reglas de la casa y la política de cancelación firme.',
  pay_btn:'Continuar al pago seguro', pending_t:'Pago en configuración', pending_b:'Estamos configurando el pago en línea. No se cobró nada y aún no hay reserva. Abajo está el resumen de tu solicitud; te confirmaremos la disponibilidad directamente.',
  demo:'Vista previa · pagos aún no activos', ok_t:'Solicitud recibida', ok_b:'¡Gracias! Tu tarjeta quedó autorizada, todavía sin cobro. Cuando Manuel confirme tu estadía (normalmente en menos de una hora) se hace el cobro.', cancel_t:'Pago cancelado', cancel_b:'No se hizo ningún cobro. Tus fechas aún no están apartadas.',
  within:'≈ {d} mi de {h}', straight:'distancia en línea recta', dist_from:'Distancias desde', cancel_policy:'Cancelación', checkin_out:'Llegada después de las 4:00 PM · Salida antes de las 10:00 AM · Entrada autónoma con cerradura inteligente',
  err_name:'Escribe tu nombre', err_email:'Escribe un correo válido', err_phone:'Escribe un teléfono', err_agree:'Acepta las reglas de la casa', copy:'Copiar resumen', copied:'Copiado ✓', change:'Cambiar',
  nightly_detail:'Precio por noche', photos:'fotos', home_tour:'Recorrido de fotos', all:'Todas' }
};
const ROOM_ES = { 'Living room':'Sala', 'Full kitchen':'Cocina', 'Kitchenette':'Cocina', 'Dining area':'Comedor', 'Bedroom 1':'Habitación 1', 'Bedroom 2':'Habitación 2', 'Bedroom 3':'Habitación 3', 'Full bathroom 1':'Baño 1',
  'Full bathroom 2':'Baño 2', 'Backyard':'Patio', 'Front yard':'Frente', 'Exterior':'Exterior', 'Office':'Oficina', 'Workspace':'Área de trabajo', 'Laundry area':'Lavandería', 'Garage':'Garaje', 'Additional photos':'Más fotos' };
let LANG = localStorage.getItem('lang') || ((navigator.language || '').startsWith('es') ? 'es' : 'en');
const t = (k, v = {}) => (T[LANG][k] || T.en[k] || k).replace(/\{(\w+)\}/g, (_, x) => v[x]);
const room = r => LANG === 'es' ? (ROOM_ES[r] || r) : r;

/* ---------- state ---------- */
let HOMES = {}, RATES = null, GREEN = null;
const S = { view: 'index', loc: 'all', home: CFG.homes_order[0], ci: null, co: null, guests: 2, pets: 0, monthOff: 0, picking: 'ci', hover: null, revShown: 6 };
const locOf = slug => (HOMES[slug].city || '').toLowerCase();
const homesIn = loc => CFG.homes_order.filter(s => HOMES[s] && (loc === 'all' || locOf(s) === loc));
const locName = id => (CFG.locations.find(l => l.id === id) || {}).name || id;
const H = () => HOMES[S.home];
const DAYS = slug => (RATES && RATES.homes[slug] && RATES.homes[slug].days) || {};

/* ---------- pricing (mirrors Airbnb's total exactly: nights + $150 cleaning + extra-guest fee) ---------- */
// Airbnb's exact stay total (totals[ci][n-1]) wins over the nightly sum; lines scaled in cents (same as backend).
function fitLines(lines, target) {
  const pc = lines.map(l => Math.round(l[1] * 100)), sc = pc.reduce((a, b) => a + b, 0), tc = Math.round(target * 100);
  if (!sc) return target; let acc = 0;
  pc.forEach((c, i) => { const v = i === pc.length - 1 ? tc - acc : Math.floor(c * tc / sc + 0.5); acc += v; lines[i][1] = v / 100; });
  return tc / 100;
}
function quote(slug, ci, co, guests) {
  const days = DAYS(slug), R = RATES.homes[slug], eg = R.extra_guest || { after: 10, per_night: 0 };
  const n = nightsBetween(ci, co); const lines = []; let sub = 0;
  for (let i = 0; i < n; i++) { const d = addDays(ci, i), v = days[d]; if (!v || !v.a || v.p == null) return { ok: false, err: 'not_avail' }; lines.push([d, v.p]); sub += v.p; }
  const first = days[ci];
  if (!first.ci) return { ok: false, err: 'not_avail' };
  if (n < (first.mn || 1)) return { ok: false, err: 'min_n', mn: first.mn };
  if (n > CFG.max_nights) return { ok: false, err: 'max_n' };
  if (days[co] && days[co].co === false) return { ok: false, err: 'no_co' };
  const exT = R.totals && R.totals[ci] && R.totals[ci][n - 1];
  if (exT != null) sub = fitLines(lines, exT - RATES.cleaning_fee);
  const extraN = Math.max(0, guests - eg.after), extra = extraN * eg.per_night * n;
  const cleaning = RATES.cleaning_fee, base = Math.round(sub * 100) + Math.round(extra * 100) + Math.round(cleaning * 100), tx = taxes(slug, base);
  return { ok: true, n, lines, sub: +sub.toFixed(2), extraN, extraRate: eg.per_night, extra: +extra.toFixed(2), cleaning, taxable: base / 100, taxBp: tx.bp, taxLines: tx.lines, tax: tx.cents / 100, total: (base + tx.cents) / 100 };
}
// Arkansas lodging taxes (rates.taxes[slug]); each component rounded half-up in cents — identical to backend/quote.js.
function taxes(slug, cents) {
  const c = ((RATES.taxes || {})[slug] || {}).components || [];
  const lines = c.map(x => ({ name: LANG === 'es' ? (x.name_es || x.name) : x.name, bp: x.bp, amount: Math.floor(cents * x.bp / 10000 + 0.5) / 100 }));
  return { bp: c.reduce((a, x) => a + x.bp, 0), cents: lines.reduce((a, l) => a + Math.round(l.amount * 100), 0), lines };
}
const taxPct = slug => (((RATES.taxes || {})[slug] || {}).bp || 0) / 100;
/* ---------- Firm cancellation: deadlines for a check-in date (backend/quote.js refundFor does the money) ---------- */
function policyDates(ci) {
  const P = CFG.cancellation, f = n => { const d = parse(addDays(ci, -n)); return d.toLocaleDateString(LANG === 'es' ? 'es-US' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) + (LANG === 'es' ? ', 4:00 PM ' : ', 4:00 PM ') + t('ct'); };
  return { full: f(P.full_days), half: f(P.half_days), fullPast: addDays(ci, -P.full_days) < TODAY };
}
function policyHtml(ci) {
  const d = ci ? policyDates(ci) : null;
  return `<div class="policy"><b>${t('pol_title')}</b><ul>
    <li class="g"><span>${t('pol_full')}</span>${d && !d.fullPast ? `<small>${t('pol_full_d', { d: d.full })}</small>` : ''}</li>
    <li class="y"><span>${t('pol_half')}</span>${d ? `<small>${t('pol_half_d', { d: d.half })}</small>` : ''}</li>
    <li class="r"><span>${t('pol_none')}</span>${d ? `<small>${t('pol_none_d', { d: d.half })}</small>` : ''}</li>
    <li class="g"><span>${t('pol_grace')}</span></li></ul><p class="fine">${t('pol_scope')}</p></div>`;
}
const policyShort = ci => { if (!ci) return t('pol_short_nodate'); const d = policyDates(ci);
  return !d.fullPast ? t('pol_short', { d: d.full }) : addDays(ci, -CFG.cancellation.half_days) >= TODAY ? t('pol_short_half', { d: d.half }) : t('pol_short_none'); };
function fromPrice(slug, span = 60) {
  const ps = []; for (let i = 0; i < span; i++) { const v = DAYS(slug)[addDays(TODAY, i)]; if (v && v.a && v.p != null) ps.push(v.p); }
  return ps.length ? { min: Math.min(...ps), avg: ps.reduce((a, b) => a + b, 0) / ps.length } : null;
}

/* ---------- render: chrome ---------- */
function applyLang() {
  document.documentElement.lang = LANG;
  $$('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  $$('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
  const tag = LANG === 'es' ? CFG.tagline_es : CFG.tagline_en;
  $('#heroTitle').textContent = t('hero_title'); $('#heroEyebrow').textContent = CFG.brand + ' · ' + tag;
  $$('.brand-name').forEach(e => e.textContent = CFG.brand); $$('.brand-tag').forEach(e => e.textContent = tag); $('#logoMark').textContent = CFG.brand_mark || CFG.brand[0];
  renderAll();
}
function renderAll() { renderNav(); renderTitle(); if (S.view === 'index') { renderHeroSearch(); renderFilter(); renderListings(); }
  else { renderCrumbs(); renderDetail(); renderBook(); renderMapSide(); renderReviews(); renderHost(); } renderFAQ(); renderFresh(); }
function renderTitle() { const tag = LANG === 'es' ? CFG.tagline_es : CFG.tagline_en;
  document.title = S.view === 'listing' ? `${H().name} · ${H().city}, AR · ${CFG.brand}` : `${CFG.brand} · ${S.loc === 'all' ? tag : locName(S.loc) + ', AR'}`; }
function renderNav() {
  const items = S.view === 'index' ? [['#homes', 'nav_homes'], ['#faq', 'nav_faq']] : [['#detail', 'nav_photos'], ['#map', 'nav_map'], ['#reviews', 'nav_reviews'], ['#faq', 'nav_faq']];
  $('#nav').innerHTML = items.map(([h, k]) => `<a href="${h}">${t(k)}</a>`).join('');
  $('#topCta').setAttribute('href', S.view === 'index' ? '#homes' : '#book');
}

let MOSAIC_KEY = '';
function renderMosaic() {
  const slugs = homesIn(S.loc), key = slugs.join(); if (key === MOSAIC_KEY) return; MOSAIC_KEY = key;
  const pics = slugs.length === 1 ? [0, 1, 2, 6, 3].map(i => HOMES[slugs[0]].photos[i] || HOMES[slugs[0]].photos[0])
    : [HOMES.bentonville.photos[0], HOMES.springdale.photos[0], HOMES.bentonville.photos[1], HOMES.springdale.photos[6] || HOMES.springdale.photos[1], HOMES.bentonville.photos[2]];
  const box = $('#heroMosaic'); box.innerHTML = pics.slice(0, 5).map(p => `<div style="background-image:url('${p.src}')"></div>`).join('');
  $$('div', box).forEach((d, i) => setTimeout(() => d.classList.add('in'), 60 + i * 120));
}
function renderFilter() {
  const opts = [['all', t('loc_all')], ...CFG.locations.map(l => [l.id, l.name])];
  $('#locFilter').innerHTML = opts.map(([id, n]) => `<button role="tab" aria-selected="${S.loc === id}" class="${S.loc === id ? 'on' : ''}" data-loc="${id}">${id === 'all' ? '' : '📍 '}${esc(n)}<small>${homesIn(id).length}</small></button>`).join('');
  renderMosaic();
}
function renderHeroSearch() {
  $('#hsGuests').innerHTML = Array.from({ length: 10 }, (_, i) => `<option ${i + 1 === S.guests ? 'selected' : ''}>${i + 1}</option>`).join('');
  $('#hsIn').min = TODAY; $('#hsOut').min = addDays(TODAY, 1);
  if (S.ci) $('#hsIn').value = S.ci; if (S.co) $('#hsOut').value = S.co;
}
function listingHref(s) { const p = new URLSearchParams(); p.set('home', s); if (S.ci) p.set('in', S.ci); if (S.co) p.set('out', S.co); if (S.guests !== 2) p.set('guests', S.guests); return '?' + p; }
function renderListings() {
  const slugs = homesIn(S.loc);
  $('#listTitle').textContent = S.loc === 'all' ? t('homes_all') : t('homes_in', { c: locName(S.loc) });
  $('#listSub').textContent = (slugs.length === 1 ? t('n_homes', { n: 1 }) : t('n_homes_p', { n: slugs.length })) + (S.ci && S.co ? ` · ${fmtD(S.ci)} – ${fmtD(S.co)} · ${S.guests} ${t('guests').toLowerCase()}` : '');
  $('#listCards').innerHTML = slugs.map(s => {
    const h = HOMES[s], fp = fromPrice(s), r = h.rating, q = S.ci && S.co ? quote(s, S.ci, S.co, S.guests) : null;
    const price = q ? (q.ok ? `<b>${money2(q.total)}</b> <span>${t('total_for', { n: q.n })}</span>` : `<span class="na">${t('not_for_dates')}</span>`)
      : fp ? `${t('from')} <b>${money(fp.min)}</b> <span>${t('per_night')}</span>` : '';
    const pics = [0, 1, 2, 3, 4].map(i => h.photos[i]).filter(Boolean);
    return `<article class="lcard"><div class="lc-photos"><div class="lc-strip">${pics.map((p, i) => `<a href="${listingHref(s)}" data-home="${s}" style="background-image:url('${i ? p.thumb.replace('-s.jpg', '.jpg') : p.src}')" aria-label="${esc(h.name)}"></a>`).join('')}</div>
      <button class="lc-nav prev" data-scroll="-1" aria-label="Previous photo">‹</button><button class="lc-nav next" data-scroll="1" aria-label="Next photo">›</button>
      <span class="badge"><span class="star">★</span> ${r.overall} · ${t('reviews_n', { n: r.count })}</span><span class="loc-tag">📍 ${esc(h.city)}, AR</span></div>
      <a class="lc-body" href="${listingHref(s)}" data-home="${s}"><h3>${esc(h.name)}</h3><div class="meta">${h.overview.map(esc).join(' · ')}</div>
      <div class="hl1">${esc((h.highlights[0] || {}).title || '')}</div>
      <div class="row"><div class="from">${price}</div><span class="go">${t('view_home')} →</span></div></a></article>`;
  }).join('');
}
function renderCrumbs() {
  const h = H(), loc = locOf(S.home);
  $('#crumbs').innerHTML = `<a href="./" data-nav="index" class="link">← ${t('back_all')}</a><span>/</span><a href="?loc=${loc}" data-nav="index" data-navloc="${loc}" class="link">${esc(locName(loc))}</a><span>/</span><b>${esc(h.name)}</b>`;
}
/* ---------- detail ---------- */
const AMEN_IC = [['wifi', '📶'], ['tv', '📺'], ['kitchen', '🍳'], ['washer', '🧺'], ['dryer', '🌀'], ['parking', '🚗'], ['air', '❄️'], ['heat', '🔥'], ['fireplace', '🔥'], ['workspace', '💻'], ['pet', '🐾'], ['grill', '🍖'], ['bbq', '🍖'], ['coffee', '☕'],
  ['smoke', '🚨'], ['carbon', '🚨'], ['camera', '📹'], ['lock', '🔐'], ['self', '🔑'], ['bath', '🛁'], ['hair', '💨'], ['ping', '🏓'], ['game', '🎮'], ['book', '📚'], ['baby', '👶'], ['outdoor', '🪑'], ['backyard', '🌳'], ['microwave', '🍲'],
  ['dish', '🍽️'], ['refrigerator', '🧊'], ['freezer', '🧊'], ['oven', '🍞'], ['stove', '🍳'], ['first aid', '🩹'], ['extinguisher', '🧯'], ['iron', '👔'], ['linen', '🛏️'], ['pillow', '🛏️'], ['hanger', '👕'], ['fan', '🌬️'], ['luggage', '🧳'], ['long term', '🗓️'], ['entrance', '🚪'], ['housekeeping', '🧹']];
const amenIcon = s => { s = s.toLowerCase(); const m = AMEN_IC.find(([k]) => s.includes(k)); return m ? m[1] : '✓'; };
const RULE_IC = { HOUSE_RULES_PERSON_CAPACITY: '👥', HOUSE_RULES_PETS: '🐾', HOUSE_RULES_SMOKING_ALLOWED: '🚭', HOUSE_RULES_QUIET_HOURS: '🌙', HOUSE_RULES_EVENTS_ALLOWED: '🎉', HOUSE_RULES_COMMERCIAL_PHOTOGRAPHY_ALLOWED: '📷' };
const HL_IC = ['📍', '🏡', '💬'];

function renderDetail() {
  const h = H();
  const ph = h.photos;
  $('#gallery').innerHTML = ph.slice(0, 5).map((p, i) => `<button data-lb="${i}" style="background-image:url('${i ? p.thumb.replace('-s.jpg', '.jpg') : p.src}')" aria-label="${esc(room(p.room || ''))}"></button>`).join('') +
    `<button class="all" data-lb="0">▦ ${t('show_all')} · ${ph.length}</button>`;
  const rooms = [...new Set(ph.map(p => p.room).filter(Boolean))];
  $('#dHead').innerHTML = `<h2>${esc(h.title)}</h2><div class="sub">${esc(h.city)}, Arkansas · <span class="star">★</span> <b>${h.rating.overall}</b> · <a href="#reviews" class="link">${t('reviews_n', { n: h.rating.count })}</a></div>
    <div class="ov">${h.overview.map(o => `<span class="pill">${esc(o)}</span>`).join('')}</div>
    <div class="room-chips" aria-label="${t('home_tour')}">${rooms.map(r => `<button class="chip" data-room="${esc(r)}">${esc(room(r))}</button>`).join('')}</div>`;
  $('#dHighlights').innerHTML = h.highlights.map((x, i) => `<div class="hl"><div class="ic">${HL_IC[i] || '✨'}</div><div><b>${esc(x.title)}</b><span>${esc(x.body)}</span></div></div>`).join('');
  $('#dDesc').innerHTML = `<h3>${t('about')}</h3><div class="clamp" id="descBody">${h.description.map(b => (b.title ? `<h4>${esc(b.title)}</h4>` : '') + b.paras.map(p => `<p>${esc(p)}</p>`).join('')).join('')}</div>
    <button class="link" id="descMore">${t('read_more')}</button>`;
  const roomsHtml = h.rooms.length ? `<div class="rooms">${h.rooms.map(r => `<div class="room"><div class="ph" style="background-image:url('${r.img}')"></div><div class="t"><b>${esc(room(r.name))}</b><span>${esc(r.beds)}</span></div></div>`).join('')}</div>`
    : `<div class="rooms">${['Bedroom 1', 'Bedroom 2', 'Bedroom 3'].map(n => { const p = ph.find(x => x.room === n); return p ? `<div class="room" data-room="${n}" style="cursor:pointer"><div class="ph" style="background-image:url('${p.thumb}')"></div><div class="t"><b>${esc(room(n))}</b><span>${ph.filter(x => x.room === n).length} ${t('photos')}</span></div></div>` : ''; }).join('')}</div>
       <p class="fine">${esc(h.overview.find(o => /beds/.test(o)) || '')} — 2 fulls, 3 queens (from the listing).</p>`;
  $('#dRooms').innerHTML = `<h3>${t('sleeping')}</h3>${roomsHtml}`;
  const all = h.amenities.flatMap(g => g.items.map(i => ({ ...i, no: g.group === 'Not included' || i.available === false })));
  const top = all.filter(a => !a.no).slice(0, 10);
  $('#dAmen').innerHTML = `<h3>${t('amenities')}</h3><div class="amen">${top.map(a => `<div><i>${amenIcon(a.title)}</i>${esc(a.title)}</div>`).join('')}</div>
    <p><button class="btn btn-ghost btn-sm" id="amenAll" style="margin-top:16px">${t('show_all_amen', { n: all.length })}</button></p>`;
  const pk = h.slug === 'bentonville' ? `<div class="note">🚗 <b>${t('parking')}:</b> ${LANG === 'es' ? 'Estacionamiento gratis en la propiedad. Para grupos de 5 o más te enviamos indicaciones de estacionamiento en la entrada antes de tu llegada.' : 'Free parking on the property. Groups of 5+ get driveway parking directions from us before arrival.'}</div>`
    : `<div class="note">🚗 <b>${t('parking')}:</b> ${LANG === 'es' ? 'Estacionamiento grande de grava con espacio para varios vehículos. Hay dos casas en la propiedad: te quedas en la segunda, detrás de la del frente.' : 'Large gravel lot with room for multiple vehicles. There are two houses on the property — you stay in the second house behind the front one.'}</div>`;
  $('#dRules').innerHTML = `<h3>${t('rules')}</h3><div class="rules">${h.rules.map(r => `<div><span>${RULE_IC[r.type] || '•'}</span><div>${esc(r.title)}${r.detail ? `<small>${esc(r.detail)}</small>` : ''}</div></div>`).join('')}
    <div><span>🕓</span><div>${t('checkin_out')}</div></div>
    <div><span>🛡️</span><div>${h.safety.map(esc).join(' · ')}</div></div>
    </div>${pk}<div class="block-sub" id="policyBox">${policyHtml(S.ci)}</div>`;
}

/* ---------- calendar ---------- */
function dayState(d) { return DAYS(S.home)[d]; }
function canCheckIn(d) { const v = dayState(d); return v && v.a && v.ci && v.p != null && d >= TODAY; }
function rangeOk(ci, co) { return quote(S.home, ci, co, S.guests); }
function renderCal() {
  const box = $('#cal'); const months = window.innerWidth >= 1280 && false ? 2 : 1;
  const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + S.monthOff);
  const maxOff = 11; const locale = LANG === 'es' ? 'es-US' : 'en-US';
  let html = `<div class="cal-head"><button id="calPrev" ${S.monthOff <= 0 ? 'disabled' : ''} aria-label="prev">‹</button><b>${base.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</b><button id="calNext" ${S.monthOff >= maxOff ? 'disabled' : ''} aria-label="next">›</button></div><div class="cal-months">`;
  for (let m = 0; m < months; m++) {
    const first = new Date(base.getFullYear(), base.getMonth() + m, 1); const dim = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    html += '<div class="cal-grid">' + [0, 1, 2, 3, 4, 5, 6].map(i => `<div class="dow">${new Date(2026, 1, 1 + i).toLocaleDateString(locale, { weekday: 'narrow' })}</div>`).join('');
    html += '<div></div>'.repeat(first.getDay());
    const end = S.co || (S.ci && S.hover && S.hover > S.ci ? S.hover : null);
    for (let i = 1; i <= dim; i++) {
      const d = iso(new Date(first.getFullYear(), first.getMonth(), i)); const v = dayState(d) || {};
      let cls = 'day', dis = false, coOnly = false;
      if (d < TODAY) dis = true;
      else if (S.picking === 'co' && S.ci && !S.co) {
        if (d <= S.ci) dis = !canCheckIn(d); else { const q = rangeOk(S.ci, d); dis = !q.ok && q.err !== 'min_n'; if (q.err === 'min_n') cls += ' soft'; coOnly = !dis && !(v.a); }
      } else dis = !canCheckIn(d) && !(v.co && d === S.co);
      if (d === TODAY) cls += ' today';
      if ((v.mn || 1) > 1 && canCheckIn(d)) cls += ' mn2';
      if (S.ci === d) cls += ' start'; if (end === d) cls += ' end';
      if (S.ci && end && d > S.ci && d < end) cls += ' inrange';
      if (coOnly) cls += ' co-only';
      const price = v.a && v.p != null ? money(v.p + Math.max(0, S.guests - ((RATES.homes[S.home].extra_guest || {}).after || 10)) * ((RATES.homes[S.home].extra_guest || {}).per_night || 0)) : '';
      html += `<button class="${cls}" data-d="${d}" ${dis ? 'disabled' : ''}>${i}<small>${price || '&nbsp;'}</small></button>`;
    }
    html += '</div>';
  }
  html += `</div><div class="cal-legend"><span><i></i>${t('legend_min')}</span><span><s>12</s> ${t('legend_strike')}</span>${S.ci ? `<button class="link" id="calClear">${t('clear')}</button>` : ''}</div>`;
  box.innerHTML = html;
}
function calHint(msg, err) { const e = $('#calHint'); e.textContent = msg; e.classList.toggle('err', !!err); }
function onDay(d) {
  if (S.picking === 'ci' || !S.ci || S.co || d <= S.ci) {
    if (!canCheckIn(d)) return;
    S.ci = d; S.co = null; S.picking = 'co'; const mn = dayState(d).mn || 1;
    calHint(mn > 1 ? t('min_n', { n: mn }) : t('pick_out'));
  } else {
    const q = rangeOk(S.ci, d);
    if (!q.ok) { calHint(t(q.err, { n: q.err === 'min_n' ? q.mn : CFG.max_nights }), true); return; }
    S.co = d; S.picking = 'ci'; calHint(t('ok_range', { n: q.n }));
  }
  syncUrl(); renderBook();
}

/* ---------- booking card ---------- */
const fmtD = d => d ? parse(d).toLocaleDateString(LANG === 'es' ? 'es-US' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '—';
function breakdownHtml(q, slug) {
  const n = q.n, avg = q.sub / n;
  return `<div class="ln"><u title="${t('nightly_detail')}" id="nightsToggle">${money2(avg)} × ${n} ${n === 1 ? t('night') : t('nights')}</u><span>${money2(q.sub)}</span></div>
    <div class="nights-pop" id="nightsPop" hidden>${q.lines.map(([d, p]) => `<span>${fmtD(d)}</span><span>${money2(p)}</span>`).join('')}</div>
    ${q.extra ? `<div class="ln"><span>${t('extra_guests', { n: q.extraN, p: money(q.extraRate) })}</span><span>${money2(q.extra)}</span></div>` : ''}
    <div class="ln"><span>${t('cleaning')}</span><span>${money2(q.cleaning)}</span></div>
    ${q.tax ? `<div class="ln"><u title="${t('tax_detail')}" class="taxToggle">${t('taxes')} (${+(q.taxBp / 100).toFixed(2)}%)</u><span>${money2(q.tax)}</span></div>
    <div class="nights-pop tax-pop" hidden>${q.taxLines.map(l => `<span>${esc(l.name)} · ${+(l.bp / 100).toFixed(2)}%</span><span>${money2(l.amount)}</span>`).join('')}<span class="fine" style="grid-column:span 2;margin:4px 0 0">${LANG === 'es' ? 'Sobre noches, huéspedes extra y limpieza' : 'On nights, extra guests and cleaning'} (${money2(q.taxable)})</span></div>` : ''}
    <div class="ln tot"><span>${t('total')}</span><span>${money2(q.total)}</span></div>
    <div class="save">✓ ${t('same_price')}</div>`;
}
function renderBook() {
  const h = H(), fp = fromPrice(S.home);
  const q = S.ci && S.co ? quote(S.home, S.ci, S.co, S.guests) : null;
  $('#bkPrice').innerHTML = q && q.ok ? `<b>${money2(q.total)}</b><span>${t('total')} · ${q.n} ${t('nights')} · ${esc(h.name)}</span>` : fp ? `<b>${money(fp.min)}</b><span>${t('from')} ${t('per_night')} · ${esc(h.name)}</span>` : '';
  $('#bkIn b').textContent = fmtD(S.ci); $('#bkOut b').textContent = fmtD(S.co);
  $('#bkIn').classList.toggle('active', S.picking === 'ci'); $('#bkOut').classList.toggle('active', S.picking === 'co');
  $('#gCount').textContent = S.guests; $('#pCount').textContent = S.pets;
  $$('.stepper button').forEach(b => { const k = b.dataset.k, s = +b.dataset.step; b.disabled = k === 'guests' ? (S.guests + s < 1 || S.guests + s > 10) : (S.pets + s < 0 || S.pets + s > 2); });
  renderCal();
  $('#breakdown').innerHTML = q && q.ok ? breakdownHtml(q, S.home) : `<p class="fine" style="text-align:center">${t('add_dates')}</p>`;
  $('#reserveBtn').disabled = !(q && q.ok);
  $('#reserveBtn').textContent = q && q.ok ? t('reserve') : t('check_avail');
  $('#bkFine').innerHTML = `${esc(policyShort(S.ci && S.co ? S.ci : null))} · <a href="#policyBox" class="link">${LANG === 'es' ? 'detalles' : 'details'}</a>`;
  const pb = $('#policyBox'); if (pb) pb.innerHTML = policyHtml(S.ci && S.co ? S.ci : null);
  if (!S.ci) calHint(t('pick_in'));
  $('#mbarPrice').innerHTML = q && q.ok ? `<b>${money2(q.total)}</b><small>${fmtD(S.ci)} – ${fmtD(S.co)} · ${esc(h.name)}</small>` : fp ? `<b>${money(fp.min)}</b> <span class="fine">${t('per_night')}</span><small>${esc(h.name)} · ${esc(h.city)}</small>` : '';
  $('#mbarBtn').textContent = q && q.ok ? t('reserve') : t('check_avail');
}

/* ---------- map ---------- */
function miles(h, p) { if (p.kind === 'trail' && GREEN) return Math.min(...GREEN.lines.flat().map(q => milesRaw(h, { lat: q[0], lng: q[1] }))); return milesRaw(h, p); }
function milesRaw(h, p) { const R = 3958.8, r = x => x * Math.PI / 180; const dl = r(p.lat - h.lat), dn = r(p.lng - h.lng);
  const a = Math.sin(dl / 2) ** 2 + Math.cos(r(h.lat)) * Math.cos(r(p.lat)) * Math.sin(dn / 2) ** 2; return Math.round(2 * R * Math.asin(Math.sqrt(a)) * 10) / 10; }
let MAP, HOME_MK = {}, POI_MK = {};
const POI_IC = { art: '🎨', town: '🏛️', work: '🏢', trail: '🚲' };
function initMap() {
  if (MAP) { MAP.remove(); MAP = null; HOME_MK = {}; POI_MK = {}; }
  const h = H(), s = S.home;
  MAP = L.map('leaflet', { scrollWheelZoom: false, zoomControl: true }).setView([h.lat, h.lng], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, className: 'tiles-soft', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(MAP);
  if (GREEN) L.polyline(GREEN.lines.map(l => l.map(p => [p[0], p[1]])), { color: '#2f7d4f', weight: 4, opacity: .75 }).bindTooltip('Razorback Regional Greenway', { sticky: true }).addTo(MAP);
  HOME_MK[s] = L.marker([h.lat, h.lng], { icon: L.divIcon({ className: '', html: `<div class="mk"><span>${esc(h.name[0])}</span></div>`, iconSize: [42, 42], iconAnchor: [21, 42] }) })
    .addTo(MAP).bindPopup(`<b>${esc(h.name)}</b><br>${esc(h.city)} · ${esc(h.overview[0])}`);
  const near = CFG.pois.filter(p => miles(h, p) <= 15);
  near.forEach(p => { POI_MK[p.id] = L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: `<div class="pk">${POI_IC[p.kind]}</div>`, iconSize: [30, 30], iconAnchor: [15, 15] }) })
    .addTo(MAP).bindPopup(`<b>${esc(LANG === 'es' ? p.name_es : p.name)}</b><br>${t('within', { d: miles(h, p), h: h.name })}`); });
  MAP.fitBounds(L.latLngBounds([[h.lat, h.lng], ...near.filter(p => miles(h, p) <= 8).map(p => [p.lat, p.lng])]), { padding: [50, 50], maxZoom: 14 });
}
function renderMapSide() {
  const h = H();
  $('#mapSide').innerHTML = `<div class="fine" style="margin:0 0 4px">${t('dist_from')} <b>${esc(h.name)}</b> · ${esc(h.city)}</div>` +
    CFG.pois.filter(p => POI_MK[p.id] || !MAP).map(p => ({ p, d: miles(h, p) })).sort((x, y) => x.d - y.d).map(({ p, d }) => `<button class="poi" data-poi="${p.id}"><div><b>${POI_IC[p.kind]} ${esc(LANG === 'es' ? p.name_es : p.name)}</b><small>${p.kind === 'trail' ? (LANG === 'es' ? 'Al punto más cercano del sendero (en verde)' : 'To the nearest point of the trail (in green)') : t('straight')}</small></div><span class="d">≈ ${d} mi</span></button>`).join('') +
    `<p class="fine">${h.exact_location ? '' : (LANG === 'es' ? 'Ubicación aproximada; la dirección exacta se comparte al reservar.' : 'Approximate location; exact address shared after booking.')}</p>`;
}

/* ---------- reviews ---------- */
function renderReviews() {
  S.revHome = S.home;
  const list = [S.home].flatMap(s => HOMES[s].reviews.map(r => ({ ...r, home: s }))).sort((a, b) => (b.rating || 5) - (a.rating || 5) || b.date.localeCompare(a.date));
  let sum;
  if (S.revHome === 'all') {
    const tot = CFG.homes_order.reduce((a, s) => a + HOMES[s].rating.count, 0), w = CFG.homes_order.reduce((a, s) => a + HOMES[s].rating.overall * HOMES[s].rating.count, 0) / tot;
    sum = `<div class="big-rate">★ ${w.toFixed(2)}<small>${t('reviews_n', { n: tot })} · ${t('all_homes').toLowerCase()}</small></div><div class="cats">${CFG.homes_order.map(s => `<div>${esc(HOMES[s].name)} · ★ ${HOMES[s].rating.overall}<div class="bar"><i style="width:${HOMES[s].rating.overall / 5 * 100}%"></i></div></div>`).join('')}</div>`;
  } else {
    const h = HOMES[S.revHome], c = h.rating.categories; const names = LANG === 'es' ? { cleanliness: 'Limpieza', accuracy: 'Exactitud', checkin: 'Llegada', communication: 'Comunicación', location: 'Ubicación', value: 'Calidad-precio' } : { cleanliness: 'Cleanliness', accuracy: 'Accuracy', checkin: 'Check-in', communication: 'Communication', location: 'Location', value: 'Value' };
    sum = `<div class="big-rate">★ ${h.rating.overall}<small>${t('reviews_n', { n: h.rating.count })}</small></div><div class="cats">${Object.entries(c).filter(([, v]) => v).map(([k, v]) => `<div>${names[k]} <b style="float:right">${(+v).toFixed(1)}</b><div class="bar"><i style="width:${v / 5 * 100}%"></i></div></div>`).join('')}</div>` +
      (h.review_tags.length ? `<div class="tags">${h.review_tags.map(x => `<span class="pill" title="${esc(x.summary || '')}">${esc(x.name)} · ${x.count}</span>`).join('')}</div>` : '');
  }
  $('#revSummary').innerHTML = sum;
  const locale = LANG === 'es' ? 'es-US' : 'en-US';
  $('#revGrid').innerHTML = list.slice(0, S.revShown).map(r => `<article class="rev"><div class="who"><div class="av">${esc(r.name[0])}</div><div><b>${esc(r.name)}</b><small>${parse(r.date).toLocaleDateString(locale, { month: 'long', year: 'numeric' })} · ${'★'.repeat(r.rating || 5)}</small></div></div><p>${esc(r.text)}</p>${S.revHome === 'all' ? `<div class="home">${esc(HOMES[r.home].name)}</div>` : ''}</article>`).join('');
  $('#revMore').hidden = list.length <= S.revShown;
}
function renderHost() {
  const h = HOMES[CFG.homes_order[0]].host;
  $('#hostSec').innerHTML = `<div class="host-card"><div class="av">${esc(h.name[0])}</div><div><div class="fine" style="color:#cfe0d5;margin:0">${h.superhost ? t('top_host') : ''}</div><h3>${t('host_title', { n: esc(h.name) })}</h3>
    <div class="stats"><div><b>★ ${h.rating}</b><span>${t('host_rating')}</span></div><div><b>${h.reviews}</b><span>${t('host_reviews')}</span></div><div><b>${h.years}</b><span>${t('host_years')}</span></div><div><b>⚡</b><span>${esc(h.response[1] || '')}</span></div></div>
    <p>${esc(h.about || '')}</p></div></div>`;
}
function renderFAQ() {
  const Q = LANG === 'es' ? [
    ['¿Por qué reservar directo?', 'Pagas los mismos precios por noche y cargos que en nuestro anuncio, tratas directamente con Manuel y tu pago se procesa de forma segura con Stripe.'],
    ['¿El precio es el mismo?', 'Sí. Usamos los mismos precios por noche, la misma tarifa de limpieza de $150 y el mismo cargo por huésped extra (a partir del 6.º huésped). Los precios se actualizan automáticamente varias veces al día.'],
    ['¿Qué impuestos se cobran?', 'Los impuestos de hospedaje de Arkansas, igual que en cualquier hotel o Airbnb: impuesto estatal (6.5%), impuesto de turismo (2%), impuesto del condado y de la ciudad, y el impuesto local de turismo (A&P, 2%). En total 13.5% en Bentonville y 13.75% en Springdale, sobre las noches y la limpieza. El desglose aparece antes de pagar.'],
    ['¿Cómo se confirma mi reserva?', 'Al pagar, tu tarjeta queda autorizada pero no cobrada. Manuel confirma la disponibilidad (normalmente en menos de una hora) y entonces se hace el cobro, aunque tu llegada sea dentro de meses. Si no puede confirmar, la autorización se libera y no se cobra nada.'],
    ['Llegada y salida', 'Llegada después de las 4:00 PM, salida antes de las 10:00 AM. Entrada autónoma con cerradura inteligente; el código se comparte antes de llegar.'],
    ['¿Política de cancelación?', [t('pol_full'), t('pol_half'), t('pol_none'), t('pol_grace'), t('pol_scope')].join(' ')],
    ['¿Se permiten mascotas?', 'Sí, hasta 2 mascotas en ambas casas.'],
    ['¿Dónde me estaciono?', 'Bentonville: estacionamiento gratis en la propiedad; para grupos de 5 o más enviamos indicaciones antes de llegar. Villa Nica: estacionamiento grande de grava.'],
    ['¿Estadías largas?', `Puedes reservar hasta ${CFG.max_nights} noches en línea. Para más tiempo, escríbenos.`]
  ] : [
    ['Why book direct?', 'You pay the same nightly prices and fees as our listing, deal directly with Manuel, and your payment is processed securely by Stripe.'],
    ['Is the price really the same?', 'Yes. We use the same nightly prices, the same $150 cleaning fee, and the same extra-guest charge (from the 6th guest). Prices refresh automatically several times a day.'],
    ['What taxes are charged?', 'Arkansas lodging taxes, the same ones any hotel or Airbnb collects: state sales tax (6.5%), state tourism tax (2%), county and city sales tax, and the local A&P tourism tax (2%). That is 13.5% in Bentonville and 13.75% in Springdale, on the nights and the cleaning fee. You see the breakdown before you pay.'],
    ['How is my booking confirmed?', 'When you pay, your card is authorized but not charged. Manuel confirms the dates (usually within the hour) and the charge goes through then, even if your stay is months away. If he can’t confirm, the hold is released and you are not charged.'],
    ['Check-in and checkout', 'Check-in after 4:00 PM, checkout before 10:00 AM. Self check-in with a smart lock — the code is shared before you arrive.'],
    ['Cancellation policy?', [t('pol_full'), t('pol_half'), t('pol_none'), t('pol_grace'), t('pol_scope')].join(' ')],
    ['Are pets allowed?', 'Yes — up to 2 pets at both homes.'],
    ['Where do we park?', 'Bentonville: free parking on the property; groups of 5+ get driveway directions before arrival. Villa Nica: a large gravel lot with room for several vehicles.'],
    ['Longer stays?', `You can book up to ${CFG.max_nights} nights online. For longer, just message us.`]
  ];
  $('#faqList').innerHTML = Q.map(([q, a]) => `<details class="qa"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
}
function renderFresh() {
  const at = RATES && RATES.homes[S.home].prices_at; if (!at) return;
  const d = new Date(at); const mins = Math.round((Date.now() - d) / 6e4);
  const rel = mins < 60 ? (LANG === 'es' ? `hace ${mins} min` : `${mins} min ago`) : mins < 2880 ? (LANG === 'es' ? `hace ${Math.round(mins / 60)} h` : `${Math.round(mins / 60)} h ago`) : d.toLocaleDateString();
  const av = new Date(RATES.generated_at);
  $('#freshness').textContent = t('synced', { t: rel }) + ' · ' + av.toLocaleString(LANG === 'es' ? 'es-US' : 'en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago', timeZoneName: 'short' });
  $('#footNote').innerHTML = `${esc(CFG.brand)} · ${esc(LANG === 'es' ? CFG.tagline_es : CFG.tagline_en)} · ${CFG.locations.map(l => esc(l.name)).join(' · ')}${CFG.contact_email ? ` · <a href="mailto:${esc(CFG.contact_email)}">${esc(CFG.contact_email)}</a>` : ''}`;
}

/* ---------- lightbox ---------- */
const LB = { list: [], i: 0, room: null };
function openLB(i, roomName) {
  const all = H().photos; LB.room = roomName || null; LB.list = LB.room ? all.filter(p => p.room === LB.room) : all; LB.i = Math.max(0, Math.min(i, LB.list.length - 1));
  const rooms = [...new Set(all.map(p => p.room).filter(Boolean))];
  $('#lbChips').innerHTML = `<button class="chip ${!LB.room ? 'on' : ''}" data-lbroom="">${t('all')} · ${all.length}</button>` + rooms.map(r => `<button class="chip ${LB.room === r ? 'on' : ''}" data-lbroom="${esc(r)}">${esc(room(r))}</button>`).join('');
  $('#lbStrip').innerHTML = LB.list.map((p, k) => `<img src="${p.thumb}" data-k="${k}" loading="lazy" alt="">`).join('');
  $('#lb').hidden = false; document.body.style.overflow = 'hidden'; showLB();
}
function showLB() {
  const p = LB.list[LB.i]; const img = $('#lbImg'); img.style.opacity = .3; img.onload = () => img.style.opacity = 1; img.src = p.src; img.alt = room(p.room || '');
  $('#lbCap').textContent = room(p.room || ''); $('#lbCount').textContent = `${LB.i + 1} / ${LB.list.length}`;
  $$('#lbStrip img').forEach((im, k) => im.classList.toggle('on', k === LB.i)); const on = $('#lbStrip img.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
  [LB.list[LB.i + 1], LB.list[LB.i - 1]].forEach(n => { if (n) new Image().src = n.src; });
}
const lbStep = s => { LB.i = (LB.i + s + LB.list.length) % LB.list.length; showLB(); };
const closeLB = () => { $('#lb').hidden = true; document.body.style.overflow = ''; };

/* ---------- booking flow ---------- */
const G = { name: '', email: '', phone: '', notes: '', agree: false };
function modal(html) { $('#modalBody').innerHTML = html; $('#modal').hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal() { $('#modal').hidden = true; document.body.style.overflow = ''; }
function steps(n) { return `<div class="steps">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`; }
function tripBox(q) { const h = H(); return `<div class="sumbox"><div class="t"><div style="background-image:url('${h.photos[0].thumb}')"></div><div><b>${esc(h.name)}</b><div class="fine" style="margin:0">${fmtD(S.ci)} – ${fmtD(S.co)} · ${S.guests} ${t('guests').toLowerCase()}${S.pets ? ` · ${S.pets} ${t('pets').toLowerCase()}` : ''}</div></div></div><div class="breakdown" style="margin:0">${breakdownHtml(q)}</div></div>`; }
function flowTrip() {
  const q = quote(S.home, S.ci, S.co, S.guests); if (!q.ok) return;
  modal(`${steps(1)}<h3>${t('step_trip')}</h3>${tripBox(q)}<p class="fine">${t('checkin_out')}</p>${policyHtml(S.ci)}
    <button class="btn btn-accent btn-block" data-flow="details">${t('continue')}</button>`);
}
function flowDetails(err) {
  modal(`${steps(2)}<h3>${t('step_details')}</h3><form class="form" id="gForm" novalidate>
    <label>${t('full_name')}<input name="name" autocomplete="name" value="${esc(G.name)}" required></label>
    <div class="two"><label>${t('email')}<input name="email" type="email" autocomplete="email" value="${esc(G.email)}" required></label>
    <label>${t('phone')}<input name="phone" type="tel" autocomplete="tel" value="${esc(G.phone)}" required></label></div>
    <label>${t('notes')}<textarea name="notes" rows="3">${esc(G.notes)}</textarea></label>
    <label class="chk"><input type="checkbox" name="agree" ${G.agree ? 'checked' : ''}> ${t('agree')}</label>
    ${err ? `<div class="cal-hint err">${esc(err)}</div>` : ''}
    <div class="two"><button type="button" class="btn btn-ghost" data-flow="trip">${t('back')}</button><button class="btn btn-accent" type="submit">${t('continue')}</button></div></form>`);
}
function readForm() { const f = $('#gForm'); Object.assign(G, { name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(), notes: f.notes.value.trim(), agree: f.agree.checked });
  if (G.name.length < 2) return t('err_name'); if (!/^\S+@\S+\.\S+$/.test(G.email)) return t('err_email'); if (G.phone.replace(/\D/g, '').length < 7) return t('err_phone'); if (!G.agree) return t('err_agree'); return null; }
function summaryText(q, rid) { const h = H(); return `${CFG.brand} — ${h.name} (${h.city})\n${S.ci} → ${S.co} · ${q.n} nights · ${S.guests} guests${S.pets ? ' · ' + S.pets + ' pets' : ''}\nTotal ${money2(q.total)} (nights ${money2(q.sub)}${q.extra ? ' + extra guests ' + money2(q.extra) : ''} + cleaning ${money2(q.cleaning)} + AR lodging taxes ${money2(q.tax)})\nFirm cancellation: full refund until ${addDays(S.ci, -CFG.cancellation.full_days)} 4 PM CT, 50% until ${addDays(S.ci, -CFG.cancellation.half_days)} 4 PM CT\n${G.name} · ${G.email} · ${G.phone}${G.notes ? '\n' + G.notes : ''}${rid ? '\nRef ' + rid : ''}`; }
async function flowPay() {
  const q = quote(S.home, S.ci, S.co, S.guests);
  modal(`${steps(3)}<h3>${t('step_pay')}</h3>${tripBox(q)}<button class="btn btn-accent btn-block" id="payGo">🔒 ${t('pay_btn')} · ${money2(q.total)}</button><p class="fine" style="text-align:center">${esc(policyShort(S.ci))}</p><p class="fine" style="text-align:center">Stripe · Visa · Mastercard · Amex · Apple Pay · Google Pay</p><button class="btn btn-ghost btn-block" data-flow="details" style="margin-top:8px">${t('back')}</button>`);
}
async function doPay() {
  const q = quote(S.home, S.ci, S.co, S.guests); const btn = $('#payGo'); btn.disabled = true; btn.textContent = '…';
  const body = { home: S.home, check_in: S.ci, check_out: S.co, guests: S.guests, pets: S.pets, quoted_total: q.total, lang: LANG, guest: { ...G }, return_url: location.origin + location.pathname };
  let res = null;
  if (CFG.api_base) { try { const r = await fetch(CFG.api_base.replace(/\/$/, '') + '/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); res = await r.json(); if (!r.ok) res = { error: res.error || 'error' }; } catch (e) { res = { error: String(e) }; } }
  if (res && res.url) { location.href = res.url; return; }
  if (res && res.error && !res.demo) { btn.disabled = false; btn.textContent = t('pay_btn'); modal(`<h3>⚠️</h3><p>${esc(res.error === 'not_available' ? t('not_avail') : res.error === 'price_changed' ? (LANG === 'es' ? 'El precio cambió; recarga la página.' : 'Prices just changed — please reload.') : res.error)}</p>`); return; }
  const rid = res && res.request_id;
  modal(`<div class="ok-ic" style="background:#fff7e9;color:#a56a12">⏳</div><h3>${t('pending_t')}</h3><div class="pending">${t('pending_b')}</div>${tripBox(q)}
    <pre id="sumTxt" style="white-space:pre-wrap;font:13px/1.5 ui-monospace,monospace;background:var(--bg);padding:12px;border-radius:12px">${esc(summaryText(q, rid))}</pre>
    <button class="btn btn-ghost btn-block" id="copySum">${t('copy')}</button>`);
}

/* ---------- views / URL ---------- */
// Two views on one page: index (?loc=) and a standalone listing (?home=slug). Old ?home= links keep working.
function fixDates() { if (S.ci && !canCheckIn(S.ci)) { S.ci = S.co = null; } if (S.ci && S.co && !quote(S.home, S.ci, S.co, S.guests).ok) S.co = null; S.picking = S.ci && !S.co ? 'co' : 'ci';
  if (S.ci) { const m = parse(S.ci), n = new Date(); S.monthOff = Math.max(0, (m.getFullYear() - n.getFullYear()) * 12 + m.getMonth() - n.getMonth()); } else S.monthOff = 0; }
function show(view, push) {
  S.view = view; document.body.dataset.view = view; closeSheet(); closeModal();
  if (view === 'listing') { S.revShown = 6; fixDates(); }
  if (push) history.pushState(null, '', urlFor()); else history.replaceState(null, '', urlFor() + location.hash);
  renderAll();
  if (view === 'listing') { initMap(); renderMapSide(); }
}
function openHome(s) { if (!HOMES[s]) return; S.home = s; show('listing', true); scrollTo(0, 0); }
function openIndex(loc) { if (loc) S.loc = loc; show('index', true); scrollTo(0, 0); }
function urlFor() { const p = new URLSearchParams(); if (S.view === 'listing') p.set('home', S.home); else if (S.loc !== 'all') p.set('loc', S.loc);
  if (S.ci) p.set('in', S.ci); if (S.co) p.set('out', S.co); if (S.guests !== 2) p.set('guests', S.guests); const q = p.toString(); return location.pathname + (q ? '?' + q : ''); }
function syncUrl() { history.replaceState(null, '', urlFor() + location.hash); }
function readUrl() { const p = new URLSearchParams(location.search);
  S.view = HOMES[p.get('home')] ? 'listing' : 'index'; if (S.view === 'listing') S.home = p.get('home');
  S.loc = CFG.locations.some(l => l.id === p.get('loc')) ? p.get('loc') : 'all';
  S.ci = p.get('in') || null; S.co = p.get('out') || null; if (+p.get('guests')) S.guests = Math.min(10, Math.max(1, +p.get('guests')));
  if (S.ci && !(S.ci >= TODAY)) S.ci = S.co = null;
  return p.get('booking'); }
const openSheet = () => { $('#book').classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeSheet = () => { $('#book').classList.remove('open'); document.body.style.overflow = ''; };

/* ---------- events ---------- */
function bind() {
  document.addEventListener('click', e => {
    const el = e.target.closest('button,a'); if (!el) { if (e.target.id === 'book') closeSheet(); if (e.target.id === 'modal') closeModal(); return; }
    if (el.dataset.lang) { LANG = el.dataset.lang; localStorage.setItem('lang', LANG); applyLang(); return; }
    if (el.dataset.home) { if (e.metaKey || e.ctrlKey) return; e.preventDefault(); openHome(el.dataset.home); return; }
    if (el.dataset.nav === 'index') { e.preventDefault(); openIndex(el.dataset.navloc || 'all'); return; }
    if (el.dataset.loc) { S.loc = el.dataset.loc; syncUrl(); renderAll(); return; }
    if (el.dataset.scroll) { const st = el.parentElement.querySelector('.lc-strip'); st.scrollBy({ left: +el.dataset.scroll * st.clientWidth, behavior: 'smooth' }); return; }
    if (el.dataset.lb != null) { openLB(+el.dataset.lb); return; }
    if (el.dataset.room || el.closest('[data-room]')) { openLB(0, (el.dataset.room || el.closest('[data-room]').dataset.room)); return; }
    if (el.dataset.lbroom != null) { openLB(0, el.dataset.lbroom || null); return; }
    if (el.dataset.k && el.closest('#lbStrip')) return;
    if (el.dataset.d) { onDay(el.dataset.d); return; }
    if (el.dataset.step) { const k = el.dataset.k; S[k] = Math.max(k === 'guests' ? 1 : 0, Math.min(k === 'guests' ? 10 : 2, S[k] + +el.dataset.step)); syncUrl(); renderBook(); return; }
    if (el.dataset.poi) { const m = POI_MK[el.dataset.poi]; MAP.flyTo(m.getLatLng(), 13, { duration: .8 }); setTimeout(() => m.openPopup(), 850); return; }
    if (el.dataset.flow) { ({ trip: flowTrip, details: () => flowDetails(), pay: flowPay })[el.dataset.flow](); return; }
    switch (el.id) {
      case 'calPrev': S.monthOff--; renderCal(); break; case 'calNext': S.monthOff++; renderCal(); break;
      case 'calClear': S.ci = S.co = null; S.picking = 'ci'; syncUrl(); renderBook(); break;
      case 'bkIn': S.picking = 'ci'; renderBook(); break; case 'bkOut': if (S.ci) { S.picking = 'co'; S.co = null; renderBook(); } break;
      case 'reserveBtn': if (!$('#reserveBtn').disabled) { closeSheet(); flowTrip(); } break;
      case 'mbarBtn': if (S.ci && S.co && quote(S.home, S.ci, S.co, S.guests).ok) flowTrip(); else openSheet(); break;
      case 'sheetClose': closeSheet(); break;
      case 'descMore': { const b = $('#descBody'); b.classList.toggle('clamp'); el.textContent = b.classList.contains('clamp') ? t('read_more') : t('read_less'); break; }
      case 'amenAll': { const h = H(); modal(`<h3>${t('amenities')}</h3>${h.amenities.map(g => `<h4 style="margin:18px 0 8px">${esc(g.group)}</h4><div class="amen" style="grid-template-columns:1fr">${g.items.map(a => `<div class="${g.group === 'Not included' ? 'no' : ''}"><i>${amenIcon(a.title)}</i>${esc(a.title)}</div>`).join('')}</div>`).join('')}`); break; }
      case 'revMore': S.revShown += 9; renderReviews(); break;
      case 'lbClose': closeLB(); break; case 'lbPrev': lbStep(-1); break; case 'lbNext': lbStep(1); break;
      case 'modalClose': closeModal(); break;
      case 'payGo': doPay(); break;
      case 'nightsToggle': break;
      case 'copySum': navigator.clipboard && navigator.clipboard.writeText($('#sumTxt').textContent).then(() => el.textContent = t('copied')); break;
    }
  });
  document.addEventListener('click', e => { if (e.target.id === 'nightsToggle') { const p = e.target.closest('.breakdown,#breakdown').querySelector('#nightsPop'); if (p) p.hidden = !p.hidden; }
    if (e.target.classList.contains('taxToggle')) { const p = e.target.parentElement.nextElementSibling; if (p) p.hidden = !p.hidden; } });
  addEventListener('popstate', () => { readUrl(); show(S.view, false); });
  $('#lbStrip').addEventListener('click', e => { const k = e.target.dataset && e.target.dataset.k; if (k != null) { LB.i = +k; showLB(); } });
  document.addEventListener('submit', e => {
    if (e.target.id === 'heroSearch') { e.preventDefault(); S.guests = +$('#hsGuests').value; const a = $('#hsIn').value, b = $('#hsOut').value;
      S.ci = a && a >= TODAY ? a : null; S.co = S.ci && b > S.ci ? b : null; syncUrl(); renderListings(); $('#homes').scrollIntoView({ behavior: 'smooth' }); }
    if (e.target.id === 'gForm') { e.preventDefault(); const err = readForm(); if (err) flowDetails(err); else flowPay(); }
  });
  $('#hsIn').addEventListener('change', e => { if (e.target.value) { $('#hsOut').min = addDays(e.target.value, 1); if (!$('#hsOut').value || $('#hsOut').value <= e.target.value) $('#hsOut').value = addDays(e.target.value, Math.max(2, (dayState(e.target.value) || {}).mn || 1)); } });
  $('#cal').addEventListener('mouseover', e => { const d = e.target.closest('.day'); if (d && S.picking === 'co' && S.ci && !S.co && d.dataset.d !== S.hover) { S.hover = d.dataset.d; $$('#cal .day').forEach(x => { const v = x.dataset.d; x.classList.toggle('inrange', v > S.ci && v < S.hover); x.classList.toggle('end', v === S.hover && v > S.ci); }); } });
  document.addEventListener('keydown', e => { if (!$('#lb').hidden) { if (e.key === 'ArrowRight') lbStep(1); if (e.key === 'ArrowLeft') lbStep(-1); if (e.key === 'Escape') closeLB(); } else if (e.key === 'Escape') { closeModal(); closeSheet(); } });
  let tx = null; const fig = $('.lb-fig');
  fig.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
  fig.addEventListener('touchend', e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 40) lbStep(dx < 0 ? 1 : -1); tx = null; });
  addEventListener('scroll', () => $('#top').classList.toggle('scrolled', scrollY > 10), { passive: true });
}

/* ---------- boot ---------- */
async function boot() {
  const v = Date.now();
  const [h, r, g] = await Promise.all([fetch('data/homes.json').then(x => x.json()), fetch('data/rates.json?v=' + Math.floor(v / 6e5)).then(x => x.json()), fetch('data/greenway.json').then(x => x.json()).catch(() => null)]);
  h.homes.forEach(x => HOMES[x.slug] = x); RATES = r; GREEN = g;
  const bk = readUrl();
  bind(); document.body.dataset.view = S.view; if (S.view === 'listing') fixDates(); applyLang(); if (S.view === 'listing') { initMap(); renderMapSide(); }
  if (!CFG.api_base) { const f = document.createElement('div'); f.className = 'demo-flag'; f.textContent = t('demo'); document.body.appendChild(f); }
  if (bk === 'success') modal(`<div class="ok-ic">✓</div><h3>${t('ok_t')}</h3><p>${t('ok_b')}</p>`);
  if (bk === 'cancel') modal(`<h3>${t('cancel_t')}</h3><p>${t('cancel_b')}</p>`);
  document.body.dataset.ready = '1';
}
boot().catch(e => { console.error(e); document.body.insertAdjacentHTML('afterbegin', '<p style="padding:20px;background:#fee">Could not load availability. Please refresh.</p>'); });
})();
