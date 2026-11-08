import useAgora from './useAgora'
import { montarDosesDoDia, statusDaCaixa } from '../utils/regrasDose'

function useDosesDeHoje(remedios, eventos) {
  const agora = useAgora()

  const doses = montarDosesDoDia(remedios, eventos, agora)
  const status = statusDaCaixa(doses, eventos, agora)

  return { doses, status, agora }
}

export default useDosesDeHoje
