import doc from "./docStructure";
import form from "./forms";

const fxn = (() => {
    const showPopup=()=>{
        form.overlay.classList.add("show");
        form.formForTask.classList.add("show");
    }

    const closePopup = () => {
      form.overlay.classList.remove("show");
      form.formForTask.classList.remove("show");
    };

    return { showPopup, closePopup };
})();

export default fxn;
