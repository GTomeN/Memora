import { DOSE_ATRASADA, FORA_DE_HORA } from '../constants/tiposEvento'
import { COMPARTIMENTOS } from '../constants/compartimentos'
import { formatarHora } from '../utils/datas'

function textoDoAlerta(alerta) {
  const evento = alerta.evento

  let nomeRemedio = 'um remédio que foi excluído'
  if (alerta.remedio) {
    nomeRemedio = alerta.remedio.nome
  }

  if (evento.tipo === DOSE_ATRASADA) {
    return `A dose das ${formatarHora(evento.horarioPrevisto)} (${nomeRemedio}) ainda não saiu da caixa. Que tal ligar para ela?`
  }
  if (evento.tipo === FORA_DE_HORA) {
    return `Tentaram abrir o compartimento da ${COMPARTIMENTOS[evento.compartimento]} fora de hora. A caixa não liberou o remédio.`
  }
  return `O local dos remédios chegou a ${evento.temperatura} °C, acima do limite do ${nomeRemedio}.`
}

function textoDoResponsavel(responsavel) {
  if (!responsavel) {
    return 'Ninguém está na fila de avisos. Cadastre alguém na Rede de cuidado.'
  }
  if (responsavel.autorizaWhatsapp) {
    return `Avisando agora: ${responsavel.nome}, pelo painel e pelo WhatsApp.`
  }
  return `Avisando agora: ${responsavel.nome}, só pelo painel.`
}

function CardAlerta({ alerta, onVisto }) {
  return (
    <article data-tipo={alerta.evento.tipo}
      className="cartao border-l-8
        data-[tipo=DOSE\_ATRASADA]:bg-atencao-50
        data-[tipo=DOSE\_ATRASADA]:border-l-atencao-300
        data-[tipo=FORA\_DE\_HORA]:bg-info-50
        data-[tipo=FORA\_DE\_HORA]:border-l-info-700
        data-[tipo=ARMAZENAMENTO\_RUIM]:bg-atencao-50
        data-[tipo=ARMAZENAMENTO\_RUIM]:border-l-atencao-300"
    >
      <p className="text-base font-bold text-tinta-suave">Aviso das {formatarHora(alerta.evento.horarioEvento)}</p>
      <p className="mt-1 text-xl font-bold leading-snug">{textoDoAlerta(alerta)}</p>
      <p className="mt-2 text-tinta-suave">{textoDoResponsavel(alerta.responsavel)}</p>
      <button type="button" onClick={() => onVisto(alerta)}
        className="botao-primario mt-4 w-full sm:w-auto">Vi o aviso</button>
    </article>
  )
}

export default CardAlerta
