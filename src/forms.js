import doc from "./docStructure";

const form = (() => {
    const overlay= document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const forTask= document.querySelector(".form");

    // const closeBtn=document.querySelector(".close-btn");

    return { overlay, forTask };
})();

export default form;
