{
    let tasks = [];
    let hideDone = false;


    const addTask = (inputTaskContent) => {
        tasks = [
            ...tasks,
            { content: inputTaskContent, done: false },
        ]

        render();
    };

    const removeTask = (input) => {
        tasks = tasks.filter((task) => task !== tasks[input]);

        render();
    };

    const toggleTaskDone = (inputTask) => {
        const tasksDoneFunction = (task, indexInput) => indexInput === inputTask ? { ...task, done: !task.done } : task
        tasks = tasks.map(tasksDoneFunction);

        render();
    };

    const toggleHideDone = () => {
        hideDone = !hideDone;
        render();
    };

    const makeAllTasksDone = () => {
        tasks = tasks.map(
            (task) => ({ ...task, done: true })
        );
        render();
    };

    const bindHeaderEventsButtons = () => {
        const allTasksDoneButton = document.querySelector(".js-allDone");
        const allDoneTasksButton = document.querySelector(".js-hideDone");

        if (allTasksDoneButton) {
            allTasksDoneButton.addEventListener("click", makeAllTasksDone);
        };

        if (allDoneTasksButton) {
            allDoneTasksButton.addEventListener("click", toggleHideDone);
        };
    };

    const bindButtonsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, input) => {
            removeButton.addEventListener("click", () => {
                removeTask(input);
            });
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, input) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(input)
            });
        })
    };

    const clearTextBox = () => {
        const rawNewTaskContent = document.querySelector(".js-addTask");

        rawNewTaskContent.focus();
        rawNewTaskContent.value = "";
    };

    const onFormSubmit = (event) => {
        event.preventDefault(); hideDone

        const newTaskContent = document.querySelector(".js-addTask").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addTask(newTaskContent);
        clearTextBox();
    };

    const renderedTask = () => {
        let htmlString = "";
        const taskList = document.querySelector(".js-tasks");

        for (const task of tasks) {
            htmlString += `
                <li class ="task__rendered ${task.done && hideDone ? 'task__rendered--hide' : ''}">
                    <button class="js-done task__checkButton">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="task__content" ${task.done ? "class='task__done'" : ""}>
                        ${task.content}
                    </span>
                    <button class="js-remove task__checkButton task__checkButton--deleteMark">
                    🗑
                    </button>
                </li>
            `;
        };

        taskList.innerHTML = htmlString;
    };

    const renderButtons = () => {
        const tasklistButtons = document.querySelector(".js-tasklistButtons");
        let htmlString = "";

        if (tasks.length > 0) {
            htmlString = `
                <button class="js-hideDone task__headerButtons">
                    ${hideDone ? "Pokaż" : "Ukryj"} ukończone
                </button>

                <button class="js-allDone task__headerButtons"
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;
        };

        tasklistButtons.innerHTML = htmlString
    };

    const render = () => {
        renderedTask();
        renderButtons();

        bindButtonsEvents();
        bindHeaderEventsButtons();
    };

    const init = () => {
        render();
        
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init()
}