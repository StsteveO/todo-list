const doc = (() => {
    const pageContainer=document.createElement("div");
    const header= document.createElement("header");
    const nav = document.createElement("nav");
    const main = document.createElement("main");

    pageContainer.classList.add("page-container");

    header.textContent="header";
    nav.textContent = "nav";
    main.textContent = "main";

    document.body.appendChild(pageContainer);
    pageContainer.appendChild(header);
    pageContainer.appendChild(nav);
    pageContainer.appendChild(main);
})();

export default doc;
