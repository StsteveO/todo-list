import "./style.css";
import doc from "./docStructure";
import form from "./forms";
import fxn from "./functions";

console.log("hello world");

const logic = (() => {
    doc.headerBtn.addEventListener("click", fxn.showOverlay);
})();