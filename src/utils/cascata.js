import { MINUTOS_CASCATA } from '../constants/regras'
import { TIPOS_QUE_GERAM_ALERTA } from '../constants/tiposEvento'
import { minutosEntre } from './datas'

export function geraAlerta(evento) {
  return TIPOS_QUE_GERAM_ALERTA.includes(evento.tipo)
}

export function alertasPendentes(eventos) {
  return eventos.filter((evento) => geraAlerta(evento) && !evento.visto)
}

export function ordenarPorCascata(contatos) {
  return [...contatos].sort((a, b) => a.ordemCascata - b.ordemCascata)
}

export function contatosDaCascata(contatos) {
  const ativos = contatos.filter((contato) => contato.ativo)
  return ordenarPorCascata(ativos)
}

export function proximaOrdem(contatos) {
  let maior = 0
  for (const contato of contatos) {
    if (contato.ordemCascata > maior) {
      maior = contato.ordemCascata
    }
  }
  return maior + 1
}

export function contatoResponsavel(alerta, contatos, agora) {
  const fila = contatosDaCascata(contatos)
  if (fila.length === 0) {
    return null
  }

  const minutosSemResposta = minutosEntre(alerta.horarioEvento, agora)
  let posicao = Math.floor(minutosSemResposta / MINUTOS_CASCATA)

  if (posicao < 0) {
    posicao = 0
  }
  if (posicao >= fila.length) {
    posicao = fila.length - 1
  }
  return fila[posicao]
}

export function contatosComWhatsapp(contatos) {
  return contatos.filter((contato) => contato.ativo && contato.autorizaWhatsapp)
}

export function temContatoReserva(contatos) {
  const ativos = contatos.filter((contato) => contato.ativo)
  return ativos.length >= 2
}
