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
                    ${task.content}
                    <button class="js-remove">Usuń</button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove")
        
        removeButtons.forEach((removeButton, index)=> {
            removeButton.addEventListener("click", () => {
                removeTask(index)
            });
        })
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
        
    };

    init()
}