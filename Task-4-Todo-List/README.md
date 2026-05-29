# Todo List App

A React todo list application with full CRUD (Create, Read, Update, Delete) functionality.

🔗 **Live Demo:** [https://suyog-shirsat2004.github.io/CODING-SAMURAI-INTERNSHIP-TASK/todo-list/](https://suyog-shirsat2004.github.io/CODING-SAMURAI-INTERNSHIP-TASK/todo-list/)

## Features

- **Create** - Add new tasks with form handling
- **Read** - View all tasks with filtering options
- **Update** - Edit existing tasks inline
- **Delete** - Remove individual tasks
- **Mark Complete** - Toggle task completion status
- **Filter Tasks** - View All, Active, or Completed tasks
- **Statistics** - Track active, completed, and total tasks
- **Persistence** - Tasks saved to localStorage
- **Clear Completed** - Bulk remove completed tasks
- **Delete All** - Remove all tasks with confirmation
- **Animated UI** - Smooth slide-in animations for tasks
- **Smart Empty States** - Context-aware messages when no tasks exist
- **Responsive** - Works on all screen sizes

## Skills Demonstrated

- **Component State** - `useState` for managing todos, input values, editing state, and filters
- **Form Handling** - Controlled inputs with validation
- **CRUD Operations** - Add, edit, delete, and toggle completion
- **localStorage** - Persistent data storage
- **Conditional Rendering** - Empty states, edit mode, filter tabs

## Setup

```bash
cd Task-4-Todo-List
npm install
npm run dev
```

Open http://localhost:5173

## CRUD Operations

| Operation | Function | Description |
|-----------|----------|-------------|
| **Create** | `addTodo()` | Adds new task to list |
| **Read** | `filteredTodos` | Filters and displays tasks |
| **Update** | `saveEdit()` | Edits task text |
| **Delete** | `deleteTodo()` | Removes task from list |
| **Toggle** | `toggleComplete()` | Marks task as done/undone |

## Project Structure

```
Task-4-Todo-List/
├── src/
│   ├── App.jsx         # Main component with CRUD logic
│   ├── index.css       # All styling
│   └── main.jsx        # React entry point
├── index.html
└── package.json
