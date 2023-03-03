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
  //array which will go on the page
  const totalList = []; 

  //formatting saved data in local storage post reload
  const saveData = (() => {
    if (typeof Storage !== "undefined") {
      // Store
      // Retrieve
      for (let i = 0; i < localStorage.length; i++) {
        // loop and get all to-do tasks from local storgae and populate empty array
        const savedObj= (JSON.parse(localStorage.getItem(localStorage.key(i))));

        totalList.push(savedObj);

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
          const newTitleVersion= (savedObj.title).replace(/ /g, "");
          placeHolder.classList.add(newTitleVersion);
          taskContainer.appendChild(placeHolder);

          for (let i = 0; i < localStorage.length; i++) {
            if((((JSON.parse(localStorage.getItem(localStorage.key(i)))).classForTitle)!==undefined)
            && (((JSON.parse(localStorage.getItem(localStorage.key(i)))).subtaskTitle)!==undefined)
            && ((newTitleVersion)===((JSON.parse(localStorage.getItem(localStorage.key(i)))).classForTitle))){
           
            const subTaskItem= document.createElement("div");
            subTaskItem.classList.add("subtasks-read-out");
            subTaskItem.textContent= ((JSON.parse(localStorage.getItem(localStorage.key(i)))).subtaskTitle);
            
            subTaskItem.addEventListener("click", (e)=>{
              subTaskItem.classList.add("clicked");
              localStorage.removeItem(`"${((JSON.parse(localStorage.getItem(localStorage.key(i)))).keyTitle)}"`);
              window.location.reload();
            });

            placeHolder.appendChild(subTaskItem);
            };
            };
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
      //out of the loop

      //if local storgae is not available send this message
    } else {
      const sorryText = document.createElement("div");
      sorryText.textContent =
        "Sorry, your browser does not support storage of previous tasks.";
      document.main.appendChild(sorryText);
    }
  })();

  //loop and get all to-do sub-tasks from local storgae and populate project to-do's
  const saveSubtaskData = (() => {
    if (typeof Storage !== "undefined") {
      // Store
      // Retrieve
      for (let i = 0; i < localStorage.length; i++) {
        if(((JSON.parse(localStorage.getItem(localStorage.key(i)))).keyTitle)!== undefined){
        const project= (((JSON.parse(localStorage.getItem(localStorage.key(i)))).overallTask));
        const overallProjectClass= (project.replace(/ /g, "")); //same as title and container id
        }
        };
        
    } else {
      const sorryText = document.createElement("div");
      sorryText.textContent =
        "Sorry, your browser does not support storage of previous tasks.";
      document.main.appendChild(sorryText);
    }
  })();

  //after getting to-do's from loacl storage, format new to-do's
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

    //creates new to-do object using values from form filled out
    const newTask = new Todo(taskTitleValue(), priorityValue(), dueDateValue()); 
    const addReminderToTotalListArr = (() => {
      totalList.push(newTask);
    })();

    for (let i = totalList.length - 1; i < totalList.length; i++) {
      //format each object in an array
      //want to loop over everything and only add last object in array 
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

      //store all default to-do data in local storage 
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
        } else {
          const sorryText = document.createElement("div");
          sorryText.textContent =
            "Sorry, your browser does not support storage of previous tasks.";
          document.main.appendChild(sorryText);
        }
      })();
    }
    //end of loop for default list
    fxn.closePopup();
  });

    //after formatting default new to-do's, format project to-do's
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

      //creates new object using values from form filled out
      const newTask = new Todo(
        taskTitleValue(),
        priorityValue(),
        dueDateValue()
      ); 
      const addReminderToTotalListArr = (() => {
        totalList.push(newTask);
      })();

      for (let i = totalList.length - 1; i < totalList.length; i++) {
        //format each object in an array
        //want to loop over everything and only add last object in array 
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

        const placeHolder = document.createElement("div");
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

        //store project to-do data in local storage
        const importantData = {
          title: containerTitle.textContent,
          classForTitle: containerTitle.textContent.replace(/ /g, ""),
          rawDate: dueDateValue(),
          priorityLevel: newTask.priorityLevel,
          dateDifference: dateDifference(),
          subTasks: document.querySelectorAll(".subtasks-read-out"),
          project: true,
        };

      const saveData = (() => {
        if (typeof Storage !== "undefined") {
          // Store
          localStorage.setItem(JSON.stringify(`PROJECT: ${newTask.taskTitle}`), JSON.stringify(importantData));
          // Retrieve
        } else {
          const sorryText = document.createElement("div");
          sorryText.textContent =
            "Sorry, your browser does not support storage of previous tasks.";
          document.main.appendChild(sorryText);
        }
      })();

      }
      //end of loop for project to-do's list
      window.location.reload();
      fxn.closePopup();
    });

  //format "delete" btn fxn
  doc.main.addEventListener("click", (e) => {
    if (e.target.textContent === "Delete") {
      const wholeContainer = e.path[1]; //same as taskContainer
      const indexPosition = totalList.findIndex(matching);

      function matching(index) {
        return index.taskTitle === e.path[1].getAttribute("id");
      }

      totalList.splice(indexPosition, 1);
      wholeContainer.remove();

      localStorage.removeItem(`"${wholeContainer.getAttribute("id")}"`);

      const subTaskList = e.path[1].children[5].childNodes;

      for (let i = 0; i < subTaskList.length; i++) {
        localStorage.removeItem(`"subtask: ${subTaskList[i].textContent}"`);
      }
    }
  });

  //format "completed" btn fxn
  doc.main.addEventListener("click", (e) => {
    if (e.target.textContent === "Completed") {
      const wholeContainer = e.path[1]; //same as taskContainer

      for (let i = 0; i < wholeContainer.children.length-1; i++) {
        wholeContainer.children[i].classList.add("clicked");
      };

      localStorage.removeItem(`"${wholeContainer.getAttribute("id")}"`);
      const subTaskList = e.path[1].children[5].childNodes;
      for (let i = 0; i < subTaskList.length; i++) {
        localStorage.removeItem(`"subtask: ${subTaskList[i].textContent}"`);
      };
      }
  });

  //format btns in nav section to filter list shown by priority
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

//format additional btns on main doc
const logic = (() => {
  doc.headerBtn.addEventListener("click", fxn.showPopup);
  form.overlay.addEventListener("click", fxn.closePopup);
  doc.addProject.addEventListener("click", fxn.showPopupProject);
})();

//format "subtask" btn fxn on project to-do's
const subtaskBtnFxn=(()=>{

  const subtaskBtns= document.querySelectorAll(".sub-tasks-btn");
  subtaskBtns.forEach(btn=>btn.addEventListener("click", addToContainer));

  const emptyArr=[];

  function addToContainer(e) {
    const overallDiveContainerPlaceHolder = (e.path[1].childNodes[5]);
    const containerTitleName= (e.path[1].childNodes[0].textContent);
    const containerTitleNameNoSpaces= (e.path[1].childNodes[0].textContent.replace(/ /g, ""));

    emptyArr[0] = overallDiveContainerPlaceHolder;
    emptyArr[1]= containerTitleName;
    emptyArr[2] = containerTitleNameNoSpaces;

    fxn.showPopupProjectSubtasks();
    form.forTaskProjectSubtasks.addEventListener("submit", (e) => {
      e.preventDefault();
      const formTitle = e.path[0][1].value;
      emptyArr[3] = formTitle;

      const grabOverallContainerPlaceHolder = emptyArr[0];
      const containerTitle = emptyArr[1];
      const classTitleNoSpaces = emptyArr[2];
      const subTaskTitle = emptyArr[3];

      const readOut = document.createElement("div");
        readOut.classList.add("subtasks-read-out");
        readOut.textContent = subTaskTitle;

        readOut.addEventListener("click", (e)=>{
          readOut.classList.add("clicked");
          window.location.reload();
        });

        grabOverallContainerPlaceHolder.appendChild(readOut);

        //store subtask data in local storage
        const subtaskData = {
          overallTask: containerTitle,
          classForTitle: containerTitle.replace(/ /g, ""),
          subtaskTitle: subTaskTitle,
          subtaskPresent: true,
          keyTitle: `subtask: ${subTaskTitle}`,
        };

        const saveData = (() => {
          if (typeof Storage !== "undefined") {
            // Store
            localStorage.setItem(
              JSON.stringify(`subtask: ${subTaskTitle}`),
              JSON.stringify(subtaskData)
            );
            // Retrieve
          } else {
            const sorryText = document.createElement("div");
            sorryText.textContent =
              "Sorry, your browser does not support storage of previous tasks.";
            document.main.appendChild(sorryText);
          }
        })();
      window.location.reload();
      fxn.closePopup();
    });
  }})();