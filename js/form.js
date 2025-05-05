const openFormBtn = document.querySelector(".contact__open__button");
const closeFormBtn = document.querySelector(".form__close");
const formPopUp = document.querySelector(".form__pop_up");
const form = document.querySelector(".contact__form");


function openForm() {
    document.body.classList.add("no-scroll");
    formPopUp.classList.add("active");
}

function closeForm() {
    document.body.classList.remove("no-scroll");
    formPopUp.classList.remove("active");
    localStorage.setItem("popupClosed", "true");
}


setTimeout(() => {
    const isFormClosed = localStorage.getItem("popupClosed");
    if (!isFormClosed) {
        openForm();
    }
}, 30000);

openFormBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openForm();
});

closeFormBtn.addEventListener("click", closeForm);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeForm();
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
    const submitBtn = form.querySelector("button[type='submit']");

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

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    submitBtn.style.backgroundColor = "#999";
    submitBtn.style.cursor = "not-allowed";

    fetch("/your-endpoint", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(data => {
        submitBtn.textContent = "Успешно отправлено!";
        submitBtn.style.backgroundColor = "#4caf50";
        submitBtn.style.cursor = "default";

        form.reset();
        closeForm();

        setTimeout(() => {
            submitBtn.textContent = "Отправить";
            submitBtn.style.backgroundColor = "";
            submitBtn.disabled = false;
            submitBtn.style.cursor = "";
        }, 3000);
    })
    .catch(error => {
        console.error("Error submitting form:", error);
        submitBtn.textContent = "Error!";
        submitBtn.style.backgroundColor = "#f44336";
        submitBtn.style.cursor = "default";

        setTimeout(() => {
            submitBtn.textContent = "Send Message";
            submitBtn.style.backgroundColor = "";
            submitBtn.disabled = false;
            submitBtn.style.cursor = "";
        }, 3000);
    });
});
