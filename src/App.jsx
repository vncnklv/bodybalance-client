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
import Profile from "./pages/Profile/Profile"
import FoodList from "./pages/FoodList/FoodList";
import { useAuth } from "./contexts/UserProvider";
import Goals from "./pages/Goals"
import ChangePassoword from "./pages/Profile/ChangePassword"
import AddFood from "./pages/AddFood"
import Weight from "./pages/Weight/Weight"
import Trainers from "./pages/Trainers/Trainers"
import BecomeATrainer from "./pages/BecomeATrainer"
import Clients from "./pages/Clients/Clients"
import UserList from "./pages/UserList/UserList"
import Loader from "./components/Loader"

function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <div className="h-screen" ><Loader /></div>

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
          <Route path="/change-password" element={<ProtectedRoute ><ChangePassoword /></ProtectedRoute>} />
          <Route path="/add-food" element={<ProtectedRoute ><AddFood /></ProtectedRoute>} />
          <Route path="/weight" element={<ProtectedRoute><Weight /></ProtectedRoute >} />
          <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute >} />
          <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute >} />
          <Route path="/become-a-trainer" element={<ProtectedRoute><BecomeATrainer /></ProtectedRoute >} />
          <Route path="/admin" element={<ProtectedRoute><UserList /></ProtectedRoute >} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
