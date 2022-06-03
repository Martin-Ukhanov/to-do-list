import {task} from './modules/task';

const navBtns = document.querySelectorAll('nav .task button');

navBtns.forEach((navBtn) => {
    navBtn.addEventListener('click', (e) => {
        navBtns.forEach((navBtn) => {
            navBtn.classList.remove('active');
        })
        e.target.classList.add('active');
    });
});

const toggleNavBtn = document.querySelector('header .toggle-nav-btn');

toggleNavBtn.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('hidden');
});