import { NavLink } from 'react-router-dom'

const estiloLink = "block whitespace-nowrap rounded-xl px-4 py-2.5 text-base font-bold text-tinta-suave hover:bg-pinho-50 aria-[current=page]:bg-pinho-600 aria-[current=page]:text-white"

function NavMenu() {
  return (
    <nav>
      <ul className="flex gap-1 overflow-x-auto px-4 pb-3 lg:flex-col [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <li><NavLink to="/" end className={estiloLink}>Hoje</NavLink></li>
        <li><NavLink to="/remedios" className={estiloLink}>Remédios</NavLink></li>
        <li><NavLink to="/rede-de-cuidado" className={estiloLink}>Rede de cuidado</NavLink></li>
        <li><NavLink to="/lembrete-de-voz" className={estiloLink}>Lembrete de voz</NavLink></li>
        <li><NavLink to="/historico" className={estiloLink}>Histórico</NavLink></li>
        <li><NavLink to="/alertas" className={estiloLink}>Alertas</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavMenu
