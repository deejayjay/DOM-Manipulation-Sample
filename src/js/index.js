const btnTry1 = document.querySelector(".btn-try1");
const btnTry2 = document.querySelector(".btn-try2");

btnTry1.addEventListener("click", renderToDoOne);
btnTry2.addEventListener("click", renderToDoTwo);

// Render the first todo list which uses the first approach
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

// Render the first todo list which uses the second approach
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

  // querySelector() can be used on the document fragment returned by the
  // createContextualFragment() function just like using on any other HTML element.
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
      // Get reference to the todo item clicked & its parent
      const todoItem = e.target;
      const todoParent = todoItem.parentNode;
      console.log(`You clicked ${todoItem.textContent}`);
      console.log(todoParent);

      // Remove the todo item from the DOM
      todoItem.remove();

      // If the todo list is now empty, add a placeholder to indicate
      // there are no todo items
      if (todoParent.children.length < 1) {
        const noToDoItems = "<li>No ToDo Items</li>";
        todoParent.insertAdjacentHTML("beforeend", noToDoItems);
      }
    });
  }
}

// This function iterates through a parent element and
// removes all its children and event handlers attached to them.
// NOTE: Using parent.innerHTML = "" to remove child nodes does not
// remove the event handlers of the child nodes, causing a memory leak.
// Ref: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
