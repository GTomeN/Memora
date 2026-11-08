import useAgora from './useAgora'
import { alertasPendentes, contatoResponsavel } from '../utils/cascata'

function useAlertas(eventos, remedios, contatos, editarEvento) {
  const agora = useAgora()

  const pendentes = alertasPendentes(eventos)
  const maisNovosPrimeiro = [...pendentes].sort((a, b) => new Date(b.horarioEvento) - new Date(a.horarioEvento))

  const alertas = maisNovosPrimeiro.map((evento) => {
    const remedio = remedios.find((item) => item.id === evento.remedioId)
    const responsavel = contatoResponsavel(evento, contatos, agora)
    return { evento, remedio, responsavel }
  })

  async function marcarVisto(alerta) {
    let quemViu = 'Painel'
    if (alerta.responsavel) {
      quemViu = alerta.responsavel.nome
    }

    return editarEvento(alerta.evento.id, {
      ...alerta.evento,
      visto: true,
      vistoPor: quemViu,
      vistoEm: new Date().toISOString(),
    })
  }

  return { alertas, marcarVisto }
}

export default useAlertas
