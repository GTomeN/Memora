import { useState } from 'react'
import useRemedios from '../hooks/useRemedios'
import { validarRemedio, temErros } from '../utils/validacoes'
import { formularioParaRemedio } from '../utils/formularios'
import ListaRemedios from '../components/ListaRemedios'
import FormRemedio from '../components/FormRemedio'
import ConfirmDialog from '../components/ConfirmDialog'
import AvisoReposicao from '../components/AvisoReposicao'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'

function Remedios() {
  const { remedios, carregando, erro, avisosReposicao, adicionarRemedio, editarRemedio, removerRemedio } = useRemedios()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [remedioEditando, setRemedioEditando] = useState(null)
  const [remedioParaExcluir, setRemedioParaExcluir] = useState(null)
  const [erros, setErros] = useState({})

  function abrirNovo() {
    setRemedioEditando(null)
    setErros({})
    setMostrarFormulario(true)
  }

  function abrirEdicao(remedio) {
    setRemedioEditando(remedio)
    setErros({})
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
    setRemedioEditando(null)
    setErros({})
  }

  async function salvar(dados) {
    const errosEncontrados = validarRemedio(dados)
    setErros(errosEncontrados)
    if (temErros(errosEncontrados)) {
      return
    }

    const remedio = formularioParaRemedio(dados)
    let deuCerto = false
    if (remedioEditando) {
      deuCerto = await editarRemedio(remedioEditando.id, remedio)
    } else {
      deuCerto = await adicionarRemedio(remedio)
    }

    if (deuCerto) {
      fecharFormulario()
    }
  }

  async function confirmarExclusao() {
    await removerRemedio(remedioParaExcluir.id)
    setRemedioParaExcluir(null)
  }

  let chaveFormulario = 'novo'
  if (remedioEditando) {
    chaveFormulario = remedioEditando.id
  }

  return (
    <section className="space-y-6">
      <h2>Remédios</h2>

      <MensagemErro mensagem={erro} />
      <AvisoReposicao avisos={avisosReposicao} />

      {!mostrarFormulario && (
        <button type="button" onClick={abrirNovo}
          className="botao-primario">
          Cadastrar remédio</button>
      )}
      {mostrarFormulario && (
        <FormRemedio
          key={chaveFormulario}
          remedio={remedioEditando}
          erros={erros}
          onSalvar={salvar}
          onCancelar={fecharFormulario}
        />
      )}

      {carregando && <Carregando texto="Carregando os remédios..." />}
      {!carregando && (
        <ListaRemedios remedios={remedios} onEditar={abrirEdicao} onExcluir={setRemedioParaExcluir} />
      )}

      {remedioParaExcluir && (
        <ConfirmDialog
          mensagem={`Excluir o ${remedioParaExcluir.nome}? Os horários dele deixam de aparecer no painel.`}
          textoConfirmar="Sim, excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setRemedioParaExcluir(null)}
        />
      )}
    </section>
  )
}

export default Remedios
