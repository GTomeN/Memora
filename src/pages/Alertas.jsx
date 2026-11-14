import useRemedios from '../hooks/useRemedios'
import useContatos from '../hooks/useContatos'
import useEventos from '../hooks/useEventos'
import useAlertas from '../hooks/useAlertas'
import CardAlerta from '../components/CardAlerta'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'

function Alertas() {
  const remediosApi = useRemedios()
  const contatosApi = useContatos()
  const eventosApi = useEventos()
  const { alertas, marcarVisto } = useAlertas(
    eventosApi.eventos,
    remediosApi.remedios,
    contatosApi.contatos,
    eventosApi.editarEvento,
  )

  const carregando = remediosApi.carregando || contatosApi.carregando || eventosApi.carregando

  return (
    <section className="space-y-6">
      <div>
        <h2>Alertas</h2>
        <p className="mt-2 text-tinta-suave">
          Se ninguém marcar "Vi o aviso" em 10 minutos, o aviso passa para a próxima pessoa da fila.
        </p>
      </div>

      <MensagemErro mensagem={eventosApi.erro} />
      <MensagemErro mensagem={remediosApi.erro} />
      <MensagemErro mensagem={contatosApi.erro} />

      {carregando && <Carregando texto="Carregando os avisos..." />}

      {!carregando && alertas.length === 0 && (
        <p className="cartao font-bold text-ok-700">Nenhum aviso pendente. Tudo certo por aqui.</p>
      )}

      {!carregando && (
        <div className="grid gap-3">
          {alertas.map((alerta) => (
            <CardAlerta key={alerta.evento.id} alerta={alerta} onVisto={marcarVisto} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Alertas
