function textoDoAviso(aviso) {
  if (aviso.dias === 0) {
    return `${aviso.nome}: o estoque acabou.`
  }
  if (aviso.dias === 1) {
    return `${aviso.nome}: o estoque dá para mais 1 dia.`
  }
  return `${aviso.nome}: o estoque dá para mais ${aviso.dias} dias.`
}

function AvisoReposicao({ avisos }) {
  if (avisos.length === 0) {
    return null
  }

  return (
    <section aria-label="Aviso de reposição">
      <h3>Hora de comprar mais</h3>
      <ul>
        {avisos.map((aviso) => (
          <li key={aviso.id}>{textoDoAviso(aviso)}</li>
        ))}
      </ul>
    </section>
  )
}

export default AvisoReposicao
