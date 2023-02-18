import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const formForTask= document.querySelector(".form");

    const closeBtn=document.querySelector(".close-btn");

    return { overlay, formForTask, closeBtn};
})();

export default form;
