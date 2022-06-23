const Project = (name) => {
    const tasks = [];

    const getName = () => name;
    const setName = (newName) => name = newName;

    const getTasks = () => tasks;

    const getTask = (taskName) => {
        const task = tasks.find((task) => task.getName() === taskName);
        return task;
    }

    const addTask = (newTask) => tasks.push(newTask);

    const removeTask = (taskName) => {
        const task = tasks.find((task) => task.getName() === taskName);
        if (task !== undefined) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    }

    return {getName, setName, getTasks, getTask, addTask, removeTask};
};

export {Project};