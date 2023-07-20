let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const updateTaskIndexes = () => {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
};

export const renderTasks = () => {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskElement = `
      <li class="task-item flex-row ${task.completed ? 'task-completed' : ''}">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <p class="task-content">${task.description}</p>
        <i class="las la-ellipsis-v btn"></i>
        <i class="las la-trash-alt btn hidden"></i>
      </li>
    `;

    taskContainer.insertAdjacentHTML('beforeend', taskElement);
  });

  const checkboxes = taskContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const checkbox = event.target;
      const taskItem = checkbox.closest('.task-item');
      const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);

      tasks[taskIndex].completed = checkbox.checked;
      renderTasks();
      saveTasks();
    });
  });
};

export const clearCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
};

const deleteTask = (event) => {
  const trashBtn = event.target.closest('.la-trash-alt');

  if (trashBtn) {
    const taskItem = trashBtn.closest('.task-item');
    const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);

    tasks.splice(taskIndex, 1);
  }
};

export const taskMenu = () => {
  const taskContainer = document.querySelector('.task-container');

  taskContainer.addEventListener('click', (event) => {
    const taskMenu = event.target.closest('.la-ellipsis-v');

    if (taskMenu) {
      const taskItem = taskMenu.closest('.task-item');
      const trashBtn = taskItem.querySelector('.la-trash-alt');
      const taskDescription = taskItem.querySelector('.task-content');

      taskMenu.parentNode.classList.add('task-editing');
      taskMenu.classList.add('hidden');
      trashBtn.classList.remove('hidden');

      const addTrashIconEventListener = () => {
        trashBtn.addEventListener('click', (event) => {
          deleteTask(event);
          updateTaskIndexes();
          saveTasks();
          renderTasks();
        });
      };

      const enableTaskDescriptionEditing = () => {
        taskDescription.contentEditable = true;
        taskDescription.focus();
        addTrashIconEventListener();

        const saveTaskDescription = () => {
          const taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
          tasks[taskIndex].description = taskDescription.textContent;
          saveTasks();
        };

        taskDescription.addEventListener('input', saveTaskDescription);
      };
      enableTaskDescriptionEditing();

      const disableTaskDescriptionEditing = (event) => {
        if (
          event.key === 'Enter'
          || (event.type === 'click' && !taskItem.contains(event.target))
        ) {
          taskDescription.contentEditable = false;
          taskMenu.parentNode.classList.remove('task-editing');
          taskMenu.classList.remove('hidden');
          trashBtn.classList.add('hidden');
          document.removeEventListener('keydown', disableTaskDescriptionEditing);
          document.removeEventListener('click', disableTaskDescriptionEditing);
        }
      };
      document.addEventListener('keydown', disableTaskDescriptionEditing);
      document.addEventListener('click', disableTaskDescriptionEditing);
    }
  });
};

export const addTask = (description) => {
  const index = tasks.length + 1;
  tasks.push({
    description,
    completed: false,
    index,
  });
};
