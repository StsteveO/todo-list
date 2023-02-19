import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";
import total from "./listArrays";
import Todo from "./factoryFxn";

const logic = (() => {
  doc.headerBtn.addEventListener("click", fxn.showPopup);
  form.overlay.addEventListener("click", fxn.closePopup);
  form.closeBtn.addEventListener("click", fxn.closePopup);

  form.forTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = () => {
      return e.path[0][1].value; // task value
    };

    const dueDate = () => {
      if (e.path[0][2].value === "" || e.path[0][2].value === undefined) {
        return "No Date Given";
      } else {
        return `Due date: ${e.path[0][2].value}`;
      }
    };

    const priorityResult = () => {
      const priority = document.getElementsByName("priority");

      if (priority[0].checked === true) {
        return "No Priority";
      } else if (priority[1].checked === true) {
        return "Low Priority";
      } else if (priority[2].checked === true) {
        return "Medium Priority";
      } else if (priority[3].checked === true) {
        return "High Priority";
      }
    };

    // console.log(taskTitle());
    // console.log(dueDate());
    // console.log(priorityResult());

    const newTask = new Todo(taskTitle(), priorityResult(), dueDate());
    // constructor(taskTitle, priorityLevel, dueDate, daysLeft) {

    console.log(newTask);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");
    doc.main.appendChild(taskContainer);

    const containerTitle = document.createElement("div");
    containerTitle.classList.add("container-title");
    containerTitle.textContent = newTask.taskTitle;
    taskContainer.appendChild(containerTitle);

    const containerDueDate = document.createElement("div");
    containerDueDate.classList.add("container-due-date");
    containerDueDate.textContent = newTask.dueDate;
    taskContainer.appendChild(containerDueDate);

    const containerPriority = document.createElement("div");
    containerPriority.classList.add("container-priority");
    containerPriority.textContent = newTask.priorityLevel;
    taskContainer.appendChild(containerPriority);

    if (containerPriority.textContent === "High Priority") {
      taskContainer.classList.add("container-high-priority");
    } else if (containerPriority.textContent === "Medium Priority") {
      taskContainer.classList.add("container-med-priority");
    } else if (containerPriority.textContent === "Low Priority") {
      taskContainer.classList.add("container-low-priority");
    };

    fxn.closePopup();
  });
})();
