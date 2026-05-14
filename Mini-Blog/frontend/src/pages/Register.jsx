import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../lib/api"

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erreur, setErreur] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {
    setErreur("")
    if (!email || !password) {
      setErreur("Tous les champs sont obligatoires")
      return
    }

    registerUser(email, password)
      .then(data => {
        if (data.message === "Compte créé avec succès") {
          setMessage("Compte créé ! Redirection...")
          setTimeout(() => navigate("/login"), 1500)
        } else {
          setErreur(data.message)
        }
      })
      .catch(() => setErreur("Erreur de connexion au serveur"))
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Inscription</h1>

        {erreur && <p className="erreur">{erreur}</p>}
        {message && <p className="success">{message}</p>}

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

        <button onClick={handleSubmit}>Créer mon compte</button>

        <p className="auth-switch">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default Register