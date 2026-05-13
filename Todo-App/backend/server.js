const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// clé secrète pour les tokens JWT
const SECRET = "monSecretTodoApp"

// base de données temporaire en mémoire
let users = [
  { id: 1, email: "test@test.com", password: "1234" }  // ← utilisateur fictif
]
let todos = []
let nextTodoId = 1

// =====================
// MIDDLEWARE - vérifier le token
// =====================
const verifierToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(401).json({ message: "Token manquant" })
  }

  const token = authHeader.split(" ")[1] // format : "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded // on attache l'user au request
    next()
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" })
  }
}

// =====================
// AUTH ROUTES
// =====================

// POST /register - créer un compte
// app.post("/register", (req, res) => {
//  const { email, password } = req.body

//  if (!email || !password) {
 //   return res.status(400).json({ message: "Email et mot de passe obligatoires" })
  //}

  // vérifier si l'email existe déjà
 // const existe = users.find(u => u.email === email)
 // if (existe) {
   // return res.status(400).json({ message: "Email déjà utilisé" })
  //}

  //const newUser = { id: Date.now(), email, password }
  //users.push(newUser)

  //res.status(201).json({ message: "Compte créé avec succès" })
//})

// POST /login - se connecter
app.post("/login", (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" })
  }

  // générer un token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" })

  res.json({ token, email: user.email })
})

// =====================
// TODOS ROUTES (protégées)
// =====================

// GET /todos - récupérer les tâches de l'utilisateur connecté
app.get("/todos", verifierToken, (req, res) => {
  const mesTodos = todos.filter(t => t.userId === req.user.id)
  res.json(mesTodos)
})

// POST /todos - ajouter une tâche
app.post("/todos", verifierToken, (req, res) => {
  const { text } = req.body

  if (!text) {
    return res.status(400).json({ message: "Le texte est obligatoire" })
  }

  const newTodo = {
    id: nextTodoId++,
    text,
    completed: false,
    userId: req.user.id // chaque tâche appartient à un user
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// PUT /todos/:id - modifier (cocher/décocher)
app.put("/todos/:id", verifierToken, (req, res) => {
  const id = parseInt(req.params.id)
  const index = todos.findIndex(t => t.id === id && t.userId === req.user.id)

  if (index === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" })
  }

  todos[index].completed = !todos[index].completed
  res.json(todos[index])
})

// DELETE /todos/:id - supprimer une tâche
app.delete("/todos/:id", verifierToken, (req, res) => {
  const id = parseInt(req.params.id)
  todos = todos.filter(t => !(t.id === id && t.userId === req.user.id))
  res.json({ message: "Tâche supprimée" })
})

// lancement
app.listen(3001, () => {
  console.log("Serveur Todo démarré sur http://localhost:3001")
})