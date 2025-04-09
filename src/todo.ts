interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

class TodoList {
  private todos: TodoItem[] = [];
  private nextId: number = 1;
  private todoInput: HTMLInputElement;
  private todoList: HTMLUListElement;

  constructor() {
    this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
    this.todoList = document.getElementById('todoList') as HTMLUListElement;
    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    const addButton = document.getElementById('addTodo');
    if (addButton) {
      addButton.addEventListener('click', () => this.handleAddTodo());
    }

    this.todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleAddTodo();
      }
    });
  }

  private handleAddTodo(): void {
    const title = this.todoInput.value.trim();
    if (title) {
      this.addTodo(title);
      this.todoInput.value = '';
    }
  }

  // Add a new todo item
  addTodo(title: string): TodoItem {
    const newTodo: TodoItem = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
    this.renderTodo(newTodo);
    return newTodo;
  }

  // Remove a todo item by ID
  removeTodo(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    if (todoElement) {
      todoElement.remove();
    }
    return this.todos.length !== initialLength;
  }

  // Toggle completion status of a todo item
  toggleTodo(id: number): boolean {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      const todoElement = document.querySelector(`[data-id="${id}"]`);
      if (todoElement) {
        todoElement.classList.toggle('completed');
      }
      return true;
    }
    return false;
  }

  // Edit a todo item's title
  editTodo(id: number, newTitle: string): boolean {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = newTitle;
      const titleElement = document.querySelector(`[data-id="${id}"] span`);
      if (titleElement) {
        titleElement.textContent = newTitle;
      }
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

  private renderTodo(todo: TodoItem): void {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id.toString();
    if (todo.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

    const span = document.createElement('span');
    span.textContent = todo.title;
    span.className = 'todo-title';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', () =>
      this.startEditing(todo.id, span)
    );

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => this.removeTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    this.todoList.appendChild(li);
  }

  private startEditing(id: number, spanElement: HTMLSpanElement): void {
    const todo = this.getTodoById(id);
    if (!todo) return;

    // Create input field
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.title;
    input.className = 'edit-input';

    // Replace span with input
    spanElement.replaceWith(input);
    input.focus();

    // Handle save on Enter or blur
    const saveEdit = () => {
      const newTitle = input.value.trim();
      if (newTitle) {
        this.editTodo(id, newTitle);
      }
      input.replaceWith(spanElement);
    };

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });

    input.addEventListener('blur', saveEdit);
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TodoList();
});
