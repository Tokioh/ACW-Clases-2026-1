// ============================================================
// GLOBAL  —  Navegación compartida entre todas las páginas
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

  // Menu toggle responsive
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Marcar el enlace de la página activa
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active-page');
    }
  });

});
