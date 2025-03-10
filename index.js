import { renderTasks } from './modules/renderTasks.js';
import { tasks, fetchTasks, addTaskToAPI } from './modules/tasks.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks().then(() => renderTasks());
});

const button = document.getElementById('add');
const input = document.getElementById('field');

button.addEventListener('click', () => {
    input.classList.remove('error');

    if (input.value === '') {
        input.classList.add('error');
        return;
    }

    const newTask = {
        text: input.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
    };

    addTaskToAPI(newTask.text).then(() => {
        return fetchTasks();
    }).then(() => renderTasks());

    input.value = '';
});
