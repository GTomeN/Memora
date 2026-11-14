import useRemedios from '../hooks/useRemedios'
import useEventos from '../hooks/useEventos'
import useAdesao from '../hooks/useAdesao'
import CalendarioAdesao from '../components/CalendarioAdesao'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'
import { formatarData } from '../utils/datas'

function textoTempoResposta(minutos) {
  if (minutos === null) {
    return 'Nenhum aviso foi visto nesta semana.'
  }
  if (minutos === 1) {
    return '1 minuto'
  }
  return `${minutos} minutos`
}

function Historico() {
  const remediosApi = useRemedios()
  const eventosApi = useEventos()
  const adesao = useAdesao(eventosApi.eventos, remediosApi.remedios)

  const carregando = remediosApi.carregando || eventosApi.carregando
  const primeiroDia = adesao.dias[0].data
  const ultimoDia = adesao.dias[adesao.dias.length - 1].data

    return (
    <section className="space-y-6">
      <h2>Histórico</h2>

      <MensagemErro mensagem={remediosApi.erro} />
      <MensagemErro mensagem={eventosApi.erro} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-bold">
          Semana de {formatarData(primeiroDia)} a {formatarData(ultimoDia)}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={adesao.semanaAnterior} className="botao-secundario">
            Semana anterior
          </button>
          <button type="button" onClick={adesao.proximaSemana} disabled={adesao.ehSemanaAtual} className="botao-secundario">
            Próxima semana
          </button>
        </div>
      </div>

      {carregando && <Carregando texto="Carregando o histórico..." />}

      {!carregando && (
        <>
          <div className="rounded-3xl bg-pinho-50 p-6 sm:p-8">
            <h3 className="text-base font-bold text-pinho-700">Adesão da semana</h3>
            <p className="mt-1 text-5xl font-bold text-pinho-700">{adesao.taxaSemana}%</p>
            <p className="mt-2 text-base text-tinta-suave">
              É a parte das doses que saiu da caixa até 20 minutos depois do horário.
            </p>
          </div>

          <CalendarioAdesao dias={adesao.dias} />

          <div>
            <h3 className="mb-3 text-xl font-bold">Outros números da semana</h3>
            <ul className="cartao divide-y divide-linha p-0">
              <li className="flex justify-between gap-4 px-5 py-3">
                <span>Doses que não saíram da caixa</span>
                <strong>{adesao.perdidas}</strong>
              </li>
              <li className="flex justify-between gap-4 px-5 py-3">
                <span>Tentativas de abrir fora de hora</span>
                <strong>{adesao.foraDeHora}</strong>
              </li>
              <li className="flex justify-between gap-4 px-5 py-3">
                <span>Avisos de temperatura alta</span>
                <strong>{adesao.alertasTemperatura}</strong>
              </li>
              <li className="flex justify-between gap-4 px-5 py-3">
                <span>Tempo médio até alguém ver o aviso</span>
                <strong className="text-right">{textoTempoResposta(adesao.tempoResposta)}</strong>
              </li>
            </ul>
          </div>
        </>
      )}
    </section>
  )
}

export default Historico
