import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";
import total from "./listArrays";

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
        return "No Date Given.";
      } else {
        return e.path[0][2].value;
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
    console.log(taskTitle());
    console.log(dueDate());
    console.log(priorityResult());

    fxn.closePopup();
  });
})();