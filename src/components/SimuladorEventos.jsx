import { useState } from 'react'

function SimuladorEventos({ doses, mensagem, onRetirada, onAtraso, 
  onForaDeHora, onTemperatura, onLimpar }) {
  const [chaveEscolhida, setChaveEscolhida] = useState('')
  const [temperatura, setTemperatura] = useState('')

  const doseEscolhida = doses.find((dose) => dose.chave === chaveEscolhida)
  const semDose = !doseEscolhida

  return (
    <section
      aria-label="Simular evento"
      className="mt-4 rounded-2xl border-2 border-dashed 
      border-tinta-suave/40 bg-fundo p-5"
    >
      <h3 className="text-xl font-bold">Simular evento</h3>
      <p className="mt-1 text-base text-tinta-suave">
        Simulação: não há uma caixa de verdade ligada ao painel. Use os botões para ver como o painel reage.
      </p>

      {doses.length === 0 && <p className="mt-4">Cadastre um remédio para poder simular.</p>}

      {doses.length > 0 && (
        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="doseSimulada" className="rotulo">Dose</label>
            <select
              id="doseSimulada"
              value={chaveEscolhida}
              onChange={(evento) => setChaveEscolhida(evento.target.value)}
              className="campo"
            >
              <option value="">Escolha uma dose</option>
              {doses.map((dose) => (
                <option key={dose.chave} value={dose.chave}>
                  {dose.horario} · {dose.remedio.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <button type="button" disabled={semDose} onClick={() => onRetirada(doseEscolhida)} className="botao-secundario">
              O remédio saiu da caixa
            </button>
            <button type="button" disabled={semDose} onClick={() => onAtraso(doseEscolhida)} className="botao-secundario">
              A dose não saiu no horário
            </button>
            <button type="button" disabled={semDose} onClick={() => onForaDeHora(doseEscolhida)} className="botao-secundario">
              Abriram o compartimento fora de hora
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <div className="sm:flex-1">
              <label htmlFor="temperaturaSimulada" className="rotulo">Temperatura do local (°C)</label>
              <input
                id="temperaturaSimulada"
                type="number"
                value={temperatura}
                onChange={(evento) => setTemperatura(evento.target.value)}
                className="campo"
              />
            </div>
            <button
              type="button"
              disabled={semDose || temperatura === ''}
              onClick={() => onTemperatura(doseEscolhida, Number(temperatura))}
              className="botao-secundario"
            >
              Registrar temperatura
            </button>
          </div>
        </div>
      )}

      {mensagem && (
        <p role="status" className="mt-5 rounded-xl 
        bg-superficie px-4 py-3 font-bold text-pinho-700">
          {mensagem}
        </p>
      )}

      <button type="button" onClick={onLimpar} className="botao-discreto mt-4">
        Apagar todos os eventos simulados
      </button>
    </section>
  )
}

export default SimuladorEventos