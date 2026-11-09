import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavMenu from './components/NavMenu'
import Hoje from './pages/Hoje'
import Remedios from './pages/Remedios'
import RedeCuidado from './pages/RedeCuidado'
import LembreteVoz from './pages/LembreteVoz'
import Historico from './pages/Historico'
import Alertas from './pages/Alertas'

function App() {
  return (
      <div className="min-h-dvh bg-fundo lg:grid lg:grid-cols-[17rem_1fr]">
        <aside className="border-b border-linha bg-superficie lg:border-r lg:border-b-0 lg:sticky lg:top-0 lg:h-dvh">
          <Header />
          <NavMenu />
        </aside>

      <main className="px-4 py-6 lg:py-12">
        <div className="mx-auto max-w-3xl">
          <Routes>
            <Route path="/" element={<Hoje />} />
            <Route path="/remedios" element={<Remedios />} />
            <Route path="/rede-de-cuidado" element={<RedeCuidado />} />
            <Route path="/lembrete-de-voz" element={<LembreteVoz />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/alertas" element={<Alertas />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
