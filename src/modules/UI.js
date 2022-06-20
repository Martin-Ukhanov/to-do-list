import {toDoList} from "./toDoList";
import {project} from "./project";
import {task} from "./task";
import {parseISO, isToday, isThisWeek} from "date-fns";

const UI = (() => {
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const projectBtns = document.querySelectorAll('#menu nav button.project');
    const addProjectBtn = document.getElementById('add-project-btn');
    const addProjectForm = document.getElementById('add-project-form');
    const addTaskBtn = document.getElementById('add-task-btn');
    const addTaskForm = document.getElementById('add-task-form');

    let activeProject = 'All';

    const createProjectBtn = (name) => {
        const btn = document.createElement('button');
        btn.classList.add('project');

        btn.innerHTML = `
            <span class="material-symbols-outlined">checklist</span>
            <p>${name}</p>`;

        return btn;
    }

    const createTask = (task) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        taskContainer.innerHTML += `
            <div>
                <p>${task.getProject()}</p>
                <h2>${task.getName()}</h2>
                <p>${task.getDueDate()}</p>
            </div>
            <button class="material-symbols-outlined">check_box_outline_blank</button>`;
    
        return taskContainer;
    };

    const loadProjectBtns = () => {
        const container = document.querySelector('nav.custom-projects');
        container.innerHTML = '';
        
        for (const project of toDoList.getProjects()) {
            const projectName = project.getName();

            if (projectName !== 'All' && projectName !== 'Today' && projectName !== 'This Week') {
                const btn = createProjectBtn(projectName);
                container.appendChild(btn);
            }
        }
    }

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

    // Load All project by default
    loadProject(activeProject);
    
    toggleMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    });

    // Load corresponding project
    projectBtns.forEach((projectBtn) => {
        projectBtn.addEventListener('click', () => {
            const projectName = projectBtn.lastElementChild.textContent;

            if (projectName === 'Today' || projectName === 'This Week') {
                addTaskBtn.classList.remove('active');
                addTaskForm.classList.remove('active');
            } else {
                addTaskBtn.classList.add('active');
            }

            projectBtns.forEach((projectBtn) => {
                projectBtn.classList.remove('active');
            });

            projectBtn.classList.add('active');

            loadProject(projectName);
        });
    });

    addProjectBtn.addEventListener('click', () => {
        addProjectForm.classList.add('active');
        addProjectBtn.classList.remove('active');
    });

    const cancelAddProjectBtn = document.getElementById('cancel-add-project-btn');
    cancelAddProjectBtn.addEventListener('click', () => {
        addProjectForm.reset();
        addProjectForm.classList.remove('active');
        addProjectBtn.classList.add('active');
    });

    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('project-name-input').value;

        const newProject = project(projectName);

        toDoList.addProject(newProject);

        loadProjectBtns();

        addProjectForm.reset();
        addProjectForm.classList.remove('active');
        addProjectBtn.classList.add('active');
    });

    addTaskBtn.addEventListener('click', () => {
        addTaskForm.classList.add('active');
        addTaskBtn.classList.remove('active');
    });

    const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
    cancelAddTaskBtn.addEventListener('click', () => {
        addTaskForm.reset();
        addTaskForm.classList.remove('active');
        addTaskBtn.classList.add('active');
    })

    // Add new task from form
    addTaskForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name-input').value;
        const dueDate = document.getElementById('due-date-input').value;

        e.preventDefault();

        const project = toDoList.getProject(activeProject);
        let projectName = project.getName();

        if (projectName === 'All' || projectName === 'Today' || projectName === 'This Week') {
            projectName = 'No Project';
        }

        const newTask = task(name, dueDate, projectName);
        
        project.addTask(newTask);

        if (isToday(parseISO(dueDate))) toDoList.getProject('Today').addTask(newTask);
        if (isThisWeek(parseISO(dueDate))) toDoList.getProject('This Week').addTask(newTask);

        loadProject(activeProject);

        addTaskForm.reset();
        
        addTaskForm.classList.remove('active');
        addTaskBtn.classList.add('active');
    });
})();

export {UI};