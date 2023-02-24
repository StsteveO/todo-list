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
    };

    const showPopupProject=()=>{
      form.forTaskProject.classList.add("show");
      form.overlay.classList.add("show");
    };

    return { showPopup, closePopup, showPopupProject };
})();

export default fxn;
