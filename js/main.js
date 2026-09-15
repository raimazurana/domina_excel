(function () {
  const grid = document.getElementById('cardGrid');
  const filterWrap = document.getElementById('filterChips');
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (!grid) return;

  const levelClass = {
    'Iniciante': 'level-iniciante',
    'Intermediário': 'level-intermediario',
    'Avançado': 'level-avancado'
  };

  const sorted = [...TUTORIALS].sort((a, b) => a.order - b.order);
  let activeCategory = 'todos';

  function cardHtml(t) {
    const catLabel = getCategoryLabel(t.category);
    const formulaChip = t.formulaSyntax
      ? `<div class="formula-chip">${t.formulaSyntax.split('(')[0]}(...)</div>`
      : '';
    return `
      <a class="tutorial-card" href="tutorial.html?slug=${t.slug}" data-category="${t.category}"
         data-search="${(t.title + ' ' + t.subtitle + ' ' + catLabel).toLowerCase()}">
        <div class="card-top">
          <span class="tag">${catLabel}</span>
          <span class="level ${levelClass[t.level] || ''}">${t.level}</span>
        </div>
        <h3>${t.title}</h3>
        <p class="subtitle">${t.subtitle}</p>
        ${formulaChip}
      </a>`;
  }

  function renderChips() {
    const chips = [{ id: 'todos', label: 'Todos' }, ...CATEGORIES];
    filterWrap.innerHTML = chips
      .map(c => `<button type="button" class="filter-chip${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">${c.icon ? c.icon + ' ' : ''}${c.label}</button>`)
      .join('');

    filterWrap.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        filterWrap.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
  }

  function applyFilters() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    grid.querySelectorAll('.tutorial-card').forEach(card => {
      const matchesCategory = activeCategory === 'todos' || card.dataset.category === activeCategory;
      const matchesSearch = !term || card.dataset.search.includes(term);
      const visible = matchesCategory && matchesSearch;
      card.classList.toggle('hidden', !visible);
      if (visible) visibleCount++;
    });

    noResults.classList.toggle('visible', visibleCount === 0);
  }

  grid.innerHTML = sorted.map(cardHtml).join('');
  renderChips();

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery) searchInput.value = initialQuery;
  applyFilters();

  searchInput.addEventListener('input', applyFilters);

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
})();
