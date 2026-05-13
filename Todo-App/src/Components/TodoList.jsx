import TodoItem from "./TodoItem"

function TodoList({ todos, onToggle, onDelete }) {

  // si pas de tâches
  if (todos.length === 0) {
    return <p>Aucune tâche pour l'instant.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList