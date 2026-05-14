import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { getArticle, deleteArticle } from "../lib/api"
import { useAuth } from "../context/AuthContext"

function ArticleDetail() {

  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [article, setArticle] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    getArticle(id)
      .then(data => {
        setArticle(data)
        setChargement(false)
      })
      .catch(() => setChargement(false))
  }, [id])

  const handleDelete = () => {
    if (!window.confirm("Supprimer cet article ?")) return

    deleteArticle(id, token)
      .then(() => navigate("/my-articles"))
      .catch(err => console.error(err))
  }

  if (chargement) return <p className="message">Chargement...</p>
  if (!article) return <p className="message">Article non trouvé.</p>

  const date = new Date(article.date).toLocaleDateString("fr-FR")
  // vérifier si l'utilisateur connecté est l'auteur
  const estAuteur = user && user.id === article.auteurId

  return (
    <div className="page article-detail">
      <Link to="/" className="btn-retour">← Retour</Link>

      <h1>{article.titre}</h1>
      <p className="article-meta">Par {article.auteurEmail} · {date}</p>

      <div className="article-contenu">
        <p>{article.contenu}</p>
      </div>

      {/* boutons modifier/supprimer uniquement pour l'auteur */}
      {estAuteur && (
        <div className="article-actions">
          <Link to={`/edit/${article.id}`} className="btn-modifier">✏️ Modifier</Link>
          <button onClick={handleDelete} className="btn-supprimer">❌ Supprimer</button>
        </div>
      )}
    </div>
  )
}

export default ArticleDetail