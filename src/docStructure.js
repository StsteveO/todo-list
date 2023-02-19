const doc = (() => {
    const pageContainer=document.createElement("div");
    const header= document.createElement("header");
    const nav = document.createElement("nav");
    const main = document.createElement("main");
    const headerTitle= document.createElement("div");
    const headerBtn= document.createElement("button");
    const navTitle= document.createElement("div");
    const navFullList= document.createElement("button");
    const navHighPri = document.createElement("button");
    const navMedPri= document.createElement("button");
    const navLowPri = document.createElement("button");
    const navProject= document.createElement("div");
    const addProject= document.createElement("button");
    const mainFullList=document.createElement("div");


    pageContainer.classList.add("page-container");
    headerTitle.classList.add("header-title");
    headerBtn.classList.add("header-btn");
    navTitle.classList.add("nav-title");
    navFullList.classList.add("nav-full-list");
    navHighPri.classList.add("nav-high-pri");
    navMedPri.classList.add("nav-med-pri");
    navLowPri.classList.add("nav-low-pri");
    navProject.classList.add("nav-project")
    addProject.classList.add("add-project");
    mainFullList.classList.add("main-full-list");


    headerTitle.textContent="To-do List";
    headerBtn.textContent="Add";
    navTitle.textContent="Lists";
    navFullList.textContent="Full List";
    navHighPri.textContent="High Priority";
    navMedPri.textContent = "Medium Priority";
    navLowPri.textContent = "Low Priority";
    navProject.textContent="Project(s)"
    addProject.textContent="Add Project"
    mainFullList.textContent="Full List"


    document.body.appendChild(pageContainer);
    pageContainer.appendChild(header);
    pageContainer.appendChild(nav);
    pageContainer.appendChild(main);
    header.appendChild(headerTitle);
    header.appendChild(headerBtn);
    nav.appendChild(navTitle);
    nav.appendChild(navFullList);
    nav.appendChild(navHighPri);
    nav.appendChild(navMedPri);
    nav.appendChild(navLowPri);
    nav.appendChild(navProject);
    nav.appendChild(addProject);
    main.appendChild(mainFullList);

    return{headerBtn, main};
})();

export default doc;
