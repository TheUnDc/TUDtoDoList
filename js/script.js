{
    let tasks = [

    ];

    const addTask = (inputTaskContent) => { 
        tasks = [
            ...tasks,
            {content: inputTaskContent, done: false},
        ]

        render();
    };

    const removeTask = (input) => { 
        tasks = tasks.filter((task) => task !== tasks[input]);

        render();
    };

    const toggleTaskDone = (inputTask) => {

        const tasksDoneFunction = (task, index) => index === inputTask ? { ...task, done: !task.done } : task
        tasks = tasks.map(tasksDoneFunction);

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

    const renderedTask = () => {
        let htmlString = "";
        const taskList = document.querySelector(".js-tasks");

        for (const task of tasks) {
            htmlString += `
                <li class="task__rendered">
                    <button class="js-done task__checkButton">${task.done ? "✔" : ""}</button>
                    <span ${task.done ? "class='task__done'" : ""}>${task.content}</span>
                    <button class="js-remove task__checkButton task__checkButton--deleteMark">🗑</button>
                </li>
            `;
        };

        taskList.innerHTML = htmlString; 
    };

    const render = () => {
        renderedTask();

        bindEvents();
        console.log(tasks);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        
    };

    init()
}