// richiamo checkbox e bottone
const checkPromise = document.getElementById("promise-checkbox");
const proceed = document.getElementById("buttonProceed");

// creo una funzione che verifica la checkbox, se checked applica classe e attiva il bottone, altrimenti lo disabilita
const attivaBt = function () {
  if (checkPromise.checked) {
    proceed.disabled = false;
    proceed.classList.remove("button");
    proceed.classList.add("buttonActive");
  } else {
    proceed.disabled = true;
    proceed.classList.remove("buttonActive");
    proceed.classList.add("button");
  }
};
// addeventlistener per fare in modo che la funzione si attivi ogni volta che avviene un change sulla checkbox
checkPromise.addEventListener("change", attivaBt);

proceed.addEventListener("click", function (e) {
  e.preventDefault();
  if (!proceed.disabled) {
    window.location.href = "paginaDomande.html";
  }
});
