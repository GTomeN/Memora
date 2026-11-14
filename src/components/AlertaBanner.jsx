import { Link } from 'react-router-dom'

function AlertaBanner({ quantidade }) {
  if (quantidade === 0) {
    return null
  }

  let texto = `Tem ${quantidade} avisos esperando você.`
  if (quantidade === 1) {
    texto = 'Tem 1 aviso esperando você.'
  }

  return (
    <section
      aria-label="Avisos pendentes"
      className="flex flex-col gap-3 rounded-2xl 
      border-2 border-atencao-300 bg-atencao-50 p-4 
      sm:flex-row sm:items-center sm:justify-between">

      <p className="font-bold text-atencao-800">{texto}</p>
      <Link className="botao-primario" to="/alertas">Ver avisos</Link>
    </section>
  )
}

export default AlertaBanner