import { api } from './api'

export async function listarRemedios() {
  const resposta = await api.get('/remedios')
  return resposta.data
}

export async function criarRemedio(remedio) {
  const resposta = await api.post('/remedios', remedio)
  return resposta.data
}

export async function atualizarRemedio(id, remedio) {
  const resposta = await api.put(`/remedios/${id}`, remedio)
  return resposta.data
}

export async function excluirRemedio(id) {
  await api.delete(`/remedios/${id}`)
}
