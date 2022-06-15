import {UI} from "./modules/UI";

const toggleMenuBtn = document.getElementById('toggle-menu-btn');

toggleMenuBtn.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});