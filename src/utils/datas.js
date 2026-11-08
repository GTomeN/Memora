export function horarioEmMinutos(horario) {
  const [horas, minutos] = horario.split(':')
  return Number(horas) * 60 + Number(minutos)
}

export function minutosEntre(inicio, fim) {
  const diferenca = new Date(fim) - new Date(inicio)
  return Math.floor(diferenca / 60000)
}

export function dataComHorario(dia, horario) {
  const [horas, minutos] = horario.split(':')
  const data = new Date(dia)
  data.setHours(Number(horas), Number(minutos), 0, 0)
  return data
}

export function mesmoDia(dataA, dataB) {
  const a = new Date(dataA)
  const b = new Date(dataB)
  return a.toDateString() === b.toDateString()
}

export function diasDaSemana(data) {
  const segunda = new Date(data)
  const diaDaSemana = segunda.getDay()

  if (diaDaSemana === 0) {
    segunda.setDate(segunda.getDate() - 6)
  } else {
    segunda.setDate(segunda.getDate() - (diaDaSemana - 1))
  }

  const dias = []
  for (let i = 0; i < 7; i++) {
    const dia = new Date(segunda)
    dia.setDate(segunda.getDate() + i)
    dias.push(dia)
  }
  return dias
}

export function formatarHora(data) {
  const d = new Date(data)
  const horas = String(d.getHours()).padStart(2, '0')
  const minutos = String(d.getMinutes()).padStart(2, '0')
  return `${horas}h${minutos}`
}

const NOMES_DOS_DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']

export function formatarData(data) {
  const d = new Date(data)
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  return `${dia}/${mes}`
}

export function formatarDia(data) {
  const d = new Date(data)
  return `${NOMES_DOS_DIAS[d.getDay()]} ${formatarData(d)}`
}

export function diaFuturo(dia, agora) {
  return new Date(dia) > new Date(agora) && !mesmoDia(dia, agora)
}
