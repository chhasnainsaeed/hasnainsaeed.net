import { useRoutes } from 'react-router-dom'
import { appRoutes } from './routes'

function AppRoutes() {
  const element = useRoutes(appRoutes)

  return element
}

export default function App() {
  return <AppRoutes />
}
