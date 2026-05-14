import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }) {
  const { token } = useAuth()

  // si pas connecté → redirection vers /login
  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute