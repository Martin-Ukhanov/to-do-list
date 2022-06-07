const initNav = () => {
    const allTasksBtn = document.getElementById('all-tasks-btn');
    const todayTasksBtn = document.getElementById('today-tasks-btn');
    const thisWeekTasksBtn = document.getElementById('this-week-tasks-btn');
    const completedTasksBtn = document.getElementById('completed-tasks-btn');
    const tasksNavBtns = document.querySelectorAll('main > nav .tasks-nav button');

    allTasksBtn.addEventListener('click', () => loadProject('all'));
}

const initAddTaskBtn = () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    // addTaskBtn.addEventListener('click', () => );
}

const createButton = (type) => {
    const btn = document.createElement('button');
    btn.classList.add('material-symbols-outlined');
    btn.textContent = type;
    return btn;
}

const createTask = (task) => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task');

    // Text
    const textContainer = document.createElement('div');

    const projectName = document.createElement('p');
    projectName.textContent = task.getProject();

    const name = document.createElement('h2');
    name.textContent = task.getName();

    const dueDate = document.createElement('p');
    dueDate.textContent = task.getDueDate();

    textContainer.appendChild(projectName);
    textContainer.appendChild(name);
    textContainer.appendChild(dueDate);

    // Nav
    const nav = document.createElement('nav');

    const completeBtn = createButton('check_box_outline_blank');
    const infoBtn = createButton('info');
    const settingsBtn = createButton('settings');

    nav.appendChild(completeBtn);
    nav.appendChild(infoBtn);
    nav.appendChild(settingsBtn);

    // Priority
    switch (task.getPriority()) {
        case 1:
            taskContainer.classList.add('priority-1');
            break;
        case 2:
            taskContainer.classList.add('priority-2');
            break;
        case 3:
            taskContainer.classList.add('priority-3');
            break;
    }

    taskContainer.appendChild(textContainer);
    taskContainer.appendChild(nav);

    return taskContainer;
}

const loadProject = (name) => {

}

export {createTask};