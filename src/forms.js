import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const forTask = document.querySelector(".form.default"); //default form
    const forTaskProject = document.querySelector(".form.project"); //project forms

    // const closeBtn=document.querySelector(".close-btn");

    return { overlay, forTask, forTaskProject };
})();

export default form;
