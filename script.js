const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');

menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
});

menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        status.textContent = 'Please complete all required fields.';
        status.style.color = '#a33a2b';
        form.reportValidity();
        return;
    }

    status.textContent = 'Thanks. Your request has been received.';
    status.style.color = '#087653';
    form.reset();
});