import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";
// import { total } from "./listArrays";
import Todo from "./factoryFxn";
import { format, formatDistanceToNowStrict, formatDistanceToNow, addDays } from "date-fns";

const logic = (() => {
  const totalList = [];

  doc.headerBtn.addEventListener("click", fxn.showPopup);
  form.overlay.addEventListener("click", fxn.closePopup);
  // form.closeBtn.addEventListener("click", fxn.closePopup);

  form.forTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = () => {
      return e.path[0][1].value; // task value
    };

    const dueDate = () => {
      if (e.path[0][2].value === "" || e.path[0][2].value === undefined) {
        return "No Date Given";
      } else {
        const updatedDate = addDays(new Date(e.path[0][2].value), 1);
        return `Due date: ${format(new Date(updatedDate), "MMMM. do. yyyy")}`;
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

    const dateDifference= () =>{
      if (dueDate()==="No Date Given"){
        return
      } else{
        return formatDistanceToNow(new Date(e.path[0][2].value), { addSuffix: true });
      }
    };

    const newTask = new Todo(taskTitle(), priorityResult(), dueDate());
    // constructor(taskTitle, priorityLevel, dueDate, daysLeft) {

    // console.log(newTask);

    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("id", `todo #${totalList.length}`);
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

    const containerDateDifference = document.createElement("div");
    containerDateDifference.classList.add("container-date-difference");
    containerDateDifference.textContent = dateDifference();
    taskContainer.appendChild(containerDateDifference);

    const containerCompleteBtn = document.createElement("button");
    containerCompleteBtn.classList.add("container-complete-btn");
    containerCompleteBtn.textContent = "Completed";
    taskContainer.appendChild(containerCompleteBtn);

    const containerDeleteBtn = document.createElement("button");
    containerDeleteBtn.classList.add("container-delete-btn");
    containerDeleteBtn.textContent = "Delete";
    taskContainer.appendChild(containerDeleteBtn);

    if (containerPriority.textContent === "High Priority") {
      taskContainer.classList.add("container-high-priority");
    } else if (containerPriority.textContent === "Medium Priority") {
      taskContainer.classList.add("container-med-priority");
    } else if (containerPriority.textContent === "Low Priority") {
      taskContainer.classList.add("container-low-priority");
    };
    
    totalList.push(newTask);

    fxn.closePopup();

    doc.main.addEventListener("click", (e) => {
      if (e.target.textContent === "Delete") {
        // totalList.splice(1,1);
        // taskContainer.remove();
        // console.log(e);
        // console.log(totalList);
        // console.log(taskContainer.getAttribute("id"));
        // console.log(e);
        const selectedContainer= document.getElementById(e.path[1].getAttribute("id"));
        selectedContainer.remove();
      }
    });



  });
})();



