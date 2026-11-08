import { useState } from 'react'
import { DOSE_RETIRADA, DOSE_ATRASADA, FORA_DE_HORA, ARMAZENAMENTO_RUIM } from '../constants/tiposEvento'
import { COMPARTIMENTOS } from '../constants/compartimentos'
import { temperaturaRuim } from '../utils/regrasDose'
import { novoEvento } from '../utils/eventos'

function useSimulador(eventos, adicionarEvento, removerEvento, editarRemedio) {
  const [mensagem, setMensagem] = useState('')

  async function simularRetirada(dose) {
    if (dose.status === 'RETIRADA') {
      setMensagem(`A dose das ${dose.horario} já saiu da caixa hoje. Abrir de novo conta como abertura fora de hora.`)
      return
    }

    const remedio = dose.remedio
    const deuCerto = await adicionarEvento(novoEvento(DOSE_RETIRADA, remedio, dose.horario, new Date()))
    if (!deuCerto) {
      return
    }

    if (remedio.estoque > 0) {
      await editarRemedio(remedio.id, { ...remedio, estoque: remedio.estoque - 1 })
    }
    setMensagem(`Simulação registrada: o ${remedio.nome} das ${dose.horario} saiu da caixa.`)
  }

  async function simularAtraso(dose) {
    const deuCerto = await adicionarEvento(novoEvento(DOSE_ATRASADA, dose.remedio, dose.horario, new Date()))
    if (deuCerto) {
      setMensagem(`Simulação registrada: a dose das ${dose.horario} não saiu da caixa no horário.`)
    }
  }

  async function simularForaDeHora(dose) {
    const deuCerto = await adicionarEvento(novoEvento(FORA_DE_HORA, dose.remedio, dose.horario, new Date()))
    if (deuCerto) {
      setMensagem(`Simulação registrada: alguém tentou abrir o compartimento da ${COMPARTIMENTOS[dose.compartimento]} fora de hora.`)
    }
  }

  async function simularTemperatura(dose, temperatura) {
    const remedio = dose.remedio
    if (!temperaturaRuim(temperatura, remedio)) {
      setMensagem(`${temperatura} °C está dentro do limite do ${remedio.nome}. Nenhum aviso foi criado.`)
      return
    }

    const evento = novoEvento(ARMAZENAMENTO_RUIM, remedio, dose.horario, new Date(), temperatura)
    const deuCerto = await adicionarEvento(evento)
    if (deuCerto) {
      setMensagem(`Simulação registrada: ${temperatura} °C está acima do limite do ${remedio.nome}.`)
    }
  }

  async function limparEventos() {
    for (const evento of eventos) {
      await removerEvento(evento.id)
    }
    setMensagem('Os eventos simulados foram apagados.')
  }

  return { mensagem, simularRetirada, simularAtraso, simularForaDeHora, simularTemperatura, limparEventos }
}

export default useSimulador
