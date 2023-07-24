{
    const tasks = [

    ];

    const addTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index)
            });
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done")

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index)
            });
        })
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const rawNewTaskContent = document.querySelector(".js-addTask");
        const newTaskContent = rawNewTaskContent.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addTask(newTaskContent);
        rawNewTaskContent.focus();
        rawNewTaskContent.value = "";
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="task__rendered">
                    <button class="js-done task__checkButton">${task.done ? "✔" : ""}</button>
                    <span ${task.done ? "class='task__done '" : ""}>${task.content}</span>
                    <button class="js-remove task__checkButton task__checkButton--deleteMark">🗑</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString; 
        // TODO: add const to js-task
        bindEvents();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init()
}