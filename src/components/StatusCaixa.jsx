const TEXTOS = {
  AGUARDANDO: 'Tudo tranquilo. Nenhuma dose para agora.',
  HORA_DA_DOSE: 'Está na hora de uma dose. A caixa acendeu o compartimento certo.',
  LEMBRETE: 'A caixa está repetindo o lembrete de voz.',
  DOSE_ATRASADA: 'Uma dose ainda não saiu da caixa. Que tal ligar para ela?',
  ARMAZENAMENTO_RUIM: 'O lugar onde os remédios ficam está quente demais.',
}

function StatusCaixa({ status }) {
  return (
    <section
      aria-label="Status da caixa"
      data-status={status}
      className="rounded-3xl bg-ok-50 p-6 text-ok-700
        data-[status=DOSE\_ATRASADA]:bg-atencao-50 data-[status=DOSE\_ATRASADA]:text-atencao-800
        data-[status=LEMBRETE]:bg-info-50 data-[status=LEMBRETE]:text-info-700
        data-[status=HORA\_DA\_DOSE]:bg-info-50 data-[status=HORA\_DA\_DOSE]:text-info-700
        data-[status=ARMAZENAMENTO\_RUIM]:bg-atencao-50 data-[status=ARMAZENAMENTO\_RUIM]:text-atencao-800">

      <h3 className="text-base font-bold">Como está a caixa</h3>
      <p className="mt-2 text-2xl font-bold">{TEXTOS[status]}</p>
    </section>
  )
}

export default StatusCaixa
