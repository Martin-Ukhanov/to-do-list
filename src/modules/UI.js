import {toDoList} from "./toDoList";
import {task} from "./task";

const UI = (() => {
    const projectBtns = document.querySelectorAll('#menu nav button.project');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addTaskBtn = document.getElementById('add-task-btn');

    let activeProject = 'All';

    const createCustomProjectBtn = (name) => {
        const btn = document.createElement('button');
        btn.classList.add('project');

        const projectName = document.createElement('p');
        projectName.textContent = name;

        btn.appendChild(projectName);

        return btn;
    }

    const activateOverlay = () => {
        const overlay = document.getElementById('overlay');
        overlay.classList.add('active');
    };
    
    const deactivateOverlay = () => {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active');
    };

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
        const project = toDoList.getProject(name);
        const activeProjectHeading = document.querySelector('#content h2');

        activeProject = name;
        activeProjectHeading.textContent = name;
        
        tasksGrid.innerHTML = '';
        
        for (const task of project.getTasks()) {
            const taskCard = createTask(task);
            tasksGrid.appendChild(taskCard);
        }
    }

    // Load All project by default
    loadProject(activeProject);

    // Load corresponding project
    projectBtns.forEach((projectBtn) => {
        projectBtn.addEventListener('click', () => {
            projectBtns.forEach((projectBtn) => {
                projectBtn.classList.remove('active');
            });
            projectBtn.classList.add('active');
            loadProject(projectBtn.lastElementChild.textContent);
        });
    });

    // Activate add task modal
    addTaskBtn.addEventListener('click', () => {
        const modal = document.getElementById('modal');

        activateOverlay();

        modal.innerHTML = '';
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

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const project = toDoList.getProject(activeProject);
            let projectName = project.getName();

            if (projectName === 'All' || projectName !== 'Today' || projectName !== 'This Week') {
                projectName = 'No Project';
            }
    
            project.addTask(task(nameInput.value, projectName, 1, dueDateInput.value));

            loadProject(activeProject);

            modal.classList.remove('active');
            deactivateOverlay();
        });

        modal.appendChild(heading);
        modal.appendChild(form);
    });
})();

export {UI};