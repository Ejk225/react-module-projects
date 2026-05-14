import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { loginUser } from "../lib/api"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erreur, setErreur] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    setErreur("")
    if (!email || !password) {
      setErreur("Tous les champs sont obligatoires")
      return
    }

    loginUser(email, password)
      .then(data => {
        if (data.token) {
          login(data.token, data.email, data.id)
          navigate("/") // redirection vers l'accueil
        } else {
          setErreur(data.message)
        }
      })
      .catch(() => setErreur("Erreur de connexion au serveur"))
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Connexion</h1>

        {erreur && <p className="erreur">{erreur}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>Se connecter</button>

        <p className="auth-switch">
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}

export default Login