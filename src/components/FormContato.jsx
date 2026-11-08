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
    <form onSubmit={enviar} noValidate>
      <h3>{titulo}</h3>

      <label htmlFor="nome">Nome</label>
      <input id="nome" name="nome" value={dados.nome} onChange={alterarCampo} />
      {erros.nome && <p>{erros.nome}</p>}

      <label htmlFor="parentesco">Parentesco</label>
      <input id="parentesco" name="parentesco" value={dados.parentesco} onChange={alterarCampo} placeholder="Filha" />

      <label htmlFor="whatsapp">WhatsApp</label>
      <input id="whatsapp" name="whatsapp" type="tel" value={dados.whatsapp} onChange={alterarCampo} placeholder="+5511999990000" />
      {erros.whatsapp && <p>{erros.whatsapp}</p>}

      <label htmlFor="autorizaWhatsapp">
        <input id="autorizaWhatsapp" name="autorizaWhatsapp" type="checkbox" checked={dados.autorizaWhatsapp} onChange={alterarCampo} />
        Aceita receber aviso pelo WhatsApp
      </label>

      <label htmlFor="ativo">
        <input id="ativo" name="ativo" type="checkbox" checked={dados.ativo} onChange={alterarCampo} />
        Participa da fila de avisos
      </label>

      <button type="submit">Salvar contato</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  )
}

export default FormContato
