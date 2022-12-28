let employees = [];
let roles = [];
const listEl = document.querySelector("ul");
const formEl = document.querySelector("form")

async function init() {
    try {
        [employees, roles] = await Promise.all([
            listEmployees(),
            listRoles(),
        ]);
        rednderData();

    } catch (error) {
        showError(error);
    }
}

init();

//Renderizando a lista com os elementos
function rednderData() {

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
    }
}

function showError(error) {
    document.getElementById("errors").textContent = "Erro ao carregar os dados!";
    console.error(error);
}