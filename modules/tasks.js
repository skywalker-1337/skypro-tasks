const API_URL = 'https://wedev-api.sky.pro/api/v1/nikoloz-kobaliya/comments';

export let tasks = [
    { text: 'Купить чай' },
    { text: 'Заварить чай' },
    { text: 'Выпить чай' },
];

export const fetchTasks = () => {
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const apiTasks = data.comments.map(comment => ({
                text: comment.text,
            }));
            tasks = [...tasks, ...apiTasks];
        });
};

export const addTaskToAPI = (text) => {
    const name = 'Nikoloz';

    if (name.length < 3 || text.length < 3) {
        console.error('Ошибка: Имя и текст должны содержать хотя бы 3 символа');
        return;
    }

    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ name, text }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        console.log('Комментарий добавлен:', data);
    })
    .catch(error => {
        console.error('Ошибка при добавлении комментария:', error.message);
        alert(`Ошибка: ${error.message}`);
    });
};
