import { useState, useEffect } from 'react'
import { listarRemedios, criarRemedio, atualizarRemedio, excluirRemedio } from '../services/remediosService'
import { diasAteAcabar, precisaRepor } from '../utils/reposicao'

function useRemedios() {
  const [remedios, setRemedios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarRemedios() {
      try {
        const dados = await listarRemedios()
        setRemedios(dados)
      } catch {
        setErro('Não foi possível carregar os remédios. Tente de novo em instantes.')
      } finally {
        setCarregando(false)
      }
    }

    buscarRemedios()
  }, [])

  async function adicionarRemedio(remedio) {
    setErro(null)
    try {
      const novo = await criarRemedio(remedio)
      setRemedios((lista) => [...lista, novo])
      return true
    } catch {
      setErro('Não foi possível salvar o remédio. Tente de novo.')
      return false
    }
  }

  async function editarRemedio(id, remedio) {
    setErro(null)
    try {
      const atualizado = await atualizarRemedio(id, remedio)
      setRemedios((lista) => lista.map((item) => (item.id === id ? atualizado : item)))
      return true
    } catch {
      setErro('Não foi possível atualizar o remédio. Tente de novo.')
      return false
    }
  }

  async function removerRemedio(id) {
    setErro(null)
    try {
      await excluirRemedio(id)
      setRemedios((lista) => lista.filter((item) => item.id !== id))
      return true
    } catch {
      setErro('Não foi possível excluir o remédio. Tente de novo.')
      return false
    }
  }

  const remediosAcabando = remedios.filter((remedio) => remedio.ativo && precisaRepor(remedio))
  const avisosReposicao = remediosAcabando.map((remedio) => ({
    id: remedio.id,
    nome: remedio.nome,
    dias: diasAteAcabar(remedio),
  }))

  return { remedios, carregando, erro, avisosReposicao, adicionarRemedio, editarRemedio, removerRemedio }
}

export default useRemedios
