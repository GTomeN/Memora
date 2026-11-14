import useRemedios from '../hooks/useRemedios'
import useGravadorVoz from '../hooks/useGravadorVoz'
import GravadorVoz from '../components/GravadorVoz'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'
import { COMPARTIMENTOS } from '../constants/compartimentos'
import { SEGUNDOS_MAXIMOS_LEMBRETE } from '../constants/regras'
import { horariosDosRemedios, compartimentoDoHorario } from '../utils/regrasDose'

function LembreteVoz() {
  const { remedios, carregando, erro } = useRemedios()
  const gravador = useGravadorVoz()

  const horarios = horariosDosRemedios(remedios)
  const algumGravando = gravador.horarioGravando !== null

    return (
    <section className="space-y-6">
      <div>
        <h2>Lembrete de voz</h2>
        <p className="mt-2 text-tinta-suave">
          Grave uma mensagem curta com a sua voz para cada horário, de até {SEGUNDOS_MAXIMOS_LEMBRETE} segundos.
          É ela que a caixa toca na hora da dose.
        </p>
        <p className="mt-2 text-base text-tinta-suave">
          Os áudios ficam guardados só neste navegador, não vão para a internet.
        </p>
      </div>

      <MensagemErro mensagem={erro} />
      <MensagemErro mensagem={gravador.erro} />

      {carregando && <Carregando texto="Carregando os horários..." />}

      {!carregando && horarios.length === 0 && (
        <p className="cartao text-tinta-suave">Nenhum horário cadastrado. Cadastre os remédios primeiro.</p>
      )}

      {!carregando && (
        <div className="grid gap-3">
          {horarios.map((horario) => (
            <GravadorVoz
              key={horario}
              horario={horario}
              periodo={COMPARTIMENTOS[compartimentoDoHorario(horario)]}
              audio={gravador.audios[horario]}
              gravando={gravador.horarioGravando === horario}
              ocupado={algumGravando}
              onGravar={gravador.comecarGravacao}
              onParar={gravador.pararGravacao}
              onApagar={gravador.apagarAudio}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default LembreteVoz
