import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the home page</h1>
      <Link to="/nechronica">Nechronicaへ</Link>
    </div>
  )
}
