import { Link } from "react-router-dom"

function ArticleCard({ article }) {

  // afficher seulement les 100 premiers caractères du contenu
  const apercu = article.contenu.length > 100
    ? article.contenu.substring(0, 100) + "..."
    : article.contenu

  const date = new Date(article.date).toLocaleDateString("fr-FR")

  return (
    <div className="article-card">
      <h2>{article.titre}</h2>
      <p className="article-meta">Par {article.auteurEmail} · {date}</p>
      <p className="article-apercu">{apercu}</p>
      <Link to={`/article/${article.id}`} className="btn-lire">Lire la suite →</Link>
    </div>
  )
}

export default ArticleCard