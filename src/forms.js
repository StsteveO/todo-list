import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const forTask = document.querySelector(".form.default"); //default form
    const forTaskProject = document.querySelector(".form.project"); //project forms
    const forTaskProjectSubtasks= document.querySelector(".form.project.subtasks")

    // const closeBtn=document.querySelector(".close-btn");

    return { overlay, forTask, forTaskProject, forTaskProjectSubtasks };
})();

export default form;
