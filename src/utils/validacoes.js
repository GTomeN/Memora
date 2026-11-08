import { separarHorarios } from './formularios'

export function horarioValido(horario) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(horario)
}

export function whatsappValido(whatsapp) {
  return /^\+55\d{10,11}$/.test(whatsapp)
}

export function validarRemedio(dados) {
  const erros = {}

  if (dados.nome.trim() === '') {
    erros.nome = 'Informe o nome do remédio.'
  }

  const horarios = separarHorarios(dados.horarios)
  if (horarios.length === 0) {
    erros.horarios = 'Informe pelo menos um horário.'
  } else if (!horarios.every(horarioValido)) {
    erros.horarios = 'Use o formato HH:MM, separando os horários por vírgula. Exemplo: 08:00, 20:00'
  }

  const estoque = Number(dados.estoque)
  if (dados.estoque === '' || !Number.isInteger(estoque) || estoque < 0) {
    erros.estoque = 'O estoque precisa ser um número inteiro, de 0 para cima.'
  }

  if (dados.limiteTemperatura !== '' && isNaN(Number(dados.limiteTemperatura))) {
    erros.limiteTemperatura = 'A temperatura máxima precisa ser um número.'
  }

  return erros
}

export function validarContato(dados) {
  const erros = {}

  if (dados.nome.trim() === '') {
    erros.nome = 'Informe o nome do contato.'
  }

  if (!whatsappValido(dados.whatsapp.trim())) {
    erros.whatsapp = 'Use o formato +55, DDD e número, sem espaços. Exemplo: +5511999990000'
  }

  return erros
}

export function temErros(erros) {
  return Object.keys(erros).length > 0
}
