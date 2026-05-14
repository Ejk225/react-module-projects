import { useState, useEffect } from "react"
import ArticleCard from "../components/ArticleCard"
import { getArticles } from "../lib/api"

function Home() {

  const [articles, setArticles] = useState([])
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    getArticles()
      .then(data => {
        setArticles(data)
        setChargement(false)
      })
      .catch(() => setChargement(false))
  }, [])

  if (chargement) return <p className="message">Chargement...</p>

  return (
    <div className="page">
      <h1>Tous les articles</h1>

      {articles.length === 0 ? (
        <p className="message">Aucun article pour le moment.</p>
      ) : (
        <div className="articles-grid">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home