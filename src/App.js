import { useState } from 'react'
import { AppRoutes } from './AppRoutes'
import { useNavigate } from 'react-router-dom'

export const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const handleLogin = () => setUser(localStorage.setItem('user', 'token'))
  const handleLogout = () => {
    setUser(localStorage.clear())
    navigate('/login', { replace: true })
  }

  return (
    <AppRoutes
      user={user}
      onAuthButtonClick={user ? handleLogout : handleLogin}
    />
  )
}
