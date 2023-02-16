import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    return{overlay}
})();

export default form;
