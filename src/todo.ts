interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;

  // Add a new todo item
  addTodo(title: string): TodoItem {
    const newTodo: TodoItem = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // Remove a todo item by ID
  removeTodo(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length !== initialLength;
  }

  // Toggle completion status of a todo item
  toggleTodo(id: number): boolean {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      return true;
    }
    return false;
  }

  // Edit a todo item's title
  editTodo(id: number, newTitle: string): boolean {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = newTitle;
      return true;
    }
    return false;
  }

  // Get all todos
  getAllTodos(): TodoItem[] {
    return [...this.todos];
  }

  // Get a specific todo by ID
  getTodoById(id: number): TodoItem | undefined {
    return this.todos.find((todo) => todo.id === id);
  }
}

// Example usage
const todoList = new TodoList();

// Add some sample todos
todoList.addTodo('Learn TypeScript');
todoList.addTodo('Build a Todo App');
todoList.addTodo('Upload to GitHub');

// Display all todos
console.log('All Todos:');
console.log(todoList.getAllTodos());

// Toggle completion status of the first todo
todoList.toggleTodo(1);

// Edit the second todo
todoList.editTodo(2, 'Build an Awesome Todo App');

// Remove the third todo
todoList.removeTodo(3);

// Display updated todos
console.log('\nUpdated Todos:');
console.log(todoList.getAllTodos());
