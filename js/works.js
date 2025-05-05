const workBloks = document.querySelectorAll('.work');
const galleryPopUp = document.querySelector(".gallery__pop_up");
const closeGalleryButton = document.querySelector(".gallery__close");
const leftButton = document.querySelector(".arrow__left");
const rightButton = document.querySelector(".arrow__right");

let currentIndex = 0;

function openGallery() {
    document.body.classList.add("no-scroll");
    galleryPopUp.classList.add("active");
}

function closeGallery() {
    document.body.classList.remove("no-scroll");
    galleryPopUp.classList.remove("active");
}

function chooseWork(workBlok) {
    const imgSrc = workBlok.querySelector('.work__image').getAttribute('src');
    galleryPopUp.querySelector('.gallery__image').setAttribute('src', imgSrc);

    [".work__title",
     ".work__year",
     ".work__category",
     ".work__description"].forEach((el) => {
        const text = workBlok.querySelector(el).textContent;
        galleryPopUp.querySelector(el).textContent = text;
    });

    if (currentIndex > 0) {
        leftButton.classList.add("active");
    } else {
        leftButton.classList.remove("active");
    }

    if (currentIndex < workBloks.length - 1) {
        rightButton.classList.add("active");
    } else {
        rightButton.classList.remove("active");
    }
}

workBloks.forEach((workBlok, index) => {
    workBlok.addEventListener('click', () => {
        currentIndex = index;
        chooseWork(workBlok);
        openGallery();
    });
});

closeGalleryButton.addEventListener('click', closeGallery);

leftButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        chooseWork(workBloks[currentIndex]);
    }
});

rightButton.addEventListener('click', () => {
    if (currentIndex < workBloks.length - 1) {
        currentIndex++;
        chooseWork(workBloks[currentIndex]);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeGallery();
    } else if (e.key === "ArrowLeft") {
        leftButton.click();
    } else if (e.key === "ArrowRight") {
        rightButton.click();
    }
});