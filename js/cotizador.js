// ============================================================
// SMART COTIZADOR  —  Módulo Integrante 3
// ============================================================
const prices = { web: 350, app: 1200, ecom: 1800, seo: 250, cloud: 150 };

document.addEventListener('DOMContentLoaded', function () {

  const serviceOptions = document.querySelectorAll('.service-option');
  const pagesSlider = document.getElementById('pagesSlider');
  const weeksSlider = document.getElementById('weeksSlider');
  const btnPDF = document.getElementById('btnGenerarPDF');

  if (serviceOptions.length) {
    serviceOptions.forEach(function (el) {
      el.addEventListener('click', function () {
        const chk = this.querySelector('input[type="checkbox"]');
        chk.checked = !chk.checked;
        this.classList.toggle('active', chk.checked);
        updateQuote();
      });
    });
  }

  if (pagesSlider) pagesSlider.addEventListener('input', updateQuote);
  if (weeksSlider) weeksSlider.addEventListener('input', updateQuote);
  if (btnPDF) btnPDF.addEventListener('click', generarPDF);

});

function updateQuote() {
  let total = 0;
  const pages = parseInt(document.getElementById('pagesSlider').value);
  const weeks = parseInt(document.getElementById('weeksSlider').value);
  document.getElementById('pagesLabel').textContent = pages;
  document.getElementById('weeksLabel').textContent = weeks;

  const container = document.getElementById('previewItems');
  container.innerHTML = '';

  const selected = [];
  document.querySelectorAll('.service-option').forEach(function (el) {
    const chk = el.querySelector('input[type="checkbox"]');
    if (chk.checked) {
      const key = chk.id.replace('chk-', '');
      const price = prices[key] || 0;
      const name = el.querySelector('.service-info h4').textContent;
      total += price;
      selected.push({ name: name, price: price });
    }
  });

  if (selected.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted); font-size:0.9rem;">Selecciona servicios para ver el resumen</p>';
  } else {
    selected.forEach(function (s) {
      const div = document.createElement('div');
      div.className = 'preview-item';
      div.innerHTML = '<span class="item-name">' + s.name + '</span><span class="item-price">$' + s.price + '</span>';
      container.appendChild(div);
    });
  }

  const pageFactor = 1 + (pages - 1) * 0.03;
  const weekFactor = 1 + (16 - weeks) * 0.01;
  const finalTotal = Math.round(total * pageFactor * weekFactor);
  document.getElementById('totalPrice').textContent = '$' + finalTotal;
  document.getElementById('totalFinal').textContent = '$' + finalTotal;
  return { total: finalTotal, items: selected, pages: pages, weeks: weeks };
}

function generarPDF() {
  const data = updateQuote();
  if (data.items.length === 0) {
    alert('Selecciona al menos un servicio para generar la propuesta.');
    return;
  }
  const itemsList = data.items.map(function (s) { return '- ' + s.name + ': $' + s.price; }).join('\n');
  const content = [
    '========================================',
    '  PROPUESTA COMERCIAL — MACALLY',
    '========================================',
    '',
    'Fecha: ' + new Date().toLocaleDateString('es-EC'),
    'Cliente: ___________________________',
    '',
    '--- SERVICIOS SELECCIONADOS ---',
    itemsList,
    '',
    'Paginas/Pantallas: ' + data.pages,
    'Plazo estimado: ' + data.weeks + ' semanas',
    '',
    'TOTAL ESTIMADO: $' + data.total,
    '',
    '========================================',
    '  Macally · Soluciones Digitales',
    '  Manta, Manabi, Ecuador',
    '  hola@macally.ec',
    '========================================'
  ].join('\n');

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Propuesta_Macally_' + Date.now() + '.txt';
  link.click();
  URL.revokeObjectURL(link.href);
  alert('Propuesta generada correctamente.');
}
