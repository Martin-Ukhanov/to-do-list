import {toDoList} from "./toDoList";
import {task} from "./task";

const initUI = () => {
    initMenu();
    initAddTaskBtn();
};

const initMenu = () => {
    const defaultProjectBtns = document.querySelectorAll('#menu nav.default-projects button');
    const customProjectBtns = document.querySelectorAll('#menu nav.custom-projects button');
    const addProjectBtn = document.getElementById('add-project-btn');

    const deactivateDefaultProjectBtns = () => {
        defaultProjectBtns.forEach((defaultProjectBtn) => {
            defaultProjectBtn.classList.remove('active');
        });
    }

    const deactivateCustomProjectBtns = () => {
        customProjectBtns.forEach((customProjectBtn) => {
            customProjectBtn.classList.remove('active');
        });
    }

    const createCustomProjectBtn = (name) => {
        const btn = document.createElement('button');
        const text = document.createElement('p');
        text.textContent = name;
        btn.appendChild(text);
        return btn;
    }

    const p = toDoList.getProject('All');
    p.addTask(task('Homework', 'School', 3, '08/05/2022'));

    // Load All project by default
    loadProject('All');

    // Load corresponding default project when button is clicked
    defaultProjectBtns.forEach((defaultProjectBtn) => {
        defaultProjectBtn.addEventListener('click', () => {
            deactivateDefaultProjectBtns();
            defaultProjectBtn.classList.add('active');
            loadProject(defaultProjectBtn.lastElementChild.textContent);
        });
    });

    // Load corresponding custom project when button is clicked
    customProjectBtns.forEach((customProjectBtn) => {
        customProjectBtn.addEventListener('click', () => {
            deactivateCustomProjectBtns();
            customProjectBtn.classList.add('active');
            loadProject(customProjectBtn.firstElementChild.textContent);
        });
    });

    // Create new project
};

const initAddTaskBtn = () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', () => addTask());
};

const addTask = () => {
    activateOverlay();
    activateAddTaskModal();
};

const activateOverlay = () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
};

const deactivateOverlay = () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
};

const activateAddTaskModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('active');

    const heading = document.createElement('h2');
    heading.textContent = 'Add Task';

    const form = document.createElement('form');

    // Name input
    const nameInputContainer = document.createElement('div');

    const nameInputLabel = document.createElement('label');
    nameInputLabel.setAttribute('for', 'name-input');
    nameInputLabel.textContent = 'Name:';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name-input');

    nameInputContainer.appendChild(nameInputLabel);
    nameInputContainer.appendChild(nameInput);

    // Due date input
    const dueDateInputContainer = document.createElement('div');
    
    const dueDateInputLabel = document.createElement('label');
    dueDateInputLabel.setAttribute('for', 'due-date-input');
    dueDateInputLabel.textContent = 'Due Date:';

    const dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('id', 'due-date-input');

    dueDateInputContainer.appendChild(dueDateInputLabel);
    dueDateInputContainer.appendChild(dueDateInput);

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.textContent = 'Submit';
    
    form.appendChild(nameInputContainer);
    form.appendChild(dueDateInputContainer);
    form.appendChild(submitBtn);

    modal.appendChild(heading);
    modal.appendChild(form);
}

const deactivateModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    modal.innerHTML = '';
}

const createTask = (task) => {
    const createIconBtn = (iconType) => {
        const btn = document.createElement('button');
        btn.classList.add('material-symbols-outlined');
        btn.textContent = iconType;
        return btn;
    };

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

    const completeBtn = createIconBtn('check_box_outline_blank');
    const infoBtn = createIconBtn('info');
    const settingsBtn = createIconBtn('settings');

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
};

const loadProject = (name) => {
    const tasksGrid = document.getElementById('tasks-grid');
    const activeProject = document.querySelector('#content .heading');
    const project = toDoList.getProject(name);

    activeProject.textContent = name;

    tasksGrid.innerHTML = '';

    for (const task of project.getTasks()) {
        const taskCard = createTask(task);
        tasksGrid.appendChild(taskCard);
    }
}

export {initUI};