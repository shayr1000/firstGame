/*
 * WHAT I NEED
 * Reference DOM elements
 */
const newTodoInput = document.querySelector('#newTodoInput');
const todoList = document.querySelector('#todoList');

/*
 *  TodoList logic
 */


function addNewTodoFromInput(keydownEvent) {
  if(keydownEvent.key === 'Enter') {
    createNewListItemFromValue(newTodoInput.value);
  }
}

function createNewListItemFromValue(todoValue) {
  const li = document.createElement('li');

  const div = document.createElement('div');
  div.classList.add('view');

  const inputToggle = document.createElement('input');
  inputToggle.classList.add('toggle');
  inputToggle.type = 'checkbox';

  const label = document.createElement('label');
  label.innerText = todoValue;

  const button = document.createElement('button');
  button.classList.add('destroy');

  div.appendChild(inputToggle);
  div.appendChild(label);
  div.appendChild(button);

  li.appendChild(div);

  const inputEdit = document.createElement('input');
  inputEdit.classList.add('edit');

  li.appendChild(inputEdit);

  todoList.appendChild(li);

  // use template string to create a new list item
  // const item = `
  //      <li>
  //         <div class="view">
  //             <input class="toggle"
  //                    type="checkbox"/>
  //             <label>${todoValue}</label>
  //             <button class="destroy"/>
  //         </div>
  //         <input class="edit"/>
  //     </li>
  // `;
  //
  // todoList.innerHTML += item;
}

/*
 *  attach event listeners to dom elements
 */
newTodoInput.addEventListener('keydown', addNewTodoFromInput);
