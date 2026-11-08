# Memora · Painel do Cuidador

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| Nome da CitizenTech | Memora |
| Cidade e bairro | São Paulo, [preencher bairro] |
| Cidadão beneficiado | Pessoa idosa com Alzheimer em estágio inicial ou moderado que passa parte do dia sozinha em casa, e o familiar que cuida dela. |
| Problema, em uma frase | Idosos com Alzheimer esquecem de tomar o remédio ou tomam a mesma dose duas vezes, e o familiar que cuida não tem como saber disso quando não está presente. |
| Como funciona | No horário da dose, a caixa acende só o compartimento certo e toca um lembrete com a voz gravada da família; um sensor confirma se o remédio foi retirado. Se não for, o cuidador recebe um alerta no painel e no WhatsApp, e uma tentativa de abrir outro compartimento fora de hora também é avisada. A caixa também vigia a temperatura onde os remédios ficam guardados e funciona mesmo sem internet. |
| O que cada parte faz | Sensor (Edge): ESP32 no Wokwi e caixa física com 3 compartimentos. Lógica (Python): Central do Cuidador em terminal com JSON. Matemática (DPS): modelo da concentração do remédio no corpo. Interface e Interação (Front-end + Web Dev): painel web em React para o cuidador, com CRUD de remédios, horários e contatos. Experiência (STXD): jornada, requisitos, casos de uso e protótipo. Pitch (Storytelling): vídeo de 3 minutos e marca. |
| Link do repositório | https://github.com/GTomeN/Memora |
| Indicador de impacto | Taxa de adesão: % de doses retiradas no horário, por semana. Complementares: doses perdidas, tentativas de dose dupla bloqueadas e tempo médio até o cuidador responder a um alerta. |
| ODS conectados | ODS 3 (Saúde e bem-estar) como principal; ODS 10 (Redução das desigualdades) como secundário. |

## Sobre o projeto

O Memora é um porta-remédios conectado para a pessoa idosa com Alzheimer que passa parte do dia sozinha. Este repositório tem o **painel web do cuidador**, onde o familiar:

- vê se o remédio de cada horário saiu da caixa;
- cadastra os remédios e os horários;
- organiza a rede de cuidado, ou seja, quem recebe os avisos e em que ordem;
- grava o lembrete de voz que toca na hora da dose;
- acompanha o histórico e a taxa de adesão da semana;
- recebe os alertas e marca "Vi o aviso".

Como não há uma caixa real conectada ao painel, a tela **Hoje** tem uma área de simulação para criar eventos (remédio retirado, tentativa fora de hora, temperatura alta).

> O Memora é um **apoio ao cuidado**. Ele não substitui o cuidador, o médico ou o farmacêutico.
> Todos os dados do projeto são **fictícios**: pessoas, telefones e remédios ("Remédio A", "Remédio B").

## Tecnologias

- React com Vite
- React Router (`react-router-dom`)
- Axios
- MockAPI.io como API externa
- Tailwind CSS (parte de Front-end)
- Deploy na Vercel

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19 ou mais recente (ou 22.12+)
- npm (vem junto com o Node)

## Instalação

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

O `.env.example` já vem com as URLs da MockAPI do projeto, então não é preciso criar conta nem mudar nada:

- `VITE_API_URL` guarda os resources `remedios` e `contatos`.
- `VITE_API_URL_EVENTOS` guarda o resource `eventos`. Ele fica em outro projeto da MockAPI porque o plano grátis permite só 2 resources por projeto.

Os dados da MockAPI são todos fictícios.

### Dados de exemplo (opcional)

Para começar com dados fictícios já cadastrados (3 remédios, 3 contatos e os eventos dos últimos 8 dias):

```bash
npm run seed
```

> Atenção: o seed **apaga tudo** o que estiver nos resources `remedios`, `contatos` e `eventos` antes de cadastrar os dados de exemplo. Como a MockAPI é a mesma do projeto, os dados também mudam no site publicado.

## Execução

```bash
npm run dev
```

Abra http://localhost:5173 no navegador.

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera a versão de produção na pasta `dist` |
| `npm run preview` | Abre a versão de produção localmente |
| `npm run lint` | Verifica o código com o oxlint |
| `npm run seed` | Apaga os dados da MockAPI e cadastra os dados de exemplo |

## Lembrete de voz

A tela **Lembrete de voz** grava o áudio pelo microfone do navegador, usando a API `MediaRecorder`. Cada horário tem um lembrete de até 15 segundos.

Os áudios ficam guardados **só no navegador** (no `localStorage`), não na MockAPI. Por isso, eles não aparecem em outro computador ou em outro navegador. Na caixa real, o áudio seria enviado para o dispositivo pela parte de Edge do projeto.

## Integrantes

Veja o arquivo [Integrantes.md](Integrantes.md).
