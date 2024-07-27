import { addTask, editTaskDescription, updateTaskStatus, clearCompletedTasks, renderTasks } from '../index';


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

describe('Task Management Functions', () => {
  beforeEach(() => {
    tasks = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: true, index: 2 },
      { description: 'Task 3', completed: false, index: 3 },
    ];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(tasks));
  });

  test('should edit the description of a task', () => {
    const taskIndex = 1;
    const newDescription = 'Updated Task 2';

    editTaskDescription(taskIndex, newDescription);
    const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

    expect(updatedTasks[taskIndex].description).toBe(newDescription);
  });

  test('should update the completed status of a task', () => {
    const taskIndex = 0;
    const newStatus = true;

    updateTaskStatus(taskIndex, newStatus);
    const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

    expect(updatedTasks[taskIndex].completed).toBe(newStatus);
  });

  test('should remove all completed tasks', () => {
    clearCompletedTasks();
    const updatedTasks = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks.some((task) => task.completed)).toBe(false);
  });
});
