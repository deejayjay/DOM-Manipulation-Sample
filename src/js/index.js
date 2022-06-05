const btnTry1 = document.querySelector(".btn-try1");
const btnTry2 = document.querySelector(".btn-try2");

btnTry1.addEventListener("click", renderToDoOne);
btnTry2.addEventListener("click", renderToDoTwo);

// This function iterates through a parent element and
// removes all its children and event handlers attached to them
function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function renderToDoOne() {
  const todoOneWrapper = document.querySelector(".list1-wrapper");

  // First, clear all Children
  removeAllChildren(todoOneWrapper);

  // Create a template string that represents the
  // ToDoItems list
  const ts = `
              <ul class="list list1">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </ul>
  `;

  // Add the ToDoItems list to the page
  todoOneWrapper.insertAdjacentHTML("beforeend", ts);

  // Now, get a NodeList of ToDoItems and convert it to an array of ToDoItems (using spread operator)
  const toDoItems = [...document.querySelectorAll(".list1 > li")];

  // Add the ToDo list to the wrapper
  attachClickEventToToDoItems(toDoItems);
}

function renderToDoTwo() {
  const todoTwoWrapper = document.querySelector(".list2-wrapper");

  // First, clear all Children
  removeAllChildren(todoTwoWrapper);

  const ts = `
              <ul class="list list2">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </ul>
  `;

  const toDoList = document
    .createRange()
    .createContextualFragment(ts)
    .querySelector(".list.list2");

  // Get a NodeList of all <li> elements and convert it to array (using spread operator)
  const toDoItems = [...toDoList.querySelectorAll("li")];

  // Add a click event to each toDoItem
  attachClickEventToToDoItems(toDoItems);

  // Add the ToDo list to the wrapper
  todoTwoWrapper.appendChild(toDoList);
}

// Adds a click event to each items in the toDoItems array
function attachClickEventToToDoItems(toDoItems) {
  for (const item of toDoItems) {
    item.addEventListener("click", (e) => {
      console.log(`You clicked ${e.target.textContent}`);
      e.target.remove();
      console.log(e.target);
    });
  }
}
