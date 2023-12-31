import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRout = ({ redirectPath = '/login' }) => {
  if (!localStorage.getItem('auth')) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    )
  }
  return <Outlet />
}
