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
    <section>
      <h2>Histórico</h2>

      <MensagemErro mensagem={remediosApi.erro} />
      <MensagemErro mensagem={eventosApi.erro} />

      <p>Semana de {formatarData(primeiroDia)} a {formatarData(ultimoDia)}</p>
      <button type="button" onClick={adesao.semanaAnterior}>Semana anterior</button>
      <button type="button" onClick={adesao.proximaSemana} disabled={adesao.ehSemanaAtual}>Próxima semana</button>

      {carregando && <Carregando texto="Carregando o histórico..." />}

      {!carregando && (
        <>
          <h3>Adesão da semana: {adesao.taxaSemana}%</h3>
          <p>É a parte das doses que saiu da caixa até 20 minutos depois do horário.</p>

          <CalendarioAdesao dias={adesao.dias} />

          <h3>Outros números da semana</h3>
          <ul>
            <li>Doses que não saíram da caixa: {adesao.perdidas}</li>
            <li>Tentativas de abrir fora de hora: {adesao.foraDeHora}</li>
            <li>Avisos de temperatura alta: {adesao.alertasTemperatura}</li>
            <li>Tempo médio até alguém ver o aviso: {textoTempoResposta(adesao.tempoResposta)}</li>
          </ul>
        </>
      )}
    </section>
  )
}

export default Historico
