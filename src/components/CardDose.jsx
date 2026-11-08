import { COMPARTIMENTOS } from '../constants/compartimentos'
import { formatarHora } from '../utils/datas'

function textoDoStatus(dose) {
  if (dose.status === 'RETIRADA') {
    return `Tudo certo: o remédio saiu da caixa às ${formatarHora(dose.horarioRetirada)}.`
  }
  if (dose.status === 'AGORA') {
    return 'É a hora desta dose.'
  }
  if (dose.status === 'LEMBRETE') {
    return 'O lembrete de voz está tocando de novo.'
  }
  if (dose.status === 'ATRASADA') {
    return `A dose das ${dose.horario} ainda não saiu da caixa. Que tal ligar para ela?`
  }
  return `Prevista para as ${dose.horario}.`
}

function CardDose({ dose }) {
  return (
    <article>
      <h3>Remédio da {COMPARTIMENTOS[dose.compartimento]} · {dose.horario}</h3>
      <p>{dose.remedio.nome} · {dose.remedio.dosagem}</p>
      <p>{textoDoStatus(dose)}</p>
    </article>
  )
}

export default CardDose
