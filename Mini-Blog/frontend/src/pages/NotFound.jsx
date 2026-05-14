import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>Cette page n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound