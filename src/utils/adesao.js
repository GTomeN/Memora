import { DOSE_RETIRADA } from '../constants/tiposEvento'
import { mesmoDia } from './datas'
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
