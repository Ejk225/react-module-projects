const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET = "monSecretMiniBlog"

// base de données en mémoire
let users = [
  { id: 1, email: "test@test.com", password: "1234" }
]
let articles = [
  {
    id: 1,
    titre: "Bienvenue sur le blog",
    contenu: "Ceci est le premier article du blog. Connectez-vous pour créer les vôtres !",
    auteurId: 1,
    auteurEmail: "test@test.com",
    date: new Date().toISOString()
  }
]
let nextUserId = 2
let nextArticleId = 2

// =====================
// MIDDLEWARE - vérifier token
// =====================
const verifierToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  if (!authHeader) return res.status(401).json({ message: "Token manquant" })

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: "Token invalide" })
  }
}

// =====================
// AUTH ROUTES
// =====================

// POST /register
app.post("/register", (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe obligatoires" })
  }

  const existe = users.find(u => u.email === email)
  if (existe) {
    return res.status(400).json({ message: "Email déjà utilisé" })
  }

  const newUser = { id: nextUserId++, email, password }
  users.push(newUser)

  res.status(201).json({ message: "Compte créé avec succès" })
})

// POST /login
app.post("/login", (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email && u.password === password)
  if (!user) {
    return res.status(401).json({ message: "Email ou mot de passe incorrect" })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "2h" })
  res.json({ token, email: user.email, id: user.id })
})

// =====================
// ARTICLES ROUTES
// =====================

// GET /articles - tous les articles (public)
app.get("/articles", (req, res) => {
  // trier par date décroissante
  const tries = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  res.json(tries)
})

// GET /articles/:id - détail d'un article (public)
app.get("/articles/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const article = articles.find(a => a.id === id)

  if (!article) return res.status(404).json({ message: "Article non trouvé" })

  res.json(article)
})

// GET /my-articles - mes articles (privé)
app.get("/my-articles", verifierToken, (req, res) => {
  const mesArticles = articles.filter(a => a.auteurId === req.user.id)
  res.json(mesArticles)
})

// POST /articles - créer un article (privé)
app.post("/articles", verifierToken, (req, res) => {
  const { titre, contenu } = req.body

  if (!titre || !contenu) {
    return res.status(400).json({ message: "Titre et contenu obligatoires" })
  }

  const newArticle = {
    id: nextArticleId++,
    titre,
    contenu,
    auteurId: req.user.id,
    auteurEmail: req.user.email,
    date: new Date().toISOString()
  }

  articles.push(newArticle)
  res.status(201).json(newArticle)
})

// PUT /articles/:id - modifier (auteur uniquement)
app.put("/articles/:id", verifierToken, (req, res) => {
  const id = parseInt(req.params.id)
  const index = articles.findIndex(a => a.id === id)

  if (index === -1) return res.status(404).json({ message: "Article non trouvé" })

  if (articles[index].auteurId !== req.user.id) {
    return res.status(403).json({ message: "Vous n'êtes pas l'auteur de cet article" })
  }

  const { titre, contenu } = req.body
  articles[index] = { ...articles[index], titre, contenu }

  res.json(articles[index])
})

// DELETE /articles/:id - supprimer (auteur uniquement)
app.delete("/articles/:id", verifierToken, (req, res) => {
  const id = parseInt(req.params.id)
  const article = articles.find(a => a.id === id)

  if (!article) return res.status(404).json({ message: "Article non trouvé" })

  if (article.auteurId !== req.user.id) {
    return res.status(403).json({ message: "Vous n'êtes pas l'auteur de cet article" })
  }

  articles = articles.filter(a => a.id !== id)
  res.json({ message: "Article supprimé" })
})

app.listen(3002, () => {
  console.log("Serveur Blog démarré sur http://localhost:3002")
})