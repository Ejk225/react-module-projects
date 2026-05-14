import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMyArticles, deleteArticle } from "../lib/api"
import { useAuth } from "../context/AuthContext"

function MyArticles() {

  const { token } = useAuth()
  const [articles, setArticles] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    fetchMesArticles()
  }, [])

  const fetchMesArticles = () => {
    getMyArticles(token)
      .then(data => {
        setArticles(data)
        setChargement(false)
      })
      .catch(() => setChargement(false))
  }

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cet article ?")) return

    deleteArticle(id, token)
      .then(() => fetchMesArticles())
      .catch(err => console.error(err))
  }

  if (chargement) return <p className="message">Chargement...</p>

  return (
    <div className="page">
      <div className="page-header">
        <h1>Mes articles</h1>
        <Link to="/create" className="btn-new">+ Nouvel article</Link>
      </div>

      {articles.length === 0 ? (
        <p className="message">Vous n'avez pas encore écrit d'articles.</p>
      ) : (
        <ul className="my-articles-list">
          {articles.map(article => (
            <li key={article.id} className="my-article-item">
              <div>
                <h3>{article.titre}</h3>
                <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="my-article-actions">
                <Link to={`/article/${article.id}`}>👁️ Voir</Link>
                <Link to={`/edit/${article.id}`}>✏️ Modifier</Link>
                <button onClick={() => handleDelete(article.id)}>❌ Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyArticles