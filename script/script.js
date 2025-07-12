// Flatpickr
flatpickr("#due-date", {
    enableTime: false,
    dateFormat: "d M Y",     
    allowInput: true,
    clickOpens: true
});
// Global variable to store the todo list
let todos = [];
// Function to add a new todo item
function addTodo() {
    const taskInput = document.getElementById("todo");
    const dateInput = document.getElementById("due-date");
    
    // Validate input fields
    if (taskInput.value.trim() === "" || dateInput.value.trim() === "") {
        alert("Please fill in both fields.");
        return;
    } else {
        const newTask = {
            id: Date.now(), // Unique ID for each todo
            task: taskInput.value.trim(),
            date: dateInput.value.trim(),
            status: false // false indicates pending
        };
        // Add the new task to the todos array
        todos.push(newTask);
        // Clear the values of input fields
        taskInput.value = "";
        dateInput.value = "";
        displayTodos();
    }
}
// Function to display todos
function displayTodos() {
    const todoListElement = document.getElementById("todo-list");
    todoListElement.innerHTML = ''; // Clear the current list
    
    if (todos.length === 0) {
        todoListElement.innerHTML = `
            <tr class="text-blue-950 text-center">
                <td colspan="4" class="p-4 text-center text-gray-500 noTodos">No todos added yet.</td>
            </tr>
        `;
        return;
    }
    
    todos.forEach(todo => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="p-4">${todo.task}</td>
            <td class="p-4 text-center">${todo.date}</td>
            <td class="p-4 text-center ${todo.status ? 'text-green-600' : 'text-red-950'}">${todo.status ? 'Completed' : 'Pending'}</td>
            <td class="p-4 flex space-x-2 justify-center">
                ${!todo.status ? `<button class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 group relative inline-block duration-300" onclick="markCompleted(${todo.id})">
                    <i class="fa-solid fa-check"></i>
                    <span class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Mark as Completed
                    </span>
                </button>` : ''}
                <button class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 group relative inline-block duration-300" onclick="deleteTodo(${todo.id})">
                    <i class="fa-solid fa-trash"></i>
                    <span class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Delete Todo
                    </span>
                </button>
            </td>
        `;
        todoListElement.appendChild(newRow);
    });
}
// Function to mark a todo item as completed
function markCompleted(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.status = true; // Mark as completed
        displayTodos(); // Refresh the displayed todo list
    }
}
// Function to delete a todo item
function deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if(todoIndex !== -1) {
        // Remove the todo from the todos array
        todos.splice(todoIndex, 1);
        displayTodos(); // Refresh the displayed todo list
    }
}
// Function to clear all todo items
function clearTodos() {
    todos = [];
    displayTodos();
}
// Function to toggle the visibility of completed todos
function toggleTodoList() {
    const filterButton = document.getElementById("filter-completed");
    const isShowingCompleted = filterButton.textContent.trim().toLowerCase() === "show all";
    
    if (isShowingCompleted) {
        // Show all todos
        displayTodos();
        filterButton.textContent = "Completed";
    } else {
        // Show only completed todos
        const todoListElement = document.getElementById("todo-list");
        todoListElement.innerHTML = '';
        
        const completedTodos = todos.filter(todo => todo.status === true);
        
        if (completedTodos.length === 0) {
            todoListElement.innerHTML = `
                <tr class="text-blue-950 text-center">
                    <td colspan="4" class="p-4 text-center text-gray-500">No completed todos yet.</td>
                </tr>
            `;
        } else {
            completedTodos.forEach(todo => {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td class="p-4">${todo.task}</td>
                    <td class="p-4 text-center">${todo.date}</td>
                    <td class="p-4 text-center text-green-600">Completed</td>
                    <td class="p-4 flex space-x-2 justify-center">
                        <button class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 group relative inline-block duration-300" onclick="deleteTodo(${todo.id})">
                            <i class="fa-solid fa-trash"></i>
                            <span class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Delete Todo
                            </span>
                        </button>
                    </td>
                `;
                todoListElement.appendChild(newRow);
            });
        }
        filterButton.textContent = "Show All";
    }
}

// Initialize the todo list display on page load
document.addEventListener('DOMContentLoaded', function() {
    displayTodos();
});
