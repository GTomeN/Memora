import { MINUTOS_LEMBRETE, MINUTOS_NO_HORARIO, LIMITE_TEMPERATURA_PADRAO } from '../constants/regras'
import { horarioEmMinutos, minutosEntre } from './datas'

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
