// import './style.css';

const todos = [
  { description: 'Buy groceries', completed: false, index: 3 },
  { description: 'Read a book', completed: true, index: 2 },
  { description: 'Write code', completed: false, index: 1 },
];

function populateTodoList(todoArray, listElement) {
  // Sort the array based on the index values
  todoArray.sort((a, b) => a.index - b.index);

  // Clear any existing items in the list
  listElement.innerHTML = '';

  for (let i = 0; i < todoArray.length; i += 1) {
    const todo = todoArray[i];
    const listItem = document.createElement('li');
    listItem.textContent = `${todo.description} - ${todo.completed ? 'Done' : 'Not done'}`;
    if (todo.completed) {
      listItem.classList.add('done');
    }
    listElement.appendChild(listItem);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const todoListElement = document.getElementById('todo-list');
  populateTodoList(todos, todoListElement);
});
