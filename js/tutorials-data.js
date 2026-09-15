const CATEGORIES = [
  { id: 'busca-referencia', label: 'Busca e Referência', icon: '🔗' },
  { id: 'logica-condicionais', label: 'Lógica e Condicionais', icon: '🧠' },
  { id: 'matematica-agrupamento', label: 'Matemática e Agrupamento', icon: '➕' },
  { id: 'limpeza-dados', label: 'Limpeza e Tratamento de Dados', icon: '🧹' },
  { id: 'analise-visual', label: 'Análise Visual e Estrutura', icon: '📊' },
  { id: 'formatacao-condicional', label: 'Formatação Condicional', icon: '🎨' },
  { id: 'formatacao-celulas', label: 'Formatação de Células', icon: '🔢' },
  { id: 'organizacao-planilha', label: 'Organização da Planilha', icon: '🗂️' },
  { id: 'boas-praticas', label: 'Boas Práticas de Estrutura', icon: '✅' },
  { id: 'seguranca-impressao', label: 'Segurança e Impressão', icon: '🔒' }
];

const TUTORIALS = [

/* =========================================================
   BUSCA E REFERÊNCIA
   ========================================================= */

{
  slug: 'procx',
  order: 1,
  title: 'PROCX',
  subtitle: 'traz o dado certo de outra planilha, sem copiar e colar linha por linha',
  category: 'busca-referencia',
  level: 'Intermediário',
  formulaSyntax: '=PROCX(valor_procurado; matriz_procurada; matriz_retornada; [se_não_encontrado]; [modo_correspondência])',
  downloadFile: 'assets/planilhas/01-procx.xlsx',
  problem: 'Toda sexta você recebe uma lista de funcionários numa aba e os salários em outra. Copiar e colar linha por linha é onde a folha de pagamento sempre desanda: troca uma linha de lugar e lá vai o salário do Zé parar na conta da Maria.',
  steps: [
    {
      title: 'Descubra qual coluna liga as duas abas',
      text: 'Antes de sair digitando fórmula, ache o "RG" das suas tabelas: uma coluna que existe nas duas abas e não se repete, normalmente a matrícula ou o CPF. É por ela que o Excel vai casar as informações.',
      why: 'Sem uma coluna em comum e única, o Excel não tem como saber que a linha 4 de uma aba é a mesma pessoa da linha 9 da outra.',
      visual: {
        title: 'Pasta1.xlsx',
        tables: [
          { label: 'Aba "Funcionários"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042', classes: ['match-highlight'] }, { text: 'Ana Souza' }] },
            { n: 3, cells: [{ text: '1088', classes: ['match-highlight'] }, { text: 'Carlos Lima' }] }
          ]},
          { label: 'Aba "Salários"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042', classes: ['match-highlight'] }, { text: '3.200,00', classes: ['num'] }] },
            { n: 3, cells: [{ text: '1088', classes: ['match-highlight'] }, { text: '2.750,00', classes: ['num'] }] }
          ]}
        ],
        note: 'A coluna "Matrícula" aparece nas duas abas, é o elo que o PROCX vai usar.'
      }
    },
    {
      title: 'Clique na célula onde o salário deve aparecer e comece a fórmula',
      text: 'Vá até a aba Funcionários, clique na célula vazia da coluna Salário e digite <code>=PROCX(</code>. Repare que o Excel já abre uma caixinha de dica mostrando a ordem dos argumentos, é o seu "GPS" da fórmula.',
      why: 'O parêntese aberto avisa o Excel "presta atenção, uma lista de argumentos vem por aí". A dica que aparece existe justamente para você não precisar decorar a ordem.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C2',
          segments: [
            { text: '=' },
            { text: 'PROCX', cls: 'fn-name' },
            { text: '(' }
          ],
          cursor: true
        },
        tooltip: {
          html: 'PROCX(<span class="cur">valor_procurado</span>; matriz_procurada; matriz_retornada; [se_não_encontrado]; [modo_correspondência])'
        },
        tables: [
          { label: 'Aba "Funcionários"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042' }, { text: 'Ana Souza' }, { text: '=PROCX(', classes: ['active'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Preencha os três primeiros argumentos',
      text: 'Primeiro argumento: a célula com a matrícula que você já tem (A2). Segundo: a coluna inteira de matrículas na aba Salários, é onde o Excel vai "procurar". Terceiro: a coluna de salários, é o que ele vai "trazer de volta".',
      why: 'O PROCX sempre procura em uma coluna e devolve o valor da mesma linha em outra coluna. Por isso a coluna de busca e a coluna de retorno precisam ter o mesmo número de linhas.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C2',
          segments: [
            { text: '=' }, { text: 'PROCX', cls: 'fn-name' }, { text: '(' },
            { text: 'A2', cls: 'arg-1' }, { text: ';' },
            { text: 'Salários!A:A', cls: 'arg-2' }, { text: ';' },
            { text: 'Salários!B:B', cls: 'arg-3' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Aba "Salários"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042', classes: ['arg-2'] }, { text: '3.200,00', classes: ['arg-3', 'num'] }] },
            { n: 3, cells: [{ text: '1088', classes: ['arg-2'] }, { text: '2.750,00', classes: ['arg-3', 'num'] }] }
          ]}
        ],
        note: 'Azul = onde o Excel procura (arg. 2). Roxo = de onde ele traz o resultado (arg. 3).'
      }
    },
    {
      title: 'Trave os intervalos com $ antes de arrastar',
      text: 'Clique dentro de cada referência de coluna e aperte <strong>F4</strong>. Isso coloca os cifrões ($) e trava a referência, para que ela não "ande" quando você copiar a fórmula para as linhas de baixo.',
      why: 'Sem travar, ao arrastar a fórmula para a linha 3 o Excel desloca todas as referências uma linha para baixo, e sua área de busca sai do lugar, quebrando o resultado.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C2',
          segments: [
            { text: '=' }, { text: 'PROCX', cls: 'fn-name' }, { text: '(' },
            { text: 'A2', cls: 'arg-1' }, { text: ';' },
            { text: 'Salários!' }, { text: '$', cls: 'dollar' }, { text: 'A' }, { text: '$', cls: 'dollar' }, { text: '1:' },
            { text: '$', cls: 'dollar' }, { text: 'A' }, { text: '$', cls: 'dollar' }, { text: '500' }, { text: ';' },
            { text: 'Salários!' }, { text: '$', cls: 'dollar' }, { text: 'B' }, { text: '$', cls: 'dollar' }, { text: '1:' },
            { text: '$', cls: 'dollar' }, { text: 'B' }, { text: '$', cls: 'dollar' }, { text: '500' }, { text: ')' }
          ]
        }
      }
    },
    {
      title: 'Arraste a alça de preenchimento',
      text: 'Clique na alcinha verde no canto inferior direito da célula com a fórmula pronta e arraste para baixo. O Excel repete a lógica em cada linha, mas se aparecer um funcionário sem correspondência na outra aba, ele avisa com um erro.',
      why: 'O erro <strong>#N/D</strong> não é bug: é o Excel te dizendo "não achei essa matrícula na outra aba". No próximo tutorial (SEERRO) você aprende a deixar isso apresentável.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Funcionários" (resultado)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042' }, { text: 'Ana Souza' }, { text: '3.200,00', classes: ['result-highlight', 'num'] }] },
            { n: 3, cells: [{ text: '1088' }, { text: 'Carlos Lima' }, { text: '2.750,00', classes: ['result-highlight', 'num'], fillHandle: true }] },
            { n: 4, cells: [{ text: '1099' }, { text: 'Bruna Dias' }, { text: '#N/D', classes: ['error-cell'] }] }
          ]}
        ]
      }
    }
  ],
  tips: [
    'PROCX substitui o PROCV com vantagens: procura em qualquer direção (não só da esquerda pra direita) e não quebra se alguém inserir uma coluna no meio da tabela.',
    'Se o seu Excel não tem PROCX ainda, use ÍNDICE + CORRESP (próximo tutorial), o resultado é o mesmo.',
    'Sempre envolva o PROCX com SEERRO em planilhas que outras pessoas vão ver, para trocar #N/D por uma mensagem amigável.'
  ]
},

{
  slug: 'indice-corresp',
  order: 2,
  title: 'ÍNDICE + CORRESP',
  subtitle: 'a dupla clássica para buscar em qualquer direção, mesmo no Excel mais antigo',
  category: 'busca-referencia',
  level: 'Avançado',
  formulaSyntax: '=ÍNDICE(matriz_retorno; CORRESP(valor_procurado; matriz_procurada; 0))',
  downloadFile: 'assets/planilhas/02-indice-corresp.xlsx',
  problem: 'Você quer trazer o "código do produto" que fica numa coluna à esquerda do "nome do produto" que você tem em mãos. O PROCV clássico não builda para trás, e nem toda empresa já atualizou para o PROCX. É aqui que a dupla ÍNDICE + CORRESP salva o dia.',
  steps: [
    {
      title: 'Entenda o papel de cada um dos dois',
      text: 'CORRESP é o "detetive": ele procura um valor numa coluna e devolve a <em>posição</em> (a que número da linha ele está), não o valor em si. ÍNDICE é o "entregador": você fala uma posição e ele te devolve o valor que está naquela posição, em outra coluna qualquer.',
      why: 'Juntando os dois, você descobre a posição com o CORRESP e usa essa posição no ÍNDICE para buscar em qualquer coluna, para a esquerda, direita, não importa.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Estoque"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Código', classes: ['header-cell'] }, { text: 'Produto', classes: ['header-cell'] }, { text: 'Qtd.', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'P-001', classes: ['arg-1'] }, { text: 'Papel A4' }, { text: '120', classes: ['num'] }] },
            { n: 3, cells: [{ text: 'P-002' }, { text: 'Caneta Azul', classes: ['match-highlight'] }, { text: '340', classes: ['num'] }] },
            { n: 4, cells: [{ text: 'P-003' }, { text: 'Grampeador' }, { text: '18', classes: ['num'] }] }
          ]}
        ],
        note: 'Você tem "Caneta Azul" e quer o código, que está à esquerda. O PROCV comum não faria isso.'
      }
    },
    {
      title: 'Monte o CORRESP para achar a posição',
      text: 'Escreva <code>=CORRESP("Caneta Azul"; B2:B4; 0)</code>. O terceiro argumento, o zero, pede correspondência exata, sem ele, o Excel pode te devolver posições erradas em listas fora de ordem.',
      why: 'O "0" é o modo mais seguro: ele só considera igual quando é idêntico. Sem isso o Excel tenta "chutar" o mais próximo, o que é perigoso em cadastros.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'D2',
          segments: [
            { text: '=' }, { text: 'CORRESP', cls: 'fn-name' }, { text: '(' },
            { text: '"Caneta Azul"', cls: 'arg-1' }, { text: ';' },
            { text: 'B2:B4', cls: 'arg-2' }, { text: ';' },
            { text: '0', cls: 'arg-3' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Resultado', cols: ['A'], rows: [
            { n: 1, cells: [{ text: '2', classes: ['result-highlight', 'center'] }] }
          ]}
        ],
        note: '"Caneta Azul" é a 2ª linha do intervalo B2:B4, essa é a posição que o CORRESP devolve.'
      }
    },
    {
      title: 'Encaixe o CORRESP dentro do ÍNDICE',
      text: 'Agora troque o número fixo pela fórmula CORRESP dentro do ÍNDICE: <code>=ÍNDICE(A2:A4; CORRESP("Caneta Azul"; B2:B4; 0))</code>. O ÍNDICE recebe "coluna dos códigos" + "posição 2" e devolve o código certo.',
      why: 'Ao encaixar as duas fórmulas, você não precisa mais digitar a posição manualmente, se a lista mudar de ordem amanhã, a fórmula se atualiza sozinha.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'D2',
          segments: [
            { text: '=' }, { text: 'ÍNDICE', cls: 'fn-name' }, { text: '(' },
            { text: 'A2:A4', cls: 'arg-1' }, { text: ';' },
            { text: 'CORRESP', cls: 'fn-name' }, { text: '(' },
            { text: '"Caneta Azul"', cls: 'arg-2' }, { text: ';' },
            { text: 'B2:B4', cls: 'arg-2' }, { text: ';0)' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Aba "Estoque" (resultado)', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Código', classes: ['header-cell'] }, { text: 'Produto', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'P-002', classes: ['result-highlight'] }, { text: 'Caneta Azul' }, ] }
          ]}
        ]
      }
    },
    {
      title: 'Trave as referências e arraste',
      text: 'Aperte F4 nas duas colunas (A2:A4 e B2:B4) para travá-las com $, deixando livre só a célula que muda a cada linha. Depois arraste a alça de preenchimento normalmente.',
      why: 'Assim como no PROCX, sem travar os intervalos eles "andam" junto com a fórmula ao arrastar, e a busca passa a olhar para linhas erradas.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        formulaBar: {
          name: 'D2',
          segments: [
            { text: '=' }, { text: 'ÍNDICE', cls: 'fn-name' }, { text: '(' },
            { text: '$', cls: 'dollar' }, { text: 'A' }, { text: '$', cls: 'dollar' }, { text: '2:' },
            { text: '$', cls: 'dollar' }, { text: 'A' }, { text: '$', cls: 'dollar' }, { text: '4' }, { text: ';...)' }
          ]
        }
      }
    }
  ],
  tips: [
    'ÍNDICE + CORRESP funciona em qualquer versão do Excel, incluindo as mais antigas onde o PROCX ainda não existe.',
    'Diferente do PROCV, essa dupla não quebra se alguém inserir uma coluna nova no meio da tabela de busca.',
    'Pode combinar com SEERRO do mesmo jeito que o PROCX, para tratar quando o valor não é encontrado.'
  ]
},

