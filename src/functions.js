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
    };

    return { showPopup, closePopup };
})();

export default fxn;
