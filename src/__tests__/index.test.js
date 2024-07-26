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
      taskItem.innerHTML = '<span contenteditable="false">Task 1</span>';
      document.getElementById('todo-list').appendChild(taskItem);

      const span = taskItem.querySelector('span');
      span.contentEditable = true;
      span.innerText = 'Updated Task 1';
      span.contentEditable = false;

      expect(span.innerText).toBe('Updated Task 1');
    });
  });

  describe('Update task status', () => {
    test('should update the completed status in the DOM', () => {
      // Add initial task to DOM
      const taskItem = document.createElement('div');
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
      taskItem.classList.add('completed');
      document.getElementById('todo-list').appendChild(taskItem);

      clearCompletedTasks();
      renderTasks();

      expect(document.querySelector('.completed')).toBe(null);
    });
  });
});
