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
      <aside className="bg-superficie lg:sticky lg:top-0 lg:h-dvh lg:shadow-[18px_0_16px_rgba(0,0,0,0.06)] lg:z-10 shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
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
