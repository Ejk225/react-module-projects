import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">📝 Mini Blog</Link>

      <div className="nav-links">
        <Link to="/">Accueil</Link>

        {user ? (
          // connecté
          <>
            <Link to="/my-articles">Mes articles</Link>
            <Link to="/create">Nouvel article</Link>
            <span className="nav-email">👤 {user.email}</span>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          // déconnecté
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar