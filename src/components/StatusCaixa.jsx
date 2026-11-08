const TEXTOS = {
  AGUARDANDO: 'Tudo tranquilo. Nenhuma dose para agora.',
  HORA_DA_DOSE: 'Está na hora de uma dose. A caixa acendeu o compartimento certo.',
  LEMBRETE: 'A caixa está repetindo o lembrete de voz.',
  DOSE_ATRASADA: 'Uma dose ainda não saiu da caixa. Que tal ligar para ela?',
  ARMAZENAMENTO_RUIM: 'O lugar onde os remédios ficam está quente demais.',
}

function StatusCaixa({ status }) {
  return (
    <section aria-label="Status da caixa">
      <h3>Como está a caixa</h3>
      <p>{TEXTOS[status]}</p>
    </section>
  )
}

export default StatusCaixa
