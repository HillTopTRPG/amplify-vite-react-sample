import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home.tsx'
import NotFound from '@/pages/NotFound.tsx'
import NechronicaRoutes from '@/service/Nechronica/Routes.tsx'
import NechronicaRoutes2 from '@/service/Nechronica2/Routes.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {NechronicaRoutes()}
        {NechronicaRoutes2()}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
