import { pessoa } from '../config/pessoa'

function Header() {
  return (
    <header>
      <h1>Memora</h1>
      <p>Painel do cuidador</p>
      <p>Acompanhando: {pessoa.nome}</p>
    </header>
  )
}

export default Header
