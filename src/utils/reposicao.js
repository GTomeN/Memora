import { DIAS_AVISO_REPOSICAO } from '../constants/regras'

export function diasAteAcabar(remedio) {
  const dosesPorDia = remedio.horarios.length
  if (dosesPorDia === 0) {
    return null
  }
  return Math.floor(remedio.estoque / dosesPorDia)
}

export function precisaRepor(remedio) {
  const dias = diasAteAcabar(remedio)
  if (dias === null) {
    return false
  }
  return dias <= DIAS_AVISO_REPOSICAO
}
