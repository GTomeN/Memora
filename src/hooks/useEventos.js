import { useState, useEffect } from 'react'
import { listarEventos, criarEvento, atualizarEvento, excluirEvento } from '../services/eventosService'

function useEventos() {
  const [eventos, setEventos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarEventos() {
      try {
        const dados = await listarEventos()
        setEventos(dados)
      } catch {
        setErro('Não foi possível carregar os eventos da caixa. Tente de novo em instantes.')
      } finally {
        setCarregando(false)
      }
    }

    buscarEventos()
  }, [])

  async function adicionarEvento(evento) {
    setErro(null)
    try {
      const novo = await criarEvento(evento)
      setEventos((lista) => [...lista, novo])
      return true
    } catch {
      setErro('Não foi possível registrar o evento. Tente de novo.')
      return false
    }
  }

  async function editarEvento(id, evento) {
    setErro(null)
    try {
      const atualizado = await atualizarEvento(id, evento)
      setEventos((lista) => lista.map((item) => (item.id === id ? atualizado : item)))
      return true
    } catch {
      setErro('Não foi possível atualizar o evento. Tente de novo.')
      return false
    }
  }

  async function removerEvento(id) {
    setErro(null)
    try {
      await excluirEvento(id)
      setEventos((lista) => lista.filter((item) => item.id !== id))
      return true
    } catch {
      setErro('Não foi possível excluir o evento. Tente de novo.')
      return false
    }
  }

  return { eventos, carregando, erro, adicionarEvento, editarEvento, removerEvento }
}

export default useEventos
