import { useState } from 'react'
import useRemedios from '../hooks/useRemedios'
import useEventos from '../hooks/useEventos'
import useDosesDeHoje from '../hooks/useDosesDeHoje'
import useSimulador from '../hooks/useSimulador'
import StatusCaixa from '../components/StatusCaixa'
import CardDose from '../components/CardDose'
import AvisoReposicao from '../components/AvisoReposicao'
import AlertaBanner from '../components/AlertaBanner'
import { alertasPendentes } from '../utils/cascata'
import SimuladorEventos from '../components/SimuladorEventos'
import ConfirmDialog from '../components/ConfirmDialog'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'

function Hoje() {
  const remediosApi = useRemedios()
  const eventosApi = useEventos()
  const { doses, status } = useDosesDeHoje(remediosApi.remedios, eventosApi.eventos)
  const simulador = useSimulador(
    eventosApi.eventos,
    eventosApi.adicionarEvento,
    eventosApi.removerEvento,
    remediosApi.editarRemedio,
  )
  const [confirmarLimpeza, setConfirmarLimpeza] = useState(false)

  const carregando = remediosApi.carregando || eventosApi.carregando
  const quantidadeAlertas = alertasPendentes(eventosApi.eventos).length

  async function limpar() {
    setConfirmarLimpeza(false)
    await simulador.limparEventos()
  }

  return (
    <section className="space-y-6">
      <h2>Hoje</h2>

      <MensagemErro mensagem={remediosApi.erro} />
      <MensagemErro mensagem={eventosApi.erro} />

      {carregando && <Carregando texto="Carregando as doses de hoje..." />}

      {!carregando && (
        <>
          <AlertaBanner quantidade={quantidadeAlertas} />
          <StatusCaixa status={status} />
          <AvisoReposicao avisos={remediosApi.avisosReposicao} />

          <div>
            <h3 className="mb-3 text-xl font-bold">Doses de hoje</h3>
            {doses.length === 0 && (
              <p className="cartao text-tinta-suave">
                Nenhuma dose prevista para hoje. Cadastre os remédios na tela Remédios.
              </p>
            )}
            <div className="grid gap-3">
              {doses.map((dose) => (
                <CardDose key={dose.chave} dose={dose} />
              ))}
            </div>
          </div>

          <SimuladorEventos
            doses={doses}
            mensagem={simulador.mensagem}
            onRetirada={simulador.simularRetirada}
            onAtraso={simulador.simularAtraso}
            onForaDeHora={simulador.simularForaDeHora}
            onTemperatura={simulador.simularTemperatura}
            onLimpar={() => setConfirmarLimpeza(true)}
          />
        </>
      )}

      {confirmarLimpeza && (
        <ConfirmDialog
          mensagem="Apagar todos os eventos simulados? O histórico e os alertas vão ficar vazios."
          textoConfirmar="Sim, apagar"
          onConfirmar={limpar}
          onCancelar={() => setConfirmarLimpeza(false)}
        />
      )}
    </section>
  )
}

export default Hoje
