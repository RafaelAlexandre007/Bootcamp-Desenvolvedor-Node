let employees = [];
let roles = [];
let selectedItem;
const listEl = document.querySelector("ul");
const formEl = document.querySelector("form");
const bdelete = document.getElementById("bdelete");
const bcancel = document.getElementById("bcancel");
const bsubmit = document.getElementById("bsubmit");

//Inicializa lista
async function init() {

    [employees, roles] = await Promise.all([
        listEmployees(),
        listRoles(),
    ]);
    renderRoles();
    rednderData();
    clearSelection();
    bcancel.addEventListener("click", clearSelection);
    formEl.addEventListener("submit", onSubmit);
    bdelete.addEventListener("click", onDelete);

    //O tratamento de erro está sendo feito na função fetchJson em http.js.
}

init();

//*****************************************/
//Renderizando a lista com os elementos
function selectItem(employee, li) {
    clearSelection();
    selectedItem = employee;
    li.classList.add("selected");

    formEl.name.value = employee.name;
    formEl.salary.valueAsNumber = employee.salary;
    formEl.role_id.value = employee.role_id;

    bdelete.style.display = "inline";
    bcancel.style.display = "inline";
    bsubmit.textContent = "Update";

}

//Limpa formulário
function clearSelection() {
    clearError();
    selectedItem = undefined;
    const li = listEl.querySelector(".selected");
    if (li) {
        li.classList.remove("selected");
    }

    formEl.name.value = "";
    formEl.salary.value = "";
    formEl.role_id.value = "";
    bdelete.style.display = "none";
    bcancel.style.display = "none";
    bsubmit.textContent = "Create";


}

//Submete o formulário
async function onSubmit(evt) {
    evt.preventDefault();
    const employeeData = {
        name: formEl.name.value,
        salary: formEl.salary.valueAsNumber,
        role_id: +formEl.role_id.value
    };

    if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {
        showError("Você precisa preencher todos os campos!");
    } else {
        if (selectedItem) {
            const updatedItem = await updateEmployee(selectedItem.id, employeeData);
            const i = employees.indexOf(selectedItem);
            employees[i] = updatedItem;
            rednderData();
            selectItem(updatedItem, listEl.children[i]);
        } else {
            const createdItem = await createEmployee(employeeData);
            employees.push(createdItem);
            rednderData();
            selectItem(createdItem, listEl.lastChild);
            listEl.lastChild.scrollIntoView();
        }
    }


}

//Deleta o elemento selecionado
async function onDelete() {
    if (selectedItem) {
        await deleteEmployee(selectedItem.id);
        const i = employees.indexOf(selectedItem);
        employees.splice(i, 1);
        rednderData();
        clearSelection();
    }
}

//Renderiza dados
function rednderData() {
    listEl.innerHTML = "";

    for (const employee of employees) {
        let role = roles.find((role) => role.id == employee.role_id);
        const li = document.createElement("li");
        const divName = document.createElement("div");
        divName.textContent = employee.name;
        const divRole = document.createElement("div");
        divRole.textContent = role.name;
        li.appendChild(divName);
        li.appendChild(divRole);
        listEl.appendChild(li);
        li.addEventListener("click", () => selectItem(employee, li));
    }
}

//Renderiza roles
function renderRoles() {
    for (const role of roles) {
        const option = document.createElement("option");
        option.textContent = role.name;
        option.value = role.id;
        formEl.role_id.appendChild(option);
    }
}

//Mensagens de erro
function showError(message, error) {
    document.getElementById("errors").textContent = message;
    if (error) {
        console.error(error);
    }
}

//Limpa erros
function clearError() {
    document.getElementById("errors").textContent = "";
}