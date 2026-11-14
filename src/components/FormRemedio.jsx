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
    <form onSubmit={enviar} noValidate
      className="cartao space-y-5">
      <h3 className="text-xl font-bold">{titulo}</h3>

      <div>
        <label htmlFor="nome" className="rotulo">Nome</label>
        <input id="nome" name="nome" value={dados.nome} onChange={alterarCampo} className="campo" />
        {erros.nome && <p className="erro-campo">{erros.nome}</p>}
      </div>

      <div>
        <label htmlFor="dosagem" className="rotulo">Dosagem</label>
        <input id="dosagem" name="dosagem" value={dados.dosagem} onChange={alterarCampo} placeholder="1 comprimido" className="campo" />
      </div>

      <div>
        <label htmlFor="cor" className="rotulo">Cor do comprimido</label>
        <input id="cor" name="cor" value={dados.cor} onChange={alterarCampo} placeholder="Branco, azul" className="campo" />
      </div>

      <div>
        <label htmlFor="horarios" className="rotulo">Horários</label>
        <input id="horarios" name="horarios" value={dados.horarios} onChange={alterarCampo} placeholder="08:00, 20:00" className="campo" />
        {erros.horarios && <p className="erro-campo">{erros.horarios}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="estoque" className="rotulo">Comprimidos na caixa</label>
          <input id="estoque" name="estoque" type="number" min="0" inputMode="numeric" value={dados.estoque} onChange={alterarCampo} className="campo" />
          {erros.estoque && <p className="erro-campo">{erros.estoque}</p>}
        </div>

        <div>
          <label htmlFor="limiteTemperatura" className="rotulo">Temperatura máxima (°C)</label>
          <input id="limiteTemperatura" name="limiteTemperatura" type="number" inputMode="numeric" value={dados.limiteTemperatura} onChange={alterarCampo} className="campo" />
          {erros.limiteTemperatura && <p className="erro-campo">{erros.limiteTemperatura}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="observacao" className="rotulo">Observação</label>
        <textarea id="observacao" name="observacao" value={dados.observacao} onChange={alterarCampo} className="campo min-h-24" />
      </div>

      <label htmlFor="ativo"
        className="flex items-center gap-3 font-bold">
        <input id="ativo" name="ativo" type="checkbox"
          className="size-5 accent-pinho-600"
          checked={dados.ativo} onChange={alterarCampo} />
        Remédio em uso
      </label>

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button type="submit" className="botao-primario">Salvar remédio</button>
        <button type="button" onClick={onCancelar} className="botao-secundario">Cancelar</button>
      </div>
    </form>
  )
}

export default FormRemedio
