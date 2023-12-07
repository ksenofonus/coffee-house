'use strict';
// burger start
const burgerBtn = document.querySelector('.header-burger');
const headerMenu = document.querySelector('.menu-wrapper');
const header = document.querySelector('.header');
const navItem = document.querySelectorAll('.header_menu-item');

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

// burger end

//slider start
const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');
const progress = document.querySelectorAll('.progressbar');
const control = document.querySelectorAll('.control_item');
const slider = document.querySelector('.item-wrapper');
const sliderContainer = document.querySelector('.slider-container');

let sliderPosition = 0;
let controlIndex = 0;

const moveToRight = () => {
  control.forEach((item) => {
    item.classList.remove('control_item-active');
  })
  sliderPosition += sliderContainer.offsetWidth;
  if (sliderPosition >= slider.offsetWidth) {
    sliderPosition = 0;
    controlIndex = 0;
  }
    slider.style.left = -sliderPosition + 'px';
    controlIndex += 1;
  currentControl(controlIndex);
}
const moveToLeft = () => {
  control.forEach((item) => {
    item.classList.remove('control_item-active');
  })
  sliderPosition -= sliderContainer.offsetWidth;
  if (sliderPosition < 0) {
    sliderPosition = slider.offsetWidth - sliderContainer.offsetWidth;
    controlIndex = control.length - 1;
  }
    slider.style.left = -sliderPosition + 'px';
  controlIndex -= 1;
  currentControl(controlIndex);
}

// const progressMove = () => {
//   let progessWidth = 1;
//   let move = setInterval((progress), 6000);
// }

// const progress = () => {
//   if (progressWidth >= 100) {
//     clearInterval(move)
//   } else {
//     progessWidth += 1;

//   }
// }


const currentControl = (index) => {
  control[index].classList.add('control_item-active');
}

// control.forEach((item, index) => {
//   item.addEventListener()
// })

nextBtn.addEventListener('click', () => moveToRight());
prevBtn.addEventListener('click', () => moveToLeft());

setInterval (() => {
  moveToRight();
}, 7000);
//slider end