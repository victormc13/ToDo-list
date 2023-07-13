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
        <p class="task-content">${task.description}</p>
        <i class="las la-ellipsis-v btn"></i>
        <i class="las la-trash-alt btn hidden"></i>
      </li>
    `;

    taskContainer.insertAdjacentHTML("beforeend", taskElement);
  });

  const taskMenu = () => {
    const taskMenuItems = document.querySelectorAll(".la-ellipsis-v");
  
    taskMenuItems.forEach((taskMenu) => {
      taskMenu.addEventListener("click", (event) => {
        const taskMenu = event.target;
        taskMenu.parentNode.classList.add("task-editing");
        taskMenu.classList.toggle("hidden");
        
        const showTrashIcon = () => {
          taskMenu.classList.toggle("hidden");
          showTrashIcon();
        }

        const enableTaskDescriptionEditing = () => {
          const taskDescription = taskMenu.parentNode.querySelector(".task-content");
          const taskItem = taskMenu.closest(".task-item");
          const trashBtn = taskItem.querySelector(".la-trash-alt");
          trashBtn.classList.toggle("hidden");
          taskDescription.contentEditable = true;
          taskDescription.focus();
        };
        enableTaskDescriptionEditing();
      });
    });
  };
  taskMenu();
};

export const addTask = (description) => {
  const index = tasks.length + 1;
  tasks.push({
    description,
    completed: false,
    index,
  });
  saveTasks();
  renderTasks();
};
