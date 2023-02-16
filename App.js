// Get references to DOM elements


/* These lines of code get references to the HTML elements 
with the IDs "todoInput", "addBtn", "todoList", and "clear-btn", respectively, 
using the document.getElementById() method. */
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearBtn = document.getElementById("clear-btn");

// Get todos from local storage, or an empty array if none exist

/* This line of code retrieves the user's to-do list from local storage 
by calling localStorage.getItem("todos"). The result is then passed to the JSON.parse() method 
to convert it from a JSON string to a JavaScript object. 
If there are no to-dos stored in local storage, an empty array is assigned to the todos variable. */
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render todos to the DOM
function renderTodos() {




    // Clear existing todo items
    /* This function clears all the existing to-do items by setting the innerHTML of the todoList element to an empty string. */

    todoList.innerHTML = "";

    // Loop through todos and create DOM elements for each one
    /* This loop iterates over the todos array and creates a new set of HTML elements 
    for each to-do item, including a list item (li), a label (label), a checkbox (checkbox), 
    an "Edit" button (editBtn), and a "Delete" button (deleteBtn). */
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const li = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        // Configure checkbox element
        /* This block of code sets the type and checked attributes of the checkbox element 
        and adds an event listener to it that updates the done property of the corresponding 
        to-do item in the todos array, saves the updated to-dos to local storage using the saveTodos() function, 
        and applies or removes the "completed" class from the corresponding list item depending on the state of the checkbox. */
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;
        checkbox.addEventListener("change", function () {
            todo.done = this.checked;
            saveTodos();
            li.classList.toggle("completed", this.checked); // apply "completed" class to li element
        });

        // Configure label element
        /* This line of code sets the textContent property of the label element to the text of the current to-do item. */
        label.textContent = todo.text;

        // Configure edit button element
        /* This block of code sets the textContent property of the "Edit" button, 
        adds the "edit-btn" class to it, and adds an event listener to it that 
        displays a prompt asking the user to enter new text for the corresponding to-do item. If */
        editBtn.textContent = "Edit";
        // add "edit-btn" class to button element
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", function () {
            const newText = prompt("Enter new text for this todo", todo.text);
            if (newText) {
                todo.text = newText;
                saveTodos();
                renderTodos();
            }
        });

        // Configure delete button element
        deleteBtn.textContent = "Delete";
        // add "delete-btn" class to button element
        /* This block of code is configuring a delete button element. It sets the button's text content to "Delete" and adds a class "delete-btn" to it. It also adds an event listener to the button that deletes the corresponding to-do item from the list when clicked. The splice() method is used to remove the item from the todos array. The saveTodos() function is then called to save the updated list to localStorage, and the renderTodos() function is called to update the list on the webpage. */

        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            todos.splice(i, 1);
            saveTodos();
            renderTodos();
        });



        /* This block of code sets up a clear button element that, when clicked, clears all to-do items from the list. It also prompts the user for confirmation before deleting all the items. The button is disabled if there are no items in the list, so the user cannot accidentally delete an empty list. If the button is not disabled, the confirmation message is shown, and if the user confirms, the todos array is emptied, the list is updated, and the button is disabled again.
   
        */
        // to prompt the user for confirmation before clearing all the todos
        if (todos.length > 0) {
            clearBtn.removeAttribute("disabled");
        } else {
            clearBtn.setAttribute("disabled", true);
        }

        clearBtn.addEventListener("click", function () {
            /* check whether the disabled attribute is already set on the button before showing the confirmation message
            If the button is not disabled, we show the confirmation message and then set the disabled attribute on the button */
            if (!clearBtn.hasAttribute("disabled")) {
                const confirmed = confirm("Are you sure you want to delete everything?");
                if (confirmed) {
                    todos = [];
                    saveTodos();
                    renderTodos();
                    // use the disabled attribute on the button element to disable it after it's clicked
                    clearBtn.setAttribute("disabled", true);
                }
            }
        });

        /* This block of code adds the various elements that make up a to-do item (checkbox, label, edit button, delete button) to a new li element. If the to-do item is marked as done, the completed class is added to the li element. Finally, the li element is added to the todoList element on the webpage. */
        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Apply "completed" class to li element if the todo is marked as done
        if (todo.done) {
            li.classList.add("completed");
        }

        // Add list item to list
        todoList.appendChild(li);
    }
}

// Save todos to local storage
function saveTodos() {
    // Use the setItem() method of the localStorage object to store the todos array as a JSON string
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add new todo to list
function addTodo() {
    // Get the text input value and remove any leading or trailing white spaces
    const text = todoInput.value.trim();
    if (text) {   // if text is not empty
        // Add a new object to the todos array with the text and done status of the new todo
        todos.push({
            text: text,
            done: false,
        });


        saveTodos(); // Call saveTodos() function to save the new todo to local storage

        renderTodos(); // Call renderTodos() function to update the UI with the new todo


        todoInput.value = ""; // Clear the input field by setting its value to an empty string
    }
}

// Handle form submission
function handleFormSubmit(event) { // Prevent the default form submission behavior
    event.preventDefault();  // Call addTodo() function to add a new todo to the list
    addTodo();
}

// Add event listeners to DOM elements
addBtn.addEventListener("click", addTodo); // When the "Add" button is clicked, call the addTodo() function to add a new todo to the list
todoInput.addEventListener("keypress", function (event) { // When a key is pressed in the text input field, check if the key is "Enter", and if it is, call the addTodo() function to add a new todo to the list
    if (event.key === "Enter") {
        addTodo();
    }
});

// When the DOM content has been loaded, call the renderTodos() function to update the UI with the todos from local storage
document.addEventListener("DOMContentLoaded", renderTodos);

// When the form is submitted, call the handleFormSubmit() function to handle the form submission
document.querySelector("form").addEventListener("submit", handleFormSubmit);
