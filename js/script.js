{
    const tasks = [
        {
            content: "zadanie1",
            done: false,
        },
        {
            content: "zadanie2",
            done: true,
        },
    ];

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")
        
        removeButtons.forEach((removeButton, index)=> {
            removeButton.addEventListener("click", () => {
                removeTask(index)
            });
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done")
        
        toggleDoneButtons.forEach((toggleDoneButton, index)=> {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index)
            });
        })
    };

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

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-addTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        
        addTask(newTaskContent);
        
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li ${task.done ? "class='task__done' ":""}>
                    <button class="js-done">Zrobione</button>
                    ${task.content}
                    <button class="js-remove">Usuń</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

       bindEvents();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        
    };

    init()
}