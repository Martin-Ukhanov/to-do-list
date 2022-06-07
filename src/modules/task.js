const task = (name, project, priority, dueDate = null) => {
    const getName = () => name;
    const setName = (newName) => name = newName;

    const getProject = () => project;
    const setProject = (newProject) => project = newProject;

    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;

    const getDueDate = () => dueDate;
    const setDueDate = (newDuedate) => dueDate = newDuedate;

    return {getName, setName, getProject, setProject, getPriority, setPriority, getDueDate, setDueDate};
}

export {task};