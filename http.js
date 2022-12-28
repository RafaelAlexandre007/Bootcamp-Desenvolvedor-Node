function fetchJson(url) {
    return fetch(url).then((r) => {
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