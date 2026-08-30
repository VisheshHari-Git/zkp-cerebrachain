import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Analysis from './pages/Analysis/Analysis.jsx'
import { DemoStateProvider } from './context/DemoStateContext.jsx'

function App() {
  return (
    <DemoStateProvider>
      <div className="min-h-screen flex flex-col bg-void text-ink">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DemoStateProvider>
  )
}

export default App
