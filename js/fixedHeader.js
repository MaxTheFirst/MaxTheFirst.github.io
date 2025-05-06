const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    const secondScreenOffset = window.innerHeight;

    if (window.scrollY >= secondScreenOffset) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});