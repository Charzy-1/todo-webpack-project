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
