const modal = document.getElementById("message-modal");
const showModal = document.getElementById("create-message");
const closeModal = document.getElementById("close-form");

showModal.addEventListener("click", () => {
    modal.style.display = "block";
})

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
})