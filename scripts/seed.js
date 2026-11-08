import axios from 'axios'

const api = axios.create({ baseURL: process.env.VITE_API_URL })
const apiEventos = axios.create({ baseURL: process.env.VITE_API_URL_EVENTOS })

const remedios = [
  {
    nome: 'Remédio A',
    dosagem: '1 comprimido',
    cor: 'branco',
    horarios: ['08:00', '20:00'],
    estoque: 40,
    limiteTemperatura: 30,
    observacao: 'Tomar depois do café e do jantar.',
    ativo: true,
  },
  {
    nome: 'Remédio B',
    dosagem: '1 cápsula',
    cor: 'amarela',
    horarios: ['14:00'],
    estoque: 5,
    limiteTemperatura: 30,
    observacao: '',
    ativo: true,
  },
  {
    nome: 'Remédio C',
    dosagem: 'meio comprimido',
    cor: 'azul',
    horarios: ['21:00'],
    estoque: 25,
    limiteTemperatura: 25,
    observacao: 'Guardar longe do sol.',
    ativo: true,
  },
]

const contatos = [
  { nome: 'Ana', parentesco: 'Filha', whatsapp: '+5511999990000', ordemCascata: 1, autorizaWhatsapp: true, ativo: true },
  { nome: 'Carlos', parentesco: 'Filho', whatsapp: '+5511988880000', ordemCascata: 2, autorizaWhatsapp: true, ativo: true },
  { nome: 'Marta', parentesco: 'Vizinha', whatsapp: '+5511977770000', ordemCascata: 3, autorizaWhatsapp: false, ativo: true },
]

function compartimentoDoHorario(horario) {
  const hora = Number(horario.split(':')[0])
  if (hora < 12) {
    return 1
  }
  if (hora < 18) {
    return 2
  }
  return 3
}

function dataComHorario(dia, horario) {
  const [horas, minutos] = horario.split(':')
  const data = new Date(dia)
  data.setHours(Number(horas), Number(minutos), 0, 0)
  return data
}

function somarMinutos(data, minutos) {
  return new Date(data.getTime() + minutos * 60000)
}

function evento(tipo, remedio, horario, previsto, quando, extras = {}) {
  return {
    remedioId: remedio.id,
    compartimento: compartimentoDoHorario(horario),
    tipo,
    horarioPrevisto: previsto.toISOString(),
    horarioEvento: quando.toISOString(),
    temperatura: null,
    visto: false,
    vistoPor: null,
    vistoEm: null,
    ...extras,
  }
}

function vistoPor(nome, quando, minutosDepois) {
  return { visto: true, vistoPor: nome, vistoEm: somarMinutos(quando, minutosDepois).toISOString() }
}

function montarEventos(remediosCriados, agora) {
  const [remedioA, remedioB, remedioC] = remediosCriados
  const eventos = []

  for (let diasAtras = 7; diasAtras >= 0; diasAtras--) {
    const dia = new Date(agora)
    dia.setDate(dia.getDate() - diasAtras)

    for (const remedio of remediosCriados) {
      for (const horario of remedio.horarios) {
        const previsto = dataComHorario(dia, horario)
        if (somarMinutos(previsto, 20) > agora) {
          continue
        }

        const atrasou = somarMinutos(previsto, 20)

        if (diasAtras === 3 && remedio === remedioB) {
          eventos.push(evento('DOSE_ATRASADA', remedio, horario, previsto, atrasou, vistoPor('Ana', atrasou, 6)))
          eventos.push(evento('DOSE_PERDIDA', remedio, horario, previsto, dataComHorario(dia, '23:59')))
        } else if ((diasAtras === 2 || diasAtras === 5) && remedio === remedioC) {
          eventos.push(evento('DOSE_ATRASADA', remedio, horario, previsto, atrasou, vistoPor('Carlos', atrasou, 12)))
          eventos.push(evento('DOSE_RETIRADA', remedio, horario, previsto, somarMinutos(previsto, 35)))
        } else {
          const minutos = 2 + (diasAtras % 4) * 3
          eventos.push(evento('DOSE_RETIRADA', remedio, horario, previsto, somarMinutos(previsto, minutos)))
        }
      }
    }
  }

  const quatroDiasAtras = new Date(agora)
  quatroDiasAtras.setDate(quatroDiasAtras.getDate() - 4)
  const tentativa = dataComHorario(quatroDiasAtras, '15:30')
  eventos.push(evento('FORA_DE_HORA', remedioA, '08:00', dataComHorario(quatroDiasAtras, '08:00'), tentativa, vistoPor('Ana', tentativa, 4)))

  const ontem = new Date(agora)
  ontem.setDate(ontem.getDate() - 1)
  const calor = dataComHorario(ontem, '15:00')
  eventos.push(evento('ARMAZENAMENTO_RUIM', remedioC, '21:00', dataComHorario(ontem, '21:00'), calor, {
    temperatura: 31,
    ...vistoPor('Carlos', calor, 9),
  }))

  const agoraHaPouco = somarMinutos(agora, -15)
  eventos.push(evento('FORA_DE_HORA', remedioB, '14:00', dataComHorario(agora, '14:00'), agoraHaPouco))

  return eventos
}

async function apagarTudo(cliente, recurso) {
  const resposta = await cliente.get(`/${recurso}`)
  for (const item of resposta.data) {
    await cliente.delete(`/${recurso}/${item.id}`)
  }
}

async function criarTodos(cliente, recurso, lista) {
  const criados = []
  for (const item of lista) {
    const resposta = await cliente.post(`/${recurso}`, item)
    criados.push(resposta.data)
  }
  return criados
}

async function popular() {
  if (!process.env.VITE_API_URL || !process.env.VITE_API_URL_EVENTOS) {
    console.log('Crie o arquivo .env com VITE_API_URL e VITE_API_URL_EVENTOS antes de rodar o seed.')
    return
  }

  console.log('Apagando os dados antigos...')
  await apagarTudo(api, 'remedios')
  await apagarTudo(api, 'contatos')
  await apagarTudo(apiEventos, 'eventos')

  console.log('Cadastrando remédios e contatos...')
  const remediosCriados = await criarTodos(api, 'remedios', remedios)
  await criarTodos(api, 'contatos', contatos)

  console.log('Cadastrando os eventos dos últimos dias...')
  const eventos = montarEventos(remediosCriados, new Date())
  await criarTodos(apiEventos, 'eventos', eventos)

  console.log(`Pronto: ${remediosCriados.length} remédios, ${contatos.length} contatos e ${eventos.length} eventos.`)
}

popular().catch((erro) => {
  console.log('Não foi possível popular a MockAPI:', erro.message)
})
