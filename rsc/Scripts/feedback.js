window.onload = function () {
    let starBox = document.querySelectorAll(".starBox");
    let rating = -1; // nessuna stella cliccata
    let feedback = document.getElementById("feedback-comment")
    let feedbackBtn = document.getElementById("feedback-btn")

    function highlight(index) {
        starBox.forEach((star, i) => {
            if (i <= index) {
                star.classList.add("active");
                star.classList.remove("inactive");
            } else {
                star.classList.remove("active");
                star.classList.add("inactive");
            }
        });
    }

    starBox.forEach((el, id) => {
        el.addEventListener("mouseover", () => {
            highlight(id); // illumina fino alla stella passata
        });

        el.addEventListener("mouseleave", () => {
            highlight(rating); // torna al voto salvato
        });

        el.addEventListener("click", () => {
            rating = id; // salva il voto
            highlight(rating);
            console.log("Hai votato la stella " + (id + 1));
        });
    });

    feedback.addEventListener("input", (e) => {
        let value = e.target.value //recupero il valore dell'input
        if (value == "") {
            feedbackBtn.classList.remove("buttonActive")
            feedbackBtn.setAttribute("disabled", null)
        } else {
            feedbackBtn.classList.add("buttonActive")
            feedbackBtn.removeAttribute("disabled")
        }

    })

    feedbackBtn.addEventListener("click", (e) => {
        e.preventDefault();
        feedback.value = "";
        feedbackBtn.classList.remove("buttonActive")
        feedbackBtn.setAttribute("disabled", null)
    })

}
