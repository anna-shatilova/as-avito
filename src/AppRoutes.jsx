import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/login-page/Login'
import { Register } from './pages/login-page/Register'
import { NotFound } from './pages/not-found/NotFound'
import { ProfilePage } from './pages/profile-page/ProfilePage'
import { MainPage } from './pages/main-page/MainPage'
import { AppLayout } from './pages/main-page/AppLayout'
import { SellerProfilePage } from './pages/profile-page/SellerProfilePage'
import { AdvPage } from './pages/adv-page/AdvPage'
// import { ProtectedRout } from './components/ProtectedRout/index'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />

      {/* Outlet. index - это главный роут, его компонент будет отображается при загрузке приложения в компоненте AppLayout. Это и есть outlet (так он называется в AppLayout). На других страницах вместо  outlet будет отображаться разметка этих страниц. */}
      {/* <Route
        element={
          <ProtectedRout
            user={user}
            isAllowed={Boolean(user)}
          />
        }
      > */}
      <Route element={<AppLayout />}>
        <Route
          path="/"
          index
          element={<MainPage />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/seller-profile/:id"
          element={<SellerProfilePage />}
        />
        <Route
          path="/adv/:id"
          element={<AdvPage />}
        />
      </Route>
      {/* </Route> */}
    </Routes>
  )
}
