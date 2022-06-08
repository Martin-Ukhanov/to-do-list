import {project} from "./project";

const toDoList = (() => {
    const projects = [];

    // Add default projects
    projects.push(project('All'));
    projects.push(project('Today'));
    projects.push(project('This Week'));
    projects.push(project('Completed'));

    const getProjects = () => projects;

    const getProject = (name) => {
        const project = projects.find((project) => project.getName() === name);
        return project;
    };

    const addProject = (project) => projects.push(project);

    const removeProject = (name) => {
        const project = projects.find((project) => project.getName() === name);
        projects.splice(projects.indexOf(project), 1);
    };

    return {getProjects, getProject, addProject, removeProject};
})();

export {toDoList};