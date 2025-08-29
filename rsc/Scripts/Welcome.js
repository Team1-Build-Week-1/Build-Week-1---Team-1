const btn = document.getElementById("proceedBtn");
const checkbox = document.getElementById("promise-checkbox");

btn.addEventListener("click", () => {
  if (!checkbox.checked) {
    alert("You must first select the checkbox!");
  } else {
    window.location.href = "difficulty.html";
    checkbox.checked = false;
  }
});

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    btn.classList.remove("buttonUnchecked");
    btn.classList.add("buttonChecked");
  } else {
    btn.classList.remove("buttonChecked");
    btn.classList.add("buttonUnchecked");
  }
});
