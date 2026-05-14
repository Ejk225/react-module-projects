import { useState } from "react"

function ArticleForm({ onSubmit, initialData }) {

  const [titre, setTitre] = useState(initialData?.titre || "")
  const [contenu, setContenu] = useState(initialData?.contenu || "")
  const [erreur, setErreur] = useState("")

  const handleSubmit = () => {
    if (!titre.trim() || !contenu.trim()) {
      setErreur("Titre et contenu obligatoires")
      return
    }
    setErreur("")
    onSubmit(titre, contenu)
  }

  return (
    <div className="article-form">
      {erreur && <p className="erreur">{erreur}</p>}

      <input
        type="text"
        placeholder="Titre de l'article"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <textarea
        placeholder="Contenu de l'article..."
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        rows={8}
      />

      <button onClick={handleSubmit}>
        {initialData ? "Sauvegarder" : "Publier"}
      </button>
    </div>
  )
}

export default ArticleForm