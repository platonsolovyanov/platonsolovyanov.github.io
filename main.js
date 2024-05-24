let arr = [];

let input = document.getElementById("input-todo");
let saveBtn = document.getElementById("save-btn");

let todos = document.getElementsByClassName("todos")[0];

const todosSession = sessionStorage.getItem("todos");

const todosParse = JSON.parse(todosSession);
if (todosParse.length > 0) {
    arr = todosParse;
    todosParse.map(el => {
        addTodo(el)
    })
}

let clearBtn = document.getElementsByClassName("clear-btn");

let originalPush = arr.push;
let originlPop = arr.pop;

arr.push = function(...args) {
    addTodo(...args);
    return originalPush.apply(this, args);
}

saveBtn.addEventListener("click", () => {
    if (input.value === "") return;
    arr.push({"id" : arr.length, "value" : input.value});    
    const todosString = JSON.stringify(arr);
    sessionStorage.setItem("todos", todosString);
})

function addTodo(...args) {
    const newTodo = document.createElement("li");
    const deleteBtn = document.createElement('button');

    newTodo.textContent = args[0].value;
    newTodo.className = "todo";

    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-dtn';
    deleteBtn.addEventListener('click', deleteTodo);

    newTodo.appendChild(deleteBtn);

    todos.appendChild(newTodo);

    newTodo.id = args[0].id;   
    input.value = '';
}

function deleteTodo () {
    const deleteEl = this.parentNode;
    const deleteElText = deleteEl.childNodes[0].nodeValue.trim();

    const index = arr.findIndex(el => el => el.id == deleteEl.id && el.value === deleteElText);    
        
    if (index !== -1) {
        arr.splice(index, 1);
        sessionStorage.removeItem("todos");        
        sessionStorage.setItem("todos", JSON.stringify(arr));
        this.parentNode.remove();
    }        
}

