const express = require("express")
const cors = require("cors")

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// base de données temporaire en mémoire
let contacts = []
let nextId = 1

// GET - récupérer tous les contacts
app.get("/contacts", (req, res) => {
  res.json(contacts)
})

// POST - ajouter un contact
app.post("/contacts", (req, res) => {
  const { prenom, nom, email, telephone } = req.body

  // validation basique
  if (!prenom || !nom || !email || !telephone) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" })
  }

  const newContact = {
    id: nextId++,
    prenom,
    nom,
    email,
    telephone
  }

  contacts.push(newContact)
  res.status(201).json(newContact)
})

// PUT - modifier un contact
app.put("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { prenom, nom, email, telephone } = req.body

  const index = contacts.findIndex(c => c.id === id)

  if (index === -1) {
    return res.status(404).json({ message: "Contact non trouvé" })
  }

  contacts[index] = { id, prenom, nom, email, telephone }
  res.json(contacts[index])
})

// DELETE - supprimer un contact
app.delete("/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id)
  contacts = contacts.filter(c => c.id !== id)
  res.json({ message: "Contact supprimé" })
})

// lancement du serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000")
})