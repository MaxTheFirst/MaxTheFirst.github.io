const openPopupButton = document.querySelector(".contact__open__button");
const closePopupButton = document.querySelector(".pop_up__close");
const popup = document.querySelector(".pop_up");
const popupContainer = document.querySelector(".pop_up_container");
const form = document.querySelector(".contact__form");


function openPopup() {
    document.body.classList.add("no-scroll");
    popup.classList.add("active");
}

function closePopup() {
    document.body.classList.remove("no-scroll");
    popup.classList.remove("active");
    localStorage.setItem("popupClosed", "true");
}


setTimeout(() => {
    const isPopupClosed = localStorage.getItem("popupClosed");
    if (!isPopupClosed) {
        openPopup();
    }
}, 30000);

openPopupButton.addEventListener("click", (e) => {
    e.preventDefault();
    openPopup();
});

closePopupButton.addEventListener("click", closePopup);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePopup();
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
    let inputs = [nameInput, emailInput, messageInput];

    const errorName = form.querySelector("#error-name");
    const errorEmail = form.querySelector("#error-email");
    const errorMessage = form.querySelector("#error-message");
    let errorMessages = [errorName, errorEmail, errorMessage];

    inputs.forEach(el => el.classList.remove("error"));
    errorMessages.forEach(el => {
        el.textContent = "";
        el.classList.remove("active");
    });

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    let hasError = false;

    if (!name) {
        nameInput.classList.add("error");
        errorName.textContent = "Name is required.";
        errorName.classList.add("active");
        hasError = true;
    } else if (!nameRegex.test(name)) {
        nameInput.classList.add("error");
        errorName.textContent = "Name must be at least 2 letters in Latin.";
        errorName.classList.add("active");
        hasError = true;
    }

    if (!email) {
        emailInput.classList.add("error");
        errorEmail.textContent = "Email is required.";
        errorEmail.classList.add("active");
        hasError = true;
    } else if (!emailRegex.test(email)) {
        emailInput.classList.add("error");
        errorEmail.textContent = "Invalid email format.";
        errorEmail.classList.add("active");
        hasError = true;
    }

    if (!message) {
        messageInput.classList.add("error");
        errorMessage.textContent = "Message is required.";
        errorMessage.classList.add("active");
        hasError = true;
    } else if (message.length < 10) {
        messageInput.classList.add("error");
        errorMessage.textContent = "Message must be at least 10 characters.";
        errorMessage.classList.add("active");
        hasError = true;
    }

    if (hasError) return;

    inputs.forEach(el => el.classList.remove("error"));
    errorMessages.forEach(el => {
        el.textContent = "";
        el.classList.remove("active");
    });

    form.reset();
    closePopup();
});
