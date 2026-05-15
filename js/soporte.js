// ============================================================
// TICKET CENTER  —  Módulo Isaac Mateo
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const btnCrear = document.getElementById('btnCrearTicket');
  if (btnCrear) {
    btnCrear.addEventListener('click', crearTicket);
  }
});

function crearTicket() {
  const asunto = document.getElementById('ticket-asunto').value.trim();
  const prioridad = document.getElementById('ticket-prioridad').value;
  const desc = document.getElementById('ticket-desc').value.trim();

  if (!asunto || !desc) {
    alert('Completa el asunto y la descripcion del ticket.');
    return;
  }

  const list = document.getElementById('ticketList');
  const item = document.createElement('div');
  item.className = 'ticket-item';
  const dateStr = new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' });
  item.innerHTML =
    '<div class="ticket-item-left">' +
      '<h4>' + asunto.replace(/</g, '&lt;') + '</h4>' +
      '<p><i class="far fa-clock" style="margin-right:4px;"></i> Creado: ' + dateStr + ' · ' + prioridad + '</p>' +
    '</div>' +
    '<span class="badge badge-progress">En proceso</span>';
  list.prepend(item);

  document.getElementById('ticket-asunto').value = '';
  document.getElementById('ticket-desc').value = '';
}
