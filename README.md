# Domina Excel

Site educacional (HTML, CSS e JavaScript puros) para capacitação prática em Excel voltada à otimização de rotinas administrativas e inclusão digital.

## Conteúdo

21 tutoriais organizados em 10 categorias (Busca, Referência, Lógica, Condicionais, Matemática, Agrupamento, Limpeza, Tratamento de Dados, Análise Visual, Estrutura, Formatação Condicional, Formatação de Células, Organização da Planilha, Boas Práticas e Segurança e Impressão).

Cada tutorial segue a didática:

1. **Problema real** de rotina administrativa (fechar folha, cruzar estoque, cadastro de clientes...);
2. **Passo a passo** explicando o "porquê" de cada clique/argumento;
3. **Simulação visual da tela do Excel**, construída inteiramente em HTML/CSS (sem `<img>`) — grade de células, barra de fórmulas, dicas de argumento, diálogos, menus, gráficos e mais;
4. Botão para **baixar a planilha de exercícios** correspondente (`assets/planilhas/`).

## Estrutura

```
index.html          → catálogo com busca e filtro por categoria
tutorial.html        → template único das páginas de tutorial (?slug=...)
css/style.css        → design system + componentes do simulador de Excel
js/tutorials-data.js → conteúdo dos 21 tutoriais
js/excel-sim.js      → motor que transforma os dados em HTML/CSS do simulador
js/main.js           → catálogo (busca, filtros, renderização dos cards)
js/tutorial.js        → renderização da página de tutorial
assets/planilhas/    → 21 planilhas .xlsx de exercício para download
```
