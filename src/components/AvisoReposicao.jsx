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
    <section aria-label="Aviso de reposição" 
    className="cartao border-l-8 
    border-l-atencao-300">

      <h3 className="font-bold">Hora de comprar mais</h3>
      <ul className="mt-2 space-y-1 text-tinta-suave"></ul>
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
