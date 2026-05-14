import { createContext, useContext, useState } from "react"

// on crée le contexte
const AuthContext = createContext()

// hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem("email")
    const id = localStorage.getItem("userId")
    return email ? { email, id: parseInt(id) } : null
  })

  const login = (token, email, id) => {
    localStorage.setItem("token", token)
    localStorage.setItem("email", email)
    localStorage.setItem("userId", id)
    setToken(token)
    setUser({ email, id })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("userId")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider