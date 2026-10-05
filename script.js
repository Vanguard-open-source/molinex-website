const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open', !expanded);
});

let T = {
  en: {
    nav:['Solution','Features','Plans'], hero:['Operational intelligence for rice mills','Turn mill data into better decisions.','Molinex connects production, quality, raw materials and maintenance data so your team can reduce losses, detect anomalies and improve performance.','Open Molinex App','Discover Molinex →'],
    trust:['✓ Data in one place','✓ Built for rice mills','✓ Web-based SaaS'], challenge:['The challenge','Good decisions need connected information.','Scattered data','Unexpected downtime','Hidden losses'], feature:['One platform, clearer operations','Everything your team needs to see what is happening.','Operational dashboard','Lot traceability','Maintenance control','Alerts and recommendations'], audience:['Designed around your team','A shared view for every role.'], benefits:['From data to action','Benefits your operation can feel.'], process:['How it works','A simple path from records to recommendations.'], plans:['Plans that grow with your mill','Start with what you need today.'], contact:['Ready to improve your operation?','Let’s find the right starting point for your mill.','Request information']
  },
  es: {
    nav:['Solución','Funciones','Planes'], hero:['Inteligencia operativa para molinos de arroz','Convierte los datos de tu molino en mejores decisiones.','Molinex conecta los datos de producción, calidad, materia prima y mantenimiento para reducir pérdidas, detectar anomalías y mejorar el rendimiento.','Abrir aplicación Molinex','Conoce Molinex →'],
    trust:['✓ Datos en un solo lugar','✓ Diseñado para molinos de arroz','✓ SaaS basado en la web'], challenge:['El desafío','Las buenas decisiones necesitan información conectada.','Datos dispersos','Paradas inesperadas','Pérdidas ocultas'], feature:['Una plataforma, operaciones más claras','Todo lo que tu equipo necesita para saber qué está pasando.','Panel operativo','Trazabilidad de lotes','Control de mantenimiento','Alertas y recomendaciones'], audience:['Diseñado para tu equipo','Una vista compartida para cada rol.'], benefits:['De los datos a la acción','Beneficios que tu operación puede sentir.'], process:['Cómo funciona','Un camino simple de los registros a las recomendaciones.'], plans:['Planes que crecen con tu molino','Comienza con lo que necesitas hoy.'], contact:['¿Listo para mejorar tu operación?','Encontremos el punto de partida ideal para tu molino.','Solicitar información']
  }
};

const text = (selector, value) => document.querySelectorAll(selector).forEach((node, i) => node.textContent = Array.isArray(value) ? value[i] ?? node.textContent : value);
function setLanguage(lang) {
  const t = T[lang];
  text('.nav-links > a:not(.button)', t.nav); text('.nav-links .button:not(.app-link)', t.contact[2]); text('.app-link', lang === 'es' ? 'Abrir aplicación Molinex' : 'Open Molinex App'); text('.hero .eyebrow, .hero h1, .hero-text, .hero-actions .button-accent, .hero-actions .button-secondary', t.hero);
  text('.trust-row span', t.trust); text('#solution .eyebrow, #solution h2, .challenge-grid h3', t.challenge);
  text('#features .eyebrow, #features h2, .feature-card h3', t.feature); text('#audiences .eyebrow, #audiences h2', t.audience);
  text('#benefits .eyebrow, #benefits h2', t.benefits); text('#how-it-works .eyebrow, #how-it-works h2', t.process); text('#plans .eyebrow, #plans h2', t.plans);
  text('#contact .eyebrow, #contact h2, .contact-form button', t.contact);
  const es = lang === 'es';
  const more = es ? ['Abrir aplicación Molinex →','Cotización personalizada','Conocer más','Nombre completo','Correo laboral','Tamaño del molino','¿Qué te gustaría mejorar?','Formulario de demostración: conecta un backend antes de recopilar solicitudes.'] : ['Open Molinex App →','Custom quote','Learn more','Full name','Work email','Mill size','What would you like to improve?','Demo form: connect a backend before collecting customer requests.'];
  text('.feature-card a', more[0]); text('.plan-price', more[1]); text('.plan-card .button', more[2]); text('.contact-form label', more.slice(3,7)); text('#form-status', more[7]);
  document.documentElement.lang = lang; document.title = es ? 'Molinex | Inteligencia para mejores molinos de arroz' : 'Molinex | Intelligence for better rice milling';
  document.querySelector('meta[name="description"]').content = es ? 'Molinex ayuda a los molinos de arroz a mejorar su producción, reducir pérdidas y anticipar fallas.' : T.en.hero[2];
  document.querySelectorAll('.language-button').forEach(b => { const active = b.dataset.language === lang; b.classList.toggle('active', active); b.setAttribute('aria-pressed', active); });
  localStorage.setItem('molinex-language', lang);
}
document.querySelectorAll('.language-button').forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.language)));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
const form = document.querySelector('#contact-form'); const status = document.querySelector('#form-status');
form.addEventListener('submit', e => { e.preventDefault(); const es = document.documentElement.lang === 'es'; if (!form.checkValidity()) { status.textContent = es ? 'Completa todos los campos obligatorios.' : 'Please complete all required fields.'; status.style.color='#a33a2b'; form.reportValidity(); return; } status.textContent = es ? 'Gracias. Recibimos tu solicitud.' : 'Thanks. Your request has been received.'; status.style.color='#087653'; form.reset(); });
async function loadTranslations() {
  const [en, es] = await Promise.all([
    fetch('i18n/en.json').then(response => response.json()),
    fetch('i18n/es.json').then(response => response.json())
  ]);
  T = {
    en: { ...T.en, ...en },
    es: { ...T.es, ...es }
  };
  setLanguage(localStorage.getItem('molinex-language') || 'en');
}

loadTranslations().catch(() => setLanguage(localStorage.getItem('molinex-language') || 'en'));
