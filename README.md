# TypeScript Todo List Application

A simple and efficient Todo List application built with TypeScript. This application allows users to manage their tasks with features like adding, editing, and deleting todos.

## Features

- Add new todo items
- Edit existing todo items
- Delete todo items
- Mark todos as completed
- View all todos
- Get specific todo by ID

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-typescript.git
cd todo-typescript
```

2. Install dependencies:

```bash
npm install
```

3. Build the TypeScript project:

```bash
npm run build
```

## Usage

1. Start the application:

```bash
npm start
```

2. The application will run in the console, demonstrating the basic functionality with some sample todos.

## Project Structure

```
todo-typescript/
├── src/
│   └── todo.ts        # Main application code
├── dist/              # Compiled JavaScript files
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

## Example Usage

```typescript
const todoList = new TodoList();

// Add a new todo
todoList.addTodo('Learn TypeScript');

// Edit a todo
todoList.editTodo(1, 'Master TypeScript');

// Toggle completion status
todoList.toggleTodo(1);

// Remove a todo
todoList.removeTodo(1);

// Get all todos
const allTodos = todoList.getAllTodos();
```

## Screenshots

[Add screenshots of the application running in the console here]

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
