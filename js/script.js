{
    const tasks = [

    ];

    const addTask = (newTaskContent) => { //immutability
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => { //immutablitiy splice usuwa 
        tasks.splice(index, 1);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done; //immutability 

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index)
            });
        })
    };

    const clearTextBox = () => {
        const rawNewTaskContent = document.querySelector(".js-addTask");

        rawNewTaskContent.focus();
        rawNewTaskContent.value = "";
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-addTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addTask(newTaskContent);
        clearTextBox();
    };

    const render = () => {
        let htmlString = "";
        const task = document.querySelector(".js-tasks");

        for (const task of tasks) {
            htmlString += `
                <li class="task__rendered">
                    <button class="js-done task__checkButton">${task.done ? "✔" : ""}</button>
                    <span ${task.done ? "class='task__done'" : ""}>${task.content}</span>
                    <button class="js-remove task__checkButton task__checkButton--deleteMark">🗑</button>
                </li>
            `;
        };

        task.innerHTML = htmlString; 
        bindEvents();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init()
}