function ContactItem({ contact, onDelete, onEdit }) {
  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{contact.prenom} {contact.nom}</strong>
        <span>{contact.email}</span>
        <span>{contact.telephone}</span>
      </div>
      <div className="contact-boutons">
        <button className="btn-modifier" onClick={() => onEdit(contact)}>✏️ Modifier</button>
        <button className="btn-supprimer" onClick={() => onDelete(contact.id)}>❌ Supprimer</button>
      </div>
    </li>
  )
}

export default ContactItem