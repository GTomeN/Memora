import { pessoa } from '../config/pessoa'

function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 gap-4 lg:block">
      <div>
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex gap-1">
            <span className="size-2.5 rounded-full bg-manha" />
            <span className="size-2.5 rounded-full bg-tarde" />
            <span className="size-2.5 rounded-full bg-noite" />
          </span>

          <h1 className="text-2xl font-bold text-pinho-700">Memora</h1>
        </div>
        <p className="text-base text-tinta-suave">Painel do cuidador</p>
      </div>

      <p className="text-base rounded-xl bg-pinho-50 px-3 py-2 lg:mt-6">
        <span className="block text-tinta-suave">Acompanhando</span>
        <span className="block font-bold text-pinho-700">{pessoa.nome}</span>
      </p>
    </header>
  )
}
export default Header
