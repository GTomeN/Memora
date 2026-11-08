function ListaRemedios({ remedios, onEditar, onExcluir }) {
  if (remedios.length === 0) {
    return <p>Nenhum remédio cadastrado ainda.</p>
  }

  return (
    <ul>
      {remedios.map((remedio) => (
        <li key={remedio.id}>
          <h3>{remedio.nome}</h3>
          <p>{remedio.dosagem} · cor {remedio.cor}</p>
          <p>Horários: {remedio.horarios.join(', ')}</p>
          <p>Estoque: {remedio.estoque}</p>
          <p>Temperatura máxima: {remedio.limiteTemperatura} °C</p>
          {remedio.observacao && <p>Observação: {remedio.observacao}</p>}
          {!remedio.ativo && <p>Pausado: não entra nas doses do dia.</p>}
          <button type="button" onClick={() => onEditar(remedio)}>Editar</button>
          <button type="button" onClick={() => onExcluir(remedio)}>Excluir</button>
        </li>
      ))}
    </ul>
  )
}

export default ListaRemedios
