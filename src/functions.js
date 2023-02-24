import doc from "./docStructure";
import form from "./forms";

const fxn = (() => {
    const showPopup=()=>{
        form.overlay.classList.add("show");
        form.forTask.classList.add("show");
    };

    const closePopup = () => {
      form.overlay.classList.remove("show");
      form.forTask.classList.remove("show");
      form.forTaskProject.classList.remove("show");
      form.forTaskProjectSubtasks.classList.remove("show");
    };

    const showPopupProject=()=>{
      form.forTaskProject.classList.add("show");
      form.overlay.classList.add("show");
    };

    const showPopupProjectSubtasks=()=>{
      form.overlay.classList.add("show");
      form.forTaskProjectSubtasks.classList.add("show");
    };

    return { showPopup, closePopup, showPopupProject, showPopupProjectSubtasks };
})();

export default fxn;
