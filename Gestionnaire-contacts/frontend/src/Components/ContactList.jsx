import ContactItem from "./ContactItem"

function ContactList({ contacts, onDelete, onEdit }) {

  if (contacts.length === 0) {
    return <p className="vide">Aucun contact trouvé.</p>
  }

  return (
    <ul className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

export default ContactList