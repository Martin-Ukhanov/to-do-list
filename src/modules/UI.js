import {ToDoList} from "./ToDoList";
import {Project} from "./Project";
import {Task} from "./Task";
import {parseISO, isToday, isThisWeek} from "date-fns";

const UI = (() => {
    const toggleMenuBtn = document.getElementById('toggle-menu-btn');
    const addProjectBtn = document.getElementById('add-project-btn');
    const cancelAddProjectBtn = document.getElementById('cancel-add-project-btn');
    const addProjectForm = document.getElementById('add-project-form');
    const addTaskBtn = document.getElementById('add-task-btn');
    const cancelAddTaskBtn = document.getElementById('cancel-add-task-btn');
    const addTaskForm = document.getElementById('add-task-form');

    const allProject = ToDoList.getProject('All');
    const todayProject = ToDoList.getProject('Today');
    const thisWeekProject = ToDoList.getProject('This Week');

    let activeProjectName = allProject.getName();

    const createTask = (task) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        taskContainer.innerHTML += `
        <div>
            <p>${task.getProjectName()}</p>
            <h2>${task.getName()}</h2>
            <p>${task.getDueDate()}</p>
        </div>
        <button class="material-symbols-outlined">check_box_outline_blank</button>`;
        
        const completeBtn = taskContainer.lastElementChild;

        completeBtn.addEventListener('click', () => {
            allProject.removeTask(task.getName());
            todayProject.removeTask(task.getName());
            thisWeekProject.removeTask(task.getName());

            if (task.getProjectName() !== 'No Project') {
                const customProject = ToDoList.getProject(task.getProjectName());
                customProject.removeTask(task.getName());
            }

            loadProject(activeProjectName);
        });
        
        return taskContainer;
    };

    const loadProjectBtns = () => {
        const defaultProjects = document.querySelector('nav.default-projects');
        const customProjects = document.querySelector('nav.custom-projects');

        defaultProjects.innerHTML = '';
        customProjects.innerHTML = '';
        
        for (const project of ToDoList.getProjects()) {
            const projectName = project.getName();

            const projectBtn = document.createElement('button');
            projectBtn.classList.add('project');

            let projectBtnSymbol;
            switch (projectName) {
                case allProject.getName():
                    projectBtnSymbol = 'calendar_month';
                    break;
                case todayProject.getName():
                    projectBtnSymbol = 'today';
                    break;
                case thisWeekProject.getName():
                    projectBtnSymbol = 'date_range';
                    break;
                default:
                    projectBtnSymbol = 'checklist';
            }

            projectBtn.innerHTML = `
            <span class="material-symbols-outlined">${projectBtnSymbol}</span>
            <p>${projectName}</p>`;

            if (projectName === allProject.getName() || projectName === todayProject.getName() || projectName === thisWeekProject.getName()) {
                defaultProjects.appendChild(projectBtn);
            } else {
                customProjects.appendChild(projectBtn);
            }

            projectBtn.addEventListener('click', () => {
                if (projectName === 'Today' || projectName === 'This Week') {
                    addTaskBtn.classList.remove('active');
                    addTaskForm.classList.remove('active');
                } else {
                    addTaskBtn.classList.add('active');
                }
    
                document.querySelectorAll('#menu nav button.project').forEach((projectBtn) => {
                    projectBtn.classList.remove('active');
                });
    
                projectBtn.classList.add('active');
    
                loadProject(projectName);
            });
        }
    }

    const loadProject = (name) => {
        const tasksGrid = document.getElementById('tasks-grid');
        const project = ToDoList.getProject(name);
        const projectHeading = document.querySelector('#content h2');
        
        activeProjectName = name;
        projectHeading.textContent = name;
        
        tasksGrid.innerHTML = '';
        
        for (const task of project.getTasks()) {
            const taskCard = createTask(task);
            tasksGrid.appendChild(taskCard);
        }
    }

    loadProjectBtns();
    loadProject(activeProjectName);
    
    toggleMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    });

    addProjectBtn.addEventListener('click', () => {
        addProjectForm.classList.add('active');
        addProjectBtn.classList.remove('active');
    });

    cancelAddProjectBtn.addEventListener('click', () => {
        addProjectForm.reset();
        addProjectForm.classList.remove('active');
        addProjectBtn.classList.add('active');
    });

    // Add new project from form
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('project-name-input').value;

        const newProject = Project(projectName);

        ToDoList.addProject(newProject);

        loadProjectBtns();

        addProjectForm.reset();
        addProjectForm.classList.remove('active');
        addProjectBtn.classList.add('active');
    });

    addTaskBtn.addEventListener('click', () => {
        addTaskForm.classList.add('active');
        addTaskBtn.classList.remove('active');
    });

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
        
        const project = ToDoList.getProject(activeProjectName);
        
        let projectName = project.getName();

        if (projectName === 'All' || projectName === 'Today' || projectName === 'This Week') {
            projectName = 'No Project';
        }

        const newTask = Task(name, dueDate, projectName);
        
        project.addTask(newTask);
        
        if (project.getName() !== allProject.getName()) allProject.addTask(newTask);
        if (isToday(parseISO(dueDate))) todayProject.addTask(newTask);
        if (isThisWeek(parseISO(dueDate))) thisWeekProject.addTask(newTask);

        loadProject(activeProjectName);

        addTaskForm.reset();
        
        addTaskForm.classList.remove('active');
        addTaskBtn.classList.add('active');
    });
})();

export {UI};