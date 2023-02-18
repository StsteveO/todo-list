import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";

// console.log("hello world");

const logic = (() => {
  const currentViewedList = [];
  const today = new Date().toISOString().split("T")[0]; // sets todays date to min date 1/2
  document.getElementsByName("due_date")[0].setAttribute("min", today); // sets todays date to min date 2/2

  doc.headerBtn.addEventListener("click", fxn.showPopup);
  form.overlay.addEventListener("click", fxn.closePopup);
  form.closeBtn.addEventListener("click", fxn.closePopup);
  form.formForTask.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskValue = e.path[0][1].value; // task value

    const dueDateValue = e.path[0][2].value; // due date value....if empty it is blank

    const priorityResult = () => {
      const priority = document.getElementsByName("priority");

      if (priority[0].checked === true) {
        console.log("No Priority");
      } else if (priority[1].checked === true) {
        console.log("Low Priority");
      } else if (priority[2].checked === true) {
        console.log("Medium Priority");
      } else if (priority[3].checked === true) {
        console.log("High Priority");
      }
    };
    console.log(taskValue);
    console.log(dueDateValue);
    priorityResult();
    fxn.closePopup();
  });
})();
