const Task = (name, dueDate, projectName) => {
    const getName = () => name;
    const setName = (newName) => name = newName;

    const getDueDate = () => dueDate;
    const setDueDate = (newDuedate) => dueDate = newDuedate;

    const getProjectName = () => projectName;
    const setProjectName = (newProjectName) => projectName = newProjectName;

    return {getName, setName, getDueDate, setDueDate, getProjectName, setProjectName};
};

export {Task};