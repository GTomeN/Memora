import { apiEventos } from './api'

export async function listarEventos() {
  const resposta = await apiEventos.get('/eventos')
  return resposta.data
}

export async function criarEvento(evento) {
  const resposta = await apiEventos.post('/eventos', evento)
  return resposta.data
}

export async function atualizarEvento(id, evento) {
  const resposta = await apiEventos.put(`/eventos/${id}`, evento)
  return resposta.data
}

export async function excluirEvento(id) {
  await apiEventos.delete(`/eventos/${id}`)
}
