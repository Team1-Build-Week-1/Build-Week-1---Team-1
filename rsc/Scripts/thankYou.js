let feedbackBtn = document.getElementById("feedback-btn");
feedbackBtn.style.color = "white";

feedbackBtn.addEventListener("click", function () {
  window.location.href = "welcome-page.html";
});

feedbackBtn.addEventListener("mouseover", function () {
  feedbackBtn.classList.add("buttonActive");
  feedbackBtn.style.color = "white";
});

feedbackBtn.addEventListener("mouseout", function () {
  feedbackBtn.classList.remove("buttonActive");
  feedbackBtn.style.color = "white";
});
