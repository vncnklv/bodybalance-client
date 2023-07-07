import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"

import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from "./components/Logout"
import Dashboard from "./pages/Dashboard/Dashboard"
import BodyInformation from "./pages/BodyInformation"
import Profile from "./pages/Profile"
import FoodList from "./pages/FoodList/FoodList";
import { useAuth } from "./contexts/UserProvider";
import Goals from "./pages/Goals"

function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <div>User is Loading</div>

  return (
    <>
      <Header />
      <main className="max-w-screen-lg m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<ProtectedRoute  ><Logout /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
          <Route path="/add-food/:diaryId" element={<ProtectedRoute ><FoodList /></ProtectedRoute>} />
          <Route path="/body-information" element={<ProtectedRoute ><BodyInformation /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />
          <Route path="/set-goals" element={<ProtectedRoute ><Goals /></ProtectedRoute>} />
          <Route path="/set-body-info" element={<ProtectedRoute ><BodyInformation /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
