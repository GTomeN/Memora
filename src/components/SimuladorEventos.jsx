import { useState } from 'react'

function SimuladorEventos({ doses, mensagem, onRetirada, onAtraso, onForaDeHora, onTemperatura, onLimpar }) {
  const [chaveEscolhida, setChaveEscolhida] = useState('')
  const [temperatura, setTemperatura] = useState('')

  const doseEscolhida = doses.find((dose) => dose.chave === chaveEscolhida)
  const semDose = !doseEscolhida

  return (
    <section aria-label="Simular evento">
      <h3>Simular evento</h3>
      <p>Simulação: não há uma caixa de verdade ligada ao painel. Use os botões para ver como o painel reage.</p>

      {doses.length === 0 && <p>Cadastre um remédio para poder simular.</p>}

      {doses.length > 0 && (
        <>
          <label htmlFor="doseSimulada">Dose</label>
          <select id="doseSimulada" value={chaveEscolhida} onChange={(evento) => setChaveEscolhida(evento.target.value)}>
            <option value="">Escolha uma dose</option>
            {doses.map((dose) => (
              <option key={dose.chave} value={dose.chave}>
                {dose.horario} · {dose.remedio.nome}
              </option>
            ))}
          </select>

          <button type="button" disabled={semDose} onClick={() => onRetirada(doseEscolhida)}>
            O remédio saiu da caixa
          </button>
          <button type="button" disabled={semDose} onClick={() => onAtraso(doseEscolhida)}>
            A dose não saiu no horário
          </button>
          <button type="button" disabled={semDose} onClick={() => onForaDeHora(doseEscolhida)}>
            Abriram o compartimento fora de hora
          </button>

          <label htmlFor="temperaturaSimulada">Temperatura do local (°C)</label>
          <input
            id="temperaturaSimulada"
            type="number"
            value={temperatura}
            onChange={(evento) => setTemperatura(evento.target.value)}
          />
          <button
            type="button"
            disabled={semDose || temperatura === ''}
            onClick={() => onTemperatura(doseEscolhida, Number(temperatura))}
          >
            Registrar temperatura
          </button>
        </>
      )}

      {mensagem && <p role="status">{mensagem}</p>}

      <button type="button" onClick={onLimpar}>Apagar todos os eventos simulados</button>
    </section>
  )
}

export default SimuladorEventos
