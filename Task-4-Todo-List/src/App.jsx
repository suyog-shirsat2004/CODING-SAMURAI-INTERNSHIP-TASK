import { useState, useEffect } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTodos([newTodo, ...todos])
    setInputValue('')
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const startEdit = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }

  const saveEdit = (id) => {
    if (editValue.trim() === '') return

    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editValue.trim() } : todo
    ))
    setEditingId(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const deleteAll = () => {
    if (todos.length > 0 && window.confirm('Delete all tasks?')) {
      setTodos([])
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="todo-header">
          <h1 className="app-title">Todo List</h1>
          <p className="app-subtitle">Organize your tasks efficiently</p>
        </header>

        <form className="add-todo-form" onSubmit={addTodo}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-btn">
            <span className="btn-icon">+</span> Add
          </button>
        </form>

        <div className="todo-stats">
          <div className="stat-item">
            <span className="stat-label">Active:</span>
            <span className="stat-value active">{activeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value total">{todos.length}</span>
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p className="empty-title">No tasks yet</p>
            <p className="empty-subtitle">Add a task to get started</p>
          </div>
        ) : filteredTodos.length === 0 && (
          <div className="empty-state">
            <p className="empty-title">No {filter} tasks</p>
            <p className="empty-subtitle">
              {filter === 'active' ? 'All tasks are completed!' : filter === 'completed' ? 'No completed tasks yet' : ''}
            </p>
          </div>
        )}

        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="todo-checkbox"
                />

                {editingId === todo.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(todo.id)
                        if (e.key === 'Escape') cancelEdit()
                      }}
                    />
                    <div className="edit-actions">
                      <button className="save-btn" onClick={() => saveEdit(todo.id)}>Save</button>
                      <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="todo-text-wrapper">
                    <span className={`todo-text ${todo.completed ? 'completed-text' : ''}`}>
                      {todo.text}
                    </span>
                    <span className="todo-date">
                      {new Date(todo.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {editingId !== todo.id && (
                <div className="todo-actions">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => startEdit(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="action-bar">
          {completedCount > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed ({completedCount})
            </button>
          )}
          {todos.length > 0 && (
            <button className="delete-all-btn" onClick={deleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoApp
