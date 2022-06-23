import {Project} from "./Project";

const ToDoList = (() => {
    const projects = [];

    // Add default projects
    projects.push(Project('All'));
    projects.push(Project('Today'));
    projects.push(Project('This Week'));

    const getProjects = () => projects;

    const getProject = (name) => {
        const project = projects.find((project) => project.getName() === name);
        return project;
    };

    const addProject = (project) => projects.push(project);

    const removeProject = (name) => {
        const project = projects.find((project) => project.getName() === name);
        if (project !== undefined) {
            projects.splice(projects.indexOf(project), 1);
        }
    };

    return {getProjects, getProject, addProject, removeProject};
})();

export {ToDoList};