/* =========================================================
   LÓGICA E CONDICIONAIS
   ========================================================= */

{
  slug: 'se',
  order: 3,
  title: 'SE',
  subtitle: 'faz o Excel decidir por você, "se isso, faz aquilo, senão faz aquilo outro"',
  category: 'logica-condicionais',
  level: 'Iniciante',
  formulaSyntax: '=SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)',
  downloadFile: 'assets/planilhas/03-se.xlsx',
  problem: 'Você tem uma lista de cobranças e quer que apareça automaticamente "Em dia" ou "Atrasado" ao lado de cada cliente, sem digitar isso na mão pra cada linha, e sem errar quando a lista tiver 300 linhas.',
  steps: [
    {
      title: 'Pense no SE como uma pergunta de sim/não',
      text: 'Toda fórmula SE começa com uma pergunta que só pode ter resposta "verdadeiro" ou "falso". No nosso caso: "a data de vencimento já passou?". Se sim, um resultado aparece; se não, outro.',
      why: 'O Excel não entende "mais ou menos". Por isso o primeiro argumento do SE precisa ser algo que dá pra responder com certeza, geralmente uma comparação como <code>&gt;</code>, <code>&lt;</code> ou <code>=</code>.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Cobranças"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell'] }, { text: 'Vencimento', classes: ['header-cell'] }, { text: 'Situação', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol' }, { text: '05/09/2026' }, { text: '?', classes: ['muted', 'center'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Escreva o teste lógico',
      text: 'Clique na célula de Situação e digite <code>=SE(B2&lt;HOJE();</code>, isso pergunta "a data em B2 é menor que hoje?" ou seja, "já venceu?".',
      why: '<code>HOJE()</code> sempre pega a data atual do computador, então a fórmula continua certa amanhã, depois de amanhã, sem você precisar atualizar nada.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C2',
          segments: [
            { text: '=' }, { text: 'SE', cls: 'fn-name' }, { text: '(' },
            { text: 'B2<HOJE()', cls: 'arg-1' }, { text: ';' }
          ],
          cursor: true
        }
      }
    },
    {
      title: 'Defina os dois resultados possíveis',
      text: 'Complete com o segundo argumento (o que aparece se for verdadeiro) e o terceiro (se for falso): <code>=SE(B2&lt;HOJE(); "Atrasado"; "Em dia")</code>.',
      why: 'A ordem importa: o segundo argumento sempre é o prêmio de consolação de "sim", e o terceiro é o de "não". Trocar a ordem inverte o sentido da regra inteira.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C2',
          segments: [
            { text: '=' }, { text: 'SE', cls: 'fn-name' }, { text: '(' },
            { text: 'B2<HOJE()', cls: 'arg-1' }, { text: ';' },
            { text: '"Atrasado"', cls: 'arg-2' }, { text: ';' },
            { text: '"Em dia"', cls: 'arg-3' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Aba "Cobranças" (resultado)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell'] }, { text: 'Vencimento', classes: ['header-cell'] }, { text: 'Situação', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol' }, { text: '05/09/2026' }, { text: 'Atrasado', classes: ['error-cell', 'center'] }] },
            { n: 3, cells: [{ text: 'Mercado Boa Fé' }, { text: '30/09/2026' }, { text: 'Em dia', classes: ['result-highlight', 'center'], fillHandle: true }] }
          ]}
        ]
      }
    },
    {
      title: 'Precisa de mais de duas opções? Aninhe outro SE',
      text: 'Se quiser um terceiro resultado, tipo "Vence hoje", troque o terceiro argumento por outro SE completo: <code>=SE(B2&lt;HOJE();"Atrasado";SE(B2=HOJE();"Vence hoje";"Em dia"))</code>.',
      why: 'Cada SE resolve uma pergunta. Encadeando SEs você cria uma trilha de perguntas, mas cuidado: passar de 3 ou 4 níveis deixa a fórmula ilegível, e aí vale mais a pena usar SES ou PROCX numa tabela de faixas.',
      visual: { chrome: false, note: 'Dica: mais de 3 SEs aninhados costuma ser sinal de que uma tabela auxiliar resolveria melhor.' }
    }
  ],
  tips: [
    'Texto sempre entre aspas dentro do SE: "Em dia" e não Em dia, senão o Excel acha que é o nome de uma célula.',
    'Combine o SE com formatação condicional (veja o tutorial correspondente) para colorir automaticamente "Atrasado" de vermelho.',
    'Para várias condições diferentes ao mesmo tempo, dê uma olhada em SES, disponíveis nas versões mais novas do Excel.'
  ]
},

{
  slug: 'seerro',
  order: 4,
  title: 'SEERRO',
  subtitle: 'troca aquele erro feio (#N/D, #DIV/0!) por uma mensagem que faz sentido',
  category: 'logica-condicionais',
  level: 'Iniciante',
  formulaSyntax: '=SEERRO(valor; valor_se_erro)',
  downloadFile: 'assets/planilhas/04-seerro.xlsx',
  problem: 'Sua fórmula de PROCX funciona lindamente até chegar numa matrícula que não existe na outra aba, e a partir dali é uma sequência de #N/D espalhados pela planilha, péssimo para mostrar em uma reunião.',
  steps: [
    {
      title: 'Identifique a fórmula que está gerando erro',
      text: 'Erros comuns: #N/D (PROCX/PROCV não achou o valor), #DIV/0! (divisão por zero, tipo meta de vendas de um mês sem vendas) e #VALOR! (célula com texto onde deveria ter número).',
      why: 'O SEERRO não conserta a causa do erro, ele só troca a aparência. Por isso vale entender de onde ele vem antes de simplesmente escondê-lo.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Funcionários"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042' }, { text: 'Ana Souza' }, { text: '3.200,00', classes: ['num'] }] },
            { n: 3, cells: [{ text: '1099' }, { text: 'Bruna Dias' }, { text: '#N/D', classes: ['error-cell'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Envolva a fórmula original com SEERRO',
      text: 'Onde tinha <code>=PROCX(A2;...)</code>, passa a ter <code>=SEERRO(PROCX(A2;...); "Verificar cadastro")</code>. A fórmula antiga vira o primeiro argumento, e o texto amigável é o segundo.',
      why: 'O SEERRO testa o resultado da fórmula de dentro: se der certo, mostra o valor normal; se der qualquer tipo de erro, mostra o que você escreveu no segundo argumento.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C3',
          segments: [
            { text: '=' }, { text: 'SEERRO', cls: 'fn-name' }, { text: '(' },
            { text: 'PROCX(A3;Salários!A:A;Salários!B:B)', cls: 'arg-1' }, { text: ';' },
            { text: '"Verificar cadastro"', cls: 'arg-2' }, { text: ')' }
          ]
        }
      }
    },
    {
      title: 'Veja a diferença no resultado final',
      text: 'Agora, em vez do #N/D, a planilha mostra uma frase que qualquer pessoa entende, e ainda avisa exatamente o que precisa ser verificado.',
      why: 'Isso importa especialmente em planilhas compartilhadas: um erro cru assusta quem não entende Excel, uma mensagem clara direciona a ação.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Funcionários" (resultado)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Matrícula', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Salário', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1042' }, { text: 'Ana Souza' }, { text: '3.200,00', classes: ['result-highlight', 'num'] }] },
            { n: 3, cells: [{ text: '1099' }, { text: 'Bruna Dias' }, { text: 'Verificar cadastro', classes: ['match-highlight'] }] }
          ]}
        ]
      }
    }
  ],
  tips: [
    'Não use SEERRO para "esconder" um erro real de fórmula (tipo referência errada), resolva a causa, senão você troca um problema visível por um invisível.',
    'SEERRO(valor;"") faz a célula parecer vazia quando dá erro, útil antes de imprimir um relatório.',
    'Combine com CONT.SE depois para contar quantos "Verificar cadastro" apareceram, e priorizar a correção.'
  ]
},

/* =========================================================
   MATEMÁTICA E AGRUPAMENTO
   ========================================================= */

{
  slug: 'soma',
  order: 5,
  title: 'SOMA',
  subtitle: 'o alicerce de qualquer planilha, some intervalos sem digitar conta na mão',
  category: 'matematica-agrupamento',
  level: 'Iniciante',
  formulaSyntax: '=SOMA(intervalo1; [intervalo2]; ...)',
  downloadFile: 'assets/planilhas/05-soma.xlsx',
  problem: 'Fim do mês, você precisa saber quanto foi gasto no total com fornecedores. A lista tem 40 linhas, somar no dedo (ou pior, na calculadora do celular, digitando errado no meio) é convite ao erro.',
  steps: [
    {
      title: 'Clique na célula onde o total deve aparecer',
      text: 'Deixe sempre uma linha ou coluna reservada para o total, embaixo ou ao lado dos dados. Clique nela e digite <code>=SOMA(</code>.',
      why: 'Separar o total dos dados evita que alguém confunda um valor da lista com o resultado final ao ler a planilha rapidamente.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Despesas"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Fornecedor', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Papelaria Boa Ideia' }, { text: '450,00', classes: ['num'] }] },
            { n: 3, cells: [{ text: 'Distribuidora Alfa' }, { text: '1.230,00', classes: ['num'] }] },
            { n: 4, cells: [{ text: 'Total', classes: ['header-cell'] }, { text: '=SOMA(', classes: ['active', 'num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Selecione o intervalo com o mouse (ou digite)',
      text: 'Arraste do primeiro valor até o último, ou digite <code>B2:B3</code> direto. Feche o parêntese e aperte Enter.',
      why: 'O intervalo com dois-pontos (:) significa "de... até...". O Excel entende como "some tudo entre a primeira e a última célula desse trecho".',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'B4',
          segments: [{ text: '=' }, { text: 'SOMA', cls: 'fn-name' }, { text: '(' }, { text: 'B2:B3', cls: 'arg-1' }, { text: ')' }]
        },
        tables: [
          { label: 'Aba "Despesas"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Fornecedor', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Papelaria Boa Ideia' }, { text: '450,00', classes: ['arg-1', 'num'] }] },
            { n: 3, cells: [{ text: 'Distribuidora Alfa' }, { text: '1.230,00', classes: ['arg-1', 'num'] }] },
            { n: 4, cells: [{ text: 'Total', classes: ['header-cell'] }, { text: '1.680,00', classes: ['result-highlight', 'num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Some intervalos separados na mesma fórmula',
      text: 'Precisa somar só janeiro e março, pulando fevereiro? Separe os intervalos por ponto e vírgula: <code>=SOMA(B2:B5; B10:B12)</code>.',
      why: 'Cada trecho separado por <code>;</code> é tratado como um argumento independente, o Excel soma todos juntos no final, não importa se estão longe um do outro.',
      visual: { chrome: false, note: 'Atalho: selecione o primeiro intervalo, segure Ctrl e selecione o segundo, o Excel já separa com ; automaticamente.' }
    }
  ],
  tips: [
    'Atalho rápido: selecione as células e olhe a barra de status no rodapé do Excel, ela já mostra a soma sem precisar de fórmula, ótimo para conferências.',
    'O botão AutoSoma (Alt+=) sugere o intervalo automaticamente ao clicar embaixo de uma coluna de números.',
    'SOMA ignora texto e células vazias, não precisa "limpar" a coluna antes.'
  ]
},

{
  slug: 'somase-somases',
  order: 6,
  title: 'SOMASE e SOMASES',
  subtitle: 'soma só o que interessa, aplicando um ou vários filtros dentro da própria fórmula',
  category: 'matematica-agrupamento',
  level: 'Intermediário',
  formulaSyntax: '=SOMASE(intervalo_critério; critério; intervalo_soma)  |  =SOMASES(intervalo_soma; intervalo_critério1; critério1; ...)',
  downloadFile: 'assets/planilhas/06-somase-somases.xlsx',
  problem: 'A planilha tem as vendas do mês inteiro, todos os vendedores misturados. Seu gerente quer saber "quanto a Ana vendeu?" e, na sequência, "quanto a Ana vendeu só em produtos da linha Premium?".',
  steps: [
    {
      title: 'Use SOMASE para um único critério',
      text: 'Para somar só as vendas da Ana: <code>=SOMASE(A:A; "Ana"; C:C)</code>. Primeiro argumento é onde procurar o critério, segundo é o critério em si, terceiro é a coluna que efetivamente será somada.',
      why: 'Repare que a coluna do critério (nomes) e a coluna somada (valores) são diferentes, o Excel varre a primeira procurando "Ana" e soma o valor correspondente na mesma linha da segunda.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'E2',
          segments: [
            { text: '=' }, { text: 'SOMASE', cls: 'fn-name' }, { text: '(' },
            { text: 'A:A', cls: 'arg-1' }, { text: ';' }, { text: '"Ana"', cls: 'arg-2' }, { text: ';' },
            { text: 'C:C', cls: 'arg-3' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Aba "Vendas"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Vendedor', classes: ['header-cell'] }, { text: 'Linha', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana', classes: ['arg-1'] }, { text: 'Premium' }, { text: '800,00', classes: ['arg-3', 'num'] }] },
            { n: 3, cells: [{ text: 'Carlos' }, { text: 'Standard' }, { text: '500,00', classes: ['num'] }] },
            { n: 4, cells: [{ text: 'Ana', classes: ['arg-1'] }, { text: 'Standard' }, { text: '300,00', classes: ['arg-3', 'num'] }] }
          ]}
        ],
        note: 'Resultado: 800 + 300 = 1.100,00, só as linhas da Ana entram na conta.'
      }
    },
    {
      title: 'Quando precisa de dois ou mais filtros ao mesmo tempo, mude para SOMASES',
      text: 'Para "vendas da Ana, só na linha Premium": <code>=SOMASES(C:C; A:A; "Ana"; B:B; "Premium")</code>. Repare que aqui o intervalo de soma vem primeiro, é a maior pegadinha de quem já usa SOMASE.',
      why: 'No SOMASES, a ordem inverte de propósito: primeiro você diz "o que somar" e depois empilha pares de "onde olhar" + "o que precisa ser igual". Isso permite quantos critérios você quiser, um atrás do outro.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'E3',
          segments: [
            { text: '=' }, { text: 'SOMASES', cls: 'fn-name' }, { text: '(' },
            { text: 'C:C', cls: 'arg-1' }, { text: ';' },
            { text: 'A:A', cls: 'arg-2' }, { text: ';' }, { text: '"Ana"', cls: 'arg-2' }, { text: ';' },
            { text: 'B:B', cls: 'arg-3' }, { text: ';' }, { text: '"Premium"', cls: 'arg-3' }, { text: ')' }
          ]
        },
        note: 'Azul = 1º critério (vendedor). Roxo = 2º critério (linha do produto). Ambos precisam bater na mesma linha.'
      }
    },
    {
      title: 'Critérios com operadores também funcionam',
      text: 'Dá para usar <code>"&gt;500"</code>, <code>"&lt;&gt;Ana"</code> (diferente de Ana) ou até um pedacinho de texto com asterisco, tipo <code>"Prod*"</code> para tudo que começa com "Prod".',
      why: 'Os critérios do SOMASE/SOMASES aceitam os mesmos operadores de comparação que você usaria num SE, sempre entre aspas quando misturados com texto ou símbolo.',
      visual: { chrome: false, note: 'Exemplo: =SOMASE(C:C;">1000";C:C) soma só as vendas acima de R$ 1.000.' }
    }
  ],
  tips: [
    'SOMASE = 1 critério. SOMASES = 2 ou mais critérios. É só isso, mesma família, complexidade diferente.',
    'Trave os intervalos com $ se for copiar a fórmula para outras células, igual você faria no PROCX.',
    'Para contar em vez de somar, existem as primas CONT.SE e CONT.SES, com a mesma lógica.'
  ]
},

{
  slug: 'subtotal',
  order: 7,
  title: 'SUBTOTAL',
  subtitle: 'o total que se atualiza sozinho quando você filtra a tabela',
  category: 'matematica-agrupamento',
  level: 'Intermediário',
  formulaSyntax: '=SUBTOTAL(núm_função; intervalo)',
  downloadFile: 'assets/planilhas/07-subtotal.xlsx',
  problem: 'Você tem uma lista de vendas com filtro ativado. Quando filtra só "Região Sul", o total no rodapé continua mostrando a soma de todo mundo, porque um SOMA comum ignora completamente se as linhas estão ocultas ou não.',
  steps: [
    {
      title: 'Veja o problema com SOMA de verdade',
      text: 'Com <code>=SOMA(C2:C6)</code>, filtrando a coluna Região para mostrar só "Sul", o total no rodapé continua o mesmo de antes, ele soma até as linhas escondidas pelo filtro.',
      why: 'SOMA não sabe (nem se importa) se uma linha está visível ou oculta por filtro: ela soma tudo que está no intervalo, ponto final.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Vendas" (filtrada por Sul)', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Região', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }] },
            { n: 3, cells: [{ text: 'Sul', classes: ['result-highlight'] }, { text: '900,00', classes: ['num'] }] },
            { n: 5, cells: [{ text: 'Sul', classes: ['result-highlight'] }, { text: '600,00', classes: ['num'] }] },
            { n: 7, cells: [{ text: 'Total (SOMA)', classes: ['header-cell'] }, { text: '4.200,00', classes: ['error-cell', 'num'] }] }
          ]}
        ],
        note: '4.200 é o total de TODAS as regiões, errado para quem está olhando só o Sul filtrado.'
      }
    },
    {
      title: 'Troque por SUBTOTAL com o código 109',
      text: 'Digite <code>=SUBTOTAL(109; C2:C6)</code>. O número 109 é o "código" para soma que ignora linhas ocultas por filtro (o 9 faz a soma comum, incluindo ocultas, por isso usamos 109).',
      why: 'Cada número de 1 a 11 (ou 101 a 111) representa uma função diferente dentro do SUBTOTAL: 109 é "soma ignorando filtro", 101 é "média ignorando filtro", e assim por diante.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: {
          name: 'C7',
          segments: [
            { text: '=' }, { text: 'SUBTOTAL', cls: 'fn-name' }, { text: '(' },
            { text: '109', cls: 'arg-1' }, { text: ';' }, { text: 'C2:C6', cls: 'arg-2' }, { text: ')' }
          ]
        },
        tables: [
          { label: 'Aba "Vendas" (filtrada por Sul)', cols: ['A', 'B'], rows: [
            { n: 3, cells: [{ text: 'Sul' }, { text: '900,00', classes: ['num'] }] },
            { n: 5, cells: [{ text: 'Sul' }, { text: '600,00', classes: ['num'] }] },
            { n: 7, cells: [{ text: 'Total (SUBTOTAL)', classes: ['header-cell'] }, { text: '1.500,00', classes: ['result-highlight', 'num'] }] }
          ]}
        ],
        note: 'Agora o total muda de verdade quando você troca o filtro.'
      }
    },
    {
      title: 'De onde vem o número 109 (e por que existem dois conjuntos)',
      text: 'Códigos de 1-11 (SOMA=9, MÉDIA=1, CONT.NÚM=2...) incluem linhas ocultas manualmente. Os mesmos +100 (109, 101, 102...) ignoram linhas ocultas manualmente também, não só as filtradas.',
      why: 'Se você às vezes oculta linhas na mão (clique direito > Ocultar) em vez de usar filtro, use sempre a versão +100 para garantir que o total realmente reflita o que está visível.',
      visual: { chrome: false, note: 'Regra prática: use sempre 101 a 111. É a versão que cobre os dois casos (filtro e ocultar manual).' }
    }
  ],
  tips: [
    'SUBTOTAL também é usado automaticamente quando você clica no botão "Total" de uma Tabela do Excel (veja o tutorial de Formatar como Tabela).',
    'Não use SOMA dentro de uma coluna que já tem outros SUBTOTAIS, ele conta os subtotais duas vezes. Por isso o SUBTOTAL ignora outros SUBTOTAIS na soma.',
    'Combine com AutoFiltro para criar relatórios em que o total "reage" ao que o usuário está analisando.'
  ]
},

/* =========================================================
   LIMPEZA E TRATAMENTO DE DADOS
   ========================================================= */

{
  slug: 'remover-duplicatas',
  order: 8,
  title: 'Remover Duplicatas',
  subtitle: 'aquele clique que resolve o cadastro de cliente que foi digitado duas vezes',
  category: 'limpeza-dados',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/08-remover-duplicatas.xlsx',
  problem: 'O cadastro de clientes cresceu ao longo dos anos, com gente diferente digitando. Resultado: "João Pedro Silva" aparece três vezes, com o mesmo CPF, porque cada atendente cadastrou de novo por não achar o cliente na busca.',
  steps: [
    {
      title: 'Selecione a tabela (ou clique em qualquer célula dela)',
      text: 'Clique em qualquer célula dentro da lista de clientes. Não precisa selecionar tudo manualmente, o Excel detecta automaticamente onde a tabela começa e termina.',
      why: 'Se você selecionar só uma coluna sem querer, o Excel remove duplicatas considerando só aquela coluna e pode misturar dados de clientes diferentes por engano.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Clientes"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'CPF', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Cidade', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '111.222.333-44', classes: ['match-highlight'] }, { text: 'João Pedro Silva' }, { text: 'Recife' }] },
            { n: 3, cells: [{ text: '222.333.444-55' }, { text: 'Marta Ramos' }, { text: 'Olinda' }] },
            { n: 4, cells: [{ text: '111.222.333-44', classes: ['match-highlight'] }, { text: 'João Pedro Silva' }, { text: 'Recife' }] }
          ]}
        ]
      }
    },
    {
      title: 'Vá em Dados > Remover Duplicatas',
      text: 'Na faixa de opções, aba Dados, clique em "Remover Duplicatas". Uma janela abre perguntando quais colunas devem ser comparadas para considerar duas linhas "iguais".',
      why: 'Você decide o critério: pode ser só o CPF (o mais seguro, já que não se repete), ou nome + cidade, dependendo do que for mais confiável no seu cadastro.',
      visual: {
        ribbonPath: ['Dados', 'Ferramentas de Dados', 'Remover Duplicatas'],
        dialog: {
          title: 'Remover Duplicatas',
          bodyHtml: `
            <p style="margin:0 0 10px;color:var(--ink-soft);font-size:0.8rem;">Selecione as colunas que contêm duplicatas que você deseja remover.</p>
            <div class="chip-list">
              <span class="chip selected">☑ CPF</span>
              <span class="chip">☐ Nome</span>
              <span class="chip">☐ Cidade</span>
            </div>`,
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Confira o aviso final e o resultado',
      text: 'O Excel mostra quantos valores duplicados foram removidos e quantos únicos restaram. A linha repetida do "João Pedro Silva" desaparece, mantendo apenas a primeira ocorrência.',
      why: 'Essa contagem é o seu comprovante de que a limpeza funcionou, vale anotar antes/depois em planilhas grandes para auditoria.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Clientes" (depois)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'CPF', classes: ['header-cell'] }, { text: 'Nome', classes: ['header-cell'] }, { text: 'Cidade', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '111.222.333-44' }, { text: 'João Pedro Silva' }, { text: 'Recife' }] },
            { n: 3, cells: [{ text: '222.333.444-55' }, { text: 'Marta Ramos' }, { text: 'Olinda' }] }
          ]}
        ],
        note: '1 valor duplicado removido. 2 valores únicos mantidos.'
      }
    }
  ],
  tips: [
    'Antes de remover, faça uma cópia da aba original, a ação de remover duplicatas não tem "desfazer" garantido depois de salvar e fechar.',
    'Se duas linhas têm o mesmo CPF mas cidades diferentes, o Excel considera diferente caso você marque as duas colunas, pense bem em qual coluna define uma "duplicata" de verdade.',
    'Para apenas identificar duplicatas sem apagar (útil para revisar antes), use Formatação Condicional > Realçar Regras de Células > Valores Duplicados.'
  ]
},

{
  slug: 'localizar-substituir',
  order: 9,
  title: 'Localizar e Substituir',
  subtitle: 'troca de uma vez só aquele texto errado espalhado pela planilha inteira',
  category: 'limpeza-dados',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/09-localizar-substituir.xlsx',
  problem: 'Alguém exportou um relatório do sistema antigo e o nome da empresa aparece de cinco jeitos: "Ltda.", "LTDA", "Ltda", "LTDA.", impossível usar isso numa Tabela Dinâmica sem antes padronizar.',
  steps: [
    {
      title: 'Abra a caixa com Ctrl+L',
      text: 'O atalho Ctrl+L abre a janela de Localizar e Substituir direto na aba "Substituir". Também dá para achar em Página Inicial > Localizar e Selecionar.',
      why: 'Fazer isso na mão, célula por célula, em uma planilha de 500 linhas é onde a maioria dos erros de digitação de padronização acontece.',
      visual: {
        ribbonPath: ['Página Inicial', 'Localizar e Selecionar', 'Substituir'],
        dialog: {
          title: 'Localizar e Substituir',
          fields: [
            { label: 'Localizar:', value: 'LTDA.' },
            { label: 'Substituir por:', value: 'Ltda' }
          ],
          actions: ['Localizar Tudo', 'Substituir Tudo']
        }
      }
    },
    {
      title: 'Use "Substituir Tudo" com atenção ao alcance',
      text: 'Clique em "Substituir Tudo" para trocar todas as ocorrências de uma vez. Se quiser limitar a uma coluna específica, selecione a coluna antes de abrir a janela.',
      why: 'Sem selecionar um intervalo antes, o Excel substitui em toda a planilha ativa, o que é ótimo para textos exclusivos, mas arriscado para termos curtos que podem aparecer em outro contexto.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Antes', cols: ['A'], rows: [
            { n: 1, cells: [{ text: 'Fornecedor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Alfa LTDA.', classes: ['error-cell'] }] },
            { n: 3, cells: [{ text: 'Beta Ltda', classes: ['error-cell'] }] },
            { n: 4, cells: [{ text: 'Gama LTDA', classes: ['error-cell'] }] }
          ]},
          { label: 'Depois', cols: ['A'], rows: [
            { n: 1, cells: [{ text: 'Fornecedor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Alfa Ltda', classes: ['result-highlight'] }] },
            { n: 3, cells: [{ text: 'Beta Ltda', classes: ['result-highlight'] }] },
            { n: 4, cells: [{ text: 'Gama Ltda', classes: ['result-highlight'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Use "Opções" para controlar maiúsculas e correspondência exata',
      text: 'Clicando em "Opções >>" na mesma janela, você habilita "Coincidir maiúsculas/minúsculas" e "Coincidir conteúdo da célula inteira" para evitar trocar pedaços de palavras sem querer.',
      why: '"Coincidir célula inteira" evita, por exemplo, que ao substituir "SP" por "São Paulo" o Excel também mexa em uma célula que contém a palavra "responsável" (que tem "sp" no meio).',
      visual: { chrome: false, note: 'Marque "Célula inteira" sempre que o termo buscado for curto ou comum.' }
    }
  ],
  tips: [
    'Localizar e Substituir também funciona em fórmulas, útil para trocar o nome de uma aba referenciada em várias células de uma vez.',
    'Dá para usar coringas: "?" substitui um caractere qualquer, "*" substitui qualquer sequência, quando a opção de "usar caracteres curinga" está marcada.',
    'Sempre confira "Localizar Tudo" antes de "Substituir Tudo" para ver quantas ocorrências existem, evita surpresas.'
  ]
},

{
  slug: 'preenchimento-relampago',
  order: 10,
  title: 'Preenchimento Relâmpago',
  subtitle: 'o Excel aprende o padrão que você começou a digitar e completa o resto sozinho',
  category: 'limpeza-dados',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/10-preenchimento-relampago.xlsx',
  problem: 'Você recebeu uma coluna só com "Nome Completo" e precisa separar em "Primeiro Nome" e "Sobrenome" para um mala direta. Fazer isso na mão em 200 linhas tomaria a tarde inteira.',
  steps: [
    {
      title: 'Digite o resultado esperado na primeira linha, na mão',
      text: 'Na coluna ao lado, escreva manualmente o primeiro nome da primeira pessoa da lista, exatamente como deveria ficar.',
      why: 'O Preenchimento Relâmpago funciona por exemplo: ele observa o que você fez na primeira linha e tenta descobrir a regra usada para chegar naquele resultado.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Contatos"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Nome Completo', classes: ['header-cell'] }, { text: 'Primeiro Nome', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana Paula Souza' }, { text: 'Ana', classes: ['active'] }] },
            { n: 3, cells: [{ text: 'Carlos Eduardo Lima' }, { text: '' }] }
          ]}
        ]
      }
    },
    {
      title: 'Comece a digitar na segunda linha (ou aperte Ctrl+E)',
      text: 'Digite as primeiras letras do segundo resultado ("Carlos") e o Excel já sugere completar tudo automaticamente, em cinza claro. Aperte Enter para aceitar, ou use o atalho Ctrl+E direto.',
      why: 'O Ctrl+E dispara o Preenchimento Relâmpago para a coluna inteira de uma vez, sem precisar digitar exemplo por exemplo em cada linha.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Contatos"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Nome Completo', classes: ['header-cell'] }, { text: 'Primeiro Nome', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana Paula Souza' }, { text: 'Ana' }] },
            { n: 3, cells: [{ text: 'Carlos Eduardo Lima' }, { text: 'Carlos', classes: ['muted'] }] },
            { n: 4, cells: [{ text: 'Marta Ramos' }, { text: 'Marta', classes: ['muted'] }] }
          ]}
        ],
        note: 'Sugestões em cinza claro, apertar Enter aceita todas de uma vez.'
      }
    },
    {
      title: 'Funciona também para juntar, formatar e extrair partes de texto',
      text: 'O mesmo truque serve para juntar "Nome" + "Sobrenome" num só campo, formatar telefones no padrão (00) 00000-0000, ou extrair só o DDD de um número.',
      why: 'O Preenchimento Relâmpago reconhece padrões de texto (não apenas divisão), sempre que a "regra" for visualmente consistente entre as linhas, ele consegue aprender.',
      visual: { chrome: false, note: 'Se o padrão não for consistente (ex.: alguns nomes têm 2 sobrenomes, outros 3), revise as sugestões antes de aceitar.' }
    }
  ],
  tips: [
    'Se o Preenchimento Relâmpago não aparecer sozinho, ative em Arquivo > Opções > Avançado > "Preencher automaticamente valores de célula".',
    'Sempre revise algumas linhas no meio e no fim da lista, o Excel pode acertar o padrão das primeiras linhas e errar em um caso excepcional mais adiante.',
    'Diferente de uma fórmula, o resultado do Preenchimento Relâmpago é texto fixo, se o dado de origem mudar, você precisa rodar de novo.'
  ]
},

{
  slug: 'validacao-dados',
  order: 11,
  title: 'Validação de Dados',
  subtitle: 'cria uma listinha suspensa para impedir que cada um digite o cadastro de um jeito',
  category: 'limpeza-dados',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/11-validacao-dados.xlsx',
  problem: 'Na coluna "Ativo?" do cadastro, um colega digita "Sim", outro "sim", outro "S", outro "Ativo". Na hora de filtrar ou somar por critério, nada bate porque tecnicamente são textos diferentes.',
  steps: [
    {
      title: 'Selecione as células que vão receber a regra',
      text: 'Marque a coluna inteira (ou o intervalo) onde as pessoas vão digitar a informação, nesse caso, a coluna "Ativo?".',
      why: 'A validação se aplica à seleção feita no momento em que você abre a janela, por isso ela deve incluir todas as células futuras da coluna, não só as já preenchidas.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Cadastro"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell'] }, { text: 'Ativo?', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol' }, { text: '', classes: ['arg-1'] }] },
            { n: 3, cells: [{ text: 'Mercado Boa Fé' }, { text: '', classes: ['arg-1'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Vá em Dados > Validação de Dados e escolha "Lista"',
      text: 'Na janela que abre, em "Permitir", escolha "Lista". No campo "Fonte", digite as opções separadas por ponto e vírgula: <code>Sim;Não</code>.',
      why: 'Isso limita o que pode ser digitado na célula a exatamente essas duas opções, eliminando qualquer variação de escrita.',
      visual: {
        ribbonPath: ['Dados', 'Ferramentas de Dados', 'Validação de Dados'],
        dialog: {
          title: 'Validação de Dados',
          fields: [
            { label: 'Permitir:', value: 'Lista' },
            { label: 'Fonte:', value: 'Sim;Não' }
          ],
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Veja a seta suspensa em ação',
      text: 'Ao clicar em qualquer célula da coluna, aparece uma setinha do lado direito. Clicando nela, só aparecem "Sim" e "Não" para escolher, impossível digitar outra coisa.',
      why: 'A lista suspensa elimina erro de digitação porque a pessoa só escolhe, não digita, o mesmo texto exato sempre que alguém marcar "Sim".',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Cadastro"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell'] }, { text: 'Ativo?', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol' }, { text: 'Sim ▾', classes: ['active'] }] }
          ]}
        ],
        menu: { items: [{ label: 'Sim', highlighted: true }, { label: 'Não' }] }
      }
    },
    {
      title: 'Personalize a mensagem de erro (opcional, mas recomendado)',
      text: 'Na aba "Alerta de Erro" da mesma janela, escreva um título e uma mensagem, tipo "Use apenas Sim ou Não". Isso aparece se alguém colar um valor diferente por cima da validação.',
      why: 'Colar valores (Ctrl+V) pode ignorar a lista suspensa em algumas situações, a mensagem de erro personalizada garante que a pessoa entenda por que foi bloqueada.',
      visual: { chrome: false }
    }
  ],
  tips: [
    'Para listas maiores (tipo nomes de 30 vendedores), em vez de digitar tudo na "Fonte", selecione um intervalo de células que já contenha a lista.',
    'Validação de Dados também serve para números (só entre 0 e 100, por exemplo) e datas (só datas futuras), não só para listas de texto.',
    'Combine com Formatação Condicional para destacar em vermelho qualquer célula que, por algum motivo, ainda tenha escapado da regra.'
  ]
},

/* =========================================================
   ANÁLISE VISUAL E ESTRUTURA
   ========================================================= */

{
  slug: 'formatar-como-tabela',
  order: 12,
  title: 'Formatar como Tabela',
  subtitle: 'transforma um intervalo cru em uma Tabela de verdade, com filtro, cor e expansão automática de graça',
  category: 'analise-visual',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/12-formatar-como-tabela.xlsx',
  problem: 'Sua lista de pedidos cresce toda semana. Toda vez que você adiciona uma linha nova embaixo, precisa lembrar de arrastar as fórmulas de novo, e é fácil esquecer uma coluna e deixar o total errado.',
  steps: [
    {
      title: 'Clique dentro dos dados e escolha um estilo',
      text: 'Com o cursor em qualquer célula da lista, vá em Página Inicial > Formatar como Tabela e escolha um estilo de cor. O Excel detecta sozinho onde os dados começam e terminam.',
      why: 'Diferente de só pintar células manualmente, "Formatar como Tabela" cria uma estrutura real que o Excel reconhece, não é só estética.',
      visual: {
        ribbonPath: ['Página Inicial', 'Estilos', 'Formatar como Tabela'],
        tables: [
          { label: 'Aba "Pedidos" (antes)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Pedido' }, { text: 'Cliente' }, { text: 'Valor' }] },
            { n: 2, cells: [{ text: '1001' }, { text: 'Padaria Sol' }, { text: '450,00', classes: ['num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Confirme o intervalo e marque "Minha tabela tem cabeçalhos"',
      text: 'Uma janela pergunta o intervalo de dados (o Excel já sugere certo na maioria das vezes) e se a primeira linha é o cabeçalho.',
      why: 'Se essa opção ficar desmarcada por engano, o Excel trata "Cliente" e "Valor" como se fossem dados, e não nomes de coluna, bagunçando qualquer fórmula que use nome de coluna.',
      visual: {
        dialog: {
          title: 'Formatar como Tabela',
          fields: [{ label: 'Onde estão os dados:', value: '=$A$1:$C$5' }],
          bodyHtml: '<div class="excel-field-row"><label></label><span style="font-size:0.78rem;">☑ Minha tabela tem cabeçalhos</span></div>',
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Veja os três ganhos automáticos',
      text: 'Setas de filtro aparecem em cada cabeçalho, linhas alternam cor para facilitar leitura, e o mais importante: ao digitar uma linha nova logo abaixo, ela já nasce dentro da tabela, com fórmulas e formatação copiadas sozinhas.',
      why: 'Isso resolve exatamente o problema de "esquecer de arrastar a fórmula", a Tabela se expande automaticamente e carrega tudo junto.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Pedidos" (como Tabela)', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Pedido ▾', classes: ['header-cell'] }, { text: 'Cliente ▾', classes: ['header-cell'] }, { text: 'Valor ▾', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '1001' }, { text: 'Padaria Sol' }, { text: '450,00', classes: ['num'] }] },
            { n: 3, cells: [{ text: '1002', classes: ['new-rule'] }, { text: 'Mercado Boa Fé', classes: ['new-rule'] }, { text: '=[@Valor]*1,1', classes: ['new-rule', 'num'] }] }
          ]}
        ],
        note: 'A linha 3 foi digitada agora e já entrou automaticamente na formatação e nas fórmulas da tabela.'
      }
    },
    {
      title: 'Use referências estruturadas em vez de A2, B2',
      text: 'Dentro de uma Tabela, as fórmulas podem usar nomes de coluna: <code>=[@Valor]*1,1</code> em vez de <code>=C2*1,1</code>. Isso funciona automaticamente em toda linha nova.',
      why: 'Fórmulas com nome de coluna são muito mais fáceis de revisar meses depois, "[@Valor]" é autoexplicativo, "C2" não.',
      visual: { chrome: false }
    }
  ],
  tips: [
    'Dê um nome à tabela em Design da Tabela > Nome da Tabela, facilita muito referenciar ela em Tabelas Dinâmicas e outras fórmulas depois.',
    'Use a linha de Totais (Design da Tabela > Linha de Totais) para adicionar soma, média ou contagem automaticamente no rodapé, ela já usa SUBTOTAL por trás.',
    'Se quiser voltar a um intervalo comum, use Converter em Intervalo, a formatação visual fica, mas perde a expansão automática.'
  ]
},

{
  slug: 'tabela-dinamica',
  order: 13,
  title: 'Tabela Dinâmica',
  subtitle: 'resume milhares de linhas em um resultado por vendedor, por mês ou por região, em segundos',
  category: 'analise-visual',
  level: 'Avançado',
  downloadFile: 'assets/planilhas/13-tabela-dinamica.xlsx',
  problem: 'Você tem uma planilha com 3.000 linhas de vendas do ano inteiro. O chefe pede, de última hora, "quanto cada vendedor vendeu por mês?", impossível montar isso com SOMASE um por um antes da reunião das 15h.',
  steps: [
    {
      title: 'Clique dentro dos dados e insira a Tabela Dinâmica',
      text: 'Com o cursor em qualquer célula da base, vá em Inserir > Tabela Dinâmica. O Excel sugere o intervalo de dados e pergunta se você quer criar em uma planilha nova.',
      why: 'Criar em uma planilha nova evita misturar o resumo com os dados brutos, se algo der errado, você não corre o risco de sobrescrever a base original.',
      visual: {
        ribbonPath: ['Inserir', 'Tabelas', 'Tabela Dinâmica'],
        tables: [
          { label: 'Aba "Vendas" (base)', cols: ['A', 'B', 'C', 'D'], rows: [
            { n: 1, cells: [{ text: 'Vendedor', classes: ['header-cell'] }, { text: 'Mês', classes: ['header-cell'] }, { text: 'Região', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana' }, { text: 'Jan' }, { text: 'Sul' }, { text: '800', classes: ['num'] }] },
            { n: 3, cells: [{ text: 'Carlos' }, { text: 'Jan' }, { text: 'Norte' }, { text: '500', classes: ['num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Arraste os campos para as áreas certas',
      text: 'No painel "Campos da Tabela Dinâmica", arraste "Vendedor" para Linhas, "Mês" para Colunas e "Valor" para Valores. Cada campo tem um papel diferente no resultado final.',
      why: '"Linhas" e "Colunas" definem como o resultado é agrupado (por quem e por quando); "Valores" define o que é calculado (soma, por padrão, para números).',
      visual: {
        chips: {
          title: 'Campos da Tabela Dinâmica',
          items: [
            { label: '☰ Vendedor → Linhas', selected: true },
            { label: '☰ Mês → Colunas', selected: true },
            { label: 'Σ Valor → Valores', selected: true },
            { label: 'Região', ghost: true }
          ]
        }
      }
    },
    {
      title: 'Veja o resumo pronto, sem escrever uma fórmula sequer',
      text: 'O resultado já aparece agrupado: cada vendedor em uma linha, cada mês em uma coluna, e o total de vendas no cruzamento, tudo calculado automaticamente pelo Excel.',
      why: 'É exatamente o "quanto cada vendedor vendeu por mês" que o chefe pediu, construído em menos de um minuto, sem SOMASE repetido linha por linha.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Tabela Dinâmica', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Soma de Valor', classes: ['header-cell'] }, { text: 'Jan', classes: ['header-cell'] }, { text: 'Fev', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana', classes: ['header-cell'] }, { text: '800', classes: ['result-highlight', 'num'] }, { text: '650', classes: ['result-highlight', 'num'] }] },
            { n: 3, cells: [{ text: 'Carlos', classes: ['header-cell'] }, { text: '500', classes: ['result-highlight', 'num'] }, { text: '720', classes: ['result-highlight', 'num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Atualize quando os dados mudarem',
      text: 'Se novas vendas forem lançadas na base, a Tabela Dinâmica não atualiza sozinha: clique com o botão direito nela e escolha "Atualizar", ou use o botão Atualizar na aba Analisar Tabela Dinâmica.',
      why: 'A Tabela Dinâmica trabalha com uma "fotografia" dos dados no momento em que foi criada ou atualizada pela última vez, por isso o clique em Atualizar é necessário sempre que a base mudar.',
      visual: { chrome: false }
    }
  ],
  tips: [
    'Clique duas vezes em cima de um número dentro da Tabela Dinâmica: o Excel mostra automaticamente todas as linhas originais que formaram aquele total, ótimo para conferir.',
    'Transforme a base em uma Tabela (veja o tutorial anterior) antes de criar a Dinâmica, assim, ao atualizar, novas linhas entram automaticamente sem precisar redefinir o intervalo.',
    'Combine com Segmentação de Dados (próximo tutorial) para dar ao usuário botões de filtro em vez de menus.'
  ]
},

{
  slug: 'segmentacao-dados',
  order: 14,
  title: 'Segmentação de Dados',
  subtitle: 'transforma o filtro chato de menu em botões grandes de clicar, perfeito para quem não usa Excel todo dia',
  category: 'analise-visual',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/14-segmentacao-dados.xlsx',
  problem: 'Você já montou a Tabela Dinâmica de vendas por vendedor e mês. Mas seu chefe (que não é muito íntimo de Excel) sempre pede "me mostra só a Ana" e fica perdido caçando o filtrinho escondido no cabeçalho.',
  steps: [
    {
      title: 'Clique na Tabela Dinâmica e insira a Segmentação',
      text: 'Com a Tabela Dinâmica selecionada, vá em Inserir > Segmentação de Dados (ou Analisar Tabela Dinâmica > Inserir Segmentação de Dados) e marque o campo "Vendedor".',
      why: 'A Segmentação de Dados só aparece disponível quando você está com o cursor dentro de uma Tabela Dinâmica ou Tabela comum, por isso a ordem dos cliques importa.',
      visual: { ribbonPath: ['Inserir', 'Filtros', 'Segmentação de Dados'] }
    },
    {
      title: 'Veja os botões de filtro aparecerem',
      text: 'Uma caixinha com um botão para cada vendedor aparece na planilha. Clicar em "Ana" filtra a Tabela Dinâmica inteira para mostrar só os dados dela, com um clique só.',
      why: 'Diferente do menu de filtro tradicional, a Segmentação mostra todas as opções visíveis o tempo todo, muito mais amigável para quem não conhece os atalhos do Excel.',
      visual: {
        chips: {
          title: 'Vendedor',
          items: [
            { label: 'Ana', selected: true },
            { label: 'Carlos' },
            { label: 'Marta' }
          ]
        }
      }
    },
    {
      title: 'Conecte a mesma Segmentação a mais de uma Tabela Dinâmica',
      text: 'Clique com o botão direito na Segmentação e escolha "Conexões de Relatório" para ligar o mesmo filtro a outras Tabelas Dinâmicas do arquivo, feitas com a mesma base de dados.',
      why: 'Isso evita ter um botão de filtro para cada tabela, um clique atualiza todos os resumos ao mesmo tempo, ótimo para um painel com vários gráficos e tabelas juntos.',
      visual: { chrome: false }
    }
  ],
  tips: [
    'Você também pode inserir uma Segmentação de Dados em uma Tabela comum (não só em Tabela Dinâmica), desde que ela tenha sido criada com "Formatar como Tabela".',
    'Use a "Linha do Tempo" (Inserir > Linha do Tempo) no lugar da Segmentação quando o campo for uma data, o controle desliza por período em vez de listar cada dia.',
    'Organize as Segmentações lado a lado na parte de cima da planilha, deixando os gráficos e tabelas embaixo, isso lembra um painel de controle de verdade.'
  ]
},

{
  slug: 'graficos',
  order: 15,
  title: 'Gráficos',
  subtitle: 'números convencem menos que uma barra crescendo na tela, monte um gráfico em menos de um minuto',
  category: 'analise-visual',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/15-graficos.xlsx',
  problem: 'Você vai numa reunião apresentar o total de vendas dos últimos 4 meses. Uma tabela de números faz todo mundo olhar o celular; um gráfico de barras crescendo faz todo mundo prestar atenção.',
  steps: [
    {
      title: 'Selecione os dados que vão virar o gráfico',
      text: 'Marque as duas colunas: os rótulos (meses) e os valores (vendas). Não precisa incluir nenhuma célula de total.',
      why: 'O Excel usa a primeira coluna selecionada como o eixo de categorias (embaixo) e a segunda como os valores (a altura das barras).',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Vendas"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Mês', classes: ['header-cell'] }, { text: 'Vendas', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Jan', classes: ['arg-1'] }, { text: '4.200', classes: ['arg-2', 'num'] }] },
            { n: 3, cells: [{ text: 'Fev', classes: ['arg-1'] }, { text: '5.100', classes: ['arg-2', 'num'] }] },
            { n: 4, cells: [{ text: 'Mar', classes: ['arg-1'] }, { text: '3.800', classes: ['arg-2', 'num'] }] },
            { n: 5, cells: [{ text: 'Abr', classes: ['arg-1'] }, { text: '6.400', classes: ['arg-2', 'num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Vá em Inserir > Gráfico de Colunas',
      text: 'Na faixa Inserir, escolha o ícone de Gráfico de Colunas (o mais comum para comparar valores ao longo do tempo) e clique na primeira opção, "Colunas Agrupadas 2D".',
      why: 'Gráfico de colunas é o mais fácil de ler para "comparar valores entre categorias", deixe o gráfico de pizza para mostrar proporções de um total (tipo "% de vendas por região").',
      visual: { ribbonPath: ['Inserir', 'Gráficos', 'Gráfico de Colunas'] }
    },
    {
      title: 'Veja o resultado e ajuste os elementos',
      text: 'O gráfico aparece na hora. Clique nele e use o botão "+" no canto para adicionar título, rótulos de dados (o valor em cima de cada barra) e legenda.',
      why: 'Rótulos de dados eliminam a necessidade de o público "adivinhar" o valor pela altura da barra, ótimo quando você vai imprimir ou enviar por e-mail sem poder explicar ao vivo.',
      visual: {
        chart: {
          title: 'Vendas por Mês',
          bars: [
            { label: 'Jan', value: '4.200', pct: 60 },
            { label: 'Fev', value: '5.100', pct: 73 },
            { label: 'Mar', value: '3.800', pct: 54 },
            { label: 'Abr', value: '6.400', pct: 100 }
          ]
        }
      }
    }
  ],
  tips: [
    'Atalho: selecione os dados e aperte F11, o Excel cria um gráfico padrão em uma aba nova, instantaneamente.',
    'Evite gráficos 3D para dados simples: eles distorcem a percepção de tamanho das barras e dificultam a leitura, não ajudam em nada.',
    'Se os dados mudarem depois, o gráfico se atualiza sozinho, não precisa refazer nada, só conferir se o intervalo de origem ainda está correto.'
  ]
},

/* =========================================================
   FORMATAÇÃO CONDICIONAL
   ========================================================= */

{
  slug: 'formatacao-condicional',
  order: 16,
  title: 'Formatação Condicional',
  subtitle: 'faz a própria célula "gritar" quando algo precisa da sua atenção, sem você precisar checar linha por linha',
  category: 'formatacao-condicional',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/16-formatacao-condicional.xlsx',
  problem: 'Sua planilha de estoque tem 150 produtos. Toda semana você precisa achar, na mão, quais itens estão abaixo do estoque mínimo, e sempre passa um ou outro batido, porque olhar número por número cansa.',
  steps: [
    {
      title: 'Regra de realce de células: destaque o que passou (ou não passou) de um valor',
      text: 'Selecione a coluna de estoque e vá em Página Inicial > Formatação Condicional > Realçar Regras de Células > "É Menor Que". Digite o estoque mínimo (ex.: 20) e escolha um preenchimento vermelho.',
      why: 'Essa é a regra mais direta: "se o número for menor que X, pinta". Perfeita para limites fixos, tipo estoque mínimo ou meta batida.',
      visual: {
        ribbonPath: ['Página Inicial', 'Formatação Condicional', 'Realçar Regras de Células', 'É Menor Que'],
        tables: [
          { label: 'Aba "Estoque"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Produto', classes: ['header-cell'] }, { text: 'Qtd.', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Papel A4' }, { text: '12', classes: ['error-cell', 'num'] }] },
            { n: 3, cells: [{ text: 'Caneta Azul' }, { text: '340', classes: ['num'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Primeiros/Últimos: destaque os campeões e os lanternas',
      text: 'Em Formatação Condicional > Primeiros/Últimos, escolha "10% Superiores" ou "10 Itens Inferiores" para destacar automaticamente os melhores ou piores valores de uma lista.',
      why: 'Diferente da regra anterior (limite fixo), essa se ajusta sozinha: se a lista de vendas mudar mês a mês, quem está no topo ou no fundo é recalculado automaticamente.',
      visual: { chrome: false, note: 'Ótimo para rankings de vendedores ou produtos mais/menos vendidos, sem precisar ordenar a lista.' }
    },
    {
      title: 'Barras de dados: veja a grandeza do número sem ler o número',
      text: 'Selecione uma coluna de valores e vá em Formatação Condicional > Barras de Dados. Cada célula ganha uma barrinha colorida proporcional ao seu valor, direto atrás do número.',
      why: 'O olho humano compara tamanhos de barra muito mais rápido do que compara uma coluna de números, ótimo para uma visão geral rápida antes de entrar em detalhes.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Vendas"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Vendedor', classes: ['header-cell'] }, { text: 'Total', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana' }, { text: '8.200', classes: ['num'], bar: 90 }] },
            { n: 3, cells: [{ text: 'Carlos' }, { text: '4.500', classes: ['num'], bar: 50 }] },
            { n: 4, cells: [{ text: 'Marta' }, { text: '6.100', classes: ['num'], bar: 68 }] }
          ]}
        ]
      }
    },
    {
      title: 'Escalas de cor: um mapa de calor dentro da própria planilha',
      text: 'Em Formatação Condicional > Escalas de Cor, escolha o modelo "Verde-Amarelo-Vermelho". Valores altos ficam verdes, médios amarelos, baixos vermelhos, automaticamente.',
      why: 'É perfeito para enxergar padrões em tabelas grandes (tipo desempenho mensal de vários vendedores) de uma vez, sem precisar ler célula por célula.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Desempenho"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Vendedor', classes: ['header-cell'] }, { text: 'Jan', classes: ['header-cell'] }, { text: 'Fev', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana' }, { text: '92%', classes: ['num'], style: { background: '#63be7b', color: '#0f5c33' } }, { text: '55%', classes: ['num'], style: { background: '#ffeb84', color: '#6b5900' } }] },
            { n: 3, cells: [{ text: 'Carlos' }, { text: '30%', classes: ['num'], style: { background: '#f8696b', color: '#7a1a1a' } }, { text: '80%', classes: ['num'], style: { background: '#a8d98a', color: '#0f5c33' } }] }
          ]}
        ]
      }
    },
    {
      title: 'Conjunto de ícones: sinaleiras direto na célula',
      text: 'Em Formatação Condicional > Conjuntos de Ícones, escolha o modelo de "3 Sinalizações" (bolinha verde, amarela, vermelha) para classificar rapidamente o status de cada linha.',
      why: 'Ícones comunicam status ainda mais rápido que cor de fundo, e funcionam bem mesmo para quem tem alguma dificuldade para distinguir tons de cor parecidos.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Metas"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Vendedor', classes: ['header-cell'] }, { text: '% da Meta', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Ana' }, { text: '108%', classes: ['num'], icon: '🟢' }] },
            { n: 3, cells: [{ text: 'Carlos' }, { text: '76%', classes: ['num'], icon: '🟡' }] },
            { n: 4, cells: [{ text: 'Marta' }, { text: '42%', classes: ['num'], icon: '🔴' }] }
          ]}
        ]
      }
    },
    {
      title: 'Nova Regra com fórmula: para quando nenhum modelo pronto serve',
      text: 'Em Formatação Condicional > Nova Regra > "Usar uma fórmula para determinar quais células devem ser formatadas", digite algo como <code>=E2&lt;HOJE()</code> para pintar vencimentos atrasados, mesmo em colunas de texto ou de outra coluna de referência.',
      why: 'A fórmula te dá liberdade total: a condição pode olhar para outra célula da mesma linha, não só para o próprio valor, como pintar a linha inteira baseada na coluna de status.',
      visual: {
        dialog: {
          title: 'Nova Regra de Formatação',
          fields: [{ label: 'Fórmula:', value: '=$E2<HOJE()' }],
          actions: ['Cancelar', 'Formatar...', 'OK']
        }
      }
    },
    {
      title: 'Gerenciar e limpar regras quando a planilha ficar bagunçada',
      text: 'Em Formatação Condicional > Gerenciar Regras, você vê todas as regras aplicadas, em que ordem são avaliadas, e pode editar, excluir ou reordenar. "Limpar Regras" remove tudo de uma vez se quiser recomeçar.',
      why: 'Regras aplicadas em ordem errada podem se sobrepor e esconder uma à outra, o Gerenciador é o único lugar onde você enxerga o quadro completo de uma vez.',
      visual: {
        ribbonPath: ['Página Inicial', 'Formatação Condicional', 'Gerenciar Regras'],
        menu: {
          items: [
            { label: 'Célula < 20 → Vermelho', highlighted: true, swatch: '#f8696b' },
            { label: 'Barras de Dados → Total', swatch: '#63be7b' },
            { label: 'Escala de Cor → Desempenho', swatch: '#ffeb84' }
          ]
        }
      }
    }
  ],
  tips: [
    'A ordem das regras no Gerenciador importa: regras mais acima são avaliadas primeiro, e você pode marcar "Parar Se Verdadeiro" para impedir que outra regra sobrescreva o resultado.',
    'Formatação Condicional é "visual apenas": ela não muda o valor real da célula, só a aparência, outras fórmulas continuam enxergando o número original.',
    'Para aplicar a mesma regra em uma planilha nova, use o Pincel de Formatação (Página Inicial) depois de selecionar a célula com a regra já pronta.'
  ]
},

/* =========================================================
   FORMATAÇÃO DE CÉLULAS
   ========================================================= */

{
  slug: 'formatos-personalizados',
  order: 17,
  title: 'Formatos Personalizados de Célula',
  subtitle: 'CPF, CNPJ e até "28,3 CX", mostre o número do seu jeito sem mudar o valor por trás',
  category: 'formatacao-celulas',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/17-formatos-personalizados.xlsx',
  problem: 'O CPF foi importado do sistema como puro número: 11122233344. Sem os pontos e traço fica difícil de ler e de conferir. Só que digitar manualmente com pontuação transforma o CPF em texto, dificultando buscas e comparações depois.',
  steps: [
    {
      title: 'Abra Formatar Células com Ctrl+1',
      text: 'Selecione as células com CPF e aperte Ctrl+1. Vá até a categoria "Personalizado", que fica na última posição da lista à esquerda.',
      why: 'Formatos personalizados mudam só a exibição, o valor real por trás continua sendo o número puro, o que mantém fórmulas e comparações funcionando normalmente.',
      visual: { ribbonPath: ['Ctrl + 1', 'Formatar Células', 'Personalizado'] }
    },
    {
      title: 'Digite o código de máscara do CPF',
      text: 'No campo "Tipo", digite <code>000\\.000\\.000\\-00</code>. Cada "0" representa um dígito obrigatório, e as barras invertidas "escapam" o ponto e o traço para aparecerem literalmente.',
      why: 'Sem a barra invertida antes do ponto e do traço, o Excel pode interpretar esses símbolos como parte de outro código de formatação em vez de exibi-los como texto puro.',
      visual: {
        dialog: {
          title: 'Formatar Células',
          fields: [{ label: 'Tipo:', value: '000\\.000\\.000\\-00' }],
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Veja o número puro na barra de fórmulas, e a máscara na célula',
      text: 'Clicando na célula, a barra de fórmulas mostra <code>11122233344</code> (o valor real), mas a célula exibe <code>111.222.333-44</code>. É a mesma ideia usada para CNPJ, trocando a máscara para <code>00\\.000\\.000/0000\\-00</code>.',
      why: 'Isso é diferente de digitar o CPF já com pontuação: aqui o Excel ainda reconhece o conteúdo como número, então funções como CONT.NÚM e comparações continuam funcionando.',
      visual: {
        title: 'Pasta1.xlsx',
        formulaBar: { name: 'A2', segments: [{ text: '11122233344' }] },
        tables: [
          { label: 'Aba "Cadastro"', cols: ['A'], rows: [
            { n: 1, cells: [{ text: 'CPF', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '111.222.333-44', classes: ['result-highlight'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Crie sufixos personalizados, tipo "28,3 CX"',
      text: 'Para mostrar uma quantidade em caixas mantendo o número editável, use o código <code>0.0" CX"</code> no mesmo campo "Tipo". O valor 28,3 vai aparecer como "28,3 CX", mas continua sendo o número 28,3 por trás.',
      why: 'Isso evita a armadilha comum de digitar "28,3 CX" como texto direto na célula, o que impediria de somar, multiplicar ou usar em qualquer fórmula matemática.',
      visual: {
        dialog: {
          title: 'Formatar Células',
          fields: [{ label: 'Tipo:', value: '0.0" CX"' }],
          actions: ['Cancelar', 'OK']
        },
        tables: [
          { label: 'Resultado', cols: ['A'], rows: [
            { n: 1, cells: [{ text: 'Estoque', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '28,3 CX', classes: ['result-highlight'] }] }
          ]}
        ]
      }
    }
  ],
  tips: [
    'Formatos personalizados aceitam até 4 seções separadas por ponto e vírgula: positivo;negativo;zero;texto, permitindo, por exemplo, mostrar negativos em vermelho automaticamente.',
    'Para telefones, um formato útil é <code>(00) 00000\\-0000</code>.',
    'Cuidado: formato personalizado não valida o conteúdo, se alguém digitar letras em vez de números, a máscara simplesmente não aparece. Combine com Validação de Dados quando precisar garantir o formato de entrada.'
  ]
},

/* =========================================================
   ORGANIZAÇÃO DA PLANILHA
   ========================================================= */

{
  slug: 'organizacao-planilha',
  order: 18,
  title: 'Organização da Planilha',
  subtitle: 'congelar painéis, agrupar colunas, ajustar tamanhos e quebrar texto, os ajustes que fazem a planilha parecer profissional',
  category: 'organizacao-planilha',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/18-organizacao-planilha.xlsx',
  problem: 'Sua planilha tem 40 colunas. Toda vez que você rola para a direita para ver os dados de dezembro, perde de vista o nome do cliente que ficava lá na coluna A, e volta pra conferir a cada duas colunas.',
  steps: [
    {
      title: 'Congelar Painéis: mantenha cabeçalho e primeira coluna sempre visíveis',
      text: 'Clique na célula logo abaixo e à direita do que você quer congelar (geralmente B2), vá em Exibir > Congelar Painéis > "Congelar Painéis". A linha 1 e a coluna A ficam fixas ao rolar.',
      why: 'O Excel congela tudo que está acima e à esquerda da célula selecionada, por isso a escolha da célula de referência é o único "truque" dessa função.',
      visual: {
        ribbonPath: ['Exibir', 'Janela', 'Congelar Painéis'],
        tables: [
          { label: 'Aba "Vendas" (rolada para a direita)', cols: ['A', 'H', 'I'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell', 'frozen-edge'] }, { text: 'Nov', classes: ['header-cell', 'frozen-edge-bottom'] }, { text: 'Dez', classes: ['header-cell', 'frozen-edge-bottom'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol', classes: ['frozen-edge'] }, { text: '4.200', classes: ['num'] }, { text: '5.100', classes: ['num'] }] }
          ]}
        ],
        note: 'A borda verde marca onde a "trava" do congelamento fica, tudo à esquerda/acima dela não rola.'
      }
    },
    {
      title: 'Agrupar e Desagrupar: esconda colunas auxiliares sem apagá-las',
      text: 'Selecione as colunas de cálculo intermediário (que ninguém mais precisa ver), vá em Dados > Agrupar. Um pequeno "−" aparece acima das colunas, permitindo recolher tudo com um clique.',
      why: 'Diferente de ocultar colunas direto (Ctrl+0), o Agrupamento deixa visível que existe algo recolhido ali, evitando que alguém pense que a coluna nunca existiu.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Colunas agrupadas (recolhidas)', cols: ['A', '[+]', 'D'], rows: [
            { n: 1, cells: [{ text: 'Produto', classes: ['header-cell'] }, { text: '', classes: ['muted', 'center'] }, { text: 'Total', classes: ['header-cell'] }] }
          ]}
        ],
        note: 'Clicar no "+" reabre as colunas B e C, escondidas pelo agrupamento.'
      }
    },
    {
      title: 'Ajustar largura e altura automaticamente',
      text: 'Dê duplo clique na linha divisória entre duas letras de coluna (ex.: entre B e C) para que a largura se ajuste sozinha ao conteúdo mais longo. O mesmo vale para altura de linha, na divisória entre números.',
      why: 'Isso evita o clássico "###" que aparece quando uma coluna numérica é estreita demais para mostrar o valor inteiro.',
      visual: { chrome: false, note: 'Atalho para várias colunas de uma vez: selecione todas e dê duplo clique em qualquer divisória selecionada.' }
    },
    {
      title: 'Quebrar Texto Automaticamente: para textos longos sem esticar a coluna',
      text: 'Selecione a célula com o texto longo (tipo uma observação) e clique em "Quebrar Texto Automaticamente" na aba Página Inicial. A célula cresce em altura, não em largura, mostrando o texto em várias linhas.',
      why: 'Isso é essencial quando a coluna precisa manter uma largura fixa (para caber na impressão, por exemplo) mas o conteúdo varia de tamanho entre as linhas.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Ocorrências"', cols: ['A', 'B'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell'] }, { text: 'Observação', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: 'Padaria Sol' }, { text: 'Aguardando confirmação do pedido de reposição de estoque', classes: ['result-highlight'] }] }
          ]}
        ]
      }
    },
    {
      title: 'Alinhamento: organize visualmente números, textos e títulos',
      text: 'Use os botões de alinhamento (esquerda, centro, direita, no topo, no meio, embaixo) na aba Página Inicial. Um padrão comum: texto alinhado à esquerda, números à direita, títulos centralizados.',
      why: 'Números alinhados à direita facilitam comparar casas decimais visualmente, é assim que o Excel já alinha número por padrão, e vale manter essa convenção.',
      visual: { chrome: false }
    }
  ],
  tips: [
    'Congele só o que realmente precisa: congelar linhas e colunas demais deixa pouco espaço de tela útil para os dados.',
    'Para recolher grupos de linhas (não só colunas), o processo é o mesmo, Dados > Agrupar, selecionando linhas em vez de colunas.',
    'Depois de ajustar larguras, salve, o Excel lembra o ajuste manual, mas não reajusta sozinho se o conteúdo mudar bastante depois.'
  ]
},

/* =========================================================
   BOAS PRÁTICAS DE ESTRUTURA
   ========================================================= */

{
  slug: 'centralizar-selecao',
  order: 19,
  title: 'Centralizar Seleção (em vez de Mesclar e Centralizar)',
  subtitle: 'o mesmo efeito visual de um título centralizado, sem quebrar fórmulas, filtros ou macros depois',
  category: 'boas-praticas',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/19-centralizar-selecao.xlsx',
  problem: 'Você mesclou A1 até C1 para centralizar o título "Relatório de Vendas". Meses depois, tenta ordenar ou filtrar a planilha e recebe um aviso de erro, ou pior: a ordenação bagunça tudo porque uma célula mesclada não se comporta como as outras.',
  steps: [
    {
      title: 'Veja por que "Mesclar e Centralizar" é arriscado',
      text: 'Ao mesclar A1:C1, o Excel transforma três células em uma só, fisicamente. Isso pode confundir filtros, ordenação, referências de fórmula ($A$1 vira ambíguo) e trava macros que esperam uma célula por vez.',
      why: 'Mesclar não é "só visual": é uma mudança estrutural na planilha, e estruturas diferentes de uma linha para outra são a origem clássica de erro de "referência inválida".',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Com Mesclar e Centralizar', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Relatório de Vendas', classes: ['merged-look', 'error-cell'] }, { text: '', classes: ['muted'] }, { text: '', classes: ['muted'] }] }
          ]}
        ],
        note: 'Fisicamente virou 1 célula só, qualquer fórmula que espere "C1" separado vai encontrar uma célula vazia.'
      }
    },
    {
      title: 'Selecione o intervalo e abra Formatar Células (Ctrl+1)',
      text: 'Em vez de mesclar, selecione A1:C1 normalmente (sem mesclar nada) e aperte Ctrl+1 para abrir Formatar Células, na aba "Alinhamento".',
      why: 'Aqui você vai pedir para o Excel simular o centro visual, sem de fato apagar a divisão entre as células.',
      visual: { ribbonPath: ['Ctrl + 1', 'Formatar Células', 'Alinhamento'] }
    },
    {
      title: 'Escolha "Centralizado na Seleção" no alinhamento horizontal',
      text: 'No campo "Horizontal", troque de "Geral" para "Centralizado na Seleção" e clique OK. O texto de A1 aparece visualmente centralizado sobre A1:C1, mas B1 e C1 continuam existindo, vazias e disponíveis.',
      why: 'Isso entrega exatamente o mesmo resultado visual do "Mesclar e Centralizar", só que sem fundir as células, filtros, ordenação e fórmulas continuam enxergando três células normais.',
      visual: {
        dialog: {
          title: 'Formatar Células',
          fields: [{ label: 'Horizontal:', value: 'Centralizado na Seleção' }],
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Compare o resultado final',
      text: 'Visualmente é idêntico ao mesclado. Mas agora, se você inserir uma fórmula em B1 no futuro, ou usar um filtro na planilha, nada quebra, porque a estrutura de três colunas continua intacta.',
      why: 'A regra de ouro: mesclar é para quando você tem certeza absoluta que nunca vai precisar filtrar, ordenar ou automatizar aquela área. Na dúvida, use Centralizar Seleção.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Com Centralizar Seleção', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Relatório de Vendas', classes: ['result-highlight', 'center'] }, { text: '', classes: ['result-highlight'] }, { text: '', classes: ['result-highlight'] }] }
          ]}
        ],
        note: 'Mesmo visual, mas A1, B1 e C1 continuam sendo três células de verdade.'
      }
    }
  ],
  tips: [
    'Reserve "Mesclar e Centralizar" apenas para títulos impressos que nunca serão filtrados, ordenados ou lidos por fórmula/macro.',
    'Se você já tem células mescladas numa planilha antiga, selecione-as, clique em "Mesclar e Centralizar" de novo para desfazer, e aplique "Centralizado na Seleção" no lugar.',
    'Essa técnica funciona também na vertical (centralizar um texto entre várias linhas), usando a mesma janela de Alinhamento.'
  ]
},

/* =========================================================
   SEGURANÇA E IMPRESSÃO
   ========================================================= */

{
  slug: 'proteger-planilha',
  order: 20,
  title: 'Proteger Planilha ou Tabela',
  subtitle: 'trave as fórmulas importantes e deixe livre só onde as pessoas realmente precisam digitar',
  category: 'seguranca-impressao',
  level: 'Intermediário',
  downloadFile: 'assets/planilhas/20-proteger-planilha.xlsx',
  problem: 'Você monta uma planilha de controle de caixa cheia de fórmulas, compartilha com a equipe, e uma semana depois alguém apaga sem querer a fórmula de total ao tentar digitar um valor na célula errada.',
  steps: [
    {
      title: 'Primeiro, desbloqueie as células onde as pessoas VÃO digitar',
      text: 'Por padrão, todas as células do Excel já vêm marcadas como "bloqueadas", só que isso só tem efeito depois que você proteger a planilha. Selecione as células de entrada de dados, Ctrl+1 > Proteção, e desmarque "Bloqueada".',
      why: 'Se você pular esse passo, ao proteger a planilha NINGUÉM conseguirá digitar em lugar nenhum, inclusive onde deveria ser permitido.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Caixa"', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Data', classes: ['header-cell'] }, { text: 'Valor', classes: ['header-cell'] }, { text: 'Total', classes: ['header-cell'] }] },
            { n: 2, cells: [{ text: '01/09', classes: ['arg-1'] }, { text: '250,00', classes: ['arg-1', 'num'] }, { text: '=SOMA(B:B)', classes: ['locked-cell', 'num'] }] }
          ]}
        ],
        note: 'Azul = células que vamos desbloquear (entrada de dados). Hachurado = fórmula que continuará travada.'
      }
    },
    {
      title: 'Vá em Revisão > Proteger Planilha',
      text: 'Com o desbloqueio feito, vá até a aba Revisão e clique em "Proteger Planilha". Uma janela pede uma senha (opcional) e permite escolher o que ainda pode ser feito mesmo com a proteção ativa, como "Selecionar células desbloqueadas" ou "Formatar células".',
      why: 'A senha é opcional de propósito: em muitos casos, o objetivo não é "esconder segredo", e sim evitar erro acidental de quem usa a planilha no dia a dia, a proteção sem senha já resolve isso.',
      visual: {
        ribbonPath: ['Revisão', 'Proteger', 'Proteger Planilha'],
        dialog: {
          title: 'Proteger Planilha',
          fields: [{ label: 'Senha (opcional):', value: '••••••' }],
          bodyHtml: `<div class="chip-list">
            <span class="chip selected">☑ Selecionar células desbloqueadas</span>
            <span class="chip">☐ Formatar células</span>
            <span class="chip">☐ Inserir linhas</span>
          </div>`,
          actions: ['Cancelar', 'OK']
        }
      }
    },
    {
      title: 'Veja o resultado: fórmula protegida, entrada de dados liberada',
      text: 'Agora, ao tentar clicar e editar a célula de Total, o Excel bloqueia e mostra um aviso. Mas a célula de Valor continua editável normalmente.',
      why: 'Isso é exatamente o equilíbrio que você quer: liberdade onde é seguro, trava onde um erro custaria caro.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Aba "Caixa" (protegida)', cols: ['A', 'B', 'C'], rows: [
            { n: 2, cells: [{ text: '01/09' }, { text: '250,00', classes: ['active', 'num'] }, { text: '250,00', classes: ['locked-cell', 'num'] }] }
          ]}
        ],
        note: '"Esta célula está protegida contra gravação", aviso ao tentar editar a coluna Total.'
      }
    }
  ],
  tips: [
    'Para proteger a estrutura do arquivo inteiro (impedir excluir/renomear abas), use Revisão > Proteger Pasta de Trabalho, além de Proteger Planilha.',
    'Se você usa uma Tabela do Excel, é possível proteger só a tabela via Design da Tabela, mantendo o resto da planilha livre.',
    'Guarde a senha em um cofre de senhas ou gerenciador, o Excel não tem "esqueci minha senha" para planilhas protegidas.'
  ]
},

{
  slug: 'imprimir-titulos',
  order: 21,
  title: 'Imprimir Títulos',
  subtitle: 'repete o cabeçalho da tabela em todas as páginas impressas, ninguém mais recebe um relatório sem saber o que é cada coluna',
  category: 'seguranca-impressao',
  level: 'Iniciante',
  downloadFile: 'assets/planilhas/21-imprimir-titulos.xlsx',
  problem: 'Você imprime um relatório de 10 páginas com centenas de linhas. Todo mundo entende a página 1, que tem o cabeçalho "Cliente | Produto | Valor" no topo, mas nas páginas 2 em diante, ninguém sabe mais qual coluna é qual.',
  steps: [
    {
      title: 'Vá em Layout da Página > Imprimir Títulos',
      text: 'Na faixa de opções, clique em Layout da Página e depois em "Imprimir Títulos", dentro do grupo "Configurar Página". Uma janela específica de impressão se abre.',
      why: 'Essa configuração é separada da visualização normal da planilha, ela só afeta o que sai na impressão (ou no PDF gerado a partir da impressão), sem alterar a tela do dia a dia.',
      visual: { ribbonPath: ['Layout da Página', 'Configurar Página', 'Imprimir Títulos'] }
    },
    {
      title: 'Defina "Linhas a repetir na parte superior"',
      text: 'No campo indicado, clique no ícone de seleção e marque a linha 1 (o cabeçalho da tabela) diretamente na planilha. O campo vai preencher sozinho com <code>$1:$1</code>.',
      why: 'O <code>$1:$1</code> significa "linha 1 inteira, sempre", é isso que garante que o cabeçalho apareça igual em todas as páginas, não só na primeira.',
      visual: {
        dialog: {
          title: 'Configurar Página',
          fields: [{ label: 'Linhas a repetir:', value: '$1:$1' }],
          actions: ['Cancelar', 'Visualizar Impressão', 'OK']
        }
      }
    },
    {
      title: 'Confira em Visualizar Impressão',
      text: 'Aperte Ctrl+P para abrir a visualização e navegue até a página 2 ou 3. O cabeçalho "Cliente | Produto | Valor" agora aparece no topo dessas páginas também, exatamente como na primeira.',
      why: 'Conferir antes de imprimir (ou exportar para PDF) evita gastar papel ou mandar um relatório incompleto para o cliente errado.',
      visual: {
        title: 'Pasta1.xlsx',
        chrome: false,
        tables: [
          { label: 'Página 2 do relatório impresso', cols: ['A', 'B', 'C'], rows: [
            { n: 1, cells: [{ text: 'Cliente', classes: ['header-cell', 'result-highlight'] }, { text: 'Produto', classes: ['header-cell', 'result-highlight'] }, { text: 'Valor', classes: ['header-cell', 'result-highlight'] }] },
            { n: 48, cells: [{ text: 'Mercado Boa Fé' }, { text: 'Papel A4' }, { text: '450,00', classes: ['num'] }] }
          ]}
        ],
        note: 'Linha 48 na planilha real, mas o cabeçalho repete no topo de cada página impressa.'
      }
    }
  ],
  tips: [
    'Não confunda com "Congelar Painéis": aquele afeta a tela enquanto você trabalha, este afeta a impressão/PDF.',
    'Também é possível repetir uma coluna à esquerda em vez de uma linha no topo, útil quando a planilha é mais larga que alta.',
    'Combine com Quebras de Página (Layout da Página > Quebras) para controlar exatamente onde cada página termina, evitando cortar uma linha de dados ao meio.'
  ]
}

];

function getTutorialBySlug(slug) {
  return TUTORIALS.find(t => t.slug === slug);
}

function getCategoryLabel(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  return cat ? cat.label : id;
}
