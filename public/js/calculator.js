let formCalculator = document.getElementById("formCalculator")
let inputNumberA = document.getElementById("inputNumberA");
let inputNumberB = document.getElementById("inputNumberB");
let btnSum = document.getElementById("btnSum");
let inputResult = document.getElementById("inputResult");

btnSum.addEventListener("click", e => {
    e.preventDefault()
    sendRequest()
})

let sendRequest = () => {
    let xhr = new XMLHttpRequest
    let action = formCalculator.getAttribute("action");
    let data = {
        inputNumberA : inputNumberA.value,
        inputNumberB : inputNumberB.value,
    } 

    console.log(action);
    xhr.open('POST', action, [false]);
    xhr.responseType = 'json';
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) { 
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
          } else {
              let response = xhr.response
              inputResult.value = response.data
          }
    }
}