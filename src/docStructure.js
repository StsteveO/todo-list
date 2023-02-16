const doc = (() => {
    const pageContainer=document.createElement("div");
    const header= document.createElement("header");
    const nav = document.createElement("nav");
    const main = document.createElement("main");
    const headerTitle= document.createElement("div");
    const headerBtn= document.createElement("button");

    pageContainer.classList.add("page-container");
    headerTitle.classList.add("header-title");
    headerBtn.classList.add("header-btn");

    nav.textContent = "nav";
    main.textContent = "main";
    headerTitle.textContent="Todo List";
    headerBtn.textContent="Add"


    document.body.appendChild(pageContainer);
    pageContainer.appendChild(header);
    pageContainer.appendChild(nav);
    pageContainer.appendChild(main);
    header.appendChild(headerTitle);
    header.appendChild(headerBtn);
})();

export default doc;
