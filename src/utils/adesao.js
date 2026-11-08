import { DOSE_RETIRADA } from '../constants/tiposEvento'
import { mesmoDia, minutosEntre, diaFuturo } from './datas'
import { retiradaNoHorario } from './regrasDose'

export function dosesPrevistasPorDia(remedios) {
  let total = 0
  for (const remedio of remedios) {
    if (remedio.ativo) {
      total += remedio.horarios.length
    }
  }
  return total
}

export function contarRetiradasNoHorario(eventos, dias) {
  const retiradas = eventos.filter((evento) => {
    if (evento.tipo !== DOSE_RETIRADA) {
      return false
    }
    const dentroDosDias = dias.some((dia) => mesmoDia(dia, evento.horarioPrevisto))
    return dentroDosDias && retiradaNoHorario(evento.horarioPrevisto, evento.horarioEvento)
  })
  return retiradas.length
}

export function taxaDeAdesao(eventos, remedios, dias) {
  const previstas = dosesPrevistasPorDia(remedios) * dias.length
  if (previstas === 0) {
    return 0
  }

  const noHorario = contarRetiradasNoHorario(eventos, dias)
  return Math.round((noHorario / previstas) * 100)
}

export function contarRetiradas(eventos, dias) {
  const retiradas = eventos.filter((evento) => {
    return evento.tipo === DOSE_RETIRADA && dias.some((dia) => mesmoDia(dia, evento.horarioPrevisto))
  })
  return retiradas.length
}

export function contarEventosDoTipo(eventos, tipo, dias) {
  const encontrados = eventos.filter((evento) => {
    return evento.tipo === tipo && dias.some((dia) => mesmoDia(dia, evento.horarioEvento))
  })
  return encontrados.length
}

export function dosesPerdidas(eventos, remedios, diasPassados) {
  const previstas = dosesPrevistasPorDia(remedios) * diasPassados.length
  const perdidas = previstas - contarRetiradas(eventos, diasPassados)
  if (perdidas < 0) {
    return 0
  }
  return perdidas
}

export function tempoMedioDeResposta(eventos, dias) {
  const vistos = eventos.filter((evento) => {
    return evento.visto && evento.vistoEm && dias.some((dia) => mesmoDia(dia, evento.horarioEvento))
  })
  if (vistos.length === 0) {
    return null
  }

  let soma = 0
  for (const evento of vistos) {
    soma += minutosEntre(evento.horarioEvento, evento.vistoEm)
  }
  return Math.round(soma / vistos.length)
}

export function resumoDoDia(eventos, remedios, dia, agora) {
  const previstas = dosesPrevistasPorDia(remedios)

  if (diaFuturo(dia, agora)) {
    return { data: dia, futuro: true, previstas, noHorario: 0, taxa: null }
  }

  return {
    data: dia,
    futuro: false,
    previstas,
    noHorario: contarRetiradasNoHorario(eventos, [dia]),
    taxa: taxaDeAdesao(eventos, remedios, [dia]),
  }
}
