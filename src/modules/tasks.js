const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const taskMenu = () => {
  const taskMenuItems = document.querySelectorAll('.la-ellipsis-v');

  taskMenuItems.forEach((taskMenu) => {
    taskMenu.addEventListener('click', (event) => {
      const taskMenu = event.target;
      taskMenu.parentNode.classList.add('task-editing');
      taskMenu.classList.toggle('hidden');

      const taskDescription = taskMenu.parentNode.querySelector('.task-content');
      const taskItem = taskMenu.closest('.task-item');
      const trashBtn = taskItem.querySelector('.la-trash-alt');

      const enableTaskDescriptionEditing = () => {
        trashBtn.classList.toggle('hidden');
        taskDescription.contentEditable = true;
        taskDescription.focus();
      };
      enableTaskDescriptionEditing();

      const disableTaskDescriptionEditing = (event) => {
        if (
          event.key === 'Enter'
          || (event.type === 'click'
            && !taskMenu.parentNode.contains(event.target))
        ) {
          const taskItemParent = taskDescription.closest('.task-item');
          taskDescription.contentEditable = false;
          taskItemParent.classList.remove('task-editing');
          trashBtn.classList.add('hidden');
          taskMenu.classList.remove('hidden');
          document.removeEventListener(
            'keydown',
            disableTaskDescriptionEditing,
          );
          document.removeEventListener('click', disableTaskDescriptionEditing);
        }
      };
      document.addEventListener('keydown', disableTaskDescriptionEditing);
      document.addEventListener('click', disableTaskDescriptionEditing);
    });
  });
};

export const renderTasks = () => {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskElement = `
      <li class="task-item flex-row ${task.completed ? 'task-completed' : ''}">
        <input type="checkbox">
        <p class="task-content">${task.description}</p>
        <i class="las la-ellipsis-v btn"></i>
        <i class="las la-trash-alt btn hidden"></i>
      </li>
    `;

    taskContainer.insertAdjacentHTML('beforeend', taskElement);
  });
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
