const task = (name, dueDate, priority, project) => {
    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDueDate = () => dueDate;
    const setDueDate = (newDuedate) => dueDate = newDuedate;

    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;

    const getProject = () => project;
    const setProject = (newProject) => project = newProject;

    return {getName, setName, getDueDate, setDueDate, getPriority, setPriority, getProject, setProject};
};

export {task};