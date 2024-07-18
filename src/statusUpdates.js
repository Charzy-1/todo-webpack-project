// Function to toggle task completion status
const toggleTaskStatus = (tasks, index) => {
  tasks[index].completed = !tasks[index].completed;
};

// Function to clear all completed tasks
const clearCompletedTasks = (tasks) => tasks.filter((task) => !task.completed);

export default { toggleTaskStatus, clearCompletedTasks };
