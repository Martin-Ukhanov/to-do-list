const task = (name, priority, dueDate = null) => {
    this.name = name;
    this.priority = priority;
    this.dueDate = dueDate;

    const getName = () => name;
    const getPriority = () => priority;
    const getDueDate = () => dueDate;

    return {getName, getPriority, getDueDate};
}

export {task};