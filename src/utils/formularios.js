import { LIMITE_TEMPERATURA_PADRAO } from '../constants/regras'

export function separarHorarios(texto) {
  const partes = texto.split(',').map((parte) => parte.trim())
  return partes.filter((parte) => parte !== '')
}

export function remedioParaFormulario(remedio) {
  if (!remedio) {
    return {
      nome: '',
      dosagem: '',
      cor: '',
      horarios: '',
      estoque: '',
      limiteTemperatura: String(LIMITE_TEMPERATURA_PADRAO),
      observacao: '',
      ativo: true,
    }
  }

  return {
    nome: remedio.nome,
    dosagem: remedio.dosagem,
    cor: remedio.cor,
    horarios: remedio.horarios.join(', '),
    estoque: String(remedio.estoque),
    limiteTemperatura: String(remedio.limiteTemperatura),
    observacao: remedio.observacao,
    ativo: remedio.ativo,
  }
}

export function formularioParaRemedio(dados) {
  let limite = LIMITE_TEMPERATURA_PADRAO
  if (dados.limiteTemperatura !== '') {
    limite = Number(dados.limiteTemperatura)
  }

  return {
    nome: dados.nome.trim(),
    dosagem: dados.dosagem.trim(),
    cor: dados.cor.trim(),
    horarios: separarHorarios(dados.horarios),
    estoque: Number(dados.estoque),
    limiteTemperatura: limite,
    observacao: dados.observacao.trim(),
    ativo: dados.ativo,
  }
}

export function contatoParaFormulario(contato) {
  if (!contato) {
    return {
      nome: '',
      parentesco: '',
      whatsapp: '',
      autorizaWhatsapp: true,
      ativo: true,
    }
  }

  return {
    nome: contato.nome,
    parentesco: contato.parentesco,
    whatsapp: contato.whatsapp,
    autorizaWhatsapp: contato.autorizaWhatsapp,
    ativo: contato.ativo,
  }
}

export function formularioParaContato(dados) {
  return {
    nome: dados.nome.trim(),
    parentesco: dados.parentesco.trim(),
    whatsapp: dados.whatsapp.trim(),
    autorizaWhatsapp: dados.autorizaWhatsapp,
    ativo: dados.ativo,
  }
}
