import { useState } from "react"

function TodoForm({ onAdd }) {

  const [texte, setTexte] = useState("")

  const handleClick = () => {
    if (texte === "") return
    onAdd(texte)
    setTexte("") // vider le champ après ajout
  }

  return (
    <div className="form-todo">
      <input
        type="text"
        placeholder="Ajouter une tâche..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
      />
      <button onClick={handleClick}>Ajouter</button>
    </div>
  )
}

export default TodoForm