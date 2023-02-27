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

  const saveData = (() => {
    if (typeof Storage !== "undefined") {
      // Store
      // Retrieve
      // localStorage.getItem("lastname");
      for (let i = 0; i < localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); //object
        totalList.push(JSON.parse(localStorage.getItem(localStorage.key(i))));

        const savedObj= (JSON.parse(localStorage.getItem(localStorage.key(i))));

        if (savedObj.subtaskPresent===true){
          continue;
        };

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");
        doc.main.appendChild(taskContainer);

        const containerTitle = document.createElement("div");
        containerTitle.classList.add("container-title");
        containerTitle.textContent = savedObj.title;
        taskContainer.appendChild(containerTitle);

        taskContainer.setAttribute("id", `${containerTitle.textContent}`);

        const containerDueDate = document.createElement("div");
        containerDueDate.classList.add("container-due-date");
        containerDueDate.textContent = savedObj.rawDate;
        taskContainer.appendChild(containerDueDate);

        const containerPriority = document.createElement("div");
        containerPriority.classList.add("container-priority");
        containerPriority.textContent = savedObj.priorityLevel;
        taskContainer.appendChild(containerPriority);

        const dueDateValue = () => {
          if (savedObj.rawDate === "" || savedObj.rawDate === undefined) {
            return "No Date Given";
          } else {
            const updatedDate = addDays(new Date(savedObj.rawDate), 1);
            return `Due date: ${format(new Date(updatedDate), "MMMM. do. yyyy")}`;
          }
          };

        const dateDifference = () => {
          if (dueDateValue() === "No Date Given") {
            return;
          } else {
            return formatDistanceToNow(new Date(savedObj.rawDate), {
              addSuffix: true,
            });
          }
          };

        const containerDateDifference = document.createElement("div");
        containerDateDifference.classList.add("container-date-difference");
        containerDateDifference.textContent = savedObj.dateDifference;
        taskContainer.appendChild(containerDateDifference);

        if(savedObj.project===true){
          const subTasks= document.createElement("button");
          subTasks.classList.add("sub-tasks-btn");
          subTasks.textContent= "Add Sub-Tasks";
          taskContainer.appendChild(subTasks);

          const placeHolder= document.createElement("div");
          taskContainer.appendChild(placeHolder);

          subTasks.addEventListener("click", fxn.showPopupProjectSubtasks);

          form.forTaskProjectSubtasks.addEventListener("submit", (e) => {
            e.preventDefault();

            const taskTitleValue = () => {
              return e.path[0][1].value;
            };

            const dueDateValue = () => {
              if (
                e.path[0][2].value === "" ||
                e.path[0][2].value === undefined
              ) {
                return "No Date Given";
              } else {
                const updatedDate = addDays(new Date(e.path[0][2].value), 1);
                return `Due date: ${format(
                  new Date(updatedDate),
                  "MMMM. do. yyyy"
                )}`;
              }
            };

            const dateDifference = () => {
              if (dueDateValue() === "No Date Given") {
                return "No Date Given";
              } else {
                return formatDistanceToNow(new Date(e.path[0][2].value), {
                  addSuffix: true,
                });
              }
            };

            const readOut = document.createElement("div");
            readOut.classList.add("subtasks-read-out");
            readOut.textContent = `${taskTitleValue()}`; // ${dueDateValue()}, ${dateDifference()}.`;

            readOut.addEventListener("click", (e) => {
              readOut.classList.toggle("clicked");
            });

            placeHolder.appendChild(readOut);

            fxn.closePopup();
          });
        };

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

    } else {
      const sorryText = document.createElement("div");
      sorryText.textContent =
        "Sorry, your browser does not support storage of previous tasks.";
      document.main.appendChild(sorryText);
    }
  })();

  console.log(totalList);

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

      //start delete
      // console.log(taskContainer); //DOM version of a task icon
      console.log(newTask);
      // console.log(JSON.stringify(taskContainer)); //empty object
      console.log(JSON.stringify(newTask));

      const importantData= {
        title: newTask.taskTitle,
        rawDate: dueDateValue(),
        priorityLevel: newTask.priorityLevel,
        dateDifference: dateDifference()
      };

      const saveData = (() => {
        if (typeof Storage !== "undefined") {
          // Store
          localStorage.setItem(JSON.stringify(newTask.taskTitle), JSON.stringify(importantData));
          // Retrieve
          // localStorage.getItem("lastname");
        } else {
          const sorryText = document.createElement("div");
          sorryText.textContent =
            "Sorry, your browser does not support storage of previous tasks.";
          document.main.appendChild(sorryText);
        }
      })();

      //end delete
    }
    
    //end of loop for default list
    fxn.closePopup();
  });

    form.forTaskProject.addEventListener("submit", (e) => {
      e.preventDefault();

      const taskTitleValue = () => {
        return e.path[0][1].value;
      };

      const priorityValue = () => {
        const priority = document.getElementsByName("priority_project");
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

      const newTask = new Todo(
        taskTitleValue(),
        priorityValue(),
        dueDateValue()
      ); //creates new object using values from form filled out
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
        containerTitle.textContent = `PROJECT: ${newTask.taskTitle}`;
        taskContainer.appendChild(containerTitle);
        containerTitle.setAttribute("id", "project");

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

        const subTasks= document.createElement("button");
        subTasks.classList.add("sub-tasks-btn");
        subTasks.textContent= "Add Sub-Tasks";
        taskContainer.appendChild(subTasks);

        subTasks.addEventListener("click", fxn.showPopupProjectSubtasks);

        form.forTaskProjectSubtasks.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskTitleValue = () => {
          return e.path[0][1].value;
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
            return "No Date Given";
          } else {
            return formatDistanceToNow(new Date(e.path[0][2].value), {
              addSuffix: true,
            });
          }
        };

        const readOut= document.createElement("div");
        readOut.classList.add("subtasks-read-out");
        readOut.textContent= `${taskTitleValue()}` // ${dueDateValue()}, ${dateDifference()}.`;

        readOut.addEventListener("click", (e)=>{
          readOut.classList.toggle("clicked");});

        placeHolder.appendChild(readOut);

        const subtaskData = {
          overallTask: containerTitle.textContent,
          subtaskTitle: readOut.textContent,
          subtaskPresent: true,
          keyTitle: `subtask: ${readOut.textContent}`,
        };

        const saveData = (() => {
          if (typeof Storage !== "undefined") {
            // Store
            localStorage.setItem(
              JSON.stringify(`subtask: ${readOut.textContent}`),
              JSON.stringify(subtaskData)
            );
            // Retrieve
            // localStorage.getItem("lastname");
          } else {
            const sorryText = document.createElement("div");
            sorryText.textContent =
              "Sorry, your browser does not support storage of previous tasks.";
            document.main.appendChild(sorryText);
          }
        })();

        fxn.closePopup();
        });

        const placeHolder= document.createElement("div");
        taskContainer.appendChild(placeHolder);

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

        const importantData= {
        title: containerTitle.textContent,
        rawDate: dueDateValue(),
        priorityLevel: newTask.priorityLevel,
        dateDifference: dateDifference(),
        // subTasks: document.querySelectorAll(".subtasks-read-out"),
        subTasks: document.querySelectorAll(".subtasks-read-out"),
        project: true
        };

      const saveData = (() => {
        if (typeof Storage !== "undefined") {
          // Store
          localStorage.setItem(JSON.stringify(`PROJECT: ${newTask.taskTitle}`), JSON.stringify(importantData));
          // Retrieve
          // localStorage.getItem("lastname");
        } else {
          const sorryText = document.createElement("div");
          sorryText.textContent =
            "Sorry, your browser does not support storage of previous tasks.";
          document.main.appendChild(sorryText);
        }
      })();

      }
      //end of loop for project list
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

      localStorage.removeItem(`"${wholeContainer.getAttribute("id")}"`);
    }
  });

  doc.main.addEventListener("click", (e) => {
    if (e.target.textContent === "Completed") {
      const wholeContainer = e.path[1]; //same as taskContainer

      for (let i = 0; i < wholeContainer.children.length-1; i++) {
        wholeContainer.children[i].classList.add("clicked");
      };

      localStorage.removeItem(`"${wholeContainer.getAttribute("id")}"`);
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
  doc.addProject.addEventListener("click", fxn.showPopupProject);
})();

const saveData=(()=>{
  if (typeof(Storage) !== "undefined") {
  // Store
  // localStorage.setItem("lastname", "Smith");
  // Retrieve
  // localStorage.getItem("lastname");
} else {
  const sorryText=document.createElement("div"); 
  sorryText.textContent= "Sorry, your browser does not support storage of previous tasks.";
  document.main.appendChild(sorryText);
}
})();