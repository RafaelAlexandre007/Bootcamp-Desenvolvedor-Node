//Retorna lista JSON
function fetchJson(url, option) {
    return fetch(url, option).then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error(r.statusText);
        }
    }).catch(error => {
        showError("Error ao carregar dados", error);
        throw error;
    });
};

//*********************************************/
const baseUrl = "http://localhost:3000";
//Gerar lista
function listEmployees() {
    return fetchJson(`${baseUrl}/employees`);
}

function listRoles() {
    return fetchJson(`${baseUrl}/roles`);
}

//Atualizar
function updateEmployee(id, employee) {
    return fetchJson(`${baseUrl}/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
}

//Criar
function createEmployee(employee) {
    return fetchJson(`${baseUrl}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
}

//Excluir
function deleteEmployee(id) {
    return fetchJson(`${baseUrl}/employees/${id}`, {
        method: "DELETE"
    });
}
