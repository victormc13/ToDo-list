import './style.css';

const tasks = [];

const renderTasks = () => {
  const taskContainer = document.querySelector('.task-container');
  taskContainer.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task) => {
    const taskElement = `
      <li class="task-item flex-row ${task.completed ? 'task-completed' : ''}">
        <input type="checkbox">
        <p>${task.description}</p>
        <i class="las la-ellipsis-v btn"></i>
      </li>
    `;

    taskContainer.insertAdjacentHTML('beforeend', taskElement);
  });
};

window.addEventListener('load', () => {
  renderTasks();
});