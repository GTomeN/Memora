import { MINUTOS_LEMBRETE, MINUTOS_NO_HORARIO, LIMITE_TEMPERATURA_PADRAO } from '../constants/regras'
import { DOSE_RETIRADA, ARMAZENAMENTO_RUIM } from '../constants/tiposEvento'
import { horarioEmMinutos, minutosEntre, dataComHorario, mesmoDia } from './datas'

export function compartimentoDoHorario(horario) {
  const minutos = horarioEmMinutos(horario)

  if (minutos < 12 * 60) {
    return 1
  }
  if (minutos < 18 * 60) {
    return 2
  }
  return 3
}

export function retiradaNoHorario(horarioPrevisto, horarioRetirada) {
  const atraso = minutosEntre(horarioPrevisto, horarioRetirada)
  return atraso <= MINUTOS_NO_HORARIO
}

export function statusDaDose(horarioPrevisto, agora, foiRetirada) {
  if (foiRetirada) {
    return 'RETIRADA'
  }

  const minutosPassados = minutosEntre(horarioPrevisto, agora)

  if (minutosPassados < 0) {
    return 'PENDENTE'
  }
  if (minutosPassados < MINUTOS_LEMBRETE) {
    return 'AGORA'
  }
  if (minutosPassados < MINUTOS_NO_HORARIO) {
    return 'LEMBRETE'
  }
  return 'ATRASADA'
}

export function temperaturaRuim(temperatura, remedio) {
  let limite = LIMITE_TEMPERATURA_PADRAO
  if (remedio && remedio.limiteTemperatura) {
    limite = remedio.limiteTemperatura
  }
  return temperatura > limite
}

function buscarRetirada(eventos, remedioId, horarioPrevisto) {
  return eventos.find((evento) => {
    return (
      evento.tipo === DOSE_RETIRADA &&
      evento.remedioId === remedioId &&
      minutosEntre(evento.horarioPrevisto, horarioPrevisto) === 0
    )
  })
}

export function montarDosesDoDia(remedios, eventos, agora) {
  const doses = []

  for (const remedio of remedios) {
    if (!remedio.ativo) {
      continue
    }

    for (const horario of remedio.horarios) {
      const horarioPrevisto = dataComHorario(agora, horario)
      const retirada = buscarRetirada(eventos, remedio.id, horarioPrevisto)

      let horarioRetirada = null
      if (retirada) {
        horarioRetirada = retirada.horarioEvento
      }

      doses.push({
        chave: `${remedio.id}-${horario}`,
        remedio,
        horario,
        compartimento: compartimentoDoHorario(horario),
        status: statusDaDose(horarioPrevisto, agora, Boolean(retirada)),
        horarioRetirada,
      })
    }
  }

  return doses.sort((a, b) => horarioEmMinutos(a.horario) - horarioEmMinutos(b.horario))
}

export function statusDaCaixa(doses, eventos, agora) {
  if (doses.some((dose) => dose.status === 'ATRASADA')) {
    return 'DOSE_ATRASADA'
  }

  const temperaturaRuimHoje = eventos.some((evento) => {
    return evento.tipo === ARMAZENAMENTO_RUIM && !evento.visto && mesmoDia(evento.horarioEvento, agora)
  })
  if (temperaturaRuimHoje) {
    return 'ARMAZENAMENTO_RUIM'
  }

  if (doses.some((dose) => dose.status === 'LEMBRETE')) {
    return 'LEMBRETE'
  }
  if (doses.some((dose) => dose.status === 'AGORA')) {
    return 'HORA_DA_DOSE'
  }
  return 'AGUARDANDO'
}

export function horariosDosRemedios(remedios) {
  const horarios = []
  for (const remedio of remedios) {
    if (!remedio.ativo) {
      continue
    }
    for (const horario of remedio.horarios) {
      if (!horarios.includes(horario)) {
        horarios.push(horario)
      }
    }
  }
  return horarios.sort((a, b) => horarioEmMinutos(a) - horarioEmMinutos(b))
}
