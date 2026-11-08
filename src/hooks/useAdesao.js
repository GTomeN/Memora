import { useState } from 'react'
import useAgora from './useAgora'
import { FORA_DE_HORA, ARMAZENAMENTO_RUIM } from '../constants/tiposEvento'
import { diasDaSemana, diaFuturo, mesmoDia } from '../utils/datas'
import {
  taxaDeAdesao,
  resumoDoDia,
  dosesPerdidas,
  contarEventosDoTipo,
  tempoMedioDeResposta,
} from '../utils/adesao'

function useAdesao(eventos, remedios) {
  const agora = useAgora()
  const [semanasAtras, setSemanasAtras] = useState(0)

  const referencia = new Date(agora)
  referencia.setDate(referencia.getDate() - semanasAtras * 7)

  const dias = diasDaSemana(referencia)
  const diasAteHoje = dias.filter((dia) => !diaFuturo(dia, agora))
  const diasPassados = diasAteHoje.filter((dia) => !mesmoDia(dia, agora))

  const resumoDias = dias.map((dia) => resumoDoDia(eventos, remedios, dia, agora))

  function semanaAnterior() {
    setSemanasAtras(semanasAtras + 1)
  }

  function proximaSemana() {
    if (semanasAtras > 0) {
      setSemanasAtras(semanasAtras - 1)
    }
  }

  return {
    dias: resumoDias,
    taxaSemana: taxaDeAdesao(eventos, remedios, diasAteHoje),
    perdidas: dosesPerdidas(eventos, remedios, diasPassados),
    foraDeHora: contarEventosDoTipo(eventos, FORA_DE_HORA, diasAteHoje),
    alertasTemperatura: contarEventosDoTipo(eventos, ARMAZENAMENTO_RUIM, diasAteHoje),
    tempoResposta: tempoMedioDeResposta(eventos, diasAteHoje),
    ehSemanaAtual: semanasAtras === 0,
    semanaAnterior,
    proximaSemana,
  }
}

export default useAdesao
