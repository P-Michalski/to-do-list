{
    const tasks = [];

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
                <li class="tasks__listItem">
                    <button 
                    class="tasks__button 
                    tasks__button--first 
                    js-doneButton">
                    ${task.done ? "✔" : ""}
                    </button>
                    <span
                    ${task.done ? 
                    " class=\"tasks__listItemText--done\"" : ""}>
                    ${task.content}
                    </span>
                    <button 
                    class="tasks__button 
                    tasks__button--last 
                    js-removeButton">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-taskList").innerHTML = htmlString;
        bindEvents();
    };

    const addNewTask = (newTaskContent, newTask) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
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
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            newTask.focus();
            return;
        }
        addNewTask(newTaskContent, newTask);
        newTask.value = "";
        newTask.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}