import { useNavigate } from "react-router-dom"
import ArticleForm from "../components/ArticleForm"
import { createArticle } from "../lib/api"
import { useAuth } from "../context/AuthContext"

function CreateArticle() {

  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (titre, contenu) => {
    createArticle(titre, contenu, token)
      .then(data => {
        navigate(`/article/${data.id}`) // redirection vers l'article créé
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="page">
      <h1>Nouvel article</h1>
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateArticle