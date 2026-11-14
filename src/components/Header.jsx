import { pessoa } from '../config/pessoa'

function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-3 gap-4 lg:block">
      <div>
        <div className="flex items-center gap-2">
          <span>
            <svg aria-hidden="true" viewBox="0 0 32 32" className="size-8">
              <path d="M15.2 29.5 C9.5 28 3.8 23 2.6 13 C5 15 7.6 17.3 10 19.7 C9.9 17.9 10.7 16.3 12.3 15.4 C12.3 18 13.3 20.6 15.2 22.6 Z" className="fill-pinho-700" />
              <path d="M16.8 29.5 C22.5 28 28.2 23 29.4 13 C27 15 24.4 17.3 22 19.7 C22.1 17.9 21.3 16.3 19.7 15.4 C19.7 18 18.7 20.6 16.8 22.6 Z" className="fill-pinho-700" />
              <circle cx="8.4" cy="11.6" r="3.2" className="fill-manha" />
              <circle cx="16" cy="7.4" r="3.2" className="fill-tarde" />
              <circle cx="23.6" cy="11.6" r="3.2" className="fill-noite" />
            </svg>
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
