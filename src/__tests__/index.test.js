/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { addTask, editTaskDescription, updateTaskStatus, clearCompletedTasks, renderTasks } from './index';

jest.mock('localstorage-polyfill'); // Or your localStorage polyfill

describe('Task Management Functions', () => {
  let mockLocalStorage;

  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    global.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    it('should add a new task', () => {
      const newTaskDescription = 'Test Task';
      addTask(newTaskDescription);

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expect.any(String));
      const updatedTasks = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(updatedTasks.length).toBe(tasks.length + 1);
      expect(updatedTasks[updatedTasks.length - 1].description).toBe(newTaskDescription);
    });
  });

  describe('editTaskDescription', () => {
    it('should edit the description of an existing task', () => {
      const taskIndex = 0;
      const newDescription = 'Updated Description';
      editTaskDescription(taskIndex, newDescription);

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expect.any(String));
      const updatedTasks = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(updatedTasks[taskIndex].description).toBe(newDescription);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update the completed status of a task', () => {
      const taskIndex = 0;
      const newStatus = true;
      updateTaskStatus(taskIndex, newStatus);

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expect.any(String));
      const updatedTasks = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(updatedTasks[taskIndex].completed).toBe(newStatus);
    });
  });

  describe('clearCompletedTasks', () => {
    it('should remove completed tasks', () => {
      // Arrange: Create tasks with some completed
      const tasksWithCompleted = [
        { description: 'Task 1', completed: true },
        { description: 'Task 2', completed: false },
      ];
      localStorage.getItem.mockReturnValueOnce(JSON.stringify(tasksWithCompleted));

      clearCompletedTasks();

      expect(localStorage.setItem).toHaveBeenCalledWith('tasks', expect.any(String));
      const updatedTasks = JSON.parse(localStorage.setItem.mock.calls[0][1]);
      expect(updatedTasks.length).toBe(1);
      expect(updatedTasks[0].completed).toBe(false);
    });
  });
});
