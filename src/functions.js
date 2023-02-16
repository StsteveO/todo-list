import doc from "./docStructure";
import form from "./forms";

const fxn = (() => {
    const showOverlay=()=>{
        form.overlay.classList.add("show");
    }

    return{showOverlay}
})();

export default fxn;
