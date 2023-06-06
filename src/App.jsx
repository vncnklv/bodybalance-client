import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from "./components/Logout"
import Dashboard from "./pages/Dashboard/Dashboard"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { AuthProvider } from "./contexts/UserProvider"

function App() {
  return (
    <AuthProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<ProtectedRoute ><Logout /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </AuthProvider>
  )
}

export default App
