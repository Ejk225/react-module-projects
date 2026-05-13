

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {/* si complété on barre le texte */}
      <span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "gray" : "black" }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  )
}

export default TodoItem