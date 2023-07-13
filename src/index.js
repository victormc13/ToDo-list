import './style.css';
import { renderTasks, addTask, taskMenu } from './modules/tasks.js';

window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  taskMenu();
});

const form = document.querySelector('.task-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = form.querySelector('input[type=text]');
  const description = input.value.trim();
  if (description) {
    addTask(description);
    input.value = '';
  }
  taskMenu();
});

const addTaskBtn = document.querySelector('.la-level-down-alt');
addTaskBtn.addEventListener('click', () => {
  const input = form.querySelector('input[type=text]');
  const description = input.value.trim();
  if (description) {
    addTask(description);
    input.value = '';
  }
  taskMenu();
});

const refreshTasks = document.querySelector('.la-sync');
refreshTasks.addEventListener('click', () => {
  window.location.reload();
});