import _ from 'lodash';
import './style.css';

const tasks = [
  {
    description: "Buy some food",
    completed: false,
    index: 1,
  },
  {
    description: "Go for walk",
    completed: false,
    index: 2,
  },
  {
    description: "Do laundry",
    completed: false,
    index: 3,
  },
];

const renderTasks = () => {
  const taskContainer = document.querySelector(".task-container");
  taskContainer.innerHTML = "";

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
}
