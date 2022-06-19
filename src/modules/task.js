const task = (name, dueDate, project) => {
    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDueDate = () => dueDate;
    const setDueDate = (newDuedate) => dueDate = newDuedate;

    const getProject = () => project;
    const setProject = (newProject) => project = newProject;

    return {getName, setName, getDueDate, setDueDate, getProject, setProject};
};

export {task};