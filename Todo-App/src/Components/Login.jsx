import { useState } from "react"

const API_URL = "http://localhost:3001"

function Login({ onLogin }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [erreur, setErreur] = useState("")
  const [mode, setMode] = useState("login") // "login" ou "register"
  const [message, setMessage] = useState("")

  const handleSubmit = () => {
    setErreur("")
    setMessage("")

    if (!email || !password) {
      setErreur("Email et mot de passe obligatoires")
      return
    }

    const route = mode === "login" ? "/login" : "/register"

    fetch(`${API_URL}${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          // connexion réussie
          localStorage.setItem("token", data.token)
          localStorage.setItem("email", data.email)
          onLogin(data.token, data.email)
        } else if (data.message === "Compte créé avec succès") {
          setMessage("Compte créé ! Vous pouvez vous connecter.")
          setMode("login")
        } else {
          setErreur(data.message)
        }
      })
      .catch(() => setErreur("Erreur de connexion au serveur"))
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Ma Todo App 📝</h1>
        <h2>{mode === "login" ? "Connexion" : "Créer un compte"}</h2>

        {message && <p className="success">{message}</p>}
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

        <button onClick={handleSubmit}>
          {mode === "login" ? "Se connecter" : "S'inscrire"}
        </button>

        <p className="switch-mode">
          {mode === "login" ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <span onClick={() => { setMode(mode === "login" ? "register" : "login"); setErreur(""); setMessage("") }}>
            {mode === "login" ? " S'inscrire" : " Se connecter"}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login