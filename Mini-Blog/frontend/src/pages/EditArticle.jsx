import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ArticleForm from "../components/ArticleForm"
import { getArticle, updateArticle } from "../lib/api"
import { useAuth } from "../context/AuthContext"

function EditArticle() {

  const { id } = useParams()
  const { token, user } = useAuth()
  const navigate = useNavigate()

  const [article, setArticle] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    getArticle(id)
      .then(data => {
        // vérifier que l'utilisateur est bien l'auteur
        if (user && data.auteurId !== user.id) {
          navigate("/") // pas l'auteur → redirection
          return
        }
        setArticle(data)
        setChargement(false)
      })
  }, [id])

  const handleSubmit = (titre, contenu) => {
    updateArticle(id, titre, contenu, token)
      .then(() => navigate(`/article/${id}`))
      .catch(err => console.error(err))
  }

  if (chargement) return <p className="message">Chargement...</p>

  return (
    <div className="page">
      <h1>Modifier l'article</h1>
      <ArticleForm onSubmit={handleSubmit} initialData={article} />
    </div>
  )
}

export default EditArticle