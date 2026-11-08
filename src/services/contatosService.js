import { api } from './api'

export async function listarContatos() {
  const resposta = await api.get('/contatos')
  return resposta.data
}

export async function criarContato(contato) {
  const resposta = await api.post('/contatos', contato)
  return resposta.data
}

export async function atualizarContato(id, contato) {
  const resposta = await api.put(`/contatos/${id}`, contato)
  return resposta.data
}

export async function excluirContato(id) {
  await api.delete(`/contatos/${id}`)
}
