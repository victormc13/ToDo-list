import './style.css';
import {
  saveTasks, renderTasks, addTask, taskMenu, clearCompletedTasks, updateTaskIndexes,
} from './modules/tasks.js';

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
  saveTasks();
  renderTasks();
});

const clearCompletedBtn = document.querySelector('.completed-tasks-btn');
clearCompletedBtn.addEventListener('click', () => {
  clearCompletedTasks();
  updateTaskIndexes();
  saveTasks();
  renderTasks();
});

const refreshTasks = document.querySelector('.la-sync');
refreshTasks.addEventListener('click', () => {
  window.location.reload();
});