import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";
// import { total } from "./listArrays";
import Todo from "./factoryFxn";
import {
  format,
  formatDistanceToNowStrict,
  formatDistanceToNow,
  addDays,
} from "date-fns";

const lists = (() => {
  const totalList = []; //array which will go on the page
  form.forTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitleValue = () => {
      return e.path[0][1].value;
    };

    const priorityValue = () => {
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

    const dueDateValue = () => {
      if (e.path[0][2].value === "" || e.path[0][2].value === undefined) {
        return "No Date Given";
      } else {
        const updatedDate = addDays(new Date(e.path[0][2].value), 1);
        return `Due date: ${format(new Date(updatedDate), "MMMM. do. yyyy")}`;
      }
    };

    const dateDifference = () => {
      if (dueDateValue() === "No Date Given") {
        return;
      } else {
        return formatDistanceToNow(new Date(e.path[0][2].value), {
          addSuffix: true,
        });
      }
    };

    const newTask = new Todo(taskTitleValue(), priorityValue(), dueDateValue()); //creates new object using values from form filled out
    const addReminderToTotalListArr = (() => {
      totalList.push(newTask);
    })();

    for (let i = totalList.length - 1; i < totalList.length; i++) {
      //want to loop over everything and only add last object in array //format each object in an array
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");
      doc.main.appendChild(taskContainer);

      const containerTitle = document.createElement("div");
      containerTitle.classList.add("container-title");
      containerTitle.textContent = newTask.taskTitle;
      taskContainer.appendChild(containerTitle);

      taskContainer.setAttribute("id", `${containerTitle.textContent}`);

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
      }
    }
    //end of loop for default list
    fxn.closePopup();
  });

  doc.main.addEventListener("click", (e) => {
    if (e.target.textContent === "Delete") {
      const wholeContainer = e.path[1]; //same as taskContainer
      // console.log((e.path[1]).getAttribute("id")); // in DOM
      const indexPosition = totalList.findIndex(matching);

      function matching(index) {
        return index.taskTitle === e.path[1].getAttribute("id");
      }

      totalList.splice(indexPosition, 1);
      wholeContainer.remove();
    }
  });

  doc.nav.addEventListener("click", (e) => {
    const btnText = e.path[0].textContent;
    const itemContainers = document.querySelectorAll(".task-container");

    if (btnText === "High Priority") {
      for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i].children[2].textContent !== "High Priority") {
          itemContainers[i].classList.add("hide");
        } else if (
          itemContainers[i].children[2].textContent === "High Priority"
        ) {
          itemContainers[i].classList.remove("hide");
        }
      }
    } else if (btnText === "Medium Priority") {
      for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i].children[2].textContent !== "Medium Priority") {
          itemContainers[i].classList.add("hide");
        } else if (
          itemContainers[i].children[2].textContent === "Medium Priority"
        ) {
          itemContainers[i].classList.remove("hide");
        }
      }
    } else if (btnText === "Low Priority") {
      for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i].children[2].textContent !== "Low Priority") {
          itemContainers[i].classList.add("hide");
        } else if (
          itemContainers[i].children[2].textContent === "Low Priority"
        ) {
          itemContainers[i].classList.remove("hide");
        }
      }
    } else if (btnText === "No Priority") {
      for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i].children[2].textContent !== "No Priority") {
          itemContainers[i].classList.add("hide");
        } else if (
          itemContainers[i].children[2].textContent === "No Priority"
        ) {
          itemContainers[i].classList.remove("hide");
        }
      }
    } else if (btnText === "Full List") {
      for (let i = 0; i < itemContainers.length; i++) {
        if (itemContainers[i].children[2].textContent !== "Dummy Text") {
          itemContainers[i].classList.remove("hide");
        }
      }
    }
    // This is still nav click events, add New Project stuff here.
  });

  // end of lists
})();

const logic = (() => {
  doc.headerBtn.addEventListener("click", fxn.showPopup);
  form.overlay.addEventListener("click", fxn.closePopup);
})();
