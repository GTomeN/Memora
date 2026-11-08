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
    <ul aria-label="Calendário da semana">
      {dias.map((dia) => (
        <li key={dia.data.toDateString()}>
          <h4>{formatarDia(dia.data)}</h4>
          <p>{textoDoDia(dia)}</p>
        </li>
      ))}
    </ul>
  )
}

export default CalendarioAdesao
