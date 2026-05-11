import { useState, useEffect } from "react"

function ContactForm({ onAdd, onUpdate, contactAModifier, onAnnuler }) {

  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [erreurs, setErreurs] = useState({})

  // si on clique sur "Modifier", remplir le formulaire
  useEffect(() => {
    if (contactAModifier) {
      setPrenom(contactAModifier.prenom)
      setNom(contactAModifier.nom)
      setEmail(contactAModifier.email)
      setTelephone(contactAModifier.telephone)
    } else {
      viderFormulaire()
    }
  }, [contactAModifier])

  const viderFormulaire = () => {
    setPrenom("")
    setNom("")
    setEmail("")
    setTelephone("")
    setErreurs({})
  }

  // validation des champs (bonus)
  const valider = () => {
    const nouvErreurs = {}

    if (!prenom.trim()) nouvErreurs.prenom = "Le prénom est obligatoire"
    if (!nom.trim()) nouvErreurs.nom = "Le nom est obligatoire"
    if (!email.trim()) {
      nouvErreurs.email = "L'email est obligatoire"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nouvErreurs.email = "Email invalide"
    }
    if (!telephone.trim()) nouvErreurs.telephone = "Le téléphone est obligatoire"

    setErreurs(nouvErreurs)
    return Object.keys(nouvErreurs).length === 0
  }

  const handleSubmit = () => {
    if (!valider()) return

    const contact = { prenom, nom, email, telephone }

    if (contactAModifier) {
      onUpdate(contactAModifier.id, contact)
    } else {
      onAdd(contact)
    }

    viderFormulaire()
  }

  return (
    <div className="form-contact">
      <h2>{contactAModifier ? "Modifier le contact" : "Ajouter un contact"}</h2>

      <div className="champs">
        <div>
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          {erreurs.prenom && <span className="erreur">{erreurs.prenom}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          {erreurs.nom && <span className="erreur">{erreurs.nom}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {erreurs.email && <span className="erreur">{erreurs.email}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          {erreurs.telephone && <span className="erreur">{erreurs.telephone}</span>}
        </div>
      </div>

      <div className="boutons-form">
        <button onClick={handleSubmit}>
          {contactAModifier ? "Sauvegarder" : "Ajouter"}
        </button>
        {contactAModifier && (
          <button className="btn-annuler" onClick={onAnnuler}>Annuler</button>
        )}
      </div>
    </div>
  )
}

export default ContactForm