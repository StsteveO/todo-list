import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const formForTask= document.querySelector(".form");

    return { overlay, formForTask};
})();

export default form;
