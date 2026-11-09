import { pessoa } from '../config/pessoa'

function Header() {
  return (
    <header>
      <h1 className="text-4xl font-bold text-pinho-700">Memora</h1>
      <p>Painel do cuidador</p>
      <p>Acompanhando: {pessoa.nome}</p>
    </header>
  )
}

export default Header
