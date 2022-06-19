import {toDoList} from "./toDoList";
import {task} from "./task";

const UI = (() => {
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const projectBtns = document.querySelectorAll('#menu nav button.project');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addTaskBtn = document.getElementById('add-task-btn');
    const addTaskForm = document.getElementById('add-task-form');

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
        
        nav.appendChild(completeBtn);
    
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

    addTaskBtn.addEventListener('click', () => {
        addTaskForm.classList.add('active');
        addTaskBtn.classList.remove('active');
    });

    const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
    cancelAddTaskBtn.addEventListener('click', () => {
        addTaskForm.classList.remove('active');
        addTaskBtn.classList.add('active');
    })

    // Add new task from form
    addTaskForm.addEventListener('submit', (e) => {
        console.log('Hello');
        const name = document.getElementById('name-input').value;
        const dueDate = document.getElementById('due-date-input').value;

        e.preventDefault();

        const project = toDoList.getProject(activeProject);
        let projectName = project.getName();

        if (projectName === 'All' || projectName === 'Today' || projectName === 'This Week') {
            projectName = 'No Project';
        }
    
        project.addTask(task(name, dueDate, projectName));

        loadProject(activeProject);

        addTaskForm.reset();
        
        addTaskForm.classList.remove('active');
        addTaskBtn.classList.add('active');
    });
})();

export {UI};