import { compartimentoDoHorario } from './regrasDose'
import { dataComHorario } from './datas'

export function novoEvento(tipo, remedio, horario, agora, temperatura = null) {
  return {
    remedioId: remedio.id,
    compartimento: compartimentoDoHorario(horario),
    tipo,
    horarioPrevisto: dataComHorario(agora, horario).toISOString(),
    horarioEvento: new Date(agora).toISOString(),
    temperatura,
    visto: false,
    vistoPor: null,
    vistoEm: null,
  }
}
