const input = document.querySelector('.input_task');
const addTask = document.querySelector('.submit_btn');
const taskContainer = document.querySelector('.tasksList');
const saveTasks = document.querySelector('.save_btn');


async function addTasks(task) {
    const newDiv = document.createElement('div');
        newDiv.classList.add('task');
        newDiv.innerHTML = `<input type="checkbox" class="checkbox"><div class="task_text">${task}</div><i class="fa-solid fa-x"></i>`
        taskContainer.appendChild(newDiv);
}
async function retrieveInput() {
    const task = input.value;
    if(task) {
        addTasks(task);
        saveInputToLocalStorage(task)
        input.value='';
        TaskFunctionality();
    }
    else {
        alert(`Type the task before adding!!!`)
    }
}
async function saveInputToLocalStorage(task) {
    let checkLength  = localStorage.length;
    localStorage.setItem(`task${checkLength++}`, JSON.stringify(task));
}
async function retriveDataFromLocalStorage() {
    let length = localStorage.length;
    for(let i = 0; i < localStorage.length; i++) {
        let task = JSON.parse(localStorage.getItem(`task${i}`));
        addTasks(task);
    }
}
retriveDataFromLocalStorage();

async function TaskFunctionality() {
   const taskItem = document.querySelectorAll('.task');
    taskItem.forEach(item => item.addEventListener('click', (e) => {   
    if(e.target.classList.contains('checkbox')) {
        e.target.checked = true;
        console.log(e.currentTarget);
        e.currentTarget.querySelector('.task_text').classList.add('checkedTask')
    }
    else {
        for(let i = 0; i < localStorage.length; i++) {
            let itemFromLocal = JSON.parse(localStorage.getItem(`task${i}`));
            let itemToDelete = e.currentTarget.querySelector('.task_text').textContent;
            if(itemToDelete === itemFromLocal) {
                localStorage.removeItem(`task${i}`);
            }
        }
        e.currentTarget.remove();
    }
})); 
}





TaskFunctionality();
addTask.addEventListener('click', retrieveInput);


