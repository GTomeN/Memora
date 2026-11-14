# Memora · Painel do Cuidador

> Painel web para o familiar que cuida de uma pessoa idosa com Alzheimer: mostra se o remédio de cada horário saiu da caixa e avisa quando algo precisa de atenção.

**Site publicado:** https://memora-painel.vercel.app
**Global Solution 2026.2 · CitizenTech · FIAP · Engenharia de Software, 1º ano**

> O Memora é um **apoio ao cuidado**. Ele não substitui o cuidador, o médico ou o farmacêutico.
> Pessoas e telefones do projeto são **fictícios**. Remédios e horários são **exemplos**, não são prescrição.
---

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| Nome da CitizenTech | Memora |
| Cidade e bairro | São Paulo, [preencher bairro] |
| Cidadão beneficiado | Pessoa idosa com Alzheimer em estágio inicial ou moderado que passa parte do dia sozinha em casa, e o familiar que cuida dela. |
| Problema, em uma frase | Idosos com Alzheimer esquecem de tomar o remédio ou tomam a mesma dose duas vezes, e o familiar que cuida não tem como saber disso quando não está presente. |
| Como funciona | No horário da dose, a caixa acende só o compartimento certo e toca um lembrete com a voz gravada da família; um sensor confirma se o remédio foi retirado. Se não for, o cuidador recebe um alerta no painel e no WhatsApp, e uma tentativa de abrir outro compartimento fora de hora também é avisada. A caixa também vigia a temperatura onde os remédios ficam guardados e funciona mesmo sem internet. |
| O que cada parte faz | **Sensor (Edge):** ESP32 no Wokwi e caixa física com 3 compartimentos. **Lógica (Python):** Central do Cuidador em terminal com JSON. **Matemática (DPS):** modelo da concentração do remédio no corpo. **Interface e Interação (Front-end + Web Dev):** este painel web. **Experiência (STXD):** jornada, requisitos, casos de uso e protótipo. **Pitch (Storytelling):** vídeo de 3 minutos e marca. |
| Link do repositório | https://github.com/GTomeN/Memora |
| Indicador de impacto | Taxa de adesão: % de doses retiradas no horário, por semana. Complementares: doses perdidas, tentativas de dose dupla bloqueadas e tempo médio até o cuidador responder a um alerta. |
| ODS conectados | ODS 3 (Saúde e bem-estar) como principal; ODS 10 (Redução das desigualdades) como secundário. |

---

## O que o painel faz

| Tela | Para que serve |
|---|---|
| **Hoje** | Responde em segundos à pergunta "ela tomou o remédio?": status da caixa, doses do dia com a cor de cada compartimento, aviso de reposição e banner de alertas pendentes. Tem uma área de **simulação** de eventos, porque não há uma caixa real ligada ao painel. |
| **Remédios** | Cadastro, consulta, edição e exclusão de remédios, com dosagem, horários, estoque e temperatura máxima. |
| **Rede de cuidado** | Quem recebe os avisos e em que ordem. Se um aviso não é visto em 10 minutos, ele passa para a próxima pessoa da fila. |
| **Lembrete de voz** | Grava, pelo microfone do navegador, a mensagem que a caixa toca na hora de cada dose. |
| **Histórico** | Taxa de adesão da semana, resultado de cada dia e outros números (doses perdidas, tentativas fora de hora, tempo de resposta). |
| **Alertas** | Avisos que precisam de atenção, com quem está sendo avisado agora e o botão "Vi o aviso". |

---

## Tecnologias

- React com Vite
- React Router (`react-router-dom`)
- Axios
- MockAPI.io como API externa
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- Fonte Atkinson Hyperlegible (Google Fonts)
- Deploy na Vercel

---

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19 ou mais recente (ou 22.12+)
- npm (vem junto com o Node)

### Instalação

```bash
git clone https://github.com/GTomeN/Memora.git
cd Memora
npm install
```

Depois, copie o arquivo `.env.example` para um arquivo novo chamado `.env`:

```bash
cp .env.example .env
```

No Windows (PowerShell), use `copy .env.example .env`.

> **Importante:** sem o `.env`, o painel não sabe onde buscar os dados e a tela fica em branco. Se você criar o `.env` com o servidor já rodando, pare (`Ctrl + C`) e rode `npm run dev` de novo: o Vite só lê o `.env` quando liga.

O `.env.example` já vem com as URLs da MockAPI do projeto, então não é preciso criar conta nem mudar nada:

- `VITE_API_URL` guarda os resources `remedios` e `contatos`.
- `VITE_API_URL_EVENTOS` guarda o resource `eventos`. Ele fica em outro projeto da MockAPI porque o plano grátis permite só 2 resources por projeto.

### Execução

```bash
npm run dev
```

Abra http://localhost:5173 no navegador.

### Dados de exemplo (opcional)

Para começar com dados fictícios já cadastrados (3 remédios, 3 contatos e os eventos dos últimos 8 dias):

```bash
npm run seed
```

> **Atenção:** o seed **apaga tudo** o que estiver nos resources `remedios`, `contatos` e `eventos` antes de cadastrar os dados de exemplo. Como a MockAPI é a mesma do projeto, os dados também mudam no site publicado.

---

## Estrutura do código

A lógica de negócio e o acesso aos dados ficam separados dos componentes que desenham a tela.

```
src/
├── pages/        6 telas, uma por rota (Hoje, Remédios, Rede de cuidado...)
├── components/   componentes visuais reutilizáveis (CardDose, FormRemedio, ConfirmDialog...)
├── hooks/        custom hooks com a lógica e o estado (useRemedios, useDosesDeHoje, useAdesao...)
├── services/     acesso à MockAPI com Axios (api.js, remediosService.js...)
├── utils/        regras de negócio puras: validações, datas, adesão, fila de avisos
├── constants/    valores fixos: tipos de evento, compartimentos, regras de tempo
├── config/       dados da pessoa acompanhada
└── index.css     Tailwind: cores, fonte e classes reutilizáveis do Memora
```

---

## Requisitos atendidos

| Requisito | Onde está |
|---|---|
| React com Vite | Projeto criado com Vite |
| Estilização com Tailwind CSS | `src/index.css` e as classes em todos os componentes |
| No mínimo 8 componentes | 17 componentes em `src/components` |
| `useState` e `useEffect` | Hooks em `src/hooks` (ex.: `useRemedios`) e formulários |
| No mínimo 2 custom hooks | 9 hooks em `src/hooks` |
| Separação de responsabilidades | `services` (dados), `utils` e `hooks` (lógica), `components` e `pages` (tela) |
| API externa com CRUD | MockAPI: remédios e contatos com criar, consultar, editar e excluir |
| Funcionalidades ligadas ao tema | Status das doses, fila de avisos, simulação da caixa, adesão semanal |
| Git com 15+ commits | Histórico do repositório |
| `AI.md` na raiz | [AI.md](AI.md) |

---

## Design e acessibilidade

O painel foi pensado para quem o usa de verdade: um familiar que abre no celular, com pressa, entre uma tarefa e outra, só para saber se a pessoa tomou o remédio.

- **Mobile-first.** O layout é feito primeiro para o celular. No computador, o menu vai para a lateral e o conteúdo ganha largura máxima, para a leitura não cansar.
- **Cores com significado.** Verde-pinho calmo como base, verde para "tudo certo", azul para "acontecendo agora" e âmbar para "precisa de você". Não há vermelho: o cuidador já vive preocupado, e o alerta se destaca justamente porque o resto da tela é calmo.
- **As cores da caixa no painel.** Amarelo (manhã), laranja (tarde) e azul (noite) aparecem na faixa de cada dose e no logo, iguais aos compartimentos da caixa física.
- **Cor nunca sozinha.** Todo status também é escrito em texto, para quem não distingue cores e para leitores de tela.
- **Texto legível.** Fonte Atkinson Hyperlegible, criada para pessoas com baixa visão. Texto do corpo em 18px e nada abaixo de 16px.
- **Contraste.** Textos com contraste de 5,8:1 ou mais (o mínimo da WCAG é 4,5:1) e bordas dos campos com 3,3:1 ou mais (o mínimo é 3:1).
- **Toque fácil.** Botões com no mínimo 48px de altura. No celular, a ação principal fica embaixo, perto do polegar.
- **Proteção contra erros.** Excluir é o botão menos chamativo e sempre pede confirmação.
- **Leitores de tela.** Menu com `aria-current`, status com `role="status"`, erros com `role="alert"`, textos de apoio com `sr-only` e elementos decorativos com `aria-hidden`.
- **Movimento reduzido.** As animações só rodam se a pessoa não pediu "reduzir movimento" no sistema (`motion-safe:`).
- **Foco visível** para quem navega pelo teclado.

---

## Lembrete de voz

A tela **Lembrete de voz** grava o áudio pelo microfone do navegador, usando a API `MediaRecorder`. Cada horário tem um lembrete de até 15 segundos.

Os áudios ficam guardados **só no navegador** (no `localStorage`), não na MockAPI. Por isso, eles não aparecem em outro computador ou em outro navegador. Na caixa real, o áudio seria enviado para o dispositivo pela parte de Edge do projeto.

---

## Uso de Inteligência Artificial

O uso de IA no projeto está documentado no arquivo [AI.md](AI.md): ferramentas usadas, para quê, o que foi gerado e como o grupo validou e ajustou o resultado.

---

## Integrantes

| Nome completo | RM |
|---|---|
| Eric Kang | 572575 |
| Guilherme Tomé Nogueira | 570144 |
| Lucas de Andrade Astorini | 569119 |
| Sabrina Lopes da Silva | 571870 |
| Sofia Satomi Hagio | 569120 |

---