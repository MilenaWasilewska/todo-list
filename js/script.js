{
    let tasks = [];

    const addNewTask = (newTaskContent) => {

        tasks = [
            ...tasks,
            {content:newTaskContent}
        ];
        
        render();
    };

    const removeTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex ),
            {...tasks[taskIndex], done : !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButton = document.querySelectorAll(".js-done");

        toggleDoneButton.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        console.log(tasks);
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="taskItem">
            <button 
            class="taskItem__button taskItem__button--done js-done">
            ${task.done ? "✔" : ""}
            </button>
            <span 
            class="taskItem__text ${task.done ? "taskItem--done" : ""}">${task.content}
            </span>
            <button
             class="taskItem__button taskItem__button--remove js-remove">
            🗑
            </button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            
        };

        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}