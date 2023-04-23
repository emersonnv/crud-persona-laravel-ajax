let inputId = document.getElementById("inputId");
let inputName = document.getElementById("inputName");
let inputLastName = document.getElementById("inputLastName");
let inputDoc = document.getElementById("inputDoc");
let inputSearch = document.getElementById("inputSearch");
let alertName = document.getElementById("alertName");
let alertLastName = document.getElementById("alertLastName");
let alertDoc = document.getElementById("alertDoc");
let btnAdd = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");
let tableBody = document.getElementById("tableBody");
let alertSuccess = document.getElementById("alertSuccess")
let alertError = document.getElementById("alertError")
let currentIndex = 0;
let persons = [];

if (JSON.parse(localStorage.getItem("Persons")) !== null) {
    persons = JSON.parse(localStorage.getItem("Persons"));
    displayPerson();
}

btnAdd.addEventListener("click", _ => {
    if (validName() && validDoc()) {
        if (btnAdd.innerHTML === "Add Person") {
            let person = {
                name: inputName.value,
                lastname: inputLastName.value,
                doc: inputDoc.value,
            };

            let formData = JSON.stringify(person);
            let form = document.getElementById('formPerson');
            let xhr = new XMLHttpRequest();
            xhr.open("POST", '/persons');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(formData);
            xhr.onload = function (e) {
                let response = JSON.parse(xhr.responseText);

                if(response.success){
                    alertSuccess.innerHTML = response.data
                    alertSuccess.removeAttribute("hidden");

                    setTimeout(() => {
                        alertSuccess.setAttribute("hidden", "");
                    }, 2000);

                    person.id = response.id;
                    persons.push(person);
                    localStorage.setItem("Persons", JSON.stringify(persons));
                    displayPerson();
                    clearForm();
                } else {
                    alertError.innerHTML = response.data
                    alertError.removeAttribute("hidden");

                    setTimeout(() => {
                        alertError.setAttribute("hidden", "");
                    }, 2000);
                }
            }

            inputName.classList.remove("is-valid")
            inputLastName.classList.remove("is-valid")
            inputDoc.classList.remove("is-valid")
        } else if (btnAdd.innerHTML === "Update Person") {
            updatePerson()
            clearForm()
            inputName.classList.remove("is-valid")
            inputLastName.classList.remove("is-valid")
            inputDoc.classList.remove("is-valid")
        }
    }
})

function displayPerson() {
    let temp = "";
    for (let i = 0; i < persons.length; i++) {
        temp += `
        <tr>
            <td>${persons[i].id}</td>
            <td>${persons[i].name}</td>
            <td>${persons[i].lastname}</td>
            <td>${persons[i].doc}</td>
            <td>
                <i onclick="getPersonInformation(${persons[i].id})" title="Update" class="fa-solid me-2 text-warning fa-pen"></i>
                <i onclick="deletePerson(${persons[i].id})" title="Delete" class="fa-solid text-danger fa-trash"></i>
            </td>
        </tr>`
    }
    tableBody.innerHTML = temp
}
btnClear.addEventListener("click", clearForm)
function clearForm() {
    inputId.value = ""
    inputName.value = ""
    inputLastName.value = ""
    inputDoc.value = ""
    inputName.classList.remove("is-valid")
    inputName.classList.remove("is-invalid")
    alertName.classList.replace("d-block", "d-none")
    inputLastName.classList.remove("is-valid")
    inputLastName.classList.remove("is-invalid")
    alertLastName.classList.replace("d-block", "d-none")
    inputDoc.classList.remove("is-valid")
    inputDoc.classList.remove("is-invalid")
    alertDoc.classList.replace("d-block", "d-none")
}
function getPersonInformation(id) {
    const person = persons.find((p) => p.id == id);

    inputId.value = person.id
    inputName.value = person.name
    inputLastName.value = person.lastname
    inputDoc.value = person.doc

    btnAdd.classList.replace("btn-success", "btn-warning")
    btnAdd.innerHTML = "Update Person"
    inputName.classList.remove("is-invalid")
    alertName.classList.replace("d-block", "d-none")
    inputLastName.classList.remove("is-invalid")
    alertLastName.classList.replace("d-block", "d-none")
    inputDoc.classList.remove("is-invalid")
    alertDoc.classList.replace("d-block", "d-none")
}

function updatePerson() {
    let person = {
        id: inputId.value,
        name: inputName.value,
        lastname: inputLastName.value,
        doc: inputDoc.value,
    };

    let formData = JSON.stringify(person);
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", '/persons/' + inputId.value);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(formData);
    xhr.onload = function (e) {
        let response = JSON.parse(xhr.responseText);

        if(response.success){
            alertSuccess.innerHTML = response.data
            alertSuccess.removeAttribute("hidden");

            setTimeout(() => {
                alertSuccess.setAttribute("hidden", "");
            }, 2000);

            const index = persons.findIndex(p => p.id == person.id);

            if (index !== -1) {
                persons[index] = person;
            }

            displayPerson()
            localStorage.setItem("Persons", JSON.stringify(persons))
            btnAdd.classList.replace("btn-warning", "btn-success")
            btnAdd.innerHTML = "Add Person"

        } else {
            alertError.innerHTML = response.data
            alertError.removeAttribute("hidden");

            setTimeout(() => {
                alertError.setAttribute("hidden", "");
            }, 2000);
        }
    }

}

function deletePerson(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", '/persons/' + id);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
    xhr.onload = function (e) {
        let response = JSON.parse(xhr.responseText);

        if(response.success){
            alertSuccess.innerHTML = response.data
            alertSuccess.removeAttribute("hidden");

            setTimeout(() => {
                alertSuccess.setAttribute("hidden", "");
            }, 2000);

            const indexAEliminar = persons.findIndex(p => p.id == id);
            persons.splice(indexAEliminar, 1)
            displayPerson()
            localStorage.setItem("Persons", JSON.stringify(persons))
        } else {
            alertError.innerHTML = response.data
            alertError.removeAttribute("hidden");

            setTimeout(() => {
                alertError.setAttribute("hidden", "");
            }, 2000);
        }
    }
}

inputSearch.addEventListener("keyup", _ => {
    let temp = "";
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            temp += `
            <tr>
                <td>${persons[i].id}</td>
                <td>${persons[i].name}</td>
                <td>${persons[i].lastname}</td>
                <td>${persons[i].doc}</td>
                <td>
                    <i onclick="getPersonInformation(${persons[i].id})" title="Update" class="fa-solid me-2 text-warning fa-pen"></i>
                    <i onclick="deletePerson(${persons[i].id})" title="Delete" class="fa-solid text-danger fa-trash"></i>
                </td>
            </tr>`
        }
    }
    tableBody.innerHTML = temp
})
inputName.addEventListener("keyup", validName)
inputDoc.addEventListener("keyup", validDoc)
function validName() {
    let regex = /^[A-Z][a-zA-Z0-9 ]+$/
    if (regex.test(inputName.value)) {
        inputName.classList.add("is-valid")
        inputName.classList.remove("is-invalid")
        alertName.classList.replace("d-block", "d-none")
        return true
    } else {
        inputName.classList.add("is-invalid")
        inputName.classList.remove("is-valid")
        alertName.classList.replace("d-none", "d-block")
        return false
    }
}
function validDoc() {
    let regex = /^[1-9][0-9]{2,}$/
    if (regex.test(inputDoc.value)) {
        inputDoc.classList.add("is-valid")
        inputDoc.classList.remove("is-invalid")
        alertDoc.classList.replace("d-block", "d-none")
        return true
    } else {
        inputDoc.classList.add("is-invalid")
        inputDoc.classList.remove("is-valid")
        alertDoc.classList.replace("d-none", "d-block")
        return false
    }
}
