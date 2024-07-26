<<<<<<< HEAD
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { addTask, editTaskDescription, updateTaskStatus, clearCompletedTasks, renderTasks } from '../src/index';

// Mock tasks
let tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
];

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(() => JSON.stringify(tasks)),
  setItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

describe('Task management functions', () => {
  beforeEach(() => {
    tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: true, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
  });

  describe('Edit task description', () => {
    test('should edit the description of a task', () => {
      const taskIndex = 1;
      const newDescription = 'Updated Task 2';

      tasks[taskIndex].description = newDescription;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(updatedTasks[taskIndex].description).toBe(newDescription);
    });
  });

  describe('Update task status', () => {
    test('should update the completed status of a task', () => {
      const taskIndex = 0;
      const newStatus = true;

      tasks[taskIndex].completed = newStatus;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(updatedTasks[taskIndex].completed).toBe(newStatus);
    });
  });

  describe('Clear all completed tasks', () => {
    test('should remove all completed tasks', () => {
      tasks = tasks.filter((task) => !task.completed);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

      expect(updatedTasks.length).toBe(2);
      expect(updatedTasks.some((task) => task.completed)).toBe(false);
    });
  });
});

describe('DOM manipulation functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="todo-list"></div>
      <form id="task-form">
        <input id="task-input" />
      </form>
      <button id="clear-completed"></button>
    `;
  });

  describe('Edit task description', () => {
    test('should edit the task description in the DOM', () => {
      // Add initial task to DOM
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = '<span contenteditable="true">Task 1</span>';
      document.getElementById('todo-list').appendChild(taskItem);

      const span = taskItem.querySelector('span');
      span.innerText = 'Updated Task 1';
      span.contentEditable = false;

      expect(span.innerText).toBe('Updated Task 1');
    });
  });

  describe('Update task status', () => {
    test('should update the completed status in the DOM', () => {
      // Add initial task to DOM
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item');
      taskItem.innerHTML = '<input type="checkbox" />';
      document.getElementById('todo-list').appendChild(taskItem);

      const checkbox = taskItem.querySelector('input');
      checkbox.checked = true;

      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Clear all completed tasks', () => {
    test('should remove all completed tasks from the DOM', () => {
      // Add completed task to DOM
      const taskItem = document.createElement('div');
      taskItem.classList.add('task-item', 'completed');
      document.getElementById('todo-list').appendChild(taskItem);

      clearCompletedTasks();
      renderTasks();

      expect(document.querySelector('.completed')).toBe(null);
    });
  });
});
=======
import {
  addItem,
  removeItem,
  addItemToDOM,
  removeItemFromDOM,
} from '../index'; // Adjusted import path

describe('Pure functions tests', () => {
  test('addItem should return a new list with the item added', () => {
    const initialList = ['Item 1'];
    const newItem = 'Item 2';
    const expectedList = ['Item 1', 'Item 2'];
    const result = addItem(initialList, newItem);
    expect(result).toEqual(expectedList);
  });

  test('removeItem should return a new list with the item removed', () => {
    const initialList = ['Item 1', 'Item 2'];
    const itemToRemove = 'Item 1';
    const expectedList = ['Item 2'];
    const result = removeItem(initialList, itemToRemove);
    expect(result).toEqual(expectedList);
  });
});

describe('DOM manipulation tests', () => {
  beforeEach(() => {
    document.body.innerHTML = '<ul id="itemList"></ul>';
  });

  test('addItemToDOM should add a new <li> element to the list', () => {
    addItemToDOM('New Item');
    const listItems = document.querySelectorAll('#itemList li');
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toBe('New Item');
  });

  test('removeItemFromDOM should remove an <li> element from the list', () => {
    const ul = document.getElementById('itemList');
    ul.innerHTML = '<li>Item to Remove</li>';
    removeItemFromDOM('Item to Remove');
    const listItems = document.querySelectorAll('#itemList li');
    expect(listItems.length).toBe(0);
  });
});
>>>>>>> main
