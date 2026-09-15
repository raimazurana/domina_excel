(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const tutorial = slug ? getTutorialBySlug(slug) : null;

  const levelClass = {
    'Iniciante': 'level-iniciante',
    'Intermediário': 'level-intermediario',
    'Avançado': 'level-avancado'
  };

  if (!tutorial) {
    document.querySelector('main.tutorial-body .container').innerHTML = `
      <div class="problem-box">
        <h2>Tutorial não encontrado</h2>
        <p>Não achamos esse conteúdo. <a href="index.html">Volte para a página inicial</a> e escolha um tutorial na lista.</p>
      </div>`;
    document.getElementById('tutorialTitle').textContent = 'Tutorial não encontrado';
    document.getElementById('downloadBtn').classList.add('hidden');
    return;
  }

  const catLabel = getCategoryLabel(tutorial.category);

  document.title = `${tutorial.title} — Domina Excel`;
  document.getElementById('pageTitle').textContent = `${tutorial.title} — Domina Excel`;
  document.getElementById('pageDescription').setAttribute('content', tutorial.subtitle);

  document.getElementById('breadcrumbCategory').textContent = catLabel;

  document.getElementById('tutorialBadges').innerHTML = `
    <span class="tag">${catLabel}</span>
    <span class="level ${levelClass[tutorial.level] || ''}">${tutorial.level}</span>`;

  document.getElementById('tutorialTitle').textContent = tutorial.title;
  document.getElementById('tutorialSubtitle').textContent = tutorial.subtitle;

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.href = tutorial.downloadFile;
  downloadBtn.setAttribute('download', tutorial.downloadFile.split('/').pop());

  if (tutorial.formulaSyntax) {
    const fx = document.getElementById('formulaSyntax');
    fx.classList.remove('hidden');
    const fnName = tutorial.formulaSyntax.match(/=([A-ZÇÃÕÉ.]+)/);
    fx.innerHTML = fnName
      ? tutorial.formulaSyntax.replace(fnName[0], `=<span class="fn">${fnName[1]}</span>`)
      : tutorial.formulaSyntax;
  }

  document.getElementById('problemText').textContent = tutorial.problem;

  document.getElementById('stepsContainer').innerHTML = tutorial.steps
    .map((step, i) => `
      <div class="step">
        <div class="step-text">
          <span class="step-number">${i + 1}</span>
          <h3>${step.title}</h3>
          <p>${step.text}</p>
          ${step.why ? `<div class="why"><strong>Por que esse clique importa</strong>${step.why}</div>` : ''}
        </div>
        <div class="step-visual">${renderVisual(step.visual)}</div>
      </div>`)
    .join('');

  if (tutorial.tips && tutorial.tips.length) {
    document.getElementById('tipsBox').classList.remove('hidden');
    document.getElementById('tipsList').innerHTML = tutorial.tips.map(tip => `<li>${tip}</li>`).join('');
  }

  const sorted = [...TUTORIALS].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex(t => t.slug === tutorial.slug);
  const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
  const next = sorted[(idx + 1) % sorted.length];

  document.getElementById('tutorialNav').innerHTML = `
    <a href="tutorial.html?slug=${prev.slug}" class="prev">← ${prev.title}</a>
    <a href="tutorial.html?slug=${next.slug}" class="next">${next.title} →</a>`;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `index.html?q=${encodeURIComponent(searchInput.value.trim())}#tutoriais`;
      }
    });
  }

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  }
})();
