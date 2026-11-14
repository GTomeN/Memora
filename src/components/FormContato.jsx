import { useState } from 'react'
import { contatoParaFormulario } from '../utils/formularios'

function FormContato({ contato, erros, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(contatoParaFormulario(contato))

  function alterarCampo(evento) {
    const { name, value, type, checked } = evento.target
    if (type === 'checkbox') {
      setDados({ ...dados, [name]: checked })
    } else {
      setDados({ ...dados, [name]: value })
    }
  }

  function enviar(evento) {
    evento.preventDefault()
    onSalvar(dados)
  }

  let titulo = 'Novo contato'
  if (contato) {
    titulo = 'Editar contato'
  }

  return (
    <form onSubmit={enviar} noValidate
      className="cartao space-y-5">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div>
        <label htmlFor="nome" className="rotulo">Nome</label>
        <input id="nome" name="nome" value={dados.nome} onChange={alterarCampo} className="campo" />
        {erros.nome && <p className="erro-campo">{erros.nome}</p>}
      </div>

      <div>
        <label htmlFor="parentesco" className="rotulo">Parentesco</label>
        <input id="parentesco" name="parentesco" value={dados.parentesco}
          onChange={alterarCampo} placeholder="Filha, filho, etc" className="campo" />
      </div>
      <div>
        <label htmlFor="whatsapp" className="rotulo">WhatsApp</label>
        <input id="whatsapp" name="whatsapp" type="tel" value={dados.whatsapp} onChange={alterarCampo}
          placeholder="+5511999990000" className="campo" />
        {erros.whatsapp && <p className="erro-campo">{erros.whatsapp}</p>}
      </div>

      <div className="space-y-3">
        <label htmlFor="autorizaWhatsapp"
          className="flex items-center gap-3 font-bold">
          <input id="autorizaWhatsapp" name="autorizaWhatsapp"
            type="checkbox" className="size-5 accent-pinho-600"
            checked={dados.autorizaWhatsapp} onChange={alterarCampo} />
          Aceita receber aviso pelo WhatsApp
        </label>

        <label htmlFor="ativo" className=" 
          flex items-center gap-3 font-bold">
          <input id="ativo" name="ativo" type="checkbox"
            className="size-5 accent-pinho-600"
            checked={dados.ativo} onChange={alterarCampo} />
          Participa da fila de avisos
        </label>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button type="submit" className="botao-primario">Salvar contato</button>
        <button type="button" onClick={onCancelar} className="botao-secundario">Cancelar</button>
      </div>
    </form>
  )
}

export default FormContato
