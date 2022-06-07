const project = (name) => {
    const tasks = [];

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getTasks = () => tasks;
    const addTask = (newTask) => tasks.push(newTask);

    return {getName, setName, getTasks};
}

export {project};