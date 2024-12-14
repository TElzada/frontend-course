const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filters = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция для рендера задач
function renderTasks(filter = 'all')  {
  taskList.innerHTML = '';
  let filteredTasks = tasks;

  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === 'incomplete') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.textContent = task.text;

    // Кнопка "Завершить"
    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.className = 'complete';
    completeButton.onclick = () => toggleTaskCompletion(index);

    // Кнопка "Удалить"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteTask(index);

    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Добавление задачи
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    updateLocalStorage();
    renderTasks();
  }
}

// Удаление задачи
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

// Переключение состояния выполнения
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

// Обновление localStorage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Фильтрация задач
filters.forEach(filterButton => {
  filterButton.addEventListener('click', () => {
    document.querySelector('.filter.active').classList.remove('active');
    filterButton.classList.add('active');
    renderTasks(filterButton.dataset.filter);
  });
});

// Обработчик кнопки добавления
document.getElementById('addTask').onclick = addTask;

// Первый рендер
renderTasks();
