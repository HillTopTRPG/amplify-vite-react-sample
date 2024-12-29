import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import NechronicaRoutes from '@/service/Nechronica/Routes.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {NechronicaRoutes()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
