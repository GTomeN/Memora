import { useState, useEffect, useRef } from 'react'
import { SEGUNDOS_MAXIMOS_LEMBRETE } from '../constants/regras'

const CHAVE_NO_NAVEGADOR = 'memora-lembretes-de-voz'

function lerAudiosSalvos() {
  try {
    const salvos = localStorage.getItem(CHAVE_NO_NAVEGADOR)
    return JSON.parse(salvos) || {}
  } catch {
    return {}
  }
}

function useGravadorVoz() {
  const [audios, setAudios] = useState(lerAudiosSalvos)
  const [horarioGravando, setHorarioGravando] = useState(null)
  const [erro, setErro] = useState(null)
  const gravadorRef = useRef(null)
  const temporizadorRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_NO_NAVEGADOR, JSON.stringify(audios))
    } catch {
      console.error('Não foi possível guardar os lembretes no navegador.')
    }
  }, [audios])

  useEffect(() => {
    return () => {
      clearTimeout(temporizadorRef.current)
      if (gravadorRef.current && gravadorRef.current.state === 'recording') {
        gravadorRef.current.stop()
      }
    }
  }, [])

  function salvarAudio(horario, audio) {
    setAudios((atuais) => ({ ...atuais, [horario]: audio }))
  }

  function pararGravacao() {
    clearTimeout(temporizadorRef.current)
    if (gravadorRef.current && gravadorRef.current.state === 'recording') {
      gravadorRef.current.stop()
    }
  }

  async function comecarGravacao(horario) {
    setErro(null)

    if (!navigator.mediaDevices || typeof MediaRecorder === 'undefined') {
      setErro('Este navegador não permite gravar áudio. Tente pelo Chrome, Edge ou Firefox.')
      return
    }

    try {
      const microfone = await navigator.mediaDevices.getUserMedia({ audio: true })
      const gravador = new MediaRecorder(microfone)
      const pedacos = []

      gravador.ondataavailable = (evento) => {
        pedacos.push(evento.data)
      }

      gravador.onstop = () => {
        microfone.getTracks().forEach((trilha) => trilha.stop())
        const arquivo = new Blob(pedacos, { type: gravador.mimeType })
        const leitor = new FileReader()
        leitor.onloadend = () => salvarAudio(horario, leitor.result)
        leitor.readAsDataURL(arquivo)
        setHorarioGravando(null)
      }

      gravador.start()
      gravadorRef.current = gravador
      setHorarioGravando(horario)
      temporizadorRef.current = setTimeout(pararGravacao, SEGUNDOS_MAXIMOS_LEMBRETE * 1000)
    } catch {
      setErro('Não foi possível usar o microfone. Confira se o navegador tem permissão para gravar.')
    }
  }

  function apagarAudio(horario) {
    setAudios((atuais) => {
      const copia = { ...atuais }
      delete copia[horario]
      return copia
    })
  }

  return { audios, horarioGravando, erro, comecarGravacao, pararGravacao, apagarAudio }
}

export default useGravadorVoz
