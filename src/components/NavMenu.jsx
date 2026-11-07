import { NavLink } from 'react-router-dom'

function NavMenu() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" end>Hoje</NavLink></li>
        <li><NavLink to="/remedios">Remédios</NavLink></li>
        <li><NavLink to="/rede-de-cuidado">Rede de cuidado</NavLink></li>
        <li><NavLink to="/lembrete-de-voz">Lembrete de voz</NavLink></li>
        <li><NavLink to="/historico">Histórico</NavLink></li>
        <li><NavLink to="/alertas">Alertas</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavMenu
