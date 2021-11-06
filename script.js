let textInput = document.querySelector('#input-task');
let btnAdd = document.querySelector('#add-task-button');
let btnDelete = document.querySelectorAll('.delete-btn');
let list = document.querySelector('#task-list');
let taskList = [];

function addTask(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        taskList.push(todo);
        addToLocalStorage(taskList);
        textInput.value = '';
    }
}

function renderTodos() {
    list.innerHTML = '';
    taskList.forEach(function(item) {
        const checked = item.completed ? 'checked': null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
          <input type="checkbox" class="checkbox" ${checked}>
          <span class="task">${item.name}</span>
          <button class="delete-btn">D</button>
        `;
        list.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('tasks', JSON.stringify(todos));
    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    if (reference) {
        taskList = JSON.parse(reference);
        renderTodos(taskList);
    }
}
getFromLocalStorage();

btnAdd.addEventListener('click', function(e) {
    e.preventDefault();
    addTask(textInput.value);
})

function toggle(id) {
    taskList.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(taskList);
}

function deleteTodo(id) {
    taskList = taskList.filter(function(item) {
        return item.id != id;
    });
    console.log(taskList);
    addToLocalStorage(taskList);
}

list.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    
    if (event.target.classList.contains('delete-btn')) {
         deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
