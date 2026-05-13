import { useState, useEffect } from "react"
import Login from "./Components/Login"
import TodoForm from "./Components/TodoForm"
import TodoList from "./Components/TodoList"
import "./App.css"

const API_URL = "http://localhost:3001"

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [email, setEmail] = useState(localStorage.getItem("email"))
  const [todos, setTodos] = useState([])

  // charger les tâches si connecté
  useEffect(() => {
    if (token) {
      fetchTodos()
    }
  }, [token])

  const fetchTodos = () => {
    fetch(`${API_URL}/todos`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Erreur chargement:", err))
  }

  const handleLogin = (newToken, userEmail) => {
    setToken(newToken)
    setEmail(userEmail)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    setToken(null)
    setEmail(null)
    setTodos([])
  }

  // ajouter une tâche
  const addTodo = (text) => {
    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(() => fetchTodos())
      .catch(err => console.error("Erreur ajout:", err))
  }

  // cocher / décocher
  const toggleTodo = (id) => {
    fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(() => fetchTodos())
      .catch(err => console.error("Erreur toggle:", err))
  }

  // supprimer
  const deleteTodo = (id) => {
    fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(() => fetchTodos())
      .catch(err => console.error("Erreur suppression:", err))
  }

  // si pas connecté → page login
  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="container">
      {/* barre du haut */}
      <div className="header">
        <h1>Ma Todo App 📝</h1>
        <div className="user-info">
          <span>👤 {email}</span>
          <button className="btn-logout" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App