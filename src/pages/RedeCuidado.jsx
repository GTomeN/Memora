import { useState } from 'react'
import useContatos from '../hooks/useContatos'
import { validarContato, temErros } from '../utils/validacoes'
import { formularioParaContato } from '../utils/formularios'
import { contatosComWhatsapp, temContatoReserva, proximaOrdem } from '../utils/cascata'
import ListaContatos from '../components/ListaContatos'
import FormContato from '../components/FormContato'
import ConfirmDialog from '../components/ConfirmDialog'
import Carregando from '../components/Carregando'
import MensagemErro from '../components/MensagemErro'

function RedeCuidado() {
  const { contatos, carregando, erro, adicionarContato, editarContato, removerContato, moverContato } = useContatos()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [contatoEditando, setContatoEditando] = useState(null)
  const [contatoParaExcluir, setContatoParaExcluir] = useState(null)
  const [erros, setErros] = useState({})

  function abrirNovo() {
    setContatoEditando(null)
    setErros({})
    setMostrarFormulario(true)
  }

  function abrirEdicao(contato) {
    setContatoEditando(contato)
    setErros({})
    setMostrarFormulario(true)
  }

  function fecharFormulario() {
    setMostrarFormulario(false)
    setContatoEditando(null)
    setErros({})
  }

  async function salvar(dados) {
    const errosEncontrados = validarContato(dados)
    setErros(errosEncontrados)
    if (temErros(errosEncontrados)) {
      return
    }

    const contato = formularioParaContato(dados)
    let deuCerto = false
    if (contatoEditando) {
      deuCerto = await editarContato(contatoEditando.id, { ...contatoEditando, ...contato })
    } else {
      deuCerto = await adicionarContato({ ...contato, ordemCascata: proximaOrdem(contatos) })
    }

    if (deuCerto) {
      fecharFormulario()
    }
  }

  async function confirmarExclusao() {
    await removerContato(contatoParaExcluir.id)
    setContatoParaExcluir(null)
  }

  function alternarWhatsapp(contato) {
    editarContato(contato.id, { ...contato, autorizaWhatsapp: !contato.autorizaWhatsapp })
  }

  const nomesNoWhatsapp = contatosComWhatsapp(contatos).map((contato) => contato.nome)

  let chaveFormulario = 'novo'
  if (contatoEditando) {
    chaveFormulario = contatoEditando.id
  }

  return (
    <section className="space-y-6">
      <div>
        <h2>Rede de cuidado</h2>
        <p className="mt-2 text-tinta-suave">
          Quando um aviso não é visto em 10 minutos, ele passa para a próxima pessoa da fila.
        </p>
      </div>

      <MensagemErro mensagem={erro} />

      {!carregando && !temContatoReserva(contatos) && (
        <p className="rounded-xl border-l-4 border-atencao-300 bg-atencao-50 px-4 py-3 font-bold text-atencao-800">
          Cadastre pelo menos 2 pessoas ativas. Assim, se a primeira não puder ver o aviso, sempre tem alguém de reserva.
        </p>
      )}

      {!carregando && nomesNoWhatsapp.length > 0 && (
        <p className="rounded-xl bg-pinho-50 px-4 py-3 text-pinho-700">
          Recebem aviso pelo WhatsApp: <strong>{nomesNoWhatsapp.join(', ')}</strong>.
        </p>
      )}
      {!carregando && nomesNoWhatsapp.length === 0 && (
        <p className="rounded-xl bg-pinho-50 px-4 py-3 text-pinho-700">
          Ninguém da fila aceitou receber aviso pelo WhatsApp. Os avisos vão aparecer só no painel.
        </p>
      )}

      {!mostrarFormulario && (
        <button type="button" onClick={abrirNovo} className="botao-primario">Cadastrar contato</button>
      )}

      {mostrarFormulario && (
        <FormContato
          key={chaveFormulario}
          contato={contatoEditando}
          erros={erros}
          onSalvar={salvar}
          onCancelar={fecharFormulario}
        />
      )}

      {carregando && <Carregando texto="Carregando os contatos..." />}
      {!carregando && (
        <ListaContatos
          contatos={contatos}
          onEditar={abrirEdicao}
          onExcluir={setContatoParaExcluir}
          onSubir={(contato) => moverContato(contato.id, 'subir')}
          onDescer={(contato) => moverContato(contato.id, 'descer')}
          onAlternarWhatsapp={alternarWhatsapp}
        />
      )}

      {contatoParaExcluir && (
        <ConfirmDialog
          mensagem={`Tirar ${contatoParaExcluir.nome} da rede de cuidado? Essa pessoa deixa de receber os avisos.`}
          textoConfirmar="Sim, excluir"
          onConfirmar={confirmarExclusao}
          onCancelar={() => setContatoParaExcluir(null)}
        />
      )}
    </section>
  )
}

export default RedeCuidado
