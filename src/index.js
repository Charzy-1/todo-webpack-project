// import './style.css';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  { description: 'Wash the dishes', completed: false, index: 1 },
  { description: 'Complete todo list project', completed: false, index: 2 },
  { description: 'Add project link in the resume', completed: false, index: 3 },
];

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear the list before rendering

  tasks.sort((a, b) => a.index - b.index);

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
      <span>${task.description}</span>
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
      saveTasks();
      renderTasks();
    });

    const menuButton = taskItem.querySelector('.fa-ellipsis-v');
    menuButton.addEventListener('click', () => {
      taskItem.classList.toggle('show-bin');
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
      tasks.forEach((task, index) => {
        task.index = index + 1;
      });
      saveTasks();
      renderTasks();
    });
  });
};

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

const clearCompletedTasks = () => {
  tasks = tasks.filter(task => !task.completed);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  saveTasks();
  renderTasks();
};

document.getElementById('task-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const taskInput = document.getElementById('task-input');
  addTask(taskInput.value);
  taskInput.value = ''; // Clear the input field
});

document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);

window.onload = () => {
  renderTasks();
};
