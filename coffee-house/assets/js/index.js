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
const sliderItem  = document.querySelectorAll('.slider_item');

let sliderPosition = 0;
let controlIndex = 0;

let isPaused = false;

const moveToRight = () => {
  control.forEach((item) => {
    item.classList.remove('control_item-active');
  })
  if (sliderPosition >= (slider.offsetWidth - sliderContainer.offsetWidth)) {
    sliderPosition = 0;
    controlIndex = 0;
  } else {
    sliderPosition += sliderContainer.offsetWidth;
    controlIndex += 1;
  }
    slider.style.left = -sliderPosition + 'px';
    currentControl(controlIndex);
}

const moveToLeft = () => {
  control.forEach((item) => {
    item.classList.remove('control_item-active');
  })
  // sliderPosition -= sliderContainer.offsetWidth;
  if (sliderPosition <= 0) {
    sliderPosition = slider.offsetWidth - sliderContainer.offsetWidth;
    controlIndex = control.length - 1;
  }
  else {
    sliderPosition -= sliderContainer.offsetWidth;
    controlIndex = controlIndex - 1;
  }
  slider.style.left = -sliderPosition + 'px';
  currentControl(controlIndex);
}

let autoMove = () => {
  progress.forEach((item) => {
    item.addEventListener('animationend', () => moveToRight());
  })
}

const currentControl = (index) => {
  control[index].classList.add('control_item-active');
}

autoMove();
nextBtn.addEventListener('click', moveToRight, false);
prevBtn.addEventListener('click', moveToLeft, false);

sliderItem.forEach((item, index) => {
  item.addEventListener('mousedown', () => {
    progress[index].classList.add('pause');
  }
)});
sliderItem.forEach((item, index) => {
  item.addEventListener('mouseover', () => {
    progress[index].classList.add('pause');
  }
)});

sliderItem.forEach((item, index) => {
  item.addEventListener('mouseup', () => {
    progress[index].classList.remove('pause');
  }
)});
sliderItem.forEach((item, index) => {
  item.addEventListener('mouseout', () => {
    progress[index].classList.remove('pause');
  }
)});

// swipe
let x1 = null;
const touchStart = (event) => {
  x1 = event.touches[0].clientX;
}
const touchMove = (event) => {
  if (!x1) {
    return false;
  }
  let x2 = event.touches[0].clientX;
  let diff = x2 - x1;
  if (diff < 0) {
    moveToRight();
  } else {
    moveToLeft();
  }
  x1 = null;
  y1 = null;
}
slider.addEventListener('touchstart', touchStart, false);
slider.addEventListener('touchmove', touchMove, false);



// swipe



//slider end