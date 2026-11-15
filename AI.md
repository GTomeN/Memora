# Uso de Inteligência Artificial

Este arquivo documenta como o grupo usou ferramentas de Inteligência Artificial no painel web do **Memora**, nas disciplinas de *Web Development* e *Front-end Design*. As duas disciplinas usam a mesma aplicação, mas cada parte teve um responsável e uma forma diferente de usar a IA, por isso elas aparecem em seções separadas.

| Parte | Responsável |
|---|---|
| Web Development (lógica, hooks, API, CRUD, deploy) | Guilherme Tomé Nogueira |
| Front-end Design (estilização com Tailwind CSS, layout e acessibilidade) | Sabrina Lopes da Silva |

---

## 1. Ferramentas utilizadas

| Ferramenta | Onde foi usada | Finalidade |
|---|---|---|
| **Claude** (claude.ai) | Web Development e Front-end | Planejamento inicial do projeto (Web Development); consulta sobre conceitos, revisão de código, exercícios e explicações, geração de parte do código de estilização|
| **Claude Code** | Web Development | Geração da maior parte do código da lógica, hooks, integração com a API e telas, além de testes, ajuda com Git, configuração do deploy e documentação. |
| **ChatGPT** | Front-end | Geração de ideias para o logo do Memora. |

---

## 2. Web Development

A parte de Web Development foi feita com o **Claude Code**, principalmente para esclarecer dúvidas, auxiliar na compreensão de conceitos e tecnologias, pesquisar alternativas e sugerir caminhos para resolver dificuldades que surgiram durante o desenvolvimento. Seu papel foi semelhante ao de uma fonte de consulta: as respostas serviram como referência para que o integrante pudesse analisar as possibilidades e decidir como prosseguir.

### 2.1 O que a IA gerou

- Adaptação da estrutura do projeto com Vite, rotas com `react-router-dom`.
- Auxilio com os Services com axios e o CRUD de remédios, contatos e eventos na MockAPI.
- Regras de negócio como funções puras em `utils/` (dose no horário, cascata de avisos, adesão, reposição e temperatura).
- O script de seed com dados fictícios
- O README e um guia dos componentes para a parte de Front-end.

### 2.2 Como o resultado da IA foi validado

As sugestões recebidas não foram consideradas corretas automaticamente. Quando necessário, foram comparadas com os requisitos da atividade, analisadas e testadas antes de serem utilizadas. A implementação, a escolha das soluções, os testes e a validação ficaram sob responsabilidade do integrante. Alguns problemas encontrados no caminho:

- **URLs erradas no `.env`:** as URLs copiadas da MockAPI vinham com `/:endpoint` no final, e as chamadas iam para o endereço errado.
- **Campos com nome errado na MockAPI** (`name`, `whatssap`, `remedioID`): a edição do schema deu erro, e os resources foram recriados.
- **Avisos do lint nos hooks** (estado alterado direto no `useEffect` e `new Date()` a cada renderização): os dois foram corrigidos.
- **Páginas com erro 404 na Vercel** ao recarregar fora da página inicial: resolvido com o `vercel.json`.

### 2.3 Decisões do integrante

- Usar Vite em vez de Next.js, e a MockAPI dividida em duas contas por causa do limite do plano grátis.
- Manter o código o mais simples possível, e deixar os arquivos de referência fora do repositório.
- Colocar as URLs reais da MockAPI no `.env.example`, para o projeto rodar sem configuração, e escolher o endereço do site publicado.

---

## 3. Front-end Design

A estilização do painel foi feita em conjunto com o **Claude**, numa conversa que acompanhou todo o trabalho de Front-end. A integrante escrevia o código, enviava o código e um print da tela, e o Claude apontava os erros, explicava o motivo de cada um e propunha o próximo exercício. Depois de cada etapa, ela respondia perguntas sobre as decisões de design para garantir que sabia explicar o que tinha feito.

### 3.1 O que foi construído em exercícios

Nestas partes, a integrante escreveu o código a partir de explicações e exercícios, e o Claude revisou e apontou o que precisava ser corrigido:

- Instalação e configuração do Tailwind CSS v4 no Vite.
- Cores do Memora no `@theme` e estilo base da página (`@layer base`).
- Header, menu de navegação e layout responsivo (menu em linha no celular e na lateral no computador).
- Status da caixa e cartões de dose (cores por status com `data-*`, faixa colorida por compartimento e a variante `group`).
- Banner de alertas.
- Formulários de remédios e de contatos.
- Cartão de alerta.

### 3.2 O que a IA gerou

Para cumprir o prazo, partes do código nas versões finais veio pronto do Claude. A integrante revisou, aplicou, testou no navegador e respondeu perguntas sobre cada parte antes de commitar:

- Classes reutilizáveis no `index.css` (`cartao`, `botao`, `botao-primario`, `botao-secundario`, `botao-discreto`, `rotulo`, `campo`, `erro-campo`) e a paleta completa do `@theme`.
- Componentes `Carregando`, `MensagemErro`, `ConfirmDialog`, `SimuladorEventos` e `AvisoReposicao`.
- Listas de remédios e de contatos e a estilização das páginas Remédios, Rede de cuidado e Alertas.
- Telas Lembrete de voz e Histórico (incluindo o calendário da semana).
- Desenho do logo em SVG e do favicon, a partir de uma ideia gerada no ChatGPT.
- Revisão do README.

### 3.3 Como o resultado da IA foi validado

As respostas da IA não foram aceitas automaticamente. Alguns exemplos de problemas encontrados nos testes:

- **Classes com `_` que não funcionavam.** O guia de estilização do projeto sugeria `data-[status=DOSE_ATRASADA]`, mas o Tailwind troca `_` por espaço dentro de colchetes. O status atrasado continuava verde. A correção foi escapar o caractere: `DOSE\_ATRASADA`.
- **A cor do compartimento sumia.** A IA afirmou que a faixa esquerda do cartão de dose manteria a cor do compartimento mesmo com uma borda de status. No teste, a integrante viu que as faixas ficavam verdes ou âmbar e perdiam o amarelo, o laranja e o azul. A correção foi pintar só as outras bordas (`border-y-` e `border-r-`).
- **Texto abaixo de 16px.** O código gerado usava `text-sm` (14px) no cabeçalho, o que quebra o requisito de tamanho mínimo do grupo. Foi trocado por `text-base`.
- **Borda dos campos sem contraste.** A borda proposta pela IA tinha contraste de cerca de 1,3:1, abaixo do mínimo de 3:1 da WCAG. Foi criada uma cor nova (`borda-campo`) e os contrastes de todas as cores foram conferidos pela fórmula da WCAG.
- **Verde quase igual ao fundo.** A integrante notou que o cartão de dose "tudo certo" se misturava com o fundo da página. Foi criado um tom intermediário (`ok-100`) com borda verde, sem usar um verde forte que roubasse o destaque dos alertas.

### 3.4 Decisões da integrante

Algumas decisões partiram da própria integrante, e outras sugestões da IA foram recusadas ou adiadas:

- Fundo leve nos campos dos formulários para diferenciá-los do cartão.
- Sombra lateral no menu do computador no lugar da borda, e sombra no topo do celular escondendo a barra de rolagem.
- Placeholders de exemplo nos formulários ("Branco, azul", "Filha, filho, etc").
- Escolha do logo com as mãos segurando as doses do dia, entre as opções geradas no ChatGPT.
- A máscara automática para os horários (ex.: `08:00`) foi deixada para o roadmap, porque mexeria na validação já pronta da parte de Web Development a poucos dias da entrega.

---

## 4. Considerações finais

A IA ajudou o grupo a esclarecer dúvidas, aprender ferramentas novas e ganhar velocidade. Em todas as partes, as respostas foram avaliadas, testadas e comparadas com os requisitos antes de entrar no projeto. Os exemplos da seção 3.3 mostram que a ferramenta também erra, e que testar no navegador foi essencial para encontrar esses erros. A responsabilidade pelas escolhas, pela implementação e pela validação do resultado permaneceu com os integrantes.
