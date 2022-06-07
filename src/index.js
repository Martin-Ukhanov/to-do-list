const toggleMenuBtns = document.querySelectorAll('.toggle-menu-btn');

toggleMenuBtns.forEach((toggleMenuBtn) => {
    toggleMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
    });
});