import { useState, useEffect } from 'react'
import { montarDosesDoDia, statusDaCaixa } from '../utils/regrasDose'

function useDosesDeHoje(remedios, eventos) {
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date())
    }, 60000)

    return () => clearInterval(intervalo)
  }, [])

  const doses = montarDosesDoDia(remedios, eventos, agora)
  const status = statusDaCaixa(doses, eventos, agora)

  return { doses, status, agora }
}

export default useDosesDeHoje
