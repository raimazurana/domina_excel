/*
 * Motor de renderização das "mini planilhas" (simulação visual do Excel)
 * Tudo é HTML + CSS puro (nenhuma tag <img> é usada). Cada tutorial descreve,
 * em tutorials-data.js, um objeto "visual" por passo, e as funções abaixo
 * transformam esse objeto em marcação real, reaproveitando as classes
 * .excel-table / .excel-cell / .formula-bar definidas em css/style.css.
 */

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** Renderiza a barra de fórmulas com segmentos coloridos (ex.: destacando $ ou argumentos) */
function renderFormulaBar(fb) {
  if (!fb) return '';
  const segmentsHtml = (fb.segments || [])
    .map(seg => {
      const cls = seg.cls ? ` class="${seg.cls}"` : '';
      return `<span${cls}>${escapeHtml(seg.text)}</span>`;
    })
    .join('');
  const cursor = fb.cursor ? '<span class="cursor"></span>' : '';
  return `
    <div class="formula-bar">
      <div class="name-box">${escapeHtml(fb.name || 'A1')}</div>
      <div class="fx">fx</div>
      <div class="formula-input">${segmentsHtml}${cursor}</div>
    </div>`;
}

/** Renderiza a caixinha flutuante que simula a dica de argumentos do Excel */
function renderTooltip(tip) {
  if (!tip) return '';
  return `
    <div class="excel-tooltip">
      <div class="tooltip-box">${tip.html || escapeHtml(tip.text || '')}</div>
    </div>`;
}

/** Renderiza uma mini tabela estilo Excel (cabeçalho de colunas A,B,C.. e linhas numeradas) */
function renderTable(table) {
  const cols = table.cols || ['A', 'B', 'C'];
  const colHeaderCells = cols.map(c => `<th>${c}</th>`).join('');

  const rowsHtml = (table.rows || [])
    .map(row => {
      const cells = (row.cells || [])
        .map(cell => {
          const classes = ['excel-cell', ...(cell.classes || [])].join(' ');
          const styleAttr = cell.style
            ? ` style="${Object.entries(cell.style).map(([k, v]) => `${k}:${v}`).join(';')}"`
            : '';
          const bar = typeof cell.bar === 'number'
            ? `<span class="cell-databar" style="width:${cell.bar}%"></span>`
            : '';
          const icon = cell.icon ? `<span class="cell-icon">${cell.icon}</span>` : '';
          const handle = cell.fillHandle ? '<span class="fill-handle"></span>' : '';
          const text = cell.text === undefined || cell.text === null ? '' : escapeHtml(cell.text);
          return `<td class="${classes}"${styleAttr}>${bar}<span class="cell-text">${icon}${text}</span>${handle}</td>`;
        })
        .join('');
      return `<tr><th class="row-head">${row.n}</th>${cells}</tr>`;
    })
    .join('');

  const caption = table.label ? `<caption>${escapeHtml(table.label)}</caption>` : '';

  return `
    <div class="excel-grid-scroll">
      <table class="excel-table">
        ${caption}
        <tr><th class="row-head"></th>${colHeaderCells}</tr>
        ${rowsHtml}
      </table>
    </div>`;
}

/** Envolve 1 ou 2 tabelas lado a lado (usado nos passos de "duas abas") */
function renderTables(tables) {
  if (!tables || tables.length === 0) return '';
  if (tables.length === 1) return renderTable(tables[0]);
  return `<div class="dual-table-row">${tables.map(renderTable).join('')}</div>`;
}

function renderChrome(inner, title) {
  return `
    <div class="excel-window">
      <div class="excel-titlebar">
        <span>${escapeHtml(title || 'Pasta1 - Excel')}</span>
        <span class="dots"><span></span><span></span><span></span></span>
      </div>
      <div class="excel-ribbon">
        <span class="active">Página Inicial</span>
        <span>Inserir</span>
        <span>Fórmulas</span>
        <span>Dados</span>
        <span>Revisão</span>
        <span>Exibir</span>
      </div>
      ${inner}
    </div>`;
}

/** Simula uma caixa de diálogo do Excel (Validação de Dados, Nova Regra, Proteger Planilha...) */
function renderDialog(dialog) {
  if (!dialog) return '';
  const fields = (dialog.fields || [])
    .map(f => `
      <div class="excel-field-row">
        <label>${escapeHtml(f.label)}</label>
        <div class="excel-input-box">${escapeHtml(f.value)}</div>
      </div>`)
    .join('');
  const actions = (dialog.actions || ['Cancelar', 'OK'])
    .map((a, i, arr) => `<button class="excel-btn-mini${i === arr.length - 1 ? ' primary' : ''}" type="button" disabled>${escapeHtml(a)}</button>`)
    .join('');
  return `
    <div class="excel-dialog">
      <div class="excel-dialog-title"><span>${escapeHtml(dialog.title || 'Caixa de diálogo')}</span><span>✕</span></div>
      <div class="excel-dialog-body">${fields}${dialog.bodyHtml || ''}</div>
      <div class="excel-dialog-actions">${actions}</div>
    </div>`;
}

/** Lista de chips (usado para campos de Tabela Dinâmica ou botões de Segmentação de Dados) */
function renderChips(chips) {
  if (!chips) return '';
  const items = chips.items
    .map(c => `<span class="chip${c.selected ? ' selected' : ''}${c.ghost ? ' ghost' : ''}">${escapeHtml(c.label)}</span>`)
    .join('');
  const title = chips.title ? `<p class="excel-caption-label">${escapeHtml(chips.title)}</p>` : '';
  return `<div>${title}<div class="chip-list">${items}</div></div>`;
}

/** Mini gráfico de barras 100% CSS (usado no tutorial de Gráficos) */
function renderChart(chart) {
  if (!chart) return '';
  const bars = chart.bars
    .map(b => `
      <div class="bar-col">
        <div class="bar" style="height:${b.pct}%">${b.value !== undefined ? escapeHtml(b.value) : ''}</div>
        <span class="bar-label">${escapeHtml(b.label)}</span>
      </div>`)
    .join('');
  return `
    <div class="mini-chart-wrap">
      ${chart.title ? `<p class="mini-chart-title">${escapeHtml(chart.title)}</p>` : ''}
      <div class="mini-chart">${bars}</div>
    </div>`;
}

/** Caminho de navegação da faixa de opções, ex.: Dados > Ferramentas de Dados > Validação de Dados */
function renderRibbonPath(path) {
  if (!path) return '';
  const parts = path.map(p => `<span>${escapeHtml(p)}</span>`).join('<span class="sep">›</span>');
  return `<div class="ribbon-path">${parts}</div>`;
}

/** Menu simulado (ex.: menu de Formatação Condicional com submenus) */
function renderMenu(menu) {
  if (!menu) return '';
  const items = menu.items
    .map(it => `
      <div class="mock-menu-item${it.highlighted ? ' highlighted' : ''}">
        ${it.swatch ? `<span class="swatch" style="background:${it.swatch}"></span>` : ''}
        <span>${escapeHtml(it.label)}</span>
      </div>`)
    .join('');
  return `<div class="mock-menu">${items}</div>`;
}

/**
 * Renderiza um passo visual completo a partir do objeto `visual` do tutorial.
 * Campos aceitos (todos opcionais, combináveis): chrome, title, ribbonPath,
 * formulaBar, tooltip, tables, dialog, chips, chart, menu, note.
 */
function renderVisual(visual) {
  if (!visual) return '';

  const parts = [
    renderRibbonPath(visual.ribbonPath),
    renderFormulaBar(visual.formulaBar),
    renderTooltip(visual.tooltip),
    renderTables(visual.tables),
    renderDialog(visual.dialog),
    renderChips(visual.chips),
    renderChart(visual.chart),
    renderMenu(visual.menu)
  ].join('');

  const body = visual.chrome === false ? parts : renderChrome(parts, visual.title);

  const note = visual.note
    ? `<p class="excel-caption-label" style="margin-top:10px;">${visual.note}</p>`
    : '';

  return `<div class="excel-sim-wrap">${body}${note}</div>`;
}
