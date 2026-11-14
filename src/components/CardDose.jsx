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
    <article className="group cartao border-l-8
        data-[compartimento='1']:border-l-manha
        data-[compartimento='2']:border-l-tarde
        data-[compartimento='3']:border-l-noite
        
        data-[status=RETIRADA]:bg-ok-100
        data-[status=RETIRADA]:border-y-ok-300
        data-[status=RETIRADA]:border-r-ok-300
        data-[status=AGORA]:bg-info-50
        data-[status=LEMBRETE]:bg-info-50
        data-[status=ATRASADA]:bg-atencao-50
        data-[status=ATRASADA]:border-y-atencao-300
        data-[status=ATRASADA]:border-r-atencao-300"
      data-status={dose.status}
      data-compartimento={dose.compartimento}
    >
      <h3 className="text-base font-bold text-tinta-suave">Remédio da {COMPARTIMENTOS[dose.compartimento]} · {dose.horario}</h3>
      <p className="mt-1 text-xl font-bold">{dose.remedio.nome} · {dose.remedio.dosagem}</p>
      <p className="mt-2 text-tinta-suave
      group-data-[status=RETIRADA]:font-bold 
      group-data-[status=RETIRADA]:text-ok-700
      group-data-[status=AGORA]:font-bold 
      group-data-[status=AGORA]:text-info-700
      group-data-[status=LEMBRETE]:font-bold 
      group-data-[status=LEMBRETE]:text-info-700
      group-data-[status=ATRASADA]:font-bold 
      group-data-[status=ATRASADA]:text-atencao-800"
      >{textoDoStatus(dose)}</p>
    </article>
  )
}

export default CardDose
