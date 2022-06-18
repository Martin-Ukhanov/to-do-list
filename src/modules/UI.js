import {toDoList} from "./toDoList";
import {task} from "./task";

const UI = (() => {
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const projectBtns = document.querySelectorAll('#menu nav button.project');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addTaskBtn = document.getElementById('add-task-btn');

    let activeProject = 'All';

    const createProjectBtn = (name) => {
        const btn = document.createElement('button');
        btn.classList.add('project');

        const projectName = document.createElement('p');
        projectName.textContent = name;

        btn.appendChild(projectName);

        return btn;
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
        const settingsBtn = createIconBtn('settings');
        
        nav.appendChild(completeBtn);
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
        const projectHeading = document.querySelector('#content h2');
        
        activeProject = name;
        projectHeading.textContent = name;
        
        tasksGrid.innerHTML = '';
        
        for (const task of project.getTasks()) {
            const taskCard = createTask(task);
            tasksGrid.appendChild(taskCard);
        }
    }
    
    toggleMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    });

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

        const nameInput = createInputElement('Name:', 'text', 'name-input', 'name');
        const dueDateInput = createInputElement('Due Date:', 'date', 'due-date-input', 'dueDate');

        // Priority input
        const priorityContainer = document.createElement('div');
        priorityContainer.setAttribute('id', 'priority-container');
    
        const priorityOneInput = createInputElement('1', 'radio', 'priority-input', 'priority', '1');
        const priorityTwoInput = createInputElement('2', 'radio', 'priority-input', 'priority', '2');
        const priorityThreeInput = createInputElement('3', 'radio', 'priority-input', 'priority', '3');

        priorityContainer.appendChild(priorityOneInput);
        priorityContainer.appendChild(priorityTwoInput);
        priorityContainer.appendChild(priorityThreeInput);

        // Submit button
        const submitBtn = createButton('Submit', 'submit');
        submitBtn.classList.add('submit');

        // Cancel button
        const cancelBtn = createButton('Cancel', )
        
        form.appendChild(nameInput);
        form.appendChild(dueDateInput);
        form.appendChild(priorityContainer);
        form.appendChild(submitBtn);
        form.appendChild(cancelBtn);

        // Submit form
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const project = toDoList.getProject(activeProject);
            let projectName = project.getName();

            if (projectName === 'All' || projectName === 'Today' || projectName === 'This Week') {
                projectName = 'No Project';
            }
    
            project.addTask(task(nameInput.value, dueDateInput.value, 1, projectName));

            loadProject(activeProject);

            modal.classList.remove('active');
            deactivateOverlay();
        });

        // Cancel add task
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            deactivateOverlay();
        });

        modal.appendChild(heading);
        modal.appendChild(form);
    });
})();

export {UI};