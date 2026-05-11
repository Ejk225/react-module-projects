import { useState, useEffect } from "react"
import ContactForm from "./Components/ContactForm"
import ContactList from "./Components/ContactList"
import "./App.css"

const API_URL = "http://localhost:3000/contacts"

function App() {

  const [contacts, setContacts] = useState([])
  const [contactAModifier, setContactAModifier] = useState(null)
  const [recherche, setRecherche] = useState("")

  // charger les contacts au démarrage
  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Erreur chargement:", err))
  }

  // ajouter un contact
  const addContact = (contact) => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    })
      .then(res => res.json())
      .then(() => fetchContacts())
      .catch(err => console.error("Erreur ajout:", err))
  }

  // modifier un contact
  const updateContact = (id, contact) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    })
      .then(res => res.json())
      .then(() => {
        fetchContacts()
        setContactAModifier(null) // fermer le formulaire de modif
      })
      .catch(err => console.error("Erreur modification:", err))
  }

  // supprimer un contact
  const deleteContact = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetchContacts())
      .catch(err => console.error("Erreur suppression:", err))
  }

  // filtrer + trier par nom (bonus)
  const contactsFiltres = contacts
    .filter(c =>
      `${c.prenom} ${c.nom} ${c.email}`.toLowerCase().includes(recherche.toLowerCase())
    )
    .sort((a, b) => a.nom.localeCompare(b.nom))

  return (
    <div className="container">
      <h1>Gestionnaire de Contacts 📋</h1>

      <ContactForm
        onAdd={addContact}
        onUpdate={updateContact}
        contactAModifier={contactAModifier}
        onAnnuler={() => setContactAModifier(null)}
      />

      {/* barre de recherche (bonus) */}
      <input
        className="recherche"
        type="text"
        placeholder="🔍 Rechercher un contact..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      <ContactList
        contacts={contactsFiltres}
        onDelete={deleteContact}
        onEdit={setContactAModifier}
      />
    </div>
  )
}

export default App