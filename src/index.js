import './style.css';

// Initialize tasks from localStorage or as an empty array if not available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to update task indexes
const updateTaskIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

// Function to render tasks to the HTML list
const renderTasks = () => {
  const todoList = document.getElementById('todo-list');
  if (!todoList) return;

  todoList.innerHTML = ''; // Clear the list before rendering

  // Sort tasks by index
  tasks.sort((a, b) => a.index - b.index);

  // Render each task
  tasks.forEach((task, i) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }
    taskItem.setAttribute('draggable', true);
    taskItem.setAttribute('data-index', i);
    taskItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${i}">
      <span contenteditable="false">${task.description}</span>
      <div class="menu">
        <i class="fa-solid fa-ellipsis-v" data-index="${i}"></i>
        <i class="fa-solid fa-trash" data-index="${i}"></i>
      </div>
    `;
    todoList.appendChild(taskItem);

    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const deleteButton = taskItem.querySelector('.fa-trash');
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((_, idx) => idx !== i);
      updateTaskIndexes(); // Update indexes after deletion
      saveTasks();
      renderTasks();
    });

    const menuButton = taskItem.querySelector('.fa-ellipsis-v');
    menuButton.addEventListener('click', () => {
      taskItem.classList.toggle('show-bin');
      const span = taskItem.querySelector('span');
      span.contentEditable = taskItem.classList.contains('show-bin');
      if (span.contentEditable === 'true') {
        span.focus();
      }
    });

    const span = taskItem.querySelector('span');
    span.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        span.contentEditable = false;
        task.description = span.innerText;
        saveTasks();
        renderTasks();
      }
    });

    taskItem.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', i);
      taskItem.classList.add('dragging');
    });

    taskItem.addEventListener('dragend', () => {
      taskItem.classList.remove('dragging');
    });

    taskItem.addEventListener('dragover', (e) => {
      e.preventDefault();
      taskItem.classList.add('drag-over');
    });

    taskItem.addEventListener('dragleave', () => {
      taskItem.classList.remove('drag-over');
    });

    taskItem.addEventListener('drop', (e) => {
      e.preventDefault();
      taskItem.classList.remove('drag-over');
      const draggedIndex = e.dataTransfer.getData('text/plain');
      const targetIndex = i;
      const draggedTask = tasks.splice(draggedIndex, 1)[0];
      tasks.splice(targetIndex, 0, draggedTask);
      updateTaskIndexes(); // Update indexes after reordering
      saveTasks();
      renderTasks();
    });
  });
};

// Function to add a new task
const addTask = (description) => {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
};

// Function to edit a task's description
const editTaskDescription = (index, newDescription) => {
  if (tasks[index]) {
    tasks[index].description = newDescription;
    saveTasks();
    renderTasks();
  }
};

// Function to update a task's completed status
const updateTaskStatus = (index, status) => {
  if (tasks[index]) {
    tasks[index].completed = status;
    saveTasks();
    renderTasks();
  }
};

// Function to clear all completed tasks
const clearCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
  updateTaskIndexes(); // Update indexes after clearing completed tasks
  saveTasks();
  renderTasks();
};

// Export functions for testing
export { addTask, editTaskDescription, updateTaskStatus, clearCompletedTasks, renderTasks };

// Initial render of tasks
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();

  const taskForm = document.getElementById('task-form');
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const description = taskInput.value.trim();
    if (description) {
      addTask(description);
      taskInput.value = '';
    }
  });

  const clearCompletedButton = document.getElementById('clear-completed');
  clearCompletedButton.addEventListener('click', clearCompletedTasks);
});
