import { useState, useEffect } from 'react'

function useAgora() {
  const [agora, setAgora] = useState(() => new Date())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAgora(new Date())
    }, 60000)

    return () => clearInterval(intervalo)
  }, [])

  return agora
}

export default useAgora
