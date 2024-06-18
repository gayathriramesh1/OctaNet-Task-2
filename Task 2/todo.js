let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const category = document.getElementById('category').value;

    const task = {
        id: Date.now(),
        name: taskInput.value,
        dueDate: dueDate,
        priority: priority,
        category: category,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('complete');
        }

        const taskName = document.createElement('span');
        taskName.classList.add('task-name');
        taskName.textContent = task.name;
        taskItem.appendChild(taskName);

        const categoryBadge = document.createElement('span');
        categoryBadge.classList.add('category-badge');
        categoryBadge.textContent = task.category;
        taskItem.appendChild(categoryBadge);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => openEditModal(task);
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        taskItem.appendChild(deleteButton);

        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.onclick = () => toggleComplete(task.id);
        taskItem.appendChild(completeButton);

        taskList.appendChild(taskItem);
    });
}

function openEditModal(task) {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';

    document.getElementById('editTaskName').value = task.name;
    document.getElementById('editDueDate').value = task.dueDate;
    document.getElementById('editPriority').value = task.priority;

    const saveButton = document.querySelector('#editModal button');
    saveButton.onclick = () => {
        task.name = document.getElementById('editTaskName').value;
        task.dueDate = document.getElementById('editDueDate').value;
        task.priority = document.getElementById('editPriority').value;
        closeModal();
        renderTasks();
    };
}

function updateTask() {
    // Function for updating task details
}

function closeModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleComplete(id) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
    });
    renderTasks();
}

renderTasks();
