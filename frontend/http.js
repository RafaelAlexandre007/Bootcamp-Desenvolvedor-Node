function fetchJson(url, option) {
    return fetch(url, option).then((r) => {
        if (r.ok) {
            return r.json();
        } else {
            throw new Error(r.statusText);
        }
    });
};

function listEmployees() {
    return fetchJson("http://localhost:3000/employees");
}

function listRoles() {
    return fetchJson("http://localhost:3000/roles");
}

function updateEmployee(id, employee) {
    return fetchJson(`http://localhost:3000/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });
}

/*
//Criar 
fetch(`http://localhost:3000/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employees)
});

//Atualizar
fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employees)
});

//Excluir
fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
});
*/