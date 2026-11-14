import { formatarDia } from '../utils/datas'

function textoDoDia(dia) {
  if (dia.futuro) {
    return 'Ainda não chegou.'
  }
  if (dia.previstas === 0) {
    return 'Nenhuma dose prevista.'
  }
  return `${dia.noHorario} de ${dia.previstas} doses saíram no horário (${dia.taxa}%).`
}

function CalendarioAdesao({ dias }) {
  return (
    <ul aria-label="Calendário da semana" className="grid gap-3 sm:grid-cols-2">
      {dias.map((dia) => {
        const temDados = !dia.futuro && dia.previstas > 0

        return (
          <li
            key={dia.data.toDateString()}
            data-futuro={dia.futuro}
            className="cartao data-[futuro=true]:bg-fundo data-[futuro=true]:text-tinta-suave"
          >
            <h4 className="font-bold capitalize">{formatarDia(dia.data)}</h4>
            <p className="mt-1 text-base text-tinta-suave">{textoDoDia(dia)}</p>

            {temDados && (
              <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-linha">
                <div className="h-full rounded-full bg-ok-700" style={{ width: `${dia.taxa}%` }} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default CalendarioAdesao