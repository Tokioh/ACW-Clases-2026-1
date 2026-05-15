// ============================================================
// CONTACTO
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  const btnEnviar = document.getElementById('btnEnviarContacto');
  if (btnEnviar) {
    btnEnviar.addEventListener('click', enviarContacto);
  }
});

function enviarContacto() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const msg = document.getElementById('contact-msg').value.trim();
  if (!name || !email || !msg) {
    alert('Por favor completa todos los campos del formulario.');
    return;
  }
  alert('Mensaje enviado. Te contactaremos pronto a ' + email);
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-msg').value = '';
}
