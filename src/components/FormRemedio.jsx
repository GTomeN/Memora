import { useState } from 'react'
import { remedioParaFormulario } from '../utils/formularios'

function FormRemedio({ remedio, erros, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(remedioParaFormulario(remedio))

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

  let titulo = 'Novo remédio'
  if (remedio) {
    titulo = 'Editar remédio'
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h3>{titulo}</h3>

      <label htmlFor="nome">Nome</label>
      <input id="nome" name="nome" value={dados.nome} onChange={alterarCampo} />
      {erros.nome && <p>{erros.nome}</p>}

      <label htmlFor="dosagem">Dosagem</label>
      <input id="dosagem" name="dosagem" value={dados.dosagem} onChange={alterarCampo} placeholder="1 comprimido" />

      <label htmlFor="cor">Cor do comprimido</label>
      <input id="cor" name="cor" value={dados.cor} onChange={alterarCampo} />

      <label htmlFor="horarios">Horários</label>
      <input id="horarios" name="horarios" value={dados.horarios} onChange={alterarCampo} placeholder="08:00, 20:00" />
      {erros.horarios && <p>{erros.horarios}</p>}

      <label htmlFor="estoque">Comprimidos na caixa</label>
      <input id="estoque" name="estoque" type="number" min="0" value={dados.estoque} onChange={alterarCampo} />
      {erros.estoque && <p>{erros.estoque}</p>}

      <label htmlFor="limiteTemperatura">Temperatura máxima (°C)</label>
      <input id="limiteTemperatura" name="limiteTemperatura" type="number" value={dados.limiteTemperatura} onChange={alterarCampo} />
      {erros.limiteTemperatura && <p>{erros.limiteTemperatura}</p>}

      <label htmlFor="observacao">Observação</label>
      <textarea id="observacao" name="observacao" value={dados.observacao} onChange={alterarCampo} />

      <label htmlFor="ativo">
        <input id="ativo" name="ativo" type="checkbox" checked={dados.ativo} onChange={alterarCampo} />
        Remédio em uso
      </label>

      <button type="submit">Salvar remédio</button>
      <button type="button" onClick={onCancelar}>Cancelar</button>
    </form>
  )
}

export default FormRemedio
