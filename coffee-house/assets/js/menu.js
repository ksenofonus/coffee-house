'use strict';
// burger start
const burgerBtn = document.querySelector('.header-burger');
const headerMenu = document.querySelector('.menu-wrapper');
const header = document.querySelector('.header');
const navItem = document.querySelectorAll('.header_menu-item');
const inactiveLink = document.querySelector('.link-container');

const toggleBurger = () => {
  headerMenu.classList.toggle('header_menu__active');
  burgerBtn.classList.toggle('burger-active');
  document.querySelector('body').classList.toggle('no-scroll');
}
burgerBtn.addEventListener('click', () => toggleBurger());

navItem.forEach((item) => {
  item.addEventListener('click', () => {
    toggleBurger();
  })
})

inactiveLink.addEventListener('click', () => {
  toggleBurger();
})

// burger end