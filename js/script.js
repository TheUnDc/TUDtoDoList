{
    let tasks = [];
    let hideDone = false;


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
        const makeAllTasksDoneButton = document.querySelector(".js-makeAllDone");
        const hideAllDoneTasksButton = document.querySelector(".js-hideDone");
    
        if (makeAllTasksDoneButton) {
          makeAllTasksDoneButton.addEventListener("click", makeAllTasksDone);
        };
    
        if (hideAllDoneTasksButton) {
          hideAllDoneTasksButton.addEventListener("click", toggleHideDone);
        };
    };

    const bindButtonsEvents = () => {
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
                <li class="task__rendered ${task.done && hideDone ? 'task__rendered--hide' : ''}">
                    <button class="js-done task__checkButton">${task.done ? "✔" : ""}</button>
                    <span ${task.done ? "class='task__done'" : ""}>${task.content}</span>
                    <button class="js-remove task__checkButton task__checkButton--deleteMark">🗑</button>
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
          <button class="tasklistButtons__button js-hideDone">
             ${hideDone ? "Pokaż" : "Ukryj"} ukończone
          </button>
          <button class="tasklistButtons__button js-makeAllDone"
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