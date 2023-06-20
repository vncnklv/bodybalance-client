import { Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { usePromiseTracker } from "react-promise-tracker";

import Header from "./components/Header"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Logout from "./components/Logout"
import Dashboard from "./pages/Dashboard/Dashboard"
import BodyInformation from "./pages/BodyInformation"
import Profile from "./pages/Profile"

function App() {
  const { promiseInProgress } = usePromiseTracker({ area: 'user' });
  return (
    <>
      {promiseInProgress
        ? <div>Loading</div>
        : <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/logout" element={<ProtectedRoute  ><Logout /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
            <Route path="/body-information" element={<ProtectedRoute ><BodyInformation /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      }
    </>
  )
}

export default App
