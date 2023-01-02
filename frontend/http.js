//Retorna lista JSON
function fetchJson(url, option) {
    return fetch(url, option).then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error(r.statusText);
        }
    });
};

//*********************************************/
//Gerar lista
function listEmployees() {
    return fetchJson("http://localhost:3000/employees");
}

function listRoles() {
    return fetchJson("http://localhost:3000/roles");
}

//Atualizar
function updateEmployee(id, employee) {
    return fetchJson(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
}

//Criar
function createEmployee(employee) {
    return fetchJson(`http://localhost:3000/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
}

//Excluir
function deleteEmployee(id) {
    return fetchJson(`http://localhost:3000/employees/${id}`, {
        method: "DELETE"
    });
}
