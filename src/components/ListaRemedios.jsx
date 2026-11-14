function ListaRemedios({ remedios, onEditar, onExcluir }) {
  if (remedios.length === 0) {
    return <p className="cartao text-tinta-suave">Nenhum remédio cadastrado ainda.</p>
  }

  return (
    <ul className="grid gap-3">
      {remedios.map((remedio) => (
        <li key={remedio.id} className="cartao">
          <h3 className="text-xl font-bold">{remedio.nome}</h3>

          <div className="mt-2 space-y-1 text-tinta-suave">
            <p>{remedio.dosagem} · cor {remedio.cor}</p>
            <p>Horários: {remedio.horarios.join(', ')}</p>
            <p>Estoque: {remedio.estoque}</p>
            <p>Temperatura máxima: {remedio.limiteTemperatura} °C</p>
            {remedio.observacao && <p>Observação: {remedio.observacao}</p>}
          </div>

          {!remedio.ativo && (
            <p className="mt-3 inline-block rounded-full 
            bg-fundo px-3 py-1 text-base font-bold 
            text-tinta-suave">
              Pausado: não entra nas doses do dia.
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => onEditar(remedio)}
              className="botao-secundario">Editar</button>
            <button type="button" onClick={() => onExcluir(remedio)}
              className="botao-discreto">Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ListaRemedios