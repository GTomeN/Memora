import { useState, useEffect } from 'react'
import { listarContatos, criarContato, atualizarContato, excluirContato } from '../services/contatosService'
import { ordenarPorCascata } from '../utils/cascata'

function useContatos() {
  const [contatos, setContatos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarContatos() {
      try {
        const dados = await listarContatos()
        setContatos(dados)
      } catch {
        setErro('Não foi possível carregar os contatos. Tente de novo em instantes.')
      } finally {
        setCarregando(false)
      }
    }

    buscarContatos()
  }, [])

  async function adicionarContato(contato) {
    setErro(null)
    try {
      const novo = await criarContato(contato)
      setContatos((lista) => [...lista, novo])
      return true
    } catch {
      setErro('Não foi possível salvar o contato. Tente de novo.')
      return false
    }
  }

  async function editarContato(id, contato) {
    setErro(null)
    try {
      const atualizado = await atualizarContato(id, contato)
      setContatos((lista) => lista.map((item) => (item.id === id ? atualizado : item)))
      return true
    } catch {
      setErro('Não foi possível atualizar o contato. Tente de novo.')
      return false
    }
  }

  async function removerContato(id) {
    setErro(null)
    try {
      await excluirContato(id)
      setContatos((lista) => lista.filter((item) => item.id !== id))
      return true
    } catch {
      setErro('Não foi possível excluir o contato. Tente de novo.')
      return false
    }
  }

  async function moverContato(id, direcao) {
    const fila = ordenarPorCascata(contatos)
    const posicao = fila.findIndex((contato) => contato.id === id)

    let posicaoVizinho = posicao + 1
    if (direcao === 'subir') {
      posicaoVizinho = posicao - 1
    }

    if (posicaoVizinho < 0 || posicaoVizinho >= fila.length) {
      return false
    }

    const atual = fila[posicao]
    const vizinho = fila[posicaoVizinho]

    const primeiro = await editarContato(atual.id, { ...atual, ordemCascata: vizinho.ordemCascata })
    if (!primeiro) {
      return false
    }
    return editarContato(vizinho.id, { ...vizinho, ordemCascata: atual.ordemCascata })
  }

  return {
    contatos: ordenarPorCascata(contatos),
    carregando,
    erro,
    adicionarContato,
    editarContato,
    removerContato,
    moverContato,
  }
}

export default useContatos
