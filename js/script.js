{
    const tasks = [
        {
            content: "Zjeść kebaba",
            done: false,
        }
    ];

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="taskSection__listItem">
                    <button class="taskSection__button js-doneButton">${task.done ? "✔" : ""}</button>
                    <span${task.done ? " class=\"taskSection__listItemText--done\"" : ""}>${task.content}</span>
                    <button class="taskSection__button js-removeButton">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-taskList").innerHTML = htmlString;
        bindEvents();
    };

    const addNewTask = (newTaskContent) => {
        const newTask = document.querySelector(".js-newTask");
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        newTask.value = "";
        newTask.focus();
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-doneButton");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const newTaskContent = document.querySelector(".js-newTask").value.trim();
            if (newTaskContent === "") {
                return;
            }

            addNewTask(newTaskContent);
        });
    };

    init();
}