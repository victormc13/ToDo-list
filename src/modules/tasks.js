const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const renderTasks = () => {
  const taskContainer = document.querySelector(".task-container");
  taskContainer.innerHTML = "";

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskElement = `
      <li class="task-item flex-row ${task.completed ? "task-completed" : ""}">
        <input type="checkbox">
        <p contenteditable="true">${task.description}</p>
        <i class="las la-ellipsis-v btn"></i>
        <i class="las la-trash-alt btn hidden"></i>
      </li>
    `;

    taskContainer.insertAdjacentHTML("beforeend", taskElement);
  });
};

export function addTask(description) {
  const index = tasks.length + 1;
  tasks.push({
    description,
    completed: false,
    index,
  });
  saveTasks();
  renderTasks();
}