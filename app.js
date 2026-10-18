(() => {
  'use strict';
  const form = document.getElementById('search-form');
  const search = document.getElementById('search-input');
  const toast = document.getElementById('toast');
  const categoryButtons = [...document.querySelectorAll('[data-category]')];
  const emptyMessage = document.getElementById('empty-message');
  let toastTimer;

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  }

  if (form && search) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = search.value.trim();
      if (query) notify(`Todavía no hay juegos añadidos para buscar «${query}».`);
      else notify('El catálogo de juegos estará disponible pronto.');
    });
  }

  categoryButtons.forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('active')));
    button.addEventListener('click', () => {
      categoryButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      notify(button.dataset.category === 'Todos'
        ? 'Todavía no hay juegos añadidos al catálogo.'
        : `La categoría «${button.dataset.category}» estará disponible cuando añadamos juegos.`);
    });
  });

  if (emptyMessage) emptyMessage.hidden = false;
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
