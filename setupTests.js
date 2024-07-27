// Mock localStorage
global.localStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(() => JSON.stringify([])), // Or return a default value
  removeItem: jest.fn(),
  clear: jest.fn(),
};
