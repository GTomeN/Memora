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
    <section aria-label="Avisos pendentes">
      <p>{texto}</p>
      <Link to="/alertas">Ver avisos</Link>
    </section>
  )
}

export default AlertaBanner